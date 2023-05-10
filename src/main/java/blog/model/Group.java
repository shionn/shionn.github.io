package blog.model;

import java.util.ArrayList;
import java.util.List;

public class Group {
	public enum Type {
		Category,
		Tag
	}

	private Type type;
	private String name;
	private List<Article> articles = new ArrayList<Article>();

	public Group(Type type, String name) {
		this.type = type;
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public String getUrl() {
		return type.name().toLowerCase() + "/" + name.toLowerCase().replaceAll("[^a-z]", "-") + ".html";
	}
}
