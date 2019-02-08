(() => {
	const getEl = (element) => {
		let node = document.getElementById(element).children[0];
		return (typeof node !== 'undefined') ? node.href : 'No value'
	};
	const data = {};
	try {
		// hrefs.push(document.getElementById("00NF000000Bi4WC_ileinner").children[0].href);
		// hrefs.push(document.getElementById("00NF000000ClNga_ileinner").children[0].href);
		// hrefs.push(document.getElementById("00NF000000D23c6_ileinner").children[0].href);
		// hrefs.push(document.getElementById("00NF000000D23cG_ileinner").children[0].href);
		// hrefs.push(document.getElementById("00NF000000DaF4D_ileinner").outerText);
		// hrefs.push(document.getElementById("00NF000000DaF4I_ileinner").outerText);
		data.trello = getEl("00NF000000Bi4WC_ileinner");
		data.bk = getEl("00NF000000ClNga_ileinner");
		data.live = getEl("00NF000000D23cG_ileinner");
		data.doready = getEl("00NF000000D23c6_ileinner");
		data.user = document.getElementById("00NF000000DaF4D_ileinner").outerText;
		data.password = document.getElementById("00NF000000DaF4I_ileinner").outerText;
		console.log(data);
	}
	catch (err) {
		console.log(err);
	}

	return data;
})();