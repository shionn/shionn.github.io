'use strict';
// version 1

q(function() {

	q("body").on("click", "a.ajax", function(e) {
		e.preventDefault();
		const t = q(e.target);
		const update = t.attr("data-update");
		const url = t.attr("href");
		q.ajax(url, "POST").success(function(data) {
			update.split(',').forEach(elem => {
				q(elem).replaceWith(data.find(elem));
			});
		}).process();
	});

	q("body").on("change", "select.ajax", function(e) {
		const t = q(e.target);
		const update = t.attr("data-update");
		const url = t.attr("data-url");
		q.ajax(url, "POST").header(t.attr("name"), t.value()).success(function(data) {
			update.split(',').forEach(elem => {
				q(elem).replaceWith(data.find(elem));
			});
		}).process();
	});

	q("body").on("change", "input[type=checkbox].ajax", function(e) {
		const t = q(e.target);
		const update = t.attr("data-update");
		const url = t.attr("data-url");
		q.ajax(url, "POST").header(t.attr("name"), t.value()).success(function(data) {
			update.split(',').forEach(elem => {
				q(elem).replaceWith(data.find(elem));
			});
		}).process();
	});

});

