
'use client';

import { useState, useEffect, FormEvent, ChangeEvent, Suspense } from 'react';
import Image from 'next/image';

import { PostCard } from '@/components/post-card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Image as ImageIcon, ImagePlus, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { RESTAURANTS } from '@/lib/data';
import { PostSkeleton } from '@/components/post-skeleton';
import { usePosts } from '@/hooks/use-posts';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const NewPostForm = () => {
  const { user } = useAuth();
  const { addPost } = usePosts();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
        toast({ title: 'Not logged in', description: 'You must be logged in to create a post.', variant: 'destructive' });
        return;
    }
    setIsSubmitting(true);
    if (!title || !description || !restaurantId || !image) {
        toast({ title: 'Missing fields', description: 'Please fill out all fields and upload an image.', variant: 'destructive' });
        setIsSubmitting(false);
        return;
    }
    
    if (addPost({
        title,
        description,
        restaurantId,
        image,
    }, user)) {
       setIsSubmitting(false);
       setIsDialogOpen(false); // Close dialog
    } else {
       setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
         <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl">Create a New Post</DialogTitle>
              <DialogDescription>
                Share your latest food adventure with the community.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
               <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Amazing Pasta!"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us more about it..."
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="restaurant">Restaurant</Label>
                <Select onValueChange={setRestaurantId} value={restaurantId} required>
                  <SelectTrigger id="restaurant">
                    <SelectValue placeholder="Which restaurant is this about?" />
                  </SelectTrigger>
                  <SelectContent>
                    {RESTAURANTS.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image-upload">Image</Label>
                <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <Label htmlFor="image-upload" className="cursor-pointer border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50">
                    {imagePreview ? (
                        <Image src={imagePreview} alt="Preview" width={200} height={200} className="rounded-md object-cover max-h-48"/>
                    ) : (
                        <>
                            <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
                            <span className="text-sm font-medium">Click to upload an image</span>
                            <span className="text-xs text-muted-foreground">PNG, JPG, etc.</span>
                        </>
                    )}
                </Label>
              </div>
            </div>
            <DialogFooter>
                 <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Share Post
                </Button>
            </DialogFooter>
         </form>
      </DialogContent>
    </Dialog>
  );
}

export default function AbigramPage() {
  const { posts, isLoading, refetchPosts } = usePosts();

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'abiko-posts') {
        refetchPosts();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [refetchPosts]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
        <div className="text-center sm:text-left">
            <h1 className="text-4xl font-headline font-bold">Abigram</h1>
            <p className="mt-2 text-muted-foreground">
            See what fellow foodies are sharing!
            </p>
        </div>
        <NewPostForm />
      </div>

      {isLoading ? (
         <div className="flex flex-col items-center">
            <div className="w-full max-w-2xl space-y-6">
                <PostSkeleton />
                <PostSkeleton />
            </div>
        </div>
      ) : posts.length === 0 ? (
        <div className='text-center py-16 border-2 border-dashed rounded-lg max-w-2xl mx-auto text-muted-foreground'>
            <ImageIcon className="mx-auto h-12 w-12" />
            <h2 className='text-xl font-headline mt-4'>No posts yet!</h2>
            <p className='mt-2'>Be the first one to share your dining experience.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-2xl space-y-6">
                {posts.map((post) => (
                    <PostCard key={post.postId} post={post} />
                ))}
            </div>
        </div>
      )}
    </div>
  );
}
