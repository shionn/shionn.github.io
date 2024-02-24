package blog.model.builder;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.stream.Collectors;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.filefilter.SuffixFileFilter;
import org.apache.commons.io.filefilter.TrueFileFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import blog.model.Article;
import blog.model.Group;
import blog.model.Group.Type;
import blog.model.Metadata;
import blog.model.Site;

public class SiteBuilder {


	public Site build() throws IOException {
		Map<String, Group> groups = new HashMap<String, Group>();
		List<Article> articles = new ArrayList<Article>();
		for (File file : FileUtils.listFiles(new File("content"), new SuffixFileFilter("json"),
				TrueFileFilter.INSTANCE)) {
			Metadata metadata = new ObjectMapper().readValue(file, Metadata.class);
			List<Group> tags = metadata.getTags()
					.stream()
					.map(tag -> retreiveGroup(groups, tag, Type.Tag))
					.collect(Collectors.toList());
			Group category = retreiveGroup(groups, metadata.getCategory(), Type.Category);
			Article article = new Article(metadata, category, tags, file);
			if (metadata.isPublished()) {
				category.add(article);
				tags.stream().forEach(t -> t.add(article));
			}
			articles.add(article);
		}
		return new Site(loadConfiguration(), articles, groups.values(), new MenuBuilder().build());
	}

	private Group retreiveGroup(Map<String, Group> groups, String key, Type type) {
		Group group = groups.getOrDefault(type + "-" + key, new Group(type, key));
		groups.put(type + "-" + key, group);
		return group;
	}

	private Properties loadConfiguration() throws IOException {
		Properties props = new Properties();
		props.load(Thread.currentThread().getContextClassLoader().getResourceAsStream("configuration.properties"));
		return props;
	}

}
