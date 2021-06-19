const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Be sure to update with your own MySQL password!
    password: "",
    database: "departmentDB"
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
            case "Add Departments":
                addDepartments();
                break;
            case "Add Roles":
                addRoles();
                break;
            case "Add Employees":
                addEmployees();
                break;
            case "View Departments":
                viewDepartments();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "View Employees":
                viewEmployees();
                break;
            case "Update Employee Role":
                viewRoles();
                break;
            case "Update Manager":
                viewEmployees();
                break;
            case "Exit":
                return;
            default:
                console.log(`Invalid action: ${menuChoice}`);
                break;

        }
    });
}
// Adds new department created by user input
function addDepartments() {
    inquirer.prompt([
        {
            type: "input",
            message: "\n---------> Add Department <---------\n Name of new department:",
            name: "newDepartment",
            validate: validate
        },

        // depending on user choice start creating worker
    ]).then(({ newDepartment }) => {

        console.log("Adding department...\n");
        const query = connection.query(
            // inserting into DEPARTMENT table and adding to a colum based off position
            "INSERT INTO department SET ?",
            {
                // name position 1
                name: `${newDepartment}`
            },
            (err, res) => {
                if (err) throw err;
            }
        );
        console.log(query.sql);
    })
};

function addRoles() {
    inquirer.prompt([
        {
            type: "input",
            message: "\n---------> Add Roles <---------\n Title of new role:",
            name: "title",
            validate: validate
        },
        {
            type: "input",
            message: "\n Salary of new role:",
            name: "salary",
            validate: validate
        },
        {
            type: "input",
            message: "\n Role Id Department:",
            name: "department_id",
            validate: validate
        },

        // depending on user choice start creating worker
    ]).then(({ title, salary, department_id }) => {

        console.log("\x1b[33m%s\x1b[0m", "\n---------> Adding Role... <---------" );
        const query = connection.query(
            // inserting into ROLE table and adding to a colum based off position
            "INSERT INTO role SET ?",
            {
                // title position 1
                title: `${title}`,
                // salary position 2
                salary: `${salary}`,
                // id position 3
                department_id: `${department_id}`
            },
            (err, res) => {
                if (err) throw err;
            }
        );
        console.log(query.sql);
    })
};

// Keep at bottom so that everything in the middle can be read before we connect :)
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    menu();
});