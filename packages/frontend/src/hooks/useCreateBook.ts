import type { Book } from "../types/generated/book";
import type { CreateBookInput } from "../components/CreateBook";

export function useCreateBook() {
  async function createBook(book: CreateBookInput): Promise<Book> {
    const response = await fetch("http://localhost:8080/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    if (!response.ok) {
      throw new Error("Buch konnte nicht gespeichert werden");
    }

    return response.json();
  }

  return {
    createBook,
  };
}
