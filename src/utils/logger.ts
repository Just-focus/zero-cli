const chalk = require('chalk');
const stripAnsi = require('strip-ansi');
const readline = require('readline');
import { stopSpinner } from './spinner';

export const clearConsole = (title?: string) => {
  if (process.stdout.isTTY) {
    const blank = '\n'.repeat(process.stdout.rows)
    console.log(blank)
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)
    if (title) {
      console.log(title)
    }
  }
}

// 整合
const format = (label: string, msg: string) => {
  return msg.split('\n').map((line, i) => {
    return i === 0
      ? `${label} ${line}`
      : line.padStart(stripAnsi(label).length + line.length + 1)
  }).join('\n')
}

const chalkTag = (msg: string) => chalk.bgBlackBright.white.dim(` ${msg} `);

export const error = (msg: Error, tag = null) => {
  stopSpinner()
  console.error(format(chalk.bgRed(' ERROR ') + (tag ? chalkTag(tag) : ''), chalk.red(msg)))
  if (msg instanceof Error) {
    console.error(msg.stack)
  }
}