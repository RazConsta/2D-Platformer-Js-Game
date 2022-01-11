class Altair {
    constructor(game) {
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./altair_walking.png"), 5, 0, 33, 68, 8, 0.2, [5, 28, 34, 66, 71, 100, 105, 128, 135, 157, 165, 201, 208, 238, 242, 265]);
    
        this.x = 0;
        this.y = 0;
        this.speed = 100;
    };

    update () {
        this.x += this.speed * this.game.clockTick;
        if (this.x > 1860) this.x = 0;
    };

    draw(ctx) {
        
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        // ctx.drawImage(ASSET_MANAGER.getAsset("./altair_walking.png"),0,0);
    }
}