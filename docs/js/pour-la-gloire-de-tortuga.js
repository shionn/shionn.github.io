'use strict';

q(function() {

	const _SMALL = 1;
	const _MEDIUM = 2;
	const _BIG = 5;
	const _GRADES = ["mousse", "pirate de pacotille", "flibustiers", "loups de mers", "quartier maître", "pirate émérite", "Terreur des mers", "quartier maître en chef", "second du capitaine"];

	const _PAINT = 1;
	const _LVL_UP = 2;
	const _END_QUEST = 3;


	let _player = function(name, avatar) {
		this.name = name;
		this.avatar = avatar;
		this.lvl = 1;
		this.xp = 0;

		this.gainXp = function(count, xpFactor) {
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
				case _PAINT: return "peint " + count + " " + desc;
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

		this._progressBar = function() {
			return q("<span>").append(q("<span>").css("width", this._progressPct() + "%"))
				.append(q("<span>").text(this.current + "/" + this.size));
		}

		this._progressPct = function() {
			return this.current * 100 / size;
		}

		this.render = function() {
			let table = q("<table>").attr("class", "quest");
			let head = q("<thead>");
			head.append(q("<tr>").append(q("<th>").attr("colspan", "3").text(this.name + " : " + this.objectif)));
			table.append(head);

			let body = q("<tbody>");
			body.append(q("<tr>").append(q("<td>").attr("colspan", "3").append(this._progressBar())));
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

			table.append(body);

			q("#" + this.id).append(table);
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

	let shionn = new _player("Shionn", "pirate02.png");
	let whisp = new _player("Whisp", "pirate00.png");

	let q1 = 
		new _quest("quest-1", "Collecter des vivres", "Peindre 10 figurine", 10)
		.progress("05/01/2025", shionn, 3, "Gobelin", _SMALL)
		.progress("10/01/2025", shionn, 2, "Troll", _BIG)
		.progress("15/01/2025", whisp, 5, "Orc", _SMALL)
		.render();

});