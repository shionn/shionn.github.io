Pattern conseillé

Généralement lorsque l'on souhait faire un singleton chargé au dernier moment (Lazy Instance) on conseille d’utiliser ce pattern :

public class MySignleton {
    private static class MySingletonHolder {
        private static final MySingleton instance = new MySingleton();
    }
 
    private MySingleton() {
        // initialisation
    }
 
    public static MySingleton getInstance() {
        return MySingletonHolder.instance;
    }
}

Mais pourquoi utilise t'on ce pattern ? Ce pattern s'appuie sur le mécanisme de chargement de classe de java pour s'assurer à la fois l'instanciation unique et threadsafe de notre unique instance.

Pattern déconseillé

synchronized getInstance

Un autre pattern fonctionne mais n'est pas optimal :
public class MySignleton {
    private static MySingleton instance;
     
    private MySingleton() {
        // initialisation
    }
 
    public static synchronized MySingleton getInstance() {
        if (instance == null) {
            instance = new MySingleton();
        }
        return instance;
    }
}

Ce pattern n'est pas optimal car on synchronise la méthode getInstance à chaque appel. Et dans en environnement multitâche, ce n'est pas ce que l'on souhait.

double null check synchronized

Une solution alors est de synchroniser uniquement l'instanciation du bock. Comme suit :

public class MySignleton {
    private static MySingleton instance;
     
    private MySingleton() {
        // initialisation
    }
 
    public static MySingleton getInstance() {
        if (instance == null) {
            synchronized (MySignleton.class) {
                if (instance == null) {
                    instance = new MySingleton();
                }
            }
        }
        return instance;
    }
}

Si à la lecture du code ce pattern semble marcher, ce n'est pas le cas.

Ce qui suit n'est qu'une expression de ma compréhension de plusieurs année de lecture sur le sujet.

Cela est du à la représentation interne de la mémoire java. En effet l'affectation de la variable instance et l’exécution du code de l'instanciation est fait en Out-of-Order.

Techniquement quand on écrit :

instance = new MySingleton();

Voila ce que fait réellement la VM :

- allocation de l'espace mémoire pour l’objet de type MySingleton
- affectation de l'adresse de cette espace mémoire à la variable instance
- exécution du code de l'initialisation de MySingleton (appel au new etc...)

Ce qui signifie que le test instance  == null n'est pas gage que l'instance est initialisé.


Source

pourquoi le double check ne marche pas : http://www.cs.umd.edu/~pugh/java/memoryModel/DoubleCheckedLocking.html
