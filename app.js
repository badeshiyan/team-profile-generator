// code provided; appears to call the constructors, uses path and fs, provides folder and file
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// global variable declaration
const employees = [];

// prompt to initiate employee app
function startApp() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Select what type of employee you would like to add",
        name: "userchoice",
        choices: ["manager", "engineer", "intern", "build team"],
      },
    ])
    // writing file based on submitted answers
    .then(function (response) {
      if (response.userchoice === "manager") {
        return renderManager();
      } else if (response.userchoice === "engineer") {
        return renderEngineer();
      } else if (response.userchoice === "intern") {
        // console.log("if intern is triggered");
        return renderIntern();
      } else if (response.userchoice === "build team") {
        const htmlstring = render(employees);
        fs.writeFileSync(outputPath, htmlstring);
      }
    });
}
// manager specific questions and info
function renderManager() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is your email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is your office number?",
        name: "officeNumber",
      },
    ])
    // pushing manager answers to constructor
    .then(function (answers) {
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      employees.push(manager);
      startApp();
    });
}

// engineer specific questions and info
function renderEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is your email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is your Github?",
        name: "github",
      },
    ])
    // pushing engineer answers to constructor
    .then(function (answers) {
      const engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      employees.push(engineer);
      startApp();
    });
}

// intern specific questions and info
function renderIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is your email?",
        name: "email",
      },
      {
        type: "input",
        message: "Where did you earn your undergraduate degree from?",
        name: "school",
      },
    ])
    // pushing intern answers to constructor
    .then(function (answers) {
      const intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      employees.push(intern);
      startApp();
    });
}

startApp();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
