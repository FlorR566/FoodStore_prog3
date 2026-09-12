import "../../../style.css";
import { checkAuthUser, logout } from "../../../main"; // <-- la redirección pasa por main.ts

const buttonLogout = document.getElementById(
	"logoutButton",
) as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => {
	logout();
});

const initPage = () => {
	console.log("inicio de pagina");
	checkAuthUser(
		"/src/pages/auth/login/login.html",
		"/src/pages/admin/home/home.html",
		"client",
	);
};
initPage(); // corre la carga normal

window.addEventListener("pageshow", (event: PageTransitionEvent) => {
	if (event.persisted) {
		initPage(); // corre de nuevo si la página vino del bfcache (ej: botón "atrás")
	}
});
