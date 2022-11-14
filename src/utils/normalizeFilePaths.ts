import slash from 'slash';

const normalizeFilePaths = (files: Record<string,string|Buffer>) => {
  Object.keys(files).forEach(file => {
    const normalized = slash(file)
    if (file !== normalized) {
      files[normalized] = files[file]
      delete files[file]
    }
  })
  return files
}

export default normalizeFilePaths;