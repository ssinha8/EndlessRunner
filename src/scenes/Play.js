class Play extends Phaser.Scene {
  constructor() {
      super("playScene");
  }

  // Eventually load sprites and spritesheets (animation)
  preload() {
    this.load.image('placeholder', './assets/placeholder.png');
    this.load.image('platform', './assets/platform.png');

  }

  // Does nothing right now
  create() {
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    
    this.player = new rabbitPlayer(this, 40, 40, 'placeholder', 0).setOrigin(0,0);

    //TODO: adjust values of x and y for better gameplay
    this.platform1 = new Platform(this, game.config.width + 100, 250, 'platform', 0).setOrigin(0,0);
    this.platform2 = new Platform(this, game.config.width + 300, 300, 'platform', 0).setOrigin(0,0);
    this.platform3 = new Platform(this, game.config.width + 500, 350, 'platform', 0).setOrigin(0,0);

  }
  
  // Does nothing right now
  update() {
    this.player.update();
    this.platform1.update();
    this.platform2.update();
    this.platform3.update();
  }
}