package blog.generator;

import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.FileTemplateResolver;

public class Generator {

	public static void main(String[] args) throws IOException {
		new Generator().generate();
	}

	private void generate() throws IOException {
		TemplateEngine engine = new TemplateEngine();
		engine.setTemplateResolver(initResolver());
		engine.process("template", buildContext(), new FileWriter("site/index.html"));
	}

	private Context buildContext() throws IOException {
		Context context = new Context(Locale.FRANCE, buildParam());
		context.setVariable("test", "ceci est une variable");
		return context;
	}

	private Map<String, Object> buildParam() throws IOException {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("test", "ceci est un test");
		param.put("menu", Menu.build());
		return param;
	}

	private FileTemplateResolver initResolver() {
		FileTemplateResolver resolver = new FileTemplateResolver();
		resolver.setTemplateMode(TemplateMode.HTML);
		resolver.setPrefix("src/main/resources/templates/");
		resolver.setSuffix(".html");
		return resolver;
	}

}
