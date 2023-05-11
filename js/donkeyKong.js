// Variables y funciones comunes a todas nuestras class


// Las clases del video juego
// Especificación de la referencia para dirigir al usuario a x scene
// Método preload cargar assets del juego se ejecuta en primer lugar y una sola vez
// Método create la lógica del juego, pero solo una vez
// Método Update actualización de acciones en el juego que se ejecutan una y otra vez
class MainScene extends Phaser.Scene {
    constructor() {
        super("gameScene");
    }
    Preload () {}
    Create () {}
    Update () {}
}

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    Preload () {}
    Create () {}
    Update () {}
}

class Level extends Phaser.Scene {
    constructor() {
        super("levelScene");
    }
    Preload () {}
    Create () {}
    Update () {}
}

class Mode extends Phaser.Scene {
    constructor() {
        super("modeScene");
    }
    Preload () {}
    Create () {}
    Update () {}
}

class Controls extends Phaser.Scene {
    constructor() {
        super("controlsScene");
    }
    Preload () {}
    Create () {}
    Update () {}
}

class EndGame extends Phaser.Scene {
    constructor() {
        super("endScene");
    }
    Preload () {}
    Create () {}
    Update () {}
}

// Configuración genérica del videojuego
// Verifica con el type si usa para mostrar el juego el canva o webgl para ello AUTO
// En la propiedad width y height la resolución del juego
// En la propiedad scene todas las escenas del juego, el primer elemento indica la primera escena que se visualiza
// En la propiedad scale para indicar que el ancho y la altura se ajusta manteniendo una relación de aspecto
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 530,
    scene: [
        Menu,
        MainScene,
        Level,
        Mode,
        Controls,
        EndGame
    ],
    scale: {
        mode: Phaser.Scale.FIT
    }
}

//Inicialización del objeto Phaser
new Phaser.Game(config);