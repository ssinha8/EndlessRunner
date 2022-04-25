class rabbitPlayer extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.terminalV = -24
        this.vSpeed = 0;
        this.platUnderBackHeight = 400;
        this.platUnderFrontHeight = 400;
        this.groundUnderSelf = 400;

    }

    checkAndSnapGround() {
        //if we're already on the ground
        if(this.y == this.groundUnderSelf){
            return true;
        }
        //if we aren't standing on the ground just yet, but our projected
        //next position would cause us to fall through the ground
        else if(((this.y + (this.vSpeed / 8)) < this.groundUnderSelf) && (this.y > this.groundUnderSelf) && this.vSpeed < 0){
            this.y = this.groundUnderSelf; //snap us to the ground's height
            this.vSpeed = 0;
            return true;
        }
        else{
            return false;
        }
    }

    checkAndSnapPlatforms() {
                //if we're already on a plat
        if(this.y == this.platUnderBackHeight || this.y == this.platUnderFrontHeight){
            return true;
        }
        //if we aren't standing on a plat just yet, but our projected
        //next position would cause us to fall through the plat in front
        else if(((this.y + (this.vSpeed / 4)) < this.platUnderFrontHeight) && (this.y > this.platUnderFrontHeight) && this.vSpeed < 0){
            this.y = this.platUnderFrontHeight; //snap us to that plat's height
            this.vSpeed = 0;
            return true;
        }
        //if we aren't standing on a plat just yet, but our projected
        //next position would cause us to fall through the plat in back
        else if(((this.y + (this.vSpeed / 4)) < this.platUnderBackHeight) && (this.y > this.platUnderBackHeight) && this.vSpeed < 0){
            this.y = this.platUnderBackHeight; //snap us to that plat's height
            return true;
        }
        else{
            return false;
        }
    }

    update(){
        this.isOnPlat = this.checkAndSnapPlatforms();
        this.isOnGround = this.checkAndSnapGround();
        if (!this.isOnPlat && !this.isOnGround) {
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