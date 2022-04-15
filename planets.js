function planets(x, y, d, m, infoText){
	this.m=m;
	this.px=x;
	this.py=y;
	this.d=d;
	this.vx=0;
	this.vy=0;
	this.fx=0;
	this.fy=0;
	this.infoText = infoText;
	this.col="#ff6a6a";
	this.boxDisplay = false;

	this.attraction=function(other){
		var distance=dist(other.px, other.py, this.px, this.py);
		var f = 0;

		if(dist != 0){
			f = (G * this.m * other.m) / (distance * distance);
		}

		var angle = atan2(other.py - this.py,other.px - this.px);
		this.fx += f * cos(angle);
		this.fy += f * sin(angle);
	};
	
	this.update = function(){
		this.vx += (this.fx / this.m) * dt;
		this.vy += (this.fy / this.m) * dt;

		this.px += (this.vx * dt);
		this.py += (this.vy * dt);

		if (this.boxDisplay) {
			this.displayBox();
		}
	};

	this.display = function(){
		strokeWeight(2);
		stroke(this.col);
		fill(this.col);
		ellipse(this.px, this.py, this.d, this.d);
	};

	this.collision = function(mouseX, mouseY) {
		if (Math.sqrt(Math.pow((mouseX - this.px), 2) + Math.pow((mouseY - this.py), 2)) < (this.d + 50)) {
			return true;
		}

		return false;
	}

	this.displayBox = function() {
		this.boxDisplay = true;
		fill("#3cb0dc")
		strokeWeight(0);
		textSize(20);
		textStyle(ITALIC);
		text(this.infoText, width - 400, 100);
	}

	this.resetBox = function() {
		this.boxDisplay = false;
	}

	this.updateMass = function(mass) {
		this.m = mass;
	}
}