const ASSET_MANAGER = new AssetManager();

// backgrounds and title image
ASSET_MANAGER.queueDownload("./background/l1background.jpg");
ASSET_MANAGER.queueDownload("./background/l2background.jpg");
ASSET_MANAGER.queueDownload("./background/l3background.jpg");
ASSET_MANAGER.queueDownload("./background/l4background.jpg");
ASSET_MANAGER.queueDownload("./background/l5background.jpg");
ASSET_MANAGER.queueDownload("./background/title.jpg");
ASSET_MANAGER.queueDownload("./background/credits.png");

// health bar icons
ASSET_MANAGER.queueDownload("./health_bar_icons/max_health.png");
ASSET_MANAGER.queueDownload("./health_bar_icons/medium_health.png");
ASSET_MANAGER.queueDownload("./health_bar_icons/low_health.png");

// sprites
ASSET_MANAGER.queueDownload("./sprites/stone.png");
ASSET_MANAGER.queueDownload("./sprites/altair_sprites.png");
ASSET_MANAGER.queueDownload("./sprites/altair_sprites_left.png");
ASSET_MANAGER.queueDownload("./sprites/prince_sprites.png");

// music
ASSET_MANAGER.queueDownload("./music/07masyaf.mp3");

ASSET_MANAGER.downloadAll(() => {
	const gameEngine = new GameEngine();

	// ASSET_MANAGER.autoRepeat("./music/07masyaf.mp3");

	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;
	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	gameEngine.init(ctx);

	// gameEngine.addEntity(new Altair(gameEngine)); // if not using sceneManager

	new SceneManager(gameEngine);

	gameEngine.start();
}); 
