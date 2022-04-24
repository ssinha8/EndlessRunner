let config = {
    type: Phaser.AUTO,
    width: 960, //TODO: finalize width/height
    height: 540, // and see if we can fix the bug that doubles the size
    scene: [Menu, Shop, Play]
}

let keyUP, keyDOWN, keyLEFT, keyRIGHT, keyCONFIRM, keyJUMP, keyCANCEL, keyPAUSE;
let game = new Phaser.Game(config);