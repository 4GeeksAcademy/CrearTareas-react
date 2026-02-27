const url = "https://playground.4geeks.com/todo";
const usuario = "gene_fal";



// Traeme las tareas del usuario, y no existe devuelves null
export const getTareas = async () => {
    try {
        const response = await fetch(`${url}/users/${usuario}`);
        if (response.status === 404) return null;
        return await response.json();
    } catch (error) { return null; }
};


// crear un usuario

export const crearUsuario = async () => {
    try {
        await fetch(`${url}/users/${usuario}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });
    }
    catch (error) { console.log("Usuario creado"); }
};



//Agregar tarea. recuerda,label es una varible que recoge
export const agregarTarea = async (label) => {
    try {
        const response = await fetch(`${url}/todos/${usuario}`, {
            method: "POST",
            body: JSON.stringify({ label, is_done: false }),
            headers: { "Content-Type": "application/json" }
        });
        return response.ok;
    } catch (error) {
        return false;
    }
};


//Borrar tarea, recuerda id es una variable que recoge el id de la tarea a borrar

export const borrarTarea = async (id) => {
    try {
        const response = await fetch(`${url}/todos/${id}`, {
            method: "DELETE"
        });
        return response.ok;
    } catch (error) {
        return false;
    }
};



//borrar todas las tareas
export const borrarTodasTareas = async () => {
    try {
        await fetch(`${url}/users/${usuario}`, {
            method: "DELETE"
        });
    } catch (error) {
        console.log("Error al borrar todas las tareas");
    }
};
