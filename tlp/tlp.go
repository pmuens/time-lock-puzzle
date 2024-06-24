package tlp

import (
	"crypto/rand"
	"math/big"
)

func Generate(bits int, message int, difficulty int) Puzzle {
	one := big.NewInt(1)
	two := big.NewInt(2)

	p, _ := rand.Prime(rand.Reader, bits)
	q, _ := rand.Prime(rand.Reader, bits)

	n := new(big.Int).Mul(p, q)
	phi := new(big.Int).Mul(new(big.Int).Sub(p, one), new(big.Int).Sub(q, one))

	m := big.NewInt(int64(message))
	t := big.NewInt(int64(difficulty))

	// a := two
	a, _ := rand.Int(rand.Reader, new(big.Int).Sub(n, one))

	e := new(big.Int).Exp(two, t, phi)
	b := new(big.Int).Exp(a, e, n)

	z := new(big.Int).Add(m, b)
	z.Mod(z, n)

	return Puzzle{
		N: n,
		A: a,
		T: t,
		Z: z,
	}
}

func Solve(puzzle Puzzle) *big.Int {
	a := puzzle.A
	n := puzzle.N
	t := puzzle.T
	z := puzzle.Z

	two := big.NewInt(2)

	b := new(big.Int).Exp(a, new(big.Int).Exp(two, t, nil), n)

	m := new(big.Int).Sub(z, b)

	return m
}

type Puzzle struct {
	N *big.Int
	A *big.Int
	T *big.Int
	Z *big.Int
}
