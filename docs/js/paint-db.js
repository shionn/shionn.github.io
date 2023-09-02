'use strict';

const VJ = "Vallejo";
const GW = "Cidatel";
const OLD_GW = "Old Citadel";
const AP = "Army Painter";
const GSW = "Green Stuff World";


let _paint = function(brand, id, name, hex = null, legacy = false) {
	this.id = id;
	this.brand = brand;
	this.name = name;
	this.hex = hex;
	this.legacy = legacy;
	this.equivalences = new Array();
}

_paint.prototype.addEquivalence = function(equivalence) {
	this.equivalences = this.equivalences.concat(equivalence);
}

_paint.prototype.haveId = function() {
	return (""+this.id).indexOf("old") < 0;
}

_paint.prototype.asGW = function() {
	if (this.equivalences.length>0) {
		return paint(this.equivalences[0]?.ids[1]);
	}
	return null;
}

_paint.prototype.asAP = function() {
	if (this.equivalences.length>0) {
		return paint(this.equivalences[0]?.ids[3]);
	}
	return null;
}

_paint.prototype.asGSW = function() {
	if (this.equivalences.length>0) {
		return paint(this.equivalences[0]?.ids[4]);
	}
	return null;
}

let paints = new Map();

let paint = function(id) {
	return paints.get(id);
}

let _cPnt = function(brand, id, name, hex = null, legacy = false) {
	const p = new _paint(brand, id, name, hex, legacy);
	paints.set(id, p);
	return p;
}

_cPnt(VJ, 72001, "Dead White", "#ffffff");
_cPnt(VJ, 72002, "White Primer", null,  true);
_cPnt(VJ, 72003, "Pale Flesh", "#c59f7d");
_cPnt(VJ, 72004, "Elf Skin Tone", "#cb8757");
_cPnt(VJ, 72005, "Moon Yellow", "#f9b335");
_cPnt(VJ, 72006, "Sun Yellow", "#ff9f30");
_cPnt(VJ, 72007, "Gold Yellow", "#e57429");
_cPnt(VJ, 72008, "Orange Fire", "#ff6027");
_cPnt(VJ, 72009, "Hot Orange", "#fe4626");
_cPnt(VJ, 72010, "Bloody Red", "#ed311d");
_cPnt(VJ, 72011, "Gory Red", "#7e1f22");
_cPnt(VJ, 72012, "Scarlet Red", "#751e21");
_cPnt(VJ, 72013, "Squid Pink", "#c476ac");
_cPnt(VJ, 72014, "Warlord Purple", "#802556");
_cPnt(VJ, 72015, "Hexed Lichen", "#3c245a");
_cPnt(VJ, 72016, "Royal Purple", "#241f39");
_cPnt(VJ, 72017, "Dark Blue", null, true);
_cPnt(VJ, 72018, "Stormy Blue", null, true);
_cPnt(VJ, 72019, "Night Blue", "#182232");
_cPnt(VJ, 72020, "Imperial Blue", "#19294b");
_cPnt(VJ, 72021, "Magic Blue", "#0072b1");
_cPnt(VJ, 72022, "Ultram. Blue", "#23396f");
_cPnt(VJ, 72023, "Electric Blue", "#3fa1b4");
_cPnt(VJ, 72024, "Turquoise", "#126766");
_cPnt(VJ, 72025, "Fool Green", "#25b388");
_cPnt(VJ, 72026, "Jade Green", "#107b5b");
_cPnt(VJ, 72027, "Scurvy Green", "#1d4e45");
_cPnt(VJ, 72028, "Dark Green", "#1a3325");
_cPnt(VJ, 72029, "Sick Green", "#39643a");
_cPnt(VJ, 72030, "Goblin Green", "#4c6136");
_cPnt(VJ, 72031, "Camouflage Green", "#847838");
_cPnt(VJ, 72032, "Scorpy Green", "#4b8a3d");
_cPnt(VJ, 72033, "Livery Green", null, true);
_cPnt(VJ, 72034, "Bone White", "#b6a174");
_cPnt(VJ, 72035, "Dead Flesh", "#bca858");
_cPnt(VJ, 72036, "Bronze Brown", "#b56829");
_cPnt(VJ, 72037, "Filthy Brown", null, true);
_cPnt(VJ, 72038, "Scrofulous Brown", "#a76626");
_cPnt(VJ, 72039, "Plague Brown", "#aa7137");
_cPnt(VJ, 72040, "Leather Brown", "#895d2e");
_cPnt(VJ, 72041, "Dwarf Skin", null, true);
_cPnt(VJ, 72042, "Parasite Brown", "#a35a24");
_cPnt(VJ, 72043, "Beasty Brown", "#754f27");
_cPnt(VJ, 72044, "Dark Fleshtone", "#563229");
_cPnt(VJ, 72045, "Charred Brown", "#382728");
_cPnt(VJ, 72046, "Ghost Grey", null, true);
_cPnt(VJ, 72047, "Wolf Grey", "#b4d1ce");
_cPnt(VJ, 72048, "Sombre Grey", "#435f6c");
_cPnt(VJ, 72049, "Stonewall Grey", "#8e9383");
_cPnt(VJ, 72050, "Neutral Grey", "#616e63");
_cPnt(VJ, 72051, "Black", "#030104");
_cPnt(VJ, 72052, "Silver", "#a3b8b7");
_cPnt(VJ, 72053, "Chainmail", "#85999e");
_cPnt(VJ, 72054, "Dark Gunmetal", "#5e6e73");
_cPnt(VJ, 72055, "Polished Gold", "#efb240");
_cPnt(VJ, 72056, "Glorious Gold", "#de8b37");
_cPnt(VJ, 72057, "Bright Bronze", "#ab571b");
_cPnt(VJ, 72058, "Brassy Brass", "#ae6640");
_cPnt(VJ, 72059, "Hammered Copper", "#744331");
_cPnt(VJ, 72060, "Tinny Tin", "#4f2827");
_cPnt(VJ, 72061, "Khaki", "#917c50");
_cPnt(VJ, 72062, "Earth", "#6e5432");
_cPnt(VJ, 72063, "Desert Yellow", "#956837");
_cPnt(VJ, 72064, "Yellow Olive", null, true);
_cPnt(VJ, 72065, "Terracotta", null, true);
_cPnt(VJ, 72066, "Tan", "#8e6151");
_cPnt(VJ, 72067, "Cayman Green", "#50512b");
_cPnt(VJ, 72068, "Smokey Ink");
_cPnt(VJ, 72071, "Barbarian Skin", "#8b6544");
_cPnt(VJ, 72076, "Alien Purple", "#5664b4");
_cPnt(VJ, 72082, "White Ink", "#ffffff");
_cPnt(VJ, 72083, "Magenta Ink", "#a72b5c");
_cPnt(VJ, 72084, "Dark Turquoise Ink", "#13778d");
_cPnt(VJ, 72085, "Yellow Ink", "#f8a535");
_cPnt(VJ, 72086, "Red Ink", "#e72b19");
_cPnt(VJ, 72087, "Violet Ink", "#5b3e7c");
_cPnt(VJ, 72088, "Blue Ink", "#0b5798");
_cPnt(VJ, 72089, "Green Ink", "#1e7638");
_cPnt(VJ, 72090, "Black Green Ink", "#34654c");
_cPnt(VJ, 72091, "Sepia Ink", "#4d3d29");
_cPnt(VJ, 72092, "Brown", null, true);
_cPnt(VJ, 72093, "Skin Ink", "#572a29");
_cPnt(VJ, 72094, "Black Ink", "#030104");
_cPnt(VJ, 72095, "Glacier blue", "#bedaf0");

