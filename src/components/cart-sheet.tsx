
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MinusCircle, PlusCircle, ShoppingCart, IndianRupee } from 'lucide-react';
import { RESTAURANTS } from '@/lib/data';

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { cart, getCartTotal, addToCart, removeFromCart, clearCart } = useCart();
  const restaurant = RESTAURANTS.find((r) => r.id === cart.restaurantId);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle className="font-headline flex items-center gap-2">
            <ShoppingCart />
            Your Cart
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto">
          {cart.items.length > 0 && restaurant ? (
            <>
              <div className="px-6">
                <p className="text-sm text-muted-foreground">
                  Ordering from{' '}
                  <span className="font-semibold text-foreground">{restaurant.name}</span>
                </p>
              </div>
              <ScrollArea className="h-full">
                <div className="space-y-4 p-6 pr-8">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-start gap-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-grow">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center"><IndianRupee className="h-3 w-3 inline-block mr-0.5"/>{item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                          <span className="w-4 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => addToCart(item, cart.restaurantId!)}
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="font-semibold flex items-center">
                        <IndianRupee className="h-4 w-4 inline-block mr-0.5"/>
                        {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              <h3 className="font-headline text-xl">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground">
                Find something delicious to order!
              </p>
              <Button onClick={() => onOpenChange(false)} asChild>
                <Link href="/delivery">Browse Restaurants</Link>
              </Button>
            </div>
          )}
        </div>
        {cart.items.length > 0 && (
          <SheetFooter className="bg-background border-t p-6 gap-2">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="flex items-center"><IndianRupee className="h-5 w-5 inline-block mr-0.5"/>{getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="w-full" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button className="w-full font-bold" onClick={() => onOpenChange(false)} asChild>
                <Link href="/checkout">Checkout</Link>
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
