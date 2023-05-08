package blog.model;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.apache.commons.io.FileUtils;

public class Article {

	private Metadata metadata;
	private File file;

	public Article(Metadata metadata, File file) {
		this.metadata = metadata;
		this.file = file;
	}

	public String getLogo() {
		return null;
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

}
