// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor() {
        this.entities = [];
        this.ctx = null;

       // Directional movement
       this.W = false;
       this.A = false;
       this.S = false;
       this.D = false;
       
       // Sprint
       this.shift = false;
       // Attack
       this.lclick = false;
       // Block 
       this.rclick = false;

       // Special
       // this.F = false;
       // Throwable
       // this.G = false;

        // THE KILL SWITCH
        this.running = false;

        // Options and the Details
        /* this.options = options || {
            prevent: {
                contextMenu: true,
                scrolling: true,
            },
            debugging: false,
        }; */
    };

    init(ctx) {
        this.ctx = ctx;
        // this.surfaceWidth = this.ctx.canvas.width;
        // this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            if (this.running) {
                requestAnimFrame(gameLoop, this.ctx.canvas);
            }
        };
        gameLoop();
    };

    startInput() {
        var that = this;

        var getXandY = function (e) {
            var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
            var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

            return { x: x, y: y, radius: 0 };
        }

        this.ctx.canvas.addEventListener("mousemove", function (e) {
            that.mouse = getXandY(e);
        }, false);

        this.ctx.canvas.addEventListener("mousedown", function (e) {
            this.click = getXandY(e);
            if (e.button == 0) {
                console.log("Pressed left click")
                that.lclick = true;
            }
        }, false);
        
        this.ctx.canvas.addEventListener("mouseup", function (e) {
            this.click = getXandY(e);
            if (e.button == 0) {
                console.log("Pressed left click")
                that.lclick = false;
            }
        }, false); 

        this.ctx.canvas.addEventListener("contextmenu", e => {
            /* if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            } */
            // if (this.options.prevent.contextMenu) {
                e.preventDefault(); // Prevent Context Menu
            // }
            that.rightclick = getXandY(e);
            that.rclick = true;
            console.log("Pressed right click");
        }); 

        this.ctx.canvas.addEventListener("keydown", function (e) {
            switch (e.code) {
                case "KeyW":
                case "Space":
                    that.W = true;
                    break;
                case "KeyA":
                    that.A = true;
                    break;
                case "KeyS":
                case "KeyC":
                case "ControlLeft":
                    that.S = true;
                    break;
                case "KeyD":
                    that.D = true;
                    break;
                case "ShiftLeft":
                    that.shift = true;
                    break; 
            }
        }, false);

        this.ctx.canvas.addEventListener("keyup", function (e) {
            switch (e.code) {
                case "KeyW":
                case "Space":
                    that.W = false;
                    break;
                case "KeyA":
                    that.A = false;
                    break;
                case "KeyS":
                case "KeyC":
                case "ControlLeft":
                    that.S = false;
                    break;
                case "KeyD":
                    that.D = false;
                    break;
                case "ShiftLeft":
                    that.shift = false;
                    break; 
            }
        }, false);
    };

    isIdle() {
        return this.W == false && this.A == false && this.S == false && this.D == false && this.shift == false && this.lclick == false && this.rclick == false;
    }

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }
    };

    update() {
        let entitiesCount = this.entities.length;

        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

};

// KV Le was here :)