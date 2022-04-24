//TODO: add basic scene functionality
class Menu extends Phaser.Scene {
  constructor() {
      super("menuScene");
  }

  create() {

    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
  }


  update() {
    // Right now this just plays the game scene
    this.scene.start('playScene');
  }
}