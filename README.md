# Task Management Backend Server

Task Management Backend Server is the server-side component of the Task Management Website, providing the backend logic and API endpoints to manage boards, tasks, user authentication, and authorization.

### Backend Live URL: https://task-management-server-lilac.vercel.app

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)

## Features

- **User Authentication:** API endpoints for user registration, login, and authentication using JSON Web Tokens (JWT).

- **Authorization:** Role-based access control to restrict access to certain endpoints and actions.

- **Board Management:** Create, retrieve, update, and delete boards. Each board represents a project or category for tasks.

- **Task Management:** Create, retrieve, update, and delete tasks within boards. Assign tasks to users and change their status.

## Getting Started

Follow these steps to get the backend server up and running on your local machine.

### Prerequisites

- Node.js and npm installed.
- A PostgreSQL database.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/leoarafat/task-management-server
   cd task-management-backend
   npm install
   npm start

   ```

### API Endpoints

The server exposes the following API endpoints:

1. POST /api/v1/user/signup: User registration.
2. POST /api/v1/auth/login: User login.
3. GET /api/v1/board/my-boards: Retrieve all boards.
4. POST /api/v1/board/create-board: Create a new board.
5. PATCH /api/v1/board/:id: Update a specific board.
6. DELETE /api/v1/board/:id: Delete a specific board.
7. POST /api/v1/task/create-task: Create a new task for a specific board.
8. GET /api/v1/task/my-tasks: Retrieve a specific task.
9. PATCH /api/v1/task/taskId: Update a specific task.
10. DELETE /api/v1/task/taskId: Delete a specific task.

### Authentication

User authentication is required for most endpoints. When registering or logging in, the server will provide a JWT token. Include this token in the Authorization header of your API requests to access protected endpoints.
