package main

import (
	"fmt"
	"os"

	"github.com/pmuens/time-lock-puzzle/lhtlp"
	"github.com/pmuens/time-lock-puzzle/tlp"
)

func main() {
	e := &env{
		stdout: os.Stdout,
		stderr: os.Stderr,
		args:   os.Args,
	}

	if err := run(e); err != nil {
		fmt.Fprintln(e.stderr, err)
		os.Exit(1)
	}
}

func run(e *env) error {
	c := config{
		bits:     1024,
		message1: 42,
		message2: 24,
	}

	if err := parseConfig(&c, e.args[1:], e.stderr); err != nil {
		return err
	}

	runTLP(e, &c)

	fmt.Fprintf(e.stdout, "\n\n-----------------------------------\n\n")

	runLHTLP(e, &c)

	fmt.Fprintf(e.stdout, "\n")

	return nil
}

func runTLP(e *env, c *config) {
	fmt.Fprintf(e.stdout, "Creating a Time-Lock Puzzle with bits %d, message %d and difficulty %d.\n\n", c.bits, c.message1, c.difficulty)

	puzzle := tlp.Generate(c.bits, c.message1, c.difficulty)

	fmt.Fprintf(e.stdout, "N: %v\nA: %v\nT: %v\nZ: %v\n\n", puzzle.N, puzzle.A, puzzle.T, puzzle.Z)

	fmt.Fprint(e.stdout, "Solving puzzle...\n")

	solution := tlp.Solve(puzzle)

	fmt.Fprintf(e.stdout, "Hidden value was: %d", solution)
}
func runLHTLP(e *env, c *config) {
	fmt.Fprintf(e.stdout, "Creating a Linearly Homomorphic Time-Lock Puzzle with bits %d, %d as message #1, %d as message #2 and a difficulty of %d.\n\n", c.bits, c.message1, c.message2, c.difficulty)

	params := lhtlp.NewParams(c.bits, c.difficulty)
	puzzle1 := lhtlp.NewPuzzle(*params, c.message1)
	puzzle2 := lhtlp.NewPuzzle(*params, c.message2)
	puzzle3 := puzzle1.Add(*puzzle2)

	fmt.Fprintf(e.stdout, "--- Params ---\nT: %v\nN: %v\nG: %v\nH: %v\n\n", params.T, params.N, params.G, params.H)
	fmt.Fprintf(e.stdout, "--- Puzzle ---\nU: %v\nV: %v\n\n", puzzle3.U, puzzle3.V)

	fmt.Fprint(e.stdout, "Solving puzzle...\n")

	solution := lhtlp.Solve(*puzzle3)

	fmt.Fprintf(e.stdout, "Hidden value was: %d", solution)
}
