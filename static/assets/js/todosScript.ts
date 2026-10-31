import {deleteTodo, fetchTodos, toggleTask, updateTitle} from "./requestHandler.js";
import type {Todo} from "./types";
import {confirmation} from "./helper.js";

const todolist:HTMLElement|null= document.getElementById("todo-ul");
const todos:Todo[]|undefined  = await fetchTodos();

todos?.forEach((todo:Todo):void => {
    const element:HTMLLIElement = document.createElement("li");
    element.innerHTML = `
        <div class="inline-flex gap-4 mt-4 items-center">
            <span></span> - <button class="mod" type="button"><img alt="" class="mod-icon"></button> - <button class="toggle-btn" type="button"><img class="toggle-icon" alt=""></button>
             - <button class="delete-btn" type="button"><img alt="" class="delete-icon"></button>
        </div>
    `;
    //title
    const title:HTMLElement = element.querySelector("span")!;
    title.textContent = todo.Title;
    //checkbox handling
    const checkbox:HTMLButtonElement = element.querySelector(".toggle-btn")!;
    const icon:HTMLImageElement = checkbox.querySelector(".toggle-icon")!;
    checkbox.setAttribute("aria-label", `Toggle ${todo.Title}`);
    icon.src = `/static/assets/svg/${todo.Done ? "check_box.svg" : "check_box_outline_blank.svg"}`;
    checkbox.setAttribute("aria-pressed", String(todo.Done));

    checkbox.addEventListener("click", async ():Promise<void> => { //click to toggle
        checkbox.disabled = true;
        try {
            todo.Done = (await toggleTask(todo.ID)).Done;
        } catch (error) {
            console.error(error);
            alert("Could not update the task. Please try again.");
        } finally {
            icon.src = `/static/assets/svg/${todo.Done ? "check_box.svg" : "check_box_outline_blank.svg"}`;
            checkbox.setAttribute("aria-pressed", String(todo.Done));
            checkbox.disabled = false;
        }
    });

    //edit-btn handling
    const editBtn:HTMLButtonElement = element.querySelector<HTMLButtonElement>(".mod")!;
    editBtn.setAttribute("aria-label", `Edit ${todo.Title}`);
    editBtn.setAttribute("aria-pressed", `Editing ${todo.Title}`);
    const editIcon:HTMLImageElement = element.querySelector<HTMLImageElement>(".mod-icon")!;
    editIcon.src = `/static/assets/svg/edit.svg`;

    editBtn.addEventListener("click", ():void => {
        title.contentEditable = "true";
        title.focus();
    })
    title.addEventListener("blur", async ():Promise<void> => {
        title.contentEditable = "false";
        try {
            await updateTitle(todo.ID, title.textContent);
        }catch(error){
            console.error(error);
            alert("Could not update the task, please try again");
        }
    })

    //delete button

    const delete_btn:HTMLInputElement = element.querySelector<HTMLInputElement>(".delete-btn")!;
    const delete_icon:HTMLImageElement = element.querySelector<HTMLImageElement>(".delete-icon")!;
    delete_btn.setAttribute("aria-label", `Delete ${todo.Title}`);
    delete_btn.setAttribute("aria-pressed", `${todo.Title} deletion`);
    delete_icon.src = `/static/assets/svg/delete.svg`;

    delete_btn.addEventListener("click", async ():Promise<void> => {
        if (!confirmation()) return;
        try{
            await deleteTodo(todo.ID);
        }catch (error){
            console.error(error);
            alert("Could not delete the tasks, try again");
        }finally {
            element.remove();
        }
    })
    todolist?.append(element);
});
