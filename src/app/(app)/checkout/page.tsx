
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Sparkles, IndianRupee } from 'lucide-react';
import { RESTAURANTS } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Order } from '@/lib/types';

export default function CheckoutPage() {
  const { cart, getCartTotal, updateSpecialInstructions } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [usePoints, setUsePoints] = useState(false);

  const restaurant = RESTAURANTS.find(r => r.id === cart.restaurantId);

  if (cart.items.length === 0 || !restaurant) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-headline font-bold">Your Cart is Empty</h1>
        <p className="text-muted-foreground mt-2">
          There's nothing to check out. Add some items from a restaurant first!
        </p>
        <Button onClick={() => router.push('/delivery')} className="mt-4">
          Browse Restaurants
        </Button>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const deliveryFee = 50.0;
  const taxes = subtotal * 0.1;

  const pointsToUse = user ? Math.min(user.points, Math.floor(subtotal)) : 0;
  const discount = usePoints ? pointsToUse : 0;
  
  const total = subtotal + deliveryFee + taxes - discount;

  const handleProceedToPayment = () => {
    if (!user) {
        toast({ title: 'Not logged in', description: 'Please log in to place an order.', variant: 'destructive' });
        return;
    }
    const finalOrder: Omit<Order, 'id' | 'timestamp'> = {
        userId: user.id,
        restaurantId: cart.restaurantId!,
        items: cart.items,
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        taxes: taxes,
        discount: discount,
        total: total,
        pointsEarned: Math.floor(subtotal / 10),
        pointsRedeemed: Math.floor(discount),
        specialInstructions: cart.specialInstructions,
    };
    
    localStorage.setItem('abiko-final-order', JSON.stringify(finalOrder));
    router.push('/payment');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline font-bold">Checkout</h1>
        <p className="text-muted-foreground mt-2">Finalize your order from {restaurant.name}.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
              <CardDescription>Review the items in your cart.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.items.map(item => (
                  <div key={item.id} className="flex items-start gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      data-ai-hint="indian food"
                      width={64}
                      height={64}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-grow">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center">
                        {item.quantity} x <IndianRupee className="h-3 w-3 inline-block mx-0.5"/>{item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-semibold flex items-center"><IndianRupee className="h-4 w-4 inline-block mr-0.5"/>{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-6" />
              <div className="space-y-2">
                <Label htmlFor="instructions">Special Instructions for the Kitchen</Label>
                <Textarea
                  id="instructions"
                  placeholder="e.g., Make it extra spicy, no onions, etc."
                  value={cart.specialInstructions}
                  onChange={(e) => updateSpecialInstructions(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <CreditCard />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               {user && user.points > 0 && (
                <>
                  <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div className="flex items-center gap-2">
                      <Sparkles className="text-primary h-5 w-5"/>
                      <div>
                         <Label htmlFor="use-points" className="font-bold">Use {user.points} points?</Label>
                         <p className="text-xs text-muted-foreground flex items-center">Get <IndianRupee className="h-3 w-3 inline-block mx-0.5"/>{pointsToUse.toFixed(2)} off</p>
                      </div>
                    </div>
                    <Switch
                      id="use-points"
                      checked={usePoints}
                      onCheckedChange={setUsePoints}
                      aria-label={`Use ${user.points} reward points`}
                    />
                  </div>
                  <Separator />
                </>
              )}
               <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="flex items-center"><IndianRupee className="h-4 w-4 inline-block mr-0.5"/>{subtotal.toFixed(2)}</span>
              </div>
               <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="flex items-center"><IndianRupee className="h-4 w-4 inline-block mr-0.5"/>{deliveryFee.toFixed(2)}</span>
              </div>
               <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes & Charges</span>
                <span className="flex items-center"><IndianRupee className="h-4 w-4 inline-block mr-0.5"/>{taxes.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-primary font-medium">
                  <span className="text-muted-foreground">Points Discount</span>
                  <span className="flex items-center">- <IndianRupee className="h-4 w-4 inline-block mx-0.5"/>{discount.toFixed(2)}</span>
                </div>
              )}
              <Separator />
               <div className="flex justify-between font-bold text-lg">
                <span>To Pay</span>
                <span className="flex items-center"><IndianRupee className="h-5 w-5 inline-block mr-0.5"/>{total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleProceedToPayment} className="w-full font-bold">
                <CreditCard className="mr-2" />
                Proceed to Payment
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
