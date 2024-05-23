// Importing the necessary modules
require('dotenv').config();
const puppeteer = require('puppeteer'); 
const fs = require('fs'); 
const axios = require('axios'); 
const login = require('./login'); 

// Creating a function to start the application
const start = async () => {
  // Logging the user into Twitter 
  const page = await login(); 

  // Scroll down the page and extract image URLs
  const imageUrls = [];
  while (true) {
    // Scroll down
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });

    // Get all the image tags 
    const imgTags = await page.$$('img'); 

    // Extract the src attribute of each img tag
    for (const imgTag of imgTags) {
      const src = await (await imgTag.getProperty('src')).jsonValue();
      imageUrls.push(src);

      console.log(imageUrls); 
    }


    // Download each image
  //   for (const imageUrl of imageUrls) {
  //   try {
  //     const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  //     const imageBuffer = Buffer.from(response.data, 'binary');
  //     const fileName = imageUrl.split('/').pop();
  //     fs.writeFileSync(fileName, imageBuffer);
  //     console.log(`Downloaded ${fileName}`);
  //   } catch (error) {
  //     console.error(`Failed to download ${imageUrl}: ${error.message}`);
  //   }
  // }
  }


}

start();
