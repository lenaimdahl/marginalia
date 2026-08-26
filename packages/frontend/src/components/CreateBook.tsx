import { useState } from "react";
import type { Book, Status } from "../types/generated/book";

export type CreateBookInput = Pick<
  Book,
  "title" | "author" | "status" | "notes"
>;

type EditableBookField = keyof CreateBookInput;

type CreateBookProps = {
  onSave: (book: CreateBookInput) => Promise<void>;
};

export function CreateBook({ onSave }: CreateBookProps) {
  const [book, setBook] = useState<CreateBookInput>({
    title: "",
    author: "",
    status: "will-read",
    notes: "",
  });

  function handleChangeBook(field: EditableBookField, value: string) {
    setBook(
      (currentBook) =>
        ({
          ...currentBook,
          [field]: value,
        }) as CreateBookInput,
    );
  }

  async function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    const title = book.title.trim();
    const author = book.author.trim();
    const notes = book.notes?.trim();
    if (!title || !author) {
      return;
    }

    await onSave({ title, author, status: book.status, notes });
    setBook({ title: "", author: "", status: "will-read", notes: "" });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buchtitel"
        value={book.title}
        onChange={(event) => handleChangeBook("title", event.target.value)}
      />
      <input
        type="text"
        placeholder="Autor"
        value={book.author}
        onChange={(event) => handleChangeBook("author", event.target.value)}
      />
      <select
        value={book.status}
        onChange={(event) =>
          handleChangeBook("status", event.target.value as Status)
        }
      >
        <option value="will-read">Möchte ich lesen</option>
        <option value="reading">Lese ich gerade</option>
        <option value="finished">Gelesen</option>
        <option value="quit">Abgebrochen</option>
      </select>
      <textarea
        placeholder="Notizen"
        value={book.notes}
        onChange={(event) => handleChangeBook("notes", event.target.value)}
      />
      <button type="submit">Buch speichern</button>
    </form>
  );
}
