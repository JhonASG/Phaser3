import { drawPlatforms, drawPlayers, drawStars } from "./config/configDrawObjs.js";
import { drawingObjs } from "./drawer/drawObjs.js";
import { Movement } from "./controller/movementPlayer.js"
import { AnimationsPlayer } from "./animations/animsPlayer.js"

// Variables y funciones comunes a todas nuestras class
let level = 1;
let playerQuantity = 2;
let players = [];
let groupsStars = 1;
let stars = [];
let bombs = "";
let scoreTxtP1 = "";
let scoreTxtP2 = "";

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
        players[0].score = 0;
        if (playerQuantity == 2) {
            players[1].score = 0;
            this.gameTime = 60;
            this.timeTXT = this.add.text(350, 0, this.gameTime, {
                fontFamily: 'font1',
                fontSize: '64px',
                color: 'white'
            });
            this.refreshTime(); // Metodo Phaser
        }

        //Creamos las estrellas de recompensa
        const starsGame = new drawingObjs(
            drawStars,
            platforms
        )
        stars = starsGame.createStars( this.physics, groupsStars );

        //Interación del player con las estrellas
        this.physics.add.overlap(players[0], stars, collectStar, null, this);
        
        bombs = this.physics.add.group()
        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(players[0], bombs, hitBomb, null, this);

        function hitBomb (player, bomb) {
            if (playerQuantity == 1) {
                this.physics.pause();
                player.setTint(0xff0000);
                player.anims.play('turnP1');
    
                this.time.addEvent({
                    delay:1500,
                    loop:false,
                    callback: () => {
                        this.scene.start("endScene");
                    }
                });
            } else {
                player.score = player.score - 50 <= 0 ? 0 : player.score - 50
                scoreTxtP1.setText( "Score: " + player.score );
            }
        }

        function collectStar(player, star){
            player.score += 10;
            colliderStars(star);
            scoreTxtP1.setText( "Score: " + player.score );
        }

        if ( playerQuantity == 2 ) {
            this.physics.add.overlap(players[1], stars, collectStar2, null, this);

            function collectStar2(player, star){
                player.score += 10;
                colliderStars(star);
                scoreTxtP2.setText( "Score: " + player.score );
            }

            this.physics.add.collider(players[1], bombs, hitBomb2, null, this);

            function hitBomb2 (player, bomb) {
                player.score = player.score - 50 <= 0 ? 0 : player.score - 50;
                scoreTxtP2.setText( "Score: " + player.score );
            }

            scoreTxtP2 = this.add.text(600, 16, 'Score: 0', {
                fontSize: '32px',
                fill: "#000"
            });
        }

        function colliderStars ( star ) {
            star.disableBody(true, true);

            if ( stars.countActive(true) === 0 ) {
                const bomb = bombs.create(Phaser.Math.Between(0, 800), 16, "bomb");
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-600*level, 600*level), 20);

                stars.children.iterate(function (child) {
                    child.enableBody(true, child.x, 0, true, true);
                });
            }
        }

        //Marcador y puntaje player
        //this.add.text(posX, posY, text, styles)
        scoreTxtP1 = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: "#000"
        });

        //Creacion animaciones
        //Tienen una clave que las identifica
        //Especificamos los frames -> Asset (sprite)
        //Indicamos la imagen inicial del sprite y la posición de la imagen final que va a tomar para realizar la animación
        //frameRate para indicar la velocidad de cambio entre un frame y otro
        const animationP1 = new AnimationsPlayer(
            ["leftP1", "turnP1", "rightP1"],
            "dude",
            this.anims,
            [
                [0, 3],
                [4, 4],
                [5, 8]
            ],
            10,
            -1
        );

        animationP1.CreateAnimationsPlayer();

        const animationP2 = new AnimationsPlayer(
            ["leftP2", "turnP2", "rightP2"],
            "secondPlayer",
            this.anims,
            [
                [0, 3],
                [4, 4],
                [5, 8]
            ],
            10,
            -1
        );

        animationP2.CreateAnimationsPlayer();
    }

    refreshTime () {
        this.gameTime--;
        this.timeTXT.setText(this.gameTime);

        if ( this.gameTime === 0 ) {
            this.physics.pause();
            players[0].setTint(0xff0000)
            players[1].setTint(0xff0000)

            this.time.addEvent({
                delay: 1500,
                loop: false,
                callback: () => {
                    this.scene.start('endScene');
                }
            });
        } else {
            this.time.delayedCall(
                1000,
                this.refreshTime,
                [],
                this
            )
        }
    }

    update () {
        // Detectamos la entrada por teclado
        let cursors = this.input.keyboard.createCursorKeys();
        const movementPlayer = new Movement(
            players[0],
            cursors.left,
            cursors.right,
            cursors.up,
            ["leftP1", "turnP1", "rightP1"],
        );
        movementPlayer.AddMovementPlayer();

        if (playerQuantity == 2) {
            let keyObjUp = this.input.keyboard.addKey("W")
            let keyObjleft = this.input.keyboard.addKey("A")
            let keyObjright = this.input.keyboard.addKey("D")

            const movementPlayer = new Movement(
                players[1],
                keyObjleft,
                keyObjright,
                keyObjUp,
                ["leftP2", "turnP2", "rightP2"],
            );
            movementPlayer.AddMovementPlayer();
        }
    }
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