function Enemy(game) {
	this.game = game;
	this.enemyHolder = null;
}

Enemy.prototype.init = function init() {
	this.enemyHolder = game.add.group();

	this.enemyHolder.enableBody = true;
	this.game.time.events.loop(Phaser.Timer.SECOND * 0.7, this.spawn, this);
};

Enemy.prototype.spawn = function spawn() {
	var enemy = this.enemyHolder.create(Math.floor(Math.random() * (this.game.world.width - 200)) + 100, 25, 'issue');

	enemy.body.gravity.y = 300;
	enemy.scale.setTo(1.5);
};

Enemy.prototype.getEnemies = function getEnemies() {
	return this.enemyHolder;
};