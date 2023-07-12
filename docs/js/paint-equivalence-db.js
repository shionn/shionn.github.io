'use strict';


const SHIONN_SRC = {
	name : "Shionn",
	url : "https://www.vallejoacrylics.com/wp-content/uploads/2023/04/CC266-Game_Color-NewIC-Rev00_.pdf"
}

const VJ_GC_SRC = {
	name : "Vallejo",
	url : "https://www.vallejoacrylics.com/wp-content/uploads/2023/04/CC266-Game_Color-NewIC-Rev00_.pdf"
};

const VJ_GC_OLD_SRC = {
	name : "Vj Old",
	url : "https://acrylicosvallejo.com/wp-content/uploads/2021/09/CC072-Game_Color-Rev20-baja.pdf"
};

const DAKKA = {
	name : "Dakka",
	url : "https://www.dakkadakka.com/wiki/en/Paint_Range_Compatibility_Chart"
};

const GSW_SRC = {
	name : "GSW",
	url : "https://www.greenstuffworld.com/fr/content/11-tableau-d-equivalence-peintures-gsw"
};

const AP_SRC = {
	name : "AP",
	url : "https://www.thearmypainter.com/tutorials/pdf-tutorials/tutorials/colour-charts/"
}

const AK_SRC = {
	name : "AK",
	url : "https://www.ak-masters.com/app/pdf/RCEquivalenceDIG.pdf"
}

let _equivalence = function(ids, src) {
	this.ids = ids;
	this.src = src;
}

_equivalence.prototype.isMine = function() {
	return this.src === SHIONN_SRC;
}

_equivalence.prototype.paints = function() {
	return this.ids.map(id => paint(id));
}

let equivalences = new Array();

let _cEqui = function(src, ids) {
	let result = [undefined, undefined, undefined, undefined, undefined];
	ids.forEach( i => {
		let p = paint(i);
		if (p) {
			result[[VJ, GW, OLD_GW, AP, GSW].indexOf(p.brand)] = i;
		} else {
			console.log("undefined color : " + i);
		}
	});
	let equi = new _equivalence( result, src );
	equi.ids.forEach(i => {
		let p = paint(i);
		if (p) p.addEquivalence(equi);
	});
	equivalences = equivalences.concat(equi);
};


_cEqui(SHIONN_SRC, [72001, "22-57", "61-54", "WP1102", 1778]);
_cEqui(SHIONN_SRC, [72002, "21-34", "old-gw-smelly-primer"]);
_cEqui(SHIONN_SRC, [72003, "22-37", "old-gw-pallid-flesh", "WP1421", 1844]);
_cEqui(SHIONN_SRC, [72004, "22-37", "61-23", 1845]);
_cEqui(SHIONN_SRC, [72005, "22-02", "61-11", "WP1403", 1780]);
_cEqui(SHIONN_SRC, [72006, "22-02", "61-10", "WP1107", 1780]);
_cEqui(SHIONN_SRC, [72007, "22-01", "61-09", "WP1446", 1782]);
_cEqui(SHIONN_SRC, [72008, "22-04", "61-08", "WP1442", 1784]); // Fire Dragon Br
_cEqui(SHIONN_SRC, [72009, "22-03", "61-07", "WP1106", 1785]);

_cEqui(SHIONN_SRC, [72010, "22-05", "61-06", "WP1104", 1786]); // Evil Sunz Scarlet
_cEqui(SHIONN_SRC, [72011, "22-07", "61-05", "WP1105", 1787]); // Wazdakka Red
_cEqui(SHIONN_SRC, [72012, "21-04", "61-04", "WP1401"]);
_cEqui(SHIONN_SRC, [72013, "22-70", "61-29", "WP1447", 1788]);
_cEqui(SHIONN_SRC, [72014, "21-33", "61-28", "WP1463", 1839]);
_cEqui(SHIONN_SRC, [72015, "22-09", "61-27", "WP1128", 1790]);
_cEqui(SHIONN_SRC, [72016, "22-09", "61-27", "WP1128", 1847]);
_cEqui(SHIONN_SRC, [72017, "old-gw-nauseating-blue"]);
_cEqui(SHIONN_SRC, [72018, "old-gw-storm-blue"]);
_cEqui(SHIONN_SRC, [72019, "21-42", "61-30", 1791]);

_cEqui(SHIONN_SRC, [72020, "21-07", "61-32", "WP1116", 1846]);
_cEqui(SHIONN_SRC, [72021, "21-09", "61-34", "WP1114", 1793]);
_cEqui(SHIONN_SRC, [72022, "21-08", "61-33", "WP1115", 1792]);
_cEqui(SHIONN_SRC, [72023, "22-18", "61-36", "WP1452", 1794]);
_cEqui(SHIONN_SRC, [72024, "22-19", "61-37", "WP1141", 1795]); // Sotek Green
_cEqui(SHIONN_SRC, [72025, "22-22", "old-gw-vile-green", "WP1419", 3229]);
_cEqui(SHIONN_SRC, [72026, "22-21", "old-gw-jade-green", "WP1466"]);
_cEqui(SHIONN_SRC, [72027, "22-21", "61-45", "WP1466", 1796]);
_cEqui(SHIONN_SRC, [72028, "21-12", "61-38", "WP1112", 1849]);
_cEqui(SHIONN_SRC, [72029, "22-23", "61-39", "WP1111", 1798]);

_cEqui(SHIONN_SRC, [72030, "22-25", "61-42", "WP1109", 1799]);
_cEqui(SHIONN_SRC, [72031, "22-30", "61-44", "WP1410", 1800]); // Elysian Green
_cEqui(SHIONN_SRC, [72032, "22-24", "61-40", "WP1110", 1820]);
_cEqui(SHIONN_SRC, [72033, "old-gw-bilious-green", "WP1433"]);
_cEqui(SHIONN_SRC, [72034, "22-32", "61-17", "WP1125", 1823]);
_cEqui(SHIONN_SRC, [72035, "22-31", "61-43", "WP1108", 1822]);
_cEqui(SHIONN_SRC, [72036, "22-39", "61-22", "WP1459", 1825]);
_cEqui(SHIONN_SRC, [72037, "22-42", "61-16", "WP1459", 3213]);
_cEqui(SHIONN_SRC, [72038, "22-38", "68-02", "WP1126", 3212]);
_cEqui(SHIONN_SRC, [72039, "22-44", "61-15", "WP1456", 1828]);

