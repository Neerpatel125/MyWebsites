
/* REMOVED THE LINES; code moved lines to random y pos on screen when clicked
var lines = document.querySelectorAll("hr");

see the elements selected: (verification step) (optional) 

for (var i = 0; i < lines.length; i++){
	console.log(lines[i]);
}

function onClick() {
	for (var i = 0; i < lines.length; i++){
		var height = Math.random() * window.innerHeight;

		lines[i].style.position = "absolute";
		lines[i].style.top = height + "px";
		lines[i].style.right = "1px";
		lines[i].style.left = "1px";
	}
}
document.addEventListener("click", onClick);
*/ 
var b = 250;
var r = 90;
var g = 0;

function onKey(key){
	if (key.key == "d"){ 
		if (b >= 255){
			b = 255;
			return;
		}
		b = b + 5;
		document.querySelector("body").style.backgroundColor = "rgb(" + (r) + "," + g + "," + (b) + ")";
		document.querySelector("#Colors").innerHTML = "Current Color Values: red(" + r + ") " + "green(" + g +") " + "blue(" + b +")"; 
	}
	else if (key.key == "a"){ 
		if (b <= 0){
			b = 0;
			return;
		}
		b = b - 5;
		document.querySelector("body").style.backgroundColor = "rgb(" + (r) + "," + g + "," + (b) + ")";
		document.querySelector("#Colors").innerHTML = "Current Color Values: red(" + r + ") " + "green(" + g +") " + "blue(" + b +")"; 
	}

	else if (key.key == "w"){ 
		if (r >= 255){
			r = 255;
			return;
		}
		r = r + 5;
		document.querySelector("body").style.backgroundColor = "rgb(" + (r) + "," + g + "," + (b) + ")";
		document.querySelector("#Colors").innerHTML = "Current Color Values: red(" + r + ") " + "green(" + g +") " + "blue(" + b +")"; 
	}

	else if (key.key == "s"){ 
		if (r <= 0){
			r = 0;
			return;
		}
		r = r - 5;
		document.querySelector("body").style.backgroundColor = "rgb(" + (r) + "," + g + "," + (b) + ")";
		document.querySelector("#Colors").innerHTML = "Current Color Values: red(" + r + ") " + "green(" + g +") " + "blue(" + b +")"; 
	}

	else if (key.key == "e"){ 
		if (g >= 255){
			g = 255;
			return;
		}
		g = g + 5;
		document.querySelector("body").style.backgroundColor = "rgb(" + (r) + "," + g + "," + (b) + ")";
		document.querySelector("#Colors").innerHTML = "Current Color Values: red(" + r + ") " + "green(" + g +") " + "blue(" + b +")"; 
	}
	else if (key.key== "q"){
		if (g <= 0){
			g = 0;
			return;
		}
		g = g - 5;
		document.querySelector("body").style.backgroundColor = "rgb(" + (r) + "," + g + "," + (b) + ")";
		document.querySelector("#Colors").innerHTML = "Current Color Values: red(" + r + ") " + "green(" + g +") " + "blue(" + b +")"; 
	}
}

function onClick(){
	r = Math.floor(Math.random() * 200);
	g = Math.floor(Math.random() * 200);
	b = Math.floor(Math.random() * 200);
	document.querySelector("body").style.backgroundColor = "rgb(" + (r) + "," + g + "," + (b) + ")";
	document.querySelector("#Colors").innerHTML = "Current Color Values: red(" + r + ") " + "green(" + g +") " + "blue(" + b +")"; 
}


document.addEventListener("keydown", onKey);
document.addEventListener("mousedown", onClick)