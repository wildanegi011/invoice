# Invoice Service Application

A full-stack Invoice Management application built with **Next.js** (Frontend) and **Django** (Backend).

## Quick Start (Docker)

The easiest way to run the application is using Docker Compose.

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd invoice-service
    ```

2.  **Environment Setup**:
    The project includes a `.env` file in the root directory with default development settings. You can customize this if needed.

3.  **Run with Docker Compose**:
    ```bash
    docker-compose up --build
    ```

    -   **Frontend**: [http://localhost:3000](http://localhost:3000)
    -   **Backend API**: [http://localhost:8000/api/](http://localhost:8000/api/)
    -   **Database**: PostgreSQL accessible on port 5432.

## Project Structure

-   **[frontend/](frontend/README.md)**: Next.js 15 application using React Query and Tailwind CSS.
-   **[backend/](backend/README.md)**: Django 6.0 application using Django REST Framework.
-   **docker-compose.yml**: Orchestration for the full stack.

## Features

-   Create, Read, Update, Delete (CRUD) Invoices.
-   Generate high-quality PDF invoices (Server-side rendering or Browser-based generation).
-   Responsive Dashboard with Search and Pagination.
-   Authentication (via Clerk on Frontend).
-   Full Docker support for easy deployment.

## Development

If you want to run the services individually without Docker, please refer to their respective README files:

-   [Frontend Instructions](frontend/README.md)
-   [Backend Instructions](backend/README.md)
