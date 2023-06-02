import { drawPlatforms, drawPlayers, drawStars } from "./config/configDrawObjs.js";
import { drawingObjs } from "./drawer/drawObjs.js";
import { Movement } from "./controller/movementPlayer.js"
import { AnimationsPlayer } from "./animations/animsPlayer.js"

// Variables y funciones comunes a todas nuestras class
let level = 1;
let playerQuantity = 1;
let players = [];
let groupsStars = 1;
let stars = [];
let bombs = "";
let scoreTxtP1 = "";
let scoreTxtP2 = "";
let goLeftP1 = false;
let goLeftP2 = false;
let goRightP1 = false;
let goRightP2 = false;
let goUpP1 = false;
let goUpP2 = false;
let stateMusic = true;
let levelName = "Easy";
let modeName = "2 Players";

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
        /* this.load.baseURL = "./"; */

        //Precargar una imagen en Phaser 3. ("Nombre del asset como referencia", "URL de la img")
        /* this.load.image( "jungle", '../img/background.png' );
        this.load.image( "platform", '../img/platform1.png' );
        this.load.image( "ground", "../img/platform4.png" );
        this.load.image( "star", "../img/star.png" );
        this.load.image( "bomb", "../img/bomb.png" );
        this.load.image( "controlsPlayer1", "../img/Player1.png" );
        this.load.image( "controlsPlayer2", "../img/Player2.png" ); */

        //Precargar los sprites en Phaser 3.
        //Parametros
        //1) Nombre del asset para acceder a el luego
        //2) Nombre de la ruta en la que se encuentra el asset
        //3) Tamaño de recorte del sprite para acceder a cada imagen en el sprite
        /* this.load.spritesheet( "dude", "../img/dude.png", {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.spritesheet( "secondPlayer", "../img/secondPlayer.png", {
            frameWidth: 32,
            frameHeight: 48
        }); */

        // Carga de sonidos
        /* this.load.audio('music', '../sounds/Banana_Craziness.mp3');
        this.load.audio('getStar', '../sounds/Rise06.mp3');
        this.load.audio('crash', '../sounds/bzzzt.wav'); */
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

            // Ejecutar la musica de bomba le pega al player
            const musicBomb = this.sound.add('crash');
            musicBomb.play({
                volume: 1,
                loop: false,
            });
        }

        function collectStar(player, star){
            player.score += 10;
            colliderStars(star, this);
            scoreTxtP1.setText( "Score: " + player.score );
        }

        if ( playerQuantity == 2 ) {
            this.physics.add.overlap(players[1], stars, collectStar2, null, this);

            function collectStar2(player, star){
                player.score += 10;
                colliderStars(star, this);
                scoreTxtP2.setText( "Score: " + player.score );
            }

            this.physics.add.collider(players[1], bombs, hitBomb2, null, this);

            function hitBomb2 (player, bomb) {
                player.score = player.score - 50 <= 0 ? 0 : player.score - 50;
                scoreTxtP2.setText( "Score: " + player.score );

                // Ejecutar la musica de bomba le pega al player
                const musicBomb = this.sound.add('crash');
                musicBomb.play({
                    volume: 1,
                    loop: false,
                });
            }

            scoreTxtP2 = this.add.text(600, 16, 'Score: 0', {
                fontSize: '32px',
                fill: "#000"
            });
        }

        function colliderStars ( star, audio ) {
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

            // Ejecutar la musica de obtener la estrella
            const musicStar = audio.sound.add('getStar');
            musicStar.play({
                volume: 1,
                loop: false,
            });
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

        
        if ( playerQuantity == 2 ) {
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

        /* Mobile Controls */
        if ( screen.width <= 900 ) {
            this.add.image(100, 450, 'controlsPlayer1').setScale(0.5) //Add buttons movement

            //Crear zonas para interactuar con los botones
            const leftOpcP1 = this.add.zone(15, 420, 50, 50)
            leftOpcP1.setOrigin(0, 0)
            leftOpcP1.setInteractive();
            leftOpcP1.on('pointerdown', () => goLeftP1 = true);
            leftOpcP1.on('pointerup', () => goLeftP1 = false);
            leftOpcP1.on('pointerout', () => goLeftP1 = false);
            //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(leftOpcP1);

            const rightOpcP1 = this.add.zone(132, 420, 50, 50)
            rightOpcP1.setOrigin(0, 0)
            rightOpcP1.setInteractive();
            rightOpcP1.on('pointerdown', () => goRightP1 = true);
            rightOpcP1.on('pointerup', () => goRightP1 = false);
            rightOpcP1.on('pointerout', () => goRightP1 = false);
           //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(rightOpcP1);

            const upOpcP1 = this.add.zone(75, 395, 50, 50)
            upOpcP1.setOrigin(0, 0)
            upOpcP1.setInteractive();
            upOpcP1.on('pointerdown', () => goUpP1 = true);
            upOpcP1.on('pointerup', () => goUpP1 = false);
            upOpcP1.on('pointerout', () => goUpP1 = false);
            //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(upOpcP1);

            if ( playerQuantity == 2 ) {
                this.add.image(700, 450, 'controlsPlayer2').setScale(0.5) //Add buttons movement

                //Crear zonas para interactuar con los botones
                const leftOpcP2 = this.add.zone(615, 420, 50, 50)
                leftOpcP2.setOrigin(0, 0)
                leftOpcP2.setInteractive();
                leftOpcP2.on('pointerdown', () => goLeftP2 = true);
                leftOpcP2.on('pointerup', () => goLeftP2 = false);
                leftOpcP2.on('pointerout', () => goLeftP2 = false);
                //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(leftOpcP2);

                const rightOpcP2 = this.add.zone(732, 420, 50, 50)
                rightOpcP2.setOrigin(0, 0)
                rightOpcP2.setInteractive();
                rightOpcP2.on('pointerdown', () => goRightP2 = true);
                rightOpcP2.on('pointerup', () => goRightP2 = false);
                rightOpcP2.on('pointerout', () => goRightP2 = false);
                //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(rightOpcP2);

                const upOpcP2 = this.add.zone(675, 395, 50, 50)
                upOpcP2.setOrigin(0, 0)
                upOpcP2.setInteractive();
                upOpcP2.on('pointerdown', () => goUpP2 = true);
                upOpcP2.on('pointerup', () => goUpP2 = false);
                upOpcP2.on('pointerout', () => goUpP2 = false);
                //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(upOpcP2);
            }
        }
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
            goLeftP1,
            goRightP1,
            goUpP1
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
                goLeftP2,
                goRightP2,
                goUpP2
            );
            movementPlayer.AddMovementPlayer();
        }
    }
}

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload () {
        //Barra de progreso
        let progressBar = this.add.graphics();
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const loadingTxt = this.add.text(
            (width / 2) -50,
            (height / 2) -50,
            "Loading...",
            { 
                font: "bold 32px monospace", 
                fill: "#ffffff", 
                align: "center" 
            }
        );
        const percentTxt = this.add.text(
            width / 2,
            (height / 2) -180,
            "0%",
            { 
                font: "28px monospace", 
                fill: "#ffffff", 
                align: "center" 
            }
        );
        const assetTxt = this.add.text(
            (width / 2)-150,
            (height / 2) -100,
            "",
            { 
                font: "28px monospace", 
                fill: "#ffffff", 
                align: "center" 
            }
        );

        this.load.on("progress", function (value) {
            percentTxt.setText(parseInt(value * 100) + "%");
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on("fileprogress", function (file) {
            assetTxt.setText("Loading asset: " + file.key);
        });

        this.load.on("complete", function () {
            progressBar.destroy();
            loadingTxt.destroy();
            assetTxt.destroy();
            percentTxt.destroy();
        });

        this.load.baseURL = "./";

        this.load.image( "jungle", '../img/background.png' );
        this.load.image( "platform", '../img/platform1.png' );
        this.load.image( "ground", "../img/platform4.png" );
        this.load.image( "star", "../img/star.png" );
        this.load.image( "bomb", "../img/bomb.png" );
        this.load.image( "controlsPlayer1", "../img/Player1.png" );
        this.load.image( "controlsPlayer2", "../img/Player2.png" );
        this.load.image("logo", "../img/JumpingMonkey.png");
        this.load.image("monkey", "../img/monkey.png");
        this.load.image("buttons-menu", "../img/buttons.png");
        this.load.image("buttons-level", "../img/levelButtons.png");
        this.load.image("buttons-mode", "../img/modeButtons.png");
        this.load.image("p1Text", "../img/Player1text.png");
        this.load.image("p2Text", "../img/Player2text.png");

        this.load.spritesheet( "dude", "../img/dude.png", {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.spritesheet( "secondPlayer", "../img/secondPlayer.png", {
            frameWidth: 32,
            frameHeight: 48
        });

        this.load.audio('music', '../sounds/Banana_Craziness.mp3');
        this.load.audio('getStar', '../sounds/Rise06.mp3');
        this.load.audio('crash', '../sounds/bzzzt.wav');
    }
    create () {
        //Crear la musica
        if (stateMusic) {
            stateMusic = false;

            const music = this.sound.add('music');
            music.play({
                volume: 0.25,
                loop: true,
            });
        }

        this.add.image(480, 320, "jungle").setScale(2);
        this.add.image(400, 50, "logo");
        this.add.image(140, 450, "monkey");
        this.add.image(400, 310, "buttons-menu");

        const startOpc = this.add.zone(304, 110, 190, 90)
        startOpc.setOrigin(0, 0)
        startOpc.setInteractive();
        startOpc.once('pointerdown', () => this.redirectScene("gameScene"));
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(startOpc);

        const levelOpc = this.add.zone(304, 212, 190, 90)
        levelOpc.setOrigin(0, 0)
        levelOpc.setInteractive();
        levelOpc.once('pointerdown', () => this.redirectScene("levelScene"));
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(levelOpc);

        const modeOpc = this.add.zone(304, 314, 190, 90)
        modeOpc.setOrigin(0, 0)
        modeOpc.setInteractive();
        modeOpc.once('pointerdown', () => this.redirectScene("modeScene"));
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(modeOpc);

        const controlsOpc = this.add.zone(304, 418, 190, 90)
        controlsOpc.setOrigin(0, 0)
        controlsOpc.setInteractive();
        controlsOpc.once('pointerdown', () => this.redirectScene("controlsScene"));
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(controlsOpc);

        this.add.text(525, 440, "Level: " + levelName, {
            fontSize: '28px',
            fill: '#ffffff',
        });
        this.add.text(525, 480, "Mode: " + modeName, {
            fontSize: '28px',
            fill: '#ffffff',
        });
    }
    redirectScene (scene) {
        this.scene.start(scene);
    }
    update () {}
}

class Level extends Phaser.Scene {
    constructor() {
        super("levelScene");
    }
    preload () {}
    create () {
        this.add.image(480, 320, "jungle").setScale(2);
        this.add.image(400, 50, "logo");
        this.add.image(140, 450, "monkey");
        this.add.image(400, 310, "buttons-level");

        const levelEasy = this.add.zone(304, 110, 190, 90)
        levelEasy.setOrigin(0, 0)
        levelEasy.setInteractive();
        levelEasy.once('pointerdown', () => this.levelSelected("Easy", 1));
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(levelEasy);

        const levelMedium = this.add.zone(304, 212, 190, 90)
        levelMedium.setOrigin(0, 0)
        levelMedium.setInteractive();
        levelMedium.once('pointerdown', () => this.levelSelected("Medium", 2));
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(levelMedium);

        const levelHard = this.add.zone(304, 314, 190, 90)
        levelHard.setOrigin(0, 0)
        levelHard.setInteractive();
        levelHard.once('pointerdown', () => this.levelSelected("Hard", 3));
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(levelHard);

        const back = this.add.zone(304, 418, 190, 90)
        back.setOrigin(0, 0)
        back.setInteractive();
        back.once('pointerdown', () => this.redirectScene("menuScene"));
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(back);
    }
    levelSelected (leveltxt, newlevel) {
        levelName = leveltxt;
        level = newlevel;
        this.redirectScene("menuScene");
    }
    redirectScene (scene) {
        this.scene.start(scene);
    }
    update () {}
}

class Mode extends Phaser.Scene {
    constructor() {
        super("modeScene");
    }
    preload () {}
    create () {
        this.add.image(480, 320, "jungle").setScale(2);
        this.add.image(400, 50, "logo");
        this.add.image(140, 450, "monkey");
        this.add.image(400, 310, "buttons-mode");

        const onePlayer = this.add.zone(304, 162, 190, 90)
        onePlayer.setOrigin(0, 0)
        onePlayer.setInteractive();
        onePlayer.once('pointerdown', () => this.modeSelected("1 Players", 1));
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(onePlayer);

        const twoPlayer = this.add.zone(304, 266, 190, 90)
        twoPlayer.setOrigin(0, 0)
        twoPlayer.setInteractive();
        twoPlayer.once('pointerdown', () => this.modeSelected("2 Players", 2));
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(twoPlayer);

        const back = this.add.zone(304, 370, 190, 90)
        back.setOrigin(0, 0)
        back.setInteractive();
        back.once('pointerdown', () => this.redirectScene("menuScene"));
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(back);
    }
    modeSelected (mode, quantity) {
        modeName = mode;
        playerQuantity = quantity;
        this.redirectScene("menuScene");
    }
    redirectScene (scene) {
        this.scene.start(scene);
    }
    update () {}
}

class Controls extends Phaser.Scene {
    constructor() {
        super("controlsScene");
    }
    preload () {}
    create () {
        this.add.image(480, 320, "jungle").setScale(2);
        this.add.image(400, 50, "logo");
        this.add.image(200, 455, "p1Text");
        this.add.image(200, 300, "controlsPlayer1");
        this.add.image(600, 455, "p2Text");
        this.add.image(600, 300, "controlsPlayer2");

        const backOpc = this.add.zone(0, 0, 800, 530)
        backOpc.setOrigin(0, 0)
        backOpc.setInteractive();
        backOpc.once('pointerdown', () => this.redirectScene("menuScene"));
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(backOpc);
    }
    redirectScene (scene) {
        this.scene.start(scene);
    }
    update () {}
}

class EndGame extends Phaser.Scene {
    constructor() {
        super("endScene");
    }
    preload () {}
    create () {
        this.add.image(480, 320, "jungle").setScale(2);
        this.add.image(400, 50, "logo");
        this.add.image(180, 450, "monkey");

        this.add.text(100, 150, 'Player 1: ' + players[0].score + " Points", {
            fontSize: '32px',
            fill: '#ffffff',
        });

        if ( playerQuantity == 2 ) {
            this.add.text(100, 250, 'Player 2: ' + players[1].score + " Points", {
                fontSize: '32px',
                fill: '#ffffff',
            });
        }

        this.add.text(400, 360, "Level: " + levelName, {
            fontSize: '32px',
            fill: '#ffffff',
        });
        this.add.text(400, 400, "Mode: " + modeName, {
            fontSize: '32px',
            fill: '#ffffff',
        });

        const backOpc = this.add.zone(0, 0, 800, 530)
        backOpc.setOrigin(0, 0)
        backOpc.setInteractive();
        backOpc.once('pointerdown', () => this.redirectScene("menuScene"));
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(backOpc);
    }
    redirectScene (scene) {
        this.scene.start(scene);
    }
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
        Menu,
        MainScene,
        Level,
        Mode,
        Controls,
        EndGame,
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