_cPnt(VJ, 72096, "Verdigris", "#75d0ad");
_cPnt(VJ, 72097, "Pale Yellow", null, true);
_cPnt(VJ, 72098, "Elfic Flesh", "#e8d3b4");
_cPnt(VJ, 72099, "Skin Tone", "#e8a782");
_cPnt(VJ, 72100, "Rosy Flesh", "#f08769");
_cPnt(VJ, 72101, "Off White", "#fff0d7");
_cPnt(VJ, 72102, "Steel Grey", "#6795a2");
_cPnt(VJ, 72103, "Fluo Yellow", "#eee55e");
_cPnt(VJ, 72104, "Fluo Green", "#6ac248");
_cPnt(VJ, 72105, "Mutation Green", true);
_cPnt(VJ, 72106, "Scarlet Blood", "#d52f23");
_cPnt(VJ, 72107, "Anthea Skin", "#d05d55");
_cPnt(VJ, 72108, "Succubs Skin", "#8f3f4a");
_cPnt(VJ, 72109, "Toxic Yellow", "#e7d268");
_cPnt(VJ, 72110, "Sunset Orange", "#ff9345");
_cPnt(VJ, 72111, "Nocturnal Red", "#4d1926");
_cPnt(VJ, 72112, "Evil Red", "#3c1a27");
_cPnt(VJ, 72113, "Deep Magenta", "#5b2344");
_cPnt(VJ, 72114, "Lustful Purple", "#aa89c3");
_cPnt(VJ, 72115, "Grunge Brown", "#864327");
_cPnt(VJ, 72116, "Midnight Purple", "#241b36");
_cPnt(VJ, 72117, "Elfic Blue", "#3e6480");
_cPnt(VJ, 72118, "Sunrise Blue", "#62d3ee");
_cPnt(VJ, 72119, "Aquamarine", "#208579");
_cPnt(VJ, 72120, "Abyssal Turquoise", "#153f59");
_cPnt(VJ, 72121, "Ghost Green", "#72ca98");
_cPnt(VJ, 72122, "Bile Green", "#cdda49");
_cPnt(VJ, 72123, "Angel Green", "#2d4f2e");
_cPnt(VJ, 72124, "Gorgon Brown", "#522c27");
_cPnt(VJ, 72140, "Heavy Skint.", null, true);
_cPnt(VJ, 72141, "Heavy Red", null, true);
_cPnt(VJ, 72142, "Heavy Violet", null, true);
_cPnt(VJ, 72143, "Heavy Blue", null, true);
_cPnt(VJ, 72144, "Heavy Bluegr.", null, true);
_cPnt(VJ, 72145, "Dirty Grey", "#5e5f33");
_cPnt(VJ, 72146, "Heavy Green", null, true);
_cPnt(VJ, 72147, "H. Black Green", null, true);
_cPnt(VJ, 72148, "Warm Grey", "#a59c9b");
_cPnt(VJ, 72149, "Heavy Kakhi", null, true);
_cPnt(VJ, 72150, "Heavy Ocre", null, true);
_cPnt(VJ, 72151, "Heavy Gold Br.", null, true);
_cPnt(VJ, 72152, "Heavy Orange", null, true);
_cPnt(VJ, 72153, "Heavy Brown", null, true);
_cPnt(VJ, 72154, "Heavy Sienna", null, true);
_cPnt(VJ, 72155, "Charcoal", "#2c3339");
_cPnt(VJ, 72156, "Fluo Orange", "#ff561d");
_cPnt(VJ, 72157, "Fluo Red", "#f23e57");
_cPnt(VJ, 72158, "Fluo Magenta", "#fb49a3");
_cPnt(VJ, 72159, "Fluo Violet", "#582788");
_cPnt(VJ, 72160, "Fluo Blue", "#0093d5");
_cPnt(VJ, 72161, "Fluo Cold Green", "#6ac248");

_cPnt(VJ, 72200, "Sepia Wash", "#875f32");
_cPnt(VJ, 72201, "Black Wash", "#2a2d34");
_cPnt(VJ, 72203, "Umber Wash", "#675d53");
_cPnt(VJ, 72204, "Flesh Wash", "#b37c77");
_cPnt(VJ, 72206, "Red Wash", "#de638e");
_cPnt(VJ, 72207, "Blue Wash", "#1e77c1");
_cPnt(VJ, 72208, "Yellow Wash", "#d7dd44");
_cPnt(VJ, 72209, "Violet Wash", "#3e3393");

_cPnt(VJ, 72401, "Templar White");
_cPnt(VJ, 72402, "Dwarf Skin");
_cPnt(VJ, 72403, "Imperial Yellow");
_cPnt(VJ, 72404, "Nuclear Yellow");
_cPnt(VJ, 72405, "Martian Orange");
_cPnt(VJ, 72406, "Plasma Red");
_cPnt(VJ, 72407, "Velvet Red");
_cPnt(VJ, 72408, "Cardinal Purple");
_cPnt(VJ, 72409, "Deep Purple");
_cPnt(VJ, 72410, "Gloomy Violet");
_cPnt(VJ, 72411, "Mystic Blue");
_cPnt(VJ, 72412, "Storm Blue");
_cPnt(VJ, 72413, "Omega Blue");
_cPnt(VJ, 72414, "Caribbean Turquoise");
_cPnt(VJ, 72415, "Orc Skin");
_cPnt(VJ, 72416, "Troll Green");
_cPnt(VJ, 72417, "Snake Green");
_cPnt(VJ, 72418, "Lizard Green");
_cPnt(VJ, 72419, "Plague Green");
_cPnt(VJ, 72420, "Wasteland Brown");
_cPnt(VJ, 72421, "Cpper Brown");
_cPnt(VJ, 72422, "Space Grey");
_cPnt(VJ, 72423, "Black Lotus");
_cPnt(VJ, 72448, "Xpress Medium");
_cPnt(VJ, 72750, "Cold Grey");

