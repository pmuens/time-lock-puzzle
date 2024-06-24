package main

import (
	"fmt"
	"syscall/js"

	"github.com/pmuens/time-lock-puzzle/tlp"
)

func main() {
	fmt.Printf("Hello %s\n", "World")

	js.Global().Set("runTLP", tlpWrapped())

	<-make(chan struct{})
}

func tlpWrapped() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) any {
		if len(args) != 2 {
			return "Invalid number of arguments passed."
		}

		bits := 1024

		message := args[0].Int()
		difficulty := args[1].Int()

		fmt.Printf("Bits: %d\n", bits)
		fmt.Printf("Message: %d\n", message)
		fmt.Printf("Difficulty: %d\n", difficulty)

		puzzle := tlp.Generate(bits, message, difficulty)
		solution := tlp.Solve(puzzle)

		return solution.String()
	})
}
