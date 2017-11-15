function ReleaseHolder(game) {
	this.game = game;
	this.releaseHolder = game.add.group();

	this.releaseHolder.enableBody = true;
	this.game.time.events.loop(Phaser.Timer.SECOND * 10, this.spawn, this);
	return this;
}

ReleaseHolder.prototype.spawn = function spawn() {
	var release = this.releaseHolder.create(Math.floor(Math.random() * (this.game.world.width - 200)) + 100, 25, 'release');

	release.body.gravity.y = 400;
	release.scale.setTo(2);
};

ReleaseHolder.prototype.getReleases = function getReleases() {
	return this.releaseHolder;
};