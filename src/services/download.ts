const download = require('download-git-repo');
const hiddenDir = 'downloadPkg'; // 隐藏文件

// 下载目录 templates 文件
const downloadTpl = (): Promise<boolean> => {
  return new Promise(resolve => {
    download('Just-focus/zero-templates', hiddenDir, (err: boolean) => {
      if(err) {
        resolve(false);
      }
      resolve(true);
    })
  })
}

export default downloadTpl;