import { getCart, getTotalItems } from "./cart";

export const updateCartBadge = (): void => {
	const linkCarrito = document.querySelector<HTMLAnchorElement>("#link-carrito");
	if (!linkCarrito) return;

	const cart = getCart();
	linkCarrito.textContent = `Carrito (${getTotalItems(cart)})`;
};
