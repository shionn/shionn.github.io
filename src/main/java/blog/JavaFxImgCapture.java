package blog;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

import javax.imageio.ImageIO;

import org.w3c.dom.Element;

import blog.generator.Configuration;
import javafx.application.Application;
import javafx.application.Platform;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.concurrent.Worker;
import javafx.concurrent.Worker.State;
import javafx.embed.swing.SwingFXUtils;
import javafx.geometry.Rectangle2D;
import javafx.scene.Scene;
import javafx.scene.SnapshotParameters;
import javafx.scene.image.WritableImage;
import javafx.scene.web.WebView;
import javafx.stage.Stage;

public class JavaFxImgCapture extends Application implements ChangeListener<Worker.State> {

	private static final int SLEEP_TIME = 2;
	private static final String QUEST = "quest-";

	public static void main(String[] args) {
		launch(args);
	}

	private WebView webView;

	@Override
	public void start(Stage primaryStage) throws Exception {
		webView = new WebView();

		String url = Configuration.get().getBase();
		if (!url.endsWith("/")) {
			url += "/";
		}
		// todo draft > 2025
		url += "draft/pour-la-gloire-de-tortuga.html";
		System.out.println("open url " + url);
		webView.getEngine().load(url);
		webView.getEngine().getLoadWorker().stateProperty().addListener(this);

		Scene scene = new Scene(webView, 1400, 1200);
		primaryStage.setScene(scene);
		primaryStage.show();
	}

	@Override
	public void changed(ObservableValue<? extends State> observable, State oldValue, State newState) {
		if (newState == Worker.State.SUCCEEDED) {
			System.out.println("scroll bottom");
			webView.getEngine().executeScript("window.scrollTo(0, document.body.scrollHeight)");
			Platform.runLater(new Runnable() {
				@Override
				public void run() {
					try {
						TimeUnit.SECONDS.sleep(SLEEP_TIME);
						searchForCurrentQuest();
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
			});
		}
	}

	private void requestCapture(String id, String path) {
		System.out.println("scroll to " + id);
//		String scrolloption = "{block: \"start\", inline: \"nearest\", behavior: \"instant\"}";
		webView.getEngine().executeScript("document.getElementById(\"" + id + "\").scrollIntoView(true)");
		Platform.runLater(new Runnable() {
			@Override
			public void run() {
				try {
					TimeUnit.SECONDS.sleep(SLEEP_TIME);
					doCapture(id, path);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		});
	}

	private void searchForCurrentQuest() {
		int i = 50;
		Element element = webView.getEngine().getDocument().getElementById(QUEST + i);
		while (element == null && i > 0) {
			i--;
			element = webView.getEngine().getDocument().getElementById(QUEST + i);
		}
		if (element != null) {
			requestCapture(QUEST + i, "quests");
		}
	}

	private void doCapture(String id, String path) {
		SnapshotParameters params = new SnapshotParameters();
		params.setViewport(new Rectangle2D(reteiveDouble(id, "left"), reteiveDouble(id, "top"),
				reteiveDouble(id, "width"), reteiveDouble(id, "height")));
		WritableImage snapshot = webView.snapshot(params, null);
		BufferedImage bufferedImage = SwingFXUtils.fromFXImage(snapshot, null);
		System.out.println("capture done for " + id);
		try {
			File output = new File("docs/pictures/defis/tortuga-2025/" + path + "/temp.png");
			output.mkdirs();
			ImageIO.write(bufferedImage, "png", output);
		} catch (IOException e) {
			e.printStackTrace();
		}

		if (id.startsWith(QUEST)) {
			requestCapture("participants", "players");
		} else {
			Platform.exit();
		}
	}

	private double reteiveDouble(String id, String prop) {
		return ((Number) webView.getEngine()
				.executeScript("q(\"#" + id + " table\").obj[0].getBoundingClientRect()." + prop)).doubleValue();
	}

}
