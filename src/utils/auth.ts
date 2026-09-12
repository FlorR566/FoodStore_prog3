import type { IUser } from "../types/IUser";
import type { Rol } from "../types/Rol";
import { getUser, removeUser } from "./localStorage";
import { navigate } from "./navigate";

export const checkAuthUser = (
	redireccion1: string,
	redireccion2: string,
	rol: Rol,
) => {
	document.body.style.visibility = "hidden"; // oculta body mientras verifica

	const user = getUser();

	if (!user) {
		console.log("No hay sesión activa");
		navigate(redireccion1);
		return;
	}

	const parseUser: IUser = JSON.parse(user);

	if (parseUser.role !== rol) {
		console.log("Sesión activa pero el rol no coincide");
		navigate(redireccion2);
		return;
	}

	document.body.style.visibility = ""; // muestra body si pasí ok la validación
};

export const logout = () => {
	removeUser();
	navigate("/src/pages/auth/login/login.html");
};