_cEqui(SHIONN_SRC, [72040, "21-21", "61-14", "WP1431", 1829]);
_cEqui(SHIONN_SRC, [72041, "21-19", "61-21", "WP1127", 1826]);
_cEqui(SHIONN_SRC, [72042, "22-40", "old-gw-vermin-brown", "WP1122", 1830]);
_cEqui(SHIONN_SRC, [72043, "21-20", "61-13", "WP1416", 1833]);
_cEqui(SHIONN_SRC, [72044, "22-45", "61-18", 1832]);
_cEqui(SHIONN_SRC, [72045, "21-22", "61-12", "WP1124", 1831]);
_cEqui(SHIONN_SRC, [72046, "22-56", "61-36", "WP1428"]);
_cEqui(SHIONN_SRC, [72047, "22-68", "61-49", "WP1427", 1835]);
_cEqui(SHIONN_SRC, [72048, "21-32", "61-48", "WP1119", 1836]);
_cEqui(SHIONN_SRC, [72049, "22-50", "61-53", "WP1117", 1837]);

_cEqui(SHIONN_SRC, [72050, "22-49", "61-52", "WP1118", 1838]); // Dawnstone
_cEqui(SHIONN_SRC, [72051, "21-25", "61-51", "WP1101", 1779]);
_cEqui(SHIONN_SRC, [72052, "22-60", "61-55", "WP1129", 1861]);
_cEqui(SHIONN_SRC, [72053, "22-59", "61-56", "WP1130", 1860]); // Iron breaker
_cEqui(SHIONN_SRC, [72054, "21-28", "61-57", "WP1131", 1862]);
_cEqui(SHIONN_SRC, [72055, "22-62", "61-62", "WP1231", 1870]);
_cEqui(SHIONN_SRC, [72056, "22-61", "61-63", "WP1132", 1869]);
_cEqui(SHIONN_SRC, [72057, "22-63", "61-60", "WP1133", 1867]);
_cEqui(SHIONN_SRC, [72058, "22-65", "61-61"]);
_cEqui(SHIONN_SRC, [72059, "21-29", "old-gw-beaten-copper", "WP1467", 1868]);

_cEqui(SHIONN_SRC, [72060, "21-31", "61-58", "WP1468", 1866]); // WarplockBronze
_cEqui(SHIONN_SRC, [72061, "21-16", "61-82", "WP1121", 1824]);
_cEqui(SHIONN_SRC, [72062, "21-17", "61-81", "WP1123", 1834]);
_cEqui(SHIONN_SRC, [72063, "22-34", "61-83", "WP1121", 1783]);
_cEqui(SHIONN_SRC, [72064, "21-37", "WP1461", 1883]);
_cEqui(SHIONN_SRC, [72065, "61-80"]);
_cEqui(SHIONN_SRC, [72066, "21-18", "61-79", "WP1127", 1827]);
_cEqui(SHIONN_SRC, [72067, "21-14", "61-84", "WP1413", 1821]);

_cEqui(SHIONN_SRC, [72076, "21-06", "WP1444"]); // Naggaroth Night
_cEqui(SHIONN_SRC, [72095, "22-84", "61-36", "WP1432", 3228]);
_cEqui(SHIONN_SRC, [72098, "22-72", "WP1411", 3211]);

_cEqui(SHIONN_SRC, [72101, "22-33", "WP1406", 3211]);
_cEqui(SHIONN_SRC, [72107, "21-18"]);
_cEqui(SHIONN_SRC, [72109, "22-80", "WP1438", 1859]);

_cEqui(SHIONN_SRC, [72114, "22-82", "WP1445", 3236]);
_cEqui(SHIONN_SRC, [72117, "22-16", "WP1113", 3226]);
_cEqui(SHIONN_SRC, [72118, "21-07", 3225]);

_cEqui(SHIONN_SRC, [72120, "21-10", 3239]);
_cEqui(SHIONN_SRC, [72121, "22-78", "WP1435", 3237]);
_cEqui(SHIONN_SRC, [72124, "21-20", "61-13", "WP1416", 1833]);

_cEqui(SHIONN_SRC, [72140, "22-36", "68-06", "WP1434"]);
_cEqui(SHIONN_SRC, [72141, "21-03", "68-01", "WP1460"]);
_cEqui(SHIONN_SRC, [72142, "21-05", "68-05"]);
_cEqui(SHIONN_SRC, [72143, "21-08", "68-07", "WP1415"]);
_cEqui(SHIONN_SRC, [72144, "21-26", "68-11"]);
_cEqui(SHIONN_SRC, [72145, "21-15", "68-10", "WP1420", 1851]);
_cEqui(SHIONN_SRC, [72146, "22-27", "68-13", "WP1110"]);
_cEqui(SHIONN_SRC, [72147, "21-12", "68-12"]);
_cEqui(SHIONN_SRC, [72148, "21-27", "68-18", "WP1404", 1883]);
_cEqui(SHIONN_SRC, [72149, "28-09", "68-14", "WP1461", 1851]); // Death W. Forest

_cEqui(SHIONN_SRC, [72153, "22-48", "68-17", "WP1120", 1855]);
_cEqui(SHIONN_SRC, [72155, "21-44", "68-15", "WP1443"]);

