import { useState } from "react";
import type { Book } from "../types/generated/book";
import { useCreateBook } from "../hooks/useCreateBook";
import { CreateBook, type CreateBookInput } from "../components/CreateBook";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();
  const [books, setBooks] = useState<Book[]>([]);
  const { createBook } = useCreateBook();

  async function saveBook(book: CreateBookInput) {
    const savedBook = await createBook(book);

    setBooks((currentBooks) => [...currentBooks, savedBook]);
  }

  return (
    <div>
      <h1>{t("pages.home.title")}</h1>
      <h2>{t("pages.home.subTitle")}</h2>
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
