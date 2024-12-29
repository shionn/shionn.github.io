package blog;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.apache.commons.io.FileUtils;

import com.rometools.rome.feed.synd.SyndContentImpl;
import com.rometools.rome.feed.synd.SyndEntry;
import com.rometools.rome.feed.synd.SyndEntryImpl;
import com.rometools.rome.feed.synd.SyndFeed;
import com.rometools.rome.feed.synd.SyndFeedImpl;
import com.rometools.rome.io.FeedException;
import com.rometools.rome.io.SyndFeedOutput;

import blog.generator.Configuration;

public class TortugaRssBuild {
	private static final String DOCS = "docs/";

	public static void main(String[] args) throws IOException, FeedException {
		TortugaRssBuild builder = new TortugaRssBuild();
		builder.checkImgs("pictures/defis/whisp-2025/quest-1/");
		builder.checkImgs("pictures/defis/whisp-2025/participants/");
		builder.buildRss("pictures/defis/whisp-2025/quest-1/", "docs/draft/quest-1.rss");
		builder.buildRss("pictures/defis/whisp-2025/participants/", "docs/draft/participants.rss");
	}


	private SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd hh-mm");
	private String now;

	public TortugaRssBuild() {
		now = format.format(new Date());
	}

	private void checkImgs(String folder) throws IOException {
		if (new File(DOCS + folder + "last.png").exists()) {
			
		} else {
			FileUtils.copyFile(new File(DOCS + folder + "temp.png"), new File(DOCS + folder + now + ".png"));
			FileUtils.copyFile(new File(DOCS + folder + "temp.png"), new File(DOCS + folder + "last.png"));
		}
		new File(DOCS + folder + "temp.png").delete();
	}

	private void buildRss(String folder, String target) throws IOException, FeedException {
		SyndFeed feed = new SyndFeedImpl();
		feed.setFeedType("rss_2.0");
		feed.setTitle("Pour la Gloire de Tortuga");
		feed.setLink(Configuration.get().getBase());
		feed.setDescription("Pour la Gloire de Tortuga ");

		List<SyndEntry> entries = Arrays.stream(new File(DOCS + folder).listFiles(new FilenameFilter() {
			@Override
			public boolean accept(File dir, String name) {
				return name.endsWith(".png") && !name.startsWith("last");
			}
		})).sorted().map(file -> buildRssEntry(folder, file)).toList();
		feed.setEntries(entries);
		new SyndFeedOutput().output(feed, new File(target));
	}

	private SyndEntry buildRssEntry(String folder, File file) {
		SyndEntryImpl entry = new SyndEntryImpl();
		entry.setAuthor("shionn");
		entry.setLink(toUrl(folder, file));
		SyndContentImpl desc = new SyndContentImpl();
		desc.setValue(file.getName());
		desc.setType(now);
		entry.setDescription(desc);
		try {
			entry.setPublishedDate(format.parse(file.getName()));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return entry;
	}

	private String toUrl(String folder, File file) {
		String url = Configuration.get().getBase();
		if (!url.endsWith("/")) {
			url += "/";
		}
		url += folder;
		return url + file.getName();
	}

}
