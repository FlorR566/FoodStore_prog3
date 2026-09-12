import { navigate } from "./utils/navigate";
import type { IUser } from "./types/IUser";
export { checkAuthUser, logout } from "./utils/auth"; // <-- importa y reexporta

export const redirection = (user: IUser): void => {
	if (user.role === "admin") {
		navigate("/src/pages/admin/home/home.html");
	} else {
		navigate("/src/pages/client/home/home.html");
	}
};
