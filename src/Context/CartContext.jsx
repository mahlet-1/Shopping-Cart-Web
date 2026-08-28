import { createContext, useContext, useReducer } from 'react';
import { cartReducer, initialState } from './cartReducer';

export const CartContext = createContext();
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}


