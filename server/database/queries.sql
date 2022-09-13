-- Create Database.
CREATE DATABASE praava_patient_portal_v2;

-- Add extension for UUID
CREATE extension "uuid-ossp";

-- Create Users Table.
CREATE TABLE IF NOT EXISTS users(
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    his_username VARCHAR(255),
    his_password VARCHAR(255),
    upi VARCHAR(255),
    designation VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT TRUE,
    created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_BY VARCHAR(255)
);

-- Fake user insertion
INSERT INTO users (first_name, last_name, email, password) VALUES ('Zahid', 'Hasan', 'zahid@praavahealt.com', 'praavaZahid');