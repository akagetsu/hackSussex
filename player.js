function Player(game, pad) {
	this.game = game;
	this.pad = pad;
	this.sprite = null;
}

Player.prototype.initialize = function initialize() {
	this.sprite = this.game.add.sprite(game.world.width / 2, game.world.height - 150, 'dude');
	this.game.physics.arcade.enable(this.sprite);
	this.sprite.body.bounce.y = 0.1;
	this.sprite.body.gravity.y = 500;
	this.sprite.body.collideWorldBounds = true;

	this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
	this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
};

Player.prototype.update = function update() {
	this.sprite.body.velocity.x = 0;

	// Controls
	if (this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
		this.sprite.body.velocity.x = -250;
		this.sprite.animations.play('left');
	} else if (this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
		this.sprite.body.velocity.x = 250;
		this.sprite.animations.play('right');
	} else {
		this.sprite.animations.stop();
		this.sprite.frame = 4;
	}


	if (this.pad.justPressed(Phaser.Gamepad.XBOX360_A) && this.sprite.body.touching.down) {
		this.sprite.body.velocity.y = -400;
	}

	if (this.pad.justReleased(Phaser.Gamepad.XBOX360_X)) {
		// shoot bullets
	}
};

Player.prototype.getSprite = function getSprite() {
	return this.sprite;
};