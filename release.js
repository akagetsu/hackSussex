function Release(game) {
	this.game = game;
	this.releaseHolder = null;
}

Release.prototype.init = function init() {
	this.releaseHolder = game.add.group();

	this.releaseHolder.enableBody = true;
	this.game.time.events.loop(Phaser.Timer.SECOND * 10, this.spawn, this);
};

Release.prototype.spawn = function spawn() {
	var release = this.releaseHolder.create(Math.floor(Math.random() * (this.game.world.width - 200)) + 100, 25, 'release');

	release.body.gravity.y = 400;
	release.scale.setTo(2);
};

Release.prototype.getReleases = function getReleases() {
	return this.releaseHolder;
};