const ApiUrl = "/todos";
export async function fetchTodos() {
    try {
        const response = await fetch(ApiUrl);
        const todos = await response.json();
        return todos;
    }
    catch (e) {
        if (e instanceof Error)
            console.error(`Erreur lors de l'interrogation API : ${e.name} -> ${e.message}`);
        else
            console.error(`Erreur lors de l'interrogation de l'API : ${e}`);
    }
    return undefined;
}
export async function toggleTask(id) {
    const response = await fetch(`/toggle/${id}`, { method: "PUT" });
    if (!response.ok)
        throw new Error(`HTTP ${response.status}`);
    return response.json();
}
export async function updateTitle(id, newTitle) {
    const response = await fetch(`update/${id}/${newTitle}`, { method: "PUT" });
    if (!response.ok)
        throw new Error(`HTTP ${response.status}`);
    return response.json();
}
export async function deleteTodo(id) {
    const response = await fetch(`deletetodo/${id}`, { method: "DELETE" });
    if (!response.ok)
        throw new Error(`HTTP ${response.status}`);
    return response.json();
}
export async function addTodo(Title) {
    if (Title == "") {
        console.error("Titre vide");
        return;
    }
    const response = await fetch("addtodo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Title, Done: false })
    });
    if (!response.ok)
        throw new Error(`HTTP ${response.status}`);
    return response.json();
}
