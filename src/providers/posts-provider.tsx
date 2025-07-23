
'use client';

import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import useLocalStorage from '@/hooks/use-local-storage';
import { Post, User } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { AVATARS, RESTAURANTS } from '@/lib/data';

export interface EnrichedPost extends Post {
  author: {
    fullName: string;
    avatar: string;
  };
}

export interface PostsContextType {
  posts: EnrichedPost[];
  isLoading: boolean;
  addPost: (postData: Omit<Post, 'postId' | 'timestamp' | 'userId' | 'restaurantName' | 'author'>, user: User) => boolean;
  refetchPosts: () => void;
}

export const PostsContext = createContext<PostsContextType | null>(null);

const getUserFromStorage = (userId: string): User | null => {
    if (typeof window === 'undefined') return null;
    const userProfileStr = localStorage.getItem(`abiko-user-profile-by-id-${userId}`);
    return userProfileStr ? JSON.parse(userProfileStr) : null;
}

const seedInitialData = () => {
    if (typeof window === 'undefined') return;
    const hasBeenSeeded = localStorage.getItem('abiko-seeded');
    if (hasBeenSeeded) return;

    const MOCK_POSTS_DATA: Omit<Post, 'postId' | 'timestamp' | 'userId'>[] = [
        {
            title: 'Absolutely delicious Paneer Butter Masala!',
            description: 'The Royal Tandoor never disappoints. The paneer was so soft and the gravy was perfectly creamy. A must-try!',
            restaurantId: 'r1',
            restaurantName: 'The Royal Tandoor',
            image: 'https://placehold.co/600x400.png',
        },
        {
            title: 'Best Masala Dosa in town!',
            description: 'Went to Coastal Curry House for breakfast and was blown away. The dosa was crispy and the potato filling was perfectly spiced. Highly recommend!',
            restaurantId: 'r2',
            restaurantName: 'Coastal Curry House',
            image: 'https://placehold.co/600x400.png',
        }
    ];
    
    const initialPosts: Post[] = MOCK_POSTS_DATA.map((p, index) => ({
        ...p,
        postId: `post_mock_${index}_${Date.now()}`,
        userId: `user_${index + 1}`,
        timestamp: new Date(Date.now() - index * 1000 * 60 * 60 * 24).toISOString(),
    }));

    const mockUser1 = { id: 'user_1', fullName: 'Aarav Sharma', email: 'aarav@example.com', phone: '1234567890', address: 'Mumbai', avatar: AVATARS[0], points: 120 };
    localStorage.setItem(`abiko-user-profile-by-id-${mockUser1.id}`, JSON.stringify(mockUser1));
    localStorage.setItem(`abiko-user-profile-aarav@example.com`, JSON.stringify(mockUser1));


    const mockUser2 = { id: 'user_2', fullName: 'Priya Patel', email: 'priya@example.com', phone: '0987654321', address: 'Chennai', avatar: AVATARS[1], points: 250 };
    localStorage.setItem(`abiko-user-profile-by-id-${mockUser2.id}`, JSON.stringify(mockUser2));
    localStorage.setItem(`abiko-user-profile-priya@example.com`, JSON.stringify(mockUser2));

    localStorage.setItem('abiko-posts', JSON.stringify(initialPosts));
    localStorage.setItem('abiko-seeded', 'true');
};


export function PostsProvider({ children }: { children: ReactNode }) {
  const [rawPosts, setRawPosts] = useLocalStorage<Post[]>('abiko-posts', []);
  const [posts, setPosts] = useState<EnrichedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadAndEnrichPosts = useCallback((postsToEnrich: Post[]) => {
    setIsLoading(true);
    const enriched = postsToEnrich.map(post => {
      const author = getUserFromStorage(post.userId);
      return {
        ...post,
        author: author 
          ? { fullName: author.fullName, avatar: author.avatar } 
          : { fullName: 'Unknown User', avatar: '' }
      };
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setPosts(enriched);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    seedInitialData();
    // Re-read from storage on mount to ensure we have the latest data
    const postsStr = localStorage.getItem('abiko-posts');
    const initialPosts = postsStr ? JSON.parse(postsStr) : [];
    setRawPosts(initialPosts); // Sync useLocalStorage state
    loadAndEnrichPosts(initialPosts); // Enrich and set display state
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only runs on initial mount


  const addPost = useCallback((postData: Omit<Post, 'postId' | 'timestamp' | 'userId' | 'restaurantName'>, user: User): boolean => {
    const restaurant = RESTAURANTS.find(r => r.id === postData.restaurantId);
    if (!restaurant) {
        toast({ title: 'Error', description: 'Restaurant not found.', variant: 'destructive' });
        return false;
    }

    const newPost: Post = {
        ...postData,
        userId: user.id,
        restaurantName: restaurant.name,
        postId: `post_${user.id}_${Date.now()}`,
        timestamp: new Date().toISOString(),
    };
    
    // Enrich the post immediately with the logged-in user's data
    const newEnrichedPost: EnrichedPost = {
      ...newPost,
      author: {
        fullName: user.fullName,
        avatar: user.avatar,
      }
    };
    
    // Update the local storage with the new raw post
    const newRawPosts = [newPost, ...rawPosts];
    setRawPosts(newRawPosts);

    // Update the displayed posts with the new, fully enriched post
    setPosts(currentEnrichedPosts => [newEnrichedPost, ...currentEnrichedPosts]);

    toast({
        title: 'Post created!',
        description: 'Your post has been successfully shared.',
    });
    return true;
  }, [rawPosts, setRawPosts, toast]);
  
  const refetchPosts = useCallback(() => {
     const postsStr = localStorage.getItem('abiko-posts');
     if (postsStr) {
      const freshPosts = JSON.parse(postsStr);
      loadAndEnrichPosts(freshPosts);
     }
  }, [loadAndEnrichPosts]);

  return (
    <PostsContext.Provider value={{ posts, isLoading, addPost, refetchPosts }}>
      {children}
    </PostsContext.Provider>
  );
}
