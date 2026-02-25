'use strict';

q(function() {

	const _FIG = 1;
	const _DECORD = 2;
	const _SMALL = { xp: 1, type: _FIG };
	const _MEDIUM = { xp: 2, type: _FIG };
	const _BIG = { xp: 5, type: _FIG };
	const _SMALL_DECOR = { xp: 1, type: _DECORD };
	const _MEDIUM_DECOR = { xp: 2, type: _DECORD };
	const _BIG_DECOR = { xp: 5, type: _DECORD };
	const _GRADES = ["Mousse", "Pirate de pacotille", "Flibustiers", "Cannoniers", "Loups de mers", "Ecumeurs des mers", "Quartier maître", "Pirate émérite", "Terreur des mers", "Quartier maître en chef", "Second du capitaine"];
	const _CAPTAIN_GRADES = ["Capitaine Déchu", "Capitaine Maudit", "Capitaine", "Capitaine Cendré", "Capitaine Tenebreux", "Capitaine Supreme", "Amiral Maudit", "Amiral", "Amiral Cendré", "Amiral Tenebreux", "Amiral Supreme",];
	const _PAINT = 1;
	const _LVL_UP = 2;
	const _END_QUEST = 3;
	const _GAIN_BADGE = 4;
	const _CHALLENGE_DONE = 5;
	const _QUEST_DONE = 6;
	const _LANG_CORRECTION = 7;
	const _BUG_BOUNTY = 8;

	let _badge = function(name, icon, description, revealed) {
		this.name = name;
		this.icon = icon;
		this.description = description;
		this.revealed = revealed;
	};

	const _BADGE = [];

	let _progressBar = function(current, target) {
		let pct = current * 100 / target;
		return q("<span>").addClass("progress")
			.append(q("<span>").css("width", pct + "%"))
			.append(q("<span>").text(current + "/" + target));
	}

	let _player = function(name, avatar, lvl = 1) {
		this.name = name;
		this.avatar = avatar;
		this.lvl = lvl;
		this.xp = 0;
		this.figurines = 0;
		this.decorts = 0;
		this.captain = false;
		this.badges = [];
		this.quests = [];

		this.paint = function(count, type) {
			if (type.type == _FIG) {
				this.figurines += count;
			} else {
				this.decorts += count;
			}
			return this.gainXp(count * type.xp);
		}

		this.gainXp = function(gain) {
			this.xp += gain;
			let target = this.xpTarget()
			if (this.xp >= target) {
				this.xp -= target;
				this.lvl++;
				return true;
			}
			return false;
		}

		this.grade = function(lvl) {
			if (this.captain) {
				return _CAPTAIN_GRADES[this.lvl - 1];
			}
			return _GRADES[this.lvl - 1];
		}

		this.xpTarget = function() {
			let target = this.lvl * 10;
			if (this.captain) {
				target = target * 2;
			}
			return target;
		}

		this.avatarPath = function() {
			return "pictures/defis/tortuga-2025/" + this.avatar;
		}

		this.addBadge = function(badge) {
			if (this.badges.indexOf(badge) === -1 && (_BADGE[badge].revealed || this.name !== "Shionn")) {
				this.badges.push(badge);
				return true;
			}
			return false;
		}

		this.countQuest = function(quest) {
			if (this.quests.indexOf(quest) === -1) this.quests.push(quest);
			return this.quests.length;
		}
	};

	let _history = function(event, date, player, value, desc, type) {
		this.event = event;
		this.date = date;
		this.player = player;
		this.value = value;
		this.desc = desc;
		this.type = type;

		this.description = function() {
			switch (event) {
				case _PAINT: return "peint " + value + " " + desc + " (+" + (value * type.xp) + " xp)";
				case _LVL_UP: return "passe " + desc +" (" + value + ")";
				case _END_QUEST: return "fini la quete";
				case _GAIN_BADGE: return "gagne le badge " + _BADGE[value].name+ " ";
				case _CHALLENGE_DONE: return "accomplis le défis de Phylios (+" + (value) + " xp)";
				case _QUEST_DONE: return "accomplis la quête du JV (+" + (value) + " xp)";
				case _LANG_CORRECTION: return "corrige "+value+" faute.s (+" + (value) + " xp)";
				case _BUG_BOUNTY: return "trouve un bug (+" + (value) + " xp)";
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
				let desc = q("<td>").text(h.description());
				if (h.event === _GAIN_BADGE) {
					desc = desc.append(q("<i>").attr("class",_BADGE[h.value].icon))
				}
				let line = q("<tr>")
					.append(q("<td>").text(h.date))
					.append(q("<td>").text(h.player.name))
					.append(desc);
				body.append(line)
			});

			q("#tortuga-2026-" + this.id).append(table.append(body));
			return this;
		}

		this.doChallenge = function(date, player) {
			this.history.push(new _history(_CHALLENGE_DONE, date, player, 5));
			if (player.gainXp(5)) {
				this.history.push(new _history(_LVL_UP, date, player, player.lvl, player.grade()));
			}
			return this;
		}

		this.doVideoGameQuest = function(date, player, xp) {
			this.history.push(new _history(_QUEST_DONE, date, player, xp));
			if (player.gainXp(xp)) {
				this.history.push(new _history(_LVL_UP, date, player, player.lvl, player.grade()));
			}
			return this;
		}

		this.doLangCorrection = function(date, player, count) {
			this.history.push(new _history(_LANG_CORRECTION, date, player, count));
			if (player.gainXp(count)) {
				this.history.push(new _history(_LVL_UP, date, player, player.lvl, player.grade()));
			}
			return this;
		}

		this.doBugBounty = function(date, player) {
			this.history.push(new _history(_BUG_BOUNTY, date, player, 5));
			if (player.gainXp(5)) {
				this.history.push(new _history(_LVL_UP, date, player, player.lvl, player.grade()));
			}
			return this;
		}

		this.progress = function(date, player, count, desc, type) {
			this.history.push(new _history(_PAINT, date, player, count, desc, type));
			if (player.paint(count, type)) {
				this.history.push(new _history(_LVL_UP, date, player, player.lvl, player.grade()));
				while(player.paint(0, type)) {
					this.history.push(new _history(_LVL_UP, date, player, player.lvl, player.grade()));
				}
			};
			if (count>=10 && type ===_SMALL) this.addBadge(date, player, 1); // 10 petite fig d'un coup
			if (count>=5 && type ===_MEDIUM) this.addBadge(date, player, 2); // 5 fig moyenne d'un coup
			if (count>=2 && type ===_BIG) this.addBadge(date, player, 3); // 2 grosse fig d'un coup
			// 4 petit gros non auto
			if (this.hasSend(player, _SMALL) && this.hasSend(player, _MEDIUM) && this.hasSend(player, _BIG)) this.addBadge(date, player, 4); //petit/moyen/gros
			if (this.countHistory(_PAINT, player) >= 3) this.addBadge(date, player, 5); // faire 3 contribution
			if (this.countHistory(_PAINT, player) >= 5) this.addBadge(date, player, 6); // faire 5 contribution
			if (this.current === 0 && count >= this.size) this.addBadge(date, player, 7); // one shot
			if (this.sumFigHistory(_PAINT, player, _FIG) >= 20) this.addBadge(date, player, 8); // envoyer 20 figurine
			if (this.countHistory(_PAINT, player) >= 10) this.addBadge(date, player, 9); // faire 10 contribution
			// 10 gargantuesque non auto
			// 11 bon plan
			if (player.countQuest(this.id)>=10) this.addBadge(date, player, 12); // faire 10 quetes
			if (player.countQuest(this.id)>=20) this.addBadge(date, player, 13); // faire 20 quetes
			if (player.countQuest(this.id)>=30) this.addBadge(date, player, 20); // faire 30 quetes
			if (this.hasSend(player, _SMALL_DECOR) && this.hasSend(player, _MEDIUM_DECOR) && this.hasSend(player, _BIG_DECOR)) this.addBadge(date, player, 14); //petit/moyen/gros decors
			if (this.sumFigHistory(_PAINT, player, _DECORD) >= 15) this.addBadge(date, player, 15); // envoyer 15 décors
			this.current = this.current + count;
			if (this.isFinished()) {
				if (type.type === _FIG) this.addBadge(date, player, 0); // coup final fig
				if (type.type === _DECORD) this.addBadge(date, player, 16); // coup final decor
				this.current = this.size;
				this.history.push(new _history(_END_QUEST, date, player));
			}
			return this;
		};

		this.hasSend = function(player, type) {
			return this.history.findIndex( (v) => v.player === player && v.type === type ) !== -1;
		};

		this.countHistory = function(event, player) {
			return this.history.filter((v)=>v.event === event && v.player === player).length;
		};

		this.sumFigHistory = function(event, player, figType) {
			return this.history.filter((v)=>v.event === event && v.player === player && v.type.type === figType).map(h=>h.value).reduce((a,b)=>a+b, 0);
		};

		this.addBadge = function(date, player, badge) {
			if (player.addBadge(badge)) {
				this.history.push(new _history(_GAIN_BADGE, date, player, badge));
				_BADGE[badge].revealed = true;
				if (player.badges.length >= 8) this.addBadge(date, player, 17); // obtenir 8 badge
				if (player.badges.length >= 15) this.addBadge(date, player, 18); // obtenir presque tous les badges
				if (player.badges.length >= 20) this.addBadge(date, player, 19); // obtenir tous les badge
			}
			return this;
		};

		this.isFinished = function() {
			return this.current >= this.size;
		}

	};

	let _renderPlayers = function(players) {
		let table = q("<table>").addClass("players").addClass("boxed");
		table.append(q("<thead>").append(q("<tr>").append(q("<th>").attr("colspan", "6").text("Participants"))));

		let body = q("<tbody>");

		let lines = [];
		let figurines = 0;
		let decorts = 0;
		players.forEach((player, index) => {
			if (index % 2 === 0) {
				lines = [q("<tr>"), q("<tr>"), q("<tr>"), q("<tr>"), q("<tr>")];
				body.append(lines[0]).append(lines[1]).append(lines[2]).append(lines[3]).append(lines[4]);
			}
			lines[0]
				.append(q("<td>").attr("rowspan", 5).append(q("<img>").attr("src", player.avatarPath())))
				.append(q("<td>").addClass("subtitle").text("Joueur"))
				.append(q("<td>").text(player.name));
			lines[1]
				.append(q("<td>").addClass("subtitle").text("Niveau"))
				.append(q("<td>").text(player.grade() + " (" + player.lvl + ")"));
			lines[2]
				.append(q("<td>").addClass("subtitle").text("Exp."))
				.append(q("<td>").addClass("xp").append(_progressBar(player.xp, player.xpTarget())));
			lines[3]
				.append(q("<td>").addClass("subtitle").text("Contrib."))
				.append(q("<td>").text(player.figurines + " figs / " + player.decorts + " decs"));
			let badge = q("<td>").addClass("badge");
			player.badges.forEach(b => {
				badge.append(q("<i>").attr("class", _BADGE[b].icon));
			});
			lines[4]
				.append(q("<td>").addClass("subtitle").text("Badges"))
				.append(badge);

			if (index % 2 === 1) {
				lines = [];
			}

			figurines += player.figurines;
			decorts += player.decorts;
		});
		if (lines.length) {
			lines[0].append(q("<td>").addClass("subtitle").attr("rowspan", 5).attr("colspan", 3));
		}
		/*_BADGE.forEach(b => {
			if (b.revealed) {
				body.append(q("<tr>").append(q("<td>").attr("colspan", 6).addClass("badge").append(q("<i>").attr("class", b.icon)).append(q("<strong>").text(b.name + ": " )).append(q("<span>").text(b.description))));
			}
		});//*/

		body.append(q("<tr>")
			.append(q("<td>").attr("colspan", 2).addClass("subtitle").text("Total Figurines"))
			.append(q("<td>").text(figurines))
			.append(q("<td>").attr("colspan", 2).addClass("subtitle").text("Total Décors"))
			.append(q("<td>").text(decorts)));

		q("#tortuga-2026-participants").append(table.append(body));
	};

	let _renderQuests = function(quests) {
		let table = q("<table>").addClass("boxed").addClass("all-quests");
		table.append(q("<thead>").append(q("<tr>").append(q("<th>").attr("colspan", "3").text("Quetes"))));
		let body = q("<tbody>");
		quests.forEach(qu => {
			let line = q("<tr>");
			line.append(q("<td>").text(qu.name)).append(q("<td>").text(qu.objectif)).append(q("<td>").append(_progressBar(qu.current, qu.size)));
			body.append(line);
		});

		q("#tortuga-2026-all-quests").append(table.append(body));
	};

	_BADGE.push(
		new _badge("Coup Final", "fa fa-flag", "Achever une quête", true),
		new _badge("Populeux", "ra ra-rabbit", "Envoyer 10 petites figurines d'un coup", true),
		new _badge("Bourrin", "ra ra-octopus", "Envoyer 5 figurines moyenne d'un coup", true),
		new _badge("Massif", "ra ra-dragon", "Envoyer 2 grande figurines d'un coup", true),
		//new _badge("Petit/Gros", "ra ra-two-dragons", "Envoyer une petite figurine et une grande dans la même quête", false),
		new _badge("Petit/Moyen/Gros", "ra ra-hydra", "Envoyer une figurine de chaque taille dans la même quête", true),
		new _badge("Mitraillette", "ra ra-barbed-arrow", "Faire 3 contributions à la même quête", true),
		new _badge("Gatling", "ra ra-arrow-cluster", "Faire 5 contributions à la même quête", true),
		new _badge("One shot", "ra ra-lightning-storm", "Accomplir une quête d'un seul coup", true),
		new _badge("Vague", "ra ra-double-team ", "Envoyer 20 figurine lors de la même quête", true),
		new _badge("Uzi", "ra ra-bullets", "Faire 10 contributions à la même quête", true),

		new _badge("Gargantuesque", "ra ra-monster-skull", "Peindre une très grosse figurine (>=120mm)", true),
		new _badge("Bon plan", "fa fa-thumbs-up", "Faire profiter la commu d'un bon plan", true),
		new _badge("Ten", "fa fa-battery-quarter", "Participer à 10 quêtes différentes", true),
		new _badge("Twenty", "fa fa-battery-half", "Participer à 20 quêtes différentes", true),
		new _badge("Du cailloux à la Tour", "ra ra-tower", "Envoyer un décors de chaque taille dans la même quête", true),
		new _badge("Decorama", "ra ra-castle-emblem", "Envoyer 15 décors dans la même quête", true),
		new _badge("Dernier clou", "ra ra-ankh", "Achever une quête avec un décor", true),
		new _badge("Collectionneur", "ra ra-player", "Obtenir 8 badges", true),
		new _badge("Presque tous", "ra ra-muscle-up", "Obtenir presque tous les badges", true),
		new _badge("Gotha'em all", "ra ra-queen-crown", "Obtenir tous les badge", true),

		new _badge("Thirty", "fa fa-battery-three-quarters", "Participer à 30 quêtes différentes", true),
		new _badge("Forty", "fa fa-battery-full", "Participer à 40 quêtes différentes", true),
	);

	const _Gargantuesque = 11;
	const _BonPlan = 12;

	let angest = new _player("Angest", "pirate12.png", 2);
	let anuabi = new _player("Anuabi", "pirate12.png", 2);
	//let ben = new _player("Ben illustrateur", "pirate07.png");
	let bnachee = new _player("Bnachee", "pirate02.png");
	let cuistotfou = new _player("Cuistotfou", "pirate13.png");
	let faran = new _player("Fararn", "pirate16.png", 2);
	//let hyasull = new _player("Hyasull", "pirate13.png");
	let jeff = new _player("Jeff von Zarovich", "pirate15.png");
	//let ludovic5799 = new _player("Ludovic5799", "pirate01.png");
	let phylios = new _player("Phylios", "pirate07.png", 2);
	let matdeubeul = new _player("Matdeubeul", "TODO");
	let marco = new _player("Marco", "pirate07.png");
	//let rahanis = new _player("Rahanis Sylvéclat", "pirate09.png");
	let shionn = new _player("Shionn", "pirate02.png", 2);
	let tupad = new _player("Tupad_", "pirate07.png", 2);
	let tony = new _player("Tony", "pirate14.png", 2);
	let transfopaper = new _player("Transfopaper", "pirate09.png", 2)
	let whisp = new _player("Whisp", "pirate00.png", 2);
	whisp.captain = true;

	// Décoder le Parchemin de Barbe Drue
	let q1 = new _quest("quest-1", "Décoder le Parchemin de Barbe Drue", "Peindre 40 figurines", 40)
			.doVideoGameQuest("01/01/2026", bnachee, 10)
			.doLangCorrection("01/01/2026", transfopaper, 2)
			.progress("03/01/2025", whisp, 1, "Sorcier HQ", _SMALL)
			.doChallenge("03/01/2025", whisp)
			.progress("03/01/2025", tony, 1, "Beast", _SMALL)
			.progress("03/01/2025", shionn, 4, "Leader Chaos D&L", _SMALL)
			.progress("07/01/2025", bnachee, 1, "Gunpla", _MEDIUM)
			.progress("08/01/2025", whisp, 1, "homme des neiges", _MEDIUM)
			.progress("12/01/2025", shionn, 3, "Fanatique Gobelin", _SMALL)
			.progress("12/01/2025", shionn, 1, "Shaman Gobelin", _SMALL)
			.doLangCorrection("13/01/2026", faran, 5)
			.progress("15/01/2025", whisp, 1, "Tu'ur", _MEDIUM)
			.progress("16/01/2025", tupad, 4, "Bariccade", _MEDIUM_DECOR)
			.doLangCorrection("17/01/2026", marco, 1)
			.progress("20/01/2026", whisp, 5, "Chacals", _SMALL)
			.progress("20/01/2026", transfopaper, 1, "Nain", _SMALL)
			.progress("20/01/2026", jeff, 2, "Orc", _SMALL)
			.doChallenge("20/01/2025", jeff)
			.progress("20/01/2026", shionn, 1, "Mazael", _MEDIUM)
			.progress("20/01/2026", shionn, 1, "Brigit", _SMALL)
			.doChallenge("20/01/2025", shionn)
			.doLangCorrection("23/01/2026", marco, 2)
			.progress("29/01/2026", phylios, 9, "Gretchin", _SMALL)
			.progress("29/01/2026", shionn, 4, "Waytress of Lay", _SMALL)
			.render();

	let q2 = new _quest("quest-2", "Collecter du bois", "Peindre 40 figurines", 40+15)
			.progress("29/01/2026", shionn, 2, "Waytress of Lay", _SMALL)
			.progress("29/01/2026", shionn, 1, "Champion of Lay", _SMALL)
			.doVideoGameQuest("30/01/2026", transfopaper, 10)
			.doBugBounty("30/01/2026", marco) // glissade sur le quai
			.progress("01/02/2026", tupad, 15, "Cristaux SC2", _MEDIUM_DECOR)
			.doVideoGameQuest("05/02/2026", cuistotfou, 5)
			.progress("13/02/2026", tony, 1, "Sony Jona", _SMALL)
			.progress("13/02/2026", whisp, 7, "Voleurs à dos de fourmis géantes", _MEDIUM)
			.progress("13/02/2026", whisp, 1, "Chef à pieds", _SMALL)
			.progress("13/02/2026", whisp, 1, "Elementaire de pierre sableuse", _MEDIUM)
			.progress("15/02/2026", whisp, 3, "Lézard", _MEDIUM)
			.progress("15/02/2026", angest, 1, "Requin", _BIG)
			.progress("15/02/2026", angest, 1, "Harley Queen", _BIG)
			.progress("16/02/2026", shionn, 10, "Nains", _SMALL)
			.progress("16/02/2026", shionn, 1, "court-agent", _SMALL)
			.progress("16/02/2026", shionn, 1, "krill-conscript", _MEDIUM)
			.progress("17/02/2026", whisp, 1, "Gwen, la Tanneuse d'Heavenrir", _SMALL)
			.progress("20/02/2026", whisp, 2, "Nobles", _SMALL)
			.progress("20/02/2026", whisp, 3, "Depouille", _SMALL_DECOR)
			.progress("21/02/2026", shionn, 1, "Gastefauve Noir-serment", _BIG)
			.progress("22/02/2026", shionn, 1, "Bishop of Elishu", _MEDIUM)
			.doChallenge("22/02/2026", shionn)
			.progress("22/02/2026", shionn, 1, "Truc Genshin", _SMALL_DECOR)
			.progress("23/02/2026", whisp, 1, "Hallebardier", _SMALL)
			.render();

	let q3 = new _quest("quest-3", "Rassembler un équipage", "Peindre 40 figurines", 40)
			.progress("23/02/2026", whisp, 2, "Yeti", _SMALL)
			.progress("24/02/2026", whisp, 1, "Nounours", _SMALL)
			.progress("25/02/2026", angest, 5, "Ghasts", _SMALL)
			.progress("25/02/2026", angest, 2, "Gyaa-Yothn", _MEDIUM)
			.progress("25/02/2026", angest, 2, "Gugs", _MEDIUM)
			.render();


//
	_renderPlayers([angest, bnachee, cuistotfou, faran, jeff, marco, phylios, shionn, tony, transfopaper, tupad, whisp]);
	_renderQuests([q1,q2,q3]);

});
