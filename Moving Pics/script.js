
var img = document.querySelector("#im1");

var t = 700; // top position of character
var l = 0; // left position of character

function onKey(event){
	var incriment = 50;
	// Make Animations smoother! for loop incrimenting t by 1 until incriment is reached.
	if (event.key == "w"){
		if(t == 0){
			return;
		}
		
		t -= incriment;
		img.style.top = t + "px";
		
	}

	else if (event.key == "s"){
		if(t >= window.innerHeight - 100){
			return;
		}
		t += incriment;
		img.style.top = t + "px";
	}

	else if (event.key == "d"){
		if (l >= window.innerWidth - 139){
			return;
		}
		l += incriment;
		img.style.left = l + "px";
	}

	else if (event.key == "a"){
		if(l == 0){
			return;
		}
		l -= incriment;
		img.style.left = l + "px";
	}

}

document.addEventListener("keydown", onKey);

/* Manually shoot the plasma: 
setInterval(() => {
	var img2 = document.createElement("img");
	var incriment = 20
	img2.src = "ball.jpg";
	img2.style.height = "30px";
	img2.style.position = "absolute"; 
	img2.style.top = t - 50 + "px"; 
	img2.style.left = l + 139/2  - 15 + "px";
	document.body.appendChild(img2);
	// Moves the pic to the top and deletes it: 
	var t2 = parseInt(img2.style.top);
	setInterval(() =>{
		if (t2 <= 0){
			img2.remove();
		}
		t2 -= incriment;
		img2.style.top = t2 + "px";
	}, 100)

}, 500)
*/

function onClick(){
	var img2 = document.createElement("img");
	var asteroid = document.querySelector(".asteroid")
	var incriment = 20 // for moving the character
	img2.src = "ball.jpg";
	img2.style.height = "30px";
	img2.style.position = "absolute"; 
	img2.style.top = t - 50 + "px"; 
	img2.style.left = l + 139/2  - 15 + "px";
	document.body.appendChild(img2);

	// Moves the pic to the top and deletes it: 

	var t2 = parseInt(img2.style.top);
	var plasmaUp = setInterval(() =>{
		if (t2 <= 0){
			img2.remove();
			clearInterval(plasmaUp);
		}


		t2 -= incriment;
		img2.style.top = t2 + "px";
	}, 100)

	//Check if plasma ball hit an asteroid: 

	var plasmaAsteroid = setInterval(() => {
		if (asteroid != null){
			var posyP = parseInt(img2.style.top);
			var posyA = parseInt(asteroid.style.top);
			var posxP = parseInt(img2.style.left);
			var posxA = parseInt(asteroid.style.left);
			if(posyP >= posyA - 100 && posyP <= posyA && posxP >= posxA && posxP <= posxA + 170){
				img2.remove();
				asteroid.remove();
				clearInterval(plasmaAsteroid);
			}
			else{
				setTimeout(() => {clearInterval(plasmaAsteroid)}, 10000); // stops the check if 10 seconds passed w/o hitting anything
			}
		}
		else{
			clearInterval(plasmaAsteroid); 
		}



	}, 100)
}

document.addEventListener("mousedown", onClick);


// Make the Asteroid fall down: 
var asteroid = document.querySelector(".asteroid");

var at = 0; // top position of asteroid 
var al = 0; // left position of asteroid

var fallingAsteroid = setInterval(() => {
	if (at >= window.innerHeight - 100){
		asteroid.remove(); 
		clearInterval(fallingAsteroid);
	}

	at += 1; // Incriment to which the asteroid moves down  
	asteroid.style.top = at + "px"; 
	asteroid.style.left = al + "px"; //defining this so the check for the bullet works

}, 100)
































