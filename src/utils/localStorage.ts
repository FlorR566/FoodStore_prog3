import type { IUser } from "../types/IUser";

// --- Usuario logueado actualmente (sesión) ---
export const saveUser = (user: IUser) => {
	const parseUser = JSON.stringify(user);
	localStorage.setItem("userData", parseUser);
};
export const getUser = () => {
	return localStorage.getItem("userData");
};
export const removeUser = () => {
	localStorage.removeItem("userData");
};

// --- Lista completa de usuarios registrados ---
export const getUsers = (): IUser[] => {
	const usuariosGuardados = localStorage.getItem("users");
	return usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
};

export const saveUsers = (users: IUser[]) => {
	localStorage.setItem("users", JSON.stringify(users));
};