//equivalence(SHIONN_SRC, ["21-09", "61-34", "WP1462"]);
_cEqui(SHIONN_SRC, ["21-11", 1886]);
_cEqui(SHIONN_SRC, ["21-24", "WP1425"]); // Mechanicus SG
_cEqui(SHIONN_SRC, ["21-39", 3220]);
_cEqui(SHIONN_SRC, ["22-06", "WP1436"]);
_cEqui(SHIONN_SRC, ["22-10", 3221]);
_cEqui(SHIONN_SRC, ["22-11", "WP1481"]);
_cEqui(SHIONN_SRC, ["22-12", "WP1457", 3238]);
_cEqui(SHIONN_SRC, ["22-20", "WP1437"]);
_cEqui(SHIONN_SRC, ["22-35", 1884]);
_cEqui(SHIONN_SRC, ["22-47", "WP1464", 1841]);
_cEqui(SHIONN_SRC, ["22-51", "WP1443", 1882]);
_cEqui(SHIONN_SRC, ["22-52", 1842]);
_cEqui(SHIONN_SRC, ["22-54", "WP1430"]);
_cEqui(SHIONN_SRC, ["22-56", "WP1454"]);
_cEqui(SHIONN_SRC, ["22-58", "WP1440", 3259]); // Pallid Wych Flesh
_cEqui(SHIONN_SRC, ["22-68", "61-49", "WP1427", 1835]); // Fenrisian Grey
_cEqui(SHIONN_SRC, ["22-69", "WP1451"]);
_cEqui(SHIONN_SRC, ["22-79", "WP1449"]);
_cEqui(SHIONN_SRC, ["22-83", "WP1450"]);
_cEqui(SHIONN_SRC, ["22-85", 3214]);
_cEqui(SHIONN_SRC, ["22-91", "WP1142"]);



_cEqui(VJ_GC_SRC, [ 72001, "22-57"]);
_cEqui(VJ_GC_SRC, [ 72004, "22-37"]);
_cEqui(VJ_GC_SRC, [ 72005, "22-02"]);
_cEqui(VJ_GC_SRC, [ 72006, "22-01"]);
_cEqui(VJ_GC_SRC, [ 72008, "22-04"]);
_cEqui(VJ_GC_SRC, [ 72009, "22-03"]);
_cEqui(VJ_GC_SRC, [ 72010, "22-05"]);
_cEqui(VJ_GC_SRC, [ 72011, "22-07"]);
_cEqui(VJ_GC_SRC, [ 72012, "21-04"]);
_cEqui(VJ_GC_SRC, [ 72013, "22-81"]);
_cEqui(VJ_GC_SRC, [ 72014, "21-33"]);
_cEqui(VJ_GC_SRC, [ 72015, "22-09"]);
_cEqui(VJ_GC_SRC, [ 72019, "21-42"]);
_cEqui(VJ_GC_SRC, [ 72021, "21-09"]);
_cEqui(VJ_GC_SRC, [ 72022, "21-08"]);
_cEqui(VJ_GC_SRC, [ 72023, "22-18"]);
_cEqui(VJ_GC_SRC, [ 72024, "22-19"]);
_cEqui(VJ_GC_SRC, [ 72025, "22-22"]);
_cEqui(VJ_GC_SRC, [ 72027, "22-21"]);
_cEqui(VJ_GC_SRC, [ 72028, "21-12"]);
_cEqui(VJ_GC_SRC, [ 72029, "22-25"]);
_cEqui(VJ_GC_SRC, [ 72031, "22-30"]);
_cEqui(VJ_GC_SRC, [ 72032, "22-24"]);
_cEqui(VJ_GC_SRC, [ 72034, "22-33"]);
_cEqui(VJ_GC_SRC, [ 72035, "22-31"]);
_cEqui(VJ_GC_SRC, [ 72036, "22-42"]);
_cEqui(VJ_GC_SRC, [ 72038, "22-38"]);
_cEqui(VJ_GC_SRC, [ 72039, "22-43"]);
_cEqui(VJ_GC_SRC, [ 72040, "21-21"]);
_cEqui(VJ_GC_SRC, [ 72042, "22-40"]);
_cEqui(VJ_GC_SRC, [ 72044, "22-45"]);
_cEqui(VJ_GC_SRC, [ 72045, "21-22"]);
_cEqui(VJ_GC_SRC, [ 72047, "22-84"]);
_cEqui(VJ_GC_SRC, [ 72048, "21-32"]);
_cEqui(VJ_GC_SRC, [ 72049, "22-49"]);
_cEqui(VJ_GC_SRC, [ 72051, "21-25"]);
_cEqui(VJ_GC_SRC, [ 72061, "21-16"]);
_cEqui(VJ_GC_SRC, [ 72062, "21-17"]);
_cEqui(VJ_GC_SRC, [ 72063, "22-34"]);
_cEqui(VJ_GC_SRC, [ 72066, "21-18"]);
_cEqui(VJ_GC_SRC, [ 72067, "21-14"]);
_cEqui(VJ_GC_SRC, [ 72076, "21-06"]);
_cEqui(VJ_GC_SRC, [ 72107, "21-18"]);
_cEqui(VJ_GC_SRC, [ 72109, "22-80"]);
_cEqui(VJ_GC_SRC, [ 72114, "22-82"]);
_cEqui(VJ_GC_SRC, [ 72117, "22-16"]);
_cEqui(VJ_GC_SRC, [ 72118, "21-07"]);
_cEqui(VJ_GC_SRC, [ 72120, "21-10"]);
_cEqui(VJ_GC_SRC, [ 72121, "22-78"]);
_cEqui(VJ_GC_SRC, [ 72124, "21-20"]);
_cEqui(VJ_GC_SRC, [ 72145, "21-15"]);
_cEqui(VJ_GC_SRC, [ 72148, "21-27"]);
_cEqui(VJ_GC_SRC, [ 72155, "21-44"]);

