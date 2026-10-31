package main

import (
	"Todo/handlers"
	"Todo/utils"

	"github.com/gin-gonic/gin"
)

func main() {
	//seed
	utils.Seed()

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
	router.PUT("/update/:ID/:Title", handlers.UpdateName)

	//écouter et servire
	router.Run(":8080")

}
