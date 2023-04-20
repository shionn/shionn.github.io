package blog.generator;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.FileTemplateResolver;

public class Generator {

	public static void main(String[] args) {
		new Generator().generate();
	}

	private void generate() {
		TemplateEngine engine = new TemplateEngine();
		engine.setTemplateResolver(initResolver());
	}

	private FileTemplateResolver initResolver() {
		FileTemplateResolver resolver = new FileTemplateResolver();
		resolver.setTemplateMode(TemplateMode.HTML);
		resolver.setPrefix("/templates/");
		resolver.setSuffix(".html");
		return resolver;
	}

}
