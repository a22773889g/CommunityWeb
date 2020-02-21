package main

import (
	model "./models"
	api "./router"
)

func main() {
	defer model.Db.Close()
	router := api.InitRouter()

	router.Run(":8080")
}
