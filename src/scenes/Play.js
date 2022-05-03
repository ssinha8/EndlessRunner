class Play extends Phaser.Scene {
  constructor() {
      super("playScene");
  }

  // Eventually load sprites and spritesheets (animation)
  preload() {
    this.load.image('placeholder', './assets/placeholder.png');
    this.load.image('platform', './assets/platform2.png');
    this.load.image('UFO1', './assets/spaceship_placeholder.png');
    this.load.image('player', './assets/spacebnnuy.png');
    this.load.image('groundmain', './assets/bg1.png');
    this.load.image('stars', './assets/bg.png');
    this.load.image('hills', './assets/bg3.png');
    this.load.image('spikeyHills', './assets/bg2.png');
    this.load.image('hole', './assets/hole.png')

  }

  // Does nothing right now
  create() {
    this.gameOver = false;
    this.camera = this.cameras.main;
    this.holeSpawnRate = 20;
    this.holeSpawned = false;
    this.checkpoints = [500, 1500, 2500, 3500, 5000];
    this.FGmovespeed = 3;

    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    var platHeightVari;
    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);


    // Parallax Scrolling Code:
    // Background Object Array
    this.backgrounds = [];
    this.bgSpeed = -6;

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

    // Hole
    this.hole = this.physics.add.sprite(game.config.width, game.config.height+100, 'hole');
    this.hole.scaleX = .15;
    this.hole.scaleY = .27;
    this.hole.setOrigin(0, 0)

    //TODO: adjust values of x and y for better gameplay
    //editing this to use an array.
    let numPlatforms = 9
    this.platforms = [numPlatforms];
    for(var i = 0; i < numPlatforms; i++){

      platHeightVari = 10*Math.random();
      platHeightVari = platHeightVari - (platHeightVari % 1);
      platHeightVari = (400 - 20 * platHeightVari);
      this.platforms[i] = new Platform(this, game.config.width + 128 * i, platHeightVari, 'platform', 0, this.FGmovespeed).setOrigin(0,0);
      this.platforms[i].setScale(128/1299);
    }

    this.player = new rabbitPlayer(this, 40, 40, 'player', 0).setOrigin(0,1);
    this.player.setScale(64/685);
    this.player.flipX = true;
    this.UFO1 = new Spaceship(this, game.config.width, game.config.height + 10, 'UFO1', 0, false, 30, this.player.x).setOrigin(0,0);
    this.spawnUFO1 = false;
    this.UFO2 = new Spaceship(this, game.config.width + 128, game.config.height + 10, 'UFO1', 0, false, 0, this.player.x).setOrigin(0,0);
    this.spawnUFO2 = false;
    // Set up timer
    // I used addEvent because I couldn't figure out how to loop with delayedCall
    this.distance = 0;

    this.clock = this.time.addEvent({delay: 100, callback: () => {
      this.distance++;

      if (this.UFO1.checkpoints.includes(this.distance)) {
        this.UFO1.spawnRate += 5;
        this.UFO2.spawnRate += 10
      }
      if (this.checkpoints.includes(this.distance)) {
        this.holeSpawnRate += 5;
      }
    }, callbackScope: this, loop: true});

    // Spaceship check 
    // i don't know who implemented this but this is probably responsible for the memory leak
    this.spaceshipCheck  = this.time.addEvent({delay: 5000, callback: () => {
      if (!this.UFO1.spawn) {
        let willSpawn = Phaser.Math.Between(0, 100);

        if (willSpawn <= this.UFO1.spawnRate) {
          this.UFO1.spawn = true;
          this.UFO1.y =  Phaser.Math.RND.pick(this.UFO1.yCoordinates);
          this.UFO1.x = this.player.x + game.config.width;
          this.UFO1.update();
        }
      }
      if (!this.UFO2.spawn) {
        let willSpawn = Phaser.Math.Between(0, 100);

        if (willSpawn <= this.UFO2.spawnRate) {
          this.UFO2.spawn = true;
          this.UFO2.y =  Phaser.Math.RND.pick(this.UFO1.yCoordinates);
          this.UFO2.x = this.player.x + game.config.width + 128;
          this.UFO2.update();
        }
      }
    }, callbackScope: this, loop: true});

    // Hole check
    this.holeSpawn = this.time.addEvent({delay: 2500, callback: () => {
        let willSpawn = Phaser.Math.Between(0, 100);

        if (willSpawn <= this.holeSpawnRate && !this.holeSpawned) {
          this.hole.setPosition(this.player.x + game.config.width + 50, 380);
          this.holeSpawned = true;
        //  console.log('test');
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
  
    // Physics collider for UFO1 and hole
    this.physics.add.overlap(this.player, this.UFO1, this.hitObject, null, this);
    this.physics.add.overlap(this.player, this.UFO2, this.hitObject, null, this);
    this.physics.add.overlap(this.player, this.hole, this.fallInHole, null, this);
}

  
  update() {
    if (this.player.y > game.config.height + 64) {
      this.hitObject();
    } 

    this.displayDistance.text = this.distance + " M";

    if (!this.gameOver) {
      this.player.update();
      //this.UFO1.playerX = this.player.x;

      // Spaceship
      if (this.UFO1.spawn) {
        this.UFO1.update();
      }
      if (this.UFO2.spawn) {
        this.UFO2.update();
      }

      // Hole
      if (this.holeSpawned) {
        this.hole.x -= this.FGmovespeed;
        if ((this.hole.x <= this.player.x) && (this.hole.x + (this.hole.width * this.hole.scaleX) > this.player.x + 64)){
          this.player.groundUnderSelf = 999;
        }
        else{
          this.player.groundUnderSelf = 440
        }

        if (this.hole.x < 0 - this.hole.width * this.hole.scaleX) {
          this.holeSpawned = false;
        }
      }
    
      // Platforms
      for(var i in this.platforms) {
        this.platforms[i].update();
        if (Math.abs(this.platforms[i].x - this.player.x) <= this.FGmovespeed){
          this.player.setPlatBackHeight(this.platforms[i].y);
        }
        else if (Math.abs(this.platforms[i].x - (this.player.x + 64)) <= this.FGmovespeed){
          this.player.setPlatFrontHeight(this.platforms[i].y);
        }
      }


      // Parallax scrolling
      // no wonder all of this went horribly wrong. i designed platform programming around a "treadmill" style
      // while whoever programmed this wanted the camera to actually move to the right - Anna
      //this.camera.scrollX += this.speed;
      //this.player.x += this.speed;
      //this.displayDistance.x += this.speed;

      for (let i = 0; i < this.backgrounds.length; i++) {
        const bg = this.backgrounds[i];
        bg.sprite.tilePositionX -= this.bgSpeed * bg.ratioX
      }

    } else {
      this.add.text(this.player.x + 380, 200, 'You went '.concat(this.distance).concat(' M!'), this.distanceConfig);
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
    this.spaceshipCheck.remove();
    this.holeSpawn.remove();
  }

  fallInHole() {
    //this.player.y += 18;
  }
}