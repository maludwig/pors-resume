/*jshint -W117 */
/* Depends on color-1.3, linearalgebra-1.3, me-2.3 and graphs-1.0 */


//Spring force (F=force, k=spring constant, d=displacement): F=kd
//Acceleration (F=force, m=mass, a=acceleration): F=ma
//Coulombs Law (F=force, k=coulombs law constant, Q=first charge, C=second charge, d=distance): F=kQC/d^2

SPRING_CONSTANT = 20;
COULOMBS_LAW_CONSTANT = 9e9;
DOT_MASS = 80;
DOT_CHARGE = Math.sqrt(1 / COULOMBS_LAW_CONSTANT) * 0.12;
DOT_RADIUS = 15;
MAX_VELOCITY = 0.01;
BACKGROUND_COLOR = new Color("white");
OUTLINE_COLOR = new Color("black");
MOUSE_CHARGE = -Math.sqrt(1 / COULOMBS_LAW_CONSTANT) * 5;

function Elastic(dot1, dot2, strength, label) {
	this.dot1 = dot1;
	this.dot2 = dot2;
	this.strength = strength;
	this.label = label;
}
Elastic.prototype.force = function () {
	var v1to2 = new Vector(this.dot1.pos, this.dot2.pos);
	var mag = v1to2.mag();

	return v1to2.mag((mag - this.strength) * SPRING_CONSTANT);
};

function Dot(id,pos,color) {
	this.id = id;
	if(pos) {
		this.pos = pos;
	} else {
		var w = 0.3;
		var h = 0.3;
		//var x = 0.3 + this.id / 10; //(Math.cos(0.6 * this.id) * (w/2.2)) + (w/2);
		//var y = 0.5; //(Math.sin(0.6 * this.id) * (h/2.2)) + (h/2);
		//var x = (Math.cos(0.6 * this.id) * (w/2.2)) + (w/2);
		//var y = (Math.sin(0.6 * this.id) * (h/2.2)) + (h/2);
		var x = Math.random();
		var y = Math.random();
		this.pos = new Point(x, y);
	}
	if(color) {
		this.color = new Color(color);
	} else {
		this.color = Color.random().darken(15);
	}
	this.connections = [];
	this.force = new Vector();
	this.velocity = new Vector();
	this.acceleration = new Vector();
}
Dot.prototype.elasticTo = function (dot, strength, label) {
	this.connections.push(new Elastic(this, dot, strength, label));
};
Dot.prototype.elasticForces = function () {
	var elastic;
	for(var i = 0; i < this.connections.length; i++) {
		elastic = this.connections[i];
		this.applyForce(elastic.force());
	}
};
Dot.prototype.electricForceFrom = function(dot) {
	var v1to2 = new Vector(this.pos, dot.pos);
	var distance = v1to2.mag();
	var magnitude = COULOMBS_LAW_CONSTANT * DOT_CHARGE * DOT_CHARGE / (distance * distance);
	this.applyForce(v1to2.mag(magnitude).mul(-1));
};
Dot.prototype.mouseForce = function() {
	var v1to2 = new Vector(this.pos, mouse_pos);
	var distance = v1to2.mag();
	var magnitude = COULOMBS_LAW_CONSTANT * DOT_CHARGE * MOUSE_CHARGE / (distance + 0.2);
	this.applyForce(v1to2.mag(magnitude).mul(-1));
	//this.applyForce(v1to2);
};
Dot.prototype.applyForce = function(force) {
	var w = ctx.canvas.clientWidth;
	var h = ctx.canvas.clientHeight;
	var v, pt1, pt2;
	if (DRAWING) {
		v = force.mul(w);
		pt1 = this.drawPos(ctx);
		pt2 = pt1.add(v);
		v = new Vector(pt1,pt2);
		draw(v);
	}
	this.force = this.force.add(force);
};
Dot.prototype.accelerate = function () {
	var mag;
	this.acceleration = this.force.div(DOT_MASS);
	//this.velocity = this.acceleration;
	this.velocity = this.velocity.add(this.acceleration).mul(0.1);
	//mag = this.velocity.mag();
	//if (mag > MAX_VELOCITY) this.velocity = this.velocity.mag(MAX_VELOCITY);
	this.pos = this.pos.add(this.velocity);
	if(this.pos.x < 0) {this.pos.x = 0; this.velocity = new Vector(); }
	if(this.pos.y < 0) {this.pos.y = 0; this.velocity = new Vector(); }
	if(this.pos.x > 1) {this.pos.x = 1; this.velocity = new Vector(); }
	if(this.pos.y > 1) {this.pos.y = 1; this.velocity = new Vector(); }
	if(isNaN(this.pos.x) || isNaN(this.pos.y)) {
		this.pos.x = 0.5 + (Math.random() * 0.1);
		this.pos.y = 0.5 + (Math.random() * 0.1);
		this.velocity = new Vector();
		this.acceleration = new Vector();
	}
	this.force = new Vector();
};
Dot.prototype.drawPos = function (ctx) {
	var w = ctx.canvas.clientWidth - DOT_RADIUS - DOT_RADIUS;
	var h = ctx.canvas.clientHeight - DOT_RADIUS - DOT_RADIUS;
	return new Point((this.pos.x * w) + DOT_RADIUS, (this.pos.y * h) + DOT_RADIUS);
};
Dot.prototype.toString = function () {
	return "D(" + this.id + "){ pos: " + this.pos.toString() + ", f: " + this.force.toString() + ", a: " + this.acceleration.toString() + ", v: " + this.velocity.toString() + " }";
};

