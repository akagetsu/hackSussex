function Game() {
	Phaser.Game.call(this, 480, 640, Phaser.AUTO, '', {
		preload: preload,
		create: create,
		update: update
	});

	return this;
}

Game.prototype = Object.create(Phaser.Game.prototype);

Game.prototype.initialise = function() {
	this.physics.startSystem(Phaser.Physics.ARCADE);

	this.add.sprite(0, 0, 'bground');
};