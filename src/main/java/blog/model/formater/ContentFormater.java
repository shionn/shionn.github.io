package blog.model.formater;

import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.commonmark.node.FencedCodeBlock;
import org.commonmark.node.Image;
import org.commonmark.node.Link;
import org.commonmark.node.Node;
import org.commonmark.parser.Parser;
import org.commonmark.parser.PostProcessor;
import org.commonmark.renderer.NodeRenderer;
import org.commonmark.renderer.html.AttributeProvider;
import org.commonmark.renderer.html.AttributeProviderContext;
import org.commonmark.renderer.html.AttributeProviderFactory;
import org.commonmark.renderer.html.HtmlNodeRendererContext;
import org.commonmark.renderer.html.HtmlNodeRendererFactory;
import org.commonmark.renderer.html.HtmlRenderer;

import blog.model.formater.collection.TableBlockParser;
import blog.model.formater.collection.TableRenderer;
import blog.model.formater.gallery.GalleryBlockParser;
import blog.model.formater.gallery.GalleryRenderer;
import blog.model.formater.paint.PaintGuideParser;
import blog.model.formater.paint.PaintGuideRenderer;

public class ContentFormater {

	private static final int MAX_PARAGRAPH = 5;

	public String shortPost(String content) {
		Node nodes = homeParser().parse(content);
		return renderer().render(nodes);
	}

	public String fullPost(String content) {
		Node nodes = fullParser().parse(content);
		return renderer().render(nodes);
	}

	private Parser homeParser() {
		return Parser.builder()
				.customBlockParserFactory(new GalleryBlockParser.Factory())
				.customBlockParserFactory(new PaintGuideParser.Factory())
				.customBlockParserFactory(new TableBlockParser.Factory())
				.postProcessor(new PostProcessor() {
					/**
					 * permet de limiter à X paragraph pour la page d'acceuil
					 */
					@Override
					public Node process(Node root) {
						Node current = root.getFirstChild();
						int count = 0;
						while (current != null) {
							Node next = current.getNext();
							if (++count > MAX_PARAGRAPH) {
								current.unlink();
							}
							current = next;
						}
						return root;
					}
				})
				.build();
	}

	public Parser fullParser() {
		return Parser.builder()
				.customBlockParserFactory(new GalleryBlockParser.Factory())
				.customBlockParserFactory(new PaintGuideParser.Factory())
				.customBlockParserFactory(new TableBlockParser.Factory())
				.build();
	}

	private HtmlRenderer renderer() {
		return HtmlRenderer.builder().nodeRendererFactory(new HtmlNodeRendererFactory() {
			@Override
			public NodeRenderer create(HtmlNodeRendererContext context) {
				return new GalleryRenderer(context);
			}
		}).nodeRendererFactory(new HtmlNodeRendererFactory() {
			@Override
			public NodeRenderer create(HtmlNodeRendererContext context) {
				return new PaintGuideRenderer(context);
			}
		}).nodeRendererFactory(new HtmlNodeRendererFactory() {
			@Override
			public NodeRenderer create(HtmlNodeRendererContext context) {
				return new TableRenderer(context);
			}
		}).attributeProviderFactory(new AttributeProviderFactory() {
			@Override
			public AttributeProvider create(AttributeProviderContext context) {
				return new AttributeProvider() {
					@Override
					public void setAttributes(Node node, Map<String, String> attributes) {
						if (node instanceof FencedCodeBlock) {
							String type = ((FencedCodeBlock) node).getInfo();
							if (StringUtils.isBlank(type)) {
								type = "java";
							}
							attributes.put("class", type);
						} else if (node instanceof Image) {
							String src = ((Image) node).getDestination();
							if (src.startsWith("/")) {
								src = StringUtils.prependIfMissing(src, "/img");
								attributes.put("src", src);
							}
						} else if (node instanceof Link) {
							String src = ((Link) node).getDestination();
							if (src.startsWith("http")) {
								attributes.put("target", "_blank");
							}
						}
					}
				};
			}
		}).build();
	}

}
