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
    this.keyboard = {};
    this.keyboard.cursorKeys = this.game.input.keyboard.createCursorKeys();
    this.keyboard.attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
    this.keyboard.jumpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.keyboard.restartKey = this.game.input.keyboard.addKey(Phaser.Keyboard.P);

    return this.keyboard;
};