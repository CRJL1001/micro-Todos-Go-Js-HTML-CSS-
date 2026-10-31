import { deleteTodo, fetchTodos, toggleTask, updateTitle } from "./requestHandler.js";
import { confirmation } from "./helper.js";
const todolist = document.getElementById("todo-ul");
const todos = await fetchTodos();
todos?.forEach((todo) => {
    const element = document.createElement("li");
    element.innerHTML = `
        <div class="inline-flex gap-4 mt-4 items-center">
            <span></span> - <button class="mod" type="button"><img alt="" class="mod-icon"></button> - <button class="toggle-btn" type="button"><img class="toggle-icon" alt=""></button>
             - <button class="delete-btn" type="button"><img alt="" class="delete-icon"></button>
        </div>
    `;
    //title
    const title = element.querySelector("span");
    title.textContent = todo.Title;
    //checkbox handling
    const checkbox = element.querySelector(".toggle-btn");
    const icon = checkbox.querySelector(".toggle-icon");
    checkbox.setAttribute("aria-label", `Toggle ${todo.Title}`);
    icon.src = `/static/assets/svg/${todo.Done ? "check_box.svg" : "check_box_outline_blank.svg"}`;
    checkbox.setAttribute("aria-pressed", String(todo.Done));
    checkbox.addEventListener("click", async () => {
        checkbox.disabled = true;
        try {
            todo.Done = (await toggleTask(todo.ID)).Done;
        }
        catch (error) {
            console.error(error);
            alert("Could not update the task. Please try again.");
        }
        finally {
            icon.src = `/static/assets/svg/${todo.Done ? "check_box.svg" : "check_box_outline_blank.svg"}`;
            checkbox.setAttribute("aria-pressed", String(todo.Done));
            checkbox.disabled = false;
        }
    });
    //edit-btn handling
    const editBtn = element.querySelector(".mod");
    editBtn.setAttribute("aria-label", `Edit ${todo.Title}`);
    editBtn.setAttribute("aria-pressed", `Editing ${todo.Title}`);
    const editIcon = element.querySelector(".mod-icon");
    editIcon.src = `/static/assets/svg/edit.svg`;
    editBtn.addEventListener("click", () => {
        title.contentEditable = "true";
        title.focus();
    });
    title.addEventListener("blur", async () => {
        title.contentEditable = "false";
        try {
            await updateTitle(todo.ID, title.textContent);
        }
        catch (error) {
            console.error(error);
            alert("Could not update the task, please try again");
        }
    });
    //delete button
    const delete_btn = element.querySelector(".delete-btn");
    const delete_icon = element.querySelector(".delete-icon");
    delete_btn.setAttribute("aria-label", `Delete ${todo.Title}`);
    delete_btn.setAttribute("aria-pressed", `${todo.Title} deletion`);
    delete_icon.src = `/static/assets/svg/delete.svg`;
    delete_btn.addEventListener("click", async () => {
        if (!confirmation())
            return;
        try {
            await deleteTodo(todo.ID);
        }
        catch (error) {
            console.error(error);
            alert("Could not delete the tasks, try again");
        }
        finally {
            element.remove();
        }
    });
    todolist?.append(element);
});
