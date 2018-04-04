const fs = require('fs');

const deleteFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.stat('./uploads/' + file, (err, stats) => {
      if (err) {
        reject(err);
      }
      fs.unlink('./uploads/'+ file, (err) => {
        if (err) reject(err);
        console.log('file deleted successfully');
        resolve('success');
      });
    });
  });
};

exports.deleteFiles = (files) => {
  Promise.all(
    files.map((file) => deleteFile(file))
  ).then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
};
