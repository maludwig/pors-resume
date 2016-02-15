/*
	JavaScript Color extension by Mitchell Ludwig
*/

/*
	Creates a new Color object.
	Examples:

	var c = new Color("red");
	var c = new Color("#f00");
	var c = new Color("#ff0000");
	var c = new Color("rgb(255,0,0)");
	var c = new Color("rgba(255,0,0,1)");
	var c = new Color("hsl(0, 100%, 50%)");
	var c = new Color("hsla(0, 100%, 50%, 1)");
	var c2 = new Color(c);
*/
function Color(c) {
	var result;
	if(typeof c === "string") {
		if(c.charAt(0)=="#"){
			this.hex = Color.fromShorthand(c.toLowerCase());
			this.rgba = Color.hexTorgba(this.hex);
			this.hsla = Color.rgbaTohsla(this.rgba.r,this.rgba.g,this.rgba.b,this.rgba.a);
		} else if (c.substring(0,4) == "rgb(") {
			result = /rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i.exec(c);
			this.rgba = result ? {
				r: parseInt(result[1]),
				g: parseInt(result[2]),
				b: parseInt(result[3]),
				a: 1
			} : null;
			this.hex = Color.rgbaToHex(this.rgba);
			this.hsla = Color.rgbaTohsla(this.rgba.r,this.rgba.g,this.rgba.b,this.rgba.a);
		} else if (c.substring(0,4) == "rgba") {
			result = /rgba\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d*.?\d*)\s*\)/i.exec(c);
			this.rgba = result ? {
				r: parseInt(result[1]),
				g: parseInt(result[2]),
				b: parseInt(result[3]),
				a: parseFloat(result[4])
			} : null;
			this.hex = Color.rgbaToHex(this.rgba);
			this.hsla = Color.rgbaTohsla(this.rgba.r,this.rgba.g,this.rgba.b,this.rgba.a);
		} else if (c.substring(0,4) == "hsl(") {
			result = /hsl\((\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/i.exec(c);
			this.hsla = result ? {
				h: parseInt(result[1]),
				s: parseInt(result[2]),
				l: parseInt(result[3]),
				a: 1
			} : null;
			this.rgba = Color.hslaTorgba(this.hsla.h, this.hsla.s, this.hsla.l, this.hsla.a);
			this.hex = Color.rgbaToHex(this.rgba);
		} else if (c.substring(0,4) == "hsla") {
			result = /hsla\((\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(\d*.?\d*)\s*\)/i.exec(c);
			this.hsla = result ? {
				h: parseInt(result[1]),
				s: parseInt(result[2]),
				l: parseInt(result[3]),
				a: parseFloat(result[4])
			} : null;
			this.rgba = Color.hslaTorgba(this.hsla.h, this.hsla.s, this.hsla.l, this.hsla.a);
			this.hex = Color.rgbaToHex(this.rgba);
		} else {
			var hx = Color.nameToHex(c);
			if (hx !== false) {
				this.hex = hx;
				this.rgba = Color.hexTorgba(this.hex);
				this.hsla = Color.rgbaTohsla(this.rgba.r,this.rgba.g,this.rgba.b,this.rgba.a);
			}
		}
	} else if (c instanceof Color) {
		this.hex = c.hex;
		this.rgba = {
			r: c.rgba.r,
			g: c.rgba.g,
			b: c.rgba.b,
			a: c.rgba.a
		};
		this.hsla = {
			h: c.hsla.h,
			s: c.hsla.s,
			l: c.hsla.l,
			a: c.hsla.a
		};
	}
}
//Returns the rgba string of the color
Color.prototype.toString = function() {
	return "rgba(" + this.rgba.r + ", " + this.rgba.g + ", " + this.rgba.b + ", " + this.rgba.a + ")";
};
//Returns the hsla string of the color
Color.prototype.tohslaString = function() {
	return "hsla(" + this.hsla.h + ", " + this.hsla.s + "%, " + this.hsla.l + "%, " + this.hsla.a + ")";
};
//Returns a new Color that is like the current Color, but lighter
//Input "by": A value between 0 and 100
Color.prototype.lighten = function(by) {
	return new Color("hsla(" + this.hsla.h + ", " + this.hsla.s + "%, " + Math.min(this.hsla.l + Math.round(by),100) + "%, " + this.hsla.a + ")");
};
//Returns a new Color that is like the current Color, but darker
//Input "by": A value between 0 and 100
Color.prototype.darken = function(by) {
	return new Color("hsla(" + this.hsla.h + ", " + this.hsla.s + "%, " + Math.max(this.hsla.l - Math.round(by),0) + "%, " + this.hsla.a + ")");
};
//Returns a new Color that is like the current Color, but more opaque
//Input "by": A value between 0 and 1
Color.prototype.fadein = function(by) {
	return new Color("hsla(" + this.hsla.h + ", " + this.hsla.s + "%, " + this.hsla.l + "%, " + Math.min(this.hsla.a + by,1) + ")");
};
//Returns a new Color that is like the current Color, but more transparent
//Input "by": A value between 0 and 1
Color.prototype.fadeout = function(by) {
	return new Color("hsla(" + this.hsla.h + ", " + this.hsla.s + "%, " + this.hsla.l + "%, " + Math.max(this.hsla.a - by,0) + ")");
};
//Returns a new color that is like the current Color, but with a rotated hue
//Input "angle": A value between 0 and 360
Color.prototype.spin = function(angle) {
	if(angle < 0) {
		angle += Math.ceil(-angle / 360) * 360;
	}
	return new Color("hsla(" + (this.hsla.h + angle) % 360 + ", " + this.hsla.s + "%, " + this.hsla.l + "%, " + this.hsla.a + ")");
};

/*
	Other helper functions
*/

//Serialize for transport
Color.serialize = function(c) {
	return c.toString();
};
//Deserialize after transport
Color.deserialize = function(c) {
	return new Color(c);
};
//Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
Color.fromShorthand = function(hex) {
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	return hex.replace(shorthandRegex, function(m, r, g, b) {
		return "#" + r + r + g + g + b + b;
	});
};
//Accepts a hex color string (ex. "#FF33FF"), and returns an object with the r, g, b, and a values.
Color.hexTorgba = function(hex) {
	hex = Color.fromShorthand(hex);
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16),
		a: 1
	} : null;
};
//Accepts an object with the r, g, b, and a values, and returns a hex color string (ex. "#FF33FF").
Color.rgbaToHex = function(rgba) {
	return "#" + ((1 << 24) + (rgba.r << 16) + (rgba.g << 8) + rgba.b).toString(16).slice(1);
};
//Accepts an object with the r, g, b, and a values, and returns an object with h, s, l, and a values.
Color.rgbaTohsla = function(r, g, b, a) {
	var ret = Color.rgbTohsl(r, g, b);
	ret.a = a;
	return ret;
};
//Accepts an object with h, s, l, and a values, and returns an object with the r, g, b, and a values.
Color.hslaTorgba = function(h, s, l , a) {
	var ret = Color.hslTorgb(h, s, l);
	ret.a = a;
	return ret;
};
//Accepts an object with the r, g, b values, and returns an object with h, s, l values.
Color.rgbTohsl = function(r, g, b){
	r /= 255; g /= 255; b /= 255;
	var max = Math.max(r, g, b), min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;
	if (max == min) {
		h = s = 0;
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch(max){
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
		h /= 6;
	}

	return {h:Math.round(h*360), s:Math.round(s*100), l:Math.round(l*100)};
};

//Accepts an object with h, s, l values, and returns an object with the r, g, b values.
Color.hslTorgb = function(h, s, l){
	h /= 360; s /= 100; l /= 100;
	var r, g, b;

	if(s === 0){
		r = g = b = l;
	} else {
		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = Color.hueTorgb(p, q, h + 1/3);
		g = Color.hueTorgb(p, q, h);
		b = Color.hueTorgb(p, q, h - 1/3);
	}

	return {r:Math.round(r * 255), g:Math.round(g * 255), b:Math.round(b * 255)};
};

//Helper function for Color.hslTorgb
Color.hueTorgb = function(p, q, t){
	if(t < 0) t += 1;
	if(t > 1) t -= 1;
	if(t < 1/6) return p + (q - p) * 6 * t;
	if(t < 1/2) return q;
	if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	return p;
};

//Converts an english color name (ex. "blue") to a hex color string (ex. "#0000FF")
Color.nameToHex = function(colour){
	var colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff","beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887","cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff","darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f","darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1","darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff","firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff","gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f","honeydew":"#f0fff0","hotpink":"#ff69b4","indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c","lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2","lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de","lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6","magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee","mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5","navajowhite":"#ffdead","navy":"#000080","oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6","palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1","saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4","tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0","violet":"#ee82ee","wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5","yellow":"#ffff00","yellowgreen":"#9acd32"};

	if (typeof colours[colour.toLowerCase()] != 'undefined') {
		return colours[colour.toLowerCase()];
	} else {
		return false;
	}
};

Color.random = function(alpha) {
	if(alpha) {
		return new Color("rgba(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.random() + ")");
	} else {
		return new Color("rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")");
	}
};
