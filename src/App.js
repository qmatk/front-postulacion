import "./App.css";
import { useEffect, useMemo, useState } from "react";
import { filters, headers } from "./data/data.js";
import { useFetch } from "./hooks/useData.js";

function App() {
	const [result, setResult] = useState([]);
	// const [resultDisplay, setResultDisplay] = useState([]);
	// const [currentSlice, setCurrentSlice] = useState(0);
	// const [maxSlice, setMaxSlice] = useState(10);
	const [color, setColor] = useState(false);
	const [sortedField, setSortedField] = useState(null);

	const { data, loading, error } = useFetch(
		"https://randomuser.me/api/?results=100"
	);

	useEffect(() => {
		if (data) {
			setResult(data.results);
		}
		// if (result) setResultDisplay(result.slice(currentSlice, maxSlice));
	}, [data]);

	const onFilter = (filter) => {
		if (filter === "restore") setResult(data.results);
		if (filter === "color") setColor(!color);
	};

	const onCountry = (country) => {
		if (!country) {
			setResult(data.results);
			return;
		}

		// eslint-disable-next-line array-callback-return
		const found = result.filter((row) => {
			if (row.location.country === country) return row;
		});

		if (found) return setResult(found);
	};

	const onDelete = (index) => {
		const newResult = result.filter((row, i) => i !== index);
		return setResult(newResult);
	};

	useMemo(() => {
		let sorted = result;

		if (!sortedField) return;

		if (sortedField === "name.first") {
			sorted = result.sort((a, b) => {
				if (a.name.first < b.name.first) return -1;
				if (a.name.first > b.name.first) return 1;
				return 0;
			});
		}
		if (sortedField === "name.last") {
			sorted = result.sort((a, b) => {
				if (a.name.last < b.name.last) return -1;
				if (a.name.last > b.name.last) return 1;
				return 0;
			});
		}
		if (sortedField === "location.country") {
			sorted = result.sort((a, b) => {
				if (a.location.country < b.location.country) return -1;
				if (a.location.country > b.location.country) return 1;
				return 0;
			});
		}

		// setResultDisplay(sorted.slice(currentSlice, maxSlice));
		setResult(sorted);
		return sorted;
	}, [result, sortedField]);

	return (
		<div className="App">
			<h1 className="h1">Lista de libros</h1>
			<header className="App-header">
				{filters.map((filter, index) => {
					return (
						<button
							key={index}
							className="button-header"
							onClick={() =>
								filter.filter !== "order"
									? onFilter(filter.filter)
									: setSortedField("location.country")
							}
						>
							{filter.title}
						</button>
					);
				})}
				<input
					className="input-header"
					placeholder="Filtrar por país"
					onBlur={(e) => onCountry(e.target.value)}
				/>
			</header>
			{error && <p>Error: {error.message}</p>}
			{loading && <p>Cargando...</p>}
			{result && (
				<div className="container">
					<table className="table">
						<thead>
							<tr>
								{headers.map((header, index) => {
									return (
										<th
											key={index}
											onClick={() =>
												header.sort ? setSortedField(header.field) : null
											}
										>
											{header.title}
										</th>
									);
								})}
							</tr>
						</thead>
						<tbody>
							{result.map((row, index) => {
								return (
									<tr
										key={index}
										className={
											color
												? index % 2 === 1
													? "row-impar"
													: "row-par"
												: "row-hover"
										}
									>
										<td>
											<img
												className="img"
												src={row.picture.thumbnail}
												alt={row.picture.thumbnail}
											/>
										</td>
										<td>{row.name.first}</td>
										<td>{row.name.last}</td>
										<td>{row.location.country}</td>
										<td>
											<button
												className="button-delete"
												onClick={() => onDelete(index)}
											>
												Eliminar
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					{/* <div className="pagination">
						<div>
							{currentSlice + 1} de {maxSlice}
						</div>
						<div>
							<button
								className="pagination-button"
								onClick={() => {
									if (currentSlice === 0) return;
									setCurrentSlice((prev) => prev - 10);
									setMaxSlice((prev) => prev - 10);
								}}
							>
								{"Página anterior"}
							</button>
							<button
								className="pagination-button"
								onClick={() => {
									if (maxSlice === 100) return;
									setCurrentSlice((prev) => prev + 10);
									setMaxSlice((prev) => prev + 10);
								}}
							>
								{"Página siguiente"}
							</button>
						</div>
					</div> */}
				</div>
			)}
		</div>
	);
}

export default App;
