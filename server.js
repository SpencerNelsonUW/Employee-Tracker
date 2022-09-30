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

            case 'add a employee':
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

    connection.query('SELECT * FROM employees LEFT JOIN roles on employees.roles_id = roles.id', function (err, results){
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




function addARole(){
    console.log('adding a role')
    
    const departmentQuery = 'SELECT id FROM departments';
    connection.query(departmentQuery, (err, results) =>{
        if (err) throw err;
        inquirer.prompt([
            {
            type: 'input',
            name: 'title',
            message: 'what is the title of the new role?',
            },
            {
            type: 'input',
            name: 'salary',
            message: 'what is the salary for the new role?',
            },
            {
            type: 'list',
            name: 'department',
            message: 'which deparment number would you like to add this role to?',
                choices: function () {
                    let departmentChoices = results.map(choice => choice.id)
                    return departmentChoices;
                },
            },
        ]).then((response) => {
            connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?)",
             [[
                response.title,
                response.salary,
                response.department
            ]], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(`you have added the ${response.title} role, salary is ${response.salary}, to department number ${response.department}`)
                mainMenu();
            }   
            })
        });
    })
};



function addAEmployee(){
    console.log('adding a employee')
    const roleIdQuery = 'SELECT id FROM roles';

    connection.query(roleIdQuery, (err, results) => {
        if (err) throw err;
        inquirer.prompt([
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
                message:'choose the role ID for the new employee',
                choices: function () {
                    let roleChoices = results.map(choice => choice.id)
                    return roleChoices;
                },
            }
        ])  .then((response) => {
                connection.query("INSERT INTO employees (first_name, last_name, manager, roles_id) VALUES (?)", 
                [[
                    response.first_name,
                    response.last_name,
                    response.manager,
                    response.roles,
                
                ]], function (err, result){
                if (err) {
                    console.log(err);
                } else {
                    console.log(`you have added ${response.first_name} to employees`)
                    mainMenu();
                }   
                })
            });
    })
};

function updateEmployeeRole(){
    console.log('updating an employee role')

    const employeeQuery = 'SELECT * FROM employees'
    connection.query(employeeQuery, (err, results) => {
        if (err) throw err;
        const employeeIdChoices = function () {
            let employeeChoices = results.map(choice => choice.id)
            return employeeChoices;
            };

        inquirer.prompt([
                {
                type: 'list',
                name: 'roles',
                message:'choose the employee ID of the employee you would like to update',
                choices: employeeIdChoices,
                },
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
        ]).then((response) => {
            connection.query("UPDATE employees (first_name, last_name, manager, roles_id) VALUES (?) WHERE ", 
            [[
                response.first_name,
                response.last_name,
                response.manager,
                response.roles,
            
            ]], function (err, result){
            if (err) {
                console.log(err);
            } else {
                console.log(`you have added ${response.first_name} to employees`)
                mainMenu();
            }   
            })
        });
    });    
};



