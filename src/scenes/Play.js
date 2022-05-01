class Play extends Phaser.Scene {
  constructor() {
      super("playScene");
  }

  // Eventually load sprites and spritesheets (animation)
  preload() {
    this.load.image('placeholder', './assets/placeholder.png');
    this.load.image('platform', './assets/platform2.png');
    this.load.image('spaceship', './assets/spaceship_placeholder.png');
    this.load.image('player', './assets/spacebnnuy.png');
    this.load.image('groundmain', './assets/bg1.png');
    this.load.image('stars', './assets/bg.png');
    this.load.image('hills', './assets/bg3.png');
    this.load.image('spikeyHills', './assets/bg2.png');

  }

  // Does nothing right now
  create() {
    this.gameOver = false;
    this.camera = this.cameras.main;

    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);


    // Parallax Scrolling Code:
    // Background Object Array
    this.backgrounds = [];
    this.speed = 6;

    // Star background
    this.starBackground = this.add.tileSprite(0, 0, 0, 0, 'stars')
      .setOrigin(0, 0)
      .setScale(.22)
      .setScrollFactor(0);

    // Hills
    this.backgrounds.push({
			ratioX: 0.1,
			sprite: this.add.tileSprite(0, (game.config.height/2) - 2, 0, 0, 'hills')
        .setOrigin(0, 0)
        .setScale(.22)
        .setScrollFactor(0)
		});

    // Backgound area with spikes
    this.backgrounds.push({
			ratioX: 0.5,
			sprite: this.add.tileSprite(0, (game.config.height/2) - 65, 0, 0, 'spikeyHills')
        .setOrigin(0,0)
        .setScale(.215)
        .setScrollFactor(0)
		});

    // Ground
    this.backgrounds.push({
			ratioX: 1,
			sprite: this.add.tileSprite(0, 400, 7019, 334, 'groundmain')
        .setOrigin(0, 0)
        .setScale(140/334)
        .setScrollFactor(0)
		});

    //TODO: adjust values of x and y for better gameplay
    //editing this to use an array.
    let numPlatforms = 5
    this.platforms = [numPlatforms];
    for(var i = 0; i < numPlatforms; i++){
      this.platforms[i] = new Platform(this, game.config.width + 128 * i, 350, 'platform', 0).setOrigin(0,0);
      this.platforms[i].setScale(128/1299);
    }

    this.player = new rabbitPlayer(this, 40, 40, 'player', 0).setOrigin(0,1);
    this.player.setScale(64/685);
    this.player.flipX = true;
    this.spaceship = new Spaceship(this, game.config.width, game.config.height + 10, 'spaceship', 0, false, this.player.x).setOrigin(0,0);
    this.spawnSpaceship = false;

    // Set up timer
    // I used addEvent because I couldn't figure out how to loop with delayedCall
   this.distance = 0;

    this.clock = this.time.addEvent({delay: 100, callback: () => {
      this.distance++;
      if (this.spaceship.checkpoints.includes(this.distance)) {
        this.spaceship.spawnRate += 5;
      }
    }, callbackScope: this, loop: true});

    this.spaceshipCheck  = this.time.addEvent({delay: 3000, callback: () => {
      if (!this.spaceship.spawn) {
        let willSpawn = Phaser.Math.Between(0, 100);

        if (willSpawn <= this.spaceship.spawnRate) {
          this.spaceship.spawn = true;
          this.spaceship.y =  Phaser.Math.RND.pick(this.spaceship.yCoordinates);
          this.spaceship.x = this.player.x + game.config.width;
          this.spaceship.update();
        }
      }
    }, callbackScope: this, loop: true});

  
    // Timer style
    this.distanceConfig = {
      fontFamily: 'Courier',
      fontSize: '20px',
      color: '#FFFFFF',
      align: 'left',
    }
    this.displayDistance = this.add.text(10, 10, this.distance + " M", this.distanceConfig);
  
    // Physics collider for spaceship
    this.physics.add.overlap(this.player, this.spaceship, this.hitObject, null, this);
}

  
  update() {
    if (!this.gameOver) {
      this.player.update();
      this.spaceship.playerX = this.player.x;

      if (this.spaceship.spawn) {
        this.spaceship.update();
      }
    
      for(var i in this.platforms) {
        this.platforms[i].update();
      }

      this.displayDistance.text = this.distance + " M";
      this.displayDistance.x += this.speed;

      // Parallax scrolling
      this.camera.scrollX += this.speed;
      this.player.x += this.speed;

      for (let i = 0; i < this.backgrounds.length; i++) {
        const bg = this.backgrounds[i];
        bg.sprite.tilePositionX = this.cameras.main.scrollX * bg.ratioX
      }
    } else {
      this.add.text(this.player.x + 380, 200, 'You went '.concat(this.distance-1).concat(' M!'), this.distanceConfig);
      this.add.text(this.player.x + 250, 250, 'Press (R) to Restart or (M) for Menu', this.distanceConfig);

      if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
        this.scene.restart();
      }

      if (Phaser.Input.Keyboard.JustDown(this.keyM)) {
        this.scene.start('menuScene');
      }
    }
  }

  hitObject() {
    this.gameOver = true;
    this.clock.remove();
  }
}