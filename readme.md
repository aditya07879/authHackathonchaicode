<div align="center">

```
╔══════════════════════════════════════════════╗
║         🎬  BOOKMYTICKET  🎬                 ║
║      Movie Seat Booking System               ║
╚══════════════════════════════════════════════╝
```

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**A full-stack web application to book movie seats with secure authentication.**

</div>

---

## 🚀 Features

| Feature | Description |
|--------|-------------|
| 🔐 **Authentication** | Signup & Login using JWT |
| 🎟️ **Seat Booking** | Book seats in real-time |
| 🔒 **Protected Routes** | Middleware-based route protection |
| 💾 **Database** | PostgreSQL integration |
| 🎨 **UI** | EJS templates + Tailwind CSS |
| 🛡️ **Security** | Parameterized queries to prevent SQL injection |

---

## 🛠️ Tech Stack

```
┌─────────────────────────────────────────────────┐
│  Backend   →  Node.js + Express                 │
│  Database  →  PostgreSQL                        │
│  Auth      →  JWT + bcrypt                      │
│  Frontend  →  EJS + Tailwind CSS                │
└─────────────────────────────────────────────────┘
```

---

## 📂 Project Structure

```
booking-system/
│
├── 📄 index.mjs          # Main server entry point
├── 🔐 auth.mjs           # Auth logic (JWT + routes)
│
├── 📁 views/             # EJS templates
│   ├── 🏠 index.ejs      # Home / Seat selection page
│   ├── 🔑 login.ejs      # Login page
│   └── 📝 signup.ejs     # Signup page
│
└── 📦 package.json       # Project dependencies
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd booking-system
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup PostgreSQL

Create the database:

```sql
CREATE DATABASE bookmyticket;
```

Create the required tables:

```sql
CREATE TABLE users (
  id       SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  password TEXT
);

CREATE TABLE seats (
  id       SERIAL PRIMARY KEY,
  name     VARCHAR(255),
  isbooked INT DEFAULT 0
);

-- Seed 20 seats
INSERT INTO seats (isbooked)
SELECT 0 FROM generate_series(1, 20);
```

### 4️⃣ Run the Project

```bash
npm run dev
```

> Server starts at → **http://localhost:8080**

---

## 🔐 Authentication Flow

```
 User Signup
     │
     ▼
 Password hashed (bcrypt)
     │
     ▼
 User Login
     │
     ▼
 JWT Token issued
     │
     ▼
 Token stored in localStorage
     │
     ▼
 Protected routes verify token via middleware
```

---

## 🎯 API Endpoints

### Auth Routes

| Method | Endpoint   | Description        |
|--------|------------|--------------------|
| POST   | `/signup`  | Register a user    |
| POST   | `/login`   | Login & get token  |

### Seat Routes

| Method | Endpoint  | Description              | Auth Required |
|--------|-----------|--------------------------|---------------|
| GET    | `/seats`  | Fetch all seats          | ❌            |
| PUT    | `/:id`    | Book a specific seat     | ✅            |

---

## 🧠 How Booking Works

```
Client requests seat booking
         │
         ▼
   JWT verified by middleware
         │
         ▼
   DB Transaction begins
         │
         ▼
   Row locked (FOR UPDATE)
         │
         ▼
   Seat availability checked
         │
      ┌──┴──┐
   Free?   Booked?
      │        │
      ▼        ▼
  Update     Return
  seat       error
      │
      ▼
  Commit Transaction ✅
```

> 🔒 Row-level locking prevents **double booking** under concurrent requests.

---

## ⚠️ Notes

- ✅ JWT-based stateless authentication
- ✅ Prevents double booking via DB-level transactions
- ✅ Parameterized queries prevent SQL injection
- ✅ Passwords hashed with `bcrypt` before storage

---

## 📌 Future Improvements

- [ ] 💳 Payment integration
- [ ] 📊 Admin dashboard
- [ ] 📱 Fully responsive UI
- [ ] 🔔 Booking notifications
- [ ] 🎭 Multiple movie/show support

---

## 👨‍💻 Author

<div align="center">

**Aditya** 🚀

*Built with ❤️ and a lot of ☕*

</div>