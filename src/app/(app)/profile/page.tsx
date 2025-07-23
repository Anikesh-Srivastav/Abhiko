
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { User as UserIcon, Award, Phone, Mail, MapPin, Edit, IndianRupee } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuth } from '@/hooks/use-auth';
import ProfileEditForm from '@/components/profile-edit-form';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!user) {
    // This will be handled by the layout, but as a fallback:
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline font-bold">My Profile</h1>
        <p className="text-muted-foreground mt-2">
          View and manage your details and rewards.
        </p>
      </div>
      <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="font-headline flex items-center gap-2">
                  <UserIcon />
                  Profile Details
                </CardTitle>
                <CardDescription>Your personal information.</CardDescription>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit Profile</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <ProfileEditForm user={user} onSave={() => setIsDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Image src={user.avatar} alt={user.fullName} width={80} height={80} className="rounded-full" />
              <div>
                <h2 className="text-2xl font-bold font-headline">{user.fullName}</h2>
              </div>
            </div>
            <Separator />
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{user.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card id="rewards" className="sticky top-20">
          <CardHeader className="items-center text-center">
            <CardTitle className="font-headline flex items-center gap-2">
              <Award />
              Rewards
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-5xl font-bold text-primary">{user.points}</p>
            <p className="text-muted-foreground text-sm mt-1">Points</p>
            <Separator className="my-4" />
            <p className="text-xs text-muted-foreground">
              You earn 10 points for every <IndianRupee className="h-3 w-3 inline-block" />100 spent. Redeem points for discounts (1 point = <IndianRupee className="h-3 w-3 inline-block" />1) on your future orders!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
