class HealthBar {
    constructor(agent) {
        Object.assign(this, { agent });

        this.agent = agent;
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

            if (this.agent.name == "Altair") {
                image = ASSET_MANAGER.getAsset("./health_bar_icons/" + image + "_health.png");
            } else if (this.agent.name == "Prince") {
                image = ASSET_MANAGER.getAsset("./health_bar_icons/prince_health.png");
            }

            let sword = ASSET_MANAGER.getAsset("./sprites/sword.png");
            let crossbow = ASSET_MANAGER.getAsset("./sprites/crossbow.png");
            let wheel = ASSET_MANAGER.getAsset("./sprites/wheel.png");
            

            if (this.agent.name == "Altair") 
            {
                ctx.strokeRect(35, 35, 70, 70);
                ctx.drawImage(image, 40, 40, 60, 60);
                ctx.strokeRect(105, 35, 205, 70);

                ctx.lineWidth = 1;

                let xCoords = [110, 150, 190, 230, 270];
                let yCoords = [43, 58, 73, 88];

                ctx.fillStyle = "Blue";

                if (this.agent.game.camera.levelCount == 2) {
                    ctx.fillStyle = "Red";
                } else if (this.agent.game.camera.levelLabel == "Level 5/5") {
                    ctx.fillStyle = "Yellow";
                    ctx.strokeStyle = "Yellow";
                } else if (this.agent.game.camera.levelCount == 3) {
                    ctx.fillStyle = "#5c4702";
                    ctx.strokeStyle = "#5c4702";
                }

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

                ctx.drawImage(wheel, 3, 120, 40, 60);
               if (this.agent.weapon == "sword") 
               {
                    ctx.drawImage(sword, 40, 120, 60, 60);
               } 
               else 
               {
                   ctx.fillStyle = "Black";
                   ctx.drawImage(crossbow, 40, 120, 60, 60);
                   ctx.fillText(this.agent.arrows, 100, 155);
               }

                
            } else if (this.agent.name == "soldier") {
                if (this.agent.hp > 0 && this.agent.hp < 100) {
                    let ratio = this.agent.hp / 100;
                    ctx.strokeStyle = "Black";
                    ctx.lineWidth = 2;
                    ctx.fillStyle = ratio < 0.2 ? "Red" : ratio < 0.6 ? "Yellow" : "Green";

                    let offset;
                    if (this.agent.facing == "right") {
                        offset = 0;
                    } else {
                        offset = 120;
                    }
                    ctx.fillRect(this.agent.x + 10 - offset - this.agent.game.camera.x, this.agent.y - 20, 100 * ratio, 15);
                    ctx.strokeRect(this.agent.x + 10 - offset - this.agent.game.camera.x, this.agent.y - 20, 100, 15);
                } 
            }

            ctx.lineWidth = 5;
    }
}