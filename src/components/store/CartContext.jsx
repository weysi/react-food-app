import { createContext, useReducer } from "react";

const CartContext = createContext({
	items: [],
	addItem: (item) => {},
	removeItem: (id) => {},
});

const cartReducer = (state, action) => {
	if (action.type === "ADD_ITEM") {
		const existingCarItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id,
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
		//immutable way

		const existingCartItemIndex = state.items.findIndex((item) => {
			item.id == action.id;
		});

		const existingCartItem = state.items[existingCartItemIndex];

		const updatedItems = [...state.items];
		debugger;

		if (existingCartItem.quantity === 1) {
			updatedItems.splice(existingCartItemIndex, 1);
		} else {
			const updateItem = {
				...existingCartItem,
				quantity: existingCartItem.quantity - 1,
			};
			updatedItems[existingCartItemIndex] = updateItem;
		}
		return { ...state, updatedItems };
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
	const cartContext = {
		items: cart.items,
		addItem,
		removeItem,
	};

	return (
		<CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
	);
};

export default CartContext;
