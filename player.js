function Player(game) {
	this.game = game;
	this.pad = null;
	this.sprite = null;
	this.bullets = null;
	this.nextFire = 0;
	this.fireFate = 100;
}

Player.prototype.initialize = function initialize() {
	this.sprite = this.game.add.sprite(game.world.width / 2, game.world.height - 150, 'dude');
	this.game.physics.arcade.enable(this.sprite);

	this.pad = new Gamepad(this.game).init();
	this.bullets = new Bullet(this.game).init();

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

	if (this.pad.justPressed(Phaser.Gamepad.XBOX360_X)) {
		this.fire();
	}
};

Player.prototype.getSprite = function getSprite() {
	return this.sprite;
};


Player.prototype.fire = function fire() {
	if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
		this.nextFire = this.game.time.now + this.fireFate;
		var bullet = this.bullets.getFirstDead();

		bullet.reset(this.sprite.x, this.sprite.y);

		this.game.physics.arcade.moveToXY(bullet, this.sprite.x, 0, 300);
	}
};