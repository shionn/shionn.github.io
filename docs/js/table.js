q(function() {

	let _tableSort = function(table, col) {
		function compareValues(a, b) {
			if (a === b) return 0;
			if (a === "-" || a === "" ) return 1;
			if (b === "-" || b === "" ) return -1;
			return (a<b) ? -1 : 1;
		}
		let rows = table.find("tbody tr");
		rows.obj.sort( (r1,r2) => {
			let t1 = r1.querySelectorAll("td")[col];
			let t2 = r2.querySelectorAll("td")[col];
			return compareValues(t1.textContent,t2.textContent);
		});
		table.find("tbody").append(rows);
	}

	q("table.sort").on("click", "thead tr", (e) => {
		_tableSort(q(e.target).parent("table"), q(e.target).attr("data-sort"));
	})
	setTimeout(() => _tableSort(q("table.sort"), 0), 400);

});