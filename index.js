const fs = require('fs');

const readStream = fs.createReadStream('./image.jpg');
const writeStream = fs.createWriteStream('./image-2.jpg');

readStream.pipe(writeStream);
