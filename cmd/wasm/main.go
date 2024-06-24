package main

import (
	"fmt"
	"syscall/js"

	"github.com/pmuens/time-lock-puzzle/lhtlp"
	"github.com/pmuens/time-lock-puzzle/tlp"
)

func main() {
	fmt.Printf("Hello %s\n", "World")

	js.Global().Set("runTLP", tlpWrapped())
	js.Global().Set("runLHTLP", lhtlpWrapped())

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

func lhtlpWrapped() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) any {
		if len(args) != 3 {
			return "Invalid number of arguments passed."
		}

		bits := 1024

		message1 := args[0].Int()
		message2 := args[1].Int()
		difficulty := args[2].Int()

		fmt.Printf("Bits: %d\n", bits)
		fmt.Printf("Message #1: %d\n", message1)
		fmt.Printf("Message #2: %d\n", message2)
		fmt.Printf("Difficulty: %d\n", difficulty)

		params := lhtlp.NewParams(bits, difficulty)
		puzzle1 := lhtlp.NewPuzzle(*params, message1)
		puzzle2 := lhtlp.NewPuzzle(*params, message2)

		puzzle3 := puzzle1.Add(*puzzle2)

		solution := lhtlp.Solve(*puzzle3)

		return solution.String()
	})
}
