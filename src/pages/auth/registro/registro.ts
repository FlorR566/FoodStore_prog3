import "../../../style.css";
import type { IUser } from "../../../types/IUser";
import { getUsers, saveUsers } from "../../../utils/localStorage";
import { toggleFormView } from "../../../utils/toggleFormView";

const form = document.querySelector<HTMLFormElement>("#registro");
const result = document.querySelector<HTMLDivElement>("#resultado");
const linkLogin = document.querySelector<HTMLParagraphElement>(".link__login");

form?.addEventListener("submit", (event: SubmitEvent) => {
	event.preventDefault();

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

	if (emailExist) {
		toggleFormView({
			form,
			result,
			link: linkLogin,
			showForm: false,
			resultState: "error",
			resultHtml: `<h3>Este email ya está registrado</h3>
			<p>Probá con otro email o iniciá sesión.</p>`,
		});

		setTimeout(() => {
			toggleFormView({ form, result, link: linkLogin, showForm: true });
		}, 3000);
		return;
	}

	users.push(newUser);
	saveUsers(users);

	// Mostrar los resultados en pantalla
	toggleFormView({
		form,
		result,
		link: linkLogin,
		showForm: false,
		resultState: "success",
		resultHtml: `<h3>Usuario Registrado</h3>
    <p><strong>Email:</strong> ${newUser.email.toUpperCase()}</p>`,
	});

	setTimeout(() => {
		toggleFormView({ form, result, link: linkLogin, showForm: true });
	}, 3000);

	// Limpiar formulario
	formElement.reset();
});
