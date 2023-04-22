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
		engine.process("template", buildContext(site, "index"), new FileWriter("site/index.html"));
	}

	private void prepareDestFolder() throws IOException {
		new File("site").mkdir();
		FileUtils.copyDirectoryToDirectory(new File("src/main/font"), new File("site"));
		FileUtils.copyDirectoryToDirectory(new File("src/main/js"), new File("site"));
	}

	private Context buildContext(Site site, String content) throws IOException {
		return new Context(Locale.FRANCE, buildParam(site, content));
	}

	private Map<String, Object> buildParam(Site site, String content) throws IOException {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("site", site);
		param.put("content", content);
		return param;
	}


}
