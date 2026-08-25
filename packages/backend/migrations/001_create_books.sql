CREATE TABLE IF NOT EXISTS books (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('will-read', 'reading', 'finished', 'quit')),
    notes TEXT,
    date_added TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
