package blog.model;

import java.util.Collection;
import java.util.List;

import blog.model.Metadata.Type;

public class Site {
	private List<Article> articles;
	private Collection<Group> categories;
	private Menu menu;

	public Site(List<Article> articles, Collection<Group> categories, Menu menu) {
		this.articles = articles;
		this.categories = categories;
		this.menu = menu;
	}

	public Menu getMenu() {
		return menu;
	}

	public List<Article> getLastArticles() {
		return articles.stream()
				.filter(a -> a.is(Type.post))
				.sorted((a, b) -> -a.getDate().compareTo(b.getDate()))
				.limit(5)
				.toList();
	}

	public List<Article> getArticles() {
		return articles;
	}
}

