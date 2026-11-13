# PeopleDesk — Employee Management Frontend

A React + Vite frontend for the Spring Boot Employee Management REST API.

## Features

- Dashboard with employee, active employee, department and payroll summaries
- Employee directory with backend keyword search and local employment-status filter
- Create, read, update and delete employee records
- Edit form loads the selected employee using `GET /api/employees/{id}`
- Form validation, delete confirmation, loading states and API error feedback
- Responsive layout for desktop, tablet and mobile
- Every stylesheet is kept in `src/styles/`, separate from React components

## Requirements

- Node.js 18 or later
- npm
- Spring Boot API running at `http://localhost:8080`

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

On Windows PowerShell, use this instead of `cp`:

```powershell
Copy-Item .env.example .env.local
```

Open the Vite URL shown in the terminal (configured as `http://localhost:5173`).

## API configuration

The default API base URL is `http://localhost:8080/api`. To change it, edit `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

The frontend calls these endpoints:

| Action | Method | Endpoint |
|---|---|---|
| Create | POST | `/employees` |
| Get all | GET | `/employees` |
| Get by ID | GET | `/employees/{id}` |
| Update | PUT | `/employees/{id}` |
| Delete | DELETE | `/employees/{id}` |
| Search | GET | `/employees/search?keyword={keyword}` |

## CORS

Since Vite runs on port `5173` and Spring Boot usually runs on `8080`, the backend must allow the frontend origin. For a simple Spring MVC setup, configure CORS for `http://localhost:5173` on `/api/**` (or configure the allowed origin in your existing global CORS/security configuration). Do not add a second conflicting CORS configuration if one already exists.

## Employee JSON fields

The form sends these properties using the camelCase names from the API example:

`employeeCode`, `firstName`, `lastName`, `email`, `phone`, `gender`, `dateOfBirth`, `department`, `designation`, `salary`, `dateOfJoining`, `employmentStatus`.

The `id`, `createdAt` and `updatedAt` fields are not sent when creating a new employee. `id` is provided in the URL for updates; server-managed timestamp fields are left to the backend.
