class Spaceship extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y, texture, frame, spawn, playerX){
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.spawn = spawn;
      this.spawnRate = 15;
      this.yCoordinates = [50, 100, 150, 200, 250];
      this.checkpoints = [500, 1500, 2500, 3500, 5000];
      this.direction = "left";
      this.playerX = playerX;
  }

  update(){

 //   console.log(this.x);
    if (this.spawn) {
        if (this.x > this.playerX - 40 && this.direction == 'left') {
            this.x -= 3;
        
        } else {
            this.direction = 'right';
            this.x += 3;
        }

        if (this.x > this.playerX + game.config.width + 10) {
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