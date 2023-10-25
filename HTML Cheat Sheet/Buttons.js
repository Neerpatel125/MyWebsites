
//Button click with Debounce: 

var button = document.querySelector("#B")
var bclicked = false;
var debounce = false;
function clicked(){
	bclicked = true;
	setTimeout( () => {bclicked = false}, 100); // so the screen doesn't go black when button is clicked
	if (!debounce) {
		debounce = true;
		console.log("Clicked!");
		setTimeout(() => {debounce = false}, 4000);
	}

}
button.addEventListener("click", clicked); 

// Clicking ANYWHERE: 

// to turn it black:
function blacked(){
	document.querySelector("body").style.backgroundColor = "black";
	var texts = document.querySelectorAll("ul, ol, table, h1, h2, h3, h4, h5, h6, li, p, th, td"); 
	for (var i = 0; i < texts.length; i++){
		texts[i].style.color = "white"; 
	} 
}

// to turn it white:
function whited(){
	document.querySelector("body").style.backgroundColor = "white";
	var texts = document.querySelectorAll("ul, ol, table, h1, h2, h3, h4, h5, h6, li, p, th, td"); 
	for (var i = 0; i < texts.length; i++){
		texts[i].style.color = "black"; 
	} 
}

// to do both in one click (alternating):
var bed = false

function clickedD(){

	if (bclicked == true) {
		return;
	}

	if (bed == false) {
		bed = true;
		document.querySelector("body").style.backgroundColor = "black";
		var texts = document.querySelectorAll("label, ul, ol, table, h1, h2, h3, h4, h5, h6, li, p, th, td"); 
		for (var i = 0; i < texts.length; i++){
			texts[i].style.color = "white"; 
		} 
	}
	else {
		bed = false;
		document.querySelector("body").style.backgroundColor = "white";
		var texts = document.querySelectorAll("label, ul, ol, table, h1, h2, h3, h4, h5, h6, li, p, th, td"); 
		for (var i = 0; i < texts.length; i++){
			texts[i].style.color = "black"; 
		} 
	}
} 

document.addEventListener("click", clickedD);

