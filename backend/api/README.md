# Recipe App – Backend

This is the **backend API** for the Recipe App project, built with **Node.js**, **Express**, and **Sequelize**. It provides a RESTful API for managing user accounts and recipes, including authentication and CRUD functionality.

---

## Tech Stack

- **Node.js**
- **Express.js**
- **Sequelize ORM**
- **PostgreSQL / SQLite** (configurable)
- **JWT Authentication**
- **Dotenv for environment variables**

---

## Folder Structure

backend/
├── api/
│ ├── controllers/ # Handles incoming requests and responses
│ ├── middleware/ # Middleware for auth, error handling
│ ├── models/ # Sequelize models (User, Recipe)
│ ├── routes/ # Express route definitions
│ ├── services/ # Business logic
├── .env # Environment variables
├── db.js # Database config and connection
├── server.js # Entry point for the Express app


---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/recipe-app.git
cd recipe-app/backend

Install dependencies
PORT=5000
DB_URL=your_database_url
JWT_SECRET=your_jwt_secret


Run the Backend
npm run dev