_cPnt(VJ, 73200, "Sepia Wash");
_cPnt(VJ, 73201, "Black Wash");
_cPnt(VJ, 73202, "Pale Grey Wash", null, true);
_cPnt(VJ, 73203, "Umber Wash");
_cPnt(VJ, 73204, "Flesh Wash");
_cPnt(VJ, 73205, "Green Wash", null, true);
_cPnt(VJ, 73206, "Red Wash");
_cPnt(VJ, 73207, "Blue Wash");
_cPnt(VJ, 73208, "Yellow Wash");
_cPnt(VJ, 73209, "Violet Wash");

_cPnt(GW, "21-01", "Averland Sunset", "#fbb81c");
_cPnt(GW, "21-02", "Jokaero Orange", "#ed3814");
_cPnt(GW, "21-03", "Mephiston Red", "#960c09");
_cPnt(GW, "21-04", "Khorne Red", "#650001");
_cPnt(GW, "21-05", "Naggaroth Night", "#3b2b50");
_cPnt(GW, "21-06", "Daemonette Hide", "#655f81");
_cPnt(GW, "21-07", "Kantor Blue", "#02134e");
_cPnt(GW, "21-08", "Macragge Blue", "#0f3d7c");
_cPnt(GW, "21-09", "Caledor Sky", "#366699");
_cPnt(GW, "21-10", "Stegadon Scale Green", "#06455d");
_cPnt(GW, "21-11", "Incubi Darkness", "#082e32");
_cPnt(GW, "21-12", "Caliban Green", "#003d15");
_cPnt(GW, "21-13", "Waaagh ! Flesh", "#0b3b36");
_cPnt(GW, "21-14", "Castellan Green","#264715");
_cPnt(GW, "21-15", "Death W. Forest", "#556229");
_cPnt(GW, "21-16", "Zandri Dust", "#988e56");
_cPnt(GW, "21-17", "Steel Legion Drab", "#584e2d");
_cPnt(GW, "21-18", "Bugmans Glow", "#804c43");
_cPnt(GW, "21-19", "Ratskin Flesh", "#a86648");
_cPnt(GW, "21-20", "Mournfang Brown", "#490f06");
_cPnt(GW, "21-21", "XV88", "#6c4811");
_cPnt(GW, "21-22", "Rinox Hide", "#462f30");
_cPnt(GW, "21-23", "Dryad Bark", "#2b2a24");
_cPnt(GW, "21-24", "Mechanicus SG", "#39484a");
_cPnt(GW, "21-25", "Abbadon Black", "#000000");
_cPnt(GW, "21-26", "Celestra Grey", "#8ba3a3");
_cPnt(GW, "21-27", "Rakath Flesh", "#9c998d");
_cPnt(GW, "21-28", "Leadbelcher");
_cPnt(GW, "21-29", "Balthazar Gold");
_cPnt(GW, "21-30", "Screaming Bell");
_cPnt(GW, "21-31", "WarplockBronze");
_cPnt(GW, "21-32", "The Fang", "#405b71");
_cPnt(GW, "21-33", "Screamer Pink", "#7a0e44");
_cPnt(GW, "21-34", "Tallarn Sand");
_cPnt(GW, "21-35", "Retributor Armour");
_cPnt(GW, "21-36", "Thousand Sons Blue", "#00506f");
_cPnt(GW, "21-37", "Death Guard Green", "#6d774d");
_cPnt(GW, "21-39", "Phoenician Purple", "#440052");
_cPnt(GW, "21-41", "Gal Vorbak Red", "#4b213c");
_cPnt(GW, "21-42", "Night Lord Blue", "#002b5c");
_cPnt(GW, "21-44", "Corvus Black", "#171314");
_cPnt(GW, "21-49", "Barak-Nar Burgundy", "#451636");
_cPnt(GW, "21-52", "Corax White", "#ffffff");
_cPnt(GW, "21-54", "Grey Seer", "#a2a5a7");
_cPnt(GW, "21-55", "Runelord Brass");



_cPnt(GW, "22-01", "Yriel Yellow", "#ffd900");
_cPnt(GW, "22-02", "Flash Gitz Yellow", "#fff300");
_cPnt(GW, "22-03", "Troll Slayer Orange", "#f16c23");
_cPnt(GW, "22-04", "Fire Dragon Bright", "#f4874e");
_cPnt(GW, "22-05", "Evil Sunz Scarlet", "#c01411");
_cPnt(GW, "22-06", "Wild Rider Red", "#e82e1b");
_cPnt(GW, "22-07", "Wazdakka Red", "#880804");
_cPnt(GW, "22-09", "Xereus Purple", "#47125a");
_cPnt(GW, "22-10", "Genestealer Purple", "#7658a5");
_cPnt(GW, "22-12", "Slaanesh Grey", "#8b8893");
_cPnt(GW, "22-11", "Warpfiend Grey", "#66656e");
_cPnt(GW, "22-14", "Hoeth Blue", "#4c78af");
_cPnt(GW, "22-15", "Altdorf Guard Blue", "#2d4696");
_cPnt(GW, "22-16", "Calgar Blue", "#2a497f");
_cPnt(GW, "22-17", "Teclis Blue", "#3877bf");
_cPnt(GW, "22-18", "Lothern Blue", "#2c9bcc");
_cPnt(GW, "22-19", "Sotek Green", "#0b6371");
_cPnt(GW, "22-20", "Temple Guard Blue", "#239489");
_cPnt(GW, "22-21", "Kabalite Green", "#008962");
_cPnt(GW, "22-22", "Sybarite Green", "#17a166");
_cPnt(GW, "22-23", "Warpstone Glow", "#0f702a");
_cPnt(GW, "22-24", "Moot Green", "#3daf44");
_cPnt(GW, "22-25", "Warboss Green", "#317e57");
_cPnt(GW, "22-26", "Skarsnik Green", "#588f6b");
_cPnt(GW, "22-27", "Loren Forest", "#486c25");
_cPnt(GW, "22-29", "Nurgling Green", "#7e975e");
_cPnt(GW, "22-30", "Elysian Green", "#6b8c37");
_cPnt(GW, "22-31", "Ogryn Camo", "#96a648");
_cPnt(GW, "22-32", "Ushabti Bone", "#aba173");
_cPnt(GW, "22-33", "Screaming Skull", "#b9c099");
_cPnt(GW, "22-34", "Tallarn Sand", "#a07409");
_cPnt(GW, "22-35", "Karak Stone", "#b7945c");
_cPnt(GW, "22-36", "Cadian Fleshtone", "#c47652");
_cPnt(GW, "22-37", "Kislev Flesh", "#d1a570");
_cPnt(GW, "22-38", "Bestigor Flesh", "#d1a570");
_cPnt(GW, "22-39", "Ungor Flesh", "#d1a560");
_cPnt(GW, "22-40", "Skrag Brown", "#8b4806");
_cPnt(GW, "22-41", "Death claw brown", "#af634f");
_cPnt(GW, "22-42", "Tau Light Ochre", "#bc6b10");
_cPnt(GW, "22-43", "Balor Brown");
_cPnt(GW, "22-44", "Zamesi Desert", "#d89d1b");
_cPnt(GW, "22-45", "Doombull Brown", "#570003");
_cPnt(GW, "22-46", "Tuskgor Fur", "#863231");
_cPnt(GW, "22-47", "Gorthor Brown", "#5f463f");
_cPnt(GW, "22-48", "Baneblade Brown", "#8f7c68");
_cPnt(GW, "22-49", "Dawnstone", "#697068");
_cPnt(GW, "22-50", "Administratum Grey", "#989c94");
_cPnt(GW, "22-51", "Eshin Grey", "#484b4e");
_cPnt(GW, "22-52", "Dark Reaper", "#354d4c");
_cPnt(GW, "22-54", "Skavenblight Dinge", "#45413b");
_cPnt(GW, "22-55", "Stormvermin Fur", "#6d655f");
_cPnt(GW, "22-56", "Ulthuan Grey", "#c4ddd5");
_cPnt(GW, "22-57", "White Scar", "#ffffff");
_cPnt(GW, "22-58", "Pallid Wych Flesh", "#caccbb");
_cPnt(GW, "22-59", "Ironbreaker");
_cPnt(GW, "22-60", "Runefang Steel");
_cPnt(GW, "22-61", "Gehenna's Gold");
_cPnt(GW, "22-62", "Auric Armor Gold");
_cPnt(GW, "22-63", "Hashut Copper");
_cPnt(GW, "22-65", "Brass Scorpion");
_cPnt(GW, "22-67", "Russ Grey", "#507085");
_cPnt(GW, "22-68", "Fenrisian Grey", "#6d94b3");
_cPnt(GW, "22-69", "Pink Horror", "#8e2757");
_cPnt(GW, "22-70", "Emperor's Children", "#b74073");
_cPnt(GW, "22-72", "Flayed One Flesh", "#eec483");
_cPnt(GW, "22-75", "Stormhost Silver");
_cPnt(GW, "22-78", "Gauss Blaster Green", "#7fc1a5");
_cPnt(GW, "22-79", "Baharroth Blue", "#54bdca");
_cPnt(GW, "22-80", "Dorn Yellow", "#fff55a");
_cPnt(GW, "22-81", "Fulgrim Pink", "#f3abca");
_cPnt(GW, "22-82", "Dechala Lilac", "#b598c9");
_cPnt(GW, "22-83", "Krieg Khaki", "#bcbb7e");
_cPnt(GW, "22-84", "Blue Horror", "#9eb5ce");
_cPnt(GW, "22-85", "Lugganath Orange", "#f69b82");
_cPnt(GW, "22-91", "Word Bearers Red", "#620104");

