//go:build wasm

package main

import (
	"encoding/json"
	"fmt"
	"syscall/js"

	"github.com/pmuens/time-lock-puzzle/lhtlp"
	"github.com/pmuens/time-lock-puzzle/tlp"
)

const Bits = 1024

func main() {
	fmt.Printf("Hello %s\n", "World")

	js.Global().Set("generateTLP", generateTLP())
	js.Global().Set("solveTLP", solveTLP())

	js.Global().Set("generateLHTLP", generateLHTLP())
	js.Global().Set("solveLHTLP", solveLHTLP())

	<-make(chan struct{})
}

func generateTLP() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) any {
		if len(args) != 2 {
			return "Invalid number of arguments passed."
		}

		message := args[0].Int()
		difficulty := args[1].Int()

		fmt.Printf("Bits: %d\n", Bits)
		fmt.Printf("Message: %d\n", message)
		fmt.Printf("Difficulty: %d\n", difficulty)

		puzzle := tlp.Generate(Bits, message, difficulty)

		b, err := json.MarshalIndent(puzzle, "", "  ")
		if err != nil {
			fmt.Printf("Unable to convert puzzle to JSON %s\n", err)
			return err.Error()
		}

		return string(b)
	})
}

func solveTLP() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) any {
		if len(args) != 1 {
			return "Invalid number of arguments passed."
		}

		var puzzle tlp.Puzzle
		puzzleJSON := args[0].String()
		err := json.Unmarshal([]byte(puzzleJSON), &puzzle)
		if err != nil {
			fmt.Printf("Unable to convert JSON to puzzle %s\n", err)
			return err.Error()
		}

		fmt.Printf("N: %s\n", puzzle.N)
		fmt.Printf("A: %s\n", puzzle.A)
		fmt.Printf("T: %s\n", puzzle.T)
		fmt.Printf("Z: %s\n", puzzle.Z)

		solution := tlp.Solve(puzzle)

		return solution.String()
	})
}

func generateLHTLP() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) any {
		if len(args) != 3 {
			return "Invalid number of arguments passed."
		}

		message1 := args[0].Int()
		message2 := args[1].Int()
		difficulty := args[2].Int()

		fmt.Printf("Bits: %d\n", Bits)
		fmt.Printf("Message #1: %d\n", message1)
		fmt.Printf("Message #2: %d\n", message2)
		fmt.Printf("Difficulty: %d\n", difficulty)

		params := lhtlp.NewParams(Bits, difficulty)
		puzzle1 := lhtlp.NewPuzzle(*params, message1)
		puzzle2 := lhtlp.NewPuzzle(*params, message2)

		puzzle3 := puzzle1.Add(*puzzle2)

		b, err := json.MarshalIndent(puzzle3, "", "  ")
		if err != nil {
			fmt.Printf("Unable to convert puzzle to JSON %s\n", err)
			return err.Error()
		}

		return string(b)
	})
}

func solveLHTLP() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) any {
		if len(args) != 1 {
			return "Invalid number of arguments passed."
		}

		var puzzle lhtlp.Puzzle
		puzzleJSON := args[0].String()
		err := json.Unmarshal([]byte(puzzleJSON), &puzzle)
		if err != nil {
			fmt.Printf("Unable to convert JSON to puzzle %s\n", err)
			return err.Error()
		}

		fmt.Printf("U: %s\n", puzzle.U)
		fmt.Printf("V: %s\n", puzzle.V)
		fmt.Printf("Params (G): %v\n", puzzle.Params.G)
		fmt.Printf("Params (H): %v\n", puzzle.Params.H)
		fmt.Printf("Params (N): %v\n", puzzle.Params.N)
		fmt.Printf("Params (T): %v\n", puzzle.Params.T)

		solution := lhtlp.Solve(puzzle)

		return solution.String()
	})
}
