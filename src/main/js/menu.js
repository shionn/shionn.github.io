"use strict";
q(function() {
	q("nav.main-menu > ul > li > a").on("click", function(e) {
		if (q(e.target).parent().find("ul").exists()) {
			e.preventDefault();
			q("nav.main-menu .open").rmClass("open");
			q(e.target).parent("li").addClass("open");
		}
	});
	q("nav.main-menu > a").on("click", function(e) {
		q("nav.main-menu").toggleClass("open");
	});
	q("body").on("click", function(e) {
		if (!q(e.target).parent("nav.main-menu").exists()) {
			q("nav.main-menu .open").rmClass("open");
			q("nav.main-menu.open").rmClass("open");
		}
	});
});
