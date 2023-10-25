// Create a canvas: 
var canvas = document.createElement("canvas");
document.body.append(canvas);
// Styling the Canvas: 
canvas.style.backgroundColor = "black";
// canvas.style.borderLeft = "5px solid red"; *UGLY
// canvas.style.borderRight = "5px solid red"; *UGLY
// canvas.style.height = "100%"; *** BAD; use canvas.height
// canvas.style.width = "80%"; *** BAD; use canvas.width
canvas.height = window.innerHeight; 
canvas.width = window.innerWidth; 
canvas.style.position = "absolute";
canvas.style.left = "0px";
canvas.style.top = "0px";
canvas.style.zIndex = "0";  

//refresh the page if the window size changes (so the canvas can be the right size)
window.addEventListener("resize", (event) => { // if you reset the canvas size, it'll clear it! 
	location.reload(); // reloads the page so the canvas can adjust its size. 
});

//Show coordinates on Canvas when mouse moves: 
var ch = document.createElement("h1"); 
var chs = ch.style; 

chs.position = "absolute"; 
chs.top = "50%";
chs.right = "1%";
chs.zIndex = "1"
chs.color = "white";
chs.fontSize = "20px";
chs.textAlign = "center";
chs.userSelect = "none";
ch.innerHTML = "Cooridnates:<br>";
document.body.append(ch); 

canvas.addEventListener("mousemove", (event) =>{
	var offset = canvas.getBoundingClientRect(); 
	var cords; 
	cords = "Coordinates: <br> (" + Math.floor((event.clientX - offset.left)) + "," + (event.clientY - offset.top) + ")"; 
	ch.innerHTML = cords;
	
});



// Mess around with the canvas and make something! 

// Allows 2d drawing on Canvas. 
var c = canvas.getContext("2d");
//Styling the lines to white so they're visible. 
c.fillStyle = "white";  
c.strokeStyle = "white"; 
c.lineWidth = 1; 


/* Info on how to draw some things: visit w3schools for more info! 
//rectangle: 
c.fillStyle = "white";
c.fillRect(10, canvas.height/2, 50, 25); // (x, y, width, height)

//line: 
c.beginPath()
c.moveTo (0, 0); 
c.lineTo (canvas.width, canvas.height); // goes to the bottom right corner!
c.strokeStyle = "white"; 
c.lineWidth = 1;
c.stroke();

//Arc: 
c.beginPath();
c.arc(canvas.width/2, canvas.height/2, 30, 0, 2*Math.PI); 
c.stroke() // uses the same strokeStyle and lineWidth from above
*/

//DRAWING: 

// What state you're in: 
var erasing = false;

var dh = document.createElement("h1"); 
var dhs = dh.style; 
dhs.position = "absolute"; 
dhs.top = "25%";
dhs.right = "1%";
dhs.zIndex = "1";
dhs.color = "white";
dhs.fontSize = "20px";
dhs.textAlign = "center"; 
dhs.userSelect = "none";
dh.innerHTML = "Current Mode: <br> Drawing"  
document.body.append(dh);


// Drawing function: 
var dsize = (canvas.height * canvas.width) / 155000; // default: 0.000003
var esize = (canvas.height * canvas.width) / 100000; // defualt: 0.00001

function draw(event){
		var offset = canvas.getBoundingClientRect();
		var cords = {
			x: event.clientX - offset.left,
			y: event.clientY - offset.top 
		}
		c.fillStyle = "white";
		c.beginPath();
		c.arc(cords.x, cords.y, dsize, 0, 2*Math.PI);  //mess with the circle size (r param) to adjust drawing size. (percent of canvas size?)
		c.fill(); 
}

//erase function: 

function erase(event){
	var offset = canvas.getBoundingClientRect();
	var cords = {
		x: event.clientX - offset.left,
		y: event.clientY - offset.top 
	}
	c.fillStyle = "black";
	c.beginPath();
	c.arc(cords.x, cords.y, esize, 0, 2*Math.PI);  //mess with the circle size (r param) to adjust erasing size. (percent of canvas size?)
	c.fill(); 	
}

//Call the functions at approriate times: 
canvas.addEventListener("mousedown", (event) =>{
	if (!erasing){
		canvas.addEventListener("mousemove", draw); 
	}
	else{
		canvas.addEventListener("mousemove", erase)
	}
});

canvas.addEventListener("mousedown", (event) =>{
	if (!erasing){
		draw(event);
	}
	else{
		erase(event);
	}
}); // want it to draw a circle when clicked as well

canvas.addEventListener("mouseup", (event) =>{
	canvas.removeEventListener("mousemove", draw) ||
	canvas.removeEventListener("mousemove", erase);
});


// Handle keyboard events: 

var hidden = false; 
document.addEventListener("keypress", (event) => {
	if (event.key == "r"){ // clear canvas 
		c.clearRect(0,0,canvas.width, canvas.height); 
	}

	if (event.key == "h"){ //toggle visibility 
		if (!hidden){
			chs.visibility = "hidden"; 
			document.querySelector(".mid").style.visibility = "hidden";
			dhs.visibility = "hidden";
			hidden = true; 
		}
		else{
			chs.visibility = "visible"; 
			dhs.visibility = "visible"; 
			document.querySelector(".mid").style.visibility = "visible"; 
			hidden = false; 
		}
	}

	if (event.key == "e") { // erasing mode
		erasing = true; 
		dh.innerHTML = "Current Mode: <br> Erasing"; 
	}

	if (event.key == "d") { // drawing mode
		erasing = false;
		dh.innerHTML = "Current Mode: <br> Drawing"; 
	}
});












