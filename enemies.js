function Enemies(game) {
	this.game = game;
	this.enemyHolder = game.add.group();

	this.enemyHolder.enableBody = true;
	this.game.time.events.loop(Phaser.Timer.SECOND * 0.7, this.spawn, this);
}

Enemies.prototype.spawn = function spawn() {
	var enemy = this.enemyHolder.create(Math.floor(Math.random() * (this.game.world.width - 200)) + 100, 25, 'issue');

	enemy.body.gravity.y = 300;
	enemy.scale.setTo(1.5);
};

Enemies.prototype.nuke = function nuke() {
	this.enemyHolder.forEach(function(enem) {
		enem.kill();
	});
};

Enemies.prototype.getEnemies = function getEnemies() {
	return this.enemyHolder;
};