document.addEventListener("DOMContentLoaded", () => {
	var parse = document.getElementById("parse");
	var trello = document.getElementById("trello");
	var ready = document.getElementById("ready");
	var arr = [];
	parse.addEventListener("click",() => {
		chrome.tabs.executeScript({
			file: "content-script.js"
		},
		(results) => {
			arr = results[0];
			trello.value = arr[0];
			ready.value = arr[1];
		});
	});
	
});
