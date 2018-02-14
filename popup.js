document.addEventListener("DOMContentLoaded", () => {
	var parse = document.getElementById("parse");
	var trello = document.getElementById("trello");
	var ready = document.getElementById("ready");
	var head = document.getElementById("head");
	console.log(head);
	var arr = [];
	parse.addEventListener("click",() => {
		chrome.tabs.getSelected(null,function(tab) {
			var url = tab.url;
			var testUrl = "https://na43.salesforce.com";
			if(url.indexOf(testUrl) !== -1) {
				chrome.tabs.executeScript({
					file: "content-script.js"
				}, (results) => {
					arr = results[0];
					trello.value = arr[0];
					ready.value = arr[1];
				});
			} else {
				head.innerHTML = "Open the SF window";
			}
			
		});
	});	
});
