package blog.model;

import java.util.List;

public class Site {
	private List<Article> articles;
	private Menu menu;

	public Site(List<Article> articles, Menu menu) {
		this.articles = articles;
		this.menu = menu;
	}

	public Menu getMenu() {
		return menu;
	}

	public List<Article> getLastArticles() {
		return articles;
	}
}

