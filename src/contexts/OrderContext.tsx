import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  type: 'assessment' | 'course' | 'bundle';
  bundleId?: string;
  quantity?: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: Date;
}

interface OrderContextType {
  cartItems: CartItem[];
  orders: Order[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  createOrder: () => string;
  getOrder: (id: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        );
      }
      return [{ ...item, quantity: item.quantity || 1 }, ...prev];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const createOrder = () => {
    const orderId = `order-${Date.now()}`;
    const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    
    const newOrder: Order = {
      id: orderId,
      items: [...cartItems],
      total,
      status: 'pending',
      createdAt: new Date(),
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return orderId;
  };

  const getOrder = (id: string) => {
    return orders.find(order => order.id === id);
  };

  return (
    <OrderContext.Provider value={{
      cartItems,
      orders,
      addToCart,
      removeFromCart,
      clearCart,
      createOrder,
      getOrder,
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}