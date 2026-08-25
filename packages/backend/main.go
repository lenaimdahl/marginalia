package main

import (
	"context"
	"encoding/json"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"log"
	"net/http"
	"os"
	"time"
)

type createBookRequest struct {
	Title  string `json:"title"`
	Author string `json:"author"`
}

type bookResponse struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	Author    string    `json:"author"`
	Status    string    `json:"status"`
	DateAdded time.Time `json:"dateAdded"`
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		databaseURL = "postgres://postgres:your-password@localhost:5432/marginalia_db"
	}

	database, err := pgxpool.New(context.Background(), databaseURL)
	if err != nil {
		log.Fatal(err)
	}
	defer database.Close()

	if err := database.Ping(context.Background()); err != nil {
		log.Fatal(err)
	}

	http.HandleFunc("GET /health", healthHandler)
	http.HandleFunc("OPTIONS /books", optionsBooksHandler)
	http.HandleFunc("POST /books", createBookHandler(database))

	log.Printf("Marginalia backend listening on http://localhost:%s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}

func optionsBooksHandler(
	response http.ResponseWriter,
	request *http.Request,
) {
	response.Header().Set(
		"Access-Control-Allow-Origin",
		"http://localhost:5173",
	)
	response.Header().Set(
		"Access-Control-Allow-Methods",
		"POST, OPTIONS",
	)
	response.Header().Set(
		"Access-Control-Allow-Headers",
		"Content-Type",
	)

	response.WriteHeader(http.StatusNoContent)
}

func createBookHandler(database *pgxpool.Pool) http.HandlerFunc {
	return func(response http.ResponseWriter, request *http.Request) {
		if request.Header.Get("Origin") != "" {
			response.Header().Set("Access-Control-Allow-Origin", request.Header.Get("Origin"))
		}
		response.Header().Set("Content-Type", "application/json")

		var input createBookRequest
		if err := json.NewDecoder(request.Body).Decode(&input); err != nil || input.Title == "" || input.Author == "" {
			http.Error(response, "title and author are required", http.StatusBadRequest)
			return
		}

		book := bookResponse{
			ID:     uuid.NewString(),
			Title:  input.Title,
			Author: input.Author,
			Status: "will-read",
		}

		err := database.QueryRow(request.Context(), `
			INSERT INTO books (id, title, author, status)
			VALUES ($1, $2, $3, $4)
			RETURNING date_added
		`, book.ID, book.Title, book.Author, book.Status).Scan(&book.DateAdded)
		if err != nil {
			http.Error(response, "could not save book", http.StatusInternalServerError)
			return
		}

		response.WriteHeader(http.StatusCreated)
		_ = json.NewEncoder(response).Encode(book)
	}
}

func healthHandler(response http.ResponseWriter, _ *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(response).Encode(map[string]string{"status": "ok"})
}
