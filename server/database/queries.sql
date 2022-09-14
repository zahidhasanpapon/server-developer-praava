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

-- Create Roles Table.
CREATE TABLE IF NOT EXISTS roles(
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    details VARCHAR(255) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT TRUE,
    created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_BY VARCHAR(255)
);

-- Create API Collection Table.
CREATE TABLE IF NOT EXISTS api_collection(
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT TRUE,
    created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_BY VARCHAR(255)
);

-- Create API endpoint Table.
CREATE TABLE IF NOT EXISTS api_endpoint (
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    api_collection_id uuid NOT NULL,
    status BOOLEAN NOT NULL DEFAULT TRUE,
    created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_BY VARCHAR(255),
    CONSTRAINT fk_api_collection_id
        FOREIGN KEY (api_collection_id)
            REFERENCES api_collection(id)
);

-- Create Role Api Collection Mapping Table.
CREATE TABLE IF NOT EXISTS role_api_collection_mapping (
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_id uuid NOT NULL,
    api_collection_id uuid NOT NULL,
    status BOOLEAN NOT NULL DEFAULT TRUE,
    created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_BY VARCHAR(255),
    CONSTRAINT fk_role_id
        FOREIGN KEY (role_id)
            REFERENCES roles(id),
    CONSTRAINT fk_api_collection_id
        FOREIGN KEY (api_collection_id)
            REFERENCES api_collection(id)
);

-- Create Role Users Mapping Tabel.
CREATE TABLE IF NOT EXISTS user_roles_mapping (
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_id uuid NOT NULL,
    user_id uuid NOT NULL,
    status BOOLEAN NOT NULL DEFAULT TRUE,
    created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_BY VARCHAR(255),
    CONSTRAINT fk_role_id
        FOREIGN KEY (role_id)
            REFERENCES roles(id),
    CONSTRAINT fk_user_id
        FOREIGN KEY (user_id)
            REFERENCES users(id)
);

-- Fake User_roles_mapping insertion
INSERT INTO user_roles_mapping (user_id, role_id) VALUES ('3577ae90-12b8-435d-8d6c-d079159c748a', '577cae69-b168-4b59-a39f-c3c8f9e9e8ee');

-- Fake role_api_collection_mapping insertion.
INSERT INTO role_api_collection_mapping (role_id, api_collection_id) VALUES ('577cae69-b168-4b59-a39f-c3c8f9e9e8ee', '927ebba7-4762-41e8-9118-21c6f5d8867b');

-- Fake Api Collection insertion
INSERT INTO api_collection (name) VALUES ('Payment API');

-- Fake user insertion
INSERT INTO users (first_name, last_name, email, password) VALUES ('Zahid', 'Hasan', 'zahid@praavahealt.com', 'praavaZahid');

-- Fake roles insertion
INSERT INTO roles (name, details) VALUES ('ADMIN', 'ADMIN is the SUPERADMIN');

-- Fake api_endpoint insertion
INSERT INTO api_endpoint (
	name,
	api_collection_id
) VALUES (
	'Create Payement',
	'927ebba7-4762-41e8-9118-21c6f5d8867b'
);

-- Join Operation on api_collection and api_endpoint table
SELECT * FROM api_collection as a
JOIN api_endpoint as b
ON a.id = b.api_collection_id;

-- Select roles from user
SELECT name FROM user_roles_mapping as a LEFT JOIN roles as b ON a.role_id = b.id WHERE a.user_id = '3577ae90-12b8-435d-8d6c-d079159c748a';