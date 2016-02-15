
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
Color.prototype.toString = function() {
	return "rgba(" + this.rgba.r + ", " + this.rgba.g + ", " + this.rgba.b + ", " + this.rgba.a + ")";
};
Color.prototype.tohslaString = function() {
	return "hsla(" + this.hsla.h + ", " + this.hsla.s + "%, " + this.hsla.l + "%, " + this.hsla.a + ")";
};
Color.prototype.lighten = function(by) {
	return new Color("hsla(" + this.hsla.h + ", " + this.hsla.s + "%, " + Math.min(this.hsla.l + Math.round(by),100) + "%, " + this.hsla.a + ")");
};
Color.prototype.darken = function(by) {
	return new Color("hsla(" + this.hsla.h + ", " + this.hsla.s + "%, " + Math.max(this.hsla.l - Math.round(by),0) + "%, " + this.hsla.a + ")");
};
Color.prototype.fadein = function(by) {
	return new Color("hsla(" + this.hsla.h + ", " + this.hsla.s + "%, " + this.hsla.l + "%, " + Math.min(this.hsla.a + by,1) + ")");
};
Color.prototype.fadeout = function(by) {
	return new Color("hsla(" + this.hsla.h + ", " + this.hsla.s + "%, " + this.hsla.l + "%, " + Math.max(this.hsla.a - by,0) + ")");
};

Color.serialize = function(c) {
	return c.toString();
};

Color.deserialize = function(c) {
	return new Color(c);
};
Color.fromShorthand = function(hex) {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	return hex.replace(shorthandRegex, function(m, r, g, b) {
		return "#" + r + r + g + g + b + b;
	});

};
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
Color.rgbaToHex = function(rgba) {
	return "#" + ((1 << 24) + (rgba.r << 16) + (rgba.g << 8) + rgba.b).toString(16).slice(1);
};
Color.rgbaTohsla = function(r, g, b, a) {
    var ret = Color.rgbTohsl(r, g, b);
    ret.a = a;
    return ret;
};
Color.hslaTorgba = function(h, s, l , a) {
    var ret = Color.hslTorgb(h, s, l);
    ret.a = a;
    return ret;
};
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

Color.hueTorgb = function(p, q, t){
    if(t < 0) t += 1;
    if(t > 1) t -= 1;
    if(t < 1/6) return p + (q - p) * 6 * t;
    if(t < 1/2) return q;
    if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
};