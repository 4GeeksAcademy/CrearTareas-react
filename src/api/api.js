const url = "https://playground.4geeks.com/todo";
const usuario = "gene_fal";


export const getTareas = async () => {
    try {
        const response = await fetch(`${url}/users/${usuario}`);
        if (response.status === 404) {
            await crearUsuario();
            return { todos: [] };
        }
        return await response.json();
    } catch (error) {
        return { todos: [] };
    }
};


// crear un usuario

export const crearUsuario = async () => {
    try {
        const response = await fetch(`${url}/users/${usuario}`, {
            method: "POST",
            body: JSON.stringify({}),
            headers: { "Content-Type": "application/json" }
        });
        return response.ok;
    }
    catch (error) {
        console.error("Error al crear usuario");

    }
};



//Agregar tarea. recuerda,label es una varible

export const agregarTarea = async (label) => {
    try {
        const response = await fetch(`${url}/todos/${usuario}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ label, is_done: false })
        });
        if (!response.ok) {
            const errorDato = await response.json();
            console.log("Erro de la Api,", errorDato);
        }
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
