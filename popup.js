
// function getCurrentTabUrl(callback) {

//   var queryInfo = {
//     active: true,
//     currentWindow: true
//   };

//   chrome.tabs.query(queryInfo, (tabs) => {

//     var tab = tabs[0];

//     var url = tab.url;
 
//     console.assert(typeof url == 'string', 'tab.url should be a string');

//     callback(url);
//   });

// }

// function changeBackgroundColor(color) {
//   var script = 'document.body.style.backgroundColor="' + color + '";';
  
//   chrome.tabs.executeScript({
//     code: script
//   });
// }


// function getSavedBackgroundColor(url, callback) {
  
//   chrome.storage.sync.get(url, (items) => {
//     callback(chrome.runtime.lastError ? null : items[url]);
//   });
// }


// function saveBackgroundColor(url, color) {
//   var items = {};
//   items[url] = color;

//   chrome.storage.sync.set(items);
// }

// document.addEventListener('DOMContentLoaded', () => {
//   getCurrentTabUrl((url) => {
//     var dropdown = document.getElementById('dropdown');

 
//     getSavedBackgroundColor(url, (savedColor) => {
//       if (savedColor) {
//         changeBackgroundColor(savedColor);
//         dropdown.value = savedColor;
//       }
//     });

//     dropdown.addEventListener('change', () => {
//       changeBackgroundColor(dropdown.value);
//       saveBackgroundColor(url, dropdown.value);
//     });
//   });
// });

document.addEventListener('DOMContentLoaded', (tab) => {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');
  var parse = document.getElementById('parse');
  parse.addEventListener('click',() => {
    chrome.tabs.executeScript({
      code: 'document.body.style.backgroundColor="red"'
    });
  })
  
});





