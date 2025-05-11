chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'EXIF_DATA') {
    const infoEl = document.getElementById('info');
    infoEl.innerHTML = `<strong>URL:</strong> ${msg.url}
      <br><strong>EXIF:</strong>
      <pre>${JSON.stringify(msg.meta, null, 2)}</pre>`;
  }
});
