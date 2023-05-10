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

	public Site build() throws IOException {
		Map<String, Group> groups = new HashMap<String, Group>();
		List<Article> articles = new ArrayList<Article>();
		for (File file : FileUtils.listFiles(new File("src/main/content"), new SuffixFileFilter("json"),
				TrueFileFilter.INSTANCE)) {
			Metadata metadata = new ObjectMapper().readValue(file, Metadata.class);
			Group category = groups.getOrDefault(metadata.getCategory(),
					new Group(Type.Category, metadata.getCategory()));
			List<Group> tags = metadata.getTags()
					.stream()
					.map(tag -> groups.getOrDefault("tag", new Group(Type.Tag, tag)))
					.collect(Collectors.toList());
			articles.add(new Article(metadata, category, tags, file));
		}
		return new Site(articles, groups.values(), new MenuBuilder().build());
	}
}
