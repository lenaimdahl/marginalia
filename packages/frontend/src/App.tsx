import { useState } from "react";
import { CreateBook } from "./components/CreateBook";

function App() {
  const [books, setBooks] = useState<string[]>([]);

  function saveBook(title: string) {
    setBooks((currentBooks) => [...currentBooks, title]);
  }

  return (
    <main>
      <div>
        <h1>Hallo Gib einen Buchtitel ein</h1>
        <CreateBook onSave={saveBook} />
        <ul>
          {books.map((book, index) => (
            <li key={index}>{book}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
