const inquirer = require("inquirer");
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: '',
    database: 'departmentDB'
});

//Informs user that the input is blank. Will not let them continue until the input is filled
const validate = (value) => { if (value) { return true } else { return "Input field is empty please try again" } }

function menu() {
    inquirer.prompt([
        {
            type: "list",
            message: "\n---------> MENU <---------\n Select an Employee to add to the team:",
            name: "menuChoice",
            choices: [
                "Add Departments",
                "Add Roles",
                "Add Employees",
                "View Departments",
                "View Roles",
                "View Employees",
                "Update Employee Role",
                "Update Manager",
                "Exit"
            ]
        },

        // depending on user choice start creating worker
    ]).then(({ menuChoice }) => {
        console.log(`\n Selected: ${menuChoice}`)
        switch (menuChoice) {
            case 'Add Departments':
                addDepartments();
                break;
            case 'Add Roles':
                addDepartments();
                break;
            case 'Add Employees':
                addRoles();
                break;
            case 'View Departments':
                addEmployees();
                break;
            case 'View Roles':
                addDepartments();
                break;
            case 'View Employees':
                viewDepartments();
                break;
            case 'Update Employee Role':
                viewRoles();
                break;
            case 'Update Manager':
                viewEmployees();
                break;
            case 'Exit':
                return;
            default:
                console.log(`Invalid action: ${menuChoice}`);
                break;

        }
    });
}

function addDepartments() {
    inquirer.prompt([
        {
            type: "input",
            message: "\n---------> Add Department <---------\n Name of new department:",
            name: "newDepartment",
        },

        // depending on user choice start creating worker
    ]).then(({ newDepartment }) => {

        console.log('Adding department...\n');
        const query = connection.query(
            'INSERT INTO department SET ?',
            {
                name: `${newDepartment}`
            },
            (err, res) => {
                if (err) throw err;
            }
        );
        console.log(query.sql);
    })
};
// creates prompts in terminal for the user to input data for the app to collect

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    menu();
});