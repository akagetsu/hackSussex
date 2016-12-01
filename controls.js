function Controls() {
    this.game = null;
    this.pad = null;
    this.keyboard = null;
    this.options = null;
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

    this.options = {
        gamepad: false,
        keyboard: false
    };

    return this;
};

Controls.prototype.handleMenuControls = function handleMenuControls() {
    if (this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || this.keyboard.cursorKeys.up.isDown && this.options.gamepad) {
        this.options.gamepad = false;
        keyImg.tint = 0x0000A0;
        padImg.tint = 0x8B0000;
    } else if (this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || this.keyboard.cursorKeys.down.isDown && !this.options.gamepad) {
        this.options.gamepad = true;
        keyImg.tint = 0x8B0000;
        padImg.tint = 0x0000A0;
    }

    if (this.keyboard.restartKey.isDown || this.pad.justPressed(Phaser.Gamepad.XBOX360_Y)) {
        soundMan.stopSound('intro');
        soundMan.stopSound('main');
        soundMan.playSound('shoot1');
        init();
    }
};

Controls.prototype.handleGameControls = function handleGameControls() {
    if (this.options.gamepad) {
        if (this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT)) {
            player.move(-350);
        } else if (this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)) {
            player.move(350);
        }

        if (this.pad.justPressed(Phaser.Gamepad.XBOX360_A) && player.getSprite().body.touching.down) {
            player.jump();
            soundMan.playSound('jump');
        }

        if (this.pad.justPressed(Phaser.Gamepad.XBOX360_X)) {
            player.fire();
            soundMan.playSound('shoot2');
        }
        if (this.pad.justPressed(Phaser.Gamepad.XBOX360_START)) {
            soundMan.stopSound('main');
            game.state.restart();
        }
    } else if (!this.options.gamepad && !this.options.touch) {
        if (this.keyboard.cursorKeys.left.isDown) {
            player.move(-350);
        } else if (this.keyboard.cursorKeys.right.isDown) {
            player.move(350);
        }

        if (this.keyboard.jumpKey.isDown && player.getSprite().body.touching.down) {
            soundMan.playSound('jump');
            player.jump();
        }

        if (this.keyboard.attackKey.isDown) {
            player.fire();
            soundMan.playSound('shoot2');
        }

        if (this.keyboard.restartKey.isDown) {
            soundMan.stopSound('main');
            game.state.restart();
        }
    } else if (!this.options.gamepad && this.options.touch) {
        if (touchDir.left) {
            player.move(-350);
        } else if (touchDir.right) {
            player.move(350);
        }

        if (touchDir.jump && player.getSprite().body.touching.down) {
            soundMan.playSound('jump');
            player.jump();
        }

        if (touchDir.kill) {
            player.fire();
            soundMan.playSound('shoot2');
        }
    }
};

Controls.prototype.handleGenericControls = function handleGenericControls() {
    if (this.keyboard.restartKey.isDown || this.pad.justPressed(Phaser.Gamepad.XBOX360_START)) {
        create();
    }
};