package blog.model;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class Group {
	public enum Type {
		Category,
		Tag
	}

	@Getter
	private final Type type;
	@Getter
	private final String name;
	private List<Article> articles = new ArrayList<Article>();

	public boolean isGenerated() {
		return !articles.isEmpty();
	}

	public String getUrl() {
		return type.name().toLowerCase() + "/" + name.toLowerCase().replaceAll("[^a-z]", "-") + ".html";
	}

	public void add(Article article) {
		this.articles.add(article);
	}

	public int getSize() {
		return articles.size();
	}

	public List<Article> getArticles() {
		return articles.stream()
				.sorted((a, b) -> -a.getDate().compareTo(b.getDate()))
				.filter(Article::isPublished)
				.collect(Collectors.toList());
	}

	public List<String> getJs() {
		return articles.stream().flatMap(a -> a.getJs().stream()).distinct().collect(Collectors.toList());
	}
}
