
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Utensils, Camera } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Link from 'next/link';

function DesktopFallback() {
  return (
    <Card className="max-w-2xl mx-auto text-center">
      <CardHeader>
        <CardTitle className="font-headline flex items-center justify-center gap-2">
          <Sparkles className="text-primary" />
          A Note for the Hiring Manager
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-medium">
          On a desktop, you can't scan a table's QR code.
        </p>
        <p className="text-muted-foreground mt-2">
         But if you hire me, I'd love to cook up features as delicious as this one for your team!
        </p>
         <Button className="mt-6" variant="outline" asChild>
          <Link href="/delivery">
            <Utensils className="mr-2 h-4 w-4" />
            Check out other features
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function MobileFallback() {
  return (
    <Card className="max-w-2xl mx-auto text-center">
      <CardHeader>
        <CardTitle className="font-headline flex items-center justify-center gap-2">
          <Sparkles className="text-primary" />
          A Note for the Hiring Manager
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-medium">
            This feature is still cooking!
        </p>
        <p className="text-muted-foreground mt-2">
            How about you hire me so I can finish cooking it fast?
        </p>
         <Button className="mt-6" variant="outline" asChild>
          <Link href="/delivery">
            <Utensils className="mr-2 h-4 w-4" />
            Check out other features
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function Fallback() {
    return (
        <Card className="max-w-2xl mx-auto text-center">
            <CardHeader>
                <CardTitle className="font-headline">Check out other features</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    You can explore other parts of the app and come back later to see this feature.
                </p>
                <Button className="mt-6" asChild>
                  <Link href="/delivery">
                    <Utensils className="mr-2 h-4 w-4" />
                    Browse Restaurants
                  </Link>
                </Button>
            </CardContent>
        </Card>
    );
}


export default function DineInPage() {
  const isMobile = useIsMobile();
  const [choice, setChoice] = useState<'yes' | 'no' | null>(null);

  // Guard against undefined isMobile on initial render
  if (isMobile === undefined) {
    return null; // Or a loading spinner
  }

  let content;
  if (choice === 'yes') {
    content = isMobile ? <MobileFallback /> : <DesktopFallback />;
  } else if (choice === 'no') {
    content = <Fallback />;
  } else {
    // This case should not be hit if dialog is forced open, but it's a safe fallback.
    content = null;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
       <AlertDialog open={choice === null} onOpenChange={(open) => {
         if (!open && choice === null) setChoice('no');
       }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Camera className="text-primary" />
              Camera Access for QR Scanning
            </AlertDialogTitle>
            <AlertDialogDescription>
              This feature uses your camera to scan a QR code at your table, which lets you view the menu and order directly.
              <br/><br/>
              Would you like to see how this works?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setChoice('no')}>No, maybe later</Button>
            <Button onClick={() => setChoice('yes')}>Yes, show me</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline font-bold">Dine-In Experience</h1>
        <p className="text-muted-foreground mt-2">
          {choice === null ? 'A smart, device-aware experience.' :
           'Seamless ordering at your fingertips.'}
        </p>
      </div>
      
      {content}

    </div>
  );
}
