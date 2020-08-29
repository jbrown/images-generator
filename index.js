const fs = require('fs');
const sharp = require('sharp');

const readStream = fs.createReadStream('./image.jpg');
const sharpStream = sharp();

const sizes = ['50x50', '250x250', '500x500', '900x900'];
const promises = sizes.map((size) => {
  const [height, width] = size.split('x').map(Number);

  return sharpStream
    .clone()
    .resize({ height, width })
    .jpeg({ quality: 80 })
    .toFile(`image-${height}x${width}.jpg`);
});

readStream.pipe(sharpStream);

Promise.all(promises)
  .then((res) => {
    console.log('Done!', res);
  })
  .catch((err) => {
    console.error("Error processing files, let's clean it up", err);
    try {
      // fs.unlinkSync('originalFile.jpg');
      // fs.unlinkSync('optimized-500.jpg');
      // fs.unlinkSync('optimized-500.webp');
    } catch (e) {}
  });
