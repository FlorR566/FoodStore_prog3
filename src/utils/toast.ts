export const mostrarFeedback = (mensaje: string): void => {
	const toast = document.createElement("div");
	toast.className = "toast";
	toast.textContent = mensaje;
	document.body.appendChild(toast);

	setTimeout(() => {
		toast.remove();
	}, 2000);
};
