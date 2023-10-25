// Java script


// Variables (Use let)
let name = "Ayeee";
console.log(name);

const cantChange = 10;

	//Types of Variables: Primitives and Reference Types 
	//Primitives: String, Number, Boolean, Undefined (default), Null (used to clear value)
	//Reference Types: Objects, Arrays, Functions

//Dynamic Language: can change the type of variable 

let flex = "String";
console.log(typeof(flex));
flex = 20;
console.log(typeof(flex));

// Object

let person = {
	name: "Neer",
	age: 30 
};
console.log(person);
	// will print the name and prop 

//Changing properties of an Object 
person["name"] = "Neer2"; 
	// OR
person.name = "Neer3";
console.log(person["name"]);

//Arrays 
let selected = []; 
selected[0] = 21;
selected[1] = "Memes";
console.log(selected.length);

//functions 
function greet(name2){
	console.log ("Hello " + name2);
}

greet("Neer"); 

function square(n){
	return n*n ;
}

console.log("Returned from function square: " + square(5)); 


