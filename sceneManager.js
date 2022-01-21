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
        console.log("sceneManager: constructed");
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    // Chris also has x, y and transition
    loadLevel(level, title, transition) {
        this.level = level;
        this.title = title;
        this.transition = transition;

        this.levelCount = level.count; // an integer 1 - 5
        this.levelLabel = level.label; // labels from "Level 1/5" to "Level 5/5"
        this.levelName = level.name; // Level names: "Sabykh's Castle" up to "Prince's Lair"
        this.levelLimit = level.limit; // pixel limit to the right of the level
        this.levelStory = level.story; // text of the story of that specific level
    
        this.clearEntities();
        this.x = 0;
        // this.underground = level.underground;
        
        
        if (!title) {
            if (level.background) {
                this.game.addEntity(new Background(this.game, level.background));
            }
            if (level.stones) {
                for (var i = 0; i < level.stones.length; i++) {
                    let stone = level.stones[i];
                    this.game.addEntity(new Stone(this.game, stone.x, stone.y));
            }
        }

           
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

        // If title screen
        if (this.title && this.game.lclick) {
            // Title Screen -> Start Game (with transition)
            if (!this.credits && this.game.mouse.x > 800 && this.game.mouse.x < 1020 && this.game.mouse.y > 170 && this.game.mouse.y < 210) {
                this.title = false;
                this.altair = new Altair(this.game, 10, 530);
                this.loadLevel(levelOne, false, true);
            }
            // Title Screen -> Credits
            if (!this.credits && this.game.mouse.x > 800 && this.game.mouse.x < 960 && this.game.mouse.y > 220 && this.game.mouse.y < 260) {
                this.loadLevel(levelOne, true, false);
                this.credits = true;
            }
            // Credits -> Title Screen
            if (this.credits && this.game.mouse.x > 740 && this.game.mouse.x < 950 && this.game.mouse.y > 360 && this.game.mouse.y < 420) {
                this.credits = false;
                this.loadLevel(levelOne, true, false);
            }
        } 
        
        
        if (this.title == false && this.transition == false && this.credits == false) {
            if (this.game.digitOne) {
                this.altair = new Altair(this.game, 10, 530);
                this.loadLevel(levelOne, false, true);
            } else if (this.game.digitTwo) {
                this.altair = new Altair(this.game, 350, 448);
                this.loadLevel(levelTwo, false, true);
            } else if (this.game.digitThree) {
                this.altair = new Altair(this.game, 10, 530);
                this.loadLevel(levelThree, false, true);
            } else if (this.game.digitFour) {
                this.altair = new Altair(this.game, 10, 530);
                this.loadLevel(levelFour, false, true);
            } else if (this.game.digitFive) {
                this.altair = new Altair(this.game, 50, 450);
                this.loadLevel(levelFive, false, true);
            }
        }

        if (this.transition && this.game.lclick) {
            if (this.game.mouse.x > 50 && this.game.mouse.x < 250 && this.game.mouse.y > 720 && this.game.mouse.y < 760) {
                this.transition = false;
                this.title = false;
                this.altair = new Altair(this.game, this.level.altairCoords[0], this.level.altairCoords[1]);
                this.loadLevel(this.level, false, false);
            }
        }

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

        let twenty = PARAMS.CANVAS_WIDTH * 0.2;
        let sixtyFive = PARAMS.CANVAS_WIDTH * 0.65;

        if ((this.levelCount == 1 || this.levelCount == 3 || this.levelLabel == "Level 4/4") 
            && this.x <= this.altair.x - sixtyFive) {
            this.x = this.altair.x - sixtyFive; // side scroll to right
            /* if (this.altair.initial_facing == "right" && this.altair.facing == "left") {
                this.x -= 70;
                // this.altair.x -= 70;
            } */
        }
        else if ((this.levelCount == 1 || this.levelCount == 3 || this.levelCount == 4) 
                  && this.x > this.altair.x - twenty && this.altair.x > 335) this.x = this.altair.x - twenty; // side scroll to left if on level 1, 3, 4


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
        if (this.levelCount == 2) {
            ctx.fillStyle = "Red";
            ctx.strokeStyle = "Red";
        } else if (this.levelLabel == "Level 5/5") {
            ctx.fillStyle = "Yellow";
            ctx.strokeStyle = "Yellow";
        } else if (this.levelCount == 3) {
            ctx.fillStyle = "#5c4702";
            ctx.strokeStyle = "#5c4702";
        } 
        if (!this.transition) {
            ctx.fillText("Assassin's Creed: Kingdoms", 440, 100);
            ctx.strokeRect(1340, 5, 325, 65);
            ctx.font = '34px "Font"';
            ctx.fillText(this.levelLabel, 1350, 35);
            ctx.fillText(this.levelName, 1460, 65);

            ctx.font = '30px "Font"';
            if (this.levelCount == 1) { // showing controls for level 1
                ctx.strokeRect(1340, 70, 325, 200);
                ctx.fillText("WASD - MOVEMENT", 1350, 100);
                ctx.fillText("SHIFT - SPRINT", 1350, 140);
                ctx.fillText("L CLICK - ATTACK", 1350, 180);
                ctx.fillText("R CLICK - BLOCK", 1350, 220);
                ctx.fillText("F - SPECIAL", 1350, 260);
            }
        }

        

        if (this.title && !this.credits && !this.transition) {
            // Chris uses the Blockwidth and Scale
            ctx.drawImage(ASSET_MANAGER.getAsset("./background/title.jpg"), 0, 0, 1672, 829);
            ctx.fillStyle = "Blue";
            ctx.fillText("\"NOTHING IS TRUE.", 800, 50);
            ctx.fillText(" EVERYTHING IS PERMITTED.\"", 800, 100);
            ctx.fillStyle = "Blue";
            ctx.fillText(" - HASSAN-I SABBĀH 1034 - 1124", 820, 150);
            ctx.fillStyle = "Black";
            ctx.fillRect(800, 170, 220, 40); // left 90 up 50
            ctx.fillStyle = this.game.mouse && this.game.mouse.x > 800 && this.game.mouse.x < 1020 && this.game.mouse.y > 170 && this.game.mouse.y < 210 ? "Red" : "White";
            ctx.fillText("START GAME", 810, 200);
            ctx.fillStyle = "Black";
            ctx.fillRect(800, 220, 160, 40);
            ctx.fillStyle = this.game.mouse && this.game.mouse.x > 800 && this.game.mouse.x < 960 && this.game.mouse.y > 220 && this.game.mouse.y < 260 ? "Red" : "White";
            ctx.fillText("CREDITS", 810, 250);
        } else if (this.title && this.credits && !this.transition) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./background/credits.png"), 100, 114, 1672, 829, 0, 0, 1672, 829);
            ctx.fillStyle = "Black";
            ctx.fillRect(740, 370, 210, 40);
            ctx.fillStyle = this.game.mouse && this.game.mouse.x > 740 && this.game.mouse.x < 950 && this.game.mouse.y > 360 && this.game.mouse.y < 420 ? "Red" : "White";
            ctx.fillText("MAIN MENU", 750, 400);
        }

        if (this.transition && !this.title && !this.credits) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./background/transition.jpg"), 0, 0);
            ctx.fillStyle = "Black";
            ctx.font = '30px "Font"';
            
            for (let i = 0; i < this.levelStory.length; i++) {
                ctx.fillText(this.levelStory[i], 60, 320 + i * 40);
            }

            ctx.fillRect(50, 720, 200, 40);
            ctx.fillStyle = this.game.mouse && this.game.mouse.x > 50 && this.game.mouse.x < 250 && this.game.mouse.y > 720 && this.game.mouse.y < 760 ? "Red" : "White";
            ctx.fillText("CONTINUE", 60, 750);
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