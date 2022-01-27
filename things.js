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
            ctx.lineWidth = 2;
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}

class Tower {
    constructor (game, x, y, w) {
        Object.assign(this, {game, x, y, w});

        this.x = x;
        this.y = y;
        this.w = w;
        this.spritesheet = ASSET_MANAGER.getAsset("./tiles/towers.png");

        this.BB    =    new BoundingBox(this.x + 12, this.y + 65, this.w - 30, this.w * 2.26 - 60); 
        this.topBB =    new BoundingBox(this.x + 12, this.y + 65, this.w - 30, 1);
        this.skyBB =    new BoundingBox(this.x + 12, this.y - 65, this.w - 30, 1);
    }

    update() {

    }

    draw (ctx) {
        ctx.drawImage(this.spritesheet, 3, 1, 107, 242, this.x - this.game.camera.x, this.y, this.w, this.w * 2.26);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.lineWidth = 2;
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
            // ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y, this.topBB.width, this.topBB.height);
            ctx.strokeRect(this.skyBB.x - this.game.camera.x, this.skyBB.y, this.skyBB.width, this.skyBB.height);
        }
    }
}