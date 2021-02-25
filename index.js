var mysql = require("mysql2");
var express = require("express");
var inquirer = require("inquirer");
const consoleTable = require("console.table");
const { response } = require("express");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root12345",
  database: "employeeManagement"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected as id " + connection.threadId);
  firstPrompt();
});

//function to prompt user of choice selection
function firstPrompt() {
  inquirer.prompt({
    type: "list",
    name: "start",
    message: "What would you like to do?",
    choices: ["View All Employees", "View All Departments", "View All Roles", "View All Employees By Department", "View All Employees By Manager",
      "Add Employee", "Remove Employee", "Update Employee Role", "Add Employee Role", "Remove Role", "Add New Department", "Remove Department"]
  })
    .then(function (response) {
      switch (response.start) {

        case "View All Employees":
          displayAllEmployees();
          break;

        case "View All Departments":
          viewAllDepartments();
          break;

        case "View All Roles":
          viewAllRoles();
          break;

        case "View All Employees By Department":
          employeeByDepartments();
          break;

        case "View All Employees By Manager":
          employeeByManagers();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Add Employee Role":
          addRole();
          break;

        case "Remove Role":
          removeRole();
          break;

        case "Add New Department":
          addDepartment();
          break;

        case "Remove Department":
          removeDepartment();
          break;

        case "Update Employee Manager":
          updateEmpManager();
          break;
      }
    })
};

//display all employees//
function displayAllEmployees() {
  const employeeQuery = `SELECT employee.id, employee.first_name, employee.last_name, emprole.title AS emprole, 
  CONCAT(manager.first_name,' ',manager.last_name) AS manager, department.name
  FROM employee 
  LEFT JOIN emprole ON employee.role_id = emprole.id 
  LEFT JOIN department ON emprole.department_id = department.id 
  LEFT JOIN employee manager ON  employee.manager_id = manager.id`

  connection.query(employeeQuery, (err, data) => {
    if (err) throw err;
    console.table(data);
    firstPrompt();
  })
};
//view all departments
function viewAllDepartments() {
  const departmentQuery = `SELECT * FROM department`
  connection.query(departmentQuery, (err, data) => {
    if (err) throw err;
    console.table(data);
    firstPrompt();
  })
};
//view all roles
function viewAllRoles() {
  const roleQuery = `SELECT * FROM emprole`
  connection.query(roleQuery, (err, data) => {
    if (err) throw err;
    console.table(data);
    firstPrompt();
  })
};

//display employees by department/
function employeeByDepartments() {
  /*const departmentQuery1 = ("SELECT * FROM department");*/
  const employeeByDepartmentQuery = ("SELECT * FROM department");

  //connecting the database for queries
    connection.query(employeeByDepartmentQuery, (err, response) => {
    if (err) throw err;
    const departments = response.map(element => {
      return { name: `${element.name}` }
    });

    inquirer.prompt([{
      type: "list",
      name: "dept",
      message: "Please select a department to view employees",
      choices: departments

    }]).then(answer => {
      //query to view all employees by department
      const viewEmployeeDepartmentQuery = `SELECT employee.first_name, employee.last_name, employee.role_id AS emprole, CONCAT(manager.first_name,' ',manager.last_name) AS manager, department.name as department 
      FROM employee LEFT JOIN emprole on employee.role_id = emprole.id 
      LEFT JOIN department ON emprole.department_id =department.id LEFT JOIN employee manager ON employee.manager_id=manager.id
      WHERE ?`
      //coonecting to the database view employees by department
      connection.query(viewEmployeeDepartmentQuery, [{ name: answer.dept }], function (err, res) {
        if (err) throw err;
        console.table(res)
        firstPrompt();
      })
    })
  })
};

