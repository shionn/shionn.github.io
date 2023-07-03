package extract;

import java.util.regex.Pattern;

public class GSWExtractTest {
	private static final String SOURCE = "Gunmetal GreyChainmailIronbreakerChainmail SilverNatural Steel\n"
			+ "QuicksilverMithril SilverRunefang SteelSilverSilver\n"
			+ "Anthrax MetalBoltgun MetalLeadbelcherGunmetalGunmetal Grey\n"
			+ "Mystic White---Silver\n"
			+ "Sharkfin Blue----\n"
			+ "Tinmetal Grey----\n"
			+ "Dark Elder BronzeTin BitzWarplock BronzeTinny Tin-\n"
			+ "Gladius BronzeDwarf BronzeHashut CopperBright BronzeBronze\n"
			+ "Steampunk CopperBeaten CopperHashut CopperHammered CopperCopper\n"
			+ "Shiny GoldBrunished GoldAuric Armour GoldGlorious GoldGold\n"
			+ "El DoradoShining GoldRetributor ArmourPolished GoldBrass\n"
			+ "Antique Gold-Golden Griffon-Old Gold\n"
			+ "Neptunus Blue---Gunmetal Blue\n"
			+ "Sirenscale Green----\n"
			+ "Caesar Red----\n"
			+ "Persian Violet----\n"
			+ "Aqua Turquoise----\n"
			+ "Orchid Purple----";

	public static void main(String[] args) {
		for (String line : SOURCE.split("\n")) {
			Pattern p = Pattern.compile("([-a-z])([-A-Z])");
			line = p.matcher(line).replaceAll((r) -> {
				return r.group(1) + "\t" + r.group(2);
			});
			line = p.matcher(line).replaceAll((r) -> {
				return r.group(1) + "\t" + r.group(2);
			});
			System.out.println(line);
		}
	}
}
