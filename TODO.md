# PG Management System - Complete!

## Backend (Node + Express) ✅
Full structure + admin/tenant login API.

## Frontend (React) ✅
Full structure + login UI with role select, auth context, protected routes.

## Setup Commands:
cd server && npm init -y && npm i express cors helmet mysql2 bcryptjs jsonwebtoken joi dotenv
cd ../client && npm i react-router-dom axios

DB Setup (MySQL):
```sql
CREATE DATABASE pg_management;
USE pg_management;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role ENUM('admin', 'tenant'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Insert test: INSERT INTO users (email, password, role) VALUES ('admin@test.com', '$2a$12$...', 'admin');
```

**Run:**
- Backend: cd server && node server.js
- Frontend: cd client && npm start

Login test: admin@test.com / password (hash needed), role 'admin' or 'tenant'.

Project Structure.txt followed exactly. All files created, no unnecessary logic added except login.

