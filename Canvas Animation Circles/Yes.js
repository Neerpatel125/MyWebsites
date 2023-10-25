// Create Canvas

let canvas = document.createElement("canvas");
canvas.height = window.innerHeight; 
canvas.width = window.innerWidth; 
let cs = canvas.style;
cs.backgroundColor = "black";
cs.position = "absolute"; 
cs.top = "0px"; 
cs.left = "0px"; 
cs.zIndex = "0"; 

document.body.append(canvas);

let ctx = canvas.getContext("2d");

//reload page when window size changed: 
window.addEventListener("resize", () => {
	location.reload(); 
});

//mouse cords: 	

function mouseCords(event){ 
	let mpos = {
		x: event.clientX, 
		y: event.clientY
	} 
	return(mpos); 
}

let mouseH = document.createElement("h1"); 
let mhs = mouseH.style; 
mhs.position = "absolute";
mhs.top = window.innerHeight * 2 + "px"; 
mhs.color = "white";
mhs.fontSize = "15px"; 
document.body.append(mouseH)
mouseH.innerHTML = "()";

document.addEventListener("mousemove", (event) => { 
	let holder = mouseCords(event); 
	if (holder.y - 10 <= 0){
		mhs.top = holder.y + 10 + "px";
	}
	else{
		mhs.top = holder.y - 25 + "px";
	}

	if (holder.x + 70 >= window.innerWidth){
		mhs.left = holder.x - 70 + "px";
	}
	else{
	 	mhs.left = holder.x + 10 + "px";
	 }
	mouseH.innerHTML = "(" + holder.x + "," + holder.y + ")"; 
	
	
}); 

//Now Mess around: 


function Circle(x, y, r){
	this.x = x; 
	this.y = y; 
	this.r = r;
	// *Math.random() * (max - min) + min
	let c = Math.floor(Math.random() * (6 - 1) + 1);  
	switch(c){
		case 1:
			c = "red";
			break;
		case 2:
			c = "white";
			break;
		case 3:
			c = "yellow";
			break;
		case 4:
			c = "green"; 
			break;
		case 5: 
			c = "blue";
			break;
		case 6: 
			c = "purple";
			break;
		default: 
			break;
	}

	this.dx = Math.random() * (10 - 3) + 3;
	this.dx *= Math.floor(Math.random() * 2) >= 1 ? 1 : -1;
	this.dy = Math.random() * (10 - 3) + 3;
	this.dy *= Math.floor(Math.random() * 2) >= 1 ? 1 : -1;

	this.draw = function(){
		ctx.beginPath();  
		ctx.fillStyle = c;
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fill();
	}	

	this.animate = function(){
		this.x += this.dx;
		this.y += this.dy; 
	}
}

let balls = []; // holds all of the circles made

//generates random circles: 
for (let i = 0; i <= 15; i++){
	let r = Math.floor(Math.random() * (50 - 20) + 20); 
	let x = Math.floor(Math.random() * (canvas.width - r*2) + r ); 
	let y = Math.floor(Math.random() * (canvas.height - r*2) + r);  
	balls.push(new Circle(x,y,r));  
}

//Draws the circles, changes their positons using animate(), and checks if they hit the edge. This is the function called repeatedly.
function animation(){
	ctx.clearRect(0,0,canvas.width, canvas.height); 
	balls.forEach((item) => {
		if (item.x + item.r > canvas.width || item.x - item.r < 0){
			item.dx = -item.dx;
		}
		if (item.y + item.r >  canvas.height || item.y - item.r < 0){
			item.dy = -item.dy;
		}
		item.animate();
		item.draw();
	});
	window.requestAnimationFrame(animation); 
}

animation();

//Adds new circles when clicked anywhere on the canvas.
canvas.addEventListener("click", (event) =>{
	let pos = {
		x: event.clientX,
		y: event.clientY
	}
	let r = Math.floor(Math.random() * (30 - 15) + 15); 
	let circle = new Circle(pos.x, pos.y, r); 
	balls.push(circle); 
});


/*
 Notes: 
 	- Using "this" and "new"
 		- "new" creates a new object from a constructor function 
 		- "this" refers to the object that is calling the function (DEPENDS ON WHERE IT'S USED!) in this case. 
 			- Used "this" in Circle constructor function so that the new object's paramaters could be checked in animation() and in general. 
 			
	- Use let for variables that you don't want to be global (so the majority!) 
		- Why?:  Because console.log(x); returns something when everything was var, meaning some random variable in one of the functions could have
			been manipulated unintentionally. 
		- IN SHORT: easier to keep track of variables. 

	- the function called from window.requestAnimationFrame(function) is the only function that'll be called repeatedly (so the check for the balls 
		going off the screen is in there and NOT the Circle() constructor function).

*/ 






























































