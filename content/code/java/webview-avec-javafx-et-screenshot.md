Pour un projet personnel, j'ai eu besoin récemment de faire des captures d'écran d'un site web en java.
J'ai même envisagé d'installer un serveur avec un outil comme cypress, mais __FLEMME__.

## Une webview avec Java FX

La solution la plus simple que j'ai trouvé est d'utiliser JavaFX. 

### Import

Voici l'import Maven que j'ai ajouté à mon projet.

~~~xml
<dependency>
    <groupId>org.openjfx</groupId>
    <artifactId>javafx-web</artifactId>
    <version>21.0.5</version>
</dependency>
~~~

La version de JavaFX à importer dépend de la version de votre JDK : 
[table cols="Version JDK, Version JavaFX"]
11	17
17	21
21	23
[/table]

### Exemple de code

Ensuite afficher le site n'est clairement pas le plus dur : 

~~~java
public class JavaFxImgCapture extends Application {

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) throws Exception {
        WebView webView = new WebView();

        webView.getEngine().load("https://SomeWebSite.com");

        Scene scene = new Scene(webView, 800, 600);
        primaryStage.setScene(scene);
        primaryStage.show();
    }
}
~~~

### Lancer le programme 

Le plus simple que j'ai trouvé est de passer par une commande maven grâce à ce plugin : 

~~~xml 
<plugin>
     <groupId>org.openjfx</groupId>
     <artifactId>javafx-maven-plugin</artifactId>
     <version>0.0.8</version>
     <configuration>
          <mainClass>monpackage.JavaFxImgCapture</mainClass>
     </configuration>
</plugin>
~~~

Et on peu l'exécuter avec la commande suivante : 

~~~shell
mvn javafx:run
~~~

## Faire une Capture d'écran

Cela à été beaucoup plus compliquer qu'il n'y parait. Il faut : 
- attendre que le site soit chargé
- attendre que les ressources soit chargées (image, javascript par exemple)
- faire la capture

La difficulté étant qu'il ne faut pas faire un _sleep_ dans un thread JavaFX et qu'on ne peu pas exécuter un commande JavaFX dans un thread qui n'est pas d'origine de JavaFX.

Donc si je reprend la liste précédente il faut faire comme cela : 
- attendre que le site soit chargé : Callback JavaFX.
- attendre que les ressources soit chargées (image javascript) : Faire un pause dans un thread classique.
- faire la captures : Prendre la capture dans un Thread JavaFX. 

### Import

On va avoir besoin d'import supplémentaire : 

~~~xml
<dependency>
    <groupId>org.openjfx</groupId>
    <artifactId>javafx-swing</artifactId>
    <version>21.0.5</version>
</dependency>
~~~

### Code Java

~~~java
public class JavaFxImgCapture extends Application implements ChangeListener<Worker.State> {

    public static void main(String[] args) {
        launch(args);
    }

    private WebView webView

    @Override
    public void start(Stage primaryStage) throws Exception {
        webView = new WebView();
        webView.getEngine().load("https://SomeWebSite.com");
        
        // enregistrement du callback :
        webView.getEngine().getLoadWorker().stateProperty().addListener(this);

        Scene scene = new Scene(webView, 800, 600);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    @Override
    public void changed(ObservableValue<? extends State> observable, State oldState, State newState) {
        // Le site est chargé
        if (newState == Worker.State.SUCCEEDED) {
            waitInStandartThread();
        }
    }
    
    private void waitInStandartThread() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    TimeUnit.SECONDS.sleep(SLEEP_TIME);
                    doCaptureInJavaFxThread();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }
    
    private void doCaptureInJavaFxThread() {
        Platform.runLater(new Runnable() {
            @Override
            public void run() {
                doCapture();
            }
        });
    }

    private void doCapture() {
        WritableImage snapshot = webView.snapshot(null, null);
        BufferedImage bufferedImage = SwingFXUtils.fromFXImage(snapshot, null);
        try {
            ImageIO.write(bufferedImage, "png", new File("SomeOutputFile.png"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
~~~


## Sans interface graphique

Si comme moi vous avez votre serveur linux qui automatise des choses, 
vous n'avez probablement pas d'interface graphique sur celui-ci et donc vous ne pouvez 
pas lancer un programme en JavaFX. 

La solution que j'ai trouvé est d'utiliser le serveur X FrameBuffer. 
Ce serveur X émule la sortie écran en mémoire, d'où le nom _framebuffer_.

~~~shell
sudo apt install xvfb
~~~

Et pour lancer un programme dans ce serveur X il suffit de préfixer la commande par xvfb-run. Par exemple : 

~~~shell
xvfb-run mvn javafx:run
~~~
