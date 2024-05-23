import { CartContextProvider } from "./components/store/CartContext.jsx";
import { UserProggressContextProvider } from "./components/store/UserProgressContext.jsx";

import "./App.css";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout.jsx";

function App() {
	return (
		<UserProggressContextProvider>
			<CartContextProvider>
				<Header />
				<Meals />
				<Cart />
				<Checkout />
			</CartContextProvider>
		</UserProggressContextProvider>
	);
}

export default App;
