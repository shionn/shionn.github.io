"use strict";

q(function(){
	q("body").on("click", ".gallery a", function(event) {
		let title = q(this).find("img").attr("title");
		q(".gallery-view img").attr("src", q(this).attr("href"));
		if (title) {
			q(".gallery-view").find("h1").text(title);
		} else {
			q(".gallery-view").find("h1").text("");
		}
		q(".gallery-view").css("display","flex");
		q(".gallery-view").addClass("fade");
		event.preventDefault();
		return false;
	});

	q(".gallery-view").on("click", function() {
		q(".gallery-view").css("display","none");
		q(".gallery-view").rmClass("fade");
	});
})