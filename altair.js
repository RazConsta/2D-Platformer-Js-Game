class Altair {
    constructor(game) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/altair_sprites.png");
        this.lspritesheet = ASSET_MANAGER.getAsset("./sprites/altair_sprites_left.png");
        this.x = 0;
        this.y = 527;
        this.facing = "right"; 
        this.state = "idle"; 
        this.dead = false;
        this.velocity = { x: 0, y: 0 };
        this.fallAcc = 562.5;
        // this.updateBB();
        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() { 
        this.animations["right idle"] = new Animator(this.spritesheet, -999, 1, -999, 66, 6, 0.2, false, [3, 31, 42, 70, 81, 109, 120, 148, 159, 187, 198, 226]);
        this.animations["left idle"] = new Animator(this.lspritesheet, -999, 1, -999, 66, 6, 0.2, true, [623, 651, 662, 690, 701, 729, 740, 768, 779, 807, 818, 846]);
        this.animations["right walk"] = new Animator(this.spritesheet, -999, 70, -999, 68, 8, 0.2, false, [582, 605, 611, 643, 648, 677, 682, 705, 711, 734, 742, 778, 785, 815, 819, 842]);
        this.animations["left walk"] = new Animator(this.lspritesheet, -999, 70, -999, 68, 8, 0.2, true, [7, 30, 34, 64, 71, 105, 115, 137, 144, 167, 172, 201, 206, 238, 244, 267]); 
        this.animations["right run"] = new Animator(this.spritesheet, -999, 74, -999, 68, 8, 0.1, false, [1, 36, 45, 77, 84, 129, 132, 172, 177, 212, 220, 254, 260, 301, 308, 351]);
        this.animations["left run"] = new Animator(this.lspritesheet, -999, 74, -999, 68, 8, 0.1, true, [498, 541, 548, 589, 595, 629, 636, 672, 677, 717, 720, 765, 772, 804, 813, 848]);
        this.animations["right attack"] = new Animator(this.spritesheet, -999, 429, -999, 69, 5, 0.1, false, [17, 62, 66, 107, 114, 184, 191, 258, 265, 308]); 
        this.animations["left attack"] = new Animator(this.lspritesheet, -999, 429, -999, 69, 5, 0.1, true, [541, 584, 591, 658, 665, 735, 742, 783, 787, 844]);
        this.animations["right 360"] = new Animator(this.spritesheet, -999, 498, -999, 60, 7, 0.14, false, [4, 35, 38, 81, 84, 156, 157, 218, 222, 281, 284, 355, 356, 400]); 
        this.animations["left 360"];
        this.animations["right dead"];
        this.animations["left dead"];
    }

    /* updateBB() {
        this.lastBB = this.BB;
        if (this.size === 0 || this.size === 3) {
            this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }
        else {
            this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2);
        }
    }; */

    die() {
        this.velocity.y = -640;
        this.dead = true;
        ASSET_MANAGER.pauseBackgroundMusic();
    }

    update () {

        const TICK = this.game.clockTick;
        const WALK = 100;
        const RUN = 250;

        // pressing button to walk right
        if (this.game.A && !this.game.D) {
            if (this.game.shift) {
                // this.velocity.x -= RUN * TICK;
                this.velocity.x = -RUN;
                this.state = "run";
            } else {
                // this.velocity.x -= WALK * TICK;
                this.velocity.x = -WALK;
                this.state = "walk";
            }
        }
        else if (this.game.D && !this.game.A) {
            if (this.game.shift) {
                // this.velocity.x += RUN * TICK;
                this.velocity.x = RUN;
                this.state = "run";
            } else {
                // this.velocity.x += WALK * TICK;
                this.velocity.x = WALK;
                this.state = "walk";
                if (this.game.lclick && !this.game.rclick) {
                    this.state = "attack";
                }
            }
        }
        else if (!this.game.A && !this.game.D) {
            if (this.game.lclick && !this.game.rclick) {
                this.state = "attack";
            } else if (this.game.rclick && !this.game.lclick) {
                this.state = "block";
            }
            this.velocity.x = 0;
            this.state = "idle";
            if (this.game.lclick && !this.game.rclick) {
                this.state = "attack";
            }
        }
        else if (this.game.lclick && !this.game.rclick && !this.game.W && !this.game.S && !this.game.shift) {
            this.state = "attack";
        }
        else if (this.game.isIdle()) {
            this.state = "idle";
        }

        // if Altair fell off the map he's dead
        // if (this.y > PARAMS.BLOCKWIDTH * 16) this.die();

        if (this.x > 1672) this.x = 0;

        // update position
        // ASSET_MANAGER.("./music/07masyaf.mp3");
        this.x += this.velocity.x * TICK; 
        this.y += this.velocity.y * TICK;

        // this.updateBB();

        // TO DO COLLISION

        /* // update state
        if (this.state !== 4) { // if not jumping or falling
            if (this.game.crouch) this.state = 5; // if crouch
            else if (Math.abs(this.velocity.x) > WALK) this.state = 2; // running
            else if (Math.abs(this.velocity.x) >= WALK) this.state = 1; // walking
            else this.state = 0;
        } */

        // update direction
        if (this.velocity.x > 0) this.facing = "right";
        if (this.velocity.x < 0) this.facing = "left";
    };

    drawMinimap () {

    }

    draw(ctx) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./background/l1background.jpg"),0,0);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 0, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 1, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 2, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 3, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 4, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 5, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 6, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 7, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 8, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 9, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 10, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 11, 771);
        // ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 12, 771);
        // ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 13, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 14, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 15, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 16, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 17, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 18, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 19, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 20, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 21, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 22, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 23, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 24, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 25, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 26, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 27, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 28, 771);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 29, 771);
        
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 0, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 1, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 2, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 3, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 4, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 5, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 6, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 7, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 8, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 9, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 10, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 11, 714);
        // ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 12, 714);
        // ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 13, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 14, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 15, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 16, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 17, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 18, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 19, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 20, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 21, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 22, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 23, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 24, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 25, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 26, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 27, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 28, 714);
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/stone.png"), 0 + 57 * 29, 714);




        console.log("status + " + this.facing + " " + this.state);
        this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y);
    };
};