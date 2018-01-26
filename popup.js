  
  

document.addEventListener('DOMContentLoaded', () => {

  var parse = document.getElementById('parse');

  parse.addEventListener('click',() => {
    chrome.tabs.executeScript({
      file: 'content-script.js'
    },
   (results) => {
    console.log(results); 
    });
  })
  
});

