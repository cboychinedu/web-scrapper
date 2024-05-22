require('dotenv').config();
const puppeteer = require('puppeteer'); 
const fs = require('fs'); 
const path = require('path'); 
const axios = require('axios'); 

async function start() {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()

    await page.goto("https://twitter.com")

    await page.setDefaultNavigationTimeout(9000000);
    
    //
    await page.waitForSelector('a[href="/login"]'); 
    await page.click('a[href="/login"]'); 

    // 
    await page.waitForSelector('input[name="text"]')
    await page.type('input[name="text"]', 'brownmark2179')

    // 
    // Wait for the button to be rendered on the page
    await page.waitForSelector('#layers > div:nth-child(2) > div > div > div > div > div > div.css-175oi2r.r-1ny4l3l.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv.r-1awozwy > div.css-175oi2r.r-1wbh5a2.r-htvplk.r-1udh08x.r-1867qdf.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1 > div > div > div.css-175oi2r.r-1ny4l3l.r-6koalj.r-16y2uox.r-kemksi.r-1wbh5a2 > div.css-175oi2r.r-16y2uox.r-1wbh5a2.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > div > div > button:nth-child(6)');

    // Click the button
    await page.click('#layers > div:nth-child(2) > div > div > div > div > div > div.css-175oi2r.r-1ny4l3l.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv.r-1awozwy > div.css-175oi2r.r-1wbh5a2.r-htvplk.r-1udh08x.r-1867qdf.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1 > div > div > div.css-175oi2r.r-1ny4l3l.r-6koalj.r-16y2uox.r-kemksi.r-1wbh5a2 > div.css-175oi2r.r-16y2uox.r-1wbh5a2.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > div > div > button:nth-child(6)');

    // Optional: Wait for some result after clicking the button
    // await page.waitForNavigation();


   // Wait for the input field to be visible
   await page.waitForSelector('input[type="password"]');

   // Fill the password input field with the desired password using page.type()
   const password = process.env.password
   await page.type('input[type="password"]', password);

    // Wait for the button to be visible
    await page.waitForSelector('button[data-testid="LoginForm_Login_Button"]');

    // Click on the button
    await page.click('button[data-testid="LoginForm_Login_Button"]');

    // 
    await page.waitForNavigation();

    // 


   // Get all anchor tags
   const anchorTags = await page.$$('a');

    // Extract href and inner text from anchor tags
  const anchorData = await Promise.all(anchorTags.map(async (tag) => {
    const href = await page.evaluate(el => el.href, tag);
    const text = await page.evaluate(el => el.textContent, tag);
    return { href, text };
  }));

  

   // Get all image tags
   const imageTags = await page.$$('img');

   // Extract src attribute from image tags
   const imageUrls = await Promise.all(imageTags.map(async (tag) => {
       const src = await page.evaluate(el => el.src, tag);
       return src;
   }));

   console.log(imageUrls); 

   // Download each image
   for (let i = 0; i < imageUrls.length; i++) {
       const imageUrl = imageUrls[i];
       const response = await axios.get(imageUrl, { responseType: 'stream' });
       const imageName = path.basename(imageUrl);
       const filePath = path.join(__dirname, imageName);
       response.data.pipe(fs.createWriteStream(filePath));
       console.log(`Image ${i + 1} downloaded: ${filePath}`);
   }

   

//    // Extract inner text from each anchor tag
//    const innerTexts = [];
//    for (const tag of anchorTags) {
//        const innerText = await page.evaluate(tag => tag.innerText, tag);
//        innerTexts.push(innerText);
//    }

   // Log the list of inner texts
//    console.log(innerTexts);


    
}

start()