chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ clipboardItems: [] });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'saveToClipboard') {
    chrome.storage.local.get(['clipboardItems'], (result) => {
      const clipboardItems = result.clipboardItems || [];
      clipboardItems.unshift(request.item);
      chrome.storage.local.set({ clipboardItems });
      sendResponse({ success: true });
    });
    return true;
  }
});