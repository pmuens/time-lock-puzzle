package main

import (
	"errors"
	"flag"
	"fmt"
	"io"
)

type env struct {
	stdout io.Writer
	stderr io.Writer
	args   []string
}

type config struct {
	bits       int
	message1   int
	message2   int
	difficulty int
}

func parseConfig(c *config, args []string, stderr io.Writer) error {
	fs := flag.NewFlagSet("tlp", flag.ContinueOnError)
	fs.SetOutput(stderr)

	fs.Usage = func() {
		fmt.Fprintf(fs.Output(), "usage: %s [options]\n", fs.Name())
		fs.PrintDefaults()
	}

	fs.IntVar(&c.difficulty, "difficulty", 100, "Difficulty of puzzle")
	if err := fs.Parse(args); err != nil {
		return err
	}

	if err := validateArgs(c); err != nil {
		fmt.Fprintln(fs.Output(), err)
		fs.Usage()
		return err
	}

	return nil
}

func validateArgs(c *config) error {
	if c.difficulty == 0 {
		return argError(c.difficulty, "flag -difficulty", errors.New("should not be empty"))
	}

	return nil
}

func argError(value any, arg string, err error) error {
	return fmt.Errorf(`invalid value "%v" for %s: %w`, value, arg, err)
}
