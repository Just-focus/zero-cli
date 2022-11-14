const commander = require('commander');
const config = require('../package.json');

import install from './command/create';

const command= {
  create: install,
};

// 执行文件
const exec = (type: string, ...args: any) => {
  config.debug = args[0].debug;
  command[type](...args);
}

commander
  .usage('<command>')
  .version(config.version)
  .description('happy to use zero-cli');

commander
  .command('create <project>')
  .description('Create your own project. For example: zero-cli create demo')
  .action((...args: any) => exec('create', ...args));

commander
  .command('addcpn <component>')
  .description('Create React components in the specified folder. For example: zero-cli addcpn Hello -P(--path) src/components')
  .action((...args: any) => exec('create', ...args));

commander
  .command('help')
  .description('seek for help')
  .action(() => commander.help());

// 解析输入的参数
commander.parse(process.argv);

if (!commander.args.length) {
  commander.help();
}