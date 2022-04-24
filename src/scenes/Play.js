class Play extends Phaser.Scene {
  constructor() {
      super("playScene");
  }

  // Eventually load sprites and spritesheets (animation)
  preload() {
    this.load.image('placeholder', './assets/placeholder.png');

  }

  // Does nothing right now
  create() {
    this.player = new rabbitPlayer(this, 40, 40, 'placeholder', 0).setOrigin(0,0)

  }
  
  // Does nothing right now
  update() {

  }
}