jQuery(document).ready(function ($) {
    function getInnerText($e) {
        return $e.siblings("div.expando_text:first");
    }

    function getViewModChild($e) {
        return $e.children("span.view_modifier:first");
    }

    function stopEvent($e) {
        $e.preventDefault();
        $e.stopPropagation();
    }

    function hideExpando($link) {
		var $inner = getInnerText($link);
		var $viewMod = getViewModChild($link);
        $inner.removeClass("show").addClass("hide");
        $viewMod.html($viewMod.attr("data-show"));
    }

    function showExpando($link) {
		var $inner = getInnerText($link);
		var $viewMod = getViewModChild($link);
        $inner.removeClass("hide").addClass("show");
        $viewMod.html($viewMod.attr("data-hide"));
    }

    function hideAllExpandos() {
        $allLinks.each(function () {
            hideExpando($(this));
        });
    }
    function showAllExpandos() {
        $allLinks.each(function () {
            showExpando($(this));
        });
    }
    var $allLinks = $("a.expando_link");
    $allLinks.each(function () {
        var $link = $(this);
        var $inner = getInnerText($link);
        $link.on("click", function ($e) {
            stopEvent($e);
            if ($inner.hasClass("show")) {
                hideExpando($link);
            } else if ($inner.hasClass("hide")) {
                showExpando($link);
            }
        });
    });
    $("a.showall").each(function () {
        var $i = $(this);
        $i.on("click", function (evt) {
            stopEvent(evt);
			showAllExpandos();
        });
    });
    $("a.hideall").each(function () {
        var s = $(this);
        s.on("click", function (s) {
            stopEvent(s);
			hideAllExpandos();
        });
    });
    hideAllExpandos();
});