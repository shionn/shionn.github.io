'use strict';

q(function() {

	const _SMALL = 1;
	const _MEDIUM = 2;
	const _BIG = 5;
	const _GRADES = ["Mousse", "Pirate de pacotille", "Flibustiers", "Cannoniers", "Loups de mers", "Ecumeurs des mers", "Quartier maître", "Pirate émérite", "Terreur des mers", "Quartier maître en chef", "Second du capitaine"];
	const _CAPTAIN_GRADES = ["Capitaine Déchu", "Capitaine Maudit", "Capitaine", "Capitaine Cendré", "Capitaine Tenebreux", "Capitaine Supreme"];
	const _PAINT = 1;
	const _LVL_UP = 2;
	const _END_QUEST = 3;
	const _GAIN_BADGE = 4;

	let _badge = function(name, icon, description) {
		this.name = name;
		this.icon = icon;
		this.description = description;
		this.gained = false;

		this.iconPath = function() {
			return "pictures/defis/tortuga-2025/icons/" + this.icon;
		}
	};

	const _BADGE = [];

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
		this.captain = false;
		this.badges = [];

		this.progress = function(date, count, desc, xp_factor) {
			return { up: this.gainXp(count, xp_factor), badge: this.gainBadge(count, xp_factor) };
		}

		this.gainXp = function(count, xpFactor) {
			this.figurines += count;
			this.xp += count * xpFactor;
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
			this.badges.push(badge);
		}
	};

	let _history = function(type, date, player, value, desc, xpFactor) {
		this.type = type;
		this.date = date;
		this.player = player;
		this.value = value;
		this.desc = desc;
		this.xpFactor = xpFactor;

		this.description = function() {
			switch (type) {
				case _PAINT: return "peint " + value + " " + desc + " (+" + (value * xpFactor) + " xp)";
				case _LVL_UP: return "passe " + desc;
				case _END_QUEST: return "fini la quete";
				case _GAIN_BADGE: return "gagne le badge " + _BADGE[value].name;
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
				this.history.push(new _history(_LVL_UP, date, player, player.lvl, player.grade()));
				while(player.gainXp(0,0)) {
					this.history.push(new _history(_LVL_UP, date, player, player.lvl, player.grade()));
				}
			};
			this.current = this.current + count, this.size;
			if (this.isFinished()) {
				this.current = this.size;
				this.history.push(new _history(_END_QUEST, date, player));
			}
			return this;
		};

		this.addBadge = function(date, player, badge) {
			this.history.push(new _history(_GAIN_BADGE, date, player, badge));
			player.addBadge(badge);
			_BADGE[badge].gained = true;
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
				.append(q("<td>").text(player.figurines + " figurines"));
			let badge = q("<td>").addClass("badge");
			player.badges.forEach(b => {
				badge.append(q("<img>").attr("src", _BADGE[b].iconPath()));
			});
			lines[4]
				.append(q("<td>").addClass("subtitle").text("Badges"))
				.append(badge);

			if (index % 2 === 1) {
				lines = [];
			}
		});
		if (lines.length) {
			lines[0].append(q("<td>").addClass("subtitle").attr("rowspan", 5).attr("colspan", 3));
		}
		_BADGE.forEach(b => {
			if (b.gained) {
				body.append(q("<tr>").append(q("<td>").attr("colspan", 6).addClass("badge").append(q("<img>").attr("src", b.iconPath())).append(q("<strong>").text(b.name + ": " )).append(q("<span>").text(b.description))));
			}
		});

		q("#participants").append(table.append(body));
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

		q("#all-quests").append(table.append(body));
	};

	_BADGE.push(
		new _badge("Coup Final", "icon07.png", "Achever une quête"), // 0 flag : OK
		
		new _badge("Populeux", "icon22.png", "Envoyer 10 petites figurines d'un coup"), // 1 ra-double-team : OK
		new _badge("Bourrin", "icon03.png", "Envoyer 5 figurines moyenne d'un coup"), // 2 ra-muscle-up : (OK)
		new _badge("Massif", "icon06.png", "Envoyer 2 grande figurines d'un coup"), // 3 ra-muscle-fat

		new _badge("Petit/Gros", "icon20.png", "Envoyer une petite figurine et une grande dans la même quête"), // 4 : OK
		new _badge("Petit/Moyen/Gros", "icon31.png", "Envoyer une figurine de chaque taille dans la même quête"), // 5 : OK
		
		new _badge("Mitraillette", "icon19.png", "Faire 3 contributions à la même quête"), // 6 ra-arrow-cluster  : OK
		new _badge("Gatling", "icon32.png", "Faire 5 contributions à la même quête"), // 7 ra-cannon-shot : OK
		
		new _badge("One shot", "icon01.png", "Accomplir une quête d'un seul coup"), // 8 : OK
		
		new _badge("Vague", "icon23.png", "Envoyer 20 figurine lors de la même quête"), // 9 : OK
		
		new _badge("Gargantuesque", "icon02.png", "Peindre une très grosse figurine"), // 10
		
		new _badge("Uzi", "icon11.png", "Faire 10 contributions à la même quête"), // 11 ra-cannon-shot 
		
		new _badge("Bon plan", "icon09.png", "Faire profiter la commu d'un bon plan"), // 12 OK
		
		new _badge("Ten", "icon05.png", "Participer à 10 quête différente"), // 13 
		new _badge("Twenty", "icon08.png", "Participer à 20 quête différente"), // 14 
		
		new _badge("Collectionneur", "icon14.png", "Obtenir 7 badges"), // 15
		new _badge("Gatha'em all", "icon04.png", "Obtenir tous les badge"), // 16
	);

	
	let angest = new _player("Angest", "pirate12.png"); // 0 5 6 7
	let anuabi = new _player("Anuabi", "pirate12.png"); // 4
	let faran = new _player("Faran", "pirate16.png");
	let hyasull = new _player("Hyasull", "pirate13.png");
	let phylios = new _player("Phylios", "pirate07.png"); // 12
	let rahanis = new _player("Rahanis Sylvéclat", "pirate09.png");
	let shionn = new _player("Shionn", "pirate02.png"); // 0 1 (2) 5 9
	let tupad = new _player("Tupad_", "pirate07.png");
	let tony = new _player("Tony", "pirate14.png"); // 0 1 8 9
	let whisp = new _player("Whisp", "pirate00.png"); // 0 4
	whisp.captain = true;

	let q1 = new _quest("quest-1", "Collecter des vivres", "Peindre 10 figurines", 10)
			.progress("03/01/2025", angest, 1, "Suppressor", _MEDIUM)
			.progress("03/01/2025", whisp, 1, "Statue de Ragryl", _MEDIUM)
			.progress("03/01/2025", angest, 1, "Ork", _SMALL)
			.progress("04/01/2025", shionn, 6, "Trolls", _MEDIUM)
