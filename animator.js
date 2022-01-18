class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, reverse, loop, flipCanvas, pixelsArray) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration, reverse, loop, flipCanvas, pixelsArray});

        this.elapsedTime = 0;
        this.totalTime = frameCount * frameDuration;
    };

    drawFrame(tick, ctx, x, y) {
        this.elapsedTime += tick;

        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                return;
            }
        } 

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;

        let s = {x: 0, y: this.yStart,   w: 0, h: this.height};
        let d = {x: 0, y: y,             w: 0, h: this.height * PARAMS.SCALE};
        
        if (this.flipCanvas) {
            ctx.save();
            ctx.scale(-1, 1);
            d.x = -x;
        } else {
            d.x = x;
        }

        if (this.pixelsArray != undefined) {
            s.x = this.pixelsArray[frame * 2];
            s.w = this.pixelsArray[frame * 2 + 1] -  this.pixelsArray[frame * 2];
            d.w = (this.pixelsArray[frame * 2 + 1] -  this.pixelsArray[frame * 2]) * PARAMS.SCALE;
        } else {
            s.x = this.xStart + this.width * frame;
            s.w = this.width;
            d.w = this.width * PARAMS.SCALE;
        }

        ctx.drawImage(this.spritesheet, s.x, s.y, s.w, s.h, d.x, d.y, d.w, d.h);
        ctx.restore();
        
    };

    lastFrame() {
        return this.frameCount - 1;
    }

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    /*
    isAlmostDone(tick) {
        return (this.elapsedTime + tick) >= this.totalTime; 
    }
    */

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};