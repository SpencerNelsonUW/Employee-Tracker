DROP DATABASE IF EXISTS employee_db;
-- Creates the "employee_db" database --
CREATE DATABASE employee_db;
-- use employee_db database --
USE employee_db;

-- Creates the table "departments" within books_db --
CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) 
    REFERENCES departments(id)
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    department_id INT,
    roles_id INT,
    FOREIGN KEY(department_id) 
    REFERENCES departments(id)
    ON DELETE SET NULL,
    FOREIGN KEY(roles_id) 
    REFERENCES roles(id)
    ON DELETE SET NULL
);

