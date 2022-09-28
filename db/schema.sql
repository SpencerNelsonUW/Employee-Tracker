DROP DATABASE IF EXISTS employee_db;
-- Creates the "employee_db" database --
CREATE DATABASE employee_db;
-- use employee_db database --
USE employee_db;

-- Creates the table "departments" within books_db --
CREATE TABLE departments (
    id INT AUTO_INCREMENT,
    PRIMARY KEY(id),
    department_name VARCHAR(30) NOT NULL
);

-- CREATE TABLE roles (
--     id INT NOT NULL AUTO_INCREMENT,
--     PRIMARY KEY(id),
--     title VARCHAR(30) NOT NULL,
--     salary INT NOT NULL,
--     department_id INT,
--     FOREIGN KEY(department_id) REFERENCES departments(id),
-- );

-- CREATE TABLE employees (
--     id INT NOT NULL AUTO_INCREMENT,
--     PRIMARY KEY(id),
--     title VARCHAR(30) NOT NULL,
--     salary INT NOT NULL,
--     department_id INT,
--     FOREIGN KEY(department_id) REFERENCES departments(id),
--     roles_id INT,
--     FOREIGN KEY(roles_id) REFERENCES roles(id),
-- );

