package blog.model.formater.collection;

import java.util.ArrayList;
import java.util.List;

import org.commonmark.node.Block;
import org.commonmark.node.Visitor;

public class CollectionBlock extends Block {

	private String type;
	private String title;
	private String[] cols;
	private List<String[]> datas = new ArrayList<String[]>();

	public CollectionBlock(String type, String title, String[] cols) {
		this.type = type;
		this.title = title;
		this.cols = cols;
	}

	@Override
	public void accept(Visitor visitor) {
		System.out.println("accept");
	}

	public void addData(String[] data) {
		this.datas.add(data);
	}

	public String getType() {
		return type;
	}

	public String getTitle() {
		return title;
	}

	public String[] getCols() {
		return cols;
	}

	public List<String[]> getDatas() {
		return datas;
	}

}