_cEqui(VJ_GC_OLD_SRC, [ 72001, "22-57", "61-54"]);
_cEqui(VJ_GC_OLD_SRC, [ 72002, "21-34"]);
_cEqui(VJ_GC_OLD_SRC, [ 72004, "22-37", "61-23"]);
_cEqui(VJ_GC_OLD_SRC, [ 72005, "61-11"]);
_cEqui(VJ_GC_OLD_SRC, [ 72006, "22-02", "61-10"]);
_cEqui(VJ_GC_OLD_SRC, [ 72007, "22-01", "61-09"]);
_cEqui(VJ_GC_OLD_SRC, [ 72008, "22-04", "61-08"]);
_cEqui(VJ_GC_OLD_SRC, [ 72009, "22-03", "61-07"]);
_cEqui(VJ_GC_OLD_SRC, [ 72010, "22-05", "61-06"]);
_cEqui(VJ_GC_OLD_SRC, [ 72011, "22-07", "61-05"]);
_cEqui(VJ_GC_OLD_SRC, [ 72012, "21-04"]);
_cEqui(VJ_GC_OLD_SRC, [ 72013, "61-29"]);
_cEqui(VJ_GC_OLD_SRC, [ 72014, "21-33", "61-28"]);
_cEqui(VJ_GC_OLD_SRC, [ 72015, "21-06", "68-05"]);
_cEqui(VJ_GC_OLD_SRC, [ 72016, "22-09", "61-27"]);
_cEqui(VJ_GC_OLD_SRC, [ 72019, "61-30"]);
_cEqui(VJ_GC_OLD_SRC, [ 72020, "21-07", "61-32"]);
_cEqui(VJ_GC_OLD_SRC, [ 72021, "21-09", "61-34"]);
_cEqui(VJ_GC_OLD_SRC, [ 72021, "22-17", "61-34"]);
_cEqui(VJ_GC_OLD_SRC, [ 72022, "22-15", "61-33"]);
_cEqui(VJ_GC_OLD_SRC, [ 72023, "22-18", "61-36"]);
_cEqui(VJ_GC_OLD_SRC, [ 72024, "22-19", "61-37"]);
_cEqui(VJ_GC_OLD_SRC, [ 72027, "22-21", "61-45"]);
_cEqui(VJ_GC_OLD_SRC, [ 72028, "61-38"]);
_cEqui(VJ_GC_OLD_SRC, [ 72029, "22-23", "61-39"]);
_cEqui(VJ_GC_OLD_SRC, [ 72030, "22-25", "61-42"]);
_cEqui(VJ_GC_OLD_SRC, [ 72031, "22-30", "61-44"]);
_cEqui(VJ_GC_OLD_SRC, [ 72032, "22-24", "61-40"]);
_cEqui(VJ_GC_OLD_SRC, [ 72034, "22-32", "61-17"]);
_cEqui(VJ_GC_OLD_SRC, [ 72035, "22-29", "61-43"]);
_cEqui(VJ_GC_OLD_SRC, [ 72036, "22-39", "61-22"]);
_cEqui(VJ_GC_OLD_SRC, [ 72037, "22-42", "61-16"]);
_cEqui(VJ_GC_OLD_SRC, [ 72038, "21-02", "68-02"]);
_cEqui(VJ_GC_OLD_SRC, [ 72038, "22-38"]);
_cEqui(VJ_GC_OLD_SRC, [ 72039, "22-44", "61-15"]);
_cEqui(VJ_GC_OLD_SRC, [ 72040, "21-21", "61-14"]);
_cEqui(VJ_GC_OLD_SRC, [ 72040, "22-43", "61-14"]);
_cEqui(VJ_GC_OLD_SRC, [ 72041, "21-19", "61-21"]);
_cEqui(VJ_GC_OLD_SRC, [ 72042, "22-40"]);
_cEqui(VJ_GC_OLD_SRC, [ 72043, "21-20", "61-13"]);
_cEqui(VJ_GC_OLD_SRC, [ 72044, "22-45", "61-18"]);
_cEqui(VJ_GC_OLD_SRC, [ 72045, "21-23", "61-12"]);
_cEqui(VJ_GC_OLD_SRC, [ 72045, "21-22", "61-12"]);
_cEqui(VJ_GC_OLD_SRC, [ 72046, "22-56", "61-36"]);
_cEqui(VJ_GC_OLD_SRC, [ 72047, "22-68", "61-49"]);
_cEqui(VJ_GC_OLD_SRC, [ 72048, "21-32", "61-48"]);
_cEqui(VJ_GC_OLD_SRC, [ 72049, "22-50", "61-53"]);
_cEqui(VJ_GC_OLD_SRC, [ 72050, "22-49", "61-52"]);
_cEqui(VJ_GC_OLD_SRC, [ 72051, "21-25", "61-51"]);
_cEqui(VJ_GC_OLD_SRC, [ 72052, "22-60", "61-55"]);
_cEqui(VJ_GC_OLD_SRC, [ 72053, "22-59", "61-56"]);
_cEqui(VJ_GC_OLD_SRC, [ 72054, "21-28", "61-57"]);
_cEqui(VJ_GC_OLD_SRC, [ 72055, "22-62", "61-62"]);
_cEqui(VJ_GC_OLD_SRC, [ 72056, "22-61", "61-63"]);
_cEqui(VJ_GC_OLD_SRC, [ 72057, "21-30"]);
_cEqui(VJ_GC_OLD_SRC, [ 72057, "22-63", "61-60"]);
_cEqui(VJ_GC_OLD_SRC, [ 72058, "22-65", "61-61"]);
_cEqui(VJ_GC_OLD_SRC, [ 72059, "21-29"]);
_cEqui(VJ_GC_OLD_SRC, [ 72060, "21-31", "61-58"]);
_cEqui(VJ_GC_OLD_SRC, [ 72061, "21-16", "61-82"]);
_cEqui(VJ_GC_OLD_SRC, [ 72061, "22-35", "61-82"]);
_cEqui(VJ_GC_OLD_SRC, [ 72062, "21-17", "61-81"]);
_cEqui(VJ_GC_OLD_SRC, [ 72063, "22-34", "61-83"]);
_cEqui(VJ_GC_OLD_SRC, [ 72065, "22-46", "61-80"]);
_cEqui(VJ_GC_OLD_SRC, [ 72066, "21-18", "61-79"]);
_cEqui(VJ_GC_OLD_SRC, [ 72067, "21-14", "61-84"]);
_cEqui(VJ_GC_OLD_SRC, [ 72106, "21-04", "61-04"]);
_cEqui(VJ_GC_OLD_SRC, [ 72140, "22-36", "68-06"]);
_cEqui(VJ_GC_OLD_SRC, [ 72141, "21-03", "68-01"]);
_cEqui(VJ_GC_OLD_SRC, [ 72142, "21-05"]);
_cEqui(VJ_GC_OLD_SRC, [ 72143, "21-08", "68-07"]);
_cEqui(VJ_GC_OLD_SRC, [ 72144, "21-26", "68-11"]);
_cEqui(VJ_GC_OLD_SRC, [ 72145, "21-24", "68-10"]);
_cEqui(VJ_GC_OLD_SRC, [ 72146, "22-27", "68-13"]);
_cEqui(VJ_GC_OLD_SRC, [ 72147, "21-12", "68-12"]);
_cEqui(VJ_GC_OLD_SRC, [ 72148, "21-27", "68-18"]);
_cEqui(VJ_GC_OLD_SRC, [ 72149, "21-15", "68-14"]);
_cEqui(VJ_GC_OLD_SRC, [ 72150, "69-03"]);
_cEqui(VJ_GC_OLD_SRC, [ 72151, "21-01", "68-04"]);
_cEqui(VJ_GC_OLD_SRC, [ 72153, "22-48", "68-17"]);
_cEqui(VJ_GC_OLD_SRC, [ 72154, "68-16"]);
_cEqui(VJ_GC_OLD_SRC, [ 72155, "22-55", "68-15"]);

