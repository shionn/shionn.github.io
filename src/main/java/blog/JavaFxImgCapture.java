package blog;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

import javax.imageio.ImageIO;

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

	private static final String QUEST = "quest-1";

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
			requestCapture(QUEST);
		}
	}

	private void requestCapture(String id) {
		webView.getEngine().executeScript("document.getElementById(\"" + id + "\").scrollIntoView(true)");
		Platform.runLater(new Runnable() {
			@Override
			public void run() {
				try {
					TimeUnit.SECONDS.sleep(1);
					doCapture(id);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		});
	}

	private void doCapture(String id) {
		SnapshotParameters params = new SnapshotParameters();
		params.setViewport(new Rectangle2D(reteiveDouble(id, "left"), reteiveDouble(id, "top"),
				reteiveDouble(id, "width"), reteiveDouble(id, "height")));
		WritableImage snapshot = webView.snapshot(params, null);
		BufferedImage bufferedImage = SwingFXUtils.fromFXImage(snapshot, null);

		try {
			File output = new File("docs/pictures/defis/whisp-2025/" + id + "/temp.png");
			output.mkdirs();
			ImageIO.write(bufferedImage, "png", output);
		} catch (IOException e) {
			e.printStackTrace();
		}

		if (QUEST.equals(id)) {
			requestCapture("participants");
		} else {
			Platform.exit();
		}
	}

	private double reteiveDouble(String id, String prop) {
		return ((Number) webView.getEngine()
				.executeScript("q(\"#" + id + " table\").obj[0].getBoundingClientRect()." + prop)).doubleValue();
	}

}
