package blog.model.builder;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

	public Site build(String base) throws IOException {
		Map<String, Group> groups = new HashMap<String, Group>();
		List<Article> articles = new ArrayList<Article>();
		for (File file : FileUtils.listFiles(new File("docs/content"), new SuffixFileFilter("json"),
				TrueFileFilter.INSTANCE)) {
			Metadata metadata = new ObjectMapper().readValue(file, Metadata.class);
			if (metadata.isPublished()) {
				Group category = retreiveGroup(groups, metadata.getCategory(), Type.Category);
				List<Group> tags = metadata.getTags()
						.stream()
						.map(tag -> retreiveGroup(groups, tag, Type.Tag))
						.collect(Collectors.toList());
				Article article = new Article(metadata, category, tags, file);
				category.add(article);
				tags.stream().forEach(t -> t.add(article));
				articles.add(article);
			}
		}
		return new Site(base, articles, groups.values(), new MenuBuilder().build());
	}

	private Group retreiveGroup(Map<String, Group> groups, String key, Type type) {
		Group group = groups.getOrDefault(key, new Group(type, key));
		groups.put(key, group);
		return group;
	}
}
