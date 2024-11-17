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
	const WIN_GRADE = 5;
	const LEADER = 6;
	const TO_SEND = 7;
	const FLEE = 8;

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
				case WIN_GRADE: return player.name + " gagne un galon pour " + _faction(faction) + " !";
				case LEADER: return player.name + " menera l'assaut pour " + _faction(faction);
				case TO_SEND: return player.name + " doit envoyer au moins " + count +" troupes ou il y aura des fuyards.";
				case FLEE: return count +" troupe.s des réserves de "+player.name + " fuie.nt.";
			}
		}
	};

	let _player = function(name, faction) {
		this.name = name;
		this.faction = faction;
		this.grade = [0, 0, 0, 0];
		this.winGrade = [false, false, false, false];
		this.reserve = [0, 0, 0, 0];
		this.assault = [0, 0, 0, 0];
		this.winCount = 0;
		this.toSend = 0;

		this.countSend = function() {
			return this.assault.reduce((a, b) => a + b, 0);
		}
		this.countReserve = function() {
			return this.reserve.reduce((a, b) => a + b, 0);
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
			a.history.push(new _history(p, TRAHIS, p.reserve[p.faction], description, faction, date));
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

		if (p.assault[faction] >= 5 + p.toSend && !p.winGrade[faction]) {
			a.history.push(new _history(p, WIN_GRADE, 0, "", faction, date));
			p.grade[faction]++;
			p.winGrade[faction] = true;
			p.toSend = 0;
		}

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
	
	let _flee = function(player, count, description, faction, date) {
		let p = _PLAYERS[player];
		let a = _ASSAULTS[_ASSAULTS.length - 1];
		a.history.push(new _history(p, FLEE, count, description, faction, date));
		a.reserve[faction] -= count;
		p.reserve[faction] -= count;
		
	}

	let _winner = function(player, faction, date) {
		let a = _ASSAULTS[_ASSAULTS.length - 1];
		let p = _PLAYERS[player];
		p.winCount++;
		a.winner = p;
		a.history.push(new _history(p, WIN, 0, "", faction, date));
	};

	let _leaders = function(ancien, cyber, chaos, mort, date) {
		_ASSAULTS.push(new _assault());

		let a = _ASSAULTS[_ASSAULTS.length - 1];
		if (ancien != null) {
			a.history.push(new _history(_PLAYERS[ancien], LEADER, 0, "", ANCIEN, date))
		}
		if (cyber != null) {
			a.history.push(new _history(_PLAYERS[cyber], LEADER, 0, "", CYBER, date))
		}
		if (chaos != null) {
			a.history.push(new _history(_PLAYERS[chaos], LEADER, 0, "", CHAOS, date))
		}
		if (mort != null) {
			a.history.push(new _history(_PLAYERS[mort], LEADER, 0, "", MORT, date))
		}
		
		Object.values(_PLAYERS).forEach(p => {
			p.toSend = Math.trunc(p.countReserve() / 5);
			if (p.toSend > 0) {
				a.history.push(new _history(p, TO_SEND, p.toSend, "", null, date))
			}
			for (let i = 0; i < 4; i++) {
				p.winGrade[i] =false;
				p.assault[i] = 0;
				a.reserve[i] += p.reserve[i];
			}
		});
	};
	
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

	let _historyTable = function(a) {
		let body = q("<tbody>");
		a.history.forEach(h => {
			let tr = q("<tr>");
			tr.append(q("<td>").text(h.date));
			tr.append(q("<td>").attr("colspan", 4).text(h.text()));
			body.append(tr);
		});
		return body;
	};

	let _assaultTable = function(a) {
		let body = q("<tbody>");
		Object.values(_PLAYERS).forEach(p => {
			let line = q("<tr>").append(q("<td>").text(p.name));
			for (let i = 0; i < 4; i++) {
				line.append(q("<td>").text(p.assault[i]));
			}
			body.append(line);
		});
		let line = q("<tr>").append(q("<td>").text("Total"));
		for (let i = 0; i < 4; i++) {
			line.append(q("<td>").text(a.assault[i]));
		}
		body.append(line);
		return body;
	};

	let _reserveTable = function(a) {
		let body = q("<tbody>");
		Object.values(_PLAYERS).forEach(p => {
			let line = q("<tr>").append(q("<td>").text(p.name));
			for (let i = 0; i < 4; i++) {
				line.append(q("<td>").text(p.reserve[i]));
			}
			body.append(line);
		});
		let line = q("<tr>").append(q("<td>").text("Total"));
		for (let i = 0; i < 4; i++) {
			line.append(q("<td>").text(a.reserve[i]));
		}
		body.append(line);
		return body;
	};

	let _rankTable = function(a) {
		let body = q("<tbody>");
		Object.values(_PLAYERS).forEach(p => {
			let line = q("<tr>").append(q("<td>").text(p.name));
			for (let i = 0; i < 4; i++) {
				line.append(q("<td>").text(p.grade[i]));
			}
			body.append(line);
		});
		return body;
	};


	let _previewAssault = function(root) {
		let a = _ASSAULTS[_ASSAULTS.length - 1];
		let table = q("<table>").attr("class", "assault");

		table.append(_tableHeader("Assaut en cours")).append(_historyTable(a));
		table.append(_tableFactionHeader("État des forces")).append(_assaultTable(a));
		table.append(_tableFactionHeader("État des Réserves")).append(_reserveTable(a));
		table.append(_tableFactionHeader("État des Galons")).append(_rankTable(a));


		q(root).append(table);
	};

	let _endAssault = function(root) {
		let a = _ASSAULTS[_ASSAULTS.length - 1];
		let table = q("<table>").attr("class", "assault")

		table.append(_tableHeader("Assaut n°" + _ASSAULTS.length)).append(_historyTable(a));
		table.append(_tableFactionHeader("Force déployée")).append(_assaultTable(a));
		table.append(_tableFactionHeader("État des Réserves")).append(_reserveTable(a));
		table.append(_tableFactionHeader("État des Galons")).append(_rankTable(a));

		q(root).append(table);
	};


	_send("AAA", 5, "nains", ANCIEN, false, "05/01");
	_send("BBB", 5, "lancier", ANCIEN, false, "05/01");
	_reserve("BBB", 10, "fusilier", ANCIEN, "08/01");
	_send("CCC", 3, "élu", CHAOS, false, "06/01");
	_reserve("AAA", 10, "fusilier", ANCIEN, "08/01");
	_send("AAA", 2, "fusilier", ANCIEN, true, "09/01");
	_send("BBB", 7, "élu", CYBER, false, "12/01");
	_flee("AAA", 1, "fusilier", ANCIEN, "15/01");

	_winner("AAA", ANCIEN, "15/01");
	_endAssault("div.janvier", ANCIEN, "AAA", "15/01");

	_leaders("AAA", "BBB", "CCC", null, "16/01");
	_previewAssault("div.janvier");


});