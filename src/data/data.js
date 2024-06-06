export const filters = [
	{ title: "Colorea filas", filter: "color" },
	{ title: "Ordena por país", filter: "order" },
	{ title: "Restaurar", filter: "restore" },
];
export const headers = [
	{ title: "Foto", sort: false },
	{ title: "Nombre", sort: true, field: "name.first" },
	{ title: "Apellido", sort: true, field: "name.last" },
	{ title: "País", sort: true, field: "location.country" },
	{ title: "Acciones", sort: false },
];
