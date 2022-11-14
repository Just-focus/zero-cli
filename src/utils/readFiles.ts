const fs = require('fs-extra');
const path = require('path');
const { isBinaryFileSync } = require('isbinaryfile');
const globby = require('globby');
import normalizeFilePaths from './normalizeFilePaths';

// 读取文件
const readFiles = async (context: string) => {
  const files = await globby(['**'], {
    cwd: context,
    onlyFiles: true,
    gitignore: true,
    ignore: ['**/node_modules/**', '**/.git/**', '**/.svn/**'],
    dot: true
  });

  const res = {};
  for (const file of files) {
    const name = path.resolve(context, file);
    res[file] = isBinaryFileSync(name)
      ? fs.readFileSync(name)
      : fs.readFileSync(name, 'utf-8')
  }

  return normalizeFilePaths(res)
}

export default readFiles;