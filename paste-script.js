(() => {
	console.log(values);
	let bk = document.getElementById("00NF000000ClNga");
	let trello = document.getElementById("00NF000000Bi4WC");
	let doready = document.getElementById("00NF000000D23c6");
	let live = document.getElementById("00NF000000D23cG");
	let user = document.getElementById("00NF000000DaF4D");
	let password = document.getElementById("00NF000000DaF4I");
	// console.log(bk)
	trello.value = values.trello;
	bk.value = values.bk;
	doready.value = values.doready;
	live.value = values.live;
	user.value = values.user;
	password.value = values.password;
})();
