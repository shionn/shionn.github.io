package blog.generator;

import java.util.Arrays;
import java.util.List;

public class Menu {

	private String name;
	private String path;
	private List<Menu> childrens;

	public Menu(String name, String path, Menu... childrens) {
		this.name = name;
		this.path = path;
		this.childrens = Arrays.asList(childrens);
	}

	public static Menu build() {
		return new Menu("root", "index", //
				new Menu("Accueil", "index"), //
				new Menu("Radiomodélisme", "category/radiomodelisme", //
						new Menu("Mes Bolides", "page/mes-bolides", //
								new Menu("3Racing F109", "category/3racing-f109"),
								new Menu("3Racing Sakura D3", "category/3racing-sakura-d3"),
								new Menu("Axial SCX F-150", "category/axial-scx-f-150"),
								new Menu("Camion RC Rally Man", "category/camion-rc-rally-man"),
								new Menu("Durango DESC210", "category/durango-desc210"),
								new Menu("Tamiya F104 VerII Pro", "category/tamiya-f104-verii-pro"),
								new Menu("Tamiya Scania R470", "category/tamiya-scania-r470"),
								new Menu("Tamiya TA02T", "category/tamiya-ta02t"),
								new Menu("Tamiya TB03VDS", "category/tamiya-tb-03-vds"),
								new Menu("TeamC TC02", "category/teamc-tc02"),
								new Menu("3Racing F109", "category/3racing-f109"),
								new Menu("3Racing F109", "category/3racing-f109"),
								new Menu("3Racing F109", "category/3racing-f109"),
								new Menu("3Racing F109", "category/3racing-f109"),
								new Menu("3Racing F109", "category/3racing-f109")),
						new Menu("Test Matos RC", "category/test-materiel-rc",
								new Menu("Servo PowerHD 1207TG", "pages/servo-powerhd-1207tg"),
								new Menu("Team Magic Touring Car Bag & Transmitter",
										"pages/team-magic-touring-car-bag-transmitter-review")),
						new Menu("Tutoriels", "pages/radiomodelisme-tutoriel",
								new Menu("Entretiens d’un différentiel à bille",
										"pages/entretien-differentiel-a-bille"),
								new Menu("Fabrication d’insert", "pages/tutorial-fabrication-d-insert"),
								new Menu("Intégrer le bec sur un TEU104Bk",
										"pages/tutoriel-integrer-le-bec-sur-un-teu104bk")),
						new Me



						));
	}

}
