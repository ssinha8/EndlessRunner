class Platform extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, speed){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = speed;
        this.spawnrate = 3;
    }
  
    update(){
        //TODO: finish
        this.x -= this.moveSpeed;

        if (this.x <= -128) {
            this.reset();
            
            if(4 * Math.random() >= this.spawnrate){
                this.y = 999
            }else{
                var heightVARI
                heightVARI = 10*Math.random();
                heightVARI = heightVARI - (heightVARI % 1);
                this.y = (400 - 20 * heightVARI);
            }
        }
    }
    setHeight(newH){
        this.y = newH
    }
  
    reset(){
        this.x = 128 * 8;
    }
  }