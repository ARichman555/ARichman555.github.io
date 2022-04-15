var body = [];
var dt = 3;
var G = .1;
var n = 5;
var text1 = "HNUH 300 Project";
var textSun = "This is the Sun! The Sun is not a planet \nbut rather a star, which is a huge fiery ball of \ngas. The Sun is mainly composed of \nhydrogen and helium and relies on nuclear \nreactions to release energy.\n\nDiameter: 1*10⁶ km\nMass: 1.989*10³⁰ kg\nDistance from the Sun: 0 AU";
var textMercury = "This is Mercury! Mercury is the smallest \nplanet and is also the closest planet to the \nSun. Because of this, it can get really hot \n(it can get up to 878F on its surface)! One \ninteresting thing about Mercury is that \nalthough its the smallest planet, it has a \nlarge iron core relative to its size which \nmakes its density greater than some of the \nother terrestrial planets.\n\nDiameter: 4.8*10³ km\nMass: 3.285*10²³ kg\nDistance from the Sun: 0.387 AU";
var textVenus = "This is Venus! Venus is the closest in size to \nthe Earth, but that doesn't mean it would be \na good place to live. Venus' atmosphere is \ncomposed mainly of Carbon Dioxide, \nmeaning its surface temperature is \nsignificantly hotter than the Earth's, due to \nthe greenhouse effect. Along with this, due \nto the thickness of its atmosphere, it rains \nsulfuric acid!\n\nDiameter: 1.2*10⁴ km\nMass: 4.867*10²⁴ kg\nDistance from the Sun: 0.7 AU";
var textEarth = "This is Earth! This familiar blue planet is \npretty unique in our solar system. Being one \nof the few planets with active volcanism and \nan atmosphere, so we study many of these \nmechanisms to predict what might happen \non other planets. However, there are also \nmany things unique to Earth in our solar \nsystem. For instance, it is the only planet we \nknow of that has tectonic plates, which is \nwhat causes many of the features on Earth, \nincluding volcanoes, mountains, and \nearthquakes.\n\nDiameter: 1.2*10⁴ km\nMass: 5.972*10²⁴ kg\nDistance from the Sun: 1 AU";
var textMars = "This is Mars, or otherwise known as the \nRed Planet! Although its mostly known due \nto its red color, which is caused by the \nrusting of its surface, Mars has some other \nvery interesting features. For instance, it is \nhome to the largest volcano in the entire \nsolar system, Olympus Mons, which is 24km \nhigh. This is almost 3 times the height of \nMount Everest! It also has one of the largest \ncanyon systems, spreading 4000km across \nthe planet's surface.\n\nDiameter: 3.4*10³ km\nMass: 6.39*10²³ kg\nDistance from the Sun: 1.5 AU";
var textHeight = [350, 525, 450, 450, 500];
let input, button, resetButton;
let img;

function preload() {
  img = loadImage('teste.png');
}

function setup() {
	var W = windowWidth;
	var H = windowHeight;
	createCanvas(W, H);
	background(0);
	
	body[0] = new planets(W/2, H/2, 20, 1600, textSun);
	body[0].col="#ffc300";
	
	body[1] = new planets(W/2 - 330, H/2, 6, 0.005, textEarth);
	body[1].col="#709dd8";
	
	body[2] = new planets(W/2 - 220, H/2, 5, 0.002, textVenus);
	body[2].col="#e0c870";
	
	body[3] = new planets(W/2 - 100, H/2, 3, 0.0005, textMercury);
	body[3].col="#78878c";
	
	body[4] = new planets(W/2 - 475, H/2, 3, 0.0008, textMars);
	body[4].col="#c1440e";

	body[1].vy = .64;
	body[2].vy = .8;
	body[3].vy = 1.2;
	body[4].vy = 0.54;

	loadImage('teste.png', img => {
		//image(img, width/2 - 10, height/2 - 10, 25, 37);
		image(img, W/2, H/2, 1000, 1750);
	  });

	input = createInput();
	input.position(width-400, 500);
	input.style("background-color: #000000");
	input.style("color: #3cb0dc");
	input.style("border: 1px solid #3cb0dc");

	resetButton = createButton('Reset');
	resetButton.position(20, 20);
	resetButton.mousePressed(reset);
	resetButton.style("background-color: #000000");
	resetButton.style("color: #3cb0dc");
	resetButton.style("border: 1px solid #3cb0dc");

	button = createButton('Change mass');
	button.position(input.x + input.width, 500);
	button.mousePressed(changeMass);
	button.style("background-color: #000000");
	button.style("color: #3cb0dc");
	button.style("border: 1px solid #3cb0dc");
	input.hide();
	button.hide();
}

function draw(){
	background(0, 0, 0, 0);
	fill("#3cb0dc")
	strokeWeight(0);
	textSize(30);
	textStyle(ITALIC);
	text(text1, width - 400, 60);

	for(var i = 0; i < n; i++){
		body[i].display();
	}

	for(var i = 0; i < n; i++){
		body[i].fx = 0;
		body[i].fy = 0;
		for(var j = 0; j < n; j++){
			if(i != j){
				body[i].attraction(body[j]);
			}
		}
	}

	for(var i = 0; i < n; i++){
		body[i].update();
	}
}

function mouseClicked() {
	var isNotDisplayed = -1;
	if (mouseX > input.x + input.width + button.width ||  mouseX < input.x || mouseY > input.y + 20 || mouseY < input.y) {
		for (var j = 0; j < n; j++) {
			body[j].resetBox();
		}
		for (var i = 0; i < n; i++) {
			if (body[i].collision(mouseX, mouseY)) {
				body[i].displayBox();
				isNotDisplayed = i;
			}
		}
		if (isNotDisplayed == -1) {
			input.hide();
			button.hide();
		} else {
			input.position(width-400, textHeight[isNotDisplayed])
			button.position(input.x + input.width, textHeight[isNotDisplayed]);
			input.show();
			button.show();
		}
	}
}

function changeMass() {
	var mass = input.value();

	for (var i = 0; i < n; i++) {
		if (body[i].boxDisplay) {
			if (mass != '' && Number(mass) == mass)
				body[i].updateMass(input.value());
		}
	}

	input.value('');
}

function reset() {
	var W = windowWidth;
	var H = windowHeight;
	createCanvas(W, H);
	background(0);
	body[0] = new planets(W/2, H/2, 20, 1600, textSun);
	body[0].col="#ffc300";
	body[1] = new planets(W/2 - 330, H/2, 6, 0.005, textEarth);
	body[1].col="#709dd8";
	body[2] = new planets(W/2 - 220, H/2, 5, 0.002, textVenus);
	body[2].col="#e0c870";
	body[3] = new planets(W/2 - 100, H/2, 3, 0.0005, textMercury);
	body[3].col="#78878c";
	body[4] = new planets(W/2 - 495, H/2, 3, 0.0008, textMars);
	body[4].col="#c1440e";

	body[1].vy = .64;
	body[2].vy = .8;
	body[3].vy = 1.2;
	body[4].vy = 0.52;

	input.hide();
	input.value('');
	button.hide();
}