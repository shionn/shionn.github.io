package blog;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DecaleDate {

	static DateFormat format = new SimpleDateFormat("yyyy/MM/dd");
	
	
	public static void main(String[] args) throws ParseException {
		new DecaleDate().start(format.parse("2025/01/02"), 10);
	}

	private void start(Date date, int day) {
		
		
	}
}
