class Soldier 
{
    constructor(game, x, y) 
    {
        Object.assign(this, {game, x, y});
        this.x = x;
        this.y = y;
        // this.game.soldiers.push(this);
        this.game = game;
        
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/soldier.png");

        this.name = "soldier";
        this.facing = "left";
        this.state = "idle"; // can be idle, run, attack
        this.dead = false;

        this.hp = 59;
        this.healthbar = new HealthBar(this);

        this.updateBB();

        this.deadCounter = 0;

        this.animations = [];
        this.loadAnimations();
    }

    loadAnimations() {
        this.animations["right idle"] = new Animator(this.spritesheet, -999, 10, -999, 32, 1, 1, false, true, false, [14, 32]);
        this.animations["right run"] = new Animator(this.spritesheet, -999, 56, -999, 32, 4, 0.2, false, true, false, [14, 31, 43, 61, 73, 90, 100, 118]);
        this.animations["right attack"] = new Animator(this.spritesheet, -999, 105, -999, 32, 3, 0.2, false, true, false, [15, 51, 59, 88, 97, 140]);
        this.animations["right dead"] = new Animator(this.spritesheet, -999, 151, -999, 32, 4, 0.3, false, false, false, [13, 37, 55, 75, 91, 116, 131, 164]);

        this.animations["left idle"] = new Animator(this.spritesheet, -999, 10, -999, 32, 1, 1, false, true, true, [14, 32]);
        this.animations["left run"] = new Animator(this.spritesheet, -999, 56, -999, 32, 4, 0.2, false, true, true, [14, 31, 43, 61, 73, 90, 100, 118]);
        this.animations["left attack"] = new Animator(this.spritesheet, -999, 105, -999, 32, 3, 0.2, false, true, true, [15, 51, 59, 88, 97, 140]);
        this.animations["left dead"] = new Animator(this.spritesheet, -999, 151, -999, 32, 4, 0.3, false, false, true, [13, 37, 55, 75, 91, 116, 131, 164]);

        this.animations["rightdead"] = new Animator(this.spritesheet, 131, 168, 33, 15, 1, 1, false, true, false);
        this.animations["leftdead"] = new Animator(this.spritesheet, 131, 168, 33, 15, 1, 1, false, true, true);
    }

    updateBB() {
        this.lastBB = this.BB;
        let sign;
        if (this.facing == "right") {
            sign = 0;
        } else if (this.facing == "left") {
            sign = -1;
        }
        if (this.dead) {
            this.BB = new BoundingBox(0, 0, 0, 0);
        } else {
            this.BB = new BoundingBox(this.x + sign * 90, this.y, 64, 188);
        }
    }

    update() {
        if (this.hp <= 0) {
            this.dead = true;
            this.state = "dead";
            this.deadCounter += this.game.clockTick;
        }
        this.updateBB();
    }

    draw(ctx) {
        let temp = PARAMS.SCALE;
        PARAMS.SCALE = 6;

        if (this.dead && this.deadCounter > 0.9) {
            this.animations[this.facing + "dead"].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + 102);
        } else {
            this.healthbar.draw(ctx);
            this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y);
        }
    
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.lineWidth = 2;
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
        PARAMS.SCALE = temp;2
    }
}