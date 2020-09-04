let superHero, bg_01, cat, bg_02, bg_03;

function startGame() {
    superHero = new component(30, 50, "img/hero-idle.gif", 10, 230, "image");
    bg_01 = new component(700, 300, "img/bg-3.png", 0, 0, "background");
    bg_02 = new component(700, 300, "img/bg-2.png", 0, 0, "background");
    bg_03 = new component(700, 300, "img/bg-4.png", 0, 0, "background");
    cat = new component(30, 30, "img/bird.png", 650, 230, "image");
    myGameArea.start();
}

let myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 700;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = move();
        })
        window.addEventListener("keypress", function () {

        })
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

function component(width, height, img, x, y, type) {
    this.type = type;
    if (type === "image" || type === "background") {
        this.image = new Image();
        this.image.src = img;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        if (type === "image" || type === "background") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
            if (type === "background") {
                ctx.drawImage(this.image,
                    this.x + this.width,
                    this.y,
                    this.width, this.height);
            }
        } else {
            ctx.fillStyle = img;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.type === "background") {
            if (this.x === -(this.width)) {
                this.x = 0;
                this.y = 0;
            }
        }
    }
}

function updateGameArea() {
    myGameArea.clear();
    bg_01.speedX = -4;
    bg_01.newPos();
    bg_01.update();


    bg_02.speedX = -4;
    bg_02.newPos();
    bg_02.update();

    bg_03.speedX = 0;
    bg_03.newPos();
    bg_03.update();

    cat.update();
    cat.newPos();

    superHero.newPos();
    superHero.update();


    ClearMove();
}

function move() {
    superHero.speedX = 0;
    superHero.image.src = "img/run.gif";
}

function ClearMove(e) {
    if (myGameArea.key && myGameArea.key === 39) {
        superHero.speedX = 1;
        superHero.image.src = "img/jump.png";
    }
    if (myGameArea.key && myGameArea.key === 37) {
        superHero.speedX = -1;
    }
}

