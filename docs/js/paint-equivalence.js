'use strict';

const _BUILD = false;
const _DEBUG = false;

q(function() {
	equivalences.forEach( equi => {
		let line = q("<tr>");
		equi.paints().forEach( (p) => {
			if (p) {
				line.append(q("<td>").text(p.haveId() ? p.id : '??')
					.attr("style", "font-style: "+ (p.legacy ? "italic" : "normal"))
					.attr("data-id", p.id)
//					.attr("style", "background-color: " + (p.hex?p.hex:"none"))
				);
				line.append(q("<td>").text(p.name)
					.attr("style", "font-style: "+ (p.legacy ? "italic" : "normal"))
//					.attr("data-color", p.hex?p.hex:"none")
//					.attr("style", "background-color: "+ (p.hex?p.hex:"none"))
				);
			} else {
				line.append(q("<td>")).append(q("<td>"));
			}
		});
		if (equi.isMine() && !_DEBUG) {
			q(".my.paint-db tbody").append(line);
		} else {
			let src = q("<td>").append(
				q("<a>").attr("href", equi.src.url).attr("target", "_blank").text(equi.src.name));
			if (equi.isMine()) {
				line.attr("style", "background-color: pink")
			}
			line.append(src);
			q(".sources.paint-db tbody").append(line);
		}
	});

	q("#filter").on("keyup",(e)=> {
		let val = q(e.target).value().toLowerCase();
		q(".paint-db").find("tbody tr").each(function() {
			if (!val || this.text().toLowerCase().indexOf(val) >0 ) {
				this.rmClass("hide");
			} else {
				this.addClass("hide");
			}
		});
	});

	if (_BUILD) {
		let area = q("<textarea>").attr("rows",3).attr("cols",80).attr("style", "position: sticky;top: 50px;margin: 0 auto;display: block;");
		q(".sources.paint-db").parent("article").find("section").prepend(area);

		let _addToPersonnal = function(obj) {
			if (area.value()) {
				area.value(area.value()+", "+obj);
			} else {
				area.value("_cEqui(SHIONN_SRC, ["+obj);
			}
		}

		q(".paint-db tbody").on("click", "td:nth-child(1), td:nth-child(9)", (e) => {
			_addToPersonnal(q(e.target).text());
		});

		q(".paint-db tbody").on("click", "td:nth-child(3), td:nth-child(7)", (e) => {
			_addToPersonnal("\"" + q(e.target).text()+"\"");
		});

		q(".paint-db tbody").on("click", "td:nth-child(5)", (e) => {
			_addToPersonnal("\"" + q(e.target).attr("data-id")+"\"");
		});

		area.on("focus", (e)=> {
			area.value(area.value()+"]);\n");
			e.target.select();
			document.execCommand("copy");
			area.value("");
		});
	}
});
