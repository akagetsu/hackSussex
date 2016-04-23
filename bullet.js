function Bullet(game) {
	this.game = game;
	this.bullets = null;
}

Bullet.prototype.init = function init() {
	this.bullets = this.game.add.group();
	this.bullets.enableBody = true;
	this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

	this.bullets.createMultiple(50, 'bullet', 0);
	this.bullets.callAll('animations.add', 'animations', 'bullet', [0, 1, 2, 3], 3, true);
	this.bullets.callAll('play', null, 'bullet');
	this.bullets.setAll('checkWorldBounds', true);
	this.bullets.setAll('outOfBoundsKill', true);

	return this.bullets;
};