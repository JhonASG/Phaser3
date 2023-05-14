export class drawingObjs {
    constructor( config, obj ) {
        this.configObj = config;
        this.obj = obj;
        this.createplayers = [];
        this.createstars = [];
    }
    createPlatforms ( level ) {
        Object.values( this.configObj[level] ).map ( obj => {
            this.obj.create( obj[0], obj[1], obj[2] );
        });
    }
    createPlayer ( physics, quantity ) {
        for (let q = 1; q <= quantity; q++) {
            const createPlayer = physics.add.sprite( 
                this.configObj[q].width, 
                this.configObj[q].height, 
                this.configObj[q].asset 
            );
            createPlayer.setBounce(this.configObj[q].bounce); // El personaje tiene un robote al colisionar
            createPlayer.setCollideWorldBounds(this.configObj[q].worldCollide); // Evita que el personaje se salga de los limites de la pantalla
            physics.add.collider( createPlayer, this.obj );

            this.createplayers.push(createPlayer);
        }

        return this.createplayers;
    }
    createStars ( physics, quantity ) {
        for (let q = 1; q <= quantity; q++) {
            const stars = physics.add.group({
                key: "star",
                repeat: this.configObj[q].quantity,
                setXY: { 
                    x: this.configObj[q].posX, 
                    y: this.configObj[q].posY, 
                    stepX: this.configObj[q].step
                }
            });
            physics.add.collider( stars, this.obj );
            const bounce = this.configObj[q].bounce;
            stars.children.iterate( function (child) {
                child.setBounce(bounce);
            });
            this.createstars.push(stars);
        }

        return this.createstars;
    }
}