chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });
});

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg === "FINISHED") {
    chrome.action.setIcon({ path: "IconCopied.png", tabId: sender.tab.id });

    setTimeout(() => {
      chrome.action.setIcon({ path: "Icon.png", tabId: sender.tab.id });
    }, 2000);
  }
  else if (msg === "ERROR") {
    chrome.action.setIcon({ path: "IconFailed.png", tabId: sender.tab.id });

    setTimeout(() => {
      chrome.action.setIcon({ path: "Icon.png", tabId: sender.tab.id });
    }, 2000);
  }
});