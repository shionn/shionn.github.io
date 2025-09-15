"use strict";
q(function() {
	q("header > nav > ul > li > a").on("click", function(e) {
		if (q(e.target).parent().find("ul").exists()) {
			e.preventDefault();
			q("header > nav li.open").rmClass("open");
			q(e.target).parent("li").addClass("open");
		}
	});
	q("header > nav > a").on("click", function(e) {
		q("header > nav > ul").toggleClass("open");
		e.preventDefault();
	});
	q("body").on("click", function(e) {
		if (!q(e.target).parent("header nav").exists()) {
			q("header nav .open").rmClass("open");
			q("header nav.open").rmClass("open");
		}
	});
});
