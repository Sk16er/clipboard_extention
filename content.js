document.addEventListener('copy', async () => {
  const text = await navigator.clipboard.readText();
  chrome.runtime.sendMessage({ action: 'saveToClipboard', item: { type: 'text', content: text } });
});