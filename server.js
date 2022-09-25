const express = require('express');

const mysql = require('mysql2');
const inquirer = require('inquirer');

require('dotenv').config()

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_db'
  },
  console.log('connected to the employee_db database')
);


connection.connect(() => {
    mainMenu();
});

const mainMenu = () => {
    inquirer.prompt([
        {
        type: 'list',
        name: 'main menu',
        message: 'select your next action',
        choices: [
            'view all departments',
            'view all roles',
            'view all employees',
            'add a department',
            'add a role',
            'add an amployee',
            'update an employee role'
        ]
    }
    ]);
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });