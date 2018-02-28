(() => {
	var x = [];
	const hrefs = [];

	x.push(document.querySelectorAll("a[href^='http://do.ready-for-feedback.com']"));
	x.push(document.querySelectorAll("a[href^='https://trello.com']"));
	x.push(document.querySelectorAll("a[href^='https://3.basecamp.com']"));

	for (var i = x.length - 1; i >= 0; i--) {
		hrefs.push(x[i][0].href);	
	}
	hrefs.push(document.getElementById("00NF000000DaF4D_ileinner").outerText);
	hrefs.push(document.getElementById("00NF000000DaF4I_ileinner").outerText);

	return hrefs;
})();