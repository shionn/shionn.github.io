'use strict';

q(function() {

	const _SMALL = 1;
	const _MEDIUM = 2;
	const _BIG = 5;
	const _GRADES = ["Mousse", "Pirate de pacotille", "Flibustiers", "Cannoniers", "Loups de mers", "Ecumeurs des mers", "Quartier maître", "Pirate émérite", "Terreur des mers", "Quartier maître en chef", "Second du capitaine", "Capitaine", "Amiral"];

	const _PAINT = 1;
	const _LVL_UP = 2;
	const _END_QUEST = 3;

	let _progressBar = function(current, target) {
		let pct = current * 100 / target;
		return q("<span>").addClass("progress")
			.append(q("<span>").css("width", pct + "%"))
			.append(q("<span>").text(current + "/" + target));
	}

	let _player = function(name, avatar) {
		this.name = name;
		this.avatar = avatar;
		this.lvl = 1;
		this.xp = 0;
		this.figurines = 0;

		this.gainXp = function(count, xpFactor) {
			this.figurines += count;
			this.xp += count * xpFactor;
			if (this.xp >= this.lvl * 10) {
				this.xp -= this.lvl * 10;
				this.lvl++;
				return true;
			}
			return false;
		}

		this.grade = function() {
			return _GRADES[this.lvl - 1];
		}


		this.avatarPath = function() {
			return "pictures/defis/tortuga-2025/" + this.avatar;
		}
	};

	let _history = function(type, date, player, count, desc, xpFactor) {
		this.type = type;
		this.date = date;
		this.player = player;
		this.count = count;
		this.desc = desc;
		this.xpFactor = xpFactor;

		this.description = function() {
			switch (type) {
				case _PAINT: return "peint " + count + " " + desc + " (+" + (count * xpFactor) + " xp)";
				case _LVL_UP: return "passe " + player.grade();
				case _END_QUEST: return "fini la quete";
			}
		}
	};

	let _quest = function(id, name, objectif, size) {
		this.id = id;
		this.name = name;
		this.objectif = objectif;
		this.size = size;
		this.current = 0;

		this.history = [];

		this.render = function() {
			let table = q("<table>").addClass("quest");
			let head = q("<thead>");
			head.append(q("<tr>").append(q("<th>").attr("colspan", "3").text(this.name + " : " + this.objectif)));
			table.append(head);

			let body = q("<tbody>");
			body.append(q("<tr>").append(q("<td>").attr("colspan", "3").append(_progressBar(this.current, this.size))));
			table.append(body);

			head = q("<thead>");
			head.append(q("<tr>").append(q("<th>").attr("colspan", "3").text("Historique")));
			table.append(head);

			body = q("<tbody>");
			this.history.forEach(h => {
				let line = q("<tr>")
					.append(q("<td>").text(h.date))
					.append(q("<td>").text(h.player.name))
					.append(q("<td>").text(h.description()));
				body.append(line)
			});

			q("#" + this.id).append(table.append(body));
			return this;
		}

		this.progress = function(date, player, count, desc, xp_factor) {
			this.history.push(new _history(_PAINT, date, player, count, desc, xp_factor));
			if (player.gainXp(count, xp_factor)) {
				this.history.push(new _history(_LVL_UP, date, player));
			};
			this.current = this.current + count, this.size;
			if (this.current >= this.size) {
				this.current = this.size;
				this.history.push(new _history(_END_QUEST, date, player));
			}
			return this;
		};

	};

	let _renderPlayers = function(players) {
		let table = q("<table>").addClass("players").addClass("boxed");
		table.append(q("<thead>").append(q("<tr>").append(q("<th>").attr("colspan", "3").text("Participants"))));

		let body = q("<tbody>");
		players.forEach(player => {
			body.append(q("<tr>")
					.append(q("<td>").attr("rowspan", 4).append(q("<img>").attr("src", player.avatarPath())))
					.append(q("<td>").addClass("subtitle").text("Joueur"))
					.append(q("<td>").text(player.name)));
			body.append(q("<tr>")
					.append(q("<td>").addClass("subtitle").text("Niveau"))
					.append(q("<td>").text(player.grade() + " (" + player.lvl + ")")));
			body.append(q("<tr>")
					.append(q("<td>").addClass("subtitle").text("Exp."))
					.append(q("<td>").append(_progressBar(player.xp, player.lvl * 10))));
			body.append(q("<tr>")
					.append(q("<td>").addClass("subtitle").text("Contrib."))
					.append(q("<td>").text(player.figurines + " figurines")));
		});

		q("#participants").append(table.append(body));
	};
	
	let _renderQuests = function(quests) {
		let table = q("<table>").addClass("boxed").addClass("all-quests");
		table.append(q("<thead>").append(q("<tr>").append(q("<th>").attr("colspan", "3").text("Quetes"))));
		let body = q("<tbody>");
		quests.forEach(qu => {
			let line = q("<tr>");
			line.append(q("<td>").text(qu.name)).append(q("<td>").text(qu.objectif)).append(q("<td>").append(_progressBar(qu.current,qu.size)));
			body.append(line);
		});

		q("#all-quests").append(table.append(body));
	};

	let phylios = new _player("Phylios", "pirate07.png");
	let shionn = new _player("Shionn", "pirate02.png");
	let whisp = new _player("Whisp", "pirate00.png");
	whisp.lvl = 12;

	let q1 =
		new _quest("quest-1", "Collecter des vivres", "Peindre 10 figurine", 10)
//			.progress("05/01/2025", shionn, 3, "Gobelin", _SMALL)
//			.progress("10/01/2025", whisp, 5, "Orc", _SMALL)
//			.progress("15/01/2025", shionn, 2, "Troll", _BIG)
			.render();

	let q2 =
		new _quest("quest-2", "	Réapprovisionnement en matériaux", "Peindre 15 figurine", 15)
			.render();


	_renderPlayers([phylios, shionn, whisp]);
	_renderQuests([q1]);

});