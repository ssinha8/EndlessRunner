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
    

    //TODO: adjust values of x and y for better gameplay
    //editing this to use an array.
    let numPlatforms = 5
    this.platforms = [numPlatforms];
    for(var i = 0; i < numPlatforms; i++){
      this.platforms[i] = new Platform(this, game.config.width + 32 * i, 350, 'placeholder', 0).setOrigin(0,0);
    }

    this.player = new rabbitPlayer(this, 80, 400, 'placeholder', 0).setOrigin(0,0);

  }
  
  // Does nothing right now
  update() {
    this.player.update();
    
    for(var i in this.platforms) {
      this.platforms[i].update();
    }
  }
}