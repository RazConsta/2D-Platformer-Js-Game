class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, pixelsArray) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration, pixelsArray});

        this.elapsedTime = 0;
        this.totalTime = frameCount * frameDuration;
    };

    drawFrame(tick, ctx, x, y) {

        this.elapsedTime += tick;
        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        const frame = this.currentFrame();

        /* ctx.drawImage(this.spritesheet,
            this.xStart + this.width * frame, this.yStart,     // sX, sY
            this.width, this.height,     // sW, sH
            x, y,       // dX, dY
            this.width * 3, this.height * 3);    // dW, dH */

        if (this.pixelsArray.length === 0) {
            ctx.drawImage(this.spritesheet,
                this.xStart + this.width * frame, this.yStart,     // sX, sY
                this.width, this.height,     // sW, sH
                x, y,       // dX, dY
                this.width * 3, this.height * 3);    // dW, dH
        }
        else {
            ctx.drawImage(this.spritesheet,
                this.pixelsArray[frame * 2], this.yStart,     // sX, sY
                this.pixelsArray[frame * 2 + 1] -  this.pixelsArray[frame * 2], this.height,     // sW, sH
                x, y,       // dX, dY
                (this.pixelsArray[frame * 2 + 1] -  this.pixelsArray[frame * 2]) * 3, this.height * 3);    // dW, dH
        } 
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
}