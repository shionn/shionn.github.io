package blog.model.formater;

import org.commonmark.parser.block.BlockParserFactory;
import org.commonmark.renderer.NodeRenderer;
import org.commonmark.renderer.html.HtmlNodeRendererContext;

import blog.model.formater.paint.PaintGuideParser;
import blog.model.formater.paint.PaintGuideRenderer;

public class Paint implements FormaterDescription {

	@Override
	public BlockParserFactory blockParserFactory() {
		return new PaintGuideParser.Factory();
	}

	@Override
	public NodeRenderer createNodeRenderer(HtmlNodeRendererContext context) {
		return new PaintGuideRenderer(context);
	}

}
