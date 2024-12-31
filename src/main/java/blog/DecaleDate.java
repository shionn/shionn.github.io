package blog;

import java.io.File;
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

import com.fasterxml.jackson.databind.ObjectMapper;

import blog.model.Metadata;

public class DecaleDate {

	private static String[] aftersFiles = { "wargame/elfes-noirs/armee-elfes-noirs.md" };

	private static DateFormat jsonFormat = new SimpleDateFormat("yyyy/MM/dd"); // aussi pour les after
	private static DateFormat menuFormat = new SimpleDateFormat("yyyy-MM-dd");

	public static void main(String[] args) throws ParseException, IOException {
		new DecaleDate().start(jsonFormat.parse("2025/01/02"), 10);
	}

	private void start(Date date, int nbDays) throws IOException {
		List<Pair<Date, Date>> dates = buildTranslationDates(date, nbDays);
		for (Pair<Date, Date> translation : dates) {
			System.out.println("try replace " + translation.getKey() + " > " + translation.getValue());
			for (File file : FileUtils.listFiles(new File("content"), new SuffixFileFilter("json"),
					TrueFileFilter.INSTANCE)) {
//				System.out.println("try replace in " + file);
				Metadata metadata = new ObjectMapper().readValue(file, Metadata.class);
//				System.out.println("compare " + metadata.getDate() + "<>" + translation.getKey());
				if (metadata.getDate().compareTo(translation.getKey()) == 0) {
					System.out.println(
							"replace " + metadata.getDate() + " with " + translation.getValue() + " in " + file);
					metadata.setDate(date);
				}
			}
		}
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
