const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const employeesArray = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
promptUser();
function promptUser(){
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'Enter employee name.'
        },
        {
            name: 'id',
            type: 'input',
            message: 'What is your employee id?'
        },
        {
            name: 'email',
            type: 'input',
            message: "What is your email address?"
        },
        {
            name: 'employeeType',
            type: "list",
            choices: ["Manager", "Engineer", "Intern"],
            message: "What is your title?"
        },
    ]).then(function(answer){
        getInfo(answer);
    }).catch(function(err){
        if (err) throw err
    })
}


function getInfo(employee){
    if(employee.employeeType === 'Manager'){
        inquirer.prompt([
            {
                name: 'officeNumber',
                type: 'input',
                message: 'What is your office number?'
            }
        ]).then(function(answer){
            console.log(answer)
            const manager = new Manager(employee.name, employee.id, employee.email, answer.officeNumber);
            console.log (manager);
            employeesArray.push(manager);
            stopPrompt();
        }).catch(function(err){
            if(err) throw err
        })
    } else if (employee.employeeType === 'Engineer'){
        inquirer.prompt([
            {
                name: 'gitHub',
                type: 'input',
                message: 'What is your GitHub username?'
            }
        ]).then(function(answer){
            console.log(answer);
            const engineer = new Engineer(employee.name, employee.id, employee.email, answer.gitHub);
            employeesArray.push(engineer)
            stopPrompt();
        }).catch(function(err){
            if(err) throw err
        })
    } else {
        inquirer.prompt([
            {
                name: 'school',
                type: 'input',
                message: 'Where did you graduate?'
            }
        ]).then(function(answer){
            console.log(answer);
            const intern = new Intern(employee.name, employee.id, employee.email, answer.school)
            employeesArray.push(intern);
            stopPrompt();
        }).catch(function(err){
            if(err) throw err
        })
    }
}

function stopPrompt(){
    inquirer.prompt([
        {
            type:'confirm',
            name: 'stop',
            message: 'Would you like to stop adding employees?'
        }
    ]).then(function(response){
        if (response.stop){
            const returnedEmployeeData = render(employeesArray);
            fs.writeFile(outputPath, returnedEmployeeData, function(err){
                if(err) throw err;
                console.log('success!')
            })
            console.log(returnedEmployeeData)
            console.log("Your team has been added")
            
        } else {
            promptUser();
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
