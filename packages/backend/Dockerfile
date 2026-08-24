FROM golang:1.26.5-alpine AS build

WORKDIR /src
COPY go.mod ./
COPY main.go ./
RUN CGO_ENABLED=0 go build -o /marginalia-backend .

FROM alpine:3.22

RUN adduser -D -H -u 10001 appuser
COPY --from=build /marginalia-backend /marginalia-backend
USER appuser
EXPOSE 8080
ENTRYPOINT ["/marginalia-backend"]
