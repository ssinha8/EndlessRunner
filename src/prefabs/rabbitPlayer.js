class rabbitPlayer extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.terminalV = -24
        this.vSpeed = 0;
        this.platBackUnderHeight = 400;
        this.platFrontUnderHeight = 400;
        this.groundUnderSelf = 400;

    }

    checkAndSnapGround() {
        //if we're already standing on a floor
        if(this.y == this.groundUnderSelf){
            return true;
        }
        //if we aren't standing on a floor just yet, but our projected
        //next position would cause us to fall through the floor in front
        else if(((this.y + (this.vSpeed / 8)) < this.groundUnderSelf) && (this.y > this.groundUnderSelf) && this.vSpeed < 0){
            this.y = this.groundUnderSelf; //snap us to the floor's height
            this.vSpeed = 0;
            return true;
        }
        else{
            return false;
        }
    }

    update(){
        if (!this.checkAndSnapGround()) {
            if(this.vSpeed < this.terminalV){
                this.vSpeed = this.terminalV;
            }
            if(keyUP.isDown){
                this.vSpeed -= 3; //gravity is 40% weaker if we're holding jump
                this.terminalV = -72; //and terminal velocity is 75% as fast
            }
            else{
                this.vSpeed -= 5;
                this.terminalV = -96;
            }
        }
        else{
            this.vSpeed = 96;
        }

        this.y -= (this.vSpeed / 8);

    }

    reset(){
        //TODO: finish
    }
}