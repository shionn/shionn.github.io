package extract;

import java.util.regex.Pattern;

public class GSWExtractTest {
	private static final String SOURCE = "Kraken GreenScaly GreenKabalite GreenScurvey Green-\n"
			+ "Forest GreenDark Angels Green-Dark Green-\n" + "Hunter GreenSnot GreenWarpstone GlowSick Green-\n"
			+ "Warcry GreenGoblin GreenWarboss GreenGoblin GreenOlive Green\n"
			+ "Camouflage GreenCamo GreenElysian GreenCamouflage Green-\n"
			+ "Flubber GreenScorpion GreenMoot GreenScorpy GreenLight Green\n"
			+ "Olivegrove GreenCatachan Green-Cayman Green-\n"
			+ "Zombie FleshRotting FleshNurgling GreenDead FleshStone Grey\n"
			+ "Sun-bleached BoneBleached BoneUshabti BoneBonewhite-\n" + "Komodo KhakiKommando Khaki-Khaki-\n"
			+ "Peach FleshBronzed FleshUngor FleshBronze Flesh-\n"
			+ "Dwarven FleshDwarf FleshRatskin FleshDwarf SkinBeige Red\n" + "Blushing FleshTanned Flesh-Tan-\n"
			+ "Ochre DesertBubonic BrownZamesi DesertPlague BrownGold Brow\n"
			+ "Leather BrownSnakebite LeatherXV-88Leather BrownBrown Sand\n"
			+ "Foxhide BrownVermin Brown-Parasite BrownOrange Brown\n"
			+ "Choco BrownScorched BrownDryad BarkCharred BrownGerman Cam Black\n"
			+ "Redwood BrownDark FleshDoombull BrownDark FleshtoneMahogani Brown\n"
			+ "Bestial BrownBestial BrownMoumf. BrownBeasty BrownBeige Brown\n" + "Quicksand Brown--Earth-\n"
			+ "Wolven GreySpace Wolves GreyFenrisan Grey--";

	public static void main(String[] args) {
		for (String line : SOURCE.split("\n")) {
			Pattern p = Pattern.compile("([a-z])([A-Z])");
			// line.replace("-", "\t-\t")
			line = p.matcher(line).replaceAll((r) -> {
				return r.group(1) + "\t" + r.group(2);
			});
			System.out.println(line);
		}
	}
}
