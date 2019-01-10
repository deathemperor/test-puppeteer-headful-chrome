const puppeteer = require('puppeteer')
const randomUserAgent = require('random-useragent')
const fs = require('fs');

let chromePath = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
const numberOfSpams = 5
const useRandomUserAgent = true
const openNewBrowser = true
const urlToSpam = 'https://blog.uiza.io/spotify-squad-framework-part-i/'

var osvar = process.platform
if (osvar == 'darwin') {
  // MacOSX
} else if (osvar == 'win32') {
  chromePath = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
} else {
  console.log("unknown os")
  process.exit()
}

// it is required to have Chrome to run
if (!fs.existsSync(chromePath)) {
  console.log('\x1b[31m', "Chrome (not Chromium) is required. Please install it here: https://chrome.google.com", '\x1b[0m');
  process.exit()
}

void(async () => {
  // a browser a page
  let successCount = 0
  if (openNewBrowser) {
    for (var i = 1; i <= numberOfSpams; i++) {
      try {
        var browser = await puppeteer.launch({
          headless: false,
          executablePath: chromePath,
          devtools: true
        })
        try {
          var page = await browser.newPage()
        } catch (err) {
          console.log(err)
        }
        if (useRandomUserAgent) {
          page.setUserAgent(randomUserAgent.getRandom())
        }
        try {
          await page.goto(urlToSpam)
          // turn the below line on to enable logging chrome's console to node console
          //page.on('console', msg => console.log('PAGE LOG:', msg.text()))
          successCount = await page.evaluate(successCount => {
            window.scrollBy(0, 500)
            successCount++
            return successCount
          }, successCount)
          console.log("SUCCESS COUNT: %d", successCount)
          await page.waitFor(2000)
        } catch (err) {
          if (err.errno == -4048) {
            console.log("error controlling instance")
            browser.close()
          }
        }
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