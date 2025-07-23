
'use client';

import { useContext } from 'react';
import { PostsContext, PostsContextType } from '@/providers/posts-provider';

export const usePosts = (): PostsContextType => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};
