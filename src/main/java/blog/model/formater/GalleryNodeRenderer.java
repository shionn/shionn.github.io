package blog.model.formater;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.commonmark.node.Node;
import org.commonmark.renderer.NodeRenderer;
import org.commonmark.renderer.html.HtmlNodeRendererContext;
import org.commonmark.renderer.html.HtmlWriter;

public class GalleryNodeRenderer implements NodeRenderer {

	private HtmlNodeRendererContext context;
	private HtmlWriter writer;
	private int w;
	private int h;

	public GalleryNodeRenderer(HtmlNodeRendererContext context, int w, int h) {
		this.context = context;
		this.writer = context.getWriter();
		this.w = w;
		this.h = h;
	}

	@Override
	public Set<Class<? extends Node>> getNodeTypes() {
		Set<Class<? extends Node>> nodes = new HashSet<>();
		nodes.add(GalleryBlock.class);
		return nodes;
	}

	@Override
	public void render(Node node) {
		writer.tag("div", context.extendAttributes(node, Collections.singletonMap("class", "gallery")));
		for (String img : ((GalleryBlock) node).getImgs()) {
			writer.tag("a",
					Collections.singletonMap("href", "/" + StringUtils.prependIfMissing(img, "/img")));
			writer.tag("img", Collections.singletonMap("src",
					"/" + StringUtils.prependIfMissing(img, "/img") + "?w=" + w + "&h=" + h));
			writer.tag("/a");
		}
		writer.tag("/div");
	}

}
