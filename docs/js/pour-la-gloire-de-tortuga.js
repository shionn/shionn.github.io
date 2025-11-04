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

	let _badge = function(name, icon, description, revealed) {
		this.name = name;
		this.icon = icon;
		this.description = description;
		this.revealed = revealed;

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
		this.decorts = 0;
		this.captain = false;
		this.badges = [];
		this.quests = [];

		this.gainXp = function(count, type) {
			if (type.type == _FIG) {
				this.figurines += count;
			} else {
				this.decorts += count;
			}
			this.xp += count * type.xp;
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

			q("#" + this.id).append(table.append(body));
			return this;
		}

		this.progress = function(date, player, count, desc, type) {
			this.history.push(new _history(_PAINT, date, player, count, desc, type));
			if (player.gainXp(count, type)) {
				this.history.push(new _history(_LVL_UP, date, player, player.lvl, player.grade()));
				while(player.gainXp(0, type)) {
					this.history.push(new _history(_LVL_UP, date, player, player.lvl, player.grade()));
				}
			};
			if (count>=10 && type ===_SMALL) this.addBadge(date, player, 1); // 10 petite fig d'un coup
			if (count>=5 && type ===_MEDIUM) this.addBadge(date, player, 2); // 5 fig moyenne d'un coup
			if (count>=2 && type ===_BIG) this.addBadge(date, player, 3); // 2 grosse fig d'un coup
			// 4 petit gros non auto
			if (this.hasSend(player, _SMALL) && this.hasSend(player, _MEDIUM) && this.hasSend(player, _BIG)) this.addBadge(date, player, 5); //petit/moyen/gros
			if (this.countHistory(_PAINT, player) >= 3) this.addBadge(date, player, 6); // faire 3 contribution
			if (this.countHistory(_PAINT, player) >= 5) this.addBadge(date, player, 7); // faire 5 contribution
			if (this.current === 0 && count >= this.size) this.addBadge(date, player, 8); // one shot
			if (this.sumFigHistory(_PAINT, player, _FIG) >= 20) this.addBadge(date, player, 9); // envoyer 20 figurine
			if (this.countHistory(_PAINT, player) >= 10) this.addBadge(date, player, 10); // faire 10 contribution
			// 11 gargantuesque non auto
			// 12 bon plan
			if (player.countQuest(this.id)>=10) this.addBadge(date, player, 13); // faire 10 quetes
			if (player.countQuest(this.id)>=20) this.addBadge(date, player, 14); // faire 20 quetes
			if (player.countQuest(this.id)>=30) this.addBadge(date, player, 21); // faire 30 quetes
			if (this.hasSend(player, _SMALL_DECOR) && this.hasSend(player, _MEDIUM_DECOR) && this.hasSend(player, _BIG_DECOR)) this.addBadge(date, player, 15); //petit/moyen/gros decors
			if (this.sumFigHistory(_PAINT, player, _DECORD) >= 15) this.addBadge(date, player, 16); // envoyer 15 décors
			this.current = this.current + count;
			if (this.isFinished()) {
				if (type.type === _FIG) this.addBadge(date, player, 0); // coup final fig
				if (type.type === _DECORD) this.addBadge(date, player, 17); // coup final decor
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
				if (player.badges.length >= 8) this.addBadge(date, player, 18); // obtenir 8 badge
				if (player.badges.length >= 15) this.addBadge(date, player, 19); // obtenir presque tous les badges
				if (player.badges.length >= _BADGE.length) this.addBadge(date, player, 20); // obtenir tous les badge
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
		_BADGE.forEach(b => {
			if (b.revealed) {
				body.append(q("<tr>").append(q("<td>").attr("colspan", 6).addClass("badge").append(q("<i>").attr("class", b.icon)).append(q("<strong>").text(b.name + ": " )).append(q("<span>").text(b.description))));
			}
		});

		body.append(q("<tr>")
			.append(q("<td>").attr("colspan", 2).addClass("subtitle").text("Total Figurines"))
			.append(q("<td>").text(figurines))
			.append(q("<td>").attr("colspan", 2).addClass("subtitle").text("Total Décors"))
			.append(q("<td>").text(decorts)));

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
		new _badge("Coup Final", "fa fa-flag", "Achever une quête", true),
		new _badge("Populeux", "ra ra-rabbit", "Envoyer 10 petites figurines d'un coup", true),
		new _badge("Bourrin", "ra ra-octopus", "Envoyer 5 figurines moyenne d'un coup", true),
		new _badge("Massif", "ra ra-dragon", "Envoyer 2 grande figurines d'un coup", true),
		new _badge("Petit/Gros", "ra ra-two-dragons", "Envoyer une petite figurine et une grande dans la même quête", true), // 4
		new _badge("Petit/Moyen/Gros", "ra ra-hydra", "Envoyer une figurine de chaque taille dans la même quête", true),
		new _badge("Mitraillette", "ra ra-barbed-arrow", "Faire 3 contributions à la même quête", true),
		new _badge("Gatling", "ra ra-arrow-cluster", "Faire 5 contributions à la même quête", true),
		new _badge("One shot", "ra ra-lightning-storm", "Accomplir une quête d'un seul coup", true),
		new _badge("Vague", "ra ra-double-team ", "Envoyer 20 figurine lors de la même quête", true),

		new _badge("Uzi", "ra ra-bullets", "Faire 10 contributions à la même quête", true),
		new _badge("Gargantuesque", "ra ra-monster-skull", "Peindre une très grosse figurine (>=120mm)", true), // 11 TODO true
		new _badge("Bon plan", "fa fa-thumbs-up", "Faire profiter la commu d'un bon plan", true), // 12
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

	const _PetitGros = 4;
	const _Gargantuesque = 11;
	const _BonPlan = 12;


	let angest = new _player("Angest", "pirate12.png");
	let anuabi = new _player("Anuabi", "pirate12.png");
	let ben = new _player("Ben illustrateur", "pirate07.png");
	let faran = new _player("Fararn", "pirate16.png");
	let hyasull = new _player("Hyasull", "pirate13.png");
	let ludovic5799 = new _player("Ludovic5799", "pirate01.png");
	let phylios = new _player("Phylios", "pirate07.png");
	let rahanis = new _player("Rahanis Sylvéclat", "pirate09.png");
	let shionn = new _player("Shionn", "pirate02.png");
	let tupad = new _player("Tupad_", "pirate07.png");
	let tony = new _player("Tony", "pirate14.png");
	let transfopaper = new _player("Transfopaper", "pirate09.png")
	let whisp = new _player("Whisp", "pirate00.png");
	whisp.captain = true;

	let q1 = new _quest("quest-1", "Collecter des vivres", "Peindre 10 figurines", 10)
			.progress("03/01/2025", angest, 1, "Suppressor", _MEDIUM)
			.progress("03/01/2025", whisp, 1, "Statue de Ragryl", _MEDIUM)
			.progress("03/01/2025", angest, 1, "Ork", _SMALL)
			.progress("04/01/2025", shionn, 6, "Trolls", _MEDIUM)
			.progress("04/01/2025", angest, 1, "Buste Eliot", _MEDIUM)
			.render();

	let q2 = new _quest("quest-2", "	Réapprovisionnement en matériaux", "Peindre 30 figurines", 30)
			.progress("04/01/2025", tony, 30, "Zombi", _SMALL)
			.render();

	let q3 = new _quest("quest-3", "Construction des quais du port", "Peindre 30 figurines", 30)
			.progress("04/01/2025", tony, 22, "Zombi", _SMALL)
			.progress("04/01/2025", anuabi, 1, "Tyranide", _SMALL)
			.progress("05/01/2025", angest, 1, "Ork", _SMALL)
			.progress("05/01/2025", angest, 1, "Gretchin", _SMALL)
			.progress("06/01/2025", angest, 1, "Ork", _SMALL)
			.progress("06/01/2025", angest, 1, "Gretchin", _SMALL)
			.progress("07/01/2025", angest, 1, "Ork", _SMALL)
			.progress("08/01/2025", angest, 1, "Gretchin", _SMALL)
			.progress("09/01/2025", tony, 1, "Orc", _MEDIUM)
			.render();

	let q4 = new _quest("quest-4", "Réapprovisionnement en matériaux", "Peindre 25 figurines", 25)
			.progress("10/01/2025", angest, 1, "Groot", _BIG)
			.progress("11/01/2025", angest, 1, "Void-Warped Basilisk", _MEDIUM)
			.progress("13/01/2025", whisp, 1, "Vampire", _SMALL)
			.progress("15/01/2025", angest, 1, "Shaco", _SMALL)
			.progress("16/01/2025", angest, 1, "Valrok", _SMALL)
			.progress("16/01/2025", whisp, 1, "Totem SFB", _MEDIUM)
			.progress("17/01/2025", angest, 1, "Nobz Ork", _SMALL)
			.progress("18/01/2025", angest, 1, "Lysere, Frost Window", _SMALL)
			.progress("21/01/2025", tony, 1, "Docteur", _SMALL)
			.progress("21/01/2025", angest, 1, "Inquisitrice Kyria Draxus", _SMALL)
			.progress("23/01/2025", angest, 1, "Crimson Knight", _SMALL)
			.progress("24/01/2025", anuabi, 1, "Termagant", _SMALL)
			.progress("26/01/2025", shionn, 13, "Gobelin de la Nuit", _SMALL)
			.render();

	let q5 = new _quest("quest-5", "Construction des baraquements", "Peindre 30 figurines", 30)
			.progress("26/01/2025", shionn, 27, "Gobelin de la Nuit", _SMALL)
			.progress("27/01/2025", tony, 1, "Cauchemar", _SMALL)
			.progress("28/01/2025", tony, 1, "Gandalf", _SMALL)
			.progress("31/01/2025", whisp, 1, "Le poissonnier d'Heavenrir", _SMALL)
			.render();

	let q6 = new _quest("quest-6", "Collecter des vivres", "Peindre 15 figurines", 15)
		.progress("31/01/2025", whisp, 1, "Le fermier d'Heavenrir", _SMALL)
		.progress("31/01/2025", phylios, 1, "Golem", _SMALL)
		.progress("31/01/2025", angest, 1, "Hibours des neiges", _MEDIUM)
		.progress("01/02/2025", whisp, 1, "Géant de Roi Lugubre", _BIG)
		.addBadge("01/02/2025", whisp, _PetitGros) // not Auto
		.progress("02/02/2025", angest, 1, "Slaad guerrier", _SMALL)
		.progress("05/02/2025", tony, 1, "Lieutenant Primaris", _MEDIUM)
		.progress("05/02/2025", angest, 1, "SM Primaris Infiltrator", _SMALL)
		.progress("08/02/2025", angest, 1, "SM Infiltrator Halloween", _SMALL)
		.progress("08/02/2025", anuabi, 1, "Dragon défi janvier", _MEDIUM)
		.progress("11/02/2025", angest, 1, "Mini cyclope", _SMALL)
		.progress("11/02/2025", angest, 1, "Eliot, Icone du Vide", _SMALL)
		.progress("12/02/2025", tony, 1, "Terminator", _MEDIUM)
		.addBadge("13/02/2025", phylios, _BonPlan) // not auto
		.progress("14/02/2025", angest, 1, "Hugo the Huge", _SMALL)
		.progress("16/02/2025", angest, 1, "Obsidian Reaper", _MEDIUM)
		.progress("16/02/2025", anuabi, 1, "Termagaunt", _SMALL)
		.render();

	let q7 = new _quest("quest-7", "Pillage de la colonnie espagnole", "Peindre 30 figurines", 30)
		.progress("16/02/2025", angest, 1, "Pyromant Keeper", _SMALL)
		.progress("17/02/2025", shionn, 1, "Boss squig & BrutoSquig", _SMALL)
		.progress("17/02/2025", shionn, 1, "Thos le Dragon", _MEDIUM)
		.progress("17/02/2025", shionn, 1, "Trugg, roi des trolls", _BIG)
		.progress("17/02/2025", whisp, 1, "Nevamore, Super Fantasy Brawl", _MEDIUM)
		.progress("17/02/2025", shionn, 1, "Mercenaire hero nemessis", _SMALL)
		.progress("17/02/2025", shionn, 1, "Psy hero nemessis", _SMALL)
		.progress("18/02/2025", whisp, 1, "Pillier, Super Fantasy Brawl", _MEDIUM)
		.progress("18/02/2025", shionn, 1, "Pdg hero nemessis", _SMALL)
		.progress("19/02/2025", shionn, 1, "Prisonnier hero nemessis", _SMALL)
		.progress("19/02/2025", shionn, 1, "Android hero nemessis", _SMALL)
		.progress("19/02/2025", shionn, 1, "Chien nemessis", _SMALL)
		.progress("20/02/2025", shionn, 1, "D&L Dame à l'épée", _SMALL)
		.progress("21/02/2025", whisp, 1, "Vampire presque underworld", _SMALL)
		.progress("23/02/2025", shionn, 1, "Troll col du crâne", _MEDIUM)
		.progress("23/02/2025", anuabi, 1, "Dragon des mer", _BIG)
		.progress("25/02/2025", whisp, 6, "Squelettes", _SMALL)
		.progress("26/02/2025", tony, 1, "Troll Histoire de Peluche", _SMALL)
		.progress("27/02/2025", whisp, 1, "Vampire presque underworld", _SMALL)
		.progress("28/02/2025", angest, 1, "Soeur de Bataille", _SMALL)
		.progress("28/02/2025", shionn, 5, "Ombres elfes noirs", _SMALL)
		.render();

	let q8 = new _quest("quest-8", "Construction d'une echoppe pour les Pirates", "Peindre 50 figurines ou Décors", 50)
		.progress("28/02/2025", tupad, 2, "Tour d'ewok", _BIG_DECOR)
		.progress("28/02/2025", tupad, 3, "Tour d'ewok", _MEDIUM_DECOR)
		.progress("28/02/2025", tupad, 5, "Passerelle d'ewok", _BIG_DECOR)
		.progress("28/02/2025", tupad, 8, "Buisson", _SMALL_DECOR)
		.progress("28/02/2025", shionn, 5, "Ombres elfes noirs", _SMALL)
		.progress("28/02/2025", whisp, 1, "Coffre", _SMALL_DECOR)
		.progress("28/02/2025", whisp, 1, "Grotte de Snoopy", _BIG_DECOR)
		.progress("28/02/2025", whisp, 15, "Jeu de tuile d'exterieur", _MEDIUM_DECOR)
		.progress("28/02/2025", whisp, 1, "Cité d'Heavenrir", _BIG_DECOR)
		.progress("28/02/2025", angest, 2, "Persée et Méduse", _BIG)
		.progress("02/03/2025", shionn, 1, "Cage D&L", _SMALL_DECOR)
		.progress("02/03/2025", shionn, 2, "Hutte D&L", _MEDIUM_DECOR)
		.progress("05/03/2025", angest, 1, "Dead King", _BIG)
		.progress("06/03/2025", tony, 3, "Gretchin", _SMALL)
		.render();

	let q9 = new _quest("quest-9", "Collecter des vivres", "Peindre 20 figurines", 20)
		.progress("06/03/2025", tony, 3, "Gretchin", _SMALL)
		.progress("10/03/2025", angest, 3, "Space Machin", _SMALL)
		.progress("11/03/2025", whisp, 5, "Orcs sur Wargs", _SMALL)
		.progress("13/03/2025", whisp, 1, "Draculus D&L", _MEDIUM)
		.progress("14/03/2025", whisp, 1, "Elfe", _SMALL)
		.progress("15/03/2025", angest, 1, "Slug, the Snail God", _BIG)
		.addBadge("15/03/2025", angest, _PetitGros) // not Auto
		.progress("16/03/2025", whisp, 1, "Anuabi après opération", _SMALL)
		.progress("16/03/2025", ludovic5799, 3, "Rat Ogre", _MEDIUM)
		.progress("16/03/2025", ludovic5799, 1, "Ratling gun", _BIG)
		.progress("16/03/2025", ludovic5799, 1, "Equipage Ratling Gun", _SMALL)
		.render();

	let q10 = new _quest("quest-10", "Réparer nos embarquations de fortune", "Peindre 30 figurines", 30)
		.progress("16/03/2025", ludovic5799, 3, "Equipage Ratling Gun", _SMALL)
		.progress("16/03/2025", ludovic5799, 1, "Griffarque sur Rongebete", _BIG)
		.addBadge("16/03/2025", ludovic5799, _PetitGros) // not Auto
		.progress("15/03/2025", angest, 1, "Slug, the Snail God", _BIG)
		.progress("19/03/2025", angest, 1, "Infernal Sanctifier", _BIG)
		.progress("21/03/2025", angest, 1, "Batman", _MEDIUM)
		.progress("23/03/2025", angest, 1, "Nurgle des profondeurs", _MEDIUM)
		.progress("23/03/2025", shionn, 20, "Stabbas", _SMALL)
		.progress("23/03/2025", shionn, 2, "Shootas", _SMALL)
		.render();

	let q11 = new _quest("quest-11", "S'emparer d'un navire", "Peindre 50 figurines ou Décors", 50)
		.progress("23/03/2025", shionn, 18, "Shootas", _SMALL)
		.progress("24/03/2025", tony, 1, "Une cahouette de l'espace", _SMALL_DECOR)
		.progress("24/03/2025", whisp, 1, "Un personnage avec un turban", _SMALL)
		.progress("25/03/2025", whisp, 1, "Une serveuse", _SMALL)
		.progress("25/03/2025", whisp, 1, "Un villageois", _SMALL)
		.progress("25/03/2025", whisp, 1, "Une villageoise", _SMALL)
		.progress("25/03/2025", shionn, 7, "Gardes de Dragsta", _SMALL)
		.progress("25/03/2025", shionn, 4, "Serpents et Fourmis", _SMALL)
		.progress("27/03/2025", angest, 1, "Harker, Crimson Blade", _SMALL)
		.progress("27/03/2025", whisp, 4, "Coffres", _SMALL_DECOR)
		.progress("27/03/2025", whisp, 1, "rivière et pont", _BIG_DECOR)
		.progress("30/03/2025", angest, 1, "Orc Grossache", _SMALL)
		.progress("30/03/2025", shionn, 1, "Hutte Champignon D&L", _MEDIUM_DECOR)
		.progress("30/03/2025", shionn, 1, "Hutte Marais D&L", _MEDIUM_DECOR)
		.progress("03/04/2025", whisp, 1, "Capitaine", _MEDIUM)
		.progress("03/04/2025", whisp, 2, "Coffre", _SMALL_DECOR)
		.progress("04/04/2025", whisp, 4, "Mur Modulaire", _SMALL_DECOR)
		.render();

	let q12 = new _quest("quest-12", "La Premiere Bataille", "Peindre 30 figurines en 15 jours", 30)
		.progress("06/04/2025", shionn, 1, "Serpent", _MEDIUM)
		.progress("06/04/2025", shionn, 1, "Wendigo", _SMALL)
		.progress("06/04/2025", anuabi, 1, "Orc", _SMALL)
		.progress("06/04/2025", tupad, 2, "Fille et lion", _SMALL)
		.progress("06/04/2025", tupad, 2, "Vaisseau Eldar", _BIG)
		.addBadge("06/04/2025", tupad, _PetitGros) // not Auto
		.progress("10/04/2025", shionn, 9, "Gitz de Zarbag", _SMALL)
		.progress("10/04/2025", angest, 10, "Sirene, Flageleur et Villageois", _SMALL)
		.progress("14/04/2025", anuabi, 1, "Gundam strike", _BIG)
		.progress("15/04/2025", whisp, 1, "Ours hibou", _MEDIUM)
		.progress("15/04/2025", whisp, 2, "Zombi", _SMALL)
		.render();


	let q13 = new _quest("quest-13", "Creation d'une Capitainerie", "Peindre 50 figurines ou Décors", 50)
		.progress("15/04/2025", whisp, 2, "Porte modulaire", _SMALL_DECOR)
		.progress("15/04/2025", whisp, 3, "Dalle modulaire", _SMALL_DECOR)
		.progress("15/04/2025", whisp, 3, "Long mur modulaire", _MEDIUM_DECOR)
		.progress("15/04/2025", whisp, 4, "Zombi", _SMALL)
		.progress("15/04/2025", shionn, 1, "Druid", _SMALL)
		.progress("16/04/2025", whisp, 1, "Dalle 9x15", _BIG_DECOR)
		.progress("16/04/2025", whisp, 1, "Dalle 6x12", _MEDIUM_DECOR)
		.progress("16/04/2025", whisp, 3, "Dalle 9x12", _MEDIUM_DECOR)
		.progress("16/04/2025", whisp, 10, "Dalle 9x9", _SMALL_DECOR)
		.progress("16/04/2025", whisp, 1, "Dalle 6x9", _SMALL_DECOR)
		.progress("16/04/2025", whisp, 5, "Dalle 3x12", _MEDIUM_DECOR)
		.progress("16/04/2025", whisp, 5, "Dalle 12x12", _MEDIUM_DECOR)
		.progress("16/04/2025", angest, 1, "Dark Vador", _MEDIUM)
		.progress("17/04/2025", whisp, 2, "Forêts", _BIG_DECOR)
		.progress("17/04/2025", whisp, 8, "Dalle 12x12", _MEDIUM_DECOR)
		.render();

	let q14 = new _quest("quest-14", "Création d'une brasserie", "Peindre 50 figurines ou Décors", 49)
		.progress("17/04/2025", shionn, 2, "Sirène", _SMALL)
		.progress("18/04/2025", tony, 1, "Gladiateur", _SMALL)
		.progress("18/04/2025", tupad, 1, "Seigneur Fantom", _MEDIUM)
		.progress("19/04/2025", whisp, 4, "Dale exterieur", _MEDIUM_DECOR)
		.progress("19/04/2025", angest, 1, "Illwyn the Fox", _MEDIUM)
		.progress("20/04/2025", phylios, 1, "Goku", _MEDIUM)
//		.progress("20/04/2025", phylios, 1, "Goku", _MEDIUM) //  erreur
		.progress("20/04/2025", anuabi, 1, "Orcette", _SMALL)
		.progress("22/04/2025", whisp, 1, "Ours Hibou", _MEDIUM)
		.progress("24/04/2025", whisp, 1, "Grace", _MEDIUM)
		.progress("24/04/2025", shionn, 1, "Princesse K'erudo", _SMALL)
		.progress("24/04/2025", shionn, 5, "Church of Order", _SMALL)
		.progress("25/04/2025", angest, 1, "Alpha Cloaker", _BIG)
		.progress("26/04/2025", angest, 1, "Skarn The Rat Lord", _SMALL)
		.progress("27/04/2025", anuabi, 8, "Médaillon et Crâne", _SMALL_DECOR)
		.progress("28/04/2025", angest, 1, "Drone T'au", _SMALL)
		.progress("02/05/2025", whisp, 4, "dark knights et spectres", _SMALL)
		.progress("03/05/2025", angest, 1, "Poulpi", _MEDIUM)
		.progress("03/05/2025", shionn, 5, "Marteau lanceur de Gobelin", _SMALL)
		.progress("04/05/2025", angest, 1, "Gnoll", _SMALL)
		.progress("04/05/2025", shionn, 1, "Ballon (fiston)", _SMALL_DECOR)
		.progress("04/05/2025", anuabi, 7, "Médaillon, crâne, dés", _SMALL_DECOR)
		.render();

	let q15 = new _quest("quest-15", "Qui nous a volé?", "Peindre 30 figurines en 15 jours", 30)
		.progress("04/05/2025", shionn, 1, "Nounours (fiston)", _SMALL)
		.progress("04/05/2025", anuabi, 1, "Tyrannide", _SMALL)
		.progress("09/05/2025", angest, 1, "Manticore", _MEDIUM)
		.progress("09/05/2025", anuabi, 1, "Petit Nounours", _BIG)
		.progress("14/05/2025", ben, 1, "Silvertower", _SMALL)
		.progress("14/05/2025", anuabi, 1, "Tyrannide", _SMALL)
		.progress("15/05/2025", angest, 8, "Gretching", _SMALL)
		.progress("16/05/2025", whisp, 1, "T-Rex", _BIG)
		.progress("16/05/2025", whisp, 3, "Araigné", _MEDIUM)
		.progress("17/05/2025", shionn, 1, "Aracknarock", _BIG)
		.addBadge("17/05/2025", shionn, _Gargantuesque) // not Auto
		.addBadge("17/05/2025", shionn, _PetitGros) // not Auto
		.progress("17/05/2025", shionn, 5, "Ingénieurs", _SMALL)
		.progress("17/05/2025", angest, 1, "Dragon abomination", _MEDIUM)
		.progress("18/05/2025", whisp, 1, "Draw", _SMALL)
		.progress("18/05/2025", shionn, 4, "Gobs sur Araignée", _SMALL)
		.render();

	let q16 = new _quest("quest-16", "Restauration des Quais", "Peindre 35 figurines ou Décors", 35)
		.progress("18/05/2025", whisp, 35, "Squelette", _SMALL_DECOR)
		.render();

	let q17 = new _quest("quest-17", "Construction de contrefort", "Peindre 50 figurines ou Décors", 50)
		.progress("19/05/2025", whisp, 16, "Squelette", _SMALL_DECOR)
		.progress("19/05/2025", shionn, 4, "Gobs sur Araignée", _SMALL)
		.progress("19/05/2025", whisp, 3, "Araigné", _MEDIUM)
		.progress("21/05/2025", whisp, 19, "Mur 9cm", _MEDIUM_DECOR)
		.progress("21/05/2025", whisp, 8, "Mur 6cm", _SMALL_DECOR)
		.render();

	let q18 = new _quest("quest-18", "Nous sommes attaqué !", "Peindre 20 figurines en 15 jours", 20)
		.progress("22/05/2025", angest, 1, "Seldana sand sorcerer", _SMALL)
		.progress("22/05/2025", shionn, 1, "chaman tisseur", _SMALL)
		.progress("23/05/2025", whisp, 1, "Dragon d'or", _MEDIUM)
		.progress("26/05/2025", angest, 3, "Gobelin", _SMALL)
		.progress("26/05/2025", angest, 2, "Gobelin", _SMALL)
		.progress("27/05/2025", phylios, 1, "Buste rubick's cube", _SMALL)
		.progress("27/05/2025", whisp, 4, "Momies", _SMALL)
		.progress("01/06/2025", shionn, 1, "Court Forerunner", _SMALL)
		.progress("01/06/2025", shionn, 1, "Ca'arak", _SMALL)
		.progress("01/06/2025", shionn, 1, "Morgu", _SMALL)
		.progress("01/06/2025", angest, 1, "Sniper Infiltrator", _MEDIUM)
		.progress("01/06/2025", phylios, 1, "Buste Petite fille à nounours", _SMALL)
		.progress("02/06/2025", phylios, 1, "Necron", _SMALL)
		.progress("04/06/2025", angest, 1, "Treasure Carrier", _MEDIUM)
		.render();

	let q19 = new _quest("quest-19", "Création d'un coffre fort fortifié", "Peindre 50 figurines ou Décors", 50)
		.progress("05/06/2025", whisp, 2, "Mur 6cm", _SMALL_DECOR)
		.progress("05/06/2025", whisp, 2, "Mur 16cm", _BIG_DECOR)
		.progress("05/06/2025", whisp, 2, "Mur 14cm", _BIG_DECOR)
		.progress("05/06/2025", whisp, 2, "Rocher", _SMALL_DECOR)
		.progress("05/06/2025", whisp, 14, "Portes", _SMALL_DECOR)
		.progress("06/06/2025", whisp, 15, "Portes ouvertes", _SMALL_DECOR)
		.progress("10/06/2025", tupad, 13, "wraithblades", _MEDIUM)
		.render();

	let q20 = new _quest("quest-20", "Remplir les Coffres", "Peindre 20 figurines en 15 jours", 20)
		.progress("11/06/2025", tupad, 2, "wraithblades", _MEDIUM)
		.progress("11/06/2025", tupad, 5, "wraithguards", _MEDIUM)
		.progress("11/06/2025", tupad, 4, "blindés eldars", _BIG)
		.progress("12/06/2025", angest, 1, "Quarantine Warden", _MEDIUM)
		.progress("15/06/2025", whisp, 1, "Storn Mains-Agiles", _SMALL)
		.progress("15/06/2025", faran, 7, "Griffe Sanglante", _MEDIUM)
		.render();

	let q21 = new _quest("quest-21", "Agrandir les dortoirs", "Peindre 40 figurines ou Décors", 40)
		.progress("16/06/2025", faran, 2, "Griffe Sanglante", _MEDIUM)
		.progress("16/06/2025", whisp, 1, "Nain Super Fantasy Brawl", _MEDIUM)
		.progress("16/06/2025", whisp, 1, "Cheminé hero quest", _SMALL_DECOR)
		.progress("16/06/2025", phylios, 1, "Chevaliere", _SMALL)
		.progress("18/06/2025", whisp, 1, "Mage hero quest", _SMALL)
		.progress("20/06/2025", angest, 1, "Dragonborn Zealor", _MEDIUM)
		.progress("22/06/2025", shionn, 1, "Dragon shenron", _MEDIUM)
		.progress("22/06/2025", shionn, 1, "Goku", _SMALL)
		.progress("23/06/2025", shionn, 1, "Chaman col du crâne", _SMALL)
		.progress("24/06/2025", faran, 1, "Sergent griffes sanglante", _MEDIUM)
		.progress("26/06/2025", phylios, 2, "Coffres", _SMALL_DECOR)
		.progress("26/06/2025", angest, 1, "Rothan, Hexed Apothecary", _MEDIUM)
		.progress("27/06/2025", tupad, 5, "Gardes fantômes", _MEDIUM)
		.progress("27/06/2025", tupad, 11, "Faucheurs noirs", _SMALL)
		.progress("28/06/2025", shionn, 1, "Princesse Mononokée", _BIG)
		.progress("01/07/2025", shionn, 9, "Stabbas && Shootas", _SMALL)
		.render();

	let q22 = new _quest("quest-22", "Culture", "Peindre 30 figurines ou Décors", 30)
		.progress("01/07/2025", shionn, 30, "Stabbas && Shootas", _SMALL)
		.render();

	let q23 = new _quest("quest-23", "Évolution de l'échoppe", "Peindre 40 figurines ou Décors", 40)
		.progress("03/07/2025", shionn, 1, "Stabbas && Shootas", _SMALL)
		.progress("04/07/2025", faran, 1, "Garde Loup", _MEDIUM)
		.progress("08/07/2025", faran, 1, "Garde Loup", _MEDIUM)
		.progress("12/07/2025", angest, 1, "Buste Zombi", _MEDIUM)
		.progress("12/07/2025", angest, 1, "Guerrier", _MEDIUM)
		.progress("12/07/2025", angest, 1, "Buste Veille", _MEDIUM)
		.progress("12/07/2025", angest, 1, "Magicien", _SMALL)
		.progress("12/07/2025", angest, 1, "Cerf zombi", _MEDIUM)
		.progress("16/07/2025", shionn, 10, "Chevaucheur d'araigné", _MEDIUM)
		.progress("17/07/2025", angest, 1, "Jester-No-More", _MEDIUM)
		.progress("20/07/2025", faran, 1, "Garde Loup", _MEDIUM)
		.progress("20/07/2025", shionn, 4, "Djinn", _SMALL)
		.progress("27/07/2025", angest, 1, "Persephone", _BIG)
		.progress("28/07/2025", whisp, 1, "Zmobar", _SMALL)
		.progress("29/07/2025", tony, 1, "Orc", _MEDIUM)
		.progress("01/08/2025", angest, 1, "Tsathoggua", _BIG)
		.progress("01/08/2025", whisp, 1, "Catfolk", _SMALL)
		.progress("03/08/2025", shionn, 5, "Moto Gasland", _MEDIUM)
		.progress("06/08/2025", tony, 1, "Dragon mignon", _MEDIUM)
		.progress("07/08/2025", angest, 1, "Duplolas", _MEDIUM)
		.progress("07/08/2025", whisp, 2, "Pirates squelette", _SMALL)
		.progress("08/08/2025", whisp, 1, "Ranger elfe", _SMALL)
		.progress("10/08/2025", angest, 1, "Roi Sorcier", _MEDIUM)
		.render();

	let q24 = new _quest("quest-24", "Remplir les Coffres", "Peindre 25 figurines en 15 jours", 20)
		.progress("10/08/2025", angest, 1, "Protecteur", _SMALL)
		.progress("10/08/2025", shionn, 9, "Yv'anda - Dryad Observers", _SMALL)
		.progress("10/08/2025", angest, 1, "Protecteur", _SMALL)
		.progress("12/08/2025", angest, 1, "Furet Rôdeur", _SMALL)
		.progress("13/08/2025", angest, 1, "Furet Rôdeur", _SMALL)
		.progress("14/08/2025", angest, 1, "Protecteur", _SMALL)
		.progress("15/08/2025", angest, 1, "Furet assassin", _SMALL)
		.progress("16/08/2025", whisp, 1, "Abomination", _MEDIUM)
		.progress("16/08/2025", angest, 1, "Abomination", _MEDIUM)
		.progress("16/08/2025", angest, 1, "ogre blood bowl", _MEDIUM)
		.progress("17/08/2025", angest, 1, "ogre blood bowl", _MEDIUM)
		.progress("17/08/2025", angest, 1, "Troll de Bloodbowl", _MEDIUM)
		.render();

	let q25 = new _quest("quest-25", "On requisitionne ce batiment", "Peindre 40 figurines ou Décors", 40)
		.progress("18/08/2025", shionn, 1, "Loon Boss", _SMALL)
		.progress("19/08/2025", whisp, 1, "Magicien", _SMALL)
		.progress("19/08/2025", shionn, 1, "Centaur", _MEDIUM)
		.progress("19/08/2025", shionn, 4, "Centaur", _SMALL)
		.progress("20/08/2025", whisp, 2, "Raptors", _SMALL)
		.progress("21/08/2025", tony, 1, "Lord of plagues", _SMALL)
		.progress("24/08/2025", tupad, 1, "Scorpion", _BIG)
		.progress("24/08/2025", tupad, 1, "Chevalier fantome", _BIG)
		.progress("24/08/2025", tupad, 5, "Troupe rapide eldar", _BIG)
		.progress("25/08/2025", angest, 2, "Guerrier Nécron", _SMALL)
		.progress("25/08/2025", angest, 1, "Technomancien", _MEDIUM)
		.progress("25/08/2025", tony, 1, "Pataud", _SMALL)
		.progress("27/08/2025", whisp, 4, "Loups Funests", _MEDIUM)
		.progress("27/08/2025", whisp, 1, "Loups garou", _MEDIUM)
		.progress("27/08/2025", whisp, 3, "squelettes fantomatiques", _SMALL)
		.progress("27/08/2025", shionn, 5, "Knights Tidor", _SMALL)
		.progress("28/08/2025", whisp, 1, "Pirate", _SMALL)
		.progress("29/08/2025", whisp, 4, "Loup", _MEDIUM)
		.progress("30/08/2025", whisp, 1, "Roi Nain", _SMALL)
		.render();

	let q26 = new _quest("quest-26", "Construction d'une armurerie", "Peindre 30 figurines ou Décors", 30)
		.progress("31/08/2025", tony, 1, "Space Marine", _SMALL)
		.progress("02/09/2025", whisp, 3, "Gargouille", _SMALL)
		.progress("04/09/2025", whisp, 3, "Bibliothèques", _SMALL_DECOR)
		.progress("04/09/2025", whisp, 1, "Cheminée", _SMALL_DECOR)
		.progress("04/09/2025", whisp, 2, "Poteaux de direction", _SMALL_DECOR)
		.progress("04/09/2025", whisp, 2, "Pancartes", _SMALL_DECOR)
		.progress("04/09/2025", whisp, 8, "Portes de donjon", _SMALL_DECOR)
		.progress("05/09/2025", transfopaper, 1, "Squelette", _SMALL)
		.progress("05/09/2025", angest, 3, "Guerrier Necron", _SMALL)
		.progress("05/09/2025", angest, 1, "Deathmark", _SMALL)
		.progress("05/09/2025", angest, 1, "Immortel", _SMALL)
		.progress("05/09/2025", angest, 1, "Garde Royal", _SMALL)
		.progress("05/09/2025", angest, 1, "Chronomancien", _MEDIUM)
		.progress("05/09/2025", angest, 1, "Spectre Canoptek", _MEDIUM)
		.progress("05/09/2025", angest, 1, "Chevalier Arcanum", _MEDIUM)
		.render();

	let q27 = new _quest("quest-27", "Brasserie deviendra grande", "Peindre 30 figurines ou Décors", 30)
		.progress("06/09/2025", shionn, 4, "Rookery of Kril", _SMALL)
		.progress("06/09/2025", shionn, 1, "Rookery of Kril", _MEDIUM)
		.progress("08/09/2025", tony, 1, "Tau", _SMALL)
		.progress("11/09/2025", whisp, 1, "Calleche", _MEDIUM_DECOR)
		.progress("14/09/2025", shionn, 6, "Sournifleur", _MEDIUM)
		.progress("16/09/2025", angest, 1, "Troll BB", _MEDIUM)
		.progress("16/09/2025", angest, 1, "Minotaure BB", _MEDIUM)
		.progress("16/09/2025", angest, 4, "Rat des Clans", _SMALL)
		.progress("16/09/2025", transfopaper, 1, "Gobelin", _SMALL)
		.progress("17/09/2025", tony, 1, "Elmentaire de feu d'eau", _SMALL)
		.progress("20/09/2025", shionn, 1, "Decort de faction Gloom", _MEDIUM_DECOR)
		.progress("20/09/2025", shionn, 2, "Champi", _SMALL_DECOR)
		.progress("20/09/2025", shionn, 1, "Decort Col du Crane", _SMALL_DECOR)
		.progress("20/09/2025", shionn, 1, "Marqueur d'objectif gloom", _SMALL_DECOR)
		.progress("21/09/2025", angest, 3, "Loup Garous", _SMALL)
		.progress("21/09/2025", angest, 1, "Boss-ki-tue", _MEDIUM)
		.render();

	let q28 = new _quest("quest-28", "L'Attaque Surprise", "Peindre 20 figurines en 15 jours", 20)
		.progress("21/09/2025", angest, 2, "Skaven", _SMALL)
		.progress("22/09/2025", shionn, 2, "Diluc & Fishy", _MEDIUM)
		.progress("23/09/2025", tupad, 2, "Vypers", _MEDIUM)
		.progress("23/09/2025", tupad, 6, "Motojets", _MEDIUM)
		.progress("23/09/2025", tupad, 1, "Chasseur écarlate", _BIG)
		.progress("23/09/2025", tupad, 3, "Marcheur de Combat", _MEDIUM)
		.progress("23/09/2025", tupad, 4, "Lance Lumières", _MEDIUM)
		.render();

	let q29 = new _quest("quest-29", "Lvl Up Capitainerie", "Peindre 30 figurines ou Décors", 30)
		.progress("23/09/2025", tupad, 2, "Lance Lumières", _MEDIUM)
		.progress("23/09/2025", tupad, 7, "Orques Warcrow", _SMALL)
		.progress("23/09/2025", tupad, 1, "Apathée kharnages", _MEDIUM)
		.progress("23/09/2025", tupad, 1, "Éclaireur khemiste pour kharnages", _MEDIUM)
		.progress("23/09/2025", shionn, 2, "Chef ancient protector", _SMALL)
		.progress("23/09/2025", shionn, 4, "Elementair protector", _MEDIUM)
		.progress("25/09/2025", angest, 2, "Skaven", _SMALL)
		.progress("25/09/2025", whisp, 3, "Nains", _SMALL)
		.progress("25/09/2025", whisp, 7, "squelettes spectraux", _SMALL)
		.progress("25/09/2025", whisp, 1, "Table de Torture", _SMALL_DECOR)
		.render();

	let q30 = new _quest("quest-30", "Création Réserve", "Peindre 30 figurines ou Décors", 30)
		.progress("25/09/2025", whisp, 1, "Chaise Iron Maider", _SMALL_DECOR)
		.progress("25/09/2025", whisp, 2, "Cible d'entrainement", _SMALL_DECOR)
		.progress("25/09/2025", whisp, 2, "Ratelier", _SMALL_DECOR)
		.progress("26/09/2025", whisp, 1, "Chef squelettes spectral", _SMALL)
		.progress("27/09/2025", shionn, 1, "Chef Troggot", _BIG)
		.progress("28/09/2025", angest, 1, "Capitaine Terminator", _MEDIUM)
		.progress("30/09/2025", whisp, 1, "Necromancien", _SMALL)
		.progress("30/09/2025", tony, 1, "Fée violoniste", _SMALL)
		.progress("01/10/2025", tony, 1, "Buste Loup", _SMALL)
		.progress("02/10/2025", tony, 1, "Orcley Quinn", _MEDIUM)
		.progress("03/10/2025", whisp, 1, "Barbare", _SMALL)
		.progress("03/10/2025", whisp, 2, "Mannequin d'entrainement", _SMALL_DECOR)
		.progress("03/10/2025", whisp, 1, "Assassin", _SMALL)
		.progress("03/10/2025", whisp, 1, "Canard", _SMALL)
		.progress("03/10/2025", shionn, 6, "Heraut de la Peste", _SMALL)
		.progress("11/10/2025", phylios, 1, "Hyoga", _BIG)
		.addBadge("11/10/2025", phylios, _Gargantuesque) // not Auto
		.progress("11/10/2025", phylios, 1, "Truc degeux", _MEDIUM)
		.progress("12/10/2025", angest, 1, "Kobold", _MEDIUM)
		.progress("14/10/2025", whisp, 1, "Loup Mort Vivant", _MEDIUM)
		.progress("14/10/2025", whisp, 2, "Loup Géant", _MEDIUM)
		.progress("14/10/2025", whisp, 1, "Coffres", _SMALL)
		.render();

	let q31 = new _quest("quest-31", "On mène un Raid!", "Peindre 30 figurines en 15 jours", 30)
		.progress("14/10/2025", shionn, 5, "Heraut du froid", _SMALL)
		.progress("19/10/2025", shionn, 4, "Heraut de la faim", _SMALL)
		.progress("19/10/2025", shionn, 1, "Heraut de la faim", _MEDIUM)
		.progress("20/10/2025", angest, 1, "Bondisseur de Von Ryan", _MEDIUM)
		.progress("20/10/2025", angest, 1, "Loup-garou difforme", _SMALL)
		.progress("23/10/2025", whisp, 2, "Nains de taverne", _SMALL)
		.progress("24/10/2025", tupad, 16, "Guerrier du chaos", _SMALL)
		.render()

	let q32 = new _quest("quest-32", "Le Marché Noir!", "Peindre un max de firgurine en 15 jours", 100)
		.progress("24/10/2025", tupad, 20, "Guerrier du chaos", _SMALL)
		.progress("24/10/2025", tupad, 3, "Varanks", _SMALL)
		.progress("24/10/2025", tupad, 4, "Soldats et bot infinity", _SMALL)
		.progress("25/10/2025", angest, 1, "Skaven", _SMALL)
		.progress("25/10/2025", angest, 1, "Ghoul", _SMALL)
		.progress("25/10/2025", angest, 1, "Momie", _SMALL)
		.progress("25/10/2025", angest, 2, "Infernus", _SMALL)
		.progress("25/10/2025", angest, 1, "Bondisseur", _SMALL)
		.progress("25/10/2025", shionn, 24, "Troupeau de squig", _SMALL)
		.progress("25/10/2025", shionn, 1, "Gromgrimdal", _MEDIUM)
		.progress("26/10/2025", tupad, 12, "Guerrier du chaos", _SMALL)
		.progress("27/10/2025", whisp, 1, "Djinn", _SMALL)
		.progress("28/10/2025", tony, 1, "Golem", _MEDIUM)
		.progress("30/10/2025", tony, 1, "Orc", _SMALL)
		.progress("01/11/2025", transfopaper, 1, "Momie", _SMALL)
		.progress("04/11/2025", tony, 1, "Space marine", _SMALL)
		.render();

	let q33 = new _quest("quest-33", "Création Réserve", "Peindre 30 figurines ou Décors", 30)
		.progress("14/10/2025", whisp, 3, "Coffres", _SMALL)
		.progress("27/10/2025", transfopaper, 1, "Ratelier", _SMALL);

//
	_renderPlayers([angest, anuabi, ben, faran, hyasull, ludovic5799, phylios, rahanis, shionn, tony, transfopaper, tupad, whisp]);
	_renderQuests([q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24, q25, q26, q27, q28, q29, q30, q31, q32]);

});
