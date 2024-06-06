import { useState, useEffect } from "react";

export const useFetch = (url) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				const data = await response.json();
				setData(data);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				setError(error);
			}
		};
		fetchData();
	}, [url]);

	return { data, loading, error };
};
