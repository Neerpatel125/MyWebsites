
var canvas = document.createElement("canvas")
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight; 
let cs = canvas.style; 
cs.backgroundColor = "rgb(0,0,0)"; 
cs.position = "absolute"; 
cs.top = "0px";
cs.left = "0px";
cs.zIndex = "0"; 
document.body.append(canvas); 

var ctx = canvas.getContext("2d"); 

var pos = {
	x: canvas.width/2, 
	y: canvas.height/2
}
canvas.addEventListener("mousemove", (e) =>{
	pos.x = e.clientX;
	pos.y = e.clientY;
});

function Dot(x,y,r, c){
	this.x = x;
	this.y = y;
	this.r = r; 
	this.c = c

	this.rad = Math.random() * (Math.PI*2 + 0) - 0;
	this.vel = .065;
	this.dist = Math.random() * (120 - 50) + 55;

	this.lmp = { //the last mouse position (to create the same drag effect) 
		x: x, // where it starts
		y: y  // where it starts
	}

	/*Sphere effect: comment out to remove, also change dist.x and dist.y to dist
	this.dist = {
		x: Math.random() * (120 - 50) + 50,
		y: Math.random() * (120 -50) + 50
	} 
	*/ //Sphere effect: end

	this.draw = function(lp){
		ctx.beginPath();
		ctx.strokeStyle = this.c; 
		ctx.lineWidth = this.r; 
		ctx.moveTo(lp.x, lp.y); 
		ctx.lineTo(this.x, this.y)
		ctx.stroke();
		ctx.closePath(); 
	}

	this.update = function (){
		// drag effect: difference of current mouse pos and previous mouse pos
		this.lmp.x += (pos.x - this.lmp.x) * .045; // trails (last number = speed)
		this.lmp.y += (pos.y - this.lmp.y) * .045; // trails (last number = speed)

		//new Var to hold the last position (for drawing it)
		const lp = {
			x: this.x,
			y: this.y
		}

		//incirment the x and y position using cos/sin for oscillating motion in x and y directions (aka circular motion) this.vel is the rate
		this.rad += this.vel
		this.x = this.lmp.x + Math.cos(this.rad) * this.dist; // the math.cos ranges from 0 -> 1, multiplying by big number = more movement. 
		this.y = this.lmp.y + Math.sin(this.rad) * this.dist; 
		this.draw(lp);	
	}
}

let dots = [];

var colors = ["#00bdff", "#4d39ce", "#088eff"]; 
var colors2 = ["white", "blue", "purple", "red", "yellow"];
function randomC(colors){
	return colors[Math.floor(Math.random() * (colors.length))]; 
}

//Making the dots: 
let numberOfDots = 80; // default 50
for (let i = 0; i < numberOfDots; i++){
	let x = canvas.width/2; 
	let y = canvas.height/2;
	let size = 7 // defualt 2
	let r = Math.random()*(size -1) + 1; 
	let c = randomC(colors);
	let ok = new Dot(x, y, r, c);
	dots.push(ok);
}

var filler = "rgba(255, 255, 255, .05)"; 
function animate(){
	window.requestAnimationFrame(animate);
	ctx.beginPath();
	ctx.fillStyle = filler; // last number = oppacity 
	ctx.fillRect(0,0,canvas.width, canvas.height);
	dots.forEach((item) =>{
		item.update(); 
	});
}

animate()

//Press "S" for a cool new effect! 
function newEf(){ 
	dots.forEach((item) =>{
		item.x = pos.x;
		item.y = pos.y; 
	});
}

var enabled1 = false;
function change(event){  
	if (event.key == "s"){ 
		if (!enabled1){
			enabled1 = !enabled1
			canvas.addEventListener("mousemove", newEf);
		}
		else{
			enabled1 = !enabled1; 
			canvas.removeEventListener("mousemove", newEf)
		}
	}
}

document.addEventListener("keypress", change);

//click to change colors
var clicked = false

function changeColors(){
	if (clicked){
		dots.forEach((item) =>{
			item.c = randomC(colors2); 
			filler = "rgba(0,0,0, .05)"; 
		});
	}
	else{
		dots.forEach((item) =>{
			item.c = randomC(colors); 
			filler = "rgba(255, 255, 255, .05)"; 
		});
	}
}
document.addEventListener("click", () =>{
	clicked = !clicked;
	changeColors(); 
});






























