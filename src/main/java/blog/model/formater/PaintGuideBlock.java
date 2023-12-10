package blog.model.formater;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.commonmark.node.Block;
import org.commonmark.node.Visitor;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class PaintGuideBlock extends Block {

	private final String title, icon, link;

	private List<String> lines = new ArrayList<>();

	@Override
	public void accept(Visitor visitor) {
	}


	public void addLine(String line) {
		lines.add(line);
	}

	public boolean isLink() {
		return StringUtils.isNotBlank(link);
	}

}
