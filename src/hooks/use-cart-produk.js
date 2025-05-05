"use client";
import {
	createContext,
	useState,
	useEffect,
	useContext,
	useCallback,
} from "react";

const CartContext = createContext();

export const useCartProduk = () => useContext(CartContext);

export const CartProdukProvider = ({ children }) => {
	const [cartProduk, setCartProduk] = useState([]);

	useEffect(() => {
		const storedCart = localStorage.getItem("cartProduk");
		if (storedCart) setCartProduk(JSON.parse(storedCart));
	}, []);

	useEffect(() => {
		localStorage.setItem("cartProduk", JSON.stringify(cartProduk));
	}, [cartProduk]);

	const addToCart = useCallback((item) => {
		setCartProduk((prevCart) => {
			const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
			if (existingItem) {
				return prevCart.map((cartItem) =>
					cartItem.id === item.id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				);
			} else {
				return [...prevCart, { ...item, quantity: 1 }];
			}
		});
	}, []);

	const removeFromCart = useCallback((item) => {
		setCartProduk((prevCart) => {
			const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
			if (existingItem.quantity === 1) {
				return prevCart.filter((cartItem) => cartItem.id !== item.id);
			} else {
				return prevCart.map((cartItem) =>
					cartItem.id === item.id
						? { ...cartItem, quantity: cartItem.quantity - 1 }
						: cartItem
				);
			}
		});
	}, []);

	const clearCart = useCallback(() => {
		setCartProduk([]);
	}, []);

	const removeItemFromCart = useCallback((item) => {
		setCartProduk((prevCart) => {
			return prevCart.filter((cartItem) => cartItem.id !== item.id);
		});
	}, []);

	const getCartTotal = useCallback(
		() =>
			cartProduk.reduce(
				(total, item) => total + item.harga * item.quantity,
				0
			),
		[cartProduk]
	);

	return (
		<CartContext.Provider
			value={{
				cartProduk,
				addToCart,
				removeFromCart,
				clearCart,
				getCartTotal,
				removeItemFromCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};