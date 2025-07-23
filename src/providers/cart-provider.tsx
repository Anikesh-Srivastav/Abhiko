
'use client';

import { createContext, ReactNode, useCallback } from 'react';
import useLocalStorage from '@/hooks/use-local-storage';
import { Cart, CartItem } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export interface CartContextType {
  cart: Cart;
  addToCart: (item: CartItem, restaurantId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateSpecialInstructions: (instructions: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const CartContext = createContext<CartContextType | null>(null);

const initialCartState: Cart = {
  items: [],
  specialInstructions: '',
  restaurantId: null,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useLocalStorage<Cart>('abiko-cart', initialCartState);
  const { toast } = useToast();

  const addToCart = useCallback((itemToAdd: CartItem, restaurantId: string) => {
    setCart((currentCart) => {
      // If cart is for a different restaurant, this function shouldn't be called.
      // The logic to check and confirm is handled in the UI component before calling addToCart.
      if (currentCart.restaurantId && currentCart.restaurantId !== restaurantId) {
        // This case should be handled by UI dialog, but as a fallback:
        console.error("Attempted to add item from a different restaurant without clearing cart.");
        // We could show a toast here, but the dialog is a better UX.
        return currentCart; 
      }

      const existingItemIndex = currentCart.items.findIndex(
        (item) => item.id === itemToAdd.id
      );

      let newItems: CartItem[];

      if (existingItemIndex > -1) {
        // Increment quantity
        newItems = currentCart.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item
        newItems = [...currentCart.items, { ...itemToAdd, quantity: 1 }];
      }

      toast({
        title: 'Added to cart',
        description: `${itemToAdd.name} is now in your cart.`,
      });

      return { ...currentCart, items: newItems, restaurantId };
    });
  }, [setCart, toast]);

  const removeFromCart = useCallback((itemIdToRemove: string) => {
      setCart((currentCart) => {
        const existingItem = currentCart.items.find(item => item.id === itemIdToRemove);
        
        if (!existingItem) return currentCart;

        let newItems: CartItem[];
        let newRestaurantId = currentCart.restaurantId;

        if (existingItem.quantity > 1) {
            // Decrement quantity
            newItems = currentCart.items.map(item => 
                item.id === itemIdToRemove ? { ...item, quantity: item.quantity - 1 } : item
            );
        } else {
            // Remove item completely
            newItems = currentCart.items.filter(item => item.id !== itemIdToRemove);
        }
        
        // If cart becomes empty, reset restaurantId
        if (newItems.length === 0) {
          newRestaurantId = null;
        }

        return { ...currentCart, items: newItems, restaurantId: newRestaurantId };
      });
  }, [setCart]);

  const updateSpecialInstructions = useCallback((instructions: string) => {
    setCart(currentCart => ({...currentCart, specialInstructions: instructions}));
  }, [setCart]);


  const clearCart = useCallback(() => {
    setCart(initialCartState);
  }, [setCart]);

  const getCartTotal = useCallback((): number => {
    return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart.items]);
  
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal, updateSpecialInstructions }}>
      {children}
    </CartContext.Provider>
  );
}
