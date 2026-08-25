import { useState } from "react";

export type Book = {
  title: string;
  author: string;
};

type CreateBookProps = {
  onSave: (book: Book) => void;
};

export function CreateBook({ onSave }: CreateBookProps) {
  const [book, setBook] = useState<Book>({ title: "", author: "" });

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    const title = book.title.trim();
    const author = book.author.trim();
    if (!title || !author) {
      return;
    }

    onSave({ title, author });
    setBook({ title: "", author: "" });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buchtitel"
        value={book.title}
        onChange={(event) => setBook({ ...book, title: event.target.value })}
      />
      <input
        type="text"
        placeholder="Autor"
        value={book.author}
        onChange={(event) => setBook({ ...book, author: event.target.value })}
      />
      <button type="submit">Buch speichern</button>
    </form>
  );
}
