import type {Todo} from "./types.js"

const ApiUrl: string = "/todos"

export async function fetchTodos(): Promise<Todo[]|undefined>  {
    try {
        const response: Response = await fetch(ApiUrl);
        const todos: Todo[] = await response.json();
        return todos;

    } catch (e: unknown){
        if (e instanceof Error)
            console.error(`Erreur lors de l'interrogation API : ${e.name} -> ${e.message}`)
        else
            console.error(`Erreur lors de l'interrogation de l'API : ${e}`);
    }
    return undefined;
}

export async function toggleTask(id: string): Promise<Todo> {
    const response:Response = await fetch(`/toggle/${id}`, {method: "PUT"});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
}

export async function updateTitle(id:string, newTitle:string): Promise<Todo> {
    const response:Response = await fetch(`update/${id}/${newTitle}`, {method: "PUT"});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
}

export async function deleteTodo(id:string):Promise<Todo> {
    const response:Response = await fetch(`deletetodo/${id}`, {method: "DELETE"});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
}

export async function addTodo(Title: string):Promise<Todo|undefined> {
    if (Title == ""){
        console.error("Titre vide");
        return;
    }
    const response:Response = await fetch("addtodo", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({Title, Done: false})
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json()
}
