package blog.generator;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import blog.model.Article;
import blog.model.Group;
import blog.model.Site;
import blog.model.builder.SiteBuilder;
import blog.template.TemplateEngineBuilder;

public class Generator {

//	private static final String BASE = "file:///home/shionn/projects/BlogGenerator/docs/";
//	private static final String BASE = "file:///home/shionn/projects/shionn.github.io/docs/";
//	private static final String BASE = "https://shionn.github.io/";
	private static final String TARGET = "docs";

	public static void main(String[] args) throws IOException {
		new Generator().generate(args[0]);
	}

	private void generate(String base) throws IOException {
		prepareDestFolder();
		Site site = new SiteBuilder().build(base);
		TemplateEngine engine = new TemplateEngineBuilder().build();
		engine.process("template", buildIndexContext(site), new FileWriter(TARGET + "/index.html"));
		engine.process("template", buildDraftContext(site), new FileWriter(TARGET + "/draft.html"));
		engine.process("template", build404Context(site), new FileWriter(TARGET + "/404.html"));
		for (Article article : site.getArticles()) {
			new File(TARGET + "/" + article.getFolder()).mkdirs();
			System.out.println("generate " + article.getTitle() + " into " + article.getUrl());
			engine.process("template", buildArticleContext(site, article),
					new FileWriter(TARGET + "/" + article.getUrl()));
		}
		for (Group group : site.getGroups()) {
			engine.process("template", buildGroupContext(site, group), new FileWriter(TARGET + "/" + group.getUrl()));
		}
	}

	private Context buildIndexContext(Site site) {
		Map<String, Object> params = buildParam(site, "index");
		params.put("scripts", site.getJs());
		return new Context(Locale.FRANCE, params);
	}

	private Context build404Context(Site site) {
		return new Context(Locale.FRANCE, buildParam(site, "404"));
	}

	private Context buildDraftContext(Site site) {
		Map<String, Object> params = buildParam(site, "draft");
		params.put("scripts", site.getJs());
		return new Context(Locale.FRANCE, params);
	}

	private Context buildGroupContext(Site site, Group group) {
		Map<String, Object> params = buildParam(site, "group");
		params.put("group", group);
		params.put("scripts", group.getJs());
		return new Context(Locale.FRANCE, params);
	}

	private Context buildArticleContext(Site site, Article article) {
		Map<String, Object> params = buildParam(site, "article");
		params.put("article", article);
		params.put("scripts", article.getJs());
		return new Context(Locale.FRANCE, params);
	}

	private void prepareDestFolder() throws IOException {
		new File(TARGET).mkdir();
		new File(TARGET + "/category").mkdir();
		new File(TARGET + "/tag").mkdir();
		Arrays.stream(new File(TARGET + "/draft").listFiles()).forEach(f -> f.delete());
	}

	private Map<String, Object> buildParam(Site site, String mode) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("site", site);
		param.put("mode", mode);
		return param;
	}

}