_cPnt(GW, "23-14", "Golden Griffon");

_cPnt(GW, "24-02", "Fuegan Orange");
_cPnt(GW, "24-03", "Carroburg Crimson");
_cPnt(GW, "24-04", "Druchii Violet");
_cPnt(GW, "24-05", "Drakenhof Nightshade");
_cPnt(GW, "24-07", "Biel-Tan Green");
_cPnt(GW, "24-08", "Athonian Camoshade");
_cPnt(GW, "24-09", "Seraphin Sepia");
_cPnt(GW, "24-10", "Reikland Fleshshade");
_cPnt(GW, "24-11", "Agrax Earthshade");
_cPnt(GW, "24-12", "Nuln Oil");

_cPnt(GW, "27-06", "Nihilakh Oxide");
_cPnt(GW, "27-19", "Nighthaunt Gloom");

_cPnt(GW, "28-09", "Deathworld Forest");

_cPnt(GW, "29-10", "Iyanden Yellow");
_cPnt(GW, "29-12", "Blood Angels Red");
_cPnt(GW, "29-13", "Flesh Tearers Red");
_cPnt(GW, "29-14", "Volupus Pink");
_cPnt(GW, "29-18", "Ultramarines Blue");
_cPnt(GW, "29-23", "Creed Camo");
_cPnt(GW, "29-24", "Militarum Green");
_cPnt(GW, "29-27", "Snakebite Leather");
_cPnt(GW, "29-28", "Gore-grunta Fur");
_cPnt(GW, "29-30", "Wyldwood");
_cPnt(GW, "29-32", "Guilliman Flesh");
_cPnt(GW, "29-33", "Darkoath Flesh");
_cPnt(GW, "29-34", "Apothecary White");
_cPnt(GW, "29-39", "Talassar Blue");
_cPnt(GW, "29-47", "Mantis Warrior Green");
_cPnt(GW, "29-48", "Aeldari Emerald");
_cPnt(GW, "29-50", "Karandras Green");
_cPnt(GW, "29-54", "Imperial Fist");
_cPnt(GW, "29-55", "Kroxigor Scales");
_cPnt(GW, "29-56", "Briar Queen Chill");
_cPnt(GW, "29-60", "Celestium Blue");
_cPnt(GW, "29-63", "Luxion Purple");
_cPnt(GW, "29-66", "Doomfire Magenta");
_cPnt(GW, "29-68", "Magmadroth Flame");

_cPnt(AP, "WP1101", "Matt Black", "#0c0c0c");
_cPnt(AP, "WP1102", "Matt White", "#ffffff");
_cPnt(AP, "WP1104", "Pure Red", "#df2b1a");
_cPnt(AP, "WP1105", "Dragon Red", "#a32118");
_cPnt(AP, "WP1106", "Lava Orange", "#f5471c");
_cPnt(AP, "WP1107", "Daemonic Yellow", "#fff8de");
_cPnt(AP, "WP1108", "Necrotic Flesh", "#b6c690");
_cPnt(AP, "WP1109", "Goblin Green", "#41963f");
_cPnt(AP, "WP1110", "Army Green", "#4f7434");
_cPnt(AP, "WP1111", "Greenskin", "#1f6831");
_cPnt(AP, "WP1112", "Angel Green", "#1b341d");
_cPnt(AP, "WP1113", "Electric Blue", "#428ec0");
_cPnt(AP, "WP1114", "Crystal Blue", "#1c7fc3");
_cPnt(AP, "WP1115", "Ultramarine Blue", "#0f5286");
_cPnt(AP, "WP1116", "Deep Blue", "#0f3c5a");
_cPnt(AP, "WP1117", "Ash Grey", "#9fa9a3");
_cPnt(AP, "WP1118", "Uniform Grey", "#51686e");
_cPnt(AP, "WP1119", "Wolf Grey", "#497e91");
_cPnt(AP, "WP1120", "Monster Brown", "#8b5b22");
_cPnt(AP, "WP1121", "Desert Yellow", "#c99f32");
_cPnt(AP, "WP1122", "Fur Brown", "#ac381b");
_cPnt(AP, "WP1123", "Leather Brown", "#824d1e");
_cPnt(AP, "WP1124", "Oak Brown", "#877466");
_cPnt(AP, "WP1125", "Skeleton Bone", "#d6cc9e");
_cPnt(AP, "WP1126", "Barbarian Flesh", "#f59955");
_cPnt(AP, "WP1127", "Tanned Flesh", "#c66c4e");
_cPnt(AP, "WP1128", "Alien Purple", "#312371");
_cPnt(AP, "WP1129", "Shining Silver");
_cPnt(AP, "WP1130", "Plate Mail Metal");
_cPnt(AP, "WP1131", "Gun Metal");
_cPnt(AP, "WP1132", "Greedy Gold");
_cPnt(AP, "WP1133", "Weapon Bronze");
_cPnt(AP, "WP1134", "Soft Tone Ink");
_cPnt(AP, "WP1135", "Strong Tone Wash");
_cPnt(AP, "WP1136", "Dark Tone Ink");
_cPnt(AP, "WP1137", "Green Tone Wash");
_cPnt(AP, "WP1138", "Red Tone Ink");
_cPnt(AP, "WP1139", "Blue Tone Ink");
_cPnt(AP, "WP1140", "Purple Tone Ink");
_cPnt(AP, "WP1141", "Hydra Turquoise", "#26999f");
_cPnt(AP, "WP1142", "Chaotic Red", "#6f2114");
_cPnt(AP, "WP1143", "Flesh Wash");

