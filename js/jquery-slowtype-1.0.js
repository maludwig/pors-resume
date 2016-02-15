/* Depends on jquery, CodeMirror, and linearalgebra v1.3 */

/*global jQuery, setTimeout, $, CodeMirror, document */


var editor;
$(function(){
    
    $.get("files/bash.txt",function(data){
        $("#admin pre").slowtype(data, 200, 8);
    });
    editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        mode: "text/html",
        theme: "ambiance"
    });
    editor.setValue("");
    cmslowtype($("html").html(),5,editor,10);
});

(function ($) {
    //Slowly "type" a string into all selected elements
    //s: The string to "type"
    //delay: The average amount of time between characters, in milliseconds
    //len: The maximum number of characters allowed in each element
    $.fn.slowtype = function (s, delay) {
        this.text(s.charAt(0));
        rdelay(s.slice(1),delay,this);
        return this;
    };
}(jQuery));

function rdelay(s, delay, $e) {
    if(s !== "") {
        var inner;
        if(s.charAt(0) === "\n") {
            while (s.charAt(0) === "\n") s = s.slice(1);
            $e.append("<br>");
        }
        $e.append(s.charAt(0));
        setTimeout(function(){
            rdelay(s.slice(1),delay,$e);
        },delay*Math.random()*2);
    }
}
function cmslowtype(s, delay, cm) {
    if(s !== "") {
        var inner = cm.getValue();
        if(inner.split("\n").length > 11) inner = "";
        cm.setValue(inner + s.charAt(0));
        $(".CodeMirror-hscrollbar, .CodeMirror-vscrollbar, .CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler").hide();
        setTimeout(function(){
            cmslowtype(s.slice(1),delay,cm);
        },delay*Math.random()*2);
    }
}