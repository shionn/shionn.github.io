package blog.model;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Date;

import org.apache.commons.io.FileUtils;

import blog.model.Metadata.Type;

public class Article {

	private Metadata metadata;
	private Category category;
	private File file;

	public Article(Metadata metadata, Category category, File file) {
		this.metadata = metadata;
		this.category = category;
		this.file = file;
	}

	public String getLogo() {
		return null;
	}

	public boolean is(Type type) {
		return metadata.getType() == type;
	}

	public String getTitle() {
		return metadata.getTitle();
	}

	public String getUrl() {
		return file.getName().substring(0, file.getName().lastIndexOf('.')) + ".html";
	}

	public String getContent() throws IOException {
		return FileUtils.readFileToString(new File(file.getPath().replaceAll("json", "md")), StandardCharsets.UTF_8);

	}

	public Date getDate() {
		return metadata.getDate();
	}

	public Category getCategory() {
		return category;
	}
}
