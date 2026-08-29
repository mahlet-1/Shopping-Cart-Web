export const initialState = {cart:[]};

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const itemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      const addQuantity = action.payload.quantity || 1;

      if (itemIndex > -1) {
        const updatedCart = [...state.cart];
        updatedCart[itemIndex] = {
          ...updatedCart[itemIndex],
          quantity: updatedCart[itemIndex].quantity + addQuantity,
        };
        return { ...state, cart: updatedCart };
      }
      
      return { 
        ...state, 
        cart: [...state.cart, { ...action.payload, quantity: addQuantity }] 
      };
    }

    case 'REMOVE_ITEM':
      return {...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {...state,
          cart: state.cart.filter(item => item.id !== id),
        };
      }
      return {...state,
        cart: state.cart.map(item => 
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    default:
      return state;
  }
}