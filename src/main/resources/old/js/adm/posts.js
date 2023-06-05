$(function() {
	$("form.filter").on("change","select", function(e){
		$(e.target).parents("form.filter").submit();
	});
});