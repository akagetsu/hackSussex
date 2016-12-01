function Controls() {
    this.game = null;
    this.pad = null;
    this.keyboard = null;
}

Controls.prototype.initialise = function initialise(game) {
    this.game = game;
    this.game.input.gamepad.start();
    this.pad = game.input.gamepad.pad1;

    this.keyboard = {
        cursorKeys: this.game.input.keyboard.createCursorKeys(),
        attackKey: this.game.input.keyboard.addKey(Phaser.Keyboard.X),
        jumpKey: this.game.input.keyboard.addKey(Phaser.Keyboard.Z),
        restartKey: this.game.input.keyboard.addKey(Phaser.Keyboard.P)
    };

    return this;
};