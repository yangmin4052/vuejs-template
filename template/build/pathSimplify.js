const fs = require('fs');
const path = require('path');
const regexOfCss = /\.css$/;
const pathArrOfCSS = path.resolve(__dirname, '../dist/static/css/');
const transform = {
  from: '../../static/',
  to: '../'
};

const pathSimplify = () => {
  fs.readdir(pathArrOfCSS, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      let count = 0;
      const length = files.length;
      files.forEach(file => {
        if (regexOfCss.test(file)) {
          fs.readFile(`${pathArrOfCSS}/${file}`, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log();
              var before = data.toString();
              const regexOftext = new RegExp(transform.from, 'g');
              const after = before.replace(regexOftext, transform.to);
              fs.writeFile(`${pathArrOfCSS}/${file}`, after, err => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`${file}路径替换完成`);
                  count++;
                  if (count === length) {
                    console.log('全部css文件路径替换完成');
                  }
                }
              });
            }
          });
        } else {
          count++;
        }
      });
    }
  });
};

module.exports = pathSimplify;
