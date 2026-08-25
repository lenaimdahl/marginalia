# Marginalia

Marginalia is a reading tracker for books, labels, personal notes, and a future reading journal.

The project is split into a React frontend and a Go backend:

```text
marginalia/
└── packages/
	├── frontend/   # React, TypeScript, Vite, Oxlint
	└── backend/    # Go application
```

## Prerequisites

- Node.js and npm
- Go version specified in `backend/go.mod`

## Frontend

Install dependencies and start the Vite development server:

```bash
cd packages/frontend
npm ci
npm run dev
```

The frontend is available at the URL printed by Vite, usually `http://localhost:5173`.

Frontend checks:

```bash
cd packages/frontend
npm run build
npm run lint
```

## Backend

Start the Go application:

```bash
cd packages/backend
go run .
```

The backend listens on `http://localhost:8080` by default. Its health endpoint is:
`Book`, `Label`, and `Status` are defined once as JSON Schema in `api/models/*.yaml`. Go and TypeScript model types are generated from these files. The API endpoints are defined separately in `api/openapi.yaml`, which generates the frontend API client.

```text
GET http://localhost:8080/health
```

To use another port:

```bash
cd packages/backend
PORT=8081 go run .
```

Run backend checks:

```bash
cd packages/backend
go test ./...
go vet ./...
gofmt -d .
```

The backend is currently a minimal executable with a health endpoint and generated data model types. The application API and persistence will be added in later tickets.

To run the backend in Docker:

```bash
docker build -t marginalia-backend:local backend
docker run --rm -p 8080:8080 marginalia-backend:local
```

## Data model

`Book`, `Label`, and `Status` are defined as JSON Schema in `api/models/*.yaml` for the backend. The frontend API client and its types are generated from `api/openapi.yaml`.

Regenerate backend models after editing a schema file:

```bash
cd packages/frontend && npm run generate:types   # -> src/types/generated/*.d.ts
cd packages/backend && go generate ./...          # -> models/generated.go
```

The API contract is defined in `api/openapi.yaml`. Regenerate the typed frontend API client after changing it:

```bash
cd packages/frontend && npm run generate:api-client   # -> src/api/generated/generated.ts
```

CI fails if generated output is out of date with the schema files.

## Development workflow

Run the frontend and backend in separate terminal windows:

```text
Terminal 1: cd packages/frontend && npm run dev
Terminal 2: cd packages/backend && go run .
```

The frontend is normally available at `http://localhost:5173` and the backend at `http://localhost:8080`. Frontend dependencies belong in `frontend/`; the Go backend does not use `package.json` or `node_modules`.

Environment values are listed in `packages/.env.example`. Vite environment variables must use the `VITE_` prefix. The Go server reads `PORT` directly from the shell or container environment.

Generated and local-only files such as `node_modules/` and `dist/` must not be committed.

## Planned features

- Go HTTP API for books
- Book statuses: will read, reading, and read
- Labels and filtering
- Persistent notes per book
- Database-backed storage
- Reading journal
- Search and reading statistics
- GitHub Actions CI for frontend and backend checks
