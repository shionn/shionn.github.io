'use strict';

const _BUILD = false;
const _DEBUG = false;

q(function() {
	equivalences.forEach( equi => {
		let line = q("<tr>");
		equi.ids.forEach( (id, index) => {
			if (id) {
				let p = paint(id);
				if (p.brand === OLD_GW) {
					line.append(q("<td>").text(p.name));
				} else {
					line.append(q("<td>").text(id)
						.attr("style", "font-style: "+ (p.legacy ? "italic" : "normal"))
//						.attr("style", "background-color: " + (p.hex?p.hex:"none"))
					);
					line.append(q("<td>").text(p.name)
						.attr("style", "font-style: "+ (p.legacy ? "italic" : "normal"))
//						.attr("data-color", p.hex?p.hex:"none")
//						.attr("style", "background-color: "+ (p.hex?p.hex:"none"))
					);
				}
			} else {
				if (index != 2) {
					line.append(q("<td>"));
				}
				line.append(q("<td>"));
			}
		});
		if (_DEBUG || equi.src.indexOf(SHIONN_SRC) < 0) {
			let src = q("<td>");
			equi.src.forEach(s => {
				src.append(q("<a>").attr("href", s.url).attr("target", "_blank").text(s.name));
			})
			line.append(src);
			q("#equivalence tbody").append(line);
		} else {
			q("#merge tbody").append(line);
		}
	});

	q("#filter").on("keyup",(e)=> {
		let val = q(e.target).value().toLowerCase();
		q("#equivalence,#merge").find("tbody tr").each(function() {
			if (!val || this.text().toLowerCase().indexOf(val) >0 ) {
				this.rmClass("hide");
			} else {
				this.addClass("hide");
			}
		});
	});

	if (_BUILD) {
		let area = q("<textarea>").attr("rows",3).attr("cols",80).attr("style", "position: sticky;top: 50px;margin: 0 auto;display: block;");
		q("#equivalence").parent("article").find("section").prepend(area);

		let _addToPersonnal = function(obj) {
			console.log(obj);
			if (area.value()) {
				area.value(area.value()+", "+obj);
			} else {
				area.value("equivalence(SHIONN_SRC, ["+obj);
			}
		}

		q("#equivalence tbody,#merge tbody").on("click", "td:nth-child(1), td:nth-child(8)", (e) => {
			_addToPersonnal(q(e.target).text());
		});

		q("#equivalence tbody,#merge tbody").on("click", "td:nth-child(3), td:nth-child(6)", (e) => {
			_addToPersonnal("\"" + q(e.target).text()+"\"");
		});

		q("#equivalence tbody,#merge tbody").on("click", "td:nth-child(5)", (e) => {
			_addToPersonnal("\"old-gw-" + q(e.target).text().toLowerCase().replaceAll(" ", "-")+"\"");
		});

		area.on("focus", (e)=> {
			area.value(area.value()+"]);\n");
			e.target.select();
			document.execCommand("copy");
			area.value("");
		});
	}
});
