// 创建
const path = require('path');
const chalk = require('chalk');
import downloadTpl from './download';
import readFiles from '../utils/readFiles';
import writeFileTree from '../utils/writeFileTree';
import generatePkg from '../utils/generate';
import { removeDicts } from '../utils/removeFile';

const downloadPkg = 'midStation';
const readDir = `${downloadPkg}/packages/react-webpack`;

// 下载 -> 读取文件 -> 写入当前磁盘 | 修改package.json | 写入自定义config -> 删除文件
const creator = async (name: string) => {
  const loaded = await downloadTpl();
  
  if(loaded) {
    // 读取文件 | 新增config文件
    const fileDir = path.resolve(process.cwd(), readDir);
    // 修改package.json
    await generatePkg(name, fileDir);
    const files = await readFiles(fileDir);

    // 没有即创建 | write package.json
    const writeDir = path.resolve(process.cwd(), name);
    await writeFileTree(writeDir, files);
 
    // 删除之前文件
    const removeDir = path.resolve(process.cwd(), downloadPkg);
    await removeDicts(removeDir);

    // 生成 git init
    const shouldInitGit = false;

  }else {
    console.error(chalk.red('network err, pls wait a moment'))
  }
}

export default creator;
