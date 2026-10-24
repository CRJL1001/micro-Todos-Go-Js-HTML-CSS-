package handlers

import "github.com/gin-gonic/gin"

func HandleHome(c *gin.Context) {
	c.File("./public/index.html")
}