//			.addBadge("04/01/2025", shionn, 2)
			.progress("04/01/2025", angest, 1, "Buste Eliot", _MEDIUM)
			.addBadge("04/01/2025", angest, 6)
			.addBadge("04/01/2025", angest, 0)
			.render();

	let q2 = new _quest("quest-2", "	Réapprovisionnement en matériaux", "Peindre 30 figurines", 30)
			.progress("04/01/2025", tony, 30, "Zombi", _SMALL)
			.addBadge("04/01/2025", tony, 1)
			.addBadge("04/01/2025", tony, 8)
			.addBadge("04/01/2025", tony, 9)
			.addBadge("04/01/2025", tony, 0)
			.render();
			
	let q3 = new _quest("quest-3", "Construction des quais du port", "Peindre 30 figurines", 30)
			.progress("04/01/2025", tony, 22, "Zombi", _SMALL)
			.progress("04/01/2025", anuabi, 1, "Tyranide", _SMALL)
			.progress("05/01/2025", angest, 1, "Ork", _SMALL)
			.progress("05/01/2025", angest, 1, "Gretchin", _SMALL)
			.progress("06/01/2025", angest, 1, "Ork", _SMALL)
			.progress("06/01/2025", angest, 1, "Gretchin", _SMALL)
			.progress("07/01/2025", angest, 1, "Ork", _SMALL)
			.addBadge("07/01/2025", angest, 7)
			.progress("08/01/2025", angest, 1, "Gretchin", _SMALL)
			.progress("09/01/2025", tony, 1, "Orc", _MEDIUM)
			.render();

	let q4 = new _quest("quest-4", "Réapprovisionnement en matériaux", "Peindre 25 figurines", 25)
			.progress("10/01/2025", angest, 1, "Groot", _BIG)
			.progress("11/01/2025", angest, 1, "Void-Warped Basilisk", _MEDIUM)
			.progress("13/01/2025", whisp, 1, "Vampire", _SMALL)
			.progress("15/01/2025", angest, 1, "Shaco", _SMALL)
			.addBadge("15/01/2025", angest, 5)
			.progress("16/01/2025", angest, 1, "Valrok", _SMALL)
			.progress("16/01/2025", whisp, 1, "Totem SFB", _MEDIUM)
			.progress("17/01/2025", angest, 1, "Nobz Ork", _SMALL)
			.progress("18/01/2025", angest, 1, "Lysere, Frost Window", _SMALL)
			.progress("21/01/2025", tony, 1, "Docteur", _SMALL)
			.progress("21/01/2025", angest, 1, "Inquisitrice Kyria Draxus", _SMALL)
			.progress("23/01/2025", angest, 1, "Crimson Knight", _SMALL)
			.progress("24/01/2025", anuabi, 1, "Termagant", _SMALL)
			.progress("26/01/2025", shionn, 13, "Gobelin de la Nuit", _SMALL)
			.addBadge("26/01/2025", shionn, 1)
			.addBadge("26/01/2025", shionn, 0)
			.render();

	let q5 = new _quest("quest-5", "Construction des baraquements", "Peindre 30 figurines", 30)
			.progress("26/01/2025", shionn, 27, "Gobelin de la Nuit", _SMALL)
			.addBadge("26/01/2025", shionn, 9)
			.progress("27/01/2025", tony, 1, "Cauchemar", _SMALL)
			.progress("28/01/2025", tony, 1, "Gandalf", _SMALL)
			.progress("31/01/2025", whisp, 1, "Le poissonnier d'Heavenrir", _SMALL)
			.addBadge("31/01/2025", whisp, 0)
			.render();

	let q6 = new _quest("quest-6", "Collecter des vivres", "Peindre 15 figurines", 15)
		.progress("31/01/2025", whisp, 1, "Le fermier d'Heavenrir", _SMALL)
		.progress("31/01/2025", phylios, 1, "Golem", _SMALL)
		.progress("31/01/2025", angest, 1, "Hibours des neiges", _MEDIUM)
		.progress("01/02/2025", whisp, 1, "Géant de Roi Lugubre", _BIG)
		.addBadge("01/02/2025", whisp, 4)
		.progress("02/02/2025", angest, 1, "Slaad guerrier", _SMALL)
		.progress("05/02/2025", tony, 1, "Lieutenant Primaris", _MEDIUM)
		.progress("05/02/2025", angest, 1, "SM Primaris Infiltrator", _SMALL)
		.progress("08/02/2025", angest, 1, "SM Infiltrator Halloween", _SMALL)
		.progress("08/02/2025", anuabi, 1, "Dragon défi janvier", _MEDIUM)
		.progress("11/02/2025", angest, 1, "Mini cyclope", _SMALL)
		.progress("11/02/2025", angest, 1, "Eliot, Icone du Vide", _SMALL)
		.progress("12/02/2025", tony, 1, "Terminator", _MEDIUM)
		.addBadge("13/02/2025", phylios, 12)
		.progress("14/02/2025", angest, 1, "Hugo the Huge", _SMALL)
		.progress("16/02/2025", angest, 1, "Obsidian Reaper", _MEDIUM)
		.progress("16/02/2025", anuabi, 1, "Termagaunt", _SMALL)
		.addBadge("16/02/2025", anuabi, 0)
		.render();
		
	let q7 = new _quest("quest-7", "Pillage de la colonnie espagnole", "Peindre 30 figurines", 30)
		.progress("16/02/2025", angest, 1, "Pyromant Keeper", _SMALL)
		.progress("17/02/2025", shionn, 1, "Boss squig & BrutoSquig", _SMALL)
		.progress("17/02/2025", shionn, 1, "Thos le Dragon", _MEDIUM)
		.progress("17/02/2025", shionn, 1, "Trugg, roi des trolls", _BIG)
		.addBadge("17/02/2025", shionn, 5)
		.progress("17/02/2025", whisp, 1, "Nevamore, Super Fantasy Brawl", _MEDIUM)
		.progress("17/02/2025", shionn, 1, "Mercenaire hero nemessis", _SMALL)
		.progress("17/02/2025", shionn, 1, "Psy hero nemessis", _SMALL)
		.progress("18/02/2025", whisp, 1, "Pillier, Super Fantasy Brawl", _MEDIUM)
		.render();
			
	_renderPlayers([angest, anuabi, faran, hyasull, phylios, rahanis, shionn, tony, tupad, whisp]);
	_renderQuests([q1, q2, q3, q4, q5, q6, q7]);

});
