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

public class Article {

	private Metadata metadata;
	private Group category;
	private File file;
	private List<Group> tags;

	public Article(Metadata metadata, Group category, List<Group> tags, File file) {
		this.metadata = metadata;
		this.category = category;
		this.tags = tags;
		this.file = file;
	}

	public String getLogo() {
		if (metadata.isLogo()) {
			return getFolder() + getName() + "/title.jpg";
		}
		return null;
	}

	public boolean is(Type type) {
		return metadata.getType() == type;
	}

	public String getTitle() {
		return metadata.getTitle();
	}

	public String getFolder() {
		return metadata.getYear() + "/";
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

	public Group getCategory() {
		return category;
	}

	public List<Group> getTags() {
		return tags;
	}

	public String getFormatedDate() {
		return new SimpleDateFormat("dd MMMM yyyy", Locale.FRANCE).format(getDate());
	}

	public String getAuthor() {
		return "Shionn";
	}

	public List<String> getJs() {
		return metadata.getJs();
	}
}
