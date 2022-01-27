/* class Bullet {
	constructor(game, x, y, size, xTarget, yTarget, bulletSpeed, type) {
		Object.assign(this, {game, x, y, size, xTarget, yTarget, bulletSpeed, type});

		this.image = ASSET_MANAGER.getAsset("./sprites/bullet.png");
		this.distance = Math.floor(getDistance(this.xTarget, this.yTarget, this.x, this.y));
		this.xBulletDir = (this.xTarget - this.x) / this.distance;
		this.yBulletDir = (this.yTarget - this.y) / this.distance;
		this.maxSpeed = 150;

		this.x = x;
		this.y = y;
		this.xTarget = xTarget;
		this.yTarget = yTarget;

		// this.target = {x: xTarget, y: yTarget};

		var dist = getDistance(this, this.target);

		this.velocity = { x: (this.xTarget - this.x) / dist * this.maxSpeed, y: (this.yTarget - this.y) / dist * this.maxSpeed };
		this.updateBB();

		this.cache = [];
	}

	updateBB() {
		this.BB = new BoundingBox(this.x, this.y, this.size, this.size);
	}


	checkWallCollision() {
		let count = 0;

		this.game.entities.forEach((entity) => {
			if ((entity instanceof Tower) && (entity.BB.collide(this.BB))) {
				count++;
			}
		});

		return (count >= 1);
	}

	destroy() {
		this.removeFromWorld = true;
	}

	update() {
		//destroys bullet if hits a wall
		if (this.checkWallCollision()) {
			this.destroy();
		} else {
			this.x += this.bulletSpeed * this.xBulletDir;
			this.y += this.bulletSpeed * this.yBulletDir;
		}

		//destroys bullet if out of map
		if (this.x < 0 || this.x > PARAMS.CANVAS_WIDTH) {
			this.destroy();
		}
		if (this.y < 0 || this.y > PARAMS.CANVAS_HEIGHT) {
			this.destroy();
		}

		this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;

		//damage to enemy
		this.game.entities.forEach((entity) => {
			if (entity instanceof Soldier && (entity.BB != null) && entity.BB.collide(this.BB) && (this.type === "player")) {
				this.destroy();
				entity.hp -= 34;
			}
		});

		//damage to player
		if (this.game.altair.BB.collide(this.BB) && (this.type == "enemy")) {
			this.destroy();
			this.game.altair.hp -= 20;
		}

		this.updateBB();
	}

	draw(ctx) {
		let angle = Math.atan2(this.velocity.y, this.velocity.x);
		if (angle < 0) angle += Math.PI / 2;
		let degrees = Math.floor(angle / Math.PI / 2 * 360);
		this.drawAngle(ctx, degrees);

		// ctx.drawImage(this.image, this.x, this.y, this.size * 2, this.size * 2)
		if (PARAMS.DEBUG) {
			ctx.strokeStyle = 'Blue';
			ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
		}
	}

	
	drawAngle(ctx, angle) {
		if (angle < 0 || angle > 359) return;

		if (!this.cache[angle]) {
			let radians = angle / 360 * 2 * Math.PI;
			let offscreenCanvas = document.createElement('canvas');

			offscreenCanvas.width = 32;
			offscreenCanvas.height = 32;

			let offscreenCtx = offscreenCanvas.getContext('2d');

			offscreenCtx.save();
			offscreenCtx.translate(16, 16);
			offscreenCtx.rotate(radians);
			offscreenCtx.translate(-16, -16);
			offscreenCtx.drawImage(this.image, 80, 0, 32, 32, 0, 0, 32, 32);
			offscreenCtx.restore();
			this.cache[angle] = offscreenCanvas;
		}

		var xOffset = 0;
		var yOffset = 0;

		ctx.drawImage(this.cache[angle], this.x - xOffset, this.y - yOffset, 300, 300);
	}
} */

class Arrow {
    constructor(game, x, y, target, playerTeam) {
        Object.assign(this, { game, x, y, target, playerTeam});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/arrow2.png");

        var dist = distance(this, this.target);
        this.maxSpeed = 800; // pixels per second

        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
        this.cache = [];
        this.elapsedTime = 0;
		this.updateBB();
    };

	updateBB() {
		this.lastBB = this.BB;
		let size = 40;
		let xOffset = 0; 
		this.BB = new BoundingBox(this.x + xOffset, this.y, size, size);
	}

	checkWallCollision() {
		let count = 0;

		this.game.entities.forEach((entity) => {
			if ((entity instanceof Tower || entity instanceof Stone) && (entity.BB.collide(this.BB))) {
				count++;
			}
		});

		return (count >= 1);
	}

	destroy() {
		this.removeFromWorld = true;
	}

    update() {
		if (this.checkWallCollision()) this.destroy();
		else {
			this.x += this.velocity.x * this.game.clockTick;
			this.y += this.velocity.y * this.game.clockTick;
		}
        
		//destroys arrow if out of map
		if (this.x < 0 || this.x > PARAMS.CANVAS_WIDTH) {
			this.destroy();
		}
		if (this.y < 0 || this.y > PARAMS.CANVAS_HEIGHT) {
			this.destroy();
		}

        for (var i = 0; i < this.game.entities.length; i++) {
            var entity = this.game.entities[i];
            if (this.playerTeam && (entity instanceof Soldier) && (entity.BB != null) && entity.BB.collide(this.BB)) {
                var damage = 34;
                entity.hp -= damage;
                this.removeFromWorld = true;
            }
            
			/* if (!this.playerTeam && ent instanceof Tower && collide(this, ent)) {
                var damage = 20;
                ent.hitpoints -= damage;
                this.removeFromWorld = true;
            } */
        }
		this.updateBB();
    };

    draw(ctx) {
        let angle = Math.atan2(this.velocity.y , this.velocity.x);
        if (angle < 0) angle += Math.PI * 2;
        let degrees = Math.floor(angle / Math.PI / 2 * 360);
		console.log("degrees", degrees);
		this.drawAngle(ctx, degrees);
    };

	drawAngle(ctx, angle) {
        if (angle < 0 || angle > 359) return;

        if (!this.cache[angle]) {
           	let radians = angle / 360 * 2 * Math.PI;
           	let offscreenCanvas = document.createElement('canvas');

			offscreenCanvas.width = 100;
			offscreenCanvas.height = 100;

			let offscreenCtx = offscreenCanvas.getContext('2d');
			offscreenCtx.save();
			offscreenCtx.translate(16, 16);
			offscreenCtx.rotate(radians);
			offscreenCtx.translate(-16, -16);
			offscreenCtx.drawImage(this.spritesheet, 80, 0, 32, 32, 0, 0, 32, 32);
			offscreenCtx.restore();

			this.cache[angle] = offscreenCanvas;
        }
        var xOffset = 0; // 210;
        var yOffset = 0; // -30;
        ctx.drawImage(this.cache[angle], this.x + xOffset, this.y + yOffset, 200, 200);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Green';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};
