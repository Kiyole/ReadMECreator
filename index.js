
const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');
const axios = require('axios');
const writeFileAsync = util.promisify(fs.writeFile);

async function getGit(answers) {
    const user = answers.Git;
    const url = 'https://api.github.com/users/' + user;
    const response = await axios.get(url)
    // const result = await response.json()
    return response;
}


function promptUser() {



    return inquirer.prompt([{
        type: 'input',
        message: 'What is your Name',
        name: 'name',

    },
    {
        type: 'input',
        message: 'What is your GitHub username',
        name: 'Git',
    },
    {
        type: 'input',
        message: 'Whats a basic description for the project',
        name: 'description',
    },
    {
        type: 'input',
        message: 'What is the title of your project',
        name: 'title',
    },
    {
        type: 'input',
        message: 'What is the purpose of your app',
        name: 'purpose'

    },
    {
        type: 'input',
        message: 'If there are packages you need to install, list them below',
        name: 'installation',
    },
    {
        type: 'input',
        message: 'What are things you need people to know about how to use your project prior to downloading it',
        name: 'usage'
    },
    {
        type: 'input',
        message: 'How do you run the tests that are used in this Project',
        name: 'test'
    },
    {
        type: 'input',
        message: 'Explain what the tests do and why',
        name: 'testReason'
    }
    ])
}

function generateHTML(answers, data) {
    console.log("yes");
    console.log(data)
    console.log(answers);


    return `
# ${answers.title}
### A Quick Description ### 
${answers.description}

## Table of Contents
- Installation
- Usage
- License
- Contributing
- Tests
- Questions

## Installation
Before we dive into the application make sure you have the following items and packages installed:  
${answers.installation}

## Usage  
Some tips and general knowledge you should have about this app:
${answers.usage}  

## License
This project is licensed under the MIT License located at: [MIT License](https://opensource.org/licenses/MIT)  

## Contributing
To contibute to this repository please first discuss changes you would like to make with the owner via email which will be found towards the bottom of the page.
Our code of contact can be found at: [Code of Conduct](https://www.contributor-covenant.org/version/1/4/code-of-conduct/)

## Tests
To run the tests we have for this project follow these steps:
${answers.test}
### What do these tests do?
${answers.testReason}

## Questions
[GitHub Pic](${data.avatar_url})
If you have any other questions or concerns i can be reached via ${data.email}
`
}

// promptUser()
// .then(function (answers){
//     const html = generateHTML(answers);
//     console.log(html)
//     return writeFileASync('index.html', html)
// }).then(function() {
//     console.log("Successfully wrote to index.html");
//   })
// .catch(function (err){
//     console.log(err)
// });

async function init() {
    console.log("hi")
    try {
        const answers = await promptUser();

        const res = await getGit(answers);

        const html = generateHTML(answers, res.data);

        await writeFileAsync("README.md", html);

        console.log("Successfully wrote to README.md");
    } catch (err) {
        console.log(err);
    }
}

init();