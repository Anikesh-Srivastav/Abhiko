
'use client';

import { AuthGuard } from '@/components/auth-guard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/use-auth';
import { usePosts } from '@/hooks/use-posts';
import { useToast } from '@/hooks/use-toast';
import { RESTAURANTS } from '@/lib/data';
import { ImagePlus, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent, type ChangeEvent } from 'react';
import Image from 'next/image';

export default function NewPostPage() {
  const { user } = useAuth();
  const { addPost } = usePosts();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

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

    addPost({
      title,
      description,
      restaurantId,
      image,
    }, user);
    
    router.push('/abigram');
  };

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Create a New Post</CardTitle>
            <CardDescription>
              Share your latest food adventure with the community.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-6">
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
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Share Post
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  );
}
