class Spaceship extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, texture, frame, spawn){
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      this.spawn = spawn;
      this.spawnRate = 20;
      this.yCoordinates = [50, 100, 150, 200, 250];
      this.direction = "left";
  }

  update(){

    if (this.direction == "left") {
        this.x -= 2;

        if (this.x < 0) {
            this.direction = "right";
        }
    } else {
        this.x += 2;

        if (this.x >= game.config.width) {
            this.spawn = false;
            this.direction = "left";
        }
    }
  }

  reset(){
      //TODO: finish
  }
}