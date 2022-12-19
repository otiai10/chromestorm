const puppeteer = require("puppeteer");
const path = require("path");

(async () => {
  const ext = path.join(__dirname, "app");
  console.log(ext);
  const browser = await puppeteer.launch({
    headless: "chrome",
    args: [
      `--disable-extensions-except=${ext}`,
      `--load-extension=${ext}`,
    ],
  });
  console.log(browser);
  const background = await browser.waitForTarget(
    target => {
      console.log(target.type());
      return target.type() === 'page'
    }
  );
  const page = await background.page();
  console.log(await page.title());
  await browser.close();
})();