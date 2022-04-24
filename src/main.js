let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    scene: [Menu, Play]//TODO: Add "play" and "shop" scenes to this
}

let game = new Phaser.Game(config);