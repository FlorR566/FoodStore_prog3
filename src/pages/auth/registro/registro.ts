import "../../../style.css";
import type { IUser } from "../../../types/IUser";
import { getUsers, saveUsers } from "../../../utils/localStorage";

const form = document.querySelector<HTMLFormElement>("#registro");
const result = document.querySelector<HTMLDivElement>("#resultado");

form?.addEventListener("submit", (event: SubmitEvent) => {
	event.preventDefault();

	console.log("== Formulario Enviado ==");

	const formElement = event.currentTarget as HTMLFormElement;
	const formData = new FormData(formElement); // Extrae los datos del formulario

	const newUser: IUser = {
		email: (formData.get("email") as string).trim(),
		password: (formData.get("password") as string).trim(),
		loggedIn: false,
		role: "client",
	};

	// Leer el array existente en localStorage (o vacío si no hay nada aún)
	const users = getUsers();
	const emailExist = users.some((user) => user.email === newUser.email);

	if (emailExist && result) {
		form.style.display = "none";
		result.className = "error";
		result.style.display = "block";
		result.innerHTML = `<h3>Este email ya está registrado</h3>
    <p>Probá con otro email o iniciá sesión.</p>`;

		setTimeout(() => {
			if (result) {
				result.style.display = "none";
				form.style.display = "";
			}
		}, 3000);

		return;
	}

	users.push(newUser);
	saveUsers(users);

	console.log(localStorage);

	// Mostrar los resultados en pantalla
	if (result) {
		form.style.display = "none";
		result.className = "success";
		result.style.display = "block";
		result.innerHTML = `<h3>Usuario Registrado</h3>
    <p><strong>Email:</strong> ${newUser.email.toUpperCase()}</p>
    <p><strong>Password:</strong> ******** </p>`;
	}

	// Limpiar formulario
	formElement.reset();

	// Ocultamos resultado después de 5 segundos
	setTimeout(() => {
		if (result) {
			result.style.display = "none";
			form.style.display = ""; // si no especifico nada, recupera el layout que tenia en el css
		}
	}, 5000);
});
