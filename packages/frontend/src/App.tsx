import { useState } from "react";
import { CreateBook, type Book } from "./components/CreateBook";

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  function saveBook(book: Book) {
    setBooks((currentBooks) => [...currentBooks, book]);
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
