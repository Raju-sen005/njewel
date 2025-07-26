// src/CartContext.js
import { createContext, useState, useEffect, useContext } from 'react';

// Create the Cart Context
const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const url = import.meta.env.VITE_BACKEND_URL
  const [cartItems, setCartItems] = useState(() => {
    // Retrieve cart items from local storage if available
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Persist cart items to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to add an item to the cart
  const addToCart = async (itemId, variantId, size, metalIndex) => {
    console.log("Adding to cart:", { itemId, variantId, size, metalIndex });

    try {
      const response = await fetch(`${url}/products/${variantId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }

      const itemData = await response.json();
      const prices = JSON.parse(itemData.price || '[]');
      const metals = JSON.parse(itemData.metal || '[]');

      setCartItems((prevItems) => {
        // Check if this exact variant with same size and metal already exists in cart
        const existingItemIndex = prevItems.findIndex(
          (cartItem) =>
            cartItem.id === variantId &&
            cartItem.sizes === size &&
            cartItem.metal === metals[metalIndex]
        );

        if (existingItemIndex > -1) {
          // Item exists - increment quantity
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + 1
          };
          return updatedItems;
        } else {
          // New item - add to cart with all necessary details
          return [
            ...prevItems,
            {
              ...itemData,
              id: variantId,
              productId: itemId,
              sizes: size,
              // metal: metalIndex,
              price: prices[metalIndex],
              metal: metals[metalIndex],
              quantity: 1,
              // sizes: JSON.parse(itemData.sizes || '[]'),
              metals: metals,
              // prices: prices
            }
          ];
        }
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      // You might want to add error handling for the UI here
    }
  };



  // Function to remove an item from the cart
  const updateFromCart = (itemId, sizes, metal) => {
    console.log(itemId,sizes,metal);
    
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === itemId && item.sizes === sizes && item.metal === metal
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Function to remove an item completely from the cart
  const removeFromCart = (itemId, size, metal) => {
    console.log("itemId", itemId, size, metal);

    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === itemId && item.sizes === size && item.metal === metal)
      )
    );
  };



  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total price of items in the cart
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, getTotalPrice, updateFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};
