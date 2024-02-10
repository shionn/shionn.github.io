package blog.model.formater.collection;

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

public class TableBlockParser implements BlockParser {

	private static final String TAG = "table";

	public static class Factory implements BlockParserFactory {
		@Override
		public BlockStart tryStart(ParserState state, MatchedBlockParser matchedBlockParser) {
			if (state.getLine().toString().startsWith("[" + TAG)) {
				String type = getAttr("class", state);
				String title = getAttr("title", state);
				String[] cols = getAttr("cols", state).split(",");
				return BlockStart.of(new TableBlockParser(type, title, cols)).atIndex(state.getIndent());
			}
			return BlockStart.none();
		}

		private String getAttr(String attr, ParserState state) {
			Matcher m = Pattern.compile(attr + "=\"([^\"]+)\"").matcher(state.getLine());
			if (m.find()) {
				return m.group(1);
			}
			return "";
		}
	}

	private TableBlock block;

	public TableBlockParser(String type, String title, String[] cols) {
		this.block = new TableBlock(type, title, cols);
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
			block.addData(line.toString().split("\t"));
		}
	}

	public void closeBlock() {
	}

	@Override
	public void parseInlines(InlineParser inlineParser) {
	}

}
