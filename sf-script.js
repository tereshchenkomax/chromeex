(() => {
	const x = [];
	const hrefs = [];
	
	x.push(document.querySelectorAll("a[href^='https://trello.com']"));
	
	try { hrefs.push(x[0][0].href);	}
	catch(err) {
		console.log(err);
	}
	
	return hrefs;
})();