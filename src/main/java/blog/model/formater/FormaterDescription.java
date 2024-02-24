package blog.model.formater;

import org.commonmark.parser.block.BlockParserFactory;
import org.commonmark.renderer.NodeRenderer;
import org.commonmark.renderer.html.HtmlNodeRendererContext;

interface FormaterDescription {

	BlockParserFactory blockParserFactory();

	NodeRenderer createNodeRenderer(HtmlNodeRendererContext context);

}