_cEqui(GSW_SRC, [ 72001, "22-57", "61-54", 1778]);
_cEqui(GSW_SRC, [ 72051, "21-25", "61-51", 1779]);
_cEqui(GSW_SRC, [ 72005, "61-11", 1780]);
_cEqui(GSW_SRC, [ 72006, "22-02", "61-10", 1780]);
_cEqui(GSW_SRC, [ 72007, "22-01", "61-09", 1782]);
_cEqui(GSW_SRC, [ 72063, "61-83", 1783]);
_cEqui(GSW_SRC, [ 72008, "22-04", "61-08", 1784]);
_cEqui(GSW_SRC, [ 72009, "22-03", "61-07", 1785]);
_cEqui(GSW_SRC, [ 72010, "22-05", "61-06", 1786]);
_cEqui(GSW_SRC, [ 72011, "22-07", "61-05", 1787]);
_cEqui(GSW_SRC, [ 72013, "61-29", 1788]);
_cEqui(GSW_SRC, [ 72014, "21-33", "61-28", 1789]);
_cEqui(GSW_SRC, [ 72015, "22-09", "61-27", 1790]);
_cEqui(GSW_SRC, [ 72019, "61-30", 1791]);
_cEqui(GSW_SRC, [ 72022, "22-15", "61-33", 1792]);
_cEqui(GSW_SRC, [ 72021, "22-17", "61-34", 1793]);
_cEqui(GSW_SRC, [ 72023, "22-18", "61-36", 1794]);
_cEqui(GSW_SRC, [ 72024, "22-19", "61-37", 1795]);
_cEqui(GSW_SRC, [ 72027, "22-21", "61-45", 1796]);
_cEqui(GSW_SRC, [ 72028, "61-38", 1797]);
_cEqui(GSW_SRC, [ 72029, "22-23", "61-39", 1798]);
_cEqui(GSW_SRC, [ 72030, "22-25", "61-42", 1799]);
_cEqui(GSW_SRC, [ 72031, "22-30", "61-44", 1800]);
_cEqui(GSW_SRC, [ 72032, "22-24", "61-40", 1820]);
_cEqui(GSW_SRC, [ 72067, "61-84", 1821]);
_cEqui(GSW_SRC, [ 72035, "22-29", "61-43", 1822]);
_cEqui(GSW_SRC, [ 72034, "22-32", "61-17", 1823]);
_cEqui(GSW_SRC, [ 72061, "61-82", 1824]);
_cEqui(GSW_SRC, [ 72036, "22-39", "61-22", 1825]);
_cEqui(GSW_SRC, [ 72041, "21-19", "61-21", 1826]);
_cEqui(GSW_SRC, [ 72066, "61-79", 1827]);
_cEqui(GSW_SRC, [ 72039, "22-44", "61-15", 1828]);
_cEqui(GSW_SRC, [ 72040, "21-21", "61-14", 1829]);
_cEqui(GSW_SRC, [ 72042, "old-gw-vermin-brown", 1830]);
_cEqui(GSW_SRC, [ 72045, "21-23", "61-12", 1831]);
_cEqui(GSW_SRC, [ 72044, "22-45", "61-18", 1832]);
_cEqui(GSW_SRC, [ 72043, "21-20", "61-13", 1833]);
_cEqui(GSW_SRC, [ 72062, 1834]);
_cEqui(GSW_SRC, [ "22-68", "61-49", 1835]);
_cEqui(GSW_SRC, [ 72048, "21-32", "61-48", 1836]);
_cEqui(GSW_SRC, [ 72049, "22-50", "61-53", 1837]);
_cEqui(GSW_SRC, [ 72050, "22-49", "61-52", 1838]);
_cEqui(GSW_SRC, [ 72014, "21-33", "61-28", 1839]);
_cEqui(GSW_SRC, [ "22-47", 1841]);
_cEqui(GSW_SRC, [ "22-52", 1842]);
_cEqui(GSW_SRC, [ 72101, 1843]);
_cEqui(GSW_SRC, [ 72003, "old-gw-pallid-flesh", 1844]);
_cEqui(GSW_SRC, [ 72004, "22-37", "61-23", 1845]);
_cEqui(GSW_SRC, [ 72020, "61-32", 1846]);
_cEqui(GSW_SRC, [ 72016, 1847]);
_cEqui(GSW_SRC, [ "21-14", 1848]);
_cEqui(GSW_SRC, [ "21-12", 1849]);
_cEqui(GSW_SRC, [ "21-13", 1850]);
_cEqui(GSW_SRC, [ "21-15", 1851]);
_cEqui(GSW_SRC, [ "21-22", 1852]);
_cEqui(GSW_SRC, [ 72153, "21-17", 1855]);
_cEqui(GSW_SRC, [ "22-38", 1856]);
_cEqui(GSW_SRC, [ "22-34", 1857]);
_cEqui(GSW_SRC, [ "22-80", 1859]);
_cEqui(GSW_SRC, [ "22-51", 1882]);
_cEqui(GSW_SRC, [ 72148, "21-37", 1883]);
_cEqui(GSW_SRC, [ "22-35", 1884]);
_cEqui(GSW_SRC, [ "21-11", 1886]);
_cEqui(GSW_SRC, [ "21-01", 3210]);
_cEqui(GSW_SRC, [ 72098, "22-33", 3211]);
_cEqui(GSW_SRC, [ 72038, 3212]);
_cEqui(GSW_SRC, [ 72037, 3213]);
_cEqui(GSW_SRC, [ "22-85", 3214]);
_cEqui(GSW_SRC, [ "22-07", 3219]);
_cEqui(GSW_SRC, [ "21-39", 3220]);
_cEqui(GSW_SRC, [ "22-10", 3221]);
_cEqui(GSW_SRC, [ "21-07", 3225]);
_cEqui(GSW_SRC, [ "22-16", 3226]);
_cEqui(GSW_SRC, [ "22-84", 3228]);
_cEqui(GSW_SRC, [ "22-22", 3229]);
_cEqui(GSW_SRC, [ "22-24", 3230]);
_cEqui(GSW_SRC, [ "21-37", 3232]);
_cEqui(GSW_SRC, [ "22-82", 3236]);
_cEqui(GSW_SRC, [ "22-78", 3237]);
_cEqui(GSW_SRC, [ "22-12", 3238]);
_cEqui(GSW_SRC, [ "21-10", 3239]);
_cEqui(GSW_SRC, [ "22-58", 3259]);
_cEqui(GSW_SRC, [ 72053, "22-59", "61-56", 1860]);
_cEqui(GSW_SRC, [ 72052, "22-60", "61-55", 1861]);
_cEqui(GSW_SRC, [ 72054, "21-28", "61-57", 1862]);
_cEqui(GSW_SRC, [ 72060, "21-31", "61-58", 1866]);
_cEqui(GSW_SRC, [ 72057, "22-63", "61-60", 1867]);
_cEqui(GSW_SRC, [ 72059, "22-63", "old-gw-beaten-copper", 1868]);
_cEqui(GSW_SRC, [ 72056, "22-62", "61-62", 1869]);
_cEqui(GSW_SRC, [ 72055, "21-35", "61-63", 1870]);
_cEqui(GSW_SRC, [ "23-14", 1871]);

