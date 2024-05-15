import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const existingCarItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];
    if (existingCarItemIndex > -1) {
      const existingItem = state.items[existingCarItemIndex];
      const updatedItem = {
        ...existingItem[existingCarItemIndex],
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCarItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "REMOVE_ITEM") {
    //immutable way
    const existingCarItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCarItemIndex];
    const updatedItems = [...state.items];
    if (existingCarItemIndex.quantity === 1) {
      updatedItems.splice(existingCarItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCarItem.quantity - 1,
      };
      updatedItems[existingCarItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }
  return state;
};

export function CartContextProvider({ children }) {
  //logic statement
  const [cart, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  }
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE", id });
  }
  const cartConText = { items: cart.items, addItem, removeItem };
  console.log(cartConText);
  return (
    <CartContext.Provider value={cartConText}>{children}</CartContext.Provider>
  );
}

export default CartContext;
