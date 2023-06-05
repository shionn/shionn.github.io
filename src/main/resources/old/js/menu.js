"use strict";
$(function() {
	$("nav.main-menu > ul > li > a").on("click", function(e) {
		if ($(e.target).parent().find("ul").length > 0 ) {
			e.preventDefault();
			$("nav.main-menu .open").removeClass("open");
			$(e.target).closest("li").addClass("open");
		}
	});
	$("nav.main-menu > a").on("click", function(e) {
		$("nav.main-menu").toggleClass("open");
	});
	$("body").on("click", function(e) {
		if ($(e.target).parents("nav.main-menu").length == 0) {
			$("nav.main-menu .open").removeClass("open");
			$("nav.main-menu.open").removeClass("open");
		}
	});
});
