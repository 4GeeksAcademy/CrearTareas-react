import { useState, useEffect } from "react";
import "./ListaTareas.css";

function ListaTareas() {
  const [tareas, setTareas] = useState([]);
  const [inputValor, setInputValor] = useState("");

  useEffect(() => {
    const aviso = setTimeout(() => {
      alert("¡Dayloc, no te olvides de agregar una tarea!");
    }, 5000);
    return () => clearTimeout(aviso);
  }, []);

  const agregarTarea = () => {
    if (inputValor.trim() !== "") {
      setTareas([...tareas, inputValor]);
      setInputValor("");
    } else {
      alert("¡Agrega un nueva tarea!")
    }
  };

  const borrarTarea = (indiceBorrar) => {
    const NuevasTareas = tareas.filter((_, index) => index !== indiceBorrar);
    setTareas(NuevasTareas)
  }


  return (
    <div className="contenedor-principal">
      <h1>Lista de Tareas</h1>
      <div className="input-tarea">
        <input
          type="text"
          placeholder="Agregar un tarea"
          value={inputValor}
          onChange={(e) => setInputValor(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && agregarTarea()}
        />
        <button className="boton-agregar" onClick={agregarTarea}>Agregar</button>
      </div>

      <div className="espacio-detarea">
        {tareas.length === 0 ? (<p className="mensaje-vacio"> No hay tareas</p>) : (
          <ul>
            {tareas.map((tarea, index) => (
              <li
                key={index}>
                {tarea}
                <button className="boton-borrar" onClick={() => borrarTarea(index)}>x</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h3 className="tareas-pendiente">  Tareas Pendiente : {tareas.length}</h3>
    </div>
  );
}

export default ListaTareas;



