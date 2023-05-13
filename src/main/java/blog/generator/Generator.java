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
import blog.model.Group;
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
		engine.process("template", build404Context(site), new FileWriter("site/404.html"));
		for (Article article : site.getArticles()) {
			engine.process("template", buildArticleContext(site, article), new FileWriter("site/" + article.getUrl()));
		}
		for (Group group : site.getCategories()) {
			engine.process("template", buildGroupContext(site, group), new FileWriter("site/" + group.getUrl()));
		}
	}

	private Context buildIndexContext(Site site) {
		return new Context(Locale.FRANCE, buildParam(site, "index"));
	}

	private Context build404Context(Site site) {
		return new Context(Locale.FRANCE, buildParam(site, "404"));
	}

	private Context buildGroupContext(Site site, Group group) {
		Map<String, Object> params = buildParam(site, "group");
		params.put("group", group);
		return new Context(Locale.FRANCE, params);
	}

	private Context buildArticleContext(Site site, Article article) {
		Map<String, Object> params = buildParam(site, "article");
		params.put("article", article);
		return new Context(Locale.FRANCE, params);
	}

	private void prepareDestFolder() throws IOException {
		new File("site").mkdir();
		new File("site/category").mkdir();
		new File("site/tag").mkdir();
		FileUtils.copyDirectoryToDirectory(new File("src/main/font"), new File("site"));
		FileUtils.copyDirectoryToDirectory(new File("src/main/js"), new File("site"));
	}

	private Map<String, Object> buildParam(Site site, String mode) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("site", site);
		param.put("mode", mode);
//		param.put("base", "file:///home/shionn/projects/BlogGenerator/site/");
		param.put("base", "https://shionn.github.io/");
		return param;
	}

}
