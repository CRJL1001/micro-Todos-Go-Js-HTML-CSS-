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
