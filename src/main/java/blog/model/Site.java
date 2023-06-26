package blog.model;

import java.util.Collection;
import java.util.List;

import blog.model.Metadata.Type;

public class Site {
	private List<Article> articles;
	private Collection<Group> groups;
	private Menu menu;
	private String base;

	public Site(String base, List<Article> articles, Collection<Group> categories, Menu menu) {
		this.base = base;
		this.articles = articles;
		this.groups = categories;
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

	public List<Group> getTags() {
		return groups.stream()
				.filter(c -> c.getType() == Group.Type.Tag)
				.sorted((a, b) -> a.getName().compareTo(b.getName()))
				.toList();
	}

	public Collection<Group> getCategories() {
		return groups.stream()
				.filter(c -> c.getType() == Group.Type.Category)
				.sorted((a, b) -> a.getName().compareTo(b.getName()))
				.toList();
	}

	public Collection<Group> getGroups() {
		return groups;
	}

	public String getBase() {
		return base;
	}
}

