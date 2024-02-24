package blog.model.formater;

import org.commonmark.parser.block.BlockParserFactory;
import org.commonmark.renderer.NodeRenderer;
import org.commonmark.renderer.html.HtmlNodeRendererContext;

import blog.model.formater.gallery.GalleryBlockParser;
import blog.model.formater.gallery.GalleryRenderer;

public class Gallery implements FormaterDescription {

	@Override
	public BlockParserFactory blockParserFactory() {
		return new GalleryBlockParser.Factory();
	}

	@Override
	public NodeRenderer createNodeRenderer(HtmlNodeRendererContext context) {
		return new GalleryRenderer(context);
	}

}
