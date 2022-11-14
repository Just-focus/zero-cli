const semver = require('semver');
const chalk = require('chalk');
// const config = require('../../package.json');
import config from '../../package.json';

// 检测是否存在当前目录
export const checkExist = () => {
  console.log(process.version, config);
  // if (!semver.satisfies(process.version, config.engines.node)) {

  // }
}

// 检测当前版本
export const checkVersion = () => {
  console.log(process.version, config);
}
