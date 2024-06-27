package main

import (
	"io"
	"testing"
)

type parseConfigTest struct {
	name string
	args []string
	want config
}

func TestParseConfigValidInput(t *testing.T) {
	t.Parallel()

	for _, tt := range []parseConfigTest{
		{
			name: "no_flags",
			args: []string{},
			want: config{bits: 0, message1: 0, message2: 0, difficulty: 100},
		},
		{
			name: "all_flags",
			args: []string{"-difficulty=100000"},
			want: config{bits: 0, message1: 0, message2: 0, difficulty: 100_000},
		},
	} {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			var got config
			if err := parseConfig(&got, tt.args, io.Discard); err != nil {
				t.Fatalf("parseConfig() error = %v, want no error", err)
			}
			if got != tt.want {
				t.Errorf("flags = %+v, want %+v", got, tt.want)
			}
		})
	}
}

func TestParseConfigInvalidInput(t *testing.T) {
	t.Parallel()

	for _, tt := range []parseConfigTest{
		{name: "difficulty_zero", args: []string{"-difficulty=0"}},
	} {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			err := parseConfig(&config{}, tt.args, io.Discard)
			if err == nil {
				t.Fatal("parseConfig() = nil, want error")
			}
		})
	}
}
