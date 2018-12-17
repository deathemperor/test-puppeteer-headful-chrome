const puppeteer = require('puppeteer')
const glob = require('glob')
const randomUserAgent = require('random-useragent')
const fs = require('fs');

let chromePath = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
const numberOfSpams = 2
const useRandomUserAgent = true
const openNewBrowser = true
const urlToSpam = 'https://blog.uiza.io/spotify-squad-framework-part-i/'
let lookFor


var osvar = process.platform
if (osvar == 'darwin') {
  // lookFor = "**/Chromium" // MacOSX
} else if(osvar == 'win32'){
  chromePath = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
} else {
  console.log("unknown os")
  process.exit()
}

// it is required to have Chrome to run
if (!fs.existsSync(chromePath)) {
  console.log('\x1b[31m', "Chrome (not Chromium) is required. Please install it here: https://chrome.google.com", '\x1b[0m' );
  process.exit()
}

// const files = glob.sync(__dirname + `/node_modules/puppeteer/.local-chromium/${lookFor}`, {})
// chromePath = files[0] // assuming only fond out...

void (async () => {
  // a browser a page
  if (openNewBrowser) {
    for (var i = 1; i <= numberOfSpams; i++) {
      try {
        var browser = await puppeteer.launch({ 
          headless: false, 
          executablePath: chromePath 
        })
        var page = await browser.newPage()
        if (useRandomUserAgent) {
          page.setUserAgent(randomUserAgent.getRandom())
        }
        await page.goto(urlToSpam)
        await page.evaluate(_ => {
          window.scrollBy(0, 500)
        })
        await page.waitFor(2000)
      } catch (err) {
        console.log(err)
      }
    }
  } else {
    // multiple tabs under the same browser
    var browser = await puppeteer.launch({ 
      headless: false, 
      executablePath: chromePath 
    })
    for (var i = 1; i <= numberOfSpams; i++) {
      try {
        var page = await browser.newPage()
        if (useRandomUserAgent) {
          page.setUserAgent(randomUserAgent.getRandom())
        }
        await page.goto(urlToSpam)
        await page.evaluate(_ => {
          window.scrollBy(0, 500)
        })
        await page.waitFor(2000)
      } catch (err) {
        console.log(err)
      }
    }
  }
  
})()
