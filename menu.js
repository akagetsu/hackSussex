function Menu() {
    this.game = null;
    this.keyImg = null;
    this.padImg = null;
    this.startImg = null;
}

Menu.prototype.initialise = function initialise(game) {
    this.game = game;

    gameState.game = false;
    gameState.menu = true;
    soundMan.stopSound('intro');
    soundMan.stopSound('main');

    soundMan.playSound('intro');

    keyImg = this.game.add.sprite(this.game.width / 2 - 90, this.game.height / 2 - 70, 'keyboard');
    keyImg.inputEnabled = true;
    keyImg.tint = 0x8B0000;
    keyImg.events.onInputDown.add(function() {
        options.gamepad = false;
        keyImg.tint = 0x0000A0;
        padImg.tint = 0x8B0000;
    }, this);

    padImg = this.game.add.sprite(this.game.width / 2 - 90, this.game.height / 2, 'gamepad');
    padImg.inputEnabled = true;
    padImg.tint = 0x0000A0;
    padImg.events.onInputDown.add(function() {
        options.gamepad = true;
        keyImg.tint = 0x8B0000;
        padImg.tint = 0x0000A0;
    }, this);

    startImg = this.game.add.sprite(this.game.width / 2 - 90, this.game.height / 2 + 70, 'start');
    startImg.inputEnabled = true;
    startImg.tint = 0x008000;
    startImg.events.onInputDown.add(function() {
        soundMan.stopSound('intro');
        soundMan.playSound('shoot1');
        init();
    }, this);
};