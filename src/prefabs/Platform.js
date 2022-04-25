class Platform extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 3; 
    }
  
    update(){
        //TODO: finish
        this.x -= this.moveSpeed;

        if (this.x <= 0-this.width) {
            this.x = game.config.width + Phaser.Math.Between(0, 100);
        }
    }
  
    reset(){
        //TODO: finish
    }
  }