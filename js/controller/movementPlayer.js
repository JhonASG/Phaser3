export class Movement {
    constructor ( player, left, right, up, animsKey ) {
        this.player = player;
        this.left = left;
        this.right = right;
        this.up = up;
        this.animsKey = animsKey
    }
    AddMovementPlayer () {
        if (this.left.isDown) {
            // Mover a la izquierda
            this.player.body.setVelocityX(-160);
            this.player.anims.play(this.animsKey[0], true);
        } else if (this.right.isDown) {
            // Mover a la derecha
            this.player.body.setVelocityX(160);
            this.player.anims.play(this.animsKey[2], true);
        } else {
            this.player.body.setVelocityX(0);
            this.player.anims.play(this.animsKey[1], true);
        }

        // saltar
        if (this.up.isDown && this.player.body.touching.down) {
            this.player.body.setVelocityY(-330);
        }
    }
}