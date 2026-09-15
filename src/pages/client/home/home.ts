import "../../../style.css";
import { checkAuthUser, logout } from "../../../main"; // <-- la redirección pasa por main.ts
import { addToCart } from "../../../utils/cart";
import { PRODUCTS, getCategories } from "../../../data/data";
import type { IProduct } from "../../../types/product";
import { mostrarFeedback } from "../../../utils/toast";
import { updateCartBadge } from "../../../utils/cartBadge";

// Elementos del DOM
const buttonLogout = document.querySelector<HTMLButtonElement>("#logout-button");
const contenedorProductos = document.querySelector<HTMLElement>("#contenedor-productos");
const listaCategorias = document.querySelector<HTMLUListElement>("#lista-categorias");
const inputBuscar = document.querySelector<HTMLInputElement>("#buscar-prod");
const formBuscar = document.querySelector<HTMLFormElement>("form");

// Estado de la página
let categoriaActivaId: number | null = null;

const renderProductos = (lista: IProduct[]): void => {
	if (!contenedorProductos) return;

	if (lista.length === 0) {
		contenedorProductos.innerHTML = `<p class="Sin-resultados">No se encontraron productos.</p>`;
		return;
	}

	contenedorProductos.innerHTML = lista
		.map(
			(p) => `
			<article class="producto-destacado">
				<img src="/src/assets/${p.imagen}" alt="${p.nombre}" />
				<h3>${p.nombre}</h3>
				<p>${p.descripcion}</p>
				<p><strong>$${p.precio.toLocaleString("es-AR")}</strong></p>
				${!p.disponible ? `<span class="badge-agotado">Sin stock</span>` : ""}
				<button type="button" class="btn-agregar" data-id="${p.id}" ${!p.disponible ? "disabled" : ""}>Agregar al Carrito</button>
			</article>
		`,
		)
		.join("");
};

const aplicarFiltros = (): void => {
	const texto = inputBuscar?.value.trim().toLowerCase() ?? "";

	const filtrados = PRODUCTS.filter((p) => {
		if (p.eliminado) return false;

		const coincideNombre = p.nombre.toLowerCase().includes(texto);
		const coincideCategoria =
			categoriaActivaId === null || p.categorias.some((c) => c.id === categoriaActivaId);

		return coincideNombre && coincideCategoria;
	});

	renderProductos(filtrados);
};

const renderCategorias = (): void => {
	if (!listaCategorias) return;

	const categorias = getCategories();

	listaCategorias.innerHTML = `
		<li><button data-categoria-id="">Todas</button></li>
		${categorias.map((cat) => `<li><button data-categoria-id="${cat.id}">${cat.nombre}</button></li>`).join("")}
	`;

	listaCategorias.addEventListener("click", (event: MouseEvent) => {
		const target = event.target as HTMLButtonElement;
		if (target.tagName !== "BUTTON") return;

		const id = target.dataset.categoriaId;
		categoriaActivaId = id ? Number(id) : null;
		aplicarFiltros();
	});
};

const initPage = (): void => {
	console.log("inicio de pagina");
	checkAuthUser("/src/pages/auth/login/login.html", "/src/pages/admin/home/home.html", "client");
	renderCategorias();
	renderProductos(PRODUCTS.filter((p) => !p.eliminado));
	updateCartBadge();
};

// Event Listeners e Inicialización
buttonLogout?.addEventListener("click", () => {
	logout();
});

formBuscar?.addEventListener("submit", (event: SubmitEvent) => {
	event.preventDefault();
	aplicarFiltros();
});

inputBuscar?.addEventListener("input", () => {
	aplicarFiltros(); // búsqueda en tiempo real
});

contenedorProductos?.addEventListener("click", (event: MouseEvent) => {
	const target = event.target as HTMLButtonElement;
	if (target.tagName !== "BUTTON") return;

	const id = target.dataset.id;
	if (!id) return;

	const producto = PRODUCTS.find((p) => p.id === Number(id));
	if (!producto) return;

	addToCart(producto);
	updateCartBadge();
	mostrarFeedback(`${producto.nombre} agregado al carrito`);
});

window.addEventListener("pageshow", (event: PageTransitionEvent) => {
	if (event.persisted) {
		initPage(); // corre de nuevo si la página vino del bfcache (ej: botón "atrás")
	}
});

initPage(); // corre la carga normal
