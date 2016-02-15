/* global navigator, $, window */
function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}
if (isIE() && isIE() < 10) {
    window.location.href += "ie/";
}