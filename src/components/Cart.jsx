import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Modal from "./UI/Modal";
import Button from "./UI/Button.jsx";

import Cartitem from "./CartItem.jsx";
import CartContext from "../components/store/CartContext.jsx";
import UserProgressContext from "./store/UserProgressContext.jsx";

export default function Cart() {
	const cartCtx = useContext(CartContext);
	const userProgressCtx = new useContext(UserProgressContext);

	const cartTotal = cartCtx.items.reduce(
		(totalPrice, item) => totalPrice + item.quantity * item.price,
		0,
	);

	function handleCloseCart() {
		userProgressCtx.hideCart();
	}
	function handleGotoCheckout() {
		console.log(userProgressCtx);
		userProgressCtx.showCheckOut();
	}

	return (
		<Modal
			className='cart'
			open={userProgressCtx.progress === "cart"}
			onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
		>
			<h2>Your Cart</h2>
			<ul>
				{cartCtx.items &&
					cartCtx.items.map((item) => (
						<Cartitem
							key={item.id}
							name={item.name}
							price={item.price}
							quantity={item.quantity}
							onIncrease={() => cartCtx.addItem(item)}
							onDecrease={() => {
								cartCtx.removeItem(item.id);
							}}
						/>
					))}
			</ul>
			<p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
			<p className='modal-actions'>
				<Button textOnly onClick={handleCloseCart}>
					Close
				</Button>
				{cartCtx.items.length > 0 && (
					<Button onClick={handleGotoCheckout}>Go to Checkout</Button>
				)}
			</p>
		</Modal>
	);
}
