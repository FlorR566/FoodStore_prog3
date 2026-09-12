type ResultState = "success" | "error" | "none";

interface ToggleFormViewParams {
	form: HTMLFormElement | null;
	result: HTMLDivElement | null;
	link: HTMLParagraphElement | null;
	showForm: boolean;
	resultState?: ResultState; // opcional, solo se usa cuando showForm = false
	resultHtml?: string;
}

export function toggleFormView({
	form,
	result,
	link,
	showForm,
	resultState = "none",
	resultHtml = "",
}: ToggleFormViewParams) {
	if (!form || !result || !link) return;

	console.log("dentro de toggle");

	form.style.display = showForm ? "" : "none";
	link.style.display = showForm ? "" : "none";

	if (showForm) {
		result.style.display = "none";
	} else {
		result.className = resultState;
		result.innerHTML = resultHtml;
		result.style.display = "block";
	}
}
