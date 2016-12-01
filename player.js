function Player() {
	this.game = null;
	this.sprite = null;
	this.bullets = null;
	this.nextFire = 0;
	this.fireFate = 100;
}

Player.prototype.initialise = function initialize(game) {
	this.game = game;

	this.sprite = this.game.add.sprite(game.world.width / 2, game.world.height - 150, 'dude');
	this.game.physics.arcade.enable(this.sprite);

	this.bullets = new Bullet(this.game).init();

	this.sprite.body.gravity.y = 1000;
	this.sprite.body.collideWorldBounds = true;

	this.sprite.animations.add('dude', [0, 1, 2, 3], 3, true);
	this.sprite.animations.play('dude');

	return this;
};

Player.prototype.move = function move(dirSpd) {
	this.sprite.body.velocity.x = dirSpd;
};

Player.prototype.jump = function jump() {
	this.sprite.body.velocity.y = -500;
};

Player.prototype.update = function update() {
	this.sprite.body.velocity.x = 0;
};

Player.prototype.getSprite = function getSprite() {
	return this.sprite;
};

Player.prototype.getBullets = function getBullets() {
	return this.bullets;
};


Player.prototype.fire = function fire() {
	if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
		this.nextFire = this.game.time.now + this.fireFate;
		var bullet = this.bullets.getFirstDead();

		bullet.reset(this.sprite.x + 40, this.sprite.y - 10);
		bullet.scale.setTo(1.5);

		this.game.physics.arcade.moveToXY(bullet, this.sprite.x + 40, 0, 300);
	}
};