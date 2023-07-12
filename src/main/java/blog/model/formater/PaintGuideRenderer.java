package blog.model.formater;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.commonmark.node.Node;
import org.commonmark.renderer.NodeRenderer;
import org.commonmark.renderer.html.HtmlNodeRendererContext;
import org.commonmark.renderer.html.HtmlWriter;

public class PaintGuideRenderer implements NodeRenderer {

	private HtmlNodeRendererContext context;
	private HtmlWriter writer;

	public PaintGuideRenderer(HtmlNodeRendererContext context) {
		this.context = context;
		this.writer = context.getWriter();
	}

	@Override
	public Set<Class<? extends Node>> getNodeTypes() {
		Set<Class<? extends Node>> nodes = new HashSet<>();
		nodes.add(PaintGuideBlock.class);
		return nodes;
	}

	@Override
	public void render(Node node) {
		writer.tag("table", Collections.singletonMap("class", "paint-guide"));
		tableHeader(node);
		writer.tag("tbody");
		for (String line : guide(node).getLines()) {
			writer.tag("tr");
			writer.tag("td", Collections.singletonMap("data-id", line.split("\t")[1]));
			writer.text(line.split("\t")[0]);
			writer.tag("/td");
			writer.tag("/tr");
		}
		writer.tag("/tbody");
		writer.tag("/table");
	}

	private void tableHeader(Node node) {
		writer.tag("thead");
		writer.tag("tr");
		writer.tag("th", Collections.singletonMap("colspan", "10"));
		writer.text(guide(node).getTitle());
		writer.tag("/th");
		writer.tag("/tr");
		writer.tag("tr");
		th("Etape");
		th("Vallejo");
		th("Eq Citadel");
		th("Eq AP");
		th("Eq GSW");
		writer.tag("/tr");
		writer.tag("/thead");
	}

	private void th(String title) {
		writer.tag("th", Collections.singletonMap("colspan", "2"));
		writer.text(title);
		writer.tag("/th");
	}

	private PaintGuideBlock guide(Node node) {
		return (PaintGuideBlock) node;
	}

}
