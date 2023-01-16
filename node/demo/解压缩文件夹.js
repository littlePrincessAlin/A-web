/**
 * 压缩文件
 * @param {string} dest
 * @param {string} clientType
 */
const tar = require('tar');
const fse = require('fs-extra');

function tarFiles(dest, clientType) {
  if (!fse.pathExistsSync(dest)) {
    fse.mkdirpSync(dest);
  }
  const filepath = `${dest}/${clientType}.tar.gz`;
  // console.log('filepath--------',filepath)
  return tar.c(
    {
      file: filepath,
      cwd: dest,
      gzip: true,
      filter: fp => {
        return !fp.startsWith('.') && !/\.(json|md|gz)$/.test(fp);
      }
    },
    fse.readdirSync(dest)
  ).then(() => {
    return filepath;
  });
}

// 压缩
const themeFile = tarFiles('dist-theme', 'dist-theme');
console.log('themeFile', themeFile)
