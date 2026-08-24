import { useContext } from 'react';
import { CartContext } from '../Context/CartContext'; 

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart is not included in provider');
  }

  return context;
}