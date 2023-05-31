export class Movement {
    constructor ( 
        player, 
        left, 
        right, 
        up, 
        animsKey,
        btnleft,
        btnright,
        btnup, 
    ) {
        this.player = player;
        this.left = left;
        this.right = right;
        this.up = up;
        this.animsKey = animsKey;
        this.btnleft = btnleft;
        this.btnright = btnright;
        this.btnup = btnup;
    }
    AddMovementPlayer () {
        if (this.left.isDown || this.btnleft) {
            // Mover a la izquierda
            this.player.body.setVelocityX(-160);
            this.player.anims.play(this.animsKey[0], true);
        } else if (this.right.isDown || this.btnright) {
            // Mover a la derecha
            this.player.body.setVelocityX(160);
            this.player.anims.play(this.animsKey[2], true);
        } else {
            this.player.body.setVelocityX(0);
            this.player.anims.play(this.animsKey[1], true);
        }

        // saltar
        if ( ( this.up.isDown || this.btnup ) && this.player.body.touching.down) {
            this.player.body.setVelocityY(-330);
        }
    }
}