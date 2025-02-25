
q(function(){
//	const url = "http://localhost:8080/BlogDynamicApi/comment"
	const url = "https://blog-dynamic.shionn.org/comment"
	const page = window.location.toString().replace(q("base").attr("href"),"");
	q.ajax(url,"GET").header("page", page).success(function(comments) {
		comments.forEach(comment => {
			let author = q("<h3>").text("Par "+comment.author+" le "+comment.date);
			let content = q("<div>").text(comment.content);
			q("div.comments").append(author).append(content);
		});
	}).process();
	
	q("form.comments").on("submit", function(e) {
		e.preventDefault();
		q.ajax(url,"POST").header("author", this[0].value).header("page",page).success(function(){
			window.location.reload();
		}).process(this[1].value);
		return false;
	})
});