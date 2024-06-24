package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Starting server at http://127.0.0.1:3000")
	// TODO: Update to use path to `assets` relative to CWD.
	err := http.ListenAndServe(":3000", http.FileServer(http.Dir("./docs")))
	if err != nil {
		fmt.Println("Failed to start server", err)
		return
	}
}
