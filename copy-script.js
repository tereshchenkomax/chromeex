(() => {
	const hrefs = [];
	try {
		hrefs.push(document.getElementById("00NF000000Bi4WC_ileinner").children[0].href);
		hrefs.push(document.getElementById("00NF000000ClNga_ileinner").children[0].href);
		hrefs.push(document.getElementById("00NF000000D23c6_ileinner").children[0].href);
		hrefs.push(document.getElementById("00NF000000D23cG_ileinner").children[0].href);
		hrefs.push(document.getElementById("00NF000000DaF4D_ileinner").outerText);
		hrefs.push(document.getElementById("00NF000000DaF4I_ileinner").outerText);
	}
	catch (err) {
		console.log(err);
	}

	return hrefs;
})();