package main

import (
	"encoding/json"
	"fmt"
	"syscall/js"
)

func main() {
	fmt.Printf("Hello %s\n", "World")

	js.Global().Set("prettyJSON", jsonWrapper())

	<-make(chan struct{})
}

func prettyJSON(input string) (string, error) {
	var raw any
	if err := json.Unmarshal([]byte(input), &raw); err != nil {
		return "", err
	}

	pretty, err := json.MarshalIndent(raw, "", "  ")
	if err != nil {
		return "", err
	}

	return string(pretty), nil
}

func jsonWrapper() js.Func {
	jsonFunc := js.FuncOf(func(this js.Value, args []js.Value) any {
		if len(args) != 1 {
			return "Invalid number of arguments passed."
		}

		input := args[0].String()
		fmt.Printf("Input: %s\n", input)

		prettified, err := prettyJSON(input)
		if err != nil {
			fmt.Printf("Unable to convert to json %s\n", err)
			return err.Error()
		}

		return prettified
	})

	return jsonFunc
}
