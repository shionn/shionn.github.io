package blog.model;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import blog.model.Metadata.Type;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class Site {
	private String base;
	private List<Article> articles;
	private Collection<Group> groups;
	private Menu menu;

	public List<Article> getLastArticles() {
		return articles.stream()
				.filter(a -> a.is(Type.post))
				.sorted((a, b) -> -a.getDate().compareTo(b.getDate()))
				.filter(Article::isPublished)
				.limit(5)
				.collect(Collectors.toList());
	}

	public List<Article> getDrafts() {
		return articles.stream()
				.sorted((a, b) -> -a.getDate().compareTo(b.getDate()))
				.filter(a -> !a.isPublished())
				.collect(Collectors.toList());

	}

	public List<Group> getTags() {
		return groups.stream()
				.filter(c -> c.getType() == Group.Type.Tag)
				.filter(t -> t.isGenerated())
				.sorted((a, b) -> a.getName().compareTo(b.getName()))
				.collect(Collectors.toList());
	}

	public Collection<Group> getCategories() {
		return groups.stream()
				.filter(c -> c.getType() == Group.Type.Category)
				.sorted((a, b) -> a.getName().compareTo(b.getName()))
				.collect(Collectors.toList());
	}

	public List<String> getJs() {
		return articles.stream().flatMap(a -> a.getJs().stream()).distinct().collect(Collectors.toList());
	}

}

