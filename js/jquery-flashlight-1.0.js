/* Depends on jQuery, Color v1.1, linearalgebra v1.3 */
/* global jQuery, setInterval, Color, window, Point, Box */

(function ($) {
    var $f1, $f2, $f3, $f4, $fspot, $flash, $fdiv, $fh2, shaking = 0, lastx = 0, lasty = 0;
    var fstop1 = new Color("hsla(0, 0%, 100%, 0)");
    var fstop2 = new Color("hsla(48, 15%, 46%, 0.5)");
    var fstop3 = new Color("hsla(44, 18%, 30%, 0.65)");
    var fstop4 = new Color("hsla(48, 17%, 35%, 0.6)");
    var fstop5 = new Color("hsla(51, 25%, 17%, 0.8)");
    var fstop6 = new Color("hsla(44, 44%, 5%, 0.95)");
    var currlevel = 0;
    $(function() {
        $flash = $("#flashlight"); $fh2 = $("#flashlight h2");
        
        $("body").mousemove(function(e){
            if(lastx !== 0 && lasty !== 0) {
                shaking += (Math.abs(lastx-e.pageX) + Math.abs(lasty-e.pageY))/2;
                setGlowy(e.pageX,e.pageY-$flash.offset().top);
            }
            lastx = e.pageX;
            lasty = e.pageY;
        });
        $("body").touchMove(function(x,y){
            if(lastx !== 0 && lasty !== 0) {
                shaking += (Math.abs(lastx-x) + Math.abs(lasty-y));
                setGlowy(x,y-$flash.offset().top);
            }
            lastx = x;
            lasty = y;
        });
        $("body").touchStart(function(x,y) {
            var p = new Point(x,y);
            var bls = $("#lightswitch").box();
            if(p.inside(bls)) {
                $("#flashlight").fadeOut(200);
            }
        });
        setInterval(function() {
            shaking -= 100;
            setGlowy();
        }, 100);
        $fh2.hide();
        $($fh2[0]).fadeIn(800).delay(3000).fadeOut();
        $($fh2[1]).delay(5000).fadeIn().delay(3000).fadeOut();
        $($fh2[2]).delay(10000).fadeIn();
    });
    
    function setGlowy(x,y) {
        x = typeof x === "undefined" ? lastx : x;
        y = typeof y === "undefined" ? lasty : y;
        if(shaking < 0) {
            shaking = 0;
            $flash.css("background","#000000");
        } else if (shaking < 15000) {
            var power = shaking / 15000;
            var darkenby = 100 - power*100;
            var fadeinby = 1 - power;
            $flash.css("background","radial-gradient(200px at " + 
                x + "px " + y + "px," +
                fstop1.darken(darkenby).fadein(fadeinby * 0.5) + " 10%, " +
                fstop2.darken(darkenby).fadein(fadeinby * 0.5) + " 25%, " +
                fstop3.darken(darkenby).fadein(fadeinby * 0.5) + " 40%, " +
                fstop4.darken(darkenby).fadein(fadeinby * 0.5) + " 60%, " +
                fstop5.darken(darkenby).fadein(fadeinby * 0.5) + " 65%, " +
                fstop6.darken(darkenby).fadein(fadeinby * 0.05) + " 70%)");
        } else {
            if (shaking > 16000) { shaking = 16000; }
            $flash.css("background","radial-gradient(200px at " + 
                x + "px " + y + "px," +
                fstop1 + " 10%, " +
                fstop2 + " 25%, " +
                fstop3 + " 40%, " +
                fstop4 + " 60%, " +
                fstop5 + " 65%, " +
                fstop6 + " 70%)");
        }
        if (shaking > 7000) {
            $fh2.fadeOut();
        }
    }
}(jQuery));