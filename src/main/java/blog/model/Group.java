package blog.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
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
	private final Properties configuration;
	private List<Article> articles = new ArrayList<Article>();

	public boolean is(Type type) {
		return this.type == type;
	}

	public boolean isGenerated() {
		return !articles.isEmpty()
				&& Boolean.parseBoolean(configuration.getProperty(type.name().toLowerCase() + ".enable"));
	}

	public String getUrl() {
		return configuration.getProperty(type.name().toLowerCase() + ".subfolder") + "/"
				+ name.toLowerCase().replaceAll("[^a-z]", "-") + ".html";
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
