class Play extends Phaser.Scene {
  constructor() {
      super("playScene");
  }

  // Eventually load sprites and spritesheets (animation)
  preload() {
    this.load.image('placeholder', './assets/placeholder.png');
    this.load.image('platform', './assets/platform.png');
    this.load.image('spaceship', './assets/spaceship_placeholder.png');

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

    this.player = new rabbitPlayer(this, 40, 40, 'placeholder', 0).setOrigin(0,0);
    this.spaceship = new Spaceship(this, game.config.width, game.config.height - 50, 'spaceship', 0).setOrigin(0,0);

    // Set up timer
    // I used addEvent because I couldn't figure out how to loop with delayedCall
   this.distance = 0;

    this.clock = this.time.addEvent({delay: 200, callback: () => {
      this.distance++;}, callbackScope: this, loop: true});
  
    // Timer style
    let distanceConfig = {
      fontFamily: 'Courier',
      fontSize: '20px',
      color: '#FFFFFF',
      align: 'left',
    }
    this.displayDistance = this.add.text(10, 10, this.distance + " M", distanceConfig);
  }

  
  
  // Does nothing right now
  update() {
    this.player.update();
    
    for(var i in this.platforms) {
      this.platforms[i].update();
    }

    this.displayDistance.text = this.distance + " M";
  }
}