(() => {
	console.log(values);
	try {
		const inputs = document.forms["loginform"].getElementsByTagName("input");
		inputs[0].value = values[4];
		inputs[1].value = values[5];
		document.forms["loginform"].submit();
	} catch (err) {
		console.log(err);
	}

})();