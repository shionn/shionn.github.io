'use strict';

q(function() {
	let _addToGuide = function(row, paint) {
		if (paint) {
			row.append(q("<td>").text(paint.id)).append(q("<td>").text(paint.name))
		} else {
			row.append(q("<td>").text(" ")).append(q("<td>").text(" "))
		}
	};

	q(".paint-guide tbody").find("tr").each(function() {
		let p = paint(this.find("td").attr("data-id"));
		if (p) {
			this.append(q("<td>").addClass("color").attr("style","background-color: "+ p.hex).text(' '));
			_addToGuide(this, p.asVJ());
			_addToGuide(this, p.asGW());
			_addToGuide(this, p.asAP());
			_addToGuide(this, p.asGSW());
		}
	});
});
