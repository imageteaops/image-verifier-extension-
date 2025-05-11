chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "verify-image",
    title: "Verify Image",
    contexts: ["image"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "verify-image") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (imageUrl) => {
        window.postMessage({ type: 'VERIFY_IMAGE', url: imageUrl }, '*');
      },
      args: [info.srcUrl]
    });
  }
});
