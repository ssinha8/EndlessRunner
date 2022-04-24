let config = {
    type: Phaser.AUTO,
    width: 960, //TODO: finalize width/height
    height: 540, // and see if we can fix the bug that doubles the size
    scene: [Menu, Shop, Play]
}

let game = new Phaser.Game(config);