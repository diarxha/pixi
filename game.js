// Create a Pixi Application
let app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
});
document.body.appendChild(app.view);

// Create a simple rectangle to verify Pixi.js setup
let graphics = new PIXI.Graphics();
graphics.beginFill(0xDE3249);
graphics.drawRect(50, 50, 100, 100);
graphics.endFill();
app.stage.addChild(graphics);

// Load the car image
PIXI.Loader.shared.add('car', 'car.png').load(setup);

function setup() {
    console.log("Setup function called");

    // Create the car sprite
    let car = new PIXI.Sprite(PIXI.Loader.shared.resources.car.texture);
    car.anchor.set(0.5);
    car.x = app.screen.width / 2;
    car.y = app.screen.height - 100;
    app.stage.addChild(car);

    // Add a ticker to move the car left and right with keyboard input
    let left = keyboard("ArrowLeft"),
        right = keyboard("ArrowRight");

    left.press = () => {
        car.x -= 10;
    };
    right.press = () => {
        car.x += 10;
    };

    app.ticker.add(() => {
        car.x = Math.max(car.width / 2, Math.min(app.view.width - car.width / 2, car.x));
    });
}

// Function to handle keyboard input
function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;

    key.downHandler = (event) => {
        if (event.key === key.value) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    key.upHandler = (event) => {
        if (event.key === key.value) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    window.addEventListener("keydown", key.downHandler.bind(key), false);
    window.addEventListener("keyup", key.upHandler.bind(key), false);

    return key;
}