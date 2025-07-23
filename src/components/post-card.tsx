
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageSquare, Utensils } from 'lucide-react';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import type { Post } from '@/lib/types';

interface EnrichedPost extends Post {
    author: {
      fullName: string;
      avatar: string;
    };
}

interface PostCardProps {
  post: EnrichedPost;
}

const getInitials = (name: string) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name.substring(0, 2);
};

export function PostCard({ post }: PostCardProps) {
  const timeAgo = useMemo(() => {
    try {
      return formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });
    } catch (e) {
      return "a while ago";
    }
  }, [post.timestamp]);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 flex-row items-center gap-3 space-y-0">
        <Avatar>
          <AvatarImage src={post.author.avatar} alt={post.author.fullName} />
          <AvatarFallback>{getInitials(post.author.fullName)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <p className="font-semibold">{post.author.fullName}</p>
          <p className="text-xs text-muted-foreground">{timeAgo}</p>
        </div>
      </CardHeader>
      <div className="relative w-full aspect-square">
        <Image src={post.image} alt={post.title} layout="fill" objectFit="cover" data-ai-hint="user food photo"/>
      </div>
      <CardContent className="p-4 pb-2">
        <p className="font-bold font-headline text-lg">{post.title}</p>
        <p className="text-sm text-muted-foreground mt-1">{post.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-start gap-4">
        <Link href={`/delivery/${post.restaurantId}`} className="w-full">
            <Button variant="secondary" className="w-full justify-start">
                <Utensils className="mr-2 h-4 w-4" />
                <span>Eating at <span className="font-semibold ml-1">{post.restaurantName}</span></span>
            </Button>
        </Link>
         <div className="flex items-center gap-4">
           <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-muted-foreground">
                        <Heart className="h-4 w-4" /> 
                        <span>{Math.floor(Math.random() * 50)}</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Functionality is being cooked</p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-muted-foreground">
                        <MessageSquare className="h-4 w-4" /> 
                        <span>{Math.floor(Math.random() * 15)}</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Functionality is being cooked</p>
                </TooltipContent>
            </Tooltip>
           </TooltipProvider>
         </div>
      </CardFooter>
    </Card>
  );
}