//display employee by manager
function employeeByManagers() {
  
  let queryEmployeeByManagers = `SELECT * FROM employee e WHERE e.manager_id IS NULL`

  //connecting to the database to query employee by managers
    connection.query(queryEmployeeByManagers, function (err, res) {

    if (err) throw err;
    const managers = res.map(function (element) {
      return {
        name: `${element.first_name} ${element.last_name}`,
        value: element.id
      }
    });
    inquirer.prompt([{
      type: "list",
      name: "employeeByManager",
      message: "Please select manager to view employees",
      choices: managers
    }])
      .then(response => {
        console.log(response.employeeByManager)
        let queryEmployeeByManager = `SELECT employee.id, employee.first_name, employee.last_name, employee.role_id AS emprole, CONCAT(manager.first_name, ' ', manager.last_name) as manager, department.name AS department FROM employee
        LEFT JOIN emprole on employee.role_id = emprole.id
        LEFT JOIN department on department.id = emprole.department_id
        LEFT JOIN employee manager on employee.manager_id = manager.id
        WHERE employee.manager_id = ?`
        connection.query(queryEmployeeByManager, [response.employeeByManager], (err, data) => {
          if (err) throw err;
          console.table(data);
          firstPrompt()
        })
      })
  })
};
//add a new employee
function addEmployee() {
  let addQuery = `SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, emprole.title, department.name,
  emprole.salary, employee.manager_id 
    FROM employee
    INNER JOIN emprole on emprole.id = employee.role_id
    INNER JOIN department ON department.id = emprole.department_id`
  connection.query(addQuery, (err, results) => {
    if (err) throw err;
    inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message: "Please enter employee first name"
      }, {
        type: "input",
        name: "last_name",
        message: "Please enter employee last name"
      }, {
        type: "list",
        name: "emprole",
        message: "Please select employee title",
        choices: results.map(emprole => {
          return { name: emprole.title, value: emprole.role_id }
        })
      }, {
        type: "input",
        name: "manager",
        message: "Please enter employee manager id"
      }])
      .then(answer => {
        console.log(answer);
        connection.query(
          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
          [answer.first_name, answer.last_name, answer.emprole, answer.manager],
          function (err) {
            if (err) throw err
            console.log(`${answer.first_name} ${answer.last_name} added as a new employee`)
            firstPrompt();
          })
      })
  })
};

//remove an employee
function removeEmployee() {
  
  let queryRemoveEmployee = `SELECT * FROM employee`
  
    connection.query(queryRemoveEmployee, (err, res) => {
    if (err) throw err;
    inquirer.prompt([{
      type: "list",
      name: "emId",
      message: "Please select employee to remove",
      choices: res.map(employee => {
        return { name: `${employee.first_name} ${employee.last_name}`, value: employee.id }
      })
    }])
      .then(answer => {
        
        let queryDeleteEmployee = `DELETE FROM employee WHERE ?`
        connection.query(queryDeleteEmployee, [{ id: answer.emId }], (err) => {
          if (err) throw err;
          console.log("Employee removed");
          firstPrompt();
        })
      })
  })
};
//remove an employee role
function removeRole() {
  let queryRemoveRole = `SELECT * FROM emprole`
  connection.query(queryRemoveRole, (err, res) => {
    if (err) throw err;
    inquirer.prompt([{
      type: "list",
      name: "roleId",
      message: "Please select emprole to remove",
      choices: res.map(roles => {
        return { name: `${roles.title}`, value: roles.id }
      })
    }])
      .then(answer => {
        
        let queryDeleteRole = `DELETE FROM emprole WHERE ?`
       
        connection.query(queryDeleteRole, [{ id: answer.roleId }], (err) => {
          if (err) throw err;
          console.log("Role removed");
          firstPrompt();
        })
      })
  })
};

