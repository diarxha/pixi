const app = new PIXI.Application({ width: 800, height: 600 });
        document.body.appendChild(app.view);

        // Load the image and create a tiling sprite for the background
        PIXI.Loader.shared.add('road', '/img/road.png').load((loader, resources) => {
            const texture = resources.road.texture;
            const tilingSprite = new PIXI.TilingSprite(texture, app.screen.width, app.screen.height);
            
            app.stage.addChild(tilingSprite);

            // Animate the tiling sprite to simulate moving background
            app.ticker.add(() => {
                tilingSprite.tilePosition.y += 1;
            });
        });