const mysql = require('mysql2');
const inquirer = require('inquirer');

require('dotenv').config()

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
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
            viewDepartments()
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
    connection.query('SELECT * FROM departments', function (err, results){
        console.table(results)
        mainMenu()
        if (err){
            console.log(err);
        } ;
    })  
};

function viewAllRoles(){
    console.log('viewing all roles')
    connection.query('SELECT * FROM roles', function (err, results){
        console.table(results)
        mainMenu()
        if (err){
            console.log(err);
        } ;
    })
};

function viewAllEmployees(){
    console.log('viewing all employees')
    connection.query('SELECT * FROM employees', function (err, results){
        console.table(results)
        mainMenu()
        if (err){
            console.log(err);
        };
    })
};


function addADepartment(){
    console.log('adding a department')
    
    const departmentQuestion = [
        {
        type: 'input',
        name: 'newDepartment',
        message: 'what would you like the department to be called?',
        },
    ];

    inquirer.prompt(departmentQuestion)
        .then((response) => {
            connection.query("INSERT INTO departments (department_name) VALUES (?)", [response.newDepartment], function (err, result){
            if (err) {
                console.log(err);
            } else {
                console.log(`you have added ${response.newDepartment} to departments`)
                mainMenu();
            }   
        })
    });
};

const addARole = async () => {
    console.log('adding a role')

    const roleQuestion = [
        {
        type: 'input',
        name: 'newRole',
        message: 'what is the title of the new role?',
        },
        {
        type: 'input',
        name: 'newRoleSalary',
        message: 'what is the salary for the new role?',
        },

    ];
    console.log("after rolequestions")

    const responses = await inquirer.prompt(roleQuestion)
        .then((response) => {
            console.log("inside inquirer")
            connection.query("INSERT INTO roles SET (?)",
            { 
                title:  response.newRole,
                salary: response.newRoleSalary,
                department_id: response.rolesDepartment
            }, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(`you have added ${response.newRole} to roles`)
                mainMenu();
            }   
        })
    });
};

function addAEmployee(){
    console.log('adding a employee')
    const employeeQuestion = [
        {
        type: 'input',
        name: 'newEmployee',
        message: 'what is the name of the new employee?',
        }
    ];

    inquirer.prompt(employeeQuestion)
        .then((response) => {
            connection.query("INSERT INTO departments (department_name) VALUES (?)", [response.newEmployee], function (err, result){
            if (err) {
                console.log(err);
            } else {
                console.log(`you have added ${response.newEmployee} to employees`)
                mainMenu();
            }   
        })
    });
};

function updateEmployeeRole(){
    console.log('updating an employee role')
};



