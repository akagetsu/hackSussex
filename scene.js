function Scene(game) {
    this.game = game;
    this.walls = this.game.add.group();
    this.walls.enableBody = true;
    this.walls.x = 0;
    this.walls.y = 0;

    this.ground = this.walls.create(0, game.world.height - 50, 'ground');
    this.ground.body.immovable = true;

    this.walls.create(0, 0, 'wall')
        .body.immovable = true;

    this.walls.create(this.game.world.width - 50, 0, 'wall')
        .body.immovable = true;

    return this;
}