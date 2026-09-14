import type { ICategory } from "./category";

export interface IProduct {
	id: number;
	eliminado: boolean;
	createdAt: string;
	nombre: string;
	precio: number;
	descripcion: string;
	stock: number;
	imagen: string;
	disponible: boolean;
	categorias: ICategory[];
}

export interface ICartItem {
	producto: IProduct; // Referencia al producto completo
	cantidad: number; // Unidades seleccionadas por el cliente
	subtotal: number; // Precio acumulado (producto.precio * cantidad)
}
