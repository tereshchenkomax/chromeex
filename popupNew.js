class Main {
	constructor() {
		this.state = {};
	}

	init() {

		this.state.trello = $("trello");
		this.state.ready = $("ready");
		this.state.password = $("password");
		this.state.message = $("message");
		this.state.head = $("head");
		this.checkTheTab();

	}

	checkTheTab() {
		this.getTabUrl()
			.then((res) => {
				let testUrl = /na[0-9]{2}\.salesforce\.com/;
				if (testUrl.test(res)) {
					this.state.tabUrl = res;
					return true;
				} else {
					openSF();
					$("parse").disabled = $("sf").disabled = $("copy").disabled = $("paste").disabled = true;
					return false;
				}
			});
	}

	getTabUrl() {
		return new Promise(res => {
			chrome.tabs.query({active: true, currentWindow: true}, tabs => {
				let taburl = tabs[0].url;
				console.log(taburl);
				res(taburl);
			});
		});
	}

	clickHandlerCopy() {
		this.checkTheTab() ? injectScript("copy-script.js") : openSF();
	}

	copyAndParse() {
		$("parse").addEventListener("click", clickHandlerParse);
		$("copy").addEventListener("click", clickHandlerCopy);
		$("paste").addEventListener("click", clickHandlerPaste);
		$("sf").addEventListener("click", clickHandlerSF);
	}

}

function injectVar(variable) {
	chrome.tabs.executeScript({
		code: `var values = ${JSON.stringify(variable)};`
	}, () => console.log(`${variable} injected`));
}

function injectScript(filename) {
	return new Promise(res => {
		chrome.tabs.executeScript({
			file: filename
		}, (results) => {
			if (results != null) {
				chrome.storage.local.set({"value": results}, function () {
					console.log(`results: ${results}`);
				});
			}
			res(results);
		});
	});
}

function getFromStorage() {
	return new Promise(res => {
		chrome.storage.local.get(null, (results) => {
			if (results.value[0] !== null) {
				value = results.value[0];
				res(value);
			}
		});
	});
}



function clickHandlerPaste() {
	getFromStorage()
		.then((value) => {
			injectVar(value);
			injectScript("paste-script.js");
		})
		.catch((Error) => {
			console.log(Error);
		});
}

function clickHandlerSF() {
	injectScript("sf-script.js")
		.then((results) => {
			trello.value = results[0];
			message.value = `${trello.value} \n ___ \n ${taburl}`;
			message.select();
			try {
				var successful = document.execCommand("copy");
				var msg = successful ? "successful" : "unsuccessful";
				head.innerHTML = `Copying text command was ${msg}`;
			} catch (err) {
				head.innerHTML = "Oops, unable to copy";
				console.log(err);
			}
		})
		.catch((Error) => {
			console.log(Error);
		});

}

function clickHandlerParse() {
	injectScript("content-script.js")
		.then((results) => {
			ready.value = results[0][0];
			trello.value = results[0][1];
			password.value = results[0][2];
			let text = `Hello {Contact First name},\n
Your project is completed and ready for review.\n
In order to review the site, please go to the following links:\n
${ready.value}\n
${ready.value}/wp-admin \n
Username: Welcome
Password: ${password.value}\n
Our team uses a simple and effective way to deliver your screenshot feedback directly to us for review using a tool called Userback. It will help you to save much time giving us your feedback. The instructions on getting started are below.\n
https://www.youtube.com/watch?v=4RrGEQhVC6s&feature=youtu.be\n
Let us know when you are done with reviewing the website and we will get down to work on your feedback.\n
If you want to follow the process of work on the requested edits you may join this Trello board: - ${trello.value}\n
The instructions on how it works can be found in the first column.\n
One important note: due to our policy, the final invoice for the project will be created two weeks after the dev link is delivered. So, please send us your feedback at the earliest convenience.\n
Looking forward to hearing from you soon!\n
Best regards,`;
			message.value = text;
			message.select();
			try {
				var successful = document.execCommand("copy");
				var msg = successful ? "successful" : "unsuccessful";
				head.innerHTML = `Copying text command was ${msg}`;
			} catch (err) {
				head.innerHTML = "Oops, unable to copy";
				console.log(err);
			}
		})
		.catch((Error) => {
			console.log(Error);
		});
}

function openSF() {
	head.innerHTML = "Open the Salesforce tab";
	head.style.color = "red";
	setTimeout(() => {
		head.style.color = "black";
	}, 2000);
}

function $(id) {
	return document.getElementById(id);
}


document.addEventListener("DOMContentLoaded", () => {
	let basicclass = new Main();
	basicclass.init();
	basicclass.copyAndParse();
});

