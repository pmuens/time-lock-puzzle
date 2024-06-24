package lhtlp

import (
	"crypto/rand"
	"math/big"
)

type Params struct {
	T *big.Int
	N *big.Int
	G *big.Int
	H *big.Int
}

func NewParams(bits int, difficulty int) *Params {
	one := big.NewInt(1)
	two := big.NewInt(2)

	p, _ := rand.Prime(rand.Reader, bits)
	q, _ := rand.Prime(rand.Reader, bits)

	n := new(big.Int).Mul(p, q)
	phi := new(big.Int).Mul(new(big.Int).Sub(p, one), new(big.Int).Sub(q, one))

	t := big.NewInt(int64(difficulty))

	gP, _ := rand.Int(rand.Reader, new(big.Int).Sub(n, one))
	g := new(big.Int).Exp(two, gP, n)
	g = new(big.Int).Sub(n, g)
	g.Mod(g, n)

	hP := new(big.Int).Exp(two, t, new(big.Int).Div(phi, two))
	h := new(big.Int).Exp(g, hP, n)

	return &Params{
		T: t,
		N: n,
		G: g,
		H: h,
	}
}

type Puzzle struct {
	U      *big.Int
	V      *big.Int
	Params Params
}

func NewPuzzle(params Params, message int) *Puzzle {
	n := params.N
	g := params.G
	h := params.H

	one := big.NewInt(1)

	m := big.NewInt(int64(message))

	n2 := new(big.Int).Mul(n, n)
	r, _ := rand.Int(rand.Reader, new(big.Int).Sub(n, one))

	u := new(big.Int).Exp(g, r, n)
	v := new(big.Int).Exp(h, new(big.Int).Mul(r, n), n2)
	v.Mul(v, new(big.Int).Exp(new(big.Int).Add(one, n), m, nil))
	v.Mod(v, n2)

	return &Puzzle{
		u,
		v,
		params,
	}
}

func (p *Puzzle) Add(other Puzzle) *Puzzle {
	if p.Params != other.Params {
		panic("puzzle parameters should be the same")
	}

	params := p.Params
	n := params.N

	n2 := new(big.Int).Mul(n, n)

	u := new(big.Int).Mul(p.U, other.U)
	u.Mod(u, n)

	v := new(big.Int).Mul(p.V, other.V)
	v.Mod(v, n2)

	return &Puzzle{
		u,
		v,
		params,
	}
}

func Solve(puzzle Puzzle) *big.Int {
	n := puzzle.Params.N
	t := puzzle.Params.T
	u := puzzle.U
	v := puzzle.V

	one := big.NewInt(1)
	two := big.NewInt(2)
	n2 := new(big.Int).Mul(n, n)

	w := new(big.Int).Exp(u, new(big.Int).Exp(two, t, nil), n) // u^(2^t) mod n
	w.Exp(w, n, n2)                                            // w^n mod n^2
	w.ModInverse(w, n2)                                        // w^(-n)
	vw := new(big.Int).Mul(v, w)                               // v * w

	sNum := new(big.Int).Mod(vw, n2)
	sNum.Sub(sNum, one)
	s := new(big.Int).Div(sNum, n)

	return s
}