//update employee role
function updateEmployeeRole() {
  let query = ("SELECT * FROM employee");

  connection.query(query, (err, response) => {

    const employees = response.map(function (element) {
      return {
        name: `${element.first_name} ${element.last_name}`,
        value: element.id
      }
    });

    inquirer.prompt([{
      type: "list",
      name: "employeeId",
      message: "Which employees role do you want to update",
      choices: employees
    }])
   
      .then(updateEmployee=> {
        connection.query("SELECT * FROM emprole", (err, data) => {

          const roles = data.map(function (emprole) {
            return {
              name: emprole.title,
              value: emprole.id
            }
          });

          inquirer.prompt([{
            type: "list",
            name: "roleId",
            message: "What's the new role",
            choices: roles
          }])
            
              .then(updateEmployee => {
              
              const newRole = `UPDATE employee
        SET employee.role_id = ? 
        WHERE employee.id = ?`
              
                connection.query(newRole, [updateEmployee.roleId, updateEmployee.employeeId], function (err, res) {
                
                var employeeDetails;
              
                  for (var i = 0; i < roles.length; i++) {
                 
                    if (roles[i].value == updateEmployee.roleId) {
                      
                    employeeDetails = roles[i].name;
                  }
                }
                
                var tempName;
                for (var i = 0; i < employees.length; i++) {
                  
                  if (employees[i].value == updateEmployee.employeeId) {
                    tempName = employees[i].name;
                  }
                }

                if (res.changedRows === 1) {
                  console.log(`Successfully updated ${tempName} to position of ${employeeDetails}`);
                } else {
                  console.log(`Error: ${tempName}'s current position is ${employeeDetails}`)
                }
                
                firstPrompt();
              })
            })
        })
      })
  })
};

//add a new role
function addRole() {
  
  let queryAddRole = `SELECT * FROM emprole`
  connection.query(queryAddRole, (err, data) => {
    if (err) throw err
    inquirer.prompt([
      {
        type: "input",
        name: "roleId",
        message: "Please enter id for new role"
      }, {
        type: "input",
        name: "emprole",
        message: "Please enter title of new role"
      }, {
        type: "input",
        name: "salary",
        message: "Please enter salary for new role"
      }, {
        type: "input",
        name: "deptId",
        message: "Please enter department id for new role"
      }])
      .then(function (answers) {
        
        let queryInsertEmployee = `INSERT INTO emprole VALUES (?,?,?,?)`
        connection.query(queryInsertEmployee, [answers.roleId, answers.emprole, answers.salary, answers.deptId], function (err) {
          if (err) throw err;
          console.log(`${answers.role} added as new emprole`)
          firstPrompt();
        })
      })
  })
}

//add new department
function addDepartment() {
  
  let queryAddDepartment = `SELECT * FROM department`
  connection.query(queryAddDepartment, (err, res) => {
    if (err) throw err
    inquirer.prompt([{
      type: "input",
      name: "deptId",
      message: "Please enter id for new department"
    }, {
      type: "input",
      name: "deptName",
      message: "Please enter name for new department"
    }])
      .then(answers => {
        
        let queryInsertIntoDepartment = `INSERT INTO department VALUES (?,?)`
        
        connection.query(queryInsertIntoDepartment, [answers.deptId, answers.deptName], (err) => {
          if (err) throw err
          console.log(`${answers.deptName} added as a new department`)
          firstPrompt();
        })
      })
  })
};
//remove a department
function removeDepartment() {
  
  let queryRemoveDepartment = `SELECT * FROM department`
 
  connection.query(queryRemoveDepartment, (err, res) => {
    if (err) throw err;
    inquirer.prompt([{
      type: "list",
      name: "deptId",
      message: "Please select a department to remove",
      choices: res.map(departments => {
        return { name: `${departments.name}`, value: departments.id }
      })
    }])
      .then(answer => {
        
        let queryDeleteDepartment = `DELETE FROM department WHERE ?`
        
        connection.query(queryDeleteDepartment, [{ id: answer.deptId }], (err) => {
          if (err) throw err;
          console.log("Department removed")
          firstPrompt();
        })
      })
  })
};
