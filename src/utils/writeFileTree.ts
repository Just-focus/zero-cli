// 文件写入操作
const fs = require('fs-extra');
const path = require('path');
import { deleteRemovedFiles } from './removeFile';

// 写入文件
const writeFileTree = async (dir: string, files: Record<string,string|Buffer>, previousFiles?: Record<string,string|Buffer>, include?: Set<string>) => {
  if (previousFiles) {
    await deleteRemovedFiles(dir, files, previousFiles);
  }
  Object.keys(files).forEach((name) => {
    if (include && !include.has(name)) return
    const filePath = path.join(dir, name);

    fs.ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, files[name]);
  })
}

export default writeFileTree;
