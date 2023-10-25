var canvas = document.createElement("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth; 
var cs = canvas.style;
cs.position = "absolute";
cs.top = "0px";
cs.left = "0px";
cs.backgroundColor = "black"; 

document.body.append(canvas); 
var ctx = canvas.getContext("2d"); 

window.addEventListener("resize", () =>{
	location.reload(); 
});

var colors = ["blue", "magenta", "pink", "purple", "red", "yellow"];
function randomC(colors){
	return colors[Math.floor(Math.random() * (colors.length))]; 
} 
function Line(x, y){
	this.x = canvas.width/2;
	this.y = 0 + (canvas.height/10);
	this.x1 = x;
	this.y1 = y; 
	this.rad = Math.PI; 
	this.vel = Math.PI/60; 
	this.c = randomC(colors)

	this.draw = function(){
		ctx.beginPath(); 
		ctx.strokeStyle = this.c;
		ctx.lineWidth = "100px"; 
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x1, this.y1);
		ctx.stroke(); 
	}
	this.update = function(){ 
		this.rad += this.vel; 
		this.x1 = this.x1 + Math.cos(this.rad) * 100; // oscillation in x-direction
		this.y1 = this.y1 + Math.sin(this.rad) * 100; // oscillation in y-direction 
		this.draw(); 
	}
}
var lines = [];
for (let i = 0; i< 10000; i++){
	let x = Math.random() * (2*Math.PI) * canvas.width/4; //distance
	let y = Math.random() * (2*Math.PI) * canvas.width/4; 
	let line = new Line(x, y); 
	lines.push(line); 
}

function animate(){
	window.requestAnimationFrame(animate);
	ctx.fillStyle = "rgba(0,0,0,0.5)"; 
	ctx.fillRect(0,0, canvas.width, canvas.height);
	lines.forEach((item) => {
		item.update();
	});
}

animate(); 