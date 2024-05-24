import { createContext, useReducer } from "react";

const CartContext = createContext({
	items: [],
	addItem: (item) => {},
	removeItem: (id) => {},
	clearCart: () => {},
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
				...existingItem,
				quantity: existingItem.quantity + 1,
			};
			console.log(updatedItem);
			updatedItems[existingCarItemIndex] = updatedItem;
		} else {
			updatedItems.push({ ...action.item, quantity: 1 });
		}
		return { ...state, items: updatedItems };
	}
	if (action.type === "REMOVE_ITEM") {
		//findIndex  edited
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.id
		);
		console.log(existingCartItemIndex);

		if (existingCartItemIndex === -1) {
			return state;
		}
		const existingCartItem = state.items[existingCartItemIndex];

		const updatedItems = [...state.items];

		if (existingCartItem.quantity === 1) {
			updatedItems.splice(existingCartItemIndex, 1);
		} else {
			const updateItem = {
				...existingCartItem,
				quantity: existingCartItem.quantity - 1,
			};

			updatedItems[existingCartItemIndex] = updateItem;
		}
		//explicit data 05.24
		return { ...state, items: updatedItems };
	}

	if (action.type === "CLEAR_CART") {
		return { ...state, items: [] };
	}
	return state;
};

export const CartContextProvider = ({ children }) => {
	//logic statement
	const [cart, dispatchCartAction] = useReducer(cartReducer, {
		items: [],
	});

	function addItem(item) {
		dispatchCartAction({ type: "ADD_ITEM", item });
	}
	function removeItem(id) {
		dispatchCartAction({ type: "REMOVE_ITEM", id });
	}

	function clearCart() {
		dispatchCartAction({ type: "CLEAR_CART" });
	}
	const cartContext = {
		items: cart.items,
		addItem,
		removeItem,
		clearCart,
	};

	return (
		<CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
	);
};

export default CartContext;
