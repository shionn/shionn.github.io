'use strict';

q(function() {

	const ANCIEN = 0;
	const CYBER = 1;
	const CHAOS = 2;
	const MORT = 3;

	const SEND_ASSAULT = 0;
	const SEND_FROM_RESERVE = 1;
	const RESERVE = 2;
	const TRAHIS = 3;
	const WIN = 4;

	let _faction = function(f) {
		switch (f) {
			case ANCIEN: return "Les Anciens";
			case CYBER: return "CyberTech";
			case CHAOS: return "Le Chaos";
			case MORT: return "L'au-delà";
		}
	};

	let _assault = function() {
		this.history = new Array();
		this.reserve = [0, 0, 0, 0];
		this.assault = [0, 0, 0, 0];
	};

	let _history = function(player, type, count, description, faction, date) {
		this.player = player;
		this.type = type;
		this.count = count;
		this.description = description;
		this.date = date;
		this.faction = faction;
		this.originalFaction = player.faction;

		this.text = function() {
			switch (type) {
				case SEND_ASSAULT: return player.name + " envoie " + count + " " + description + " à l'assaut pour " + _faction(faction);
				case SEND_FROM_RESERVE: return player.name + " sort de ces réserve " + count + " " + description + " à l'assaut pour " + _faction(faction);
				case RESERVE: return player.name + " place " + count + " " + description + " en réserve pour " + _faction(faction);
				case TRAHIS: return player.name + " trahis " + _faction(this.originalFaction) + " ces " + count + " troupes partent à l'assaut !";
				case WIN: return _faction(faction) + " gagne l'assaut mené par " + player.name + " !";
			}
		}
	};

	let _player = function(name, faction) {
		this.name = name;
		this.faction = faction;
		this.galon = [0, 0, 0, 0];
		this.reserve = [0, 0, 0, 0];
		this.assault = [0, 0, 0, 0];
		this.winCount = 0;
		this.toSend = 0;

		this.countSend = function() {
			return this.assault.reduce((a, b) => a + b, 0);
		}
	};

	let _ASSAULTS = [new _assault()];
	let _PLAYERS = [];

	let _send = function(player, count, description, faction, side, date) {
		if (!_PLAYERS[player]) {
			_PLAYERS[player] = new _player(player, faction);
		}
		let a = _ASSAULTS[_ASSAULTS.length - 1];
		let p = _PLAYERS[player];
		if (p.faction !== faction) {
			a.history.push(new _history(p, TRAHIS, count, description, faction, date));
			a.assault[p.faction] += p.reserve[p.faction];
			a.reserve[p.faction] -= p.reserve[p.faction];
			p.assault[p.faction] += p.reserve[p.faction];
			p.reserve[p.faction] = 0;
			p.faction = faction;
		}
		if (side) {
			a.history.push(new _history(p, SEND_FROM_RESERVE, count, description, faction, date));
			p.reserve[faction] -= count;
			a.reserve[faction] -= count;
		} else {
			a.history.push(new _history(p, SEND_ASSAULT, count, description, faction, date));
		}
		a.assault[faction] += count;
		p.assault[faction] += count;


	};

	let _reserve = function(player, count, description, faction, date) {
		if (!_PLAYERS[player]) {
			_PLAYERS[player] = new _player(player, faction);
		}
		let a = _ASSAULTS[_ASSAULTS.length - 1];
		let p = _PLAYERS[player];
		a.history.push(new _history(p, RESERVE, count, description, faction, date));
		a.reserve[faction] += count;
		p.reserve[faction] += count;
	};

	let _winner = function(player, faction, date) {
		let a = _ASSAULTS[_ASSAULTS.length - 1];
		let p = _PLAYERS[player];
		p.winCount++;
		a.winner = p;
		a.history.push(new _history(p, WIN, 0, "", faction, date));
	};

	//	let _computeGrade = function() {
	//		Object.values(_PLAYERS).forEach(p => {
	//			if (p.assault)
	//		});
	//	}

	let _computeEndAssault = function() {
		
	}

	let _tableHeader = function(name) {
		let head = q("<thead>");
		head.append(q("<tr>").append(q("<th>").attr("colspan", "5").text(name)));
		return head;
	}

	let _tableFactionHeader = function(name) {
		let head = _tableHeader(name);
		let line = q("<tr>").append(q("<th>"));
		for (let i = 0; i < 4; i++) {
			line.append(q("<th>").text(_faction(i)));
		}
		return head.append(line);
	}

	let _previewAssault = function(root) {
		let a = _ASSAULTS[_ASSAULTS.length - 1];
		let table = q("<table>").attr("class", "assault").append(_tableHeader("Assaut en cours"));
		let body = q("<tbody>");
		a.history.forEach(h => {
			let tr = q("<tr>");
			tr.append(q("<td>").text(h.date));
			tr.append(q("<td>").attr("colspan", 4).text(h.text()));
			body.append(tr);
		});
		table.append(body);

		table.append(_tableFactionHeader("État des forces"));
		body = q("<tbody>");
		let line = q("<tr>").append(q("<td>").text("Total"));
		for (let i = 0; i < 4; i++) {
			line.append(q("<td>").text(a.assault[i]));
		}
		body.append(line);
		table.append(body);

		table.append(_tableFactionHeader("État des Réserve"));
		body = q("<tbody>");
		Object.values(_PLAYERS).forEach(p => {
			line = q("<tr>").append(q("<td>").text(p.name));
			for (let i = 0; i < 4; i++) {
				line.append(q("<td>").text(p.reserve[i]));
			}
			body.append(line);
		});
		line = q("<tr>").append(q("<td>").text("Total"));
		for (let i = 0; i < 4; i++) {
			line.append(q("<td>").text(a.reserve[i]));
		}
		body.append(line);
		table.append(body);


		q(root).append(table);
	};

	let _endAssault = function(root) {
		let a = _ASSAULTS[_ASSAULTS.length - 1];

		let table = q("<table>").attr("class", "assault").append(_tableHeader("Assaut n°" + _ASSAULTS.length));
		let body = q("<tbody>");
		a.history.forEach(h => {
			let tr = q("<tr>");
			tr.append(q("<td>").text(h.date));
			tr.append(q("<td>").attr("colspan", 4).text(h.text()));
			body.append(tr);
		});
		table.append(body);





		q(root).append(table);
	};


	_send("AAA", 5, "nains", ANCIEN, false, "05/01");
	_send("BBB", 3, "lancier", ANCIEN, false, "05/01");
	_send("CCC", 3, "élu", CHAOS, false, "06/01");
	_reserve("AAA", 10, "fusilier", ANCIEN, "08/01");
	_send("AAA", 2, "fusilier", ANCIEN, true, "09/01");
	_send("BBB", 3, "élu", CYBER, false, "12/01");

	_winner("AAA", ANCIEN, "15/01");
	//	_computeGalon();
//	_computeEndAssault();
	_endAssault("div.janvier", ANCIEN, "AAA", "15/01");

	_previewAssault("div.janvier");

});