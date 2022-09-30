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
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    manager VARCHAR(30),
    title VARCHAR(30),
    roles_id INT,
    FOREIGN KEY(roles_id) 
    REFERENCES roles(id)
    ON DELETE SET NULL
);




{
                type: 'input',
                name: 'first_name',
                message: 'what is the first name of the new employee?',
                },
                {
                type: 'input',
                name: 'last_name',
                message: 'what is the last name of the new employee?',
                },
                {
                type: 'input',
                name: 'manager',
                message: 'who is the manager for this employee?',
                },
                {
                type: 'list',
                name: 'roles',
                message:'choose the employee ID of the employee you would like to update',
                choices: function (){
                    connection.query('SELECT id FROM roles', (err, res) => {
                        if (err) throw err;
                        let roleChoices = res.map(choice => choice.id)
                        return roleChoices;
                        })
                    },
                },