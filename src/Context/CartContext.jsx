import { createContext, useContext, useReducer, useEffect } from 'react';
import { cartReducer, initialState } from './cartReducer';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    const localData = localStorage.getItem("shop_cart");
    return localData ? { cart: JSON.parse(localData) } : initialState;
  });

  useEffect(() => {
    localStorage.setItem("shop_cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
