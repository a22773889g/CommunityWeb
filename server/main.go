package main

import (
	model "github.com/a22773889g/CommunityWeb/server/models"
	api "github.com/a22773889g/CommunityWeb/server/router"
)

func main() {
	defer model.Db.Close()
	router := api.InitRouter()

	router.Run(":8080")
}
