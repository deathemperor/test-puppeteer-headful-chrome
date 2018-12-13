const puppeteer = require('puppeteer')
const glob = require('glob')
let chromePath = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
const numberOfSpams = 10
const urlToSpam = 'https://blog.uiza.io/spotify-squad-framework-part-i/'
let lookFor


var osvar = process.platform
if (osvar == 'darwin') {
  lookFor = "**/Chromium" // MacOSX
 }else if(osvar == 'win32'){
  lookFor = "**/chrome.exe" // Windows
}else{
  console.log("unknown os")
  process.exit()
}

const files = glob.sync(__dirname + `/node_modules/puppeteer/.local-chromium/${lookFor}`, {})
chromePath = files[0] // assuming only fond out...

void (async () => {
  const browser = await puppeteer.launch({ 
    headless: false, 
    executablePath: chromePath 
  })
  for (var i = 0; i <= numberOfSpams; i++) {
    try {
      var page = await browser.newPage()
      await page.goto(urlToSpam)
      page.evaluate(_ => {
        window.scrollBy(0, 500)
      })
      await page.waitFor(2000)
    } catch (err) {
      console.log(err)
    }
  }
  
})()
