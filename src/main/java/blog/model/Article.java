package blog.model;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.apache.commons.io.FileUtils;

import blog.model.Metadata.Type;
import blog.model.formater.ContentFormater;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class Article {

	private final Metadata metadata;
	@Getter
	private final Group category;
	@Getter
	private final List<Group> tags;
	private final File file;

	public String getLogo() {
		if (metadata.isLogo()) {
			if (metadata.getLogoFolder() == null) {
				return metadata.getYear() + "/" + getName() + "/title.jpg";
			}
			return metadata.getLogoFolder() + "/title.jpg";
		}
		return null;
	}

	public boolean is(Type type) {
		return metadata.getType() == type;
	}

	public boolean isPublished() {
		return metadata.isPublished();
	}

	public String getTitle() {
		return metadata.getTitle();
	}

	public String getFolder() {
		if (metadata.isPublished()) {
			return metadata.getYear() + "/";
		}
		return "draft/";
	}

	public String getUrl() {
		return getFolder() + getName() + ".html";
	}

	private String getName() {
		return file.getName().substring(0, file.getName().lastIndexOf('.'));
	}

	public String getRawContent() throws IOException {
		return FileUtils.readFileToString(new File(file.getPath().replaceAll("json", "md")), StandardCharsets.UTF_8);
	}

	public String getShortContent() throws IOException {
		return new ContentFormater().shortPost(getRawContent());
	}

	public String getFullContent() throws IOException {
		return new ContentFormater().fullPost(getRawContent());
	}

	public Date getDate() {
		return metadata.getDate();
	}

	public Date getUpdateDate() {
		return metadata.getUpdated();
	}

	public String getFormatedDate() {
		return new SimpleDateFormat("dd MMMM yyyy", Locale.FRANCE).format(getDate());
	}

	public String getFormatedUpdateDate() {
		return new SimpleDateFormat("dd MMMM yyyy", Locale.FRANCE).format(getUpdateDate());
	}

	public String getAuthor() {
		return "Shionn";
	}

	public List<String> getJs() {
		return metadata.getJs();
	}
}
