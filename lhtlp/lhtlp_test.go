package lhtlp_test

import (
	"math/big"
	"testing"

	"github.com/pmuens/time-lock-puzzle/lhtlp"
)

const Bits = 1024

func TestLHTLP(t *testing.T) {
	t.Run("Generate and solve one puzzle", func(t *testing.T) {
		message := 42
		difficulty := 1

		want := big.NewInt(int64(message))

		params := lhtlp.NewParams(Bits, difficulty)
		puzzle := lhtlp.NewPuzzle(*params, message)

		got := lhtlp.Solve(*puzzle)

		if got.String() != want.String() {
			t.Errorf("got %s want %s", got, want)
		}
	})

	t.Run("Generate and solve multiple puzzles", func(t *testing.T) {
		message1 := 42
		message2 := 24
		message3 := 33
		difficulty := 1

		want := big.NewInt(int64(message1 + message2 + message3))

		params := lhtlp.NewParams(Bits, difficulty)
		puzzle1 := lhtlp.NewPuzzle(*params, message1)
		puzzle2 := lhtlp.NewPuzzle(*params, message2)
		puzzle3 := lhtlp.NewPuzzle(*params, message3)
		puzzle4 := puzzle1.Add(*puzzle2).Add(*puzzle3)

		got := lhtlp.Solve(*puzzle4)

		if got.String() != want.String() {
			t.Errorf("got %s want %s", got, want)
		}
	})
}
