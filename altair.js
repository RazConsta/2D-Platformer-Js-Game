class Altair {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.game.altair = this;
        this.game = game;

        // spritesheets
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/altair_sprites.png");
        this.lspritesheet = ASSET_MANAGER.getAsset("./sprites/altair_sprites_left.png");

        // altair's state variables
        this.facing = "right"; 
        this.state = "idle"; 
        this.dead = false;

        // Does not trigger attack after clicking start game.
        this.game.lclick = false;
        this.animationTrigger = false;

        // health related
        this.maxhp = 100 * this.game.camera.levelCount;
        this.maxbars = 5 * this.game.camera.levelCount;
        this.hp = 80;
        this.healthbar = new HealthBar(this);

        this.velocity = { x: 0, y: 0 };
        this.fallAcc = 562.5;

        // this.updateBB();

        // altair's animations
        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() { 
        this.animations["right idle"] = new Animator(this.spritesheet, -999, 1, -999, 66, 6, 0.2, false, true, false, [3, 31, 42, 70, 81, 109, 120, 148, 159, 187, 198, 226]);
        this.animations["right walk"] = new Animator(this.spritesheet, -999, 70, -999, 68, 8, 0.2, false, true, false, [582, 605, 611, 643, 648, 677, 682, 705, 711, 734, 742, 778, 785, 815, 819, 842]); 
        this.animations["right run"] = new Animator(this.spritesheet, -999, 74, -999, 68, 8, 0.1, false, true, false, [1, 36, 45, 77, 84, 129, 132, 172, 177, 212, 220, 254, 260, 301, 308, 351]);
        this.animations["right attack"] = new Animator(this.spritesheet, -999, 429, -999, 69, 5, 0.1, false, false, false, [17, 62, 66, 107, 114, 184, 191, 258, 265, 308]); 
        this.animations["right 360"] = new Animator(this.spritesheet, -999, 498, -999, 60, 7, 0.14, false, false, false, [4, 35, 38, 81, 84, 156, 157, 218, 222, 281, 284, 355, 356, 400]); 
        this.animations["right dead"];

        this.animations["left idle"] = new Animator(this.spritesheet, -999, 1, -999, 66, 6, 0.2, false, true, true, [3, 31, 42, 70, 81, 109, 120, 148, 159, 187, 198, 226]);
        this.animations["left walk"] = new Animator(this.spritesheet, -999, 70, -999, 68, 8, 0.2, false, true, true, [582, 605, 611, 643, 648, 677, 682, 705, 711, 734, 742, 778, 785, 815, 819, 842]); 
        this.animations["left run"] = new Animator(this.spritesheet, -999, 74, -999, 68, 8, 0.1, false, true, true, [1, 36, 45, 77, 84, 129, 132, 172, 177, 212, 220, 254, 260, 301, 308, 351]);
        this.animations["left attack"] = new Animator(this.spritesheet, -999, 429, -999, 69, 5, 0.1, false, false, true, [17, 62, 66, 107, 114, 184, 191, 258, 265, 308]); 

        /*this.animations["left idle"] = new Animator(this.lspritesheet, -999, 1, -999, 66, 6, 0.2, true, true, true, [623, 651, 662, 690, 701, 729, 740, 768, 779, 807, 818, 846]);
        this.animations["left walk"] = new Animator(this.lspritesheet, -999, 70, -999, 68, 8, 0.2, true, true, true, [7, 30, 34, 64, 71, 105, 115, 137, 144, 167, 172, 201, 206, 238, 244, 267]);
        this.animations["left run"] = new Animator(this.lspritesheet, -999, 74, -999, 68, 8, 0.1, true, true, true, [498, 541, 548, 589, 595, 629, 636, 672, 677, 717, 720, 765, 772, 804, 813, 848]);
        this.animations["left attack"] = new Animator(this.lspritesheet, -999, 429, -999, 69, 5, 0.1, true, false, true, [541, 584, 591, 658, 665, 735, 742, 783, 787, 844]);
        this.animations["left 360"]; */
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

        this.initial_facing = this.facing;

        // + Movement Physics -----------------------------------------------------------
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
            }
        }
        else if (this.game.isIdle()) {
            this.velocity.x = 0;
            this.state = "idle";
        }

        /*
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
        */
       // - Movement Physics --------------------------------------------------------------

        // update direction
        if (this.velocity.x > 0) this.facing = "right";
        if (this.velocity.x < 0) this.facing = "left";

        // update position
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;

       

        // + Attack Physics -------------------------------------------
        // if only pressing left click / attack

        console.log("lclick is " + this.game.lclick);

        // Prevents attack animation from resuming if moving during attack. i.e. moving interrupts attacking
        if (this.velocity.x != 0) this.animationTrigger = false;

        if ((this.game.lclick || this.animationTrigger) && !this.game.rclick 
            && !this.game.W && !this.game.A && !this.game.S && !this.game.D 
            && !this.game.shift) {
            this.state = "attack";
            if (this.animations[this.facing + " attack"].isDone()) { // if the animation is done
                this.state = "idle"; // set state to idle once attack animation is finished
                this.velocity.x = 0;
                this.animationTrigger = false;
                this.animations[this.facing + " attack"].elapsedTime = 0;
            }
            else { // if the animation is not done 
                this.animationTrigger = true;
            }
        } else {
            // reset the attack animation
            this.velocity.x = 0;
            this.animations[this.facing + " attack"].elapsedTime = 0;
        }

        // - Attack physics -------------------------------------------

        // if Altair fell off the map he's dead
        // if (this.y > PARAMS.BLOCKWIDTH * 16) this.die();

        

        // this.updateBB();

        // TO DO COLLISION

        /* // update state
        if (this.state !== 4) { // if not jumping or falling
            if (this.game.crouch) this.state = 5; // if crouch
            else if (Math.abs(this.velocity.x) > WALK) this.state = 2; // running
            else if (Math.abs(this.velocity.x) >= WALK) this.state = 1; // walking
            else this.state = 0;
        } */

        // if (this.facing == "right" && this.x > 1672) this.x = 0; // hitting the right end of the level
        if (this.facing == "left" && this.x < 50) this.x = 50; // replace when putting up a wall at the start of level
    };

    isAlmostDone(tick) {
        return this.animations[this.facing + " " + this.state].elapsedTime + tick >= this.animations[this.facing + " " + this.state].totalTime;
    }

    drawMinimap () {

    }

    draw(ctx) {
        this.healthbar.draw(ctx);
        // let x = this.x; // if character changes direction we will need to account for the flipped animation origin change
        if (this.initial_facing == "right" && this.facing =="left") this.x += 70;  
        if (this.initial_facing == "left" && this.facing == "right") this.x -= 70;
        this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y);
    };
};