var canvas = document.createElement("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth; 
var chs = canvas.style; 
chs.position = "absolute";
chs.top = "0px";
chs.left = "0px"; 
chs.backgroundColor = "black"; 

document.body.append(canvas); 

window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight; 
});

var ctx = canvas.getContext("2d");  

/* ROTATING AND TRANSLATING: 
ctx.beginPath() // start path
ctx.translate(500,500); // move the origin of canvas to center of shape
ctx.rotate(Math.PI/6); // rotate canvas 
ctx.translate(-500,-500); // move canvas origin back
ctx.fillRect(500,500,200,200); //draw shape
ctx.rotate(-Math.PI/6); // rotate canvas back to original orientation

ctx.beginPath(); 
ctx.fillRect(200,200,50,50); // now it's at normal orientation again!
ctx.closePath(); 
*/

var scoreH = document.createElement("h1"); 
var ss = scoreH.style; 
ss.position = "absolute";
ss.top = canvas.height * .005 + "px";
ss.left = canvas.width/2 + "px";
ss.color = "white"; 
ss.fontFamily = "Serif";
ss.fontSize = "25px"; 
var score = 0;
scoreH.innerHTML = "Score: " + score; 
document.body.append(scoreH); 

 
function Obst(w, s, dx, c){
	this.x = canvas.width;
	this.y = canvas.height;
	this.w = w;
	this.h = Math.random() * ( (canvas.height*.9) - (canvas.height*.1) ) + (canvas.height*.1);

	this.space = s;
	this.hh = canvas.height - this.h - this.space;
	this.c = c;

	this.dx = dx; 
	this.scoreGiven = false

	this.draw = function(){
		ctx.fillStyle = this.c; 
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.w, -this.h); //bottom rect
		ctx.fill(); 
		ctx.beginPath();
		ctx.rect(this.x, 0, this.w, this.hh); //top rect 
		ctx.fill(); 
	}
	this.scoreGiver = function(){
		if(char.x - char.r >= this.x + this.w && char.y + char.r <= this.y - this.h && char.y - char.r >= this.hh){ 
			if 	(!this.scoreGiven){ 
				score += 1;
				scoreH.innerHTML = "Score: " + score;
				this.scoreGiven = true;
			}
		}
	}
	this.check = function(){
		let center = {
			x: char.x, 
			y: char.y
		}
		for (let i = 0; i < Math.PI*2; i += Math.PI/12){
			let x = center.x + char.r * Math.cos(i); 
			let y = center.y + char.r * Math.sin(i); 
			if(x >= this.x && x <= this.x + this.w){ 
				if (y >= this.y - this.h || y <= this.hh){
					window.cancelAnimationFrame(req);
					alert("Your Score: " + score + "\nReload the page to play again");
					break;   
				}
			}
		}
	}	
	this.update = function(){ 
		this.x += this.dx;  
		this.draw();	
		this.check();
		this.scoreGiver();
	}	
}

function Sprite(x, y, r, c){
	this.x = x;
	this.y = y; 
	this.r = r;
	this.c = c; 
	this.velocity = 5;  

	this.draw = function() {
		ctx.beginPath();
		ctx.fillStyle = this.c;
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2); 
		ctx.fill(); 
	}
	this.move = function(){
		if (kp["w"] || kp["ArrowUp"]){
			if (char.y > char.r){
				char.y -= this.velocity; 
			} 
		}
		if (kp["s"] || kp["ArrowDown"]){
			if(char.y < canvas.height - char.r){
				char.y += this.velocity; 
			}
		}
		if (kp["a"] || kp["ArrowLeft"]){
			if(char.x > char.r){
				char.x -= this.velocity; 
			}
		}
		if (kp["d"] || kp["ArrowRight"]){
			if(char.x < canvas.width - char.r){
				char.x += this.velocity; 
			}
		} 
	}
	this.update = function(){
		this.move(); 
		this.draw(); 
	}
}

var colors = ["blue", "deepPink", "Cyan", "magenta", "blueViolet", "fuchisa", "red", "tomato", "gold", "mediumSpringGreen"]; 
function randomC(colors){
	return colors[Math.floor(Math.random() * (colors.length))]; 
}

var char = new Sprite(25, canvas.height/2, 25, "white"); 

var kp = {};
document.addEventListener("keydown", (e) =>{
	kp[e.key] = true; 
});
document.addEventListener("keyup", (e) =>{
	kp[e.key] = false;
});

var obstacles = [];

function create(s, vel){
	let space = s;
	let dx = vel;
	let w = canvas.width *.05;
	let c = randomC(colors); 
	let ob = new Obst(w, space, dx, c);
	obstacles.push(ob);
}

var nextLevelText = document.createElement("h1");
var ns = nextLevelText.style;
ns.position = "absolute";
ns.top = canvas.height/2 - canvas.height/5 + "px";
ns.left = canvas.width/2 - canvas.height/5 + "px"; 
ns.color = randomC(colors); 
ns.fontSize = "100px";
ns.fontFamily = "Serif"; 
ns.visibility = "hidden"; 
var level = 0; 
nextLevelText.innerHTML = "Level " + level;
document.body.append(nextLevelText); 

var t1 = undefined;
var t2 = undefined; 
var t3 = undefined; 
var t4 = undefined; 
function speedChanger(score){
	if (t1 == undefined){
		if (score <= 1){
			level += 1;
			nextLevelText.innerHTML = "Level " + level; 
			ns.visibility = "visible"; 
			setTimeout(() => {
				ns.visibility = "hidden"; 
			}, 2000); 
			t1 = setInterval(() => { 
				create(150, -3);
			}, 3000); 
		}
	} 
	if (t2 == undefined){ // copy and paste this, add a new t var, and just change the name
		if (score >= 10){
			clearInterval(t1);
			obstacles.splice(0, obstacles.length);
			level += 1;
			nextLevelText.innerHTML = "Level " + level; 
			ns.visibility = "visible"; 
			setTimeout(() => {
				ns.visibility = "hidden"; 
			}, 1500); 
			t2 = setInterval(() => {
				create(150, -5)
			}, 2000);  
			char.velocity = 7;  
		}
	}
	if (t3 == undefined){ // copy and paste this, add a new t var, and just change the name
		if (score >= 20){
			clearInterval(t2);
			obstacles.splice(0, obstacles.length);
			level += 1;
			nextLevelText.innerHTML = "Level " + level; 
			ns.visibility = "visible"; 
			setTimeout(() => {
				ns.visibility = "hidden"; 
			}, 1000); 
			t3 = setInterval(() => {
				create(150, -7)
			}, 1500);  
			char.velocity = 8;  
		}
	}
	if (t4 == undefined){ // copy and paste this, add a new t var, and just change the name
		if (score >= 30){
			clearInterval(t3);
			obstacles.splice(0, obstacles.length);
			level += 1;
			nextLevelText.innerHTML = "Free Mode"; 
			ns.visibility = "visible"; 
			setTimeout(() => {
				ns.visibility = "hidden"; 
			}, 1000); 
			t4 = setInterval(() => {
				create(130, -9)
			}, 1500);  
			char.velocity = 10;  
		}
	}
	
}

var req;
function animate(){
	req = window.requestAnimationFrame(animate); 
	ctx.clearRect(0,0, canvas.width, canvas.height); 
	char.update();
	obstacles.forEach( (item) => {
		item.update(); 
		if (item.x <= -item.w){
			obstacles.splice(item,1); 
		}
	});
	speedChanger(score); 
}

animate(); 


/*TO DO:
	- Make more levels (easy). 
	- No, I'm done. 
*/














