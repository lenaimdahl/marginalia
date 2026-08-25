import { useState } from "react";
import { CreateBook, type CreateBookInput } from "./components/CreateBook";
import type { Book } from "./types/generated/book";
import { useCreateBook } from "./hooks/useCreateBook";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const { createBook } = useCreateBook();

  async function saveBook(book: CreateBookInput) {
    const savedBook = await createBook(book);

    setBooks((currentBooks) => [...currentBooks, savedBook]);
  }

  return (
    <main>
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
    </main>
  );
}

export default App;
