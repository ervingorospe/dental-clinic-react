# System Architecture

## Overview
This application is built with a **React frontend**, a **Node.js/Express backend**, and a **PostgreSQL database**. The application is structured as a **single-page application** (SPA), where React handles the UI, and Express manages the business logic and database interaction.

### Key Components:
- **Frontend (React)**: The user interface of the application, where users can manage set appointment.
- **Backend (Node.js/Express)**: The server-side component that handles authentication, task management, and communication with the database.
- **Database (PostgreSQL)**: Stores user data, tasks, and other relevant information.
- **Prisma**: Used for database interaction and managing the schema.
- **State Management (Redux)**: Manages the global state of the app, including user authentication status and task data.
- **Authentication (JWT)**: Ensures secure communication between the frontend and backend using **JSON Web Tokens**.

### Communication Flow:
1. The React frontend communicates with the Express backend via RESTful APIs.
2. The frontend sends HTTP requests (GET, POST, PUT, DELETE) to the backend.
3. The backend processes the requests, interacts with the PostgreSQL database, and returns the response to the frontend.
4. For authentication, the frontend stores the JWT token in a **HttpOnly cookie** and automatically includes it in the headers of protected API requests through the browser's automatic cookie handling.
5. The database schema supports user management, task data, and task statuses.

## Components Structure:
### Module Breakdown
- **controller**: Responsible for handling requests and responses, including error handling.
- **interface**: Defines data types and interfaces used within the module.
- **repository**: Manages database interactions using **Prisma ORM**.
- **route**: Defines API routes for the module using Express.
- **service**: Contains business logic and data manipulation, interacting with the database.
- **validation**: Ensures incoming request data is valid before processing.

### Middleware
- Handles errors globally and ensures that appropriate error status codes and messages are returned in API responses.

### Utils
- Contains utility functions that help with managing and manipulating data across the application.

### Config
- Manages database connection and environment variable configuration.

## Frontend Structure
The frontend follows a feature-based component structure, with reusable components separated into their own directory for easy access.

## State Management
State management is handled with **Redux** and **Auth Context**.

### Redux
- **Redux** is used for managing the global state of the application, especially for handling appointments.

### Auth Context
- **Auth Context** is used for managing user authentication and securing routes based on the user's authentication status.


## Styling
The frontend uses **Tailwind CSS** for styling, enabling:

- Faster development with utility-first classes.
- A responsive design that adapts to different screen sizes.
- Easy customization for a modern and visually appealing UI.

---

This structure ensures that both the backend and frontend are modular, maintainable, and scalable. If you have any questions or need further details, feel free to ask!


## Deployment Architecture

The deployment architecture follows a containerized approach to ensure portability, scalability, and ease of management. Below are the key steps and components involved in the deployment:

- **Docker**:  
  The project is containerized using a `Dockerfile` to build a Docker image of the application.

- **AWS ECR (Elastic Container Registry)**:  
  The Docker image is pushed and stored in **AWS ECR**, providing a secure and scalable container registry.

- **AWS EKS (Elastic Kubernetes Service)**:  
  The application is deployed to **AWS EKS** for managing and orchestrating containers in a Kubernetes environment using `kubectl` and a **YAML file**.

- **CI/CD with GitHub Actions**:  
  A **GitHub CI/CD pipeline** is used for automating the build, test, and deployment process, ensuring seamless integration and delivery.

- **AWS RDS (Relational Database Service)**:  
  The database is hosted on **AWS RDS**, providing a managed service for relational databases like PostgreSQL, ensuring high availability, automated backups, and scalability.


## How to Run Backend

Follow these steps to run the backend locally:

### 1. Clone the Repository

Start by cloning the project repository to your local machine:

```bash
git clone https://github.com/ervingorospe/dental-clinic-api-nodejs.git
cd dental-clinic-api-nodejs
```
### Example `.env` Configuration

Create a `.env` file in the root directory and add the following variables:

```env
NODE_ENV=development                # Type of environment
PORT=8000                          # Port to run the backend server
CLIENT_PORT=3000                   # Port where the frontend runs
JWT_SECRET=your_jwt_secret         # Secret key for JWT signing
REFRESH_SECRET=your_refresh_secret # Secret for refresh tokens
DATABASE_URL=your_postgres_url     # PostgreSQL connection string
```

```bash
npm install
npm run dev
```

## How to Run Frontend

Follow these steps to run the backend locally:

### 1. Clone the Repository

Start by cloning the project repository to your local machine:

```bash
git clone https://github.com/ervingorospe/grab-app.git
cd grap-app
```
### Example `.env` Configuration

Create a `.env` file in the root directory and add the following variables:

```env
VITE_API_BASE_URL=Http://localhost:3000                # your backend url
VITE_PORT=8000                          # Port to run the frontend
```

```bash
npm install
npm run dev
```


