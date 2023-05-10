package blog.model.formater;

import org.commonmark.node.Block;
import org.commonmark.parser.InlineParser;
import org.commonmark.parser.block.BlockContinue;
import org.commonmark.parser.block.BlockParser;
import org.commonmark.parser.block.BlockParserFactory;
import org.commonmark.parser.block.BlockStart;
import org.commonmark.parser.block.MatchedBlockParser;
import org.commonmark.parser.block.ParserState;

public class GalleryBlockParser implements BlockParser {

	private static final String TAG = "[gallery]";

	public static class Factory implements BlockParserFactory {
		@Override
		public BlockStart tryStart(ParserState state, MatchedBlockParser matchedBlockParser) {
			if (TAG.equalsIgnoreCase(state.getLine().toString())) {
				return BlockStart.of(new GalleryBlockParser()).atIndex(state.getIndent());
			}
			return BlockStart.none();
		}
	}

	private GalleryBlock block = new GalleryBlock();

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
		if ("[/gallery]".equals(parserState.getLine().toString())) {
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
