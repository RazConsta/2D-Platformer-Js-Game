class Altair {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.game.altair = this;
        this.game = game;
        this.name = "Altair";
        this.type = "player";

        // spritesheets
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/altair_sprites.png");
        this.lspritesheet = ASSET_MANAGER.getAsset("./sprites/altair_sprites_left.png");

        // altair's state variables
        this.facing = "right"; // can be left or right
        this.state = "idle"; // can be idle, jump, walk, run, attack
        this.dead = false;

        // Does not trigger attack after clicking start game.
        this.game.lclick = false;
        this.animationTrigger = false;

        // health related
        this.maxhp = 100 * this.game.camera.levelCount;
        this.maxbars = 5 * this.game.camera.levelCount;
        this.hp = 0.75 * this.maxhp;
        this.healthbar = new HealthBar(this);

        this.arrowSpeed = 3;
        this.arrowRate = 180;
        this.arrowTimer = this.arrowRate;
        this.arrowSize = 60;

        this.weapon = "sword";
        this.arrows = 100;

        this.velocity = { x: 0, y: 0 };
        // this.fallAcc = 562.5;

        this.multiplier = 1;
        if (this.game.camera.levelCount == 2 || this.game.camera.levelLabel == "Level 5/5") {
            this.multiplier = 2; // Altair is 2 times taller in level 2 and 5. Used for adjusting the collision offset and
        } 

        this.updateBB();

        // altair's animations
        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() { 
        this.animations["right idle"] = new Animator(this.spritesheet, -999, 1, -999, 66, 6, 0.2, false, true, false, [3, 31, 42, 70, 81, 109, 120, 148, 159, 187, 198, 226]);
        this.animations["right jump"] = new Animator(this.spritesheet, -999, 283, -999, 57, 5, 0.1, false, true, false, [1, 39, 45, 84, 92, 125, 134, 172, 178, 217]);
        this.animations["right walk"] = new Animator(this.spritesheet, -999, 70, -999, 68, 8, 0.2, false, true, false, [582, 605, 611, 643, 648, 677, 682, 705, 711, 734, 742, 778, 785, 815, 819, 842]); 
        this.animations["right run"] = new Animator(this.spritesheet, -999, 74, -999, 68, 8, 0.1, false, true, false, [1, 36, 45, 77, 84, 129, 132, 172, 177, 212, 220, 254, 260, 301, 308, 351]);
        this.animations["right sword"] = new Animator(this.spritesheet, -999, 429, -999, 69, 5, 0.1, false, false, false, [17, 62, 66, 107, 114, 184, 191, 258, 265, 308]); 
        this.animations["right crossbow"] = new Animator(this.spritesheet, -999, 971, -999, 66, 5, 0.25, false, false, false, [4, 32, 43, 92, 100, 139, 149, 189, 198, 246]);
        this.animations["right climb"] = new Animator(this.spritesheet, -999, 1961, -99, 73, 6, 0.2, false, true, false, [639, 663, 675, 700, 710, 735, 745, 771, 782, 807, 819, 843]);
        this.animations["right dead"];

        this.animations["left idle"] = new Animator(this.spritesheet, -999, 1, -999, 66, 6, 0.2, false, true, true, [3, 31, 42, 70, 81, 109, 120, 148, 159, 187, 198, 226]);
        this.animations["left jump"] = new Animator(this.spritesheet, -999, 283, -999, 57, 5, 0.1, false, true, true, [1, 39, 45, 84, 92, 125, 134, 172, 178, 217]);
        this.animations["left walk"] = new Animator(this.spritesheet, -999, 70, -999, 68, 8, 0.2, false, true, true, [582, 605, 611, 643, 648, 677, 682, 705, 711, 734, 742, 778, 785, 815, 819, 842]); 
        this.animations["left run"] = new Animator(this.spritesheet, -999, 74, -999, 68, 8, 0.1, false, true, true, [1, 36, 45, 77, 84, 129, 132, 172, 177, 212, 220, 254, 260, 301, 308, 351]);
        this.animations["left climb"] = new Animator(this.spritesheet, -999, 1961, -99, 73, 6, 0.2, false, true, true, [639, 663, 675, 700, 710, 735, 745, 771, 782, 807, 819, 843]);
        this.animations["left sword"] = new Animator(this.spritesheet, -999, 429, -999, 69, 5, 0.1, false, false, true, [17, 62, 66, 107, 114, 184, 191, 258, 265, 308]); 
        this.animations["left crossbow"] = new Animator(this.spritesheet, -999, 971, -999, 66, 5, 0.25, false, false, true, [4, 32, 43, 92, 100, 139, 149, 189, 198, 246]);

        // this.animations["right 360"] = new Animator(this.spritesheet, -999, 498, -999, 60, 7, 0.14, false, false, false, [4, 35, 38, 81, 84, 156, 157, 218, 222, 281, 284, 355, 356, 400]); 
        /*this.animations["left idle"] = new Animator(this.lspritesheet, -999, 1, -999, 66, 6, 0.2, true, true, true, [623, 651, 662, 690, 701, 729, 740, 768, 779, 807, 818, 846]);
        this.animations["left walk"] = new Animator(this.lspritesheet, -999, 70, -999, 68, 8, 0.2, true, true, true, [7, 30, 34, 64, 71, 105, 115, 137, 144, 167, 172, 201, 206, 238, 244, 267]);
        this.animations["left run"] = new Animator(this.lspritesheet, -999, 74, -999, 68, 8, 0.1, true, true, true, [498, 541, 548, 589, 595, 629, 636, 672, 677, 717, 720, 765, 772, 804, 813, 848]);
        this.animations["left attack"] = new Animator(this.lspritesheet, -999, 429, -999, 69, 5, 0.1, true, false, true, [541, 584, 591, 658, 665, 735, 742, 783, 787, 844]);
        this.animations["left 360"]; */
        this.animations["left dead"];
    }

    updateBB() {
        this.lastBB = this.BB;
        let sign;
        if (this.facing == "right") {
            sign = 0;
        } else {
            sign = -1;
        }

        if (this.state == "sword") {
            this.BB = new BoundingBox(this.x + sign * 205, this.y, 205 * this.multiplier, 178 * this.multiplier);
        }
        else if (this.state == "idle" || this.state == "walk"|| this.state == "climb" || this.state == "run" || this.state == "jump" || this.state == "crossbow") {
            this.BB = new BoundingBox(this.x + sign * 80, this.y, 80 * this.multiplier, 178 * this.multiplier);
        }
        // else if (this.state == "walk") {
        //   this.BB = new BoundingBox(this.x + sign * 100, this.y, 100 * this.multiplier, 178 * this.multiplier);
        // }
        // else if (this.state == "run") {
        //    this.BB = new BoundingBox(this.x + sign * 135, this.y, 135 * this.multiplier, 178 * this.multiplier);
        // } 
        else if (this.state == "jump") {
            this.BB = new BoundingBox(this.x + sign * 135, this.y, 135 * this.multiplier, 178 * this.multiplier);
        }
        // else if (this.state == "climb") {
        //     this.BB = new BoundingBox(this.x + sign * 100, this.y, 100 * this.multiplier, 178 * this.multiplier);
        // }
       
    }

    die() {
        this.velocity.y = -640;
        this.dead = true;
        ASSET_MANAGER.pauseBackgroundMusic();
    }

    update () {

        const TICK = this.game.clockTick;
        const WALK = 100 * this.multiplier;
        const RUN = 250 * this.multiplier;
        const FALL = 700 * this.multiplier;

        this.initial_facing = this.facing;

        if (this.game.wheel && this.weapon == "sword")
        {
            this.weapon = "crossbow";
            this.game.wheel = false;
        } 
        else if (this.game.wheel && this.weapon == "crossbow")
        {
            this.weapon = "sword";
            this.game.wheel = false;
        }

        if (this.state != "jump" && this.state != "climb") 
        { 
            if (this.game.A && !this.game.D && !this.game.W) 
            { 
                if (this.game.shift) 
                { 
                    this.velocity.x = -RUN;
                    this.state = "run";
                } 
                else 
                { 
                    this.velocity.x = -WALK;
                    this.state = "walk";
                }
            }
            else if (this.game.D && !this.game.A && !this.game.W) 
            { 
                if (this.game.shift) 
                { 
                    this.velocity.x = RUN;
                    this.state = "run";
                } 
                else 
                { 
                    this.velocity.x = WALK;
                    this.state = "walk";
                }
            } 
            else if (this.state != "sword" && this.game.isIdle()) 
            {
                this.velocity.x = 0;
                this.state = "idle";
            }

            this.updateDirectionPosition(TICK);

            this.velocity.y += FALL * TICK;

            if (this.game.W && !this.game.S) 
            { // JUMP
                this.state = "jump";
                this.velocity.y = -440;

                /*
                if (this.game.A && !this.game.D) 
                { // GO LEFT
                    if (this.game.shift) 
                    { // RUN
                        this.velocity.x = -RUN;
                    } 
                    else 
                    { // WALK
                        this.velocity.x = -WALK;
                    }
                }
                else if (this.game.D && !this.game.A) 
                { // GO RIGHT
                    if (this.game.shift) 
                    { // RUN
                        // this.velocity.x += RUN * TICK;
                        this.velocity.x = RUN;
                    } 
                    else 
                    { // WALK
                    // this.velocity.x += WALK * TICK;
                    this.velocity.x = WALK;
                    }
                } 
                */
            } 

            if (this.velocity.x != 0) this.animationTrigger = false;
            
            if (this.weapon == "sword" && (this.game.lclick || this.animationTrigger) && !this.game.rclick // Sword 
                && !this.game.W && !this.game.A && !this.game.S && !this.game.D 
                && !this.game.shift) 
            {
                this.state = "sword";
                if (this.animations[this.facing + " sword"].isDone()) 
                { // if the animation is done
                    this.state = "idle"; // set state to idle once attack animation is finished
                    this.velocity.x = 0;
                    this.animationTrigger = false;
                    this.animations[this.facing + " sword"].elapsedTime = 0;
                }
                else if (!this.animations[this.facing + " sword"].isDone())
                { // if the animation is not done 
                    this.animationTrigger = true;
                    this.state = "sword";
                }
            } 
            else 
            {
                // reset the attack animation
                this.velocity.x = 0;
                this.animations[this.facing + " sword"].elapsedTime = 0;
            }

            // if (this.game.mouse) {
                // this.game.addEntity(new Bullet(this.game, this.x + 50, this.y + 55, this.arrowSize, this.game.mouse.x, this.game.mouse.y, this.arrowSpeed, "player"));
            // }
            

            if (this.weapon == "crossbow" && (this.game.lclick || this.animationTrigger) && !this.game.rclick && this.game.mouse // Crossbow
                && !this.game.W && !this.game.A && !this.game.S && !this.game.D 
                && !this.game.shift) 
            {
                if (this.arrowTimer <= 0 && this.arrows > 0) {
                    this.arrows--;
                    this.state = "idle";
                    if (this.facing == "left") {
                      // this.game.addEntity(new Bullet(this.game, this.x - 120, this.y + 55, this.arrowSize, this.game.mouse.x, this.game.mouse.y, this.arrowSpeed, "player"));
                      this.game.addEntity(new Arrow(this.game, this.x - 120, this.y + 55, {x: this.game.mouse.x, y: this.game.mouse.y}, true));
                    } else if (this.facing == "right") {
                        this.game.addEntity(new Arrow(this.game, this.x + 90, this.y + 30, {x: this.game.mouse.x, y: this.game.mouse.y}, true));
                      // this.game.addEntity(new Bullet(this.game, this.x + 100, this.y + 55, this.arrowSize, this.game.mouse.x, this.game.mouse.y, this.arrowSpeed, "player"));
                    } 

                    

                    this.arrowTimer = this.arrowRate;
                  }

                //shooting cooldown counter
                if (this.arrowTimer <= this.arrowRate) {
                    this.arrowTimer--;
                }

                this.state = "crossbow";
                if (this.animations[this.facing + " crossbow"].isDone()) 
                { // if the animation is done
                    this.state = "idle"; // set state to idle once attack animation is finished
                    this.velocity.x = 0;
                    this.animationTrigger = false;
                    this.animations[this.facing + " crossbow"].elapsedTime = 0;
                }
                else if (!this.animations[this.facing + " crossbow"].isDone())
                { // if the animation is not done 
                    this.animationTrigger = true;
                    this.state = "crossbow";
                }
            }
            else 
            {
                // reset the attack animation
                this.velocity.x = 0;
                this.animations[this.facing + " crossbow"].elapsedTime = 0;
            }
        } 
        else if (this.state == "jump")
        {
            // air physics
            if (this.game.D && !this.game.A) {
                if (!this.game.shift) {
                    this.velocity.x = WALK;
                    // this.state = "walk";
                } else {
                    this.velocity.x = RUN;
                    // this.facing = "run";
                }
                // this.facing = "right";
            } else if (this.game.A && !this.game.D) {
                if (!this.game.shift) {
                    this.velocity.x = -WALK;
                    // this.state = "walk";
                } else {
                    this.velocity.x = -RUN;
                    // this.state = "run";
                }
            }
        } 

        this.velocity.y += FALL * TICK;

        this.updateBB();

        // if Altair fell off the map he's dead
        // if (this.y > PARAMS.BLOCKWIDTH * 16) this.die();

        var that = this;
        this.game.entities.forEach(function (entity) // Collisions
        {
            if (entity.BB && that.BB.collide(entity.BB)) 
            {
                if (that.velocity.y > 0) 
                { // falling
                    if (entity instanceof Stone && that.lastBB.bottom <= entity.BB.top) 
                    {  // falling     
                            that.y = entity.BB.top - 178 * that.multiplier;
                            that.velocity.y = 0;
                            if (that.state == "jump") that.state = "idle"; // set state to not jumping
                            that.updateBB();
                    } /* else if (entity instanceof Tower && that.lastBB.bottom <= entity.topBB.top) 
                    {  // falling     
                            that.y = entity.topBB.top - 250 * that.multiplier;
                            that.velocity.y = 0;
                            if (that.state == "jump") that.state = "idle"; // set state to not jumping
                            that.updateBB();
                    } */
                }
                if (that.velocity.y < 0) 
                { // jumping
                    if (entity instanceof Stone
                        && (that.lastBB.top) >= entity.BB.bottom // was below last tick
                        && that.BB.collide(entity.leftBB) && that.BB.collide(entity.rightBB)) 
                    { // collide with the center point of the brick
                        that.velocity.y = 0;
                    }
                }

                if (entity instanceof Tower) 
                {
                    that.velocity.y = 0;
                    // if (that.state == "jump") that.state = that.lastState;

                    if (that.game.D && that.facing == "right") 
                    {
                        if (entity.BB && that.BB.collide(entity.BB) && entity.skyBB && !that.BB.collide(entity.skyBB)) 
                        {
                            that.state = "climb";
                            // that.x -= 1;
                            that.velocity.x = 0;
                            that.y -= 1;
                        }
                        else  // if (that.state == "climb") // getting to the top of the tower
                        {
                            if (that.game.A || that.game.D) that.state = "walk";
                            else that.state = "idle";
                            that.x = that.x + 1;
                            that.y = that.y;
                        }
                    } 
                    else if (that.game.A && that.facing == "left") 
                    {
                        if (entity.BB && that.BB.collide(entity.BB) && entity.skyBB && !that.BB.collide(entity.skyBB)) 
                        {
                            that.state = "climb";
                            // that.x += 1;
                            that.velocity.x = 0;
                            that.y -= 1;
                        }
                        else  // if (that.state == "climb") // getting to the top of the tower
                        {
                            if (that.game.A || that.game.D)  that.state = "walk";
                            else that.state = "idle";
                            that.x = that.x - 1;
                            that.y = that.y;
                        }
                    }   
                }
            }
        });

        /* if (this.state != "jump") 
        { // if not jumping or falling
            if (Math.abs(this.velocity.x) === WALK) this.state = "walk"; 
            else if (Math.abs(this.velocity.x) === RUN) this.state = "run"; 
            else if (this.velocity.x === 0) this.state = "idle";
        } */

        if (this.facing == "left" && this.x < 50 * this.multiplier) this.x = 50 * this.multiplier; // hitting the left end of the level
        if (this.facing == "right" && this.x > this.game.camera.levelLimit) this.x = this.game.camera.levelLimit - 3 * this.multiplier; // hitting the right end of the level

        this.updateDirectionPosition(TICK);
        this.lastState = this.state;
    };

    isAlmostDone(tick) {
        return this.animations[this.facing + " " + this.state].elapsedTime + tick >= this.animations[this.facing + " " + this.state].totalTime;
    }

    updateDirectionPosition(TICK) {
        // update direction
        if (this.velocity.x > 0) this.facing = "right";
        if (this.velocity.x < 0) this.facing = "left";

        // update position
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
    }

    drawMinimap () {

    }

    draw(ctx) {
        this.healthbar.draw(ctx);
        // let x = this.x; // if character changes direction we will need to account for the flipped animation origin change
        if (this.initial_facing == "right" && this.facing =="left") {
            this.x += 70; 
            // this.game.camera.x += 70; 
        }
        if (this.initial_facing == "left" && this.facing == "right") {
            this.x -= 70;  
            // this.game.camera.x -= 70;
        }
        let temp = PARAMS.SCALE;
        if (this.game.camera.levelCount == 2) {
            PARAMS.SCALE = 6;
        }
        if (this.game.camera.levelLabel == "Level 5/5"){
            PARAMS.SCALE = 6;
        }
        this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y);
        
        PARAMS.SCALE = temp;

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.lineWidth = 2;
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};