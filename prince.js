class Prince {
    constructor(game) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/prince_sprites.png");
        this.name = "Prince";

        this.x = 0;
        this.y = 1200;
        this.state = 0;
        
        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {
        this.animations[0] = new Animator(this.spritesheet, 6, 8, 36, 47, 1, 1);
    }

    update () {

    };

    draw(ctx) {

        this.animations[0].drawFrame(this.game.clockTick, ctx, 300, 300);

        // ctx.drawImage(ASSET_MANAGER.getAsset("./altair_walking.png"),0,0);
    };
};