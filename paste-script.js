(() => {
	
	console.log(values);
	var bk = document.getElementById("00NF000000ClNga");
	var trello = document.getElementById("00NF000000Bi4WC");
	var dev = document.getElementById("00NF000000D23c6");
	var name = document.getElementById("00NF000000DaF4D");
	var pass = document.getElementById("00NF000000DaF4I");
	var checkbox = document.getElementById("00N0G00000DmoiD");

	bk.value = values[0];
	trello.value = values[1];
	dev.value = values[2];
	name.value = values[3];
	pass.value = values[4];
	checkbox.checked = true;
})();