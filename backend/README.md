# Invoice Service - Backend

This is the backend API for the Invoice Service, built with [Django](https://www.djangoproject.com/) and [Django REST Framework](https://www.django-rest-framework.org/).

## Tech Stack

-   **Framework**: Django 6.0
-   **API**: Django REST Framework
-   **Database**: PostgreSQL (via `psycopg`)
-   **Package Manager**: [uv](https://github.com/astral-sh/uv) (Fast Python package installer)
-   **Language**: Python 3.12

## Getting Started

### Prerequisites

-   Python 3.12+
-   [uv](https://github.com/astral-sh/uv) (Recommended) or pip

### Installation

1.  Navigate to the directory:
    ```bash
    cd backend
    ```
2.  Install dependencies using `uv`:
    ```bash
    uv sync
    ```
    *Or using pip:*
    ```bash
    pip install .
    ```

### Configuration

The application uses environment variables for configuration. See the `.env` file in the root directory (docker-compose reads this). For local development, you may need a `.env` inside `backend/` or export variables manually.

Key variables:
-   `DATABASE_URL`: Connection string for Postgres.
-   `DJANGO_SECRET_KEY`: Secret key for cryptographic signing.
-   `DJANGO_DEBUG`: Set to `True` for development.

### Development Server

Run the development server:

```bash
# Using uv (activates virtualenv automatically)
uv run python src/manage.py migrate
uv run python src/manage.py runserver
```

Open [http://localhost:8000/api/](http://localhost:8000/api/) to verify the API is running.

## Project Structure

-   `src/`: Key Django project files.
    -   `invoice/`: Main app containing models, views, and serializers.
    -   `main.py`: Entry point helpers.
-   `pyproject.toml`: Dependency definitions.
-   `uv.lock`: Lockfile for reproducible builds.

## Docker

The backend is containerized using a multi-stage Python build.

```bash
# Build the image
docker build -t invoice-backend .

# Run the container (requires DB connection vars)
docker run -p 8000:8000 --env-file ../.env invoice-backend
```
