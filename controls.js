function Controls(game) {
    this.game = game;
    this.pad = null;
    this.keyboard = null;
}

Controls.prototype.initialiseGamepad = function initialiseGamepad() {
    this.game.input.gamepad.start();
    this.pad = game.input.gamepad.pad1;

    return this.pad;
};

Controls.prototype.initialiseKeyboard = function initialiseKeyboard() {
    this.keyboard = {
        cursorKeys: this.game.input.keyboard.createCursorKeys(),
        attackKey: this.game.input.keyboard.addKey(Phaser.Keyboard.X),
        jumpKey: this.game.input.keyboard.addKey(Phaser.Keyboard.Z),
        restartKey: this.game.input.keyboard.addKey(Phaser.Keyboard.P)
    };

    return this.keyboard;
};