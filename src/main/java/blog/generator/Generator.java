package blog.generator;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import blog.model.Article;
import blog.model.Site;
import blog.model.builder.SiteBuilder;
import blog.template.TemplateEngineBuilder;

public class Generator {

	public static void main(String[] args) throws IOException {
		new Generator().generate();
	}

	private void generate() throws IOException {
		prepareDestFolder();
		Site site = new SiteBuilder().build();
		TemplateEngine engine = new TemplateEngineBuilder().build();
		engine.process("template", buildIndexContext(site), new FileWriter("site/index.html"));
		for (Article article : site.getArticles()) {
			engine.process("template", buildArticleContext(site, article), new FileWriter("site/" + article.getUrl()));
		}
	}

	private Context buildIndexContext(Site site) {
		Map<String, Object> params = buildParam(site);
		return new Context(Locale.FRANCE, params);
	}

	private Context buildArticleContext(Site site, Article article) {
		Map<String, Object> params = buildParam(site);
		params.put("article", article);
		return new Context(Locale.FRANCE, params);
	}

	private void prepareDestFolder() throws IOException {
		new File("site").mkdir();
		FileUtils.copyDirectoryToDirectory(new File("src/main/font"), new File("site"));
		FileUtils.copyDirectoryToDirectory(new File("src/main/js"), new File("site"));
	}

	private Map<String, Object> buildParam(Site site) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("site", site);
		return param;
	}

}
