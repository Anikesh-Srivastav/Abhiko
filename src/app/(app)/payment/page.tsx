
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Loader2, IndianRupee } from 'lucide-react';
import type { Order } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function PaymentPage() {
  const { clearCart } = useCart();
  const { user, addPoints, spendPoints } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [order, setOrder] = useState<Omit<Order, 'id' | 'timestamp'> | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const orderDetails = localStorage.getItem('abiko-final-order');
    if (orderDetails) {
      setOrder(JSON.parse(orderDetails));
    } else {
      // If no order details, maybe they refreshed the page. Send them back.
      router.replace('/checkout');
    }
  }, [router]);

  const handleConfirmPayment = () => {
    if (!order || !user) return;
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // 1. Update user points
      addPoints(order.pointsEarned);
      spendPoints(order.pointsRedeemed);

      // 2. Clear the cart
      clearCart();

      // 3. Clear the final order from storage
      localStorage.removeItem('abiko-final-order');

      // 4. Show success toast and redirect
      toast({
        title: 'Order Placed!',
        description: 'Your delicious meal is on its way.',
      });
      router.replace('/delivery');

    }, 1500);
  };

  if (!order) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl">Confirm Your Payment</CardTitle>
          <CardDescription>Review your final order details below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="flex items-center"><IndianRupee className="h-4 w-4 inline-block mr-0.5"/>{order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery & Taxes</span>
            <span className="flex items-center"><IndianRupee className="h-4 w-4 inline-block mr-0.5"/>{(order.deliveryFee + order.taxes).toFixed(2)}</span>
          </div>
           {order.discount > 0 && (
            <div className="flex justify-between text-primary">
              <span className="text-muted-foreground">Points Discount</span>
              <span className="flex items-center">- <IndianRupee className="h-4 w-4 inline-block mx-0.5"/>{order.discount.toFixed(2)}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-bold text-xl">
            <span>Total Amount</span>
            <span className="flex items-center"><IndianRupee className="h-5 w-5 inline-block mr-0.5"/>{order.total.toFixed(2)}</span>
          </div>
          <Separator />
           <div className="text-center text-sm text-muted-foreground p-3 bg-secondary rounded-lg">
                You will earn <span className="font-bold text-primary">{order.pointsEarned}</span> points for this order.
           </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleConfirmPayment} className="w-full font-bold" disabled={isProcessing}>
            {isProcessing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle className="mr-2 h-4 w-4" />
            )}
            {isProcessing ? 'Processing...' : (
                <span className="flex items-center">Pay <IndianRupee className="h-5 w-5 inline-block mx-0.5"/>{order.total.toFixed(2)}</span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
