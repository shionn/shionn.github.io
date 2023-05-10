package blog.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonFormat;

@JsonAutoDetect(fieldVisibility = Visibility.ANY)
public class Metadata {
	public enum Type {
		page,
		post
	}

	private Type type;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd")
	private Date date;
	private String title;
	private String category;
	private List<String> tags;

	public String getTitle() {
		return title;
	}

	public Type getType() {
		return type;
	}

	public Date getDate() {
		return date;
	}

	public String getCategory() {
		return category;
	}

	public List<String> getTags() {
		return tags;
	}

}