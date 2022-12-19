const puppeteer = require("puppeteer");
const path = require("path");

// See https://pptr.dev/guides/chrome-extensions/

(async () => {
  const ext = path.join(__dirname, "app");
  console.log(ext);
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${ext}`,
      `--load-extension=${ext}`,
    ],
  });
  console.log(browser);
  const page = await browser.newPage();
  const background = await browser.waitForTarget(
    async target => {
      console.log(target.type());
      console.log(await target.worker());
      return target.type() === 'page'
    }
  );
  // const page = await background.page();
  console.log(await page.title());
  await page.close();
  await browser.close();
})();