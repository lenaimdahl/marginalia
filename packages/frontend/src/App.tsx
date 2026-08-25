import { useState } from "react";
import { CreateBook, type Book } from "./components/CreateBook";
import { useCreateBook } from "./hooks/useCreateBook";

export function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const { createBook } = useCreateBook();

  async function saveBook(book: Book) {
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
