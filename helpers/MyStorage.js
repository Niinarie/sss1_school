const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function getDestination(req, file, cb) {
  cb(null, '/dev/null');
}

function getFilename(req, file, cb) {
  const name = 'file-' + Date.now() + path.extname(file.originalname);
  cb(null, name);
}

function MyStorage(opts) {
  this.getDestination = (opts.destination || getDestination),
    this.getFilename = (opts.filename || getFilename);
}

MyStorage.prototype._handleFile = function _handleFile(req, file, cb) {
  this.getDestination(req, file, function(err, path) {
    if (err) return cb(err);

    const name = Date.now() + file.originalname;
    const outStream = fs.createWriteStream(path + '/' + name)
    console.log(name);
    file.stream.pipe(outStream);
    outStream.on('error', cb);
    outStream.on('finish', function() {
      // create thumbnail
      sharp(path + '/' + name)
        .resize(250, 250)
        .toFile(path + '/250_' + name, (err, info) => {
          if (err) console.log(err);
        });
      // create medium
      sharp(path + '/' + name)
        .resize(500, null)
        .toFile(path + '/500_' + name, (err, info) => {
          if (err) console.log(err);
        });
      sharp.cache(false);

      cb(null, {
        path: name,
        size: outStream.bytesWritten,
      });
    });
  });
};

MyStorage.prototype._removeFile = function _removeFile(req, file, cb) {
  fs.unlink(file.path, cb);
};

module.exports = function(opts) {
  return new MyStorage(opts);
};
