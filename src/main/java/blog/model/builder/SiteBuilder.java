package blog.model.builder;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.filefilter.SuffixFileFilter;
import org.apache.commons.io.filefilter.TrueFileFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import blog.model.Article;
import blog.model.Category;
import blog.model.Metadata;
import blog.model.Site;

public class SiteBuilder {

	public Site build() throws IOException {
		Map<String, Category> categories = new HashMap<String, Category>();
		List<Article> articles = new ArrayList<Article>();
		for (File file : FileUtils.listFiles(new File("src/main/content"), new SuffixFileFilter("json"),
				TrueFileFilter.INSTANCE)) {
			Metadata metadata = new ObjectMapper().readValue(file, Metadata.class);
			Category category = categories.getOrDefault(metadata.getCategory(), new Category(metadata.getCategory()));
			articles.add(new Article(metadata, category, file));
		}
		return new Site(articles, categories.values(), new MenuBuilder().build());
	}
}
