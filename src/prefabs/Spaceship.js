class Spaceship extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y, texture, frame, spawn, spawnRate, playerX){
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.spawn = spawn;
      this.spawnRate = spawnRate;
      this.yCoordinates = [130, 230, 330, 380, 430];
      this.checkpoints = [300, 1000, 2500, 3500, 5000];
      this.direction = "left";
      this.playerX = playerX;
  }

  update(){

 //   console.log(this.x);
    if (this.spawn) {

        //tweaking UFO mechanics, this block commented out if we want to revert
        /*
        if (this.x > this.playerX - 40 && this.direction == 'left') {
            this.x -= 3;
        
        } else {
            this.direction = 'right';
            this.x += 3;
        }*/

        this.x -= 3;

        if (this.x + this.width < 0) {
            this.spawn = false;
            this.direction = 'left';
            this.y = game.config.height + 20;
        
        }
    }
  }

  reset(){
      //TODO: finish
  }
}