_cPnt(AP, "WP1211", "Prison Jumpsuit");
_cPnt(AP, "WP1221", "Machinegun Metal");
_cPnt(AP, "WP1231", "Bright Gold");

_cPnt(AP, "WP1401", "Abomination Gore", "#ae2f20");
_cPnt(AP, "WP1402", "Arid Earth", "#fff0c9");
_cPnt(AP, "WP1403", "Babe Blond", "#ffd83c");
_cPnt(AP, "WP1404", "Banshee Brown", "#c9bba0");
_cPnt(AP, "WP1405", "Basilisk Brown", "#db822a");
_cPnt(AP, "WP1406", "Brainmatter Beige", "#f6f6e7");
_cPnt(AP, "WP1407", "Castle Grey", "#858b80");
_cPnt(AP, "WP1408", "Centaur Skin", "#e8b3a6");
_cPnt(AP, "WP1410", "Commando Green", "#838034");
_cPnt(AP, "WP1411", "Corpse Pale", "#f5d2b2");
_cPnt(AP, "WP1412", "Crusted Sore");
_cPnt(AP, "WP1413", "Crypt Wraith", "#575f4a");
_cPnt(AP, "WP1414", "Cultist Robe", "#707362");
_cPnt(AP, "WP1415", "Dark Sky", "#2a4d5e");
_cPnt(AP, "WP1416", "Dirt Spatter", "#62361f");
_cPnt(AP, "WP1417", "Drake Tooth", "#d4d6be");
_cPnt(AP, "WP1418", "Dungeon Grey", "#5d6c72");
_cPnt(AP, "WP1419", "Elemental Bolt", "#269577");
_cPnt(AP, "WP1420", "Elf Green", "#495121");
_cPnt(AP, "WP1421", "Elven Flesh", "#ffbe94");
_cPnt(AP, "WP1424", "Filthy Cape", "#797959");
_cPnt(AP, "WP1425", "Dark Stone", "#575650");
_cPnt(AP, "WP1426", "Fire Lizard", "#e66b24");
_cPnt(AP, "WP1427", "Fog Grey", "#6e9db5");
_cPnt(AP, "WP1428", "Gorgon Hide", "#d1deec");
_cPnt(AP, "WP1429", "Griffon Blue", "#13427b");
_cPnt(AP, "WP1430", "Hardened Carapace", "#404238");
_cPnt(AP, "WP1431", "Hemp Rope", "#997d36");
_cPnt(AP, "WP1432", "Ice Storm", "#58a6d0");
_cPnt(AP, "WP1433", "Jungle Green", "#88af3f");
_cPnt(AP, "WP1434", "Kobold Skin", "#d3ad89");
_cPnt(AP, "WP1435", "Kraken Skin", "#6cc789");
_cPnt(AP, "WP1436", "Mars Red", "#c4392f");
_cPnt(AP, "WP1437", "Toxic Mist", "#47c5c4");
_cPnt(AP, "WP1438", "Moon Dust", "#eed46e");
_cPnt(AP, "WP1439", "Mouldy Clothes");
_cPnt(AP, "WP1440", "Mummy Robes", "#ede1da");
_cPnt(AP, "WP1442", "Mythical Orange", "#f83619");
_cPnt(AP, "WP1443", "Necromancer Cloak", "#30392f");
_cPnt(AP, "WP1444", "Grimoire Purple", "#775453");
_cPnt(AP, "WP1445", "Oozing Purple", "#ada1be");
_cPnt(AP, "WP1446", "Phoenix Flames", "#ff9f2b");
_cPnt(AP, "WP1447", "Pixie Pink", "#df7984");
_cPnt(AP, "WP1448", "Poisonous Cloud");
_cPnt(AP, "WP1449", "Royal Cloak", "#259799");
_cPnt(AP, "WP1450", "Scaly Hide", "#7e973d");
_cPnt(AP, "WP1451", "Warlock Purple", "#af396b");
_cPnt(AP, "WP1452", "Voidshield Blue", "#3da9db");
_cPnt(AP, "WP1454", "Spaceship Exterior", "#d7dddc");
_cPnt(AP, "WP1455", "Stone Golem", "#c1c9c1");
_cPnt(AP, "WP1456", "Sulfide Ochre", "#d2862b");
_cPnt(AP, "WP1457", "Toxic Boils", "#a76a81");
_cPnt(AP, "WP1459", "Troll Claws", "#d8863a");
_cPnt(AP, "WP1458", "Troglodyte Blue", "#208dc0");
_cPnt(AP, "WP1460", "Vampire Red", "#a12024");
_cPnt(AP, "WP1461", "Venom Wyrm", "#63653c");
_cPnt(AP, "WP1462", "Viking Blue", "#0d589c");
_cPnt(AP, "WP1464", "Werewolf Fur", "#76624e");
_cPnt(AP, "WP1463", "Wasteland Soil", "#734656");
_cPnt(AP, "WP1465", "Witch Brew", "#8f973d");
_cPnt(AP, "WP1466", "Wizards Orb", "#1e7560");
_cPnt(AP, "WP1467", "True Copper");
_cPnt(AP, "WP1468", "Rough Iron");
_cPnt(AP, "WP1471", "Military Shade");
_cPnt(AP, "WP1480", "Scar Tissue", "#d78b73");
_cPnt(AP, "WP1481", "Field Grey", "#75837c");

