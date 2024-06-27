package tlp_test

import (
	"math/big"
	"testing"

	"github.com/pmuens/time-lock-puzzle/tlp"
)

func TestTLP(t *testing.T) {
	t.Run("Generate and solve", func(t *testing.T) {
		bits := 1024
		message := 42
		difficulty := 1

		want := big.NewInt(int64(message))

		puzzle := tlp.Generate(bits, message, difficulty)
		got := tlp.Solve(puzzle)

		if got.String() != want.String() {
			t.Errorf("got %s want %s", got, want)
		}
	})
}
