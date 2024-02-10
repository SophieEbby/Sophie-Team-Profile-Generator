const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

// Team members array
const teamMembers = [];


// Question arrays
// Manager Questions
const managerQuestions = [
    {
        type: "input",
        message: "What is your name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your email?",
        name: "email"
    },
    {
        type: "input",
        message: "What is your office number?",
        name: "office"
    }
];

// Engineer Questions
const engineerQuestions = [
    {
        type: "input",
        message: "What is your engineer's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your engineer's ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your engineer's email?",
        name: "email"
    },
    {
        type: "input",
        message: "What is your engineer's GitHub username?",
        name: "github"
    }
];

// Intern Questions
const internQuestions = [
    {
        type: "input",
        message: "What is your intern's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your intern's ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your intern's email?",
        name: "email"
    },
    {
        type: "input",
        message: "What is your intern's school?",
        name: "school"
    }
];

// what type of team member?
const teamAdd =
{
    type: "list",
    message: "What type of team member would you like to add?",
    name: "team",
    choices: ["Engineer", "Intern", "None"]
}


// Create new team member
function createTeamMember(questions, type) {
    let spec;
    inquirer.prompt(questions).then(response => {
        switch (type) {
            case Engineer:
                spec = response.github;
                break;
            case Intern:
                spec = response.school;
                break;
            default:
                spec = response.office;
        }
        const newMember = new type(response.name, response.id, response.email, spec)
        teamMembers.push(newMember)
        createTeam()
    })
};

// Create team: add Engineer, Intern, or none?
function createTeam() {
    inquirer.prompt(teamAdd).then(response => {
        switch (response.team) {
            case "Engineer":
                createTeamMember(engineerQuestions, Engineer);
                break;
            case "Intern":
                createTeamMember(internQuestions, Intern);
                break;
            default:
                // if none, render team members array into file
                const finalHTML = render(teamMembers)
                fs.writeFile("./output/team.html", finalHTML, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("File written!");
                });
        }
    })
};


// Begin building team
createTeamMember(managerQuestions, Manager);