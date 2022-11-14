const inquirer = require('inquirer');

const askQuestion = () => inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'test',
      message: 'Are you handsome?',
      default: true
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });



export default askQuestion;