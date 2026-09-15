// Lógica del carrito
import type { IProduct } from "../types/product";
import type { ICartItem } from "../types/product";

const CART_KEY = "cart";

export const getCart = (): ICartItem[] => {
	const data = localStorage.getItem(CART_KEY);
	return data ? JSON.parse(data) : [];
};

export const saveCart = (cart: ICartItem[]): void => {
	localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const getSubtotal = (item: ICartItem): number => {
	return item.precio * item.cantidad;
};

export const getTotal = (cart: ICartItem[]): number => {
	return cart.reduce((total, item) => total + getSubtotal(item), 0);
};

export const getTotalItems = (cart: ICartItem[]): number => {
	return cart.reduce((total, item) => total + item.cantidad, 0);
};

// Agregamos elemento al carrito
export function addToCart(producto: IProduct): ICartItem[] {
	const cart = getCart();
	const existente = cart.find((item) => item.id === producto.id);

	if (existente) {
		existente.cantidad += 1;
	} else {
		cart.push({
			id: producto.id,
			nombre: producto.nombre,
			precio: producto.precio,
			imagen: producto.imagen,
			cantidad: 1,
		});
	}

	console.log(`Producto ${producto.nombre} agregado`);

	saveCart(cart);
	return cart;
}

export const updateQuantity = (id: number, delta: number): ICartItem[] => {
	const cart = getCart();
	const item = cart.find((i) => i.id === id);

	if (!item) return cart;

	item.cantidad += delta;

	// Si llega a 0 o menos, se elimina del carrito
	const nuevoCart = item.cantidad <= 0 ? cart.filter((i) => i.id !== id) : cart;

	saveCart(nuevoCart);
	return nuevoCart;
};
