package handlers

import (
	"Todo/models"
	"net/http"
	"uuid"

	"github.com/gin-gonic/gin"
)

// BDD ici un slice de todos
var todos []models.Todo

// Montrer les todos GET

func GetTodos(c *gin.Context) {
	c.JSON(http.StatusOK, todos)
}

//ajouter POST

func AddTodo(c *gin.Context) {
	var newtodo models.Todo
	if err := c.ShouldBindJSON(&newtodo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	newtodo.ID = uuid.New().String()
	todos = append(todos, newtodo)
	c.JSON(http.StatusOK, newtodo)
}

//supprimer DELETE

func DeleteTodo(c *gin.Context) {
	id := c.Param("ID")
	for i, todo := range todos {
		if todo.ID == id {
			todos = append(todos[:i], todos[i+1:]...)
			c.JSON(http.StatusOK, todo)
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
}

//mettre Done PUT

func ToggleTodo(c *gin.Context) {
	id := c.Param("ID")
	for i, todo := range todos {
		if todo.ID == id {
			todos[i].Done = !todos[i].Done
			c.JSON(http.StatusOK, todos[i])
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
}
