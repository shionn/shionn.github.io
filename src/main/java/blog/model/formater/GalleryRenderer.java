package blog.model.formater;

import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;

import org.commonmark.node.Node;
import org.commonmark.renderer.NodeRenderer;
import org.commonmark.renderer.html.HtmlNodeRendererContext;
import org.commonmark.renderer.html.HtmlWriter;

public class GalleryRenderer implements NodeRenderer {

	private HtmlNodeRendererContext context;
	private HtmlWriter writer;

	public GalleryRenderer(HtmlNodeRendererContext context) {
		this.context = context;
		this.writer = context.getWriter();
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
		for (String imgStr : gallery(node).getImgs()) {
			String[] img = Pattern.compile("\t").split(imgStr);

			writer.tag("a", Collections.singletonMap("href", url(img)));
			writer.tag("img", buildImgAttrs(img, gallery(node)));
			writer.tag("/a");
		}
		writer.tag("/div");
	}

	private Map<String, String> buildImgAttrs(String[] img, GalleryBlock gallery) {
		Map<String, String> attrs = new HashMap<String, String>();
		attrs.put("src", url(img));
		if (gallery.getW() > 0) {
			attrs.put("width", Integer.toString(gallery.getW()));
		}
		if (gallery.getH() > 0) {
			attrs.put("height", Integer.toString(gallery.getH()));
		}
		if (img.length > 1) {
			attrs.put("style", "object-position: " + img[1]);
		}
		return attrs;
	}

	private GalleryBlock gallery(Node node) {
		return (GalleryBlock) node;
	}

	private String url(String[] img) {
		return img[0];
	}

}
