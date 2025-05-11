// inject Exif.js
const script = document.createElement('script');
script.src = chrome.runtime.getURL('lib/exif.js');
document.head.appendChild(script);

// listen for our background message
window.addEventListener('message', async (event) => {
  if (event.data?.type === 'VERIFY_IMAGE') {
    const imageUrl = event.data.url;
    fetch(imageUrl)
      .then(res => res.blob())
      .then(blob => {
        EXIF.getData(blob, function() {
          const allMeta = EXIF.getAllTags(this);
          chrome.runtime.sendMessage({ 
            type: 'EXIF_DATA', 
            url: imageUrl, 
            meta: allMeta 
          });
        });
      })
      .catch(err => console.error('EXIF error', err));
  }
});
