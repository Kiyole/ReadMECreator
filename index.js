const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');
const writeFileASync = util.promisify(fs.writeFile);

// async function getGit(){
//     const user = 'Kiyole'
//     const url = 'https://api.github.com/search/' + user;
//     const response = await fetch(url)
//     const result = await response.json()
//     console.log(result)
// }
// getGit();
function promptUser(){



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
    message: 'What are some things you need people to know about how to use your project prior to downloading it',
    name: 'usage'
}
])
}

function generateHTML(answers){
    console.log("yes");
    console.log(answers);

    
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
        <title>ReadMe Generator</title>
    </head>
    
    <body>
        <div class="container">
            <img class="gitProfile" src="GitHub">
            <h2>Hi my name is ${answers.name} this is a walkthrough of my application..</h2>
            <h1>Project Name</h1>
            <div class="jumbotron">
                <h2><ul>Table of Contents</ul></h2>
                <li><a>Description</a></li>
                <li><a>Installation</a></li>
                <li><a>Usage</a></li>
                <li><a>License</a></li>
                <li><a>Contributing</a></li>
                <li><a>Questions</a></li>
            </div>
            <div class="description">
                <h2>A Quick Description:</h2>
                <p>${answers.description}</p>
            </div>
            <div class="installation">
                <h2>Installation</h2>
                <p>Before diving into the application it is recommended you download:${answers.installation}</p>
            </div> 
            <div class="usage">
                Some pointers while getting started on the app are as follows:${answers.usage}
            </div>
            <div class="license">
                <h3>Standard MIT license referenced below</h3>
                <p>Copyright(c) [2020] [${answers.name}]
                    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
                    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
                    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                </p>
            </div>
            <div class="contributing">
                <h2>Contributing</h2>
            </div>
            <div class="tests">
                <h2>Tests</h2>
            </div>
            <div class="Questions">
                <h2>Questions</h2>
            </div>
        </div>
    </body>
    
    </html>
    `
}

promptUser()
.then(function (answers){
const html = generateHTML(answers);
console.log(html)
return writeFileASync('index.html', html)
}).then(function() {
    console.log("Successfully wrote to index.html");
  })
.catch(function (err){
    console.log(err)
});