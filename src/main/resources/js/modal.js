"use strict";
$(function() {
	$.fn.extend({
		__modalClose : function() {
			$(this).css("display","none");
			$(this).removeClass("fade");
		},
		__modalOpen : function() {
			$(this).css("display","flex");
			$(this).addClass("fade");
		},
		modal : function() {
			$(this).off("click");
			$(this).on("click", function(e) {
				if (e.target == this) $(e.target).__modalClose();
			});
			$(this).on("click", ".close", function(e) {
				$(e.target).parents(".modal").__modalClose();
			});
			$(this).__modalOpen();
		}
	});
});