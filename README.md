# [Time-Lock Puzzle](https://pmuens.github.io/time-lock-puzzle)

Time-Lock Puzzles allow one to hide a message in a cryptographic puzzle that can only be solved after performing an operation $x$ times. The operation is constructed in a way such that a parallel execution is impossible which ensures that the puzzle's difficulty can be reliably determined using current advancements in hardware as a baseline.

The repository includes two Time-Lock Puzzle implementations.

The [first implementation](https://pmuens.github.io/time-lock-puzzle/tlp.html) is the Time-Lock Puzzle construction which was introduced by Rivest et al. in "[Time-Lock Puzzles and Timed-Release Crypto](https://people.eecs.berkeley.edu/~daw/papers/timelock.pdf)". Using this scheme, one can hide a message in a puzzle which is recoverable after time $t$.

The [second implementation](https://pmuens.github.io/time-lock-puzzle/lhtlp.html) is the Linearly Homomorphic Time Lock Puzzle construction that was introduced by Malavolta et al. in "[Homomorphic Time-Lock Puzzles and Applications](https://eprint.iacr.org/2019/635.pdf)". This scheme is special in that it allows for the combination of multiple puzzles into one puzzle which, once solved, reveals the sum of the individual puzzles that were combined.

## Setup

1. `git clone <url>`
2. `cd <name>`
3. `go run ./cmd/tlp`
4. `GOOS=js GOARCH=wasm go build -o ./docs/main.wasm cmd/wasm/main.go`
5. `go run ./cmd/server`
6. [http://127.0.0.1:3000](http://127.0.0.1:3000)

## Useful Commands

```sh
go run <package-path>

go build [<package-path>]

go test [<package-path>][/...] [-v] [-parellel <number>]
go test -bench=. [<package-path>] [-count <number>] [-benchmem] [-benchtime 2s] [-memprofile <name>]
go test -cover [<package-path>]
go test -race [<package-path>] [-count <number>]
go test -shuffle on [<package-path>]
go test -cover
go test -coverprofile <name> [<package-path>]
go test -run FuncName/RunName

go tool cover -html <name>
go tool cover -func <name>

go tool pprof -list <name> <profile-name>

go fmt [<package-path>]

go vet [<package-path>]

go clean [<package-path>]

go help <command-name>

go mod init [<module-path>]
go mod tidy
go mod vendor
go mod download

go work init [<module-path-1> [<module-path-2>] [...]]
go work use [<module-path-1> [<module-path-2>] [...]]
go work sync

# Adjust dependencies in `go.mod`.
go get <package-path>[@<version>]
go get <package-path>@none

# Build and install commands.
go install <package-path>[@<version>]

go list -m [all]

# Has to be run only once.
cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" ./docs/

# Run from project's root directory.
GOOS=js GOARCH=wasm go build -o ./docs/main.wasm cmd/wasm/main.go
```

## Useful Resources

### Go

- [Go - Learn](https://go.dev/learn)
- [Go - Documentation](https://go.dev/doc)
- [Go - A Tour of Go](https://go.dev/tour)
- [Go - Effective Go](https://go.dev/doc/effective_go)
- [Go - Playground](https://go.dev/play)
- [Go by Example](https://gobyexample.com)
