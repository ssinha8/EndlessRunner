class Platform extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 2.5;
    }
  
    update(){
        //TODO: finish
        this.x -= this.moveSpeed;

        if (this.x <= -128) {
            this.reset();
        }
    }
  
    reset(){
        this.x = 128 * 8;
    }
  }