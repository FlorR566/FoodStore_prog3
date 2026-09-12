import "../../../style.css";
import { saveUser, getUsers } from "../../../utils/localStorage";
import { redirection } from "../../../main";
import { toggleFormView } from "../../../utils/toggleFormView";

const form = document.getElementById("registro") as HTMLFormElement;
const result = document.querySelector<HTMLDivElement>("#resultado");
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;
const linkRegistro = document.querySelector<HTMLParagraphElement>(".link__registro");

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
		toggleFormView({
			form,
			result,
			link: linkRegistro,
			showForm: false,
			resultState: "error",
			resultHtml: `<h3>Email o contraseña incorrectos.</h3>
			<p>Verificá tus datos e intentá de nuevo.</p>`,
		});

		setTimeout(() => {
			toggleFormView({ form, result, link: linkRegistro, showForm: true });
		}, 3000);
		return;
	}

	// Guardamos la sesión con los datos REALES del usuario encontrado (rol incluido)
	const { password, ...userSinPassword } = userExist;
	saveUser({ ...userSinPassword, loggedIn: true, password: "" });

	// Lógica de redirección según el ROL (centralizada en main.ts)
	redirection(userExist);
});
