import "../../../style.css";
import { checkAuthUser, logout } from "../../../main";
import { getCart, saveCart, getSubtotal, getTotal, updateQuantity } from "../../../utils/cart";
import { updateCartBadge } from "../../../utils/cartBadge";

// Elementos del DOM
const buttonLogout = document.querySelector<HTMLButtonElement>("#logout-button");
const contenedorCarrito = document.querySelector<HTMLElement>("#contenedor-carrito");
const totalElemento = document.querySelector<HTMLElement>("#total-carrito");

const renderCarrito = (): void => {
	if (!contenedorCarrito) return;

	const cart = getCart();

	if (cart.length === 0) {
		contenedorCarrito.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío.</p>`;
		if (totalElemento) totalElemento.textContent = "$0";
		updateCartBadge();
		return;
	}

	contenedorCarrito.innerHTML = cart
		.map(
			(item) => `
			<article class="cart-item" data-id="${item.id}">
				<img src="/images/${item.imagen}" alt="${item.nombre}" />
				<h3>${item.nombre}</h3>
				<div class="cantidad-control">
					<button type="button" class="btn-restar" data-id="${item.id}">−</button>
					<span>${item.cantidad}</span>
					<button type="button" class="btn-sumar" data-id="${item.id}">+</button>
				</div>
				<p>Subtotal: $${getSubtotal(item).toLocaleString("es-AR")}</p>
				<button type="button" data-id="${item.id}" class="btn-eliminar">Quitar</button>
			</article>
		`,
		)
		.join("");

	if (totalElemento) {
		totalElemento.textContent = `$${getTotal(cart).toLocaleString("es-AR")}`;
	}

	updateCartBadge();
};

const eliminarItem = (id: number): void => {
	const cart = getCart().filter((item) => item.id !== id);
	saveCart(cart);
	renderCarrito();
};

const initPage = (): void => {
	checkAuthUser("/src/pages/auth/login/login.html", "/src/pages/admin/home/home.html", "client");
	renderCarrito();
};

// Event listeners
buttonLogout?.addEventListener("click", () => logout());

contenedorCarrito?.addEventListener("click", (event: MouseEvent) => {
	const target = event.target as HTMLButtonElement;
	const id = target.dataset.id;
	if (!id) return;

	if (target.classList.contains("btn-eliminar")) {
		eliminarItem(Number(id));
		return;
	}

	if (target.classList.contains("btn-sumar")) {
		updateQuantity(Number(id), 1);
		renderCarrito();
		return;
	}

	if (target.classList.contains("btn-restar")) {
		updateQuantity(Number(id), -1);
		renderCarrito();
		return;
	}
});

window.addEventListener("pageshow", (event: PageTransitionEvent) => {
	if (event.persisted) initPage();
});

// Carga inicial
initPage();
