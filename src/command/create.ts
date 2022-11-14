const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk')
const validateProjectName = require('validate-npm-package-name');

import creator from '../services/creator';
import { clearConsole, error } from '../utils/logger';
import exitProcess from '../utils/exit';
import { stopSpinner } from '../utils/spinner';

const create = async (args: any) => {
  const [projectName, options] = args;
  const { force, merge } = options;
  const cwd = process.cwd(); // 当前目录
  const inCurrent = projectName === '.'; // 是否在当前目录
  const name = inCurrent ? path.relative('../', cwd) : projectName; // 项目名称
  const targetDir = path.resolve(cwd, projectName || '.'); // 生成项目的目录
  
  // 验证名称是否合法 | 基础验证
  const result = validateProjectName(name);

  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${name}"`))
    result.errors && result.errors.forEach(err => {
      console.error(chalk.red.dim('Error: ' + err))
    })
    result.warnings && result.warnings.forEach(warn => {
      console.error(chalk.red.dim('Warning: ' + warn))
    })
    exitProcess(1)
  }
  // 检测当前文件下是否已存在 | 基础验证
  if (fs.existsSync(targetDir) && !merge) {
    if (force) {
      await fs.remove(targetDir);
    } else {
      clearConsole();
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
            message: `Target directory ${chalk.cyan(targetDir)} already exists. Pick an action:`,
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
          console.log(`\nRemoving ${chalk.cyan(targetDir)}...`)
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
    stopSpinner(false) // do not persist
    error(err)
    console.log('err', err);
    exitProcess(1);
  })
}
