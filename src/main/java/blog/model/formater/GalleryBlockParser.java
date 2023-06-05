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

public class GalleryBlockParser implements BlockParser {

	private static final String TAG = "gallery";

	public static class Factory implements BlockParserFactory {
		@Override
		public BlockStart tryStart(ParserState state, MatchedBlockParser matchedBlockParser) {
			if (state.getLine().toString().startsWith("[" + TAG)) {
				int w = getWidth(state.getLine());
				int h = getHeight(state.getLine());
				return BlockStart.of(new GalleryBlockParser(w, h)).atIndex(state.getIndent());
			}
			return BlockStart.none();
		}

		private int getWidth(CharSequence line) {
			Matcher m = Pattern.compile("w=(\\d+)").matcher( line);
			if (m.find()) {
				return Integer.parseInt(m.group(1));
			}
			return 0;
		}

		private int getHeight(CharSequence line) {
			Matcher m = Pattern.compile("h=(\\d+)").matcher(line);
			if (m.find()) {
				return Integer.parseInt(m.group(1));
			}
			return 0;
		}
	}

	private GalleryBlock block;

	public GalleryBlockParser(int w, int h) {
		this.block = new GalleryBlock(w, h);
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
			block.addImage(line.toString());
		}
	}

	public void closeBlock() {
	}

	@Override
	public void parseInlines(InlineParser inlineParser) {
	}

}
