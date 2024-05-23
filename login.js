// Importing the necessary modules
require('dotenv').config(); 
const puppeteer = require('puppeteer'); 

// Creating a function for logging the user's in
const login = async () => {
    // Creating the browser state
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()

    // Navigating to the twitter website
    await page.goto("https://twitter.com")
    await page.setDefaultNavigationTimeout(9000000);
    
    // Clicking on the login button
    await page.waitForSelector('a[href="/login"]'); 
    await page.click('a[href="/login"]'); 

    // typeing the username inside the user text field
    const username = process.env.username;
    await page.waitForSelector('input[name="text"]')
    await page.type('input[name="text"]', username)

    // Wait for the button to be rendered on the page
    await page.waitForSelector('#layers > div:nth-child(2) > div > div > div > div > div > div.css-175oi2r.r-1ny4l3l.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv.r-1awozwy > div.css-175oi2r.r-1wbh5a2.r-htvplk.r-1udh08x.r-1867qdf.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1 > div > div > div.css-175oi2r.r-1ny4l3l.r-6koalj.r-16y2uox.r-kemksi.r-1wbh5a2 > div.css-175oi2r.r-16y2uox.r-1wbh5a2.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > div > div > button:nth-child(6)');

    // Click the button 
    await page.click('#layers > div:nth-child(2) > div > div > div > div > div > div.css-175oi2r.r-1ny4l3l.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv.r-1awozwy > div.css-175oi2r.r-1wbh5a2.r-htvplk.r-1udh08x.r-1867qdf.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1 > div > div > div.css-175oi2r.r-1ny4l3l.r-6koalj.r-16y2uox.r-kemksi.r-1wbh5a2 > div.css-175oi2r.r-16y2uox.r-1wbh5a2.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > div > div > button:nth-child(6)');

    // Optional: Wait for some result after clicking the button
    // await page.waitForNavigation();

   // Typing the password
   await page.waitForSelector('input[type="password"]');

   // Fill the password input field with the desired password using page.type()
   const password = process.env.password
   await page.type('input[type="password"]', password);

    // Wait for the button to be visible
    await page.waitForSelector('button[data-testid="LoginForm_Login_Button"]');

    // Click on the button
    await page.click('button[data-testid="LoginForm_Login_Button"]');
    await page.waitForNavigation();

    // Return the page 
    return page
}

// Exporting the login function 
module.exports = login;