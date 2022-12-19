
chrome.runtime.onInstalled.addListener(async () => {

    console.log("Hello!!!!");

    console.log(chrome.storage.local);
    chrome.storage.local.get(["foo", "baa"], (res) => {
        console.log("get", "foo", "baa");
        console.log(res);
    });

    chrome.storage.local.set({foo: {"1234": {name: "otiai10", age: 17}}}, () => {
        console.log("set successful");
    });

    chrome.storage.local.get(["foo", "baa"], (res) => {
        console.log("get", "foo", "baa");
        console.log(res);
    });

    let url = chrome.runtime.getURL("hello.html");
    let tab = await chrome.tabs.create({ url });
    console.log(`Created tab ${tab.id}`);
  });