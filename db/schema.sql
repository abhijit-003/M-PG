-- PG Management Database Schema
CREATE DATABASE IF NOT EXISTS pg_management;
USE pg_management;
/*
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  age INT,
  role ENUM('admin', 'tenant') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data
INSERT INTO users (email, password, role, full_name, age) VALUES 
('admin@pg.com', '$2a$12$examplehash', 'admin', 'Admin User', 30),
('tenant1@pg.com', '$2a$12$examplehash', 'tenant', 'John Doe', 25);
*/
CREATE TABLE rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  room_number VARCHAR(10),
  capacity INT,
  rent_amount DECIMAL(10,2),
  status ENUM('available', 'occupied') DEFAULT 'available'
);

-- Add room fields for type, images, facilities
ALTER TABLE rooms 
ADD COLUMN room_type VARCHAR(100) NOT NULL DEFAULT 'single_sharing',
ADD COLUMN images JSON DEFAULT '[]',
ADD COLUMN facilities JSON DEFAULT '[]';

CREATE TABLE pgs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  owner_id INT NOT NULL,
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

ALTER TABLE rooms 
ADD COLUMN pg_id INT,
ADD FOREIGN KEY (pg_id) REFERENCES pgs(id) ON DELETE SET NULL;

-- Sample PGs for admin (id=1)
INSERT INTO pgs (name, owner_id, address) VALUES 
('Sunshine PG', 1, '123 Main St'),
('Moonlight PG', 1, '456 Oak Ave');

-- Add more tables as needed


