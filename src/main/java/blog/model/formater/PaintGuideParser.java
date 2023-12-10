package blog.model.formater;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.commonmark.node.Block;
import org.commonmark.parser.InlineParser;
import org.commonmark.parser.block.BlockContinue;
import org.commonmark.parser.block.BlockParser;
import org.commonmark.parser.block.BlockParserFactory;
import org.commonmark.parser.block.BlockStart;
import org.commonmark.parser.block.MatchedBlockParser;
import org.commonmark.parser.block.ParserState;

public class PaintGuideParser implements BlockParser {
	private static final String TAG = "paints";

	public static class Factory implements BlockParserFactory {

		@Override
		public BlockStart tryStart(ParserState state, MatchedBlockParser matchedBlockParser) {
			if (state.getLine().toString().startsWith("[" + TAG)) {
				return BlockStart.of(new PaintGuideParser(
						getAttr("title", state), getAttr("icon", state),
						getAttr("link", state)
						))
						.atIndex(state.getIndent());

			}
			return null;
		}

		private String getAttr(String attr, ParserState state) {
			Matcher m = Pattern.compile(attr + "=\"([^\"]+)\"").matcher(state.getLine());
			if (m.find()) {
				return m.group(1);
			}
			return "";
		}

	}

	private PaintGuideBlock block;

	public PaintGuideParser(String title, String icon, String link) {
		this.block = new PaintGuideBlock(title, icon, link);
	}

	@Override
	public boolean isContainer() {
		return false;
	}

	@Override
	public boolean canContain(Block block) {
		return false;
	}

	@Override
	public Block getBlock() {
		return block;
	}

	@Override
	public BlockContinue tryContinue(ParserState parserState) {
		if (("[/" + TAG + "]").equals(parserState.getLine().toString())) {
			return BlockContinue.finished();
		}
		return BlockContinue.atIndex(parserState.getIndex());
	}

	@Override
	public void addLine(CharSequence line) {
		if (!line.toString().contains(TAG)) {
			block.addLine(line.toString());
		}

	}

	@Override
	public void closeBlock() {
	}

	@Override
	public void parseInlines(InlineParser inlineParser) {
	}

}
