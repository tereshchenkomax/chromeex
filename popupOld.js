var arr = [];

document.addEventListener("DOMContentLoaded", () => {
	var parse = $("parse");
	var copy = $("copy");
	var paste = $("paste");
	var trello = $("trello");
	var ready = $("ready");
	var password = $("password");
	var message = $("message");
	var head = $("head");
	parse.addEventListener("click",() => {
		chrome.tabs.getSelected(null,(tab) => {
			var url = tab.url;
			var testUrl = "https://na43.salesforce.com";
			if(url.indexOf(testUrl) !== -1) {
				chrome.tabs.executeScript({
					file: "content-script.js"
				}, (results) => {
					arr = results[0];
					trello.value = arr[0];
					ready.value = arr[1];
					password.value = arr[2];
					var text = `Hello {Contact First name},

Your project is completed and ready for review.

In order to review the site, please go to the following link:

${ready.value}

U: Welcome
P: ${password.value}

Our team uses a simple and effective way to deliver your screenshot feedback directly to us for review using a tool called Userback. It will help you to save much time giving us your feedback. The instructions on getting started are below.

http://do.ready-for-feedback.com/manuals/WLA_Userback_Manual.pdf

Let us know when you are done with reviewing the website and we will get down to work on your feedback.

If you want to follow the process of work on the requested edits you may join this Trello board - ${trello.value}

If you want to have a quick call to review the site together you may pick a suitable time for the call in my calendar - https://app.hubspot.com/meetings/maxim-t

One important note: due to our policy, the final invoice for the project will be created two weeks after the dev link is delivered. So, please send us your feedback at the earliest convenience.

Looking forward to hearing from you soon!

Best regards,`;
					message.value = text;
					message.select();
					try {
						var successful = document.execCommand("copy");
						var msg = successful ? "successful" : "unsuccessful";
						head.innerHTML = `Copying text command was ${msg}`;
					} catch (err) {
						head.innerHTML = "Oops, unable to copy";
					}
				});
			} else {
				openSF();
			}
		});
	});
	copy.addEventListener("click", () => {
		chrome.tabs.getSelected(null,(tab) => {
			var url = tab.url;
			var testUrl = "https://na43.salesforce.com";
			if(url.indexOf(testUrl) !== -1) {
				injectScript(null,"copy-script.js");
			} else {
				openSF();
			}
		});
	});
	paste.addEventListener("click", () => {
		chrome.tabs.getSelected(null,(tab) => {
			var url = tab.url;
			var testUrl = "https://na43.salesforce.com";
			if(url.indexOf(testUrl) !== -1) {
				chrome.storage.local.get(null, (result) => {
					arr = result.value[0];
					injectScript(arr,"paste-script.js");
				});
			} else {
				openSF();
			}
		});
	});
});

function injectScript(param,filename) {
	chrome.tabs.executeScript({
		code: `var values = ${JSON.stringify(param)};`
	}, () => {	
		chrome.tabs.executeScript({
			file: filename
		}, (results) => {
			if (results[0] !== null) {
				chrome.storage.local.set({"value": results}, function() {
					console.log(`results: ${results}`);
				});
			}
		});
	});
}

function openSF() {
	head.innerHTML = "Open the SF window first";
	head.style.color = "red";
	setTimeout(() => {head.style.color = "black";}, 2000);
}

function $(id) {
	return document.getElementById(id);
}
