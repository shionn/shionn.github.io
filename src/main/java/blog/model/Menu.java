package blog.model;

import java.util.ArrayList;
import java.util.List;

public class Menu {

	private String name;
	private String path;
	private List<Menu> childrens;
	private Menu parent;

	public Menu(String name, String path, Menu parent) {
		this.name = name;
		this.path = path;
		this.parent = parent;
		this.childrens = new ArrayList<Menu>();
	}

	@Override
	public String toString() {
		return "Menu [name=" + name + ", path=" + path + "]";
	}

	public String getName() {
		return name;
	}

	public String getPath() {
		return '/' + path + ".html";
	}

	public void add(Menu child) {
		this.childrens.add(child);
	}

	public List<Menu> getChildrens() {
		return childrens;
	}

	public Menu getParent() {
		return parent;
	}

}
