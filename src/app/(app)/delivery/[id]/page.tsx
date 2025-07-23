
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { RESTAURANTS } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, MinusCircle, ShoppingCart, Star, AlertCircle, IndianRupee } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import type { MenuItem } from '@/lib/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Link from 'next/link';

export default function RestaurantPage() {
  const params = useParams();
  const restaurantId = params.id as string;
  const restaurant = RESTAURANTS.find((r) => r.id === restaurantId);
  const { cart, addToCart, removeFromCart, getCartTotal, clearCart } = useCart();
  
  const [showClearCartDialog, setShowClearCartDialog] = useState(false);
  const [pendingItem, setPendingItem] = useState<MenuItem | null>(null);

  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-headline font-bold">Restaurant not found</h1>
        <p className="text-muted-foreground mt-2">
          Sorry, we couldn't find the restaurant you're looking for.
        </p>
      </div>
    );
  }
  
  const handleAddToCart = (menuItem: MenuItem) => {
    if (cart.restaurantId && cart.restaurantId !== restaurantId) {
      setPendingItem(menuItem);
      setShowClearCartDialog(true);
    } else {
      addToCart({ ...menuItem, quantity: 1 }, restaurantId);
    }
  };
  
  const handleRemoveFromCart = (menuItemId: string) => {
    removeFromCart(menuItemId);
  };
  
  const confirmClearCartAndAdd = () => {
    clearCart();
    if (pendingItem) {
      addToCart({ ...pendingItem, quantity: 1 }, restaurantId);
    }
    setShowClearCartDialog(false);
    setPendingItem(null);
  };

  const isCartForThisRestaurant = cart.restaurantId === restaurantId;

  return (
    <div className="container mx-auto px-4 py-8">
       <AlertDialog open={showClearCartDialog} onOpenChange={setShowClearCartDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
                <AlertCircle className="text-destructive" />
                Start a New Cart?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your cart contains items from a different restaurant. Would you like to clear it and start a new order here?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingItem(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmClearCartAndAdd}>Clear Cart & Add</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card className="overflow-hidden mb-8">
        <div className="relative h-64 w-full">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            data-ai-hint="restaurant interior"
            fill
            className="object-cover"
          />
        </div>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div>
                <Badge variant="secondary" className="mb-2">{restaurant.cuisine}</Badge>
                <CardTitle className="font-headline text-3xl">{restaurant.name}</CardTitle>
                <CardDescription className="mt-1">{restaurant.location}</CardDescription>
            </div>
            <div className="flex items-center gap-1 text-lg font-bold text-amber-500 mt-4 md:mt-0 bg-amber-500/10 px-3 py-1.5 rounded-md">
                <Star className="h-5 w-5 fill-current" />
                <span>4.5</span>
                <span className="text-sm font-normal text-muted-foreground ml-1">(500+ ratings)</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <h2 className="text-2xl font-headline font-bold mb-4">Menu</h2>
            <div className="grid gap-4">
                {restaurant.menu.map((item) => {
                    const cartItem = cart.items.find(ci => ci.id === item.id);
                    const quantity = cartItem?.quantity || 0;

                    return (
                        <Card key={item.id} className="flex flex-col sm:flex-row items-start gap-4 p-4 transition-all hover:shadow-md">
                            <div className="relative h-24 w-full sm:w-24 sm:h-24 rounded-md overflow-hidden flex-shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    data-ai-hint="indian food"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-bold font-headline">{item.name}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                <p className="font-bold mt-2 text-lg text-primary flex items-center"><IndianRupee className="h-5 w-5 inline-block mr-0.5"/>{item.price.toFixed(2)}</p>
                            </div>
                            {quantity === 0 ? (
                                <Button variant="outline" size="sm" className="w-full sm:w-auto mt-2 sm:mt-0" onClick={() => handleAddToCart(item)}>
                                    <PlusCircle className="mr-2 h-4 w-4"/> Add
                                </Button>
                            ) : (
                                <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0 justify-center">
                                    <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => handleRemoveFromCart(item.id)}>
                                        <MinusCircle className="h-4 w-4" />
                                    </Button>
                                    <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                                    <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => handleAddToCart(item)}>
                                        <PlusCircle className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>
        </div>
        <div className="md:col-span-1">
            <Card className="sticky top-20">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <ShoppingCart/>
                        Your Cart
                    </CardTitle>
                    {(!isCartForThisRestaurant || cart.items.length === 0) && <CardDescription>Your cart is empty.</CardDescription>}
                </CardHeader>
                 {isCartForThisRestaurant && cart.items.length > 0 && (
                  <>
                    <CardContent>
                      <div className="space-y-4">
                        {cart.items.map(item => (
                          <div key={item.id} className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold">{item.name}</p>
                              <p className="text-sm text-muted-foreground flex items-center"><IndianRupee className="h-3 w-3 inline-block mr-0.5"/>{item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleRemoveFromCart(item.id)}>
                                  <MinusCircle className="h-4 w-4" />
                              </Button>
                              <span>{item.quantity}</span>
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleAddToCart(item)}>
                                  <PlusCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex-col items-stretch gap-2">
                        <Separator/>
                        <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span className="flex items-center"><IndianRupee className="h-5 w-5 inline-block mr-0.5"/>{getCartTotal().toFixed(2)}</span>
                        </div>
                        <Button className="w-full font-bold" asChild>
                          <Link href="/checkout">Checkout</Link>
                        </Button>
                    </CardFooter>
                  </>
                 )}
                 {(!isCartForThisRestaurant || cart.items.length === 0) && (
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Add items from the menu to see them here.</p>
                    </CardContent>
                 )}
            </Card>
        </div>
      </div>
    </div>
  );
}
