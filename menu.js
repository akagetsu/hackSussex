function Menu() {
    this.game = null;
    this.keyImg = null;
    this.padImg = null;
    this.startImg = null;
    this.leftTouch = null;
    this.rightTouch = null;
    this.killTouch = null;
    this.jumpTouch = null;
    this.touchDir = null;
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

Menu.prototype.initialiseTouchMenu = function initialiseTouchMenu() {
    this.touchDir = {
        left: false,
        right: false,
        jump: false,
        kill: false
    };

    this.leftTouch = this.game.add.sprite(20, this.game.height - 60, 'btnup');
    this.leftTouch.inputEnabled = true;
    this.leftTouch.events.onInputDown.add(function() {
        this.leftTouch.loadTexture('btndn');
        this.touchDir.left = true;
    }, this);
    this.leftTouch.events.onInputUp.add(function() {
        this.leftTouch.loadTexture('btnup');
        this.touchDir.left = false;
    }, this);

    this.rightTouch = this.game.add.sprite(150, this.game.height - 60, 'btnup');
    this.rightTouch.inputEnabled = true;
    this.rightTouch.events.onInputDown.add(function() {
        this.rightTouch.loadTexture('btndn');
        this.touchDir.right = true;
    }, this);
    this.rightTouch.events.onInputUp.add(function() {
        this.rightTouch.loadTexture('btnup');
        this.touchDir.right = false;
    }, this);

    this.jumpTouch = this.game.add.sprite(280, this.game.height - 60, 'btnup');
    this.jumpTouch.inputEnabled = true;
    this.jumpTouch.events.onInputDown.add(function() {
        this.jumpTouch.loadTexture('btndn');
        this.touchDir.jump = true;
    }, this);
    this.jumpTouch.events.onInputUp.add(function() {
        this.jumpTouch.loadTexture('btnup');
        this.touchDir.jump = false;
    }, this);

    this.killTouch = this.game.add.sprite(410, this.game.height - 60, 'btnup');
    this.killTouch.inputEnabled = true;
    this.killTouch.events.onInputDown.add(function() {
        this.killTouch.loadTexture('btndn');
        this.touchDir.kill = true;
    }, this);
    this.killTouch.events.onInputUp.add(function() {
        this.killTouch.loadTexture('btnup');
        this.touchDir.kill = false;
    }, this);
};