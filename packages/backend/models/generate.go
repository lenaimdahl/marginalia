// Package models contains the Book, Label, and Status types
// shared between frontend and backend. Types are generated from the JSON
// Schema files in /api/models; run `go generate ./...` to regenerate them.
package models

//go:generate go tool go-jsonschema -p models -o generated.go --tags json --capitalization ID -t ../../../api/models/status.yaml ../../../api/models/label.yaml ../../../api/models/book.yaml
