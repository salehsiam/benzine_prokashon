import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

// Create Context
const CartContext = createContext();

// Hook to use Cart
export const useCart = () => useContext(CartContext);

// ✅ Provider Component
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Load from localStorage on first render
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add book to cart
  const addToCart = (book) => {
    setCart((prev) => {
      const exists = prev.find((item) => item._id === book._id);

      if (exists) {
        toast.success(`Increased quantity of "${book.productNameBn}"`);
        return prev.map((item) =>
          item._id === book._id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        toast.success(`Added "${book.productNameBn}" to cart`);
        return [...prev, { ...book, qty: 1 }];
      }
    });
  };

  // Remove book from cart
  const removeFromCart = (id) => {
    setCart((prev) => {
      const removedItem = prev.find((item) => item._id === id);
      if (removedItem) {
        toast.error(`Removed "${removedItem.productNameBn}" from cart`);
      }
      return prev.filter((item) => item._id !== id);
    });
  };
  // Update quantity
  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item._id === id) {
          const newQty = Math.max(1, qty);
          if (newQty > item.qty) {
            toast.success(`Increased "${item.productNameBn}" to ${newQty}`);
          } else if (newQty < item.qty) {
            toast.info(`Decreased "${item.productNameBn}" to ${newQty}`);
          }
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty }}
    >
      {children}
    </CartContext.Provider>
  );
}
