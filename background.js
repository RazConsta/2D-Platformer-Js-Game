class Background {
    constructor(game, path) {
        // need to do Object.assign

        this.path = ASSET_MANAGER.getAsset(path);
    }

    update () {

    }

    draw(ctx) {
        ctx.drawImage(this.path, 0, 0);
    }
}