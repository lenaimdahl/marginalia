import { useState } from "react";
import type { Book } from "../types/generated/book";
import { useCreateBook } from "../hooks/useCreateBook";
import { CreateBook, type CreateBookInput } from "../components/CreateBook";
import { BookList } from "../components/BookList";
import { Button } from "../components/Button";
import { Dialog } from "../components/Dialog";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();
  const [books, setBooks] = useState<Book[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { createBook } = useCreateBook();

  async function saveBook(book: CreateBookInput) {
    const savedBook = await createBook(book);

    setBooks((currentBooks) => [...currentBooks, savedBook]);
    setIsFormOpen(false);
  }

  return (
    <main className="home-page">
      <header className="topbar">
        <span className="brand-mark">MARGINALIA</span>
        <LanguageSwitcher />
      </header>
      <section className="hero-banner">
        <div className="hero-copy">
          <p className="eyebrow">{t("pages.home.eyebrow")}</p>
          <h1>{t("pages.home.title")}</h1>
          <p className="hero-subtitle">{t("pages.home.subTitle")}</p>
          <Button
            type="button"
            onClick={() => setIsFormOpen((currentState) => !currentState)}
          >
            <span aria-hidden="true">+</span>
            {isFormOpen ? t("common.close") : t("common.addBook")}
          </Button>
        </div>
        <div className="hero-image">
          <img src="/hero-image.jpg" alt={t("pages.home.imageAlt")} />
          <span>{t("pages.home.imagePlaceholder")}</span>
        </div>
      </section>

      {isFormOpen && (
        <Dialog
          eyebrow={t("pages.home.dialog.eyebrow")}
          title={t("pages.home.dialog.title")}
          onClose={() => setIsFormOpen(false)}
        >
          <CreateBook onSave={saveBook} />
        </Dialog>
      )}

      <section className="library-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t("pages.home.library.eyebrow")}</p>
            <h2>{t("pages.home.library.title")}</h2>
          </div>
          <span className="book-count">
            {t("pages.home.library.count", { count: books.length })}
          </span>
        </div>
        <BookList books={books} />
      </section>
    </main>
  );
}

export default Home;
