'use strict';
// version 1.0

q(function() {

	q("body").on("click", "a.ajax", function(e) {
		e.preventDefault();
		const a_e = q(e.target);
		const update = a_e.attr("data-update");
		const url = a_e.attr("href");
		q.ajax(url, "POST").success(function(data) {
			update.split(',').forEach(elem => {
				q(elem).replaceWith(data.find(elem));
			});
		}).process();
	});

	q("body").on("change", "select.ajax", function(e) {
		const select_e = q(e.target);
		const update = select_e.attr("data-update");
		const url = select_e.attr("data-url");
		q.ajax(url, "POST").header(select_e.attr("name"), select_e.value()).success(function(data) {
			update.split(',').forEach(elem => {
				q(elem).replaceWith(data.find(elem));
			});
		}).process();
	});

	q("body").on("change", "input[type=checkbox].ajax", function(e) {
		const checkbox_e = q(e.target);
		const update = checkbox_e.attr("data-update");
		const url = checkbox_e.attr("data-url");
		q.ajax(url, "POST").header(checkbox_e.attr("name"), checkbox_e.value()).success(function(data) {
			update.split(',').forEach(elem => {
				q(elem).replaceWith(data.find(elem));
			});
		}).process();
	});

});

