import { useState } from "react";
import type { Book } from "../types/generated/book";
import { useCreateBook } from "../hooks/useCreateBook";
import { CreateBook, type CreateBookInput } from "../components/CreateBook";

function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const { createBook } = useCreateBook();

  async function saveBook(book: CreateBookInput) {
    const savedBook = await createBook(book);

    setBooks((currentBooks) => [...currentBooks, savedBook]);
  }

  return (
    <div>
      <h1>Hallo Gib einen Buchtitel ein</h1>
      <CreateBook onSave={saveBook} />
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            {book.title} - {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
