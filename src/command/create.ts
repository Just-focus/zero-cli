const path = require('path');
const fs = require('fs-extra')
const inquirer = require('inquirer');
const validateProjectName = require('validate-npm-package-name');

import { checkExist } from '../services/check';
import exitProcess from '../utils/exit';
import creator from '../services/creator';

const create = async (args: any) => {
  const [projectName, options] = args;
  const { force, merge } = options;
  const cwd = process.cwd();
  const inCurrent = projectName === '.';
  const name = inCurrent ? path.relative('../', cwd) : projectName;
  const targetDir = path.resolve(cwd, projectName || '.');
  const result = validateProjectName(name);

  if (!result.validForNewPackages) {
    // console.error(chalk.red(`Invalid project name: "${name}"`))
    result.errors && result.errors.forEach(err => {
      // console.error(chalk.red.dim('Error: ' + err))
    })
    result.warnings && result.warnings.forEach(warn => {
      // console.error(chalk.red.dim('Warning: ' + warn))
    })
    exitProcess(1)
  }
  // 检测当前文件下是否已存在
  if (fs.existsSync(targetDir) && !merge) {
    if (force) {
      await fs.remove(targetDir)
    } else {
      // await clearConsole()
      if (inCurrent) {
        const { ok } = await inquirer.prompt([
          {
            name: 'ok',
            type: 'confirm',
            message: `Generate project in current directory?`
          }
        ])
        if (!ok) {
          return
        }
      } else {
        const { action } = await inquirer.prompt([
          {
            name: 'action',
            type: 'list',
            message: `Target directory .. already exists. Pick an action:`,
            choices: [
              { name: 'Overwrite', value: 'overwrite' },
              { name: 'Merge', value: 'merge' },
              { name: 'Cancel', value: false }
            ]
          }
        ])
        if (!action) {
          return;
        } else if (action === 'overwrite') {
          console.log(`\nRemoving .....`)
          await fs.remove(targetDir)
        }
      }
    }
  }

  // 询问选用文件模版
  console.log('options===', options, name, targetDir);
  creator(name);
}

export default (...args: any) => {
  return create(args).catch(err => {
    // stopSpinner(false) // do not persist
    // error(err)
    console.log('err', err);
    exitProcess(1);
  })
}

// export default create;