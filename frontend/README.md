# Invoice Service - Frontend

This is the frontend application for the Invoice Service, built with [Next.js](https://nextjs.org) and [React](https://react.dev).

## Tech Stack

-   **Framework**: Next.js 15 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS 4
-   **State Management**: TanStack Query (React Query)
-   **UI Components**: Shadcn UI (Radix Primitives)
-   **PDF Generation**: @react-pdf/renderer
-   **Package Manager**: Bun

## Getting Started

### Prerequisites

-   [Bun](https://bun.sh/) installed effectively replacing Node.js/npm/yarn.

### Installation

1.  Navigate to the directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    bun install
    ```

### Development Server

Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

-   `app/`: App Router pages and layouts.
    -   `invoices/`: Main invoice dashboard.
-   `components/`: Reusable UI components.
    -   `ui/`: Shadcn primitive components.
    -   `invoices/`: Invoice-specific features (Form, Document, PDF Button).
    -   `providers/`: Context providers (QueryClient).
-   `hooks/`: Custom React hooks (`use-invoices`).
-   `lib/`: Utility functions and API clients.

## Docker

The frontend is containerized using a multi-stage build.

```bash
# Build the image
docker build -t invoice-frontend .

# Run the container
docker run -p 3000:3000 invoice-frontend
```
