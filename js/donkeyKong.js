import { drawPlatforms, drawPlayers, drawStars } from "./config/configDrawObjs.js";
import { drawingObjs } from "./drawer/drawObjs.js";

// Variables y funciones comunes a todas nuestras class
let level = 1;
let playerQuantity = 1;
let players = [];
let groupsStars = 1;
let stars = [];

// Las clases del video juego
// Especificación de la referencia para dirigir al usuario a x scene
// Método preload cargar assets del juego se ejecuta en primer lugar y una sola vez
// Método create la lógica del juego, pero solo una vez
// Método Update actualización de acciones en el juego que se ejecutan una y otra vez
class MainScene extends Phaser.Scene {
    constructor() {
        super("gameScene");
    }
    preload () {
        //Ruta donde se encuentra nuestro juego javascript
        this.load.baseURL = "./";

        //Precargar una imagen en Phaser 3. ("Nombre del asset como referencia", "URL de la img")
        this.load.image( "jungle", '../img/background.png' );
        this.load.image( "platform", '../img/platform1.png' );
        this.load.image( "ground", "../img/platform4.png" );
        this.load.image( "star", "../img/star.png" );
        this.load.image( "bomb", "../img/bomb.png" );
        this.load.image( "controlsPlayer1", "../img/Player1.png" );
        this.load.image( "controlsPlayer2", "../img/Player2.png" );

        //Precargar los sprites en Phaser 3.
        //Parametros
        //1) Nombre del asset para acceder a el luego
        //2) Nombre de la ruta en la que se encuentra el asset
        //3) Tamaño de recorte del sprite para acceder a cada imagen en el sprite
        this.load.spritesheet( "dude", "../img/dude.png", {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.spritesheet( "secondPlayer", "../img/secondPlayer.png", {
            frameWidth: 32,
            frameHeight: 48
        });
    }
    create () {
        //Creamos el fondo del juego
        //Parametros
        // Width, Height, Nombre del asset de la imagen
        this.add.image(400, 300, "jungle").setScale(2);

        //Creamos la plataforma en el juego
        //Variable para agregar las físicas a todas las plataformas
        let platforms = this.physics.add.staticGroup();

        //Creamos en el mapa las plataformas (Ground)
        //posX, posY, assets a dibujar
        const plataformGame = new drawingObjs(
            drawPlatforms,
            platforms
        );
        plataformGame.createPlatforms( 0 );
        plataformGame.createPlatforms( level );

        //Creamos los players en el juego
        const playerGame = new drawingObjs(
            drawPlayers,
            platforms
        );
        players = playerGame.createPlayer( this.physics, playerQuantity );

        //Creamos las estrellas de recompensa
        const starsGame = new drawingObjs(
            drawStars,
            platforms
        )
        stars = starsGame.createStars( this.physics, groupsStars );

        //Interación del player con las estrellas
        /* this.physics.add.overlap(players, stars, collectStar, null, this); */
    }
    update () {}
}

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload () {}
    create () {}
    update () {}
}

class Level extends Phaser.Scene {
    constructor() {
        super("levelScene");
    }
    preload () {}
    create () {}
    update () {}
}

class Mode extends Phaser.Scene {
    constructor() {
        super("modeScene");
    }
    preload () {}
    create () {}
    update () {}
}

class Controls extends Phaser.Scene {
    constructor() {
        super("controlsScene");
    }
    preload () {}
    create () {}
    update () {}
}

class EndGame extends Phaser.Scene {
    constructor() {
        super("endScene");
    }
    preload () {}
    create () {}
    update () {}
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
        MainScene,
        Menu,
        Level,
        Mode,
        Controls,
        EndGame
    ],
    scale: {
        mode: Phaser.Scale.FIT
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 300 }
        }
    }
}

//Inicialización del objeto Phaser
new Phaser.Game(config);