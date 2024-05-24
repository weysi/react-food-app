import { CartContextProvider } from "./components/store/CartContext.jsx";
import { UserProggressContextProvider } from "./components/store/UserProgressContext.jsx";

import "./App.css";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";

function App() {
	return (
		<CartContextProvider>
			<UserProggressContextProvider>
				<Header />
				<Meals />
				<Cart />
				<Checkout />
			</UserProggressContextProvider>
		</CartContextProvider>
	);
}

export default App;
