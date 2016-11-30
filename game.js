function Game() {
    this.game = new Phaser.Game(480, 640, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    });

    return this.game;
}