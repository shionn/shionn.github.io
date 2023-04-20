$(function(){
	$("body").on("click", ".gallery a", function() {
		$(".gallery-preview img").attr("src",$(this).attr("href"));
		$(".gallery-preview").modal();
		return false;
	})
})