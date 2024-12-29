package blog;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

import javax.imageio.ImageIO;
import javax.swing.JFrame;

import org.w3c.dom.Element;

import javafx.application.Application;
import javafx.application.Platform;
import javafx.beans.InvalidationListener;
import javafx.beans.Observable;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.concurrent.Worker;
import javafx.concurrent.Worker.State;
import javafx.embed.swing.SwingFXUtils;
import javafx.event.Event;
import javafx.event.EventHandler;
import javafx.geometry.Rectangle2D;
import javafx.scene.Scene;
import javafx.scene.SnapshotParameters;
import javafx.scene.image.WritableImage;
import javafx.scene.layout.VBox;
import javafx.scene.robot.Robot;
import javafx.scene.web.WebView;
import javafx.stage.Stage;

public class JavaFxImgCapture extends Application implements ChangeListener<Worker.State> {

	public static void main(String[] args) {
		launch(args);
	}

	private WebView webView;

//	private void doCapture() {
//		JFrame frame = new JFrame("Swing and JavaFX : Browser");
//		WebView browser = new WebView();
//		final JFXPanel jfxPanel = new JFXPanel();
//
//	}

	@Override
	public void start(Stage primaryStage) throws Exception {
		webView = new WebView();
		webView.getEngine().load("https://shionn.github.io/draft/pour-la-gloire-de-tortuga.html");
		webView.getEngine().getLoadWorker().stateProperty().addListener(this);

		Scene scene = new Scene(webView, 1400, 1200);
		webView.setOnScroll(new EventHandler<Event>() {

			@Override
			public void handle(Event event) {
				System.out.println("scroll "+event);
				
			}
		});
		primaryStage.setScene(scene);
		primaryStage.show();
	}

	@Override
	public void changed(ObservableValue<? extends State> observable, State oldValue, State newState) {
		if (newState == Worker.State.SUCCEEDED) {
			
			// quest-1
			webView.getEngine().executeScript("document.getElementById(\"quest-1\").scrollIntoView(true)");
			Platform.runLater(new Runnable() {
				
				@Override
				public void run() {
					try {
						TimeUnit.SECONDS.sleep(1);
						doCapture();
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
			});

		}
	}
	
	private void doCapture() {
		SnapshotParameters params = new SnapshotParameters();
		params.setViewport(new Rectangle2D(reteiveDouble("left"), reteiveDouble("top"), reteiveDouble("width"), reteiveDouble("height")));
		WritableImage snapshot = webView.snapshot(params, null);
		BufferedImage bufferedImage = SwingFXUtils.fromFXImage(snapshot, null);
		
		
		try {
			ImageIO.write(bufferedImage, "png", new File("test.png"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println("capture done");
	}

	private double reteiveDouble(String prop) {
		System.out.println("reading "+prop);
		return ((Number) webView.getEngine().executeScript("q(\"#quest-1 table\").obj[0].getBoundingClientRect()."+prop)).doubleValue();
	}

}
