
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';

import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AVATARS } from '@/lib/data';
import { User } from '@/lib/types';

const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  address: z.string().min(5, { message: 'Address is too short.' }),
  avatar: z.string({ required_error: 'Please select an avatar.' }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileEditFormProps {
  user: User;
  onSave: () => void;
}

export default function ProfileEditForm({ user, onSave }: ProfileEditFormProps) {
  const { updateUser } = useAuth();
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      phone: user?.phone || '',
      address: user?.address || '',
      avatar: user?.avatar || '',
    },
  });

  const onSubmit = (values: ProfileFormValues) => {
    if (updateUser(values)) {
      toast({ title: 'Success', description: 'Your profile has been updated.' });
      onSave();
    } else {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to update profile.' });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Choose your avatar</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4 pt-2"
                >
                  {AVATARS.map((avatarUrl) => (
                    <FormItem key={avatarUrl} className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={avatarUrl} className="sr-only" />
                      </FormControl>
                      <FormLabel className="cursor-pointer rounded-full border-2 border-transparent has-[:checked]:border-primary transition-all">
                        <Image
                          src={avatarUrl}
                          alt="Avatar"
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
