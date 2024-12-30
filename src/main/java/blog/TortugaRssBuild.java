package blog;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.imageio.ImageIO;

import org.apache.commons.io.FileUtils;

import com.rometools.rome.feed.synd.SyndContent;
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
		if (new File(DOCS + folder + "temp.png").exists()) {
			if (new File(DOCS + folder + "last.png").exists()) {
				BufferedImage temp = ImageIO.read(new File(DOCS + folder + "temp.png"));
				BufferedImage last = ImageIO.read(new File(DOCS + folder + "last.png"));
				if (!bufferedImagesEqual(temp, last)) {
					System.out.println("les image sont differentes !");
				}
			} else {
				FileUtils.copyFile(new File(DOCS + folder + "temp.png"), new File(DOCS + folder + now + ".png"));
				FileUtils.copyFile(new File(DOCS + folder + "temp.png"), new File(DOCS + folder + "last.png"));
			}
//			new File(DOCS + folder + "temp.png").delete();
		}
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
		entry.setDescription(buildItemDescription(folder, file));
		try {
			entry.setPublishedDate(format.parse(file.getName()));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return entry;
	}

	private SyndContent buildItemDescription(String folder, File file) {
		SyndContentImpl content = new SyndContentImpl();
		content.setValue("<img src=\"" + toUrl(folder, file) + "\">");
		return content;
	}

	private String toUrl(String folder, File file) {
		String url = Configuration.get().getBase();
		if (!url.endsWith("/")) {
			url += "/";
		}
		url += folder;
		return url + file.getName();
	}

	boolean bufferedImagesEqual(BufferedImage img1, BufferedImage img2) {
		if (img1.getWidth() == img2.getWidth() && img1.getHeight() == img2.getHeight()) {
			for (int x = 0; x < img1.getWidth(); x++) {
				for (int y = 0; y < img1.getHeight(); y++) {
					if (img1.getRGB(x, y) != img2.getRGB(x, y))
						return false;
				}
			}
		} else {
			return false;
		}
		return true;
	}
}
