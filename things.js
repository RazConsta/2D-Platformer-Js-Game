class Stone {
    constructor (game, x, y, w) {
        Object.assign(this, {game, x, y, w});

        this.x = x;
        this.y = y;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/stone.png");

        this.BB = new BoundingBox(this.x, this.y, 57, 57);
    }

    update() {

    }

    draw(ctx) {
        let stoneCount = this.w / PARAMS.BLOCKWIDTH;
        // for (var i = 0; i < stoneCount; i++) {
            // ctx.drawImage(this.spritesheet,0,0, 60,60, this.x + i * PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            // ctx.drawImage(this.spritesheet, 0,0,60,60, this.x + i * PARAMS.BLOCKWIDTH - this.game.camera.x, this.y + PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        // }
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}