function DotGraph(graph) {
	var nodes = graph.nodes();
	var edges = graph.edges();
	var dot;
	var dot_from;
	var dot_to;
	var i;
	var max_cost = 0;
	var strength;

	this.dots = [];

	for (i = 0; i<nodes.length; i++) {
		if (typeof nodes[i] !== "undefined") {
			dot = new Dot(i);
			this.dots[i] = dot;
		}
	}
	for (i = 0; i<edges.length; i++) {
		if (typeof edges[i] !== "undefined") {
			max_cost = Math.max(edges[i].cost, max_cost);
		}
	}
	max_cost *= 2;
	for (i = 0; i<nodes.length; i++) {
		if (typeof nodes[i] !== "undefined") {
			edges = nodes[i].edges();
			for(var x=0; x<edges.length; x++) {
				dot_from = this.dots[edges[x].node_from];
				dot_to = this.dots[edges[x].node_to];
				strength = edges[x].cost / max_cost;
				dot_from.elasticTo(dot_to, strength, edges[x].cost);
				dot_to.elasticTo(dot_from, strength, edges[x].cost);
			}
		}
	}
}
// Simulates 1 second of applied force
DotGraph.prototype.step = function() {
	var dot1, dot2, distance, force;
	for (var i=0; i<this.dots.length; i++) {
		if (typeof this.dots[i] !== "undefined") {
			dot1 = this.dots[i];
			for (var z=0; z<this.dots.length; z++) {
				if (typeof this.dots[z] !== "undefined") {
					dot2=this.dots[z];
					if (i !== z) {
						dot1.electricForceFrom(dot2);
					}
				}
			}
			dot1.elasticForces();
			dot1.mouseForce();
			dot1.accelerate();
		}
	}
};

DotGraph.prototype.draw = function(ctx) {
	var w = ctx.canvas.clientWidth;
	var h = ctx.canvas.clientHeight;
	var dot;
	var drawPos;
	ctx.font = "16px Arial";
	ctx.textAlign="center";
	ctx.textBaseline="middle";
	ctx.lineWidth=0.1;
	for (var i=0; i<this.dots.length; i++) {
		if (typeof this.dots[i] !== "undefined") {
			dot = this.dots[i];
			drawPos = dot.drawPos(ctx);
			ctx.strokeStyle = dot.color;
			ctx.fillStyle = dot.color;
			ctx.beginPath();
			ctx.arc(drawPos.x,drawPos.y,DOT_RADIUS,0,2*Math.PI);
			ctx.stroke();
			ctx.fillText(dot.id,drawPos.x,drawPos.y);
			for (var c=0; c<dot.connections.length; c++) {
				this.drawElastic(ctx, dot.connections[c]);
			}
		}
	}
};
DotGraph.prototype.drawElastic = function(ctx, elastic) {
	var w = ctx.canvas.clientWidth;
	var h = ctx.canvas.clientHeight;
	if(elastic.dot1.id < elastic.dot2.id) {
		//color = Color.random().darken(100);
		ctx.fillStyle = elastic.dot1.color;
		ctx.strokeStyle = elastic.dot1.color;
		pos1 = elastic.dot1.drawPos(ctx);
		pos2 = elastic.dot2.drawPos(ctx);
		angle = Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x);
		xAdjust = Math.cos(angle) * DOT_RADIUS;
		yAdjust = Math.sin(angle) * DOT_RADIUS;
		ctx.beginPath();
		ctx.moveTo(pos1.x + xAdjust, pos1.y + yAdjust);
		ctx.lineTo(pos2.x - xAdjust, pos2.y - yAdjust);
		ctx.stroke();

		text_offset = new Vector(-yAdjust, xAdjust);
		mid = pos1.midpoint(pos2); //.add(text_offset);
		ctx.strokeStyle = BACKGROUND_COLOR;
		ctx.fillStyle = BACKGROUND_COLOR;
		ctx.font = "bold 20px Arial";
		ctx.fillText(elastic.label, mid.x, mid.y);
		ctx.fillStyle = elastic.dot1.color;
		ctx.strokeStyle = elastic.dot1.color;
		ctx.font = "16px Arial";
		ctx.fillText(elastic.label, mid.x, mid.y);
	}
};
DotGraph.prototype.toString = function () {
	return this.dots.join("\n");
};
