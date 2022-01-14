const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./background/l1background.jpg");
ASSET_MANAGER.queueDownload("./sprites/stone.png");
ASSET_MANAGER.queueDownload("./sprites/altair_sprites.png");
ASSET_MANAGER.queueDownload("./sprites/altair_sprites_left.png");
ASSET_MANAGER.queueDownload("./sprites/prince_sprites.png");
ASSET_MANAGER.queueDownload("./music/07masyaf.mp3");

ASSET_MANAGER.downloadAll(() => {
	const gameEngine = new GameEngine();

	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;
	ctx.imageSmoothingEnabled = false;

	ASSET_MANAGER.autoRepeat("./music/07masyaf.mp3");

	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	gameEngine.init(ctx);

	gameEngine.addEntity(new Altair(gameEngine)); // if not using sceneManager

	// new SceneManager(gameEngine);
	gameEngine.start();
}); 
