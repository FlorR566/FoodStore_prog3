import "../../../style.css";
import { checkAuthUser, logout } from "../../../main"; // <-- la redirección pasa por main.ts
import { PRODUCTS, getCategories } from "../../../data/data";
import type { IProduct } from "../../../types/product";

const buttonLogout = document.getElementById("logout-button") as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => {
	logout();
});

const contenedorProductos = document.querySelector<HTMLElement>("#contenedor-productos");
const listaCategorias = document.querySelector<HTMLUListElement>("#lista-categorias");
const inputBuscar = document.querySelector<HTMLInputElement>("#buscar-prod");
const formBuscar = document.querySelector<HTMLFormElement>("form");

let categoriaActivaId: number | null = null;

function renderProductos(lista: IProduct[]) {
	if (!contenedorProductos) return;

	if (lista.length === 0) {
		contenedorProductos.innerHTML = `<p class="Sin-resultados">No se encontraron productos.</p>`;
		return;
	}

	contenedorProductos.innerHTML = lista
		.map(
			(p) => `
			<article class="producto-card">
				<img src="/src/assets/${p.imagen}" alt="${p.nombre}" />
				<h3>${p.nombre}</h3>
				<p>${p.descripcion}</p>
				<p class="precio">$${p.precio.toLocaleString("es-AR")}</p>
				${!p.disponible ? `<span class="badge-agotado">Sin stock</span>` : ""}
				<button type="submit">Agregar al Carrito</button>
			</article>
		`,
		)
		.join("");
}

function renderCategorias() {
	if (!listaCategorias) return;

	const categorias = getCategories();

	listaCategorias.innerHTML = `
		<li><button data-categoria-id="">Todas</button></li>
		${categorias.map((cat) => `<li><button data-categoria-id="${cat.id}">${cat.nombre}</button></li>`).join("")}
	`;

	listaCategorias.addEventListener("click", (event) => {
		const target = event.target as HTMLButtonElement;
		if (target.tagName !== "BUTTON") return;

		const id = target.dataset.categoriaId;
		categoriaActivaId = id ? Number(id) : null;
		aplicarFiltros();
	});
}

function aplicarFiltros() {
	const texto = inputBuscar?.value.trim().toLowerCase() ?? "";

	const filtrados = PRODUCTS.filter((p) => {
		if (p.eliminado) return false;

		const coincideNombre = p.nombre.toLowerCase().includes(texto);
		const coincideCategoria =
			categoriaActivaId === null || p.categorias.some((c) => c.id === categoriaActivaId);

		return coincideNombre && coincideCategoria;
	});

	renderProductos(filtrados);
}

formBuscar?.addEventListener("submit", (event) => {
	event.preventDefault();
	aplicarFiltros();
});

inputBuscar?.addEventListener("input", () => {
	aplicarFiltros(); // búsqueda en tiempo real
});

const initPage = () => {
	console.log("inicio de pagina");
	checkAuthUser("/src/pages/auth/login/login.html", "/src/pages/admin/home/home.html", "client");
	renderCategorias();
	renderProductos(PRODUCTS.filter((p) => !p.eliminado));
};
initPage(); // corre la carga normal

window.addEventListener("pageshow", (event: PageTransitionEvent) => {
	if (event.persisted) {
		initPage(); // corre de nuevo si la página vino del bfcache (ej: botón "atrás")
	}
});
