import * as puppeteer from "puppeteer";
import * as path from "path";

// See https://pptr.dev/guides/chrome-extensions/

(async () => {
  const ext = path.join(__dirname, "app");
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${ext}`,
      `--load-extension=${ext}`,
    ],
  });
  const background = await browser.waitForTarget(
    target => target.type() === 'service_worker',
  );
  const worker = (await background.worker())!;
  const res = await worker.evaluate(`greet_001()`);
  console.log(res);
  console.log(await worker.evaluate(`chrome.storage.local.get('foo')`))
  console.log(await worker.evaluate(`chrome.storage.local.set({foo: {123: {name: 'otiai10'}}})`))
  console.log(await worker.evaluate(`chrome.storage.local.get('foo')`))
  await browser.close();
})();
