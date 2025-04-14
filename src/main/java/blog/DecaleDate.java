package blog;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.filefilter.SuffixFileFilter;
import org.apache.commons.io.filefilter.TrueFileFilter;
import org.apache.commons.lang3.tuple.Pair;

public class DecaleDate {

	private static String[] aftersFiles = { "wargame/elfes-noirs/armee-elfes-noirs.md" };

	private static DateFormat jsonFormat = new SimpleDateFormat("yyyy/MM/dd"); // aussi pour les after
	private static DateFormat menuFormat = new SimpleDateFormat("yyyy-MM-dd");

	public static void main(String[] args) throws ParseException, IOException {
		new DecaleDate().start(jsonFormat.parse("2025/03/31"), 8);
	}

	private void start(Date date, int nbDays) throws IOException {
		List<Pair<Date, Date>> dates = buildTranslationDates(date, nbDays);
		for (Pair<Date, Date> translation : dates) {
			System.out.println("try replace " + translation.getKey() + " > " + translation.getValue());
			String original = jsonFormat.format(translation.getKey());
			String target = jsonFormat.format(translation.getValue());
			for (File file : FileUtils
					.listFiles(new File("content"), new SuffixFileFilter("json"), TrueFileFilter.INSTANCE)) {
				replace(original, target, file);
			}
			for (File file : FileUtils
					.listFiles(new File("content"), new SuffixFileFilter("md"), TrueFileFilter.INSTANCE)) {
				replace(original, target, file);
			}
			original = menuFormat.format(translation.getKey());
			target = menuFormat.format(translation.getValue());
			replace(original, target, new File("content/menu.txt"));
		}
	}

	private void replace(String original, String target, File file) {
		File targetFile = new File(file.getAbsolutePath().concat(".new"));
		try (BufferedReader reader = new BufferedReader(new FileReader(file));
				BufferedWriter writer = new BufferedWriter(new FileWriter(targetFile))) {
			String line;
			while ((line = reader.readLine()) != null) {
				line = line.replaceAll(original, target);
				writer.write(line);
				writer.newLine();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		file.delete();
		targetFile.renameTo(file);
		
	}

	private List<Pair<Date, Date>> buildTranslationDates(Date date, int nbDays) {
		List<Pair<Date, Date>> dates = new ArrayList<>();
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		for (int i = 0; i < 40; i++) {
			Date orig = cal.getTime();
			cal.add(Calendar.DAY_OF_YEAR, nbDays);
			dates.add(0, Pair.of(orig, cal.getTime()));
		}
		return dates;
	}
}
