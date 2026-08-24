export const initialState = {cart:[]};

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADDING': {
      const existingItem = state.cart.findIndex(item => item.id === action.payload.id);
      if (existingItem> -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItem] = {
            ...updatedCart[existingItem],quantity: updatedCart[existingItem].quantity + 1,
        };
        return { ...state, cart: updatedCart };
      }
      
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
    }

    case 'REMOVING':
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

    case 'CLEAR':
      return { ...state, cart: [] };

    default:
      return state;
  }
}