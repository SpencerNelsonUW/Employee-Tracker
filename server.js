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
        name: 'mainMenu',
        message: 'select your next action',
        choices: [
            'view all departments',
            'view all roles',
            'view all employees',
            'add a department',
            'add a role',
            'add a employee',
            'update an employee role'
        ]
    }
    ])
    .then((choice) => {
        switch(choice.mainMenu) {
            case 'view all departments':
            viewDepartments() //REMEMBER TO MAKE THE FUNCTION
            break;

            case 'view all roles':
            viewAllRoles()
            break;

            case 'view all employees':
            viewAllEmployees()
            break;

            case 'add a department':
            addADepartment()
            break;

            case 'add a role':
            addARole()
            break;

            case 'add an employee':
            addAEmployee()
            break;

            case 'update an employee role':
            updateEmployeeRole()
            break;
        }
         
    })

};

function viewDepartments(){
    console.log('viewing departments')
};

function viewAllRoles(){
    console.log('viewing all roles')
};

function viewAllEmployees(){
    console.log('viewing all employees')
};

function addADepartment(){
    console.log('adding a department')
};

function addARole(){
    console.log('adding a role')
};

function addAEmployee(){
    console.log('adding a employee')
};

function updateEmployeeRole(){
    console.log('updating an employee role')
};



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });