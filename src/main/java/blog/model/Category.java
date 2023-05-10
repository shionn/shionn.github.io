package blog.model;

import java.util.ArrayList;
import java.util.List;

public class Category {
	private String name;
	private List<Article> articles = new ArrayList<Article>();

	public Category(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public String getUrl() {
		return "category/" + name.toLowerCase().replaceAll("[^a-z]", "-") + ".html";
	}
}
