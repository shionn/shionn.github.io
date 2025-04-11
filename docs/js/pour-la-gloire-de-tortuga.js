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
	const _CAPTAIN_GRADES = ["Capitaine Déchu", "Capitaine Maudit", "Capitaine", "Capitaine Cendré", "Capitaine Tenebreux", "Capitaine Supreme"];
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
		this.captain = false;
		this.badges = [];
		this.quests = [];

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
				case _LVL_UP: return "passe " + desc;
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
			if (player.gainXp(count, type.xp)) {
				this.history.push(new _history(_LVL_UP, date, player, player.lvl, player.grade()));
				while(player.gainXp(0,0)) {
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
				badge.append(q("<i>").attr("class", _BADGE[b].icon));
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
			if (b.revealed) {
				body.append(q("<tr>").append(q("<td>").attr("colspan", 6).addClass("badge").append(q("<i>").attr("class", b.icon)).append(q("<strong>").text(b.name + ": " )).append(q("<span>").text(b.description))));
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
		new _badge("Coup Final", "fa fa-flag", "Achever une quête", true), 
		new _badge("Populeux", "ra ra-rabbit", "Envoyer 10 petites figurines d'un coup", true),
		new _badge("Bourrin", "ra ra-octopus", "Envoyer 5 figurines moyenne d'un coup", false), // TODO true
		new _badge("Massif", "ra ra-dragon", "Envoyer 2 grande figurines d'un coup", true), 
		new _badge("Petit/Gros", "ra ra-two-dragons", "Envoyer une petite figurine et une grande dans la même quête", true), // 4 
		new _badge("Petit/Moyen/Gros", "ra ra-hydra", "Envoyer une figurine de chaque taille dans la même quête", true), 
		new _badge("Mitraillette", "ra ra-barbed-arrow", "Faire 3 contributions à la même quête", true), 
		new _badge("Gatling", "ra ra-arrow-cluster", "Faire 5 contributions à la même quête", true), 
		new _badge("One shot", "ra ra-lightning-storm", "Accomplir une quête d'un seul coup", true), 
		new _badge("Vague", "ra ra-double-team ", "Envoyer 20 figurine lors de la même quête", true),
		
		new _badge("Uzi", "ra ra-bullets", "Faire 10 contributions à la même quête", false),
		new _badge("Gargantuesque", "ra ra-monster-skull", "Peindre une très grosse figurine (>=100mm)", false), // 11 TODO true
		new _badge("Bon plan", "fa fa-thumbs-up", "Faire profiter la commu d'un bon plan", true), // 12
		new _badge("Ten", "fa fa-battery-quarter", "Participer à 10 quête différente", true), 
		new _badge("Twenty", "fa fa-fa-battery-half", "Participer à 20 quête différente", false),
		new _badge("Du cailloux à la Tour", "ra ra-tower", "Envoyer un décors de chaque taille dans la même quête", true), 
		new _badge("Decorama", "ra ra-castle-emblem", "Envoyer 15 décors dans la même quête", true), 
		new _badge("Dernier clou", "ra ra-ankh", "Achever une quête avec un décor", true), 
		new _badge("Collectionneur", "ra ra-player", "Obtenir 8 badges", true),
		new _badge("Presque tous", "ra ra-muscle-up", "Obtenir presque tous les badges", false),
		
		new _badge("Gotha'em all", "ra ra-queen-crown", "Obtenir tous les badge", false),
	);
	
	const _PetitGros = 4;
	const _Gargantuesque = 11;
	const _BonPlan = 12;

	
	let angest = new _player("Angest", "pirate12.png"); 
	let anuabi = new _player("Anuabi", "pirate12.png");
	let faran = new _player("Faran", "pirate16.png");
	let hyasull = new _player("Hyasull", "pirate13.png");
	let ludovic5799 = new _player("Ludovic5799", "pirate01.png");
	let phylios = new _player("Phylios", "pirate07.png"); 
	let rahanis = new _player("Rahanis Sylvéclat", "pirate09.png");
	let shionn = new _player("Shionn", "pirate02.png");
	let tupad = new _player("Tupad_", "pirate07.png");
	let tony = new _player("Tony", "pirate14.png");
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
		.addBadge("17/02/2025", shionn, _Gargantuesque)
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
		.progress("02/03/2025", shionn, 2, "Hutte D&L", _SMALL_DECOR)
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
		.progress("10/04/2025", shionn, 9, "Gitz de Zarbag", _SMALL)
		.progress("10/04/2025", angest, 10, "Sirene, Flageleur et Villageois", _SMALL)
		.render();


//	let q13 = new _quest("quest-13", "LTODO", "Peindre 50 figurines ou Décors", 50)
//		.progress("03/04/2025", whisp, 2, "Porte modulaire", _SMALL_DECOR)
//		.progress("03/04/2025", whisp, 3, "Dalle modulaire", _SMALL_DECOR)
//		.progress("03/04/2025", whisp, 3, "Long mur modulaire", _MEDIUM_DECOR)
//		.render();

		
//			
	_renderPlayers([angest, anuabi, faran, hyasull, ludovic5799, phylios, rahanis, shionn, tony, tupad, whisp]);
	_renderQuests([q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12]);

});
