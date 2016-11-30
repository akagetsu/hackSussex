function Game() {
    this.game = new Phaser.Game(480, 640, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    });

    return this.game;
}

Game.prototype.initialise = function initialise() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.add.sprite(0, 0, 'bground');

    return this.game;
};