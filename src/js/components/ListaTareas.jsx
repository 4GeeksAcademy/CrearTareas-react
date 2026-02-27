import { useState, useEffect } from "react";
import { getTareas, crearUsuario, agregarTarea, borrarTarea, borrarTodasTareas } from "../../api/api.js";
import "./ListaTareas.css";


function ListaTareas() {
  const [tareas, setTareas] = useState([]);
  const [inputValor, setInputValor] = useState("");

  {/*
    es la funcion entre mi api y  visual */}

  const buscarTareas = async () => {
    const dato = await getTareas();
    if (dato && dato.todos)
      setTareas(dato.todos);
  };


  {/*trin, es la función que quita los espacios al principio y al final del texto. En esta logica, el retun es para que si escriben algo vacio, no se cargue. Es un ciclo, valida, envia al servidor,limpia el input y refresca la lista. */ }

  const masTareas = async () => {
    if (inputValor.trim() === "") {
      alert("Añade una tarea!");
      return;
    }
    const ok = await agregarTarea(inputValor);
    if (ok) {
      setInputValor("");
      buscarTareas();
    }
  };

  {/*esta función es para eliminar una tarea, recibe el id de la tarea que se tiene que eliminar, llama a la función borrarTarea del api, si la respuesta es ok, refresca la lista de tareas. */ }

  const eliminarTarea = async (id) => {
    const ok = await borrarTarea(id);
    if (ok)
      buscarTareas();
  };


  {/* esta funcion limpia todas las tareas y los usuarios. Aqui el servidor se queda vacio*/ }

  const eliminarTodasTareas = async () => {
    await borrarTodasTareas();
    await crearUsuario();
    setTareas([]);
  };

  useEffect(() => {
    buscarTareas();
  }, []);





  return (
    <div className="contenedor-principal">
      <h1>Lista de Tareas</h1>
      <div className="espacio-detarea">
        <ul>
          {tareas.length === 0 ? (
            <li className="mensaje-vacio">No hay tareas añade una tarea</li>
          ) : (tareas.map((tarea) => (
            <li key={tarea.id}>
              {tarea.label}
              <button className="boton-borrar" onClick={() => eliminarTarea(tarea.id)}>🗑️</button>
            </li>
          )))}
        </ul>
      </div>


      <div className="input-tarea">
        <input
          type="text"
          placeholder="Agregar un tarea"
          value={inputValor}
          onChange={(e) => setInputValor(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && masTareas()}
        />
        <button className="boton-añadir" onClick={masTareas}>Añadir</button>
      </div>



      <div className="footer">
        <div className="contador">{tareas.length} Taraeas Pendientes</div>

        <button
          className="limpiartodo" onClick={eliminarTodasTareas}> Limpiar Todo </button>

      </div>
    </div>
  );
}


export default ListaTareas;

