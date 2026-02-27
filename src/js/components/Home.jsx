import React, { useState, useEffect } from "react";
import ListaTareas from './ListaTareas'
import { crearUsuario } from "../../api/api.js";

function Home() {

	const [creado, setCreado] = useState(false);
	useEffect(() => {
		const inicio = async () => {
			await crearUsuario();
			setCreado(true);
		};
		inicio();
	}, []);

	if (!creado) return null;


	return (
		<div className="text-center">
			<ListaTareas />
		</div>
	);
};

export default Home;