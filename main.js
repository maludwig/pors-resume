(function($){
	$.fn.ring = function (options) {
		alert(this.attr("id"));
	};
	$.fn.ringDraw = function (options) {
		alert("Drawing: " + this.attr("id") + this.val());
	};
})(jQuery);// JavaScript Document
