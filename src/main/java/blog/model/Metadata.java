package blog.model;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

@Getter
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
public class Metadata {
	public enum Type {
		page,
		post
	}

	private Type type;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd")
	private Date date;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd")
	private Date updated;
	private String title;
	@JsonProperty(value = "logo-folder")
	private String logoFolder;
	private String category;
	private List<String> tags;
	private List<String> js = new ArrayList<String>();
	private boolean published = true;
	private boolean logo = false;

	public int getYear() {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar.get(Calendar.YEAR);
	}

}