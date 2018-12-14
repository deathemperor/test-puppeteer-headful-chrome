const puppeteer = require('puppeteer')
const glob = require('glob')
let chromePath = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
const numberOfSpams = 1
const urlToSpam = 'https://blog.uiza.io/spotify-squad-framework-part-i/'
let lookFor


var osvar = process.platform
if (osvar == 'darwin') {
  // lookFor = "**/Chromium" // MacOSX
} else if(osvar == 'win32'){
  chromePath = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
} else {
  console.log("unknown os")
  process.exit()
}

// const files = glob.sync(__dirname + `/node_modules/puppeteer/.local-chromium/${lookFor}`, {})
// chromePath = files[0] // assuming only fond out...

void (async () => {
  const browser = await puppeteer.launch({ 
    headless: false, 
    executablePath: chromePath 
  })
  for (var i = 1; i <= numberOfSpams; i++) {
    try {
      var page = await browser.newPage()
      await page.goto(urlToSpam)
      await page.evaluate(_ => {
        window.scrollBy(0, 500)
        // window.setTimeout(() => {
        //   if (window.UZ.loaded) {
        //     window.UZ.Player("iframe-2c08f440-a1d7-4a2b-941f-7fdadd5ac112").play()
        //   }
        // }, 2000)
      })
      await page.waitFor(2000)
    } catch (err) {
      console.log(err)
    }
  }
  
})()
