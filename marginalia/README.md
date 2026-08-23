# Marginalia

Marginalia is a reading tracker for books, labels, personal notes, and a future reading journal.

The project is split into a React frontend and a Go backend:

```text
marginalia/
├── frontend/   # React, TypeScript, Vite, Oxlint
└── backend/    # Go application
```

## Prerequisites

- Node.js and npm
- Go version specified in `backend/go.mod`

## Frontend

Install dependencies and start the Vite development server from the repository root:

```bash
cd frontend
npm install
npm run dev
```

The frontend is available at the URL printed by Vite, usually `http://localhost:5173`.

Frontend checks:

```bash
cd frontend
npm run build
npm run lint
```

## Backend

Start the Go application from the repository root:

```bash
cd backend
go run .
```

The backend listens on `http://localhost:8080` by default. Its health endpoint is:

```text
GET http://localhost:8080/health
```

To use another port:

```bash
cd backend
PORT=8081 go run .
```

Run backend checks:

```bash
cd backend
go test ./...
go vet ./...
gofmt -d .
```

The backend is currently a minimal executable. The HTTP API, data model, persistence, and health endpoint will be added in later tickets.

## Development workflow

Run the frontend and backend in separate terminal windows:

```text
Terminal 1: cd frontend && npm run dev
Terminal 2: cd backend && go run .
```

The frontend is normally available at `http://localhost:5173` and the backend at `http://localhost:8080`. Frontend dependencies belong in `frontend/`; the Go backend does not use `package.json` or `node_modules`.

Environment values are listed in `.env.example`. Vite environment variables must use the `VITE_` prefix. The Go server currently reads `PORT` directly from the shell.

Generated and local-only files such as `node_modules/` and `dist/` must not be committed.

## Planned features

- Go HTTP API for books
- Book statuses: will read, reading, and read
- Labels and filtering
- Persistent notes per book
- Local database storage
- Reading journal
- Search and reading statistics
- GitHub Actions CI for frontend and backend checks
