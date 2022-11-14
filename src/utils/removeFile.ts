const fs = require('fs-extra');
const path = require('path');

// 删除文件夹
export const removeDicts = (dir: string): Promise<boolean> => {
  return new Promise((resolve) => {
    fs.remove(dir, (err: boolean) => {
      if(err) {
        resolve(false);
      }
      resolve(true);
    });
  })
}

// 删除当前文件
export const deleteRemovedFiles = (directory: string, newFiles: Record<string,string|Buffer>, previousFiles: Record<string,string|Buffer>) => {
  const filesToDelete = Object.keys(previousFiles)
    .filter(filename => !newFiles[filename]);

  // delete each of these files
  return Promise.all(filesToDelete.map(filename => {
    return fs.unlink(path.join(directory, filename));
  }))
}