_cEqui(AP_SRC, ["WP1466", "22-21", 72026]);
_cEqui(AP_SRC, ["WP1419", "22-22", 72025]);
_cEqui(AP_SRC, ["WP1437", "22-20"]);
_cEqui(AP_SRC, ["WP1449", "22-79"]);
_cEqui(AP_SRC, ["WP1429", "21-08"]);
_cEqui(AP_SRC, ["WP1113", "22-16"]);
_cEqui(AP_SRC, ["WP1458", "22-18"]);
_cEqui(AP_SRC, ["WP1114", "22-17"]);
_cEqui(AP_SRC, ["WP1427", "22-68"]);
_cEqui(AP_SRC, ["WP1141", "21-36", 72024]);
_cEqui(AP_SRC, ["WP1116", "21-07", 72020]);
_cEqui(AP_SRC, ["WP1115", "22-15", 72022]);
_cEqui(AP_SRC, ["WP1462", "21-09", 72021]);
_cEqui(AP_SRC, ["WP1432", "22-84", 72095]);
_cEqui(AP_SRC, ["WP1452", "22-14", 72023]);
_cEqui(AP_SRC, ["WP1415", "21-07", 72020]);
_cEqui(AP_SRC, ["WP1119", "22-67", 72048]);
_cEqui(AP_SRC, ["WP1428", "22-56", 72046]);
_cEqui(AP_SRC, ["WP1101", "21-25", 72051]);
_cEqui(AP_SRC, ["WP1443", "22-51"]);
_cEqui(AP_SRC, ["WP1418", "22-49"]);
_cEqui(AP_SRC, ["WP1481", "22-11"]);
_cEqui(AP_SRC, ["WP1118", "22-49"]);
_cEqui(AP_SRC, ["WP1430", "22-54"]);
_cEqui(AP_SRC, ["WP1403", 72005]);
_cEqui(AP_SRC, ["WP1407", "22-55", 72155]);
_cEqui(AP_SRC, ["WP1431", "22-43", 72040]);
_cEqui(AP_SRC, ["WP1120", "22-48", 72153]);
_cEqui(AP_SRC, ["WP1123", "21-17", 72062]);
_cEqui(AP_SRC, ["WP1416", "21-20", 72043]);
_cEqui(AP_SRC, ["WP1124", "21-23", 72045]);
_cEqui(AP_SRC, ["WP1405", "22-44", 72039]);
_cEqui(AP_SRC, ["WP1456", "22-44", 72039]);
_cEqui(AP_SRC, ["WP1121", "21-16", 72061]);
_cEqui(AP_SRC, ["WP1438", "22-80", 72097]);
_cEqui(AP_SRC, ["WP1402", "22-80", 72097]);
_cEqui(AP_SRC, ["WP1107", "22-02", 72006]);
_cEqui(AP_SRC, ["WP1446", "22-01", 72007]);
_cEqui(AP_SRC, ["WP1426", "21-02", 72038]);
_cEqui(AP_SRC, ["WP1106", "22-03", 72009]);
_cEqui(AP_SRC, ["WP1442", "22-04", 72008]);
_cEqui(AP_SRC, ["WP1104", "22-05", 72010]);
_cEqui(AP_SRC, ["WP1105", "22-07", 72011]);
_cEqui(AP_SRC, ["WP1401", "21-04", 72012]);
_cEqui(AP_SRC, ["WP1460", "21-03", 72141]);
_cEqui(AP_SRC, ["WP1436", "22-06"]);
_cEqui(AP_SRC, ["WP1412", "21-04"]);
_cEqui(AP_SRC, ["WP1425", "21-24"]);
_cEqui(AP_SRC, ["WP1464", "22-47"]);
_cEqui(AP_SRC, ["WP1463", "21-33", 72014]);
_cEqui(AP_SRC, ["WP1444", "21-06", 72015]);
_cEqui(AP_SRC, ["WP1414", "22-48", 72153]);
_cEqui(AP_SRC, ["WP1404", "21-27", 72148]);
_cEqui(AP_SRC, ["WP1406", "22-33", 72101]);
_cEqui(AP_SRC, ["WP1454", "22-56", 72050]);
_cEqui(AP_SRC, ["WP1455", "22-58"]);
_cEqui(AP_SRC, ["WP1102", "22-57", 72001]);
_cEqui(AP_SRC, ["WP1117", "22-50", 72049]);
_cEqui(AP_SRC, ["WP1128", "22-09", 72016]);
_cEqui(AP_SRC, ["WP1451", "22-69"]);
_cEqui(AP_SRC, ["WP1447", "22-70", 72013]);
_cEqui(AP_SRC, ["WP1408", "22-81"]);
_cEqui(AP_SRC, ["WP1480", "21-18", 72066]);
_cEqui(AP_SRC, ["WP1127", "21-19", 72041]);
_cEqui(AP_SRC, ["WP1122", "22-40", 72042]);
_cEqui(AP_SRC, ["WP1459", "22-42", 72037]);
_cEqui(AP_SRC, ["WP1126", "22-38", 72038]);
_cEqui(AP_SRC, ["WP1434", "22-36", 72140]);
_cEqui(AP_SRC, ["WP1421", "22-37", 72003]);
_cEqui(AP_SRC, ["WP1411", "22-72", 72098]);
_cEqui(AP_SRC, ["WP1457", "22-12"]);
_cEqui(AP_SRC, ["WP1125", "22-32", 72034]);
_cEqui(AP_SRC, ["WP1440", "22-58"]);
_cEqui(AP_SRC, ["WP1417", "22-33", 72034]);
_cEqui(AP_SRC, ["WP1108", "22-83", 72035]);
_cEqui(AP_SRC, ["WP1461", "21-37", 72064]);
_cEqui(AP_SRC, ["WP1424", "22-55"]);
_cEqui(AP_SRC, ["WP1413", "21-14", 72067]);
_cEqui(AP_SRC, ["WP1420", "21-15", 72031]);
_cEqui(AP_SRC, ["WP1410", "22-30", 72031]);
_cEqui(AP_SRC, ["WP1465", "22-31"]);
_cEqui(AP_SRC, ["WP1450", "22-83"]);
_cEqui(AP_SRC, ["WP1109", "22-25", 72030]);
_cEqui(AP_SRC, ["WP1435", "22-78"]);
_cEqui(AP_SRC, ["WP1111", "22-23", 72029]);
_cEqui(AP_SRC, ["WP1112", "21-12", 72029]);
_cEqui(AP_SRC, ["WP1439", "22-26", 72064]);
_cEqui(AP_SRC, ["WP1110", "22-24", 72032]);
_cEqui(AP_SRC, ["WP1433", 72033]);
_cEqui(AP_SRC, ["WP1468", "21-31", 72060]);
_cEqui(AP_SRC, ["WP1131", "21-28", 72054]);
_cEqui(AP_SRC, ["WP1130", "22-59", 72053]);
_cEqui(AP_SRC, ["WP1129", "22-60", 72052]);
_cEqui(AP_SRC, ["WP1133", "22-65", 72057]);
_cEqui(AP_SRC, ["WP1467", "21-29", 72059]);
_cEqui(AP_SRC, ["WP1132", "22-61", 72056]);
_cEqui(AP_SRC, ["WP1231", "22-62", 72055]);

