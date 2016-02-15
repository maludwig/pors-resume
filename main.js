//Requires linearalgebra-1.5
/*jshint -W117 */

(function($){
	$.fn.ring = function (opt) {
		return this.each(function (i) {
			var $this = $(this);
			var options = {
				rainbow: false,
				color: new Color('#fa0000'),
				animated: true,
				duration: 2000
			};
			$.extend(options, opt);
			options.color = new Color(options.color);
			$this.data("options",options);
			$this.addClass("ring");
			if (options.animated) {
				$this.data("fill-step",1);
				var interval = setInterval(function() {
					var fill_step = $this.data("fill-step");
					$this.ringDraw(fill_step);
					$this.data("fill-step", fill_step + 1);
					if ($this.data("fill") <= fill_step) {
						clearInterval($this.data("interval"));
					}
				}, options.duration / 24);
				$this.data("interval",interval);
			} else {
				$this.ringDraw($this.data("fill"));
			}
		});
	};
	$.fn.ringDraw = function (fill) {
		var canvas = this[0];
		var ctx = canvas.getContext('2d');
		var midpoint = new Point(canvas.width/2, canvas.height/2);
		var pointer = new Point(canvas.width/2 + canvas.width/40, canvas.height/10);
		var left_tail = new Point(canvas.width/2 - canvas.width/40, canvas.height/10 - canvas.height/20);
		var right_tail = new Point(canvas.width/2 - canvas.width/40, canvas.height/10 + canvas.height/20);
		var i;
		var options = this.data("options");
		var color = options.color;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.lineCap = 'round';
		ctx.lineWidth = canvas.width / 60;
		ctx.strokeStyle = color;

		for (i=0;i<fill;i++) {
			ctx.beginPath();
			ctx.moveTo(left_tail.x, left_tail.y);
			ctx.lineTo(pointer.x, pointer.y);
			ctx.moveTo(pointer.x, pointer.y);
			ctx.lineTo(right_tail.x, right_tail.y);
			ctx.stroke();

			pointer = pointer.rotate(Math.PI/12,midpoint);
			left_tail = left_tail.rotate(Math.PI/12,midpoint);
			right_tail = right_tail.rotate(Math.PI/12,midpoint);
			if (options.rainbow) color = color.spin(15);
			ctx.strokeStyle = color;
		}
		ctx.strokeStyle = '#ffffff';
		for (;i<24;i++) {
			ctx.beginPath();
			ctx.moveTo(left_tail.x, left_tail.y);
			ctx.lineTo(pointer.x, pointer.y);
			ctx.moveTo(pointer.x, pointer.y);
			ctx.lineTo(right_tail.x, right_tail.y);
			ctx.stroke();

			pointer = pointer.rotate(Math.PI/12,midpoint);
			left_tail = left_tail.rotate(Math.PI/12,midpoint);
			right_tail = right_tail.rotate(Math.PI/12,midpoint);
		}

	};
})(jQuery);// JavaScript Document
