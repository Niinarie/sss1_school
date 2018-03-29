exports.getExif = function(image) {
    const ExifImage = require('exif').ExifImage;
    try {
        new ExifImage({ image: image }, function (error, exifData) {
            if (error)
                console.log('Error: ' + error.message);
            else
                console.log(exifData); // Do something with your data! 
        });
    } catch (error) {
        console.log('Error: ' + error.message);
    };
}
