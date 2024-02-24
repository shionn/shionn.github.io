package blog.model.formater;

import org.commonmark.parser.block.BlockParserFactory;
import org.commonmark.renderer.NodeRenderer;
import org.commonmark.renderer.html.HtmlNodeRendererContext;

import blog.model.formater.table.TableBlockParser;
import blog.model.formater.table.TableRenderer;

public class Table implements FormaterDescription {

	@Override
	public BlockParserFactory blockParserFactory() {
		return new TableBlockParser.Factory();
	}

	@Override
	public NodeRenderer createNodeRenderer(HtmlNodeRendererContext context) {
		return new TableRenderer(context);
	}

}
