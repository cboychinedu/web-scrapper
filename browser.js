// Importing the necessary modules 
const puppeteer = require('puppeteer')

// Creating a function to start the browser 
async function startBrowser() {
    let browser; 

    // Using try catch block 
    try{
        console.log("Opening the browser..."); 
        browser = await puppeteer.launch({
            headless: false, 
            args: ["--disable-setuid-sandbox"], 
            'ignoreHTTPSErrors': true
        }); 
    }

    // Catch the error 
    catch(err) {
        console.log("Could not create a browser instance: ", err);
    }

    return browser
}

module.exports = {
	startBrowser
};