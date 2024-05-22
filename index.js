const browserObject = require('./browser'); 
const scraperController = require('./pageController'); 

// Start the browser and create a browser instance
let browerInstance = browserObject.startBrowser(); 

// Pass the browser instance to the scraper controller 
scraperController(browerInstance); 