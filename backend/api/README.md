# Recipe App – Backend


This is the **backend API** for the Recipe App project, built with **Node.js**, **Express**, and **Sequelize**. It provides a RESTful API for managing user accounts and recipes, including authentication and CRUD functionality.

---

## Tech Stack

- **Node.js**
- **Express.js**
- **Sequelize ORM**
- **JWT Authentication**
- **Dotenv for environment variables**

---

## Clone the repository

```
git clone (link)
cd recipe-app/backend/api
```

---

## Install node_modules:

```
npm install
npm ci
```

---

## .env should contain:

```
DB_NAME=recipes
DB_USER=root
DB_HOST="127.0.0.1"
JWT_SECRET=supersecretkey # would replace with something stronger
JWT_EXPIRES_IN=1h    # token valid for 1 hour
```

## Need to create single user in the users table before the recipes endpoint can function, for example:

```
INSERT INTO users (username, password_hash, created_at)
VALUES ('Test User', 'dummyhashedpassword123', NOW());
```

## Starting API

Run `npm start`