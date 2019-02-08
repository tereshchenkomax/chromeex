class Main {
	constructor() {
		this.state = {
			ready: "",
			trello: "",
			password: "",
			message: "",
			head: "",
			value: "No message"
		};
		this.injectScript = this.injectScript.bind(this);
		this.clickHandlerSF = this.clickHandlerSF.bind(this);
		this.clickHandlerParse = this.clickHandlerParse.bind(this);
		this.clickHandlerPaste = this.clickHandlerPaste.bind(this);
		this.clickHandlerCopy = this.clickHandlerCopy.bind(this);
		this.clickHandlerLogin = this.clickHandlerLogin.bind(this);
		this.init();
	}

	init() {
		this.state.ready = $("ready");
		this.state.trello = $("trello");
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
				}
				this.openSF();
				$("parse").disabled = $("sf").disabled = $("copy").disabled = $("paste").disabled = $("login-button").disabled = true;
				return false;
			});
	}

	createTab(url) {
		return new Promise(resolve => {
			chrome.tabs.create({url}, async tab => {
				chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
					if (info.status === "complete" && tabId === tab.id) {
						chrome.tabs.onUpdated.removeListener(listener);
						resolve(tab);
					}
				});
			});
		});
	}

	getTabUrl() {
		return new Promise(res => {
			chrome.tabs.query({active: true, currentWindow: true}, tabs => {
				let taburl = tabs[0].url;
				res(taburl);
			});
		});
	}

	injectScript(filename) {
		return new Promise(res => {
			chrome.tabs.executeScript({
				file: filename
			}, (results) => {
				if (results[0] != null) {
					chrome.storage.local.set({"value": results});
				}
				res(results);
			});
		});
	}

	injectVar(variable) {
		chrome.tabs.executeScript({
			code: `var values = ${JSON.stringify(variable)};`
		}, () => console.log(`${variable} injected`));
	}

	openSF() {
		head.innerHTML = "Open the Salesforce tab";
		head.style.color = "red";
		setTimeout(() => {
			head.style.color = "black";
		}, 2000);
	}

	getFromStorage() {
		return new Promise(res => {
			chrome.storage.local.get(null, (results) => {
				if (results.value[0] !== 'undefined') {
					this.state.value = results.value[0];
					res(this.state.value);
					console.log(`this.state.value = ${this.state.value}`);
				}
			});
		});
	}

	clickHandlerPaste() {
		this.getFromStorage()
			.then((value) => {
				this.injectVar(value);
				this.injectScript("paste-script.js");
			})
			.catch((Error) => {
				console.log(Error);
			});
	}

	clickHandlerParse() {
		let {ready, trello, password, message, head} = this.state;
		this.injectScript("content-script.js")
			.then((results) => {
				ready.value = results[0][0];
				trello.value = results[0][1];
				password.value = results[0][2];
				message.value = `Hello {Contact First name},\n
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
				message.select();
				try {
					let successful = document.execCommand("copy");
					let msg = successful ? "successful" : "unsuccessful";
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

	clickHandlerCopy() {
		head.innerHTML = "Copied";
		this.injectScript("copy-script.js");
	}

	clickHandlerSF() {
		this.injectScript("sf-script.js")
			.then((results) => {
				this.state.trello.value = results[0];
				this.state.message.value = `${this.state.trello.value} \n ___ \n ${this.state.tabUrl}`;
				this.state.message.select();
				try {
					var successful = document.execCommand("copy");
					var msg = successful ? "successful" : "unsuccessful";
					this.state.head.innerHTML = `Copying text command was ${msg}`;
				} catch (err) {
					this.state.head.innerHTML = "Oops, unable to copy";
					console.log(err);
				}
			})
			.catch((Error) => {
				console.log(Error);
			});
	}

	clickHandlerLogin() {
		this.injectScript("copy-script.js")
			.then(this.getFromStorage()
				.then(value => {
					const val = value;
					console.log(`value from storage ${val}`);
					const newURL = value[2] + "wp-login.php";

					chrome.tabs.create({url: newURL, active: false}, () => {
							chrome.tabs.query({url: newURL}, result => {
								let idOfTab = result[0].id;
								chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
									if (tabId == idOfTab && changeInfo.status == "complete") {
										console.log('loading of a new tab has been completed ');
										chrome.tabs.executeScript(idOfTab,{code: `var values = ${JSON.stringify(val)};`});
										chrome.tabs.executeScript(idOfTab, {file: "login-script.js"});
									}
								})
							});
						}
					);
				})
				.catch((Error) => {
					console.log(Error);
				}));
	}

	copyAndParse() {
		$("parse").addEventListener("click", this.clickHandlerParse);
		$("copy").addEventListener("click", this.clickHandlerCopy);
		$("paste").addEventListener("click", this.clickHandlerPaste);
		$("sf").addEventListener("click", this.clickHandlerSF);
		$("login-button").addEventListener("click", this.clickHandlerLogin);
	}

}

let $ = (id) => document.getElementById(id);

document.addEventListener("DOMContentLoaded", () => {
	let mainClass = new Main();
	mainClass.copyAndParse();
});




