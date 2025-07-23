

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  points: number;
}

export interface MenuItem {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
}

export interface Restaurant {
  id:string;
  name: string;
  location: string;
  image: string;
  cuisine: string;
  menu: MenuItem[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  specialInstructions: string;
  restaurantId: string | null;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  discount: number;
  total: number;
  pointsEarned: number;
  pointsRedeemed: number;
  specialInstructions: string;
  timestamp: string;
}

export interface Post {
  postId: string;
  userId: string;
  title: string;
  description: string;
  restaurantId: string;
  restaurantName: string;
  image: string; // base64 or URL
  timestamp: string;
}
