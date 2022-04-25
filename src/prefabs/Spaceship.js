class Spaceship extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, texture, frame){
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      this.spawn = false;
      
  }

  update(){
      //TODO: finish
  }

  reset(){
      //TODO: finish
  }
}