const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");



// Define an array which Employee instances will be pushed
const employeeArray = [];

// Write a function which prompts user for common information (name, id and email) and lastly, their role.
promptCommon();
function promptCommon(userInput){
    inquirer.prompt([
        {
            name: 'employeeName',
            type: 'input',
            message: 'Please enter employee name: '
        },
        {
            name: 'employeeId',
            type: 'input',
            message: 'Please enter employee id: '
        },
        {
            name: 'employeeEmail',
            type: 'input',
            message: 'Please enter employee email address: '
        },
        {
            name: 'employeeRole',
            type: 'list',
            message: 'Please select employee role: ',
            choices: ["Manager", "Engineer", "Intern"]
        },
    ]).then(function(res){
        specialPrompt(res);
    }).catch(function(err){
        if(err) throw err;
        console.log("logged initial prompt answers")
    })
} // < -- end of promptCommon();
// Define function -depending on users answer to employeeRole, ask role specific questions

function specialPrompt(userResponse){
    if(userResponse.employeeRole === "Manager"){
        inquirer.prompt([
            {
                name: 'officeNumber',
                type: 'input',
                message: 'Please enter office number: '
            }
        ]).then(function(specialResponse){
            const manager = new Manager(userResponse.employeeName, userResponse.employeeId, userResponse.employeeEmail, specialResponse.officeNumber)
            employeeArray.push(manager);
            stopPrompt();
        }).catch(function(err){
            if(err) throw err
        })
    }else if(userResponse.employeeRole === "Engineer"){
        inquirer.prompt([
            {
                name: 'github',
                type: 'input',
                message: 'Please enter employee GitHub username: '
            }
        ]).then(function(specialResponse){
            const engineer = new Engineer(userResponse.employeeName, userResponse.employeeId, userResponse.employeeEmail, specialResponse.github)
            employeeArray.push(engineer);
            stopPrompt();
        }).catch(function(err){
            if(err) throw err
        })
    } else {
        inquirer.prompt([
            {
                name: 'school',
                type: 'input',
                message: 'Where did employee attend school?'
            }
        ]).then(function(specialResponse){
            const intern = new Intern(userResponse.employeeName, userResponse.employeeId, userResponse.employeeEmail, specialResponse.school)
            employeeArray.push(intern);
            stopPrompt();
        }).catch(function(err){
            if(err) throw err
        })
    }
}

// Function that asks user if they would like to stop adding employees

function stopPrompt(){
    inquirer.prompt([
        {
            name: 'stop',
            type: 'confirm',
            message: 'Would you like to stop adding employees?'
        }
    ]).then(function(res){
        if(res.stop){
            const currentEmployeeData = render(employeeArray);
            fs.writeFile(outputPath, currentEmployeeData, function(err){
                if(err) throw err;
            })
        }else{
            promptCommon();
        }
    })
}
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
