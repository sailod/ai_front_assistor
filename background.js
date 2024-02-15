// Register a context menu on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "captureElementAndParent",
    title: "Capture Element & Nth Parent",
    contexts: ["all"]
  });
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
      id: "gpt-text-input-option",
      title: "Ask GPT on the selected elements",
      contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "gpt-text-input-option") {
      chrome.tabs.sendMessage(tab.id, {action: "openTextInputPopup"});
  }
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "captureElementAndParent" && tab && tab.id !== undefined) {
    // Set the desired Nth parent level before injecting the script
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['contentScript.js']
    });
  }
});
