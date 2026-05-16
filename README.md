# ServiceHive Lead Management Dashboard

A production-style MERN Lead Management Dashboard with a modular TypeScript architecture, RBAC, advanced filtering, and Dockerized deployment.

## Tech Stack

- Frontend: React, TypeScript, Vite, TailwindCSS, React Router, React Hook Form, Zod, TanStack Query, Axios
- Backend: Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, bcrypt
- DevOps: Docker, Docker Compose

## Project Structure

```
backend/
frontend/
docker-compose.yml
```

## Local Development

### Backend

1. Create environment file:

```
cp backend/.env.example backend/.env
```

2. Install dependencies and start the API:

```
cd backend
npm install
npm run dev
```

### Frontend

1. Create environment file:

```
cp frontend/.env.example frontend/.env
```

2. Install dependencies and start the client:

```
cd frontend
npm install
npm run dev
```

## Docker

```
docker compose up --build
```

Frontend will be available at `http://localhost:5173` and backend at `http://localhost:4000`.

## API Documentation

Base URL: `http://localhost:4000/api`

### Authentication

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /auth/me`

### Leads

- `GET /leads` (filters + pagination)
- `GET /leads/export` (CSV export)
- `GET /leads/:leadId`
- `POST /leads`
- `PATCH /leads/:leadId`
- `DELETE /leads/:leadId`

### Filtering & Pagination

Query params:

- `status` (New, Contacted, Qualified, Lost)
- `source` (Website, Instagram, Referral)
- `search` (name/email)
- `sort` (latest, oldest)
- `page` (1-based)

Pagination metadata returned in `data.meta`:

- `totalRecords`
- `totalPages`
- `currentPage`
- `hasNextPage`
- `hasPrevPage`

### Response Format

Success:

```
{
  "success": true,
  "message": "Lead created successfully",
  "data": {}
}
```

Error:

```
{
  "success": false,
  "message": "Validation failed",
  "errors": {}
}
```

## RBAC Rules

- Admins can access and manage all leads.
- Sales users can only access leads assigned to them or created by them.

## Notes

- Use the provided `.env.example` files to configure secrets and database connection.
- CSV export uses the same filters and sorting as the main list view.