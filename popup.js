  
  

document.addEventListener("DOMContentLoaded", () => {
	var parse = document.getElementById("parse");
	parse.addEventListener("click",() => {
		chrome.tabs.executeScript({
			file: "content-script.js"
		},
		(results) => {
		console.log(results[0]); 
		});
	});
});

// (() => {
//   var x = [];
//   x[0] = document.querySelectorAll("a[href^='https://trello.com']");
//   x[1] = document.querySelectorAll("a[href^='https://do.ready-for-feedback.com']");
//   x[2] = document.querySelectorAll("a[href^='https://trello.com']");
  
//   console.log(x);
//   return x;

// })();