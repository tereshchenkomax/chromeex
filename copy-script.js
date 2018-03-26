(() => {
	const x = [];
	const hrefs = [];
	
	x.push(document.querySelectorAll("a[href^='http://do.ready-for-feedback.com']"));
	x.push(document.querySelectorAll("a[href^='https://trello.com']"));
	var bk = document.querySelectorAll("a[href^='https://3.basecamp.com']");
	if (bk.length === 0) {
		bk = document.querySelectorAll("a[href^='https://basecamp.com']");
	}
	x.push(bk);
	for (var i = x.length - 1; i >= 0; i--) {
		try { hrefs.push(x[i][0].href);	}
		catch(err) {
			console.log(err);
		}
	}

	hrefs.push(document.getElementById("00NF000000DaF4D_ileinner").outerText);
	hrefs.push(document.getElementById("00NF000000DaF4I_ileinner").outerText);

	console.log(hrefs);
	return hrefs;
})();