_cEqui(DAKKA, [ 72001, "22-57", "61-54", "WP1102"]);
_cEqui(DAKKA, [ 72002, "old-gw-smelly-primer"]);
_cEqui(DAKKA, [ 72003, "22-37", "old-gw-pallid-flesh", "WP1434"]);
_cEqui(DAKKA, [ 72004, "61-23"]);
_cEqui(DAKKA, [ 72005, "61-11"]);
_cEqui(DAKKA, [ 72006, "22-02", "61-10", "WP1107"]);
_cEqui(DAKKA, [ 72007, "61-09"]);
_cEqui(DAKKA, [ 72063, "22-34", "61-83", "WP1121"]);
_cEqui(DAKKA, [ 72152, "old-gw-macharius-solar-orange"]);
_cEqui(DAKKA, [ 72008, "22-04", "61-08", "WP1211"]);
_cEqui(DAKKA, [ 72009, "22-03", "61-07", "WP1442"]);
_cEqui(DAKKA, [ 72141, "21-03", "68-01", "WP1460"]);
_cEqui(DAKKA, [ 72010, "22-05", "61-06", "WP1104"]);
_cEqui(DAKKA, [ "22-06", "WP1436"]);
_cEqui(DAKKA, [ 72011, "22-07", "61-05", "WP1105"]);
_cEqui(DAKKA, [ 72012, "61-04"]);
_cEqui(DAKKA, [ "22-91", "WP1142"]);
_cEqui(DAKKA, [ 72013, "61-29"]);
_cEqui(DAKKA, [ 72014, "61-28"]);
_cEqui(DAKKA, [ "21-49", "WP1412"]);
_cEqui(DAKKA, [ 72015, "22-09", "61-27", "WP1128"]);
_cEqui(DAKKA, [ 72016, "old-gw-imperial-purple"]);
_cEqui(DAKKA, [ 72017, "old-gw-nauseating-blue"]);
_cEqui(DAKKA, [ 72018, "old-gw-storm-blue"]);
_cEqui(DAKKA, [ 72019, "61-30"]);
_cEqui(DAKKA, [ 72020, "21-07", "61-32", "WP1116"]);
_cEqui(DAKKA, [ 72022, "22-15", "61-33", "WP1115"]);
_cEqui(DAKKA, [ 72143, "21-08", "68-07", "WP1415"]);
_cEqui(DAKKA, [ 72021, "21-09", "61-34", "WP1114"]);
_cEqui(DAKKA, [ 72095, "22-18", "61-36", "WP1452"]);
_cEqui(DAKKA, [ 72023, "22-17", "old-gw-lightning-bolt-blue", "WP1113"]);
_cEqui(DAKKA, [ 72024, "22-19", "61-37", "WP1141"]);
_cEqui(DAKKA, [ 72025, "old-gw-vile-green"]);
_cEqui(DAKKA, [ 72026, "old-gw-jade-green"]);
_cEqui(DAKKA, [ 72027, "61-45"]);
_cEqui(DAKKA, [ 72028, "21-12", "61-38", "WP1112"]);
_cEqui(DAKKA, [ 72029, "61-39"]);
_cEqui(DAKKA, [ 72030, "22-25", "61-42", "WP1109"]);
_cEqui(DAKKA, [ 72031, "61-44"]);
_cEqui(DAKKA, [ 72032, "61-40"]);
_cEqui(DAKKA, [ 72033, "old-gw-bilious-green"]);
_cEqui(DAKKA, [ 72067, "61-84"]);
_cEqui(DAKKA, [ 72147, "68-12"]);
_cEqui(DAKKA, [ 72146, "22-27", "68-13", "WP1110"]);
_cEqui(DAKKA, [ 72149, "28-09", "68-14", "WP1461"]);
_cEqui(DAKKA, [ 72035, "22-29", "61-43", "WP1108"]);
_cEqui(DAKKA, [ 72034, "22-32", "61-17", "WP1125"]);
_cEqui(DAKKA, [ 72061, "61-82"]);
_cEqui(DAKKA, [ 72036, "61-22"]);
_cEqui(DAKKA, [ 72037, "61-16"]);
_cEqui(DAKKA, [ 72041, "21-19", "61-21", "WP1126"]);
_cEqui(DAKKA, [ 72066, "21-18", "61-79", "WP1127"]);
_cEqui(DAKKA, [ 72038, "old-gw-leprous-brown"]);
_cEqui(DAKKA, [ 72039, "61-15"]);
_cEqui(DAKKA, [ 72040, "61-14"]);
_cEqui(DAKKA, [ 72150, "69-03"]);
_cEqui(DAKKA, [ 72042, "old-gw-vermin-brown"]);
_cEqui(DAKKA, [ 72045, "61-12"]);
_cEqui(DAKKA, [ 72044, "61-18"]);
_cEqui(DAKKA, [ "21-23", "WP1124"]);
_cEqui(DAKKA, [ "22-47", "WP1464"]);
_cEqui(DAKKA, [ 72153, "68-17"]);
_cEqui(DAKKA, [ 72043, "61-13"]);
_cEqui(DAKKA, [ 72154, "old-gw-calthan-brown"]);
_cEqui(DAKKA, [ 72065, "61-80"]);
_cEqui(DAKKA, [ 72062, "21-17", "61-81", "WP1123"]);
_cEqui(DAKKA, [ 72061, "61-82"]);
_cEqui(DAKKA, [ 72046, "old-gw-ghostly-grey"]);
_cEqui(DAKKA, [ 72047, "61-49"]);
_cEqui(DAKKA, [ 72048, "21-32", "61-48", "WP1119"]);
_cEqui(DAKKA, [ 72049, "22-50", "61-53", "WP1117"]);
_cEqui(DAKKA, [ 72050, "22-49", "61-52", "WP1118"]);
_cEqui(DAKKA, [ 72144, "68-11"]);
_cEqui(DAKKA, [ 72051, "21-25", "61-51", "WP1101"]);
_cEqui(DAKKA, [ "21-44", "WP1443"]);
_cEqui(DAKKA, [ 72052, "22-60", "61-55", "WP1129"]);
_cEqui(DAKKA, [ 72053, "22-59", "61-56", "WP1130"]);
_cEqui(DAKKA, [ 72054, "21-28", "61-57", "WP1221"]);
_cEqui(DAKKA, [ "22-62", "61-62", "WP1231"]);
_cEqui(DAKKA, [ 72055, "22-61", "61-63", "WP1132"]);
_cEqui(DAKKA, [ 72057, "22-63", "61-60", "WP1133"]);
_cEqui(DAKKA, [ 72058, "61-61"]);
_cEqui(DAKKA, [ 72059, "old-gw-beaten-copper"]);
_cEqui(DAKKA, [ 72060, "61-58"]);
_cEqui(DAKKA, [ 72094, "old-gw-black-ink"]);
_cEqui(DAKKA, [ 72089, "old-gw-dark-green-ink"]);
_cEqui(DAKKA, [ 72087, "old-gw-purple-ink"]);
_cEqui(DAKKA, [ 72155, "68-15"]);
_cEqui(DAKKA, [ 72148, "21-27", "68-18", "WP1417"]);
_cEqui(DAKKA, [ 72142, "68-05"]);
_cEqui(DAKKA, [ 72151, "old-gw-iyanden-darksun"]);
_cEqui(DAKKA, [ 72140, "68-06"]);
_cEqui(DAKKA, [ 73207, "24-05", "old-gw-asurmen-blue-wash", "WP1139"]);
_cEqui(DAKKA, [ 73206, "24-03", "old-gw-baal-red-wash", "WP1138"]);
_cEqui(DAKKA, [ 73201, "24-12", "old-gw-badab-black-wash", "WP1136"]);
_cEqui(DAKKA, [ 73203, "24-11", "old-gw-devlan-mud-wash", "WP1135"]);
_cEqui(DAKKA, [ 73200, "24-09", "old-gw-gryphonne-sepia-wash", "WP1134"]);
_cEqui(DAKKA, [ "24-04", "old-gw-leviathan-purple-wash", "WP1140"]);
_cEqui(DAKKA, [ 73204, "24-10", "old-gw-ogryn-flesh-wash", "WP1143"]);
_cEqui(DAKKA, [ 73205, "24-07", "WP1137"]);
_cEqui(DAKKA, [ "24-08", "WP1471"]);
_cEqui(DAKKA, [ "22-82", "WP1445"]);
_cEqui(DAKKA, [ "29-55", "WP1108"]);
_cEqui(DAKKA, [ "22-84", "WP1428"]);

