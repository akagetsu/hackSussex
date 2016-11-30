function Scene(game) {
    this.game = game;
    this.walls = null;
    this.ground = null;
}

Scene.prototype.initialise = function initialise() {
    this.walls = this.game.add.group();
    this.walls.enableBody = true;

    this.ground = walls.create(0, game.world.height - 50, 'ground');
    this.ground.body.immovable = true;

    var wall = this.walls.create(0, 0, 'wall');
    wall.body.immovable = true;
    wall = this.walls.create(this.game.world.witdh - 50, 0, 'wall');
    wall.body.immovable = true;

    return this;
};
