import { useState } from "react";

type CreateBookProps = {
  onSave: (title: string) => void;
};

export function CreateBook({ onSave }: CreateBookProps) {
  const [title, setTitle] = useState("");

  function handleSubmit() {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    onSave(trimmedTitle);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buchtitel"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <button type="submit">Buch speichern</button>
    </form>
  );
}
