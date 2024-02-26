"use strict";
q(function() {
	q("ul.tree li").addClass("closed");
	q("ul.tree a").on("click", function(event) {
		if(q(this).attr("href") === "#") {
			event.preventDefault();
			q(this).parent().toggleClass("closed");
		}
	});
});