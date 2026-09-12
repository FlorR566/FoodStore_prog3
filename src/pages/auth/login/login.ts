import "../../../style.css";
import { saveUser, getUsers } from "../../../utils/localStorage";
import { redirection } from "../../../main";

const form = document.getElementById("registro") as HTMLFormElement;
const result = document.querySelector<HTMLDivElement>("#resultado");
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

// Al intentar ingresar, buscar en el array de "users" si existe una coincidencia de email y contraseña.
// Si es correcto, guardar el objeto del usuario en la clave "userData" para iniciar la sesión.
form?.addEventListener("submit", (e: SubmitEvent) => {
	e.preventDefault();

	const valueEmail: string = inputEmail.value.trim();
	const valuePassword: string = inputPassword.value.trim();

	// Buscamos el USUARIO REAL que matchee email Y contraseñas
	const users = getUsers();
	const userExist = users.find(
		(user) => user.email === valueEmail && user.password === valuePassword,
	);

	if (!userExist) {
		if (result) {
			form.style.display = "none";
			result.className = "error";
			result.style.display = "block";
			result.innerHTML = `<h3>Email o contraseña incorrectos.</h3>
			<p>Verificá tus datos e intentá de nuevo.</p>`;
		}

		setTimeout(() => {
			if (result) {
				result.style.display = "none";
				form.style.display = "";
			}
		}, 3000);

		return;
	}

	// Guardamos la sesión con los datos REALES del usuario encontrado (rol incluido)
	const { password, ...userSinPassword } = userExist;
	saveUser({ ...userSinPassword, loggedIn: true, password: "" });

	// Lógica de redirección según el ROL (centralizada en main.ts)
	redirection(userExist);
});
