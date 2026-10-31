package handlers

import (
	"Todo/models"
	"testing"
)

func TestSeededTodosHaveUniqueIDs(t *testing.T) {
	previous := todos
	todos = nil
	t.Cleanup(func() { todos = previous })
	SeedingTodos([]models.Todo{{Title: "First"}, {Title: "Second"}})
	if len(todos) != 2 || todos[0].ID == "" || todos[1].ID == "" || todos[0].ID == todos[1].ID {
		t.Fatalf("seeded todos need distinct, nonempty IDs: %+v", todos)
	}
}
