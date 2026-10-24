package main

import (
	"Todo/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	//créer le routeur

	var router = gin.Default()

	//créer le static
	router.Static("/static", "./static")

	//servir le html
	router.GET("/", handlers.HandleHome)

	//créer les routes
	router.GET("/todos", handlers.GetTodos)
	router.POST("/addtodo", handlers.AddTodo)
	router.PUT("/toggle/:ID", handlers.ToggleTodo)
	router.DELETE("/deletetodo/:ID", handlers.DeleteTodo)

	//écouter et servire
	router.Run(":8080")

}
