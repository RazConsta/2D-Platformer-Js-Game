class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        // this.score = 0;
        // this.coins = 0;
        // this.lives = 3;

        this.gameOver = false;

        this.title = true;
        this.credits = false;
        this.level = null;

        // this.coinAnimation = new Animator(ASSET_MANAGER.getAsset("./sprites/coins.png"), 0, 160, 8, 8, 4, 0.2, 0, false, true);

        // this.minimap = new Minimap(this.game, 1.5 * PARAMS.BLOCKWIDTH, 3.5 * PARAMS.BLOCKWIDTH, 224 * PARAMS.SCALE);

        this.altair = new Altair(this.game, 10, 530);

        // this.loadLevel(levelOne, PARAMS.BLOCKWIDTH, 13 * PARAMS.BLOCKWIDTH, false, true);
        this.loadLevel(levelOne, true);

        // NOTE: PLEASE USE THE FOLLOWING LINE TO TEST.
        // this.loadLevel(levelTwo, 2.5 * PARAMS.BLOCKWIDTH, 13 * PARAMS.BLOCKWIDTH, false, true);
        console.log("sceneManager: constructed")
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    // Chris also has x, y and transition
    loadLevel(level, title) {
        this.title = title;
        this.level = level;
        this.clearEntities();
        this.x = 0;
        // this.underground = level.underground;
        
        /*
        if (transition) {
            this.game.addEntity(new TransitionScreen(this.game, level, x, y, title));
        } else { 
        */

            if (level.background) {
                this.game.addEntity(new Background(this.game, level.background));
            }

            if (level.stones) {
                for (var i = 0; i < level.stones.length; i++) {
                    let stone = level.stones[i];
                    this.game.addEntity(new Stone(this.game, stone.x, stone.y));
                }
           // }

           
            // this.altair.x = x;
            // this.altair.y = y;

            this.altair.removeFromWorld = false;
            this.altair.velocity = { x: 0, y: 0 }; 
            
            if (level.music && !this.title) {
                ASSET_MANAGER.pauseBackgroundMusic();
                ASSET_MANAGER.playAsset(level.music);
            }
        
            /*
            var that = this;
            var altair = false;
            this.game.entities.forEach(function(entity) {
                if(that.altair === entity) altair = true;
            });
            if(!altair) this.game.addEntity(this.altair); 
            */
            
        }

        /*
        if (level.lifts) {
            for (var i = 0; i < level.lifts.length; i++) {
                let lift = level.lifts[i];
                this.game.addEntity(new Lift(this.game, lift.x * PARAMS.BLOCKWIDTH, lift.y * PARAMS.BLOCKWIDTH, lift.goingDown));
            }
        }
        */
        // this.altair.x = x;
        // this.altair.y = y;

        this.game.addEntity(this.altair);
        console.log("sceneManager: loadLevel")
    };

    updateAudio() {
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);

    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;

        this.updateAudio();

        if (this.title && this.game.lclick) {
            // Title Screen -> Start
            if (!this.credits && this.game.mouse.x > 900 && this.game.mouse.x < 1100 && this.game.mouse.y > 230 && this.game.mouse.y < 260) {
                this.title = false;
                this.altair = new Altair(this.game, 10, 530);
                this.loadLevel(levelOne, false);
            }
            // Title Screen -> Credits
            if (!this.credits && this.game.mouse.x > 900 && this.game.mouse.x < 1050 && this.game.mouse.y > 290 && this.game.mouse.y < 325) {
                this.loadLevel(levelOne, true);
                this.credits = true;
            }
            // Credits -> Title Screen
            if (this.credits && this.game.mouse.x > 740 && this.game.mouse.x < 950 && this.game.mouse.y > 360 && this.game.mouse.y < 420) {
                this.credits = false;
                this.loadLevel(levelOne, true);
            }
        } 

        // this.altair = new Altair(this.game, PARAMS.BLOCKWIDTH, 0);
        // this.loadLevel(levelOne, PARAMS.BLOCKWIDTH, 0);

        /* if (this.gameOver) {
            this.gameOver = false;
            this.lives = 3;
            this.score = 0;
            this.coins = 0;
            var x = 2.5 * PARAMS.BLOCKWIDTH;
            var y = 13 * PARAMS.BLOCKWIDTH;
            this.mario = new Mario(this.game, x, y);

            this.clearEntities();

            this.game.addEntity(new TransitionScreen(this.game, levelOne, x, y, true));
        } */

        let midpoint = PARAMS.CANVAS_WIDTH/2 - PARAMS.BLOCKWIDTH / 2;

        // if (this.x < this.mario.x - midpoint) this.x = this.mario.x - midpoint;

        // NOTE: THIS FOLLOWING CODE HAS A BUG WHERE CANVAS COLOR WON'T CHANGE BACK TO BLUE.
        /* var canvas = document.getElementById("gameWorld");
        if (this.underground) {
            canvas.style.backgroundColor = "black";
        } else {
            canvas.style.backgroundColor = "#049cd8";
        } */
    };

    /* addCoin() {
        if (this.coins++ === 100) {
            this.coins = 0;
            this.lives++;
        }
    }; */

    draw(ctx) {
        ctx.font = '60px "Font"';
        ctx.fillStyle = "Blue";
        ctx.strokeStyle = "Blue";
        ctx.fillText("Assassin's Creed: Kingdoms", 440, 100);
        ctx.strokeRect(1340, 50, 320, 270);
        ctx.fillText(this.level.label, 1350, 100);
        ctx.font = '30px "Font"';
        ctx.fillText("WASD - MOVEMENT", 1350, 150);
        ctx.fillText("SHIFT - SPRINT", 1350, 190);
        ctx.fillText("L CLICK - ATTACK", 1350, 230);
        ctx.fillText("R CLICK - BLOCK", 1350, 270);
        ctx.fillText("F - SPECIAL", 1350, 310);

        // ctx.fillText((this.score + "").padStart(8,"0"), 1.5 * PARAMS.BLOCKWIDTH, 1.5 * PARAMS.BLOCKWIDTH);
        // ctx.fillText("x" + (this.coins < 10 ? "0" : "") + this.coins, 6.5 * PARAMS.BLOCKWIDTH, 1.5 * PARAMS.BLOCKWIDTH);
        // ctx.fillText("TIME", 12.5 * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);
        // ctx.fillText("400", 13 * PARAMS.BLOCKWIDTH, 1.5 * PARAMS.BLOCKWIDTH);

        if (this.title && !this.credits) {
            // Chris uses the Blockwidth and Scale
            ctx.drawImage(ASSET_MANAGER.getAsset("./background/title.jpg"), 0, 0);
            ctx.fillStyle = "Blue";
            ctx.fillText("\"NOTHING IS TRUE.", 900, 50);
            ctx.fillText(" EVERYTHING IS PERMITTED.\"", 900, 100);
            ctx.fillStyle = "Blue";
            ctx.fillText(" - HASSAN-I SABBĀH 1034 - 1124", 920, 150);
            ctx.fillStyle = "Black";
            ctx.fillRect(890, 220, 220, 40);
            ctx.fillStyle = this.game.mouse && this.game.mouse.x > 900 && this.game.mouse.x < 1100 && this.game.mouse.y > 230 && this.game.mouse.y < 260 ? "Blue" : "Red";
            ctx.fillText("START GAME", 900, 250);
            ctx.fillStyle = "Black";
            ctx.fillRect(890, 290, 160, 40);
            ctx.fillStyle = this.game.mouse && this.game.mouse.x > 900 && this.game.mouse.x < 1050 && this.game.mouse.y > 290 && this.game.mouse.y < 325 ? "Blue" : "Red";
            ctx.fillText("CREDITS", 900, 320);
        } else if (this.title && this.credits) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./background/credits.png"), 100, 114, 1672, 829, 0, 0, 1672, 829);
            ctx.fillStyle = "Black";
            ctx.fillRect(740, 370, 210, 40);
            ctx.fillStyle = this.game.mouse && this.game.mouse.x > 740 && this.game.mouse.x < 950 && this.game.mouse.y > 360 && this.game.mouse.y < 420 ? "Blue" : "Red";
            ctx.fillText("MAIN MENU", 750, 400);
        }

        

        // this.coinAnimation.drawFrame(this.game.clockTick, ctx, 6 * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH, 3);

        /*
        if (PARAMS.DEBUG) {
            let xV = "xV=" + Math.floor(this.game.mario.velocity.x);
            let yV = "yV=" + Math.floor(this.game.mario.velocity.y);
            ctx.fillText(xV, 1.5 * PARAMS.BLOCKWIDTH, 2.5 * PARAMS.BLOCKWIDTH);
            ctx.fillText(yV, 1.5 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH);

            ctx.translate(0, -10); // hack to move elements up by 10 pixels instead of adding -10 to all y coordinates below
            ctx.strokeStyle = "White";
            ctx.lineWidth = 2;
            ctx.strokeStyle = this.game.left ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(6 * PARAMS.BLOCKWIDTH - 2, 2.5 * PARAMS.BLOCKWIDTH - 2, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
            ctx.fillText("L", 6 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH);
            ctx.strokeStyle = this.game.down ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(6.5 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
            ctx.fillText("D", 6.5 * PARAMS.BLOCKWIDTH + 2, 3.5 * PARAMS.BLOCKWIDTH + 2);
            ctx.strokeStyle = this.game.up ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(6.5 * PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH - 4, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
            ctx.fillText("U", 6.5 * PARAMS.BLOCKWIDTH + 2, 2.5 * PARAMS.BLOCKWIDTH - 2);
            ctx.strokeStyle = this.game.right ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(7 * PARAMS.BLOCKWIDTH + 2, 2.5 * PARAMS.BLOCKWIDTH - 2, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
            ctx.fillText("R", 7 * PARAMS.BLOCKWIDTH + 4, 3 * PARAMS.BLOCKWIDTH);

            ctx.strokeStyle = this.game.A ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.beginPath();
            ctx.arc(8.25 * PARAMS.BLOCKWIDTH + 2, 2.75 * PARAMS.BLOCKWIDTH, 0.25 * PARAMS.BLOCKWIDTH + 4, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillText("A", 8 * PARAMS.BLOCKWIDTH + 4, 3 * PARAMS.BLOCKWIDTH);
            ctx.strokeStyle = this.game.B ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.beginPath();
            ctx.arc(9 * PARAMS.BLOCKWIDTH + 2, 2.75 * PARAMS.BLOCKWIDTH, 0.25 * PARAMS.BLOCKWIDTH + 4, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillText("B", 8.75 * PARAMS.BLOCKWIDTH + 4, 3 * PARAMS.BLOCKWIDTH); 
            */

            /*
            ctx.translate(0, 10);
            ctx.strokeStyle = "White";
            ctx.fillStyle = ctx.strokeStyle;

            this.minimap.draw(ctx); */
        // }
    }
}

/* class Minimap {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w });
    };

    update() {

    };

    draw(ctx) {
        ctx.strokeStyle = "Black";
        ctx.strokeRect(this.x, this.y, this.w, PARAMS.BLOCKWIDTH);
        for (var i = 0; i < this.game.entities.length; i++) {
            this.game.entities[i].drawMinimap(ctx, this.x, this.y);
        }
    };
}; */