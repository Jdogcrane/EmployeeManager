const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "departmentDB"
});

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
                "View Departments/Roles/Employees",
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
                addDepartment();
                break;
            case "Add Roles":
                addRole();
                break;
            case "Add Employees":
                addEmployee();
                break;
            case "View Departments/Roles/Employees":
                display();
                break;
            case "Update Employee Role":
                update();
                break;
            case "Update Manager":
                viewEmployees();
                break;
            case "Exit":
                process.exit(0);
            default:
                console.log(`Invalid action: ${menuChoice}`);
                break;
        }
    });
}
// Adds new department created by user input
function addDepartment() {
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
        menu();
    })
};
// Adds new role created by user input
function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "\n---------> Add Role <---------\n Title of new role:",
            name: "title",
            default: "Front End",
            validate: validate
        },
        {
            type: "input",
            message: "-----------------------------\n Salary of new role:",
            name: "salary",
            default: "45000",
            validate: validate
        },
        {
            type: "input",
            message: "-----------------------------\n Role Id Department:",
            name: "department_id",
            default: "999",
            validate: validate
        },

        // depending on user choice start creating worker
    ]).then(({ title, salary, department_id }) => {

        console.log("\x1b[33m%s\x1b[0m", "\n---------> Adding Role... <---------");
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
        menu();
    })
};

// Adds new Employee created by user input
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "\n---------> Add Employee <---------\n Name of new employee:",
            name: "first_name",
            default: "billy",
            validate: validate
        },
        {
            type: "input",
            message: "-----------------------------\n Last name of new employee:",
            name: "last_name",
            default: "bob",
            validate: validate
        },
        {
            type: "input",
            message: "-----------------------------\n Role Id Department:",
            name: "role_id",
            default: "22",
            validate: validate
        },
        {
            type: "input",
            message: "-----------------------------\n Manager's ID:",
            name: "manager_id",
            default: "420",
            validate: validate
        },

        // depending on user choice start creating worker
    ]).then(({ first_name, last_name, role_id, manager_id }) => {

        console.log("\x1b[33m%s\x1b[0m", "\n---------> Adding employee... <---------");
        const query = connection.query(
            // inserting into ROLE table and adding to a colum based off position
            "INSERT INTO employee SET ?",
            {
                // position 1
                first_name: `${first_name}`,
                // position 2
                last_name: `${last_name}`,
                // position 3
                role_id: `${role_id}`,
                // position 4
                manager_id: `${manager_id}`
            },
            (err, res) => {
                if (err) throw err;
            }
        );
        console.log(query.sql);
        menu();
    })
};
// Allows user to view table depending on choice
function display() {
    inquirer.prompt([
        {
            type: "list",
            message: "\n---------> View <---------\n Select an Employee to add to the team:",
            name: "choice",
            choices: [
                "department",
                "role",
                "employee",
                "Back to Main-Menu"
            ]
        },
        // depending on user choice display department
    ]).then(({ choice }) => {
        if (choice === "Back to Main-Menu") {
            menu();
        } else {
            console.log(`\x1b[33m%s\x1b[0m`, `\n---------> ${choice}... <---------\n`);
            connection.query(`SELECT * FROM ${choice}`, (err, choice) => {
                if (err) throw err;
                // Log all results of the SELECT statement
                console.table(choice);
                display();
            })
        }
    });
};

function update() {
    inquirer.prompt([
        {
            type: "input",
            message: "\n---------> Update Role <---------\n Employee id:",
            name: "id",
            default: "1",
            validate: validate
        },
        {
            type: "input",
            message: "\n---------> Update Role <---------\n New role:",
            name: "newRoleId",
            default: "12",
            validate: validate
        },


        // depending on user choice start creating worker
    ]).then(({ id, newRoleId }) => {
        console.log('Updating role...\n');
        const query = connection.query(
            `UPDATE employee SET ? WHERE ?`,
            [
                {
                    role_id: `${newRoleId}`,
                },
                {
                    id: `${id}`,
                }

            ],
            (err, res) => {
                if (err) throw err;
                console.log(id, newRole)
            }
        );

        // logs the actual query being run
        console.log(query.sql);
        menu();
    })
};


//Informs user that the input is blank. Will not let them continue until the input is filled
const validate = (value) => { if (value) { return true } else { return "Input field is empty please try again" } }


// Keep at bottom so that everything in the middle can be read before we connect :)
connection.connect((err) => {
    if (err) throw err;
    console.log("\x1b[32m", `--------->Successfully connected as id ${connection.threadId}<---------\n`);
    menu();
});