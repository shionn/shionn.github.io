package blog.model.formater;

import java.util.ArrayList;
import java.util.List;

import org.commonmark.node.Block;
import org.commonmark.node.Visitor;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class PaintGuideBlock extends Block {

	private final String title;
	private List<String> lines = new ArrayList<>();

	@Override
	public void accept(Visitor visitor) {
		// TODO Auto-generated method stub

	}

	public void addLine(String line) {
		lines.add(line);
	}

}
