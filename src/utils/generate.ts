const fs = require('fs-extra');
const path = require('path')
const readPackage = require('read-pkg');
import writeFileTree from './writeFileTree';

// 读取文件
const resolvePkg = async (context: string) => {
  if (fs.existsSync(path.join(context, 'package.json'))) {
    return await readPackage({ cwd: context })
  }
  return {}
}

// 生成文件 | 修改文件
const generatePkg = async (name: string, context: string) => {
  const resolvedPkg = await resolvePkg(context);
  // merge package.josn 文件
  const pkg = {
    ...resolvedPkg,
    name,
    version: '0.1.0'
  }

  // write package.json
  await writeFileTree(context, {
    'package.json': JSON.stringify(pkg, null, 2)
  }, {
    'package.json': null
  })
}

export default generatePkg;