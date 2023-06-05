"use strict";

q(function(){
	q("body").on("click", ".gallery a", function(event) {
		q(".gallery-view img").attr("src",q(this).attr("href"));
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