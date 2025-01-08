document.addEventListener('DOMContentLoaded', async () => {
  const clipboardItemsContainer = document.getElementById('clipboardItems');
  const items = await chrome.storage.local.get(['clipboardItems']);
  
  if (items.clipboardItems) {
    displayCopiedItems(items.clipboardItems);
  }

  // Add event listener for the clear button
  document.getElementById('clear-button').addEventListener('click', clearCopiedItems);
});

function clearCopiedItems() {
  // Clear the copied items
  chrome.storage.local.set({ clipboardItems: [] }, function () {
    console.log('Copied items cleared.');
    // Update the UI to reflect the changes
    displayCopiedItems([]);
  });
}

function displayCopiedItems(items) {
  const clipboardItemsContainer = document.getElementById('clipboardItems');
  clipboardItemsContainer.innerHTML = ''; // Clear existing items
  items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'clipboard-item';
    if (item.type === 'text') {
      itemDiv.textContent = item.content;
    } else if (item.type === 'image') {
      const img = document.createElement('img');
      img.src = item.content;
      img.className = 'image-preview';
      itemDiv.appendChild(img);
    }
    itemDiv.addEventListener('click', () => {
      navigator.clipboard.writeText(item.content);
      alert('Copied to clipboard');
    });
    clipboardItemsContainer.appendChild(itemDiv);
  });
}

// Example function to fetch and display copied items from storage
function fetchCopiedItems() {
  chrome.storage.local.get(['clipboardItems'], function (result) {
    const items = result.clipboardItems || [];
    displayCopiedItems(items);
  });
}

// Call fetchCopiedItems to initialize the UI with copied items
fetchCopiedItems();