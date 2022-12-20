import * as puppeteer from "puppeteer";
import * as path from "path";

// See https://pptr.dev/guides/chrome-extensions/

const data = [
  {
    run: `greet_001()`
  }
];

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

  const errors: any[] = [];

  for (let i = 0; i < data.length; i++) {
    const testcase = data[i];
    const res = (await worker.evaluate(testcase.run)) as any;
    if (!res.ok) errors.push(res);
    console.log(res);
  }
  // console.log(await worker.evaluate(`chrome.storage.local.get('foo')`))
  // console.log(await worker.evaluate(`chrome.storage.local.set({foo: {123: {name: 'otiai10'}}})`))
  // console.log(await worker.evaluate(`chrome.storage.local.get('foo')`))
  await browser.close();
})();
