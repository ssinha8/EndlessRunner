//TODO: add basic scene functionality
class Menu extends Phaser.Scene {
  constructor() {
      super("menuScene");
  }


  update() {
    // Right now this just plays the game scene
    this.scene.start('playScene');
  }
}