_cPnt(OLD_GW, "old-gw-asurmen-blue-wash", "Asurmen Blue Wash");
_cPnt(OLD_GW, "old-gw-baal-red-wash", "Baal Red Wash");
_cPnt(OLD_GW, "old-gw-badab-black-wash", "Badab Black Wash");
_cPnt(OLD_GW, "old-gw-bilious-green", "Bilious Green");

_cPnt(OLD_GW, "68-10", "Adeptus Battlegr.");
_cPnt(OLD_GW, "68-11", "Astronomicon Grey");
_cPnt(OLD_GW, "61-11", "Bad Moon Yellow");
_cPnt(OLD_GW, "61-13", "Bestial Brown");
_cPnt(OLD_GW, "61-07", "Blazing Orange");
_cPnt(OLD_GW, "61-17", "Bleached Bone");
_cPnt(OLD_GW, "61-06", "Blood Red");
_cPnt(OLD_GW, "61-57", "Boltgun Metal");
_cPnt(OLD_GW, "61-61", "Brazen Brass");
_cPnt(OLD_GW, "61-22", "Bronze Flesh");
_cPnt(OLD_GW, "61-15", "Bubonic Brown");
_cPnt(OLD_GW, "61-62", "Burnished Gold");
_cPnt(OLD_GW, "61-44", "Camo Green");
_cPnt(OLD_GW, "61-44", "Camo Green");
_cPnt(OLD_GW, "61-84", "Catachan Green");
_cPnt(OLD_GW, "61-84", "Catachan Green");
_cPnt(OLD_GW, "61-56", "Chainmail");
_cPnt(OLD_GW, "61-51", "Chaos Black");
_cPnt(OLD_GW, "68-15", "Charadon Granite");
_cPnt(OLD_GW, "61-52", "Codex Grey");
_cPnt(OLD_GW, "61-38", "Dark Angels Green");
_cPnt(OLD_GW, "61-18", "Dark Flesh");
_cPnt(OLD_GW, "61-83", "Desert Yellow");
_cPnt(OLD_GW, "68-18", "Dheneb Stone");
_cPnt(OLD_GW, "61-60", "Dwarf Bronze");
_cPnt(OLD_GW, "61-21", "Dwarf Flesh");
_cPnt(OLD_GW, "61-23", "Elf Flesh");
_cPnt(OLD_GW, "61-34", "Enchanted Blue");
_cPnt(OLD_GW, "61-34", "Enchanted Blue");
_cPnt(OLD_GW, "61-08", "Fiery Orange");
_cPnt(OLD_GW, "68-16", "Flat Brown");
_cPnt(OLD_GW, "61-53", "Fortress Grey");
_cPnt(OLD_GW, "61-42", "Goblin Green");
_cPnt(OLD_GW, "61-09", "Golden Yellow");
_cPnt(OLD_GW, "61-81", "Graveyard Earth");
_cPnt(OLD_GW, "68-14", "Gretchin-Green");
_cPnt(OLD_GW, "61-37", "Hawk Turquoise");
_cPnt(OLD_GW, "68-05", "Hormagaunt Purple");
_cPnt(OLD_GW, "61-36", "Ice Blue");
_cPnt(OLD_GW, "61-36", "Ice Blue");
_cPnt(OLD_GW, "68-17", "Khemri Brown");
_cPnt(OLD_GW, "68-13", "Knarloc Green");
_cPnt(OLD_GW, "61-82", "Kommando Khaki");
_cPnt(OLD_GW, "61-27", "Liche Purple");
_cPnt(OLD_GW, "68-04", "Lyand. Darksun");
_cPnt(OLD_GW, "68-02", "Mach. Solar Oran.");
_cPnt(OLD_GW, "68-01", "Mechrite Red");
_cPnt(OLD_GW, "61-30", "Midnight Blue");
_cPnt(OLD_GW, "61-55", "Mithril Silver");
_cPnt(OLD_GW, "68-07", "Mordian Blue");
_cPnt(OLD_GW, "68-12", "Orkhide Shade");
_cPnt(OLD_GW, "61-05", "Red Gore");
_cPnt(OLD_GW, "61-32", "Regal Blue");
_cPnt(OLD_GW, "61-43", "Rotting Flesh");
_cPnt(OLD_GW, "61-04", "Scab Red");
_cPnt(OLD_GW, "61-45", "Scaly Green");
_cPnt(OLD_GW, "61-12", "Scorched Brown");
_cPnt(OLD_GW, "61-12", "Scorched Brown");
_cPnt(OLD_GW, "61-40", "Scorpion Green");
_cPnt(OLD_GW, "61-48", "Shadow Grey");
_cPnt(OLD_GW, "61-63", "Shining Gold");
_cPnt(OLD_GW, "61-54", "Skull White");
_cPnt(OLD_GW, "61-14", "Snakebite Leather");
_cPnt(OLD_GW, "61-39", "Snot Green");
_cPnt(OLD_GW, "61-49", "Space Wolves Grey");
_cPnt(OLD_GW, "61-10", "Sunburst Yellow");
_cPnt(OLD_GW, "68-06", "Tallarn Flesh");
_cPnt(OLD_GW, "61-79", "Tanned Flesh");
_cPnt(OLD_GW, "69-03", "Taupset Ochre");
_cPnt(OLD_GW, "61-29", "Tentacle Pink");
_cPnt(OLD_GW, "61-80", "Terracotta");
_cPnt(OLD_GW, "61-58", "Tin Bitz");
_cPnt(OLD_GW, "61-33", "Ultramarine Blue");
_cPnt(OLD_GW, "61-16", "Vomit Brown");
_cPnt(OLD_GW, "61-28", "Warlock Purple");

