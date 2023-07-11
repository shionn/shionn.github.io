package blog.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class Menu {

	private final String name;
	private final String path;
	private final Menu parent;
	private List<Menu> childrens = new ArrayList<Menu>();

	@Override
	public String toString() {
		return "Menu [name=" + name + ", path=" + path + "]";
	}

	public String getPath() {
		return path + getExtenssion();
	}


	public String getTarget() {
		if (path.startsWith("https://")) {
			return "_blank";
		}
		return "";
	}

	private String getExtenssion() {
		if (path.startsWith("https://") || path.startsWith("mailto:")) {
			return "";
		}
		return ".html";
	}

	public void add(Menu child) {
		this.childrens.add(child);
	}

}
