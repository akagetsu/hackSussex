function Menu() {
    this.game = null;
    this.keyImg = null;
    this.padImg = null;
    this.touchImg = null;
    this.startImg = null;
    this.leftTouch = null;
    this.rightTouch = null;
    this.killTouch = null;
    this.jumpTouch = null;
    this.touchDir = null;
    this.options = null;
}

Menu.prototype.initialise = function initialise(game) {
    this.game = game;
    this.options = {
        keyboard: true,
        gamepad: false,
        touch: false
    };

    gameState.game = false;
    gameState.menu = true;
    soundMan.stopSound('intro');
    soundMan.stopSound('main');

    soundMan.playSound('intro');

    this.keyImg = this.game.add.sprite(this.game.width / 2 - 90, this.game.height / 2 - 100, 'keyboard');
    this.keyImg.inputEnabled = true;
    this.keyImg.tint = 0x0000A0;
    this.keyImg.events.onInputDown.add(function() {
        this.options.keyboard = true;
        this.options.gamepad = false;
        this.options.touch = false;
        this.keyImg.tint = 0x0000A0;
        this.padImg.tint = 0x8B0000;
        this.touchImg.tint = 0x8B0000;
    }, this);

    this.padImg = this.game.add.sprite(this.game.width / 2 - 90, this.game.height / 2 - 30, 'gamepad');
    this.padImg.inputEnabled = true;
    this.padImg.tint = 0x8B0000;
    this.padImg.events.onInputDown.add(function() {
        this.options.keyboard = false;
        this.options.gamepad = true;
        this.options.touch = false;
        this.keyImg.tint = 0x8B0000;
        this.padImg.tint = 0x0000A0;
        this.touchImg.tint = 0x8B0000;
    }, this);

    this.touchImg = this.game.add.sprite(this.game.width / 2 - 90, this.game.height / 2 + 40, 'touch');
    this.touchImg.inputEnabled = true;
    this.touchImg.tint = 0x8B0000;
    this.touchImg.events.onInputDown.add(function() {
        this.options.keyboard = false;
        this.options.gamepad = false;
        this.options.touch = true;
        this.keyImg.tint = 0x8B0000;
        this.padImg.tint = 0x8B0000;
        this.touchImg.tint = 0x0000A0;
    }, this);

    this.startImg = this.game.add.sprite(this.game.width / 2 - 90, this.game.height / 2 + 110, 'start');
    this.startImg.inputEnabled = true;
    this.startImg.tint = 0x008000;
    this.startImg.events.onInputDown.add(function() {
        soundMan.stopSound('intro');
        soundMan.playSound('shoot1');
        init();
    }, this);
    return this.options;
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

Menu.prototype.destroyImg = function destroyImg() {
    this.keyImg.destroy();
    this.padImg.destroy();
    this.startImg.destroy();
    this.touchImg.destroy();
};