package utils

import (
	"Todo/handlers"
	"Todo/models"
	"fmt"
)

func seedhelper(newtodos []models.Todo) {
	e := handlers.SeedingTodos(newtodos)
	if e {
		fmt.Println("todos seeded")
	} else {
		fmt.Println("todos not seeded")
	}
}

var seedTodos = []models.Todo{
	{Title: "Buy groceries", Done: false},
	{Title: "Learn Go", Done: false},
	{Title: "Set up the project", Done: true},
}

func Seed() {
	seedhelper(seedTodos)
}
