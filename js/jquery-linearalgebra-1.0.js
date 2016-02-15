/* Depends on jquery and linearalgebra v1.3 */

/*global jQuery*/
/*global Box*/

(function ($) {
    $.fn.box = function (x1,y1,x2,y2) {
        if (typeof x1 !== "undefined") {
            /**
             * Moves and resizes element(s) to stretch from one point to another
             *  Usage: 
             *      Set all div elements' top left corner to 100px, 100px, and the bottom right corner to 400px, 400px
             *          $("div").box(100, 100, 400, 400); 
             *      Alternatively
             *          var b = new Box(100, 100, 400, 400);
             *          $("div").box(b);
             *      Or
             *          var p1 = new Point(100,100);
             *          var p2 = new Point(400,400);
             *          $("div").box(p1,p2);
            */
            var b = new Box(x1, y1, x2, y2);
            this.css({left: b.left, top: b.top, width: b.width, height: b.height});
            return this;
        } else {
            /**
             * Retreives the Box for the first matched element. 
             * Mostly for convenience, this calculates each corner Point, the width, the height, and the top, bottom, left, and right coordinates.
            */
            var p = this.offset(), w = this.width(), h = this.height();
            return new Box(p.left, p.top, p.left + w, p.top + h);
        }
    };
}(jQuery));