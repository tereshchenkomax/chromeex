(() => {
	var x = [];
	const hrefs = [];

	// test
	var a = document.querySelectorAll("a[href^='https://trello.com']");
	console.log(`${a[0].href} test`);

	//dev
	x.push(document.querySelectorAll("a[href^='http://do.ready-for-feedback.com']"));
	x.push(document.querySelectorAll("a[href^='https://trello.com']"));
	
	for (var i = x.length - 1; i >= 0; i--) {
		hrefs.push(x[i][0].href);
		console.log(hrefs);
	}
	
	console.log(x)
	return x;

})();