_cPnt(OLD_GW, "old-gw-devlan-mud-wash", "Devlan Mud Wash");
_cPnt(OLD_GW, "old-gw-desert-yellow", "Desert Yellow");
_cPnt(OLD_GW, "old-gw-elf-flesh", "Elf Flesh");
_cPnt(OLD_GW, "old-gw-enchanted-blue", "Enchanted Blue");
_cPnt(OLD_GW, "old-gw-fiery-orange", "Fiery Orange");
_cPnt(OLD_GW, "old-gw-goblin-green", "Goblin Green");
_cPnt(OLD_GW, "old-gw-golden-yellow", "Golden Yellow");
_cPnt(OLD_GW, "old-gw-hawk-turquoise", "Hawk Turquoise");
_cPnt(OLD_GW, "old-gw-ice-blue", "Ice Blue");
_cPnt(OLD_GW, "old-gw-imperial-purple", "Imperial Purple");
_cPnt(OLD_GW, "old-gw-jade-green", "Jade Green");
_cPnt(OLD_GW, "old-gw-knarloc-green", "Knarloc Green");
_cPnt(OLD_GW, "old-gw-liche-purple", "Liche Purple");
_cPnt(OLD_GW, "old-gw-lightning-bolt-blue", "Lightning Bolt Blue");
_cPnt(OLD_GW, "old-gw-macharius-solar-orange", "Macharius Solar Orange");
_cPnt(OLD_GW, "old-gw-mechrite-red", "Mechrite Red");
_cPnt(OLD_GW, "old-gw-mordian-blue", "Mordian Blue");
_cPnt(OLD_GW, "old-gw-midnight-blue", "Midnight Blue");
_cPnt(OLD_GW, "old-gw-nauseating-blue", "Nauseating Blue");
_cPnt(OLD_GW, "old-gw-orkhide-shade", "Orkhide Shade");
_cPnt(OLD_GW, "old-gw-pallid-flesh", "Pallid Flesh");
_cPnt(OLD_GW, "old-gw-regal-blue", "Regal Blue");
_cPnt(OLD_GW, "old-gw-scaly-green", "Scaly Green");
_cPnt(OLD_GW, "old-gw-scorpion-green", "Scorpion Green");
_cPnt(OLD_GW, "old-gw-skull-white", "Skull White");
_cPnt(OLD_GW, "old-gw-smelly-primer", "Smelly Primer");
_cPnt(OLD_GW, "old-gw-snot-green", "Snot Green");
_cPnt(OLD_GW, "old-gw-sunburst-yellow", "Sunburst Yellow");
_cPnt(OLD_GW, "old-gw-storm-blue", "Storm Blue");
_cPnt(OLD_GW, "old-gw-tentacle-pink", "Tentacle Pink");
_cPnt(OLD_GW, "old-gw-ultramarine-blue", "Ultramarine Blue");
_cPnt(OLD_GW, "old-gw-vile-green", "Vile Green");
_cPnt(OLD_GW, "old-gw-warlock-purple", "Warlock Purple");

_cPnt(OLD_GW, "old-gw-gretchin-green", "Gretchin Green");
_cPnt(OLD_GW, "old-gw-rotting-flesh", "Rotting Flesh");
_cPnt(OLD_GW, "old-gw-bleached-bone", "Bleached Bone");
_cPnt(OLD_GW, "old-gw-kommando-khaki", "Kommando Khaki");
_cPnt(OLD_GW, "old-gw-bronzed-flesh", "Bronzed Flesh");
_cPnt(OLD_GW, "old-gw-vomit-brown", "Vomit Brown");
_cPnt(OLD_GW, "old-gw-dwarf-flesh", "Dwarf Flesh");
_cPnt(OLD_GW, "old-gw-tanned-flesh", "Tanned Flesh");
_cPnt(OLD_GW, "old-gw-leprous-brown", "Leprous Brown");
_cPnt(OLD_GW, "old-gw-bubonic-brown", "Bubonic Brown");
_cPnt(OLD_GW, "old-gw-snakebite-leather", "Snakebite Leather");
_cPnt(OLD_GW, "old-gw-tausept-ochre", "Tausept Ochre");
_cPnt(OLD_GW, "old-gw-vermin-brown", "Vermin Brown");
_cPnt(OLD_GW, "old-gw-scorched-brown", "Scorched Brown");
_cPnt(OLD_GW, "old-gw-dark-flesh", "Dark Flesh");
_cPnt(OLD_GW, "old-gw-khemri-brown", "Khemri Brown");
_cPnt(OLD_GW, "old-gw-calthan-brown", "Calthan Brown");
_cPnt(OLD_GW, "old-gw-terracotta", "Terracotta");
_cPnt(OLD_GW, "old-gw-graveyard-earth", "Graveyard Earth");
_cPnt(OLD_GW, "old-gw-kommando-khaki", "Kommando Khaki");
_cPnt(OLD_GW, "old-gw-ghostly-grey", "Ghostly Grey");
_cPnt(OLD_GW, "old-gw-space-wolves-grey", "Space Wolves Grey");
_cPnt(OLD_GW, "old-gw-shadow-grey", "Shadow Grey");
_cPnt(OLD_GW, "old-gw-fortress-grey", "Fortress Grey");
_cPnt(OLD_GW, "old-gw-codex-grey", "Codex Grey");
_cPnt(OLD_GW, "old-gw-adeptus-battlegrey", "Adeptus Battlegrey");
_cPnt(OLD_GW, "old-gw-chaos-black", "Chaos Black");
_cPnt(OLD_GW, "old-gw-mithril-silver", "Mithril Silver");
_cPnt(OLD_GW, "old-gw-chainmail", "Chainmail");
_cPnt(OLD_GW, "old-gw-boltgun-metal", "Boltgun Metal");
_cPnt(OLD_GW, "old-gw-burnished-gold", "Burnished Gold");
_cPnt(OLD_GW, "old-gw-shining-gold", "Shining Gold");
_cPnt(OLD_GW, "old-gw-dwarf-bronze", "Dwarf Bronze");
_cPnt(OLD_GW, "old-gw-brazen-brass", "Brazen Brass");
_cPnt(OLD_GW, "old-gw-beaten-copper", "Beaten Copper");
_cPnt(OLD_GW, "old-gw-tin-bitz", "Tin Bitz");
_cPnt(OLD_GW, "old-gw-black-ink", "Black Ink");
_cPnt(OLD_GW, "old-gw-dark-green-ink", "Dark Green Ink");
_cPnt(OLD_GW, "old-gw-flesh-wash", "Flesh Wash");
_cPnt(OLD_GW, "old-gw-magenta-ink", "Magenta Ink");
_cPnt(OLD_GW, "old-gw-purple-ink", "Purple Ink");
_cPnt(OLD_GW, "old-gw-charadon-granite", "Charadon Granite");
_cPnt(OLD_GW, "old-gw-dheneb-stone", "Dheneb Stone");
_cPnt(OLD_GW, "old-gw-hormagaunt-purple", "Hormagaunt Purple");
_cPnt(OLD_GW, "old-gw-iyanden-darksun", "Iyanden Darksun");
_cPnt(OLD_GW, "old-gw-tallarn-flesh", "Tallarn Flesh");
_cPnt(OLD_GW, "old-gw-gryphonne-sepia-wash", "Gryphonne Sepia Wash");
_cPnt(OLD_GW, "old-gw-leviathan-purple-wash", "Leviathan Purple Wash");
_cPnt(OLD_GW, "old-gw-ogryn-flesh-wash", "Ogryn Flesh Wash");

_cPnt(GSW, 1778, "Nuclear White");
_cPnt(GSW, 1779, "Black Stallion");
_cPnt(GSW, 1780, "Banana Split");
_cPnt(GSW, 1780, "Cyber Yellow");
_cPnt(GSW, 1782, "Go Mango");
_cPnt(GSW, 1783, "Mustard Yellow");
_cPnt(GSW, 1784, "Flaming Orange");
_cPnt(GSW, 1785, "Ember Orange");
_cPnt(GSW, 1786, "Hellfire Red");
_cPnt(GSW, 1787, "Cutthroat Red");
_cPnt(GSW, 1788, "Majin Pink");
_cPnt(GSW, 1789, "Sangria Red");
_cPnt(GSW, 1790, "Liche Purple");
_cPnt(GSW, 1791, "Abyss Blue");
_cPnt(GSW, 1792, "Marine Blue");
_cPnt(GSW, 1793, "Summersea Blue", "#3369b0");
_cPnt(GSW, 1794, "Zima Blue");
_cPnt(GSW, 1795, "Tropical Turquoise");
_cPnt(GSW, 1796, "Kraken Green");
_cPnt(GSW, 1797, "Forest Green");
_cPnt(GSW, 1798, "Hunter Green");
_cPnt(GSW, 1799, "Warcry Green");
_cPnt(GSW, 1800, "Camouflage Green");
_cPnt(GSW, 1820, "Flubber Green");
_cPnt(GSW, 1821, "Olivegrove Green");
_cPnt(GSW, 1822, "Zombie Flesh");
_cPnt(GSW, 1823, "Sun-bleached Bone");
_cPnt(GSW, 1824, "Komodo Khaki");
_cPnt(GSW, 1825, "Peach Flesh", "#e8803b");
_cPnt(GSW, 1826, "Dwarven Flesh");
_cPnt(GSW, 1827, "Blushing Flesh");
_cPnt(GSW, 1828, "Ochre Desert");
_cPnt(GSW, 1829, "Leather Brown");
_cPnt(GSW, 1830, "Foxhide Brown");
_cPnt(GSW, 1831, "Choco Brown");
_cPnt(GSW, 1832, "Redwood Brown");
_cPnt(GSW, 1833, "Bestial Brown");
_cPnt(GSW, 1834, "Quicksand Brown");
_cPnt(GSW, 1835, "Wolven Grey");
_cPnt(GSW, 1836, "Bluegrey Dusk");
_cPnt(GSW, 1837, "Moonstone Grey");
_cPnt(GSW, 1838, "Slate Grey");
_cPnt(GSW, 1839, "Lollipop Magenta");
_cPnt(GSW, 1840, "Mirage Blue");
_cPnt(GSW, 1841, "Dark Umber");
_cPnt(GSW, 1842, "Steel Grey");
_cPnt(GSW, 1843, "Ivory Tusk");
_cPnt(GSW, 1844, "Pale Flesh");
_cPnt(GSW, 1845, "Elven Flesh");
_cPnt(GSW, 1846, "Imperium Blue");
_cPnt(GSW, 1847, "Malefic Purple");
_cPnt(GSW, 1848, "Military Green");
_cPnt(GSW, 1849, "Field Green-Grey");
_cPnt(GSW, 1850, "Rocket Green");
_cPnt(GSW, 1851, "Gangrene");
_cPnt(GSW, 1852, "Scorched Wood");
_cPnt(GSW, 1853, "Overlord Olive");
_cPnt(GSW, 1854, "Dark Beige");
_cPnt(GSW, 1855, "English Field Brown");
_cPnt(GSW, 1856, "Coyote Brown");
_cPnt(GSW, 1857, "Desert Camo");
_cPnt(GSW, 1858, "Yellow-Brown Ops");
_cPnt(GSW, 1859, "Valkyrie Yellow");
_cPnt(GSW, 1860, "Gunmetal Grey");
_cPnt(GSW, 1861, "Quicksilver");
_cPnt(GSW, 1862, "Anthrax Metal");
_cPnt(GSW, 1863, "Mystic White");
_cPnt(GSW, 1864, "Sharkfin Blue");
_cPnt(GSW, 1865, "Tinmetal Grey");
_cPnt(GSW, 1866, "Dark Elder Bronze");
_cPnt(GSW, 1867, "Gladius Bronze");
_cPnt(GSW, 1868, "Steampunk Copper");
_cPnt(GSW, 1869, "Shiny Gold");
_cPnt(GSW, 1870, "El Dorado");
_cPnt(GSW, 1871, "Antique Gold");
_cPnt(GSW, 1872, "Neptunus Blue");
_cPnt(GSW, 1873, "Sirenscale Green");
_cPnt(GSW, 1874, "Caesar Red");
_cPnt(GSW, 1875, "Persian Violet");
_cPnt(GSW, 1876, "Aqua Turquoise");
_cPnt(GSW, 1877, "Orchid Purple");
_cPnt(GSW, 1882, "Barrel Grey");
_cPnt(GSW, 1883, "Gengis Khaki");
_cPnt(GSW, 1884, "Sandstorm");
_cPnt(GSW, 1885, "Deck Grey");
_cPnt(GSW, 1886, "Prussian Green");
_cPnt(GSW, 1887, "Olive-Brown Ops");
_cPnt(GSW, 3207, "Fang White");
_cPnt(GSW, 3208, "Vanilla Drop");
_cPnt(GSW, 3209, "Parchment");
_cPnt(GSW, 3210, "Golden Cream");
_cPnt(GSW, 3211, "Temple Ochre");
_cPnt(GSW, 3212, "Tiger Brown");
_cPnt(GSW, 3213, "Arrakis Brown");
_cPnt(GSW, 3214, "Faded Orange");
_cPnt(GSW, 3215, "Dusty Rose");
_cPnt(GSW, 3216, "Flesh Rose");
_cPnt(GSW, 3217, "Red Truth");
_cPnt(GSW, 3219, "Brown Skin");
_cPnt(GSW, 3220, "Wonka Violet");
_cPnt(GSW, 3221, "Phantom Violet");
_cPnt(GSW, 3222, "Chancellor Blue");
_cPnt(GSW, 3223, "Prussian Blue");
_cPnt(GSW, 3224, "Ultramar Blue");
_cPnt(GSW, 3225, "Lapislazuli");
_cPnt(GSW, 3226, "Smoked Blue");
_cPnt(GSW, 3227, "Arctic Blue");
_cPnt(GSW, 3228, "Grey Teal");
_cPnt(GSW, 3229, "Viridian Green");
_cPnt(GSW, 3230, "Rotten Green");
_cPnt(GSW, 3231, "Canary Green");
_cPnt(GSW, 3232, "Yoda Green");
_cPnt(GSW, 3233, "Blackroot Grey");
_cPnt(GSW, 3234, "Ranger Green");
_cPnt(GSW, 3235, "Starship Grey");
_cPnt(GSW, 3236, "Lilac Purple");
_cPnt(GSW, 3237, "Mint Twister");
_cPnt(GSW, 3238, "Bluebird Grey");
_cPnt(GSW, 3239, "Arachnid Green");
_cPnt(GSW, 3240, "Moon Mist Grey");
_cPnt(GSW, 3259, "Whitecap Beige");
