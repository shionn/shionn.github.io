package blog.generator;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
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

	public static Menu build() throws IOException {
		Menu root = new Menu("root", "index", null);
		Menu parent = root;
		try (BufferedReader reader = new BufferedReader(new InputStreamReader(
				Thread.currentThread().getContextClassLoader().getResourceAsStream("menu.txt")))) {
			String line = reader.readLine();
			while (line != null) {
				if (deep(line) > parent.deep()) {
					parent = parent.childrens.get(parent.childrens.size() - 1);
				}
				while (deep(line) < parent.deep()) {
					parent = parent.parent;
				}
				line = line.strip();
				parent.add(new Menu(line.split("\\t")[1], line.split("\\t")[0], parent));
				line = reader.readLine();
			}
		}
		return root;
	}

	private int deep() {
		if (parent == null) {
			return 0;
		}
		return parent.deep() + 1;
	}

	private void add(Menu child) {
		this.childrens.add(child);
	}

	private static int deep(String line) {
		if (line.charAt(0) == '\t') {
			return deep(line.substring(1)) + 1;
		}
		return 0;
	}

	@Override
	public String toString() {
		return "Menu [name=" + name + ", path=" + path + "]";
	}

	public String getName() {
		return name;
	}

	public String getPath() {
		return path + ".html";
	}

	public List<Menu> getChildrens() {
		return childrens;
	}

}
