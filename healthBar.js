class HealthBar {
    constructor(agent) {
        Object.assign(this, { agent });
    };

    update () {

    }

    // the health indicator consists of 4 rows of 5 bars
    draw(ctx) {
            let overallRatio = this.agent.hp / this.agent.maxhp; // ratio for deciding which health bar picture to use
            ctx.strokeStyle = "Black";
            ctx.lineWidth = 5;
            ctx.fillStyle = "White";

            let image;
            if (overallRatio < 0.2 ) {
                image = "low";
            } else if (overallRatio < 0.6) {
                image = "medium";
            } else {
                image = "max";
            }
            image = ASSET_MANAGER.getAsset("./health_bar_icons/" + image + "_health.png");

            console.log("overall ratio is " + overallRatio);

            ctx.strokeRect(35, 35, 70, 70);
            ctx.drawImage(image, 40, 40, 60, 60);
            ctx.strokeRect(105, 35, 205, 70);

            ctx.lineWidth = 1;

            let xCoords = [110, 150, 190, 230, 270];
            let yCoords = [43, 58, 73, 88];

            ctx.fillStyle = "Blue";

            let currentBar = 1;
            let partialFilled = false;

            let ratio = this.agent.hp % 20 / 20; // ratio for deciding how much of the one partial health bar to fill
            let fullBars = Math.floor(this.agent.hp / 20); // count of how many full bars to fill

            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 5; j++) {
                    if (currentBar <= this.agent.maxbars) {
                        if (currentBar <= fullBars) {
                            ctx.fillRect(xCoords[j % 5], yCoords[i % 4], 35, 10); // drawing the full health bars
                        }
                        else if (!partialFilled) {
                            ctx.fillRect(xCoords[j % 5], yCoords[i % 4], 35 * ratio, 10); // drawing the one partial health bar
                            partialFilled = true;
                        }
                    } else {
                        if (j == 0) {
                            ctx.strokeRect(xCoords[j % 5] + 5, yCoords[i % 4] + 5, 185, 1);
                        } 
                    }  
                    ctx.strokeRect(xCoords[j % 5], yCoords[i % 4], 35, 10);
                    currentBar++;
                }
            }

            ctx.lineWidth = 5;
    }
}