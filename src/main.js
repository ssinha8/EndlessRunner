let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]//TODO: Add "play" and "shop" scenes to this
}

let game = new Phaser.Game(config);