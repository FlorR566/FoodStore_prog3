import type { IProduct } from "../../../types/product";

// Elementos del DOM

// agregamos elemento al carrito

export const addToCart = (product: IProduct): void => {
	// Aquí va la lógica para agregar el producto al carrito
	console.log(`Producto ${product.nombre} agregado`);
};
