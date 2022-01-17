class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, reverse, loop, flipCanvas, pixelsArray) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration, reverse, loop, flipCanvas, pixelsArray});

        this.elapsedTime = 0;
        this.totalTime = frameCount * frameDuration;
    };

    drawFrame(tick, ctx, x, y) {
        this.elapsedTime += tick;

        // if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;

        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else if (!this.flipCanvas && this.pixelsArray == undefined) {
                // draws the last frame to prevent flashing after an attack
                ctx.drawImage(this.spritesheet,
                    this.xStart + this.width * this.lastFrame(), this.yStart,     // sX, sY
                    this.width, this.height,     // sW, sH
                    x, y,       // dX, dY
                    this.width * 3, this.height * 3);
                return;
            } else if (!this.flipCanvas && this.pixelsArray) {
                ctx.drawImage(this.spritesheet,
                    this.pixelsArray[this.lastFrame() * 2], this.yStart,     // sX, sY
                    this.pixelsArray[this.lastFrame() * 2 + 1] -  this.pixelsArray[this.lastFrame() * 2], this.height,     // sW, sH
                    x, y,       // dX, dY
                    (this.pixelsArray[this.lastFrame() * 2 + 1] -  this.pixelsArray[this.lastFrame() * 2]) * 3, this.height * 3);  
                return;
                    
            } else if (this.flipCanvas && this.pixelsArray == undefined) {
                // draws the last frame to prevent flashing after an attack
                ctx.save();
                ctx.scale(-1, 1);
                // ctx.translate(-x - this.width * 3, 0);
                ctx.drawImage(this.spritesheet,
                    this.xStart + this.width * this.lastFrame(), this.yStart,     // sX, sY
                    this.width, this.height,     // sW, sH
                    -x, y,       // dX, dY
                    this.width * 3, this.height * 3);
                ctx.restore();
                return;
            } else if (this.flipCanvas && this.pixelsArray) {
                ctx.save();
                ctx.scale(-1, 1);
                // ctx.translate(-x - (this.pixelsArray[this.lastFrame() * 2 + 1] -  this.pixelsArray[this.lastFrame() * 2]) * 3, 0);
                ctx.drawImage(this.spritesheet,
                    this.pixelsArray[this.lastFrame() * 2], this.yStart,     // sX, sY
                    this.pixelsArray[this.lastFrame() * 2 + 1] -  this.pixelsArray[this.lastFrame() * 2] , this.height,     // sW, sH
                    -x, y,       // dX, dY
                    (this.pixelsArray[this.lastFrame() * 2 + 1] -  this.pixelsArray[this.lastFrame() * 2]) * 3, this.height * 3);  
                ctx.restore();
                return;
            } 
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;

        if (!this.flipCanvas && this.pixelsArray == undefined) {
            ctx.drawImage(this.spritesheet,
                this.xStart + this.width * frame, this.yStart,     // sX, sY
                this.width, this.height,     // sW, sH
                x, y,       // dX, dY
                this.width * 3, this.height * 3);    // dW, dH
        }
        else if (!this.flipCanvas && this.pixelsArray) {
            ctx.drawImage(this.spritesheet,
                this.pixelsArray[frame * 2], this.yStart,     // sX, sY
                this.pixelsArray[frame * 2 + 1] -  this.pixelsArray[frame * 2], this.height,     // sW, sH
                x, y,       // dX, dY
                (this.pixelsArray[frame * 2 + 1] -  this.pixelsArray[frame * 2]) * 3, this.height * 3);    // dW, dH
        } else if (this.flipCanvas && this.pixelsArray == undefined) {
            // draws the last frame to prevent flashing after an attack
            ctx.save();
            ctx.scale(-1, 1);
            // ctx.translate(-x - this.width * 3, 0);
            ctx.drawImage(this.spritesheet,
                this.xStart + this.width * frame, this.yStart,     // sX, sY
                this.width, this.height,     // sW, sH
                -x, y,       // dX, dY
                this.width * 3, this.height * 3);
            ctx.restore();
            return;
        } else if (this.flipCanvas && this.pixelsArray) {
            ctx.save();
            ctx.scale(-1, 1);
            // ctx.translate(-x - (this.pixelsArray[frame * 2 + 1] -  this.pixelsArray[frame * 2]) * 3, y);
            ctx.drawImage(this.spritesheet,
                this.pixelsArray[frame * 2], this.yStart,     // sX, sY
                this.pixelsArray[frame * 2 + 1] -  this.pixelsArray[frame * 2] , this.height,     // sW, sH
                -x, y,       // dX, dY
                (this.pixelsArray[frame * 2 + 1] -  this.pixelsArray[frame * 2]) * 3, this.height * 3);  
            ctx.restore();
            return;
        } 
    };

    lastFrame() {
        return this.frameCount - 1;
    }

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};