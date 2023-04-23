package blog.model;

public class Article {

	private Metadata metadata;
	private String content;

	public Article(Metadata metadata, String content) {
		this.metadata = metadata;
		this.content = content;
	}

	public String getLogo() {
		return null;
	}

	public String getTitle() {
		return metadata.getTitle();
	}

}
