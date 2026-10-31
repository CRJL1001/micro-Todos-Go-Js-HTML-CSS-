import type {Todo} from "./types.js";
import {fetchTodos} from "./requestHandler.js";

const todolist: HTMLElement|null = document.getElementById("todo-ul");

const todos: Todo[]|undefined = await fetchTodos();

todos?.forEach( (todo:Todo):any => {
    const element:HTMLElement = document.createElement("li");
    element.innerHTML = `
        <div class="inline-flex gap-4 mt-4">
            <span>${todo.Title}</span>
            <span>-</span>
            <img src="${todo.Done ? "/static/assets/svg/check_box.svg" : "/static/assets/svg/check_box_outline_blank.svg"}" alt="task state check-box">
        </div>
        
    `
    todolist?.appendChild(element);
})