(() => {
	// console.log(values);
	let bk = document.getElementById("00NF000000ClNga");
	let trello = document.getElementById("00NF000000Bi4WC");
	let dev = document.getElementById("00NF000000D23c6");
	let live = document.getElementById("00NF000000D23cG");
	let name = document.getElementById("00NF000000DaF4D");
	let pass = document.getElementById("00NF000000DaF4I");
	let checkbox = document.getElementById("00N0G00000DmoiD");
	// console.log(bk)
	trello.value = values[0];
	bk.value = values[1];
	dev.value = values[2];
	live.value = values[3]
	name.value = values[4];
	pass.value = values[5];
	checkbox.checked = true;
})();