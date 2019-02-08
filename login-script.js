(() => {
	console.log(values);
	try {
		const inputs = document.forms["loginform"].getElementsByTagName("input");
		inputs[0].value = values.user;
		inputs[1].value = values.password;
		document.forms["loginform"].submit();
	} catch (err) {
		console.log(err);
	}
})();