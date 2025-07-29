const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.imageSmoothingEnabled = false;

const beeImg = new Image();
const queenImg = new Image();

beeImg.src = 'assets/bee.png';
queenImg.src = 'assets/queen.png';

const abelhas = [];
let queen;
let queenWay = [];

function spawnAbelhas() {
    for (let i = 0; i < 10; i++) {
        abelhas.push({
            tipo: 'operaria',
            x: Math.random() * (canvas.width - 32),
            y: Math.random() * (canvas.height - 32),
            img: beeImg
        });
    }

    for (i = 0; i <= 4; i++) {
        let way = {
            x: Math.random() * (canvas.width - 64),
            y: Math.random() * (canvas.height - 64),
        }
        queenWay.push(way);
    }

    queen = {
        tipo: 'rainha',
        x: Math.random() * (canvas.width - 64),
        y: Math.random() * (canvas.height - 64),
        img: queenImg
    }
}

function desenhar() {
    for (const abelha of abelhas) {
        switch (abelha.tipo) {
            case "operaria":
                ctx.drawImage(abelha.img, Math.floor(abelha.x), Math.floor(abelha.y), 32, 32);
                break;

            default:
                break;
        }
    }

    ctx.drawImage(queen.img, Math.floor(queen.x), Math.floor(queen.y), 64, 64);
}

function move() {
    const spd = 1;
    queenWay.forEach(way => {
        queen.x += spd * Math.sign(way.x);
        queen.y += spd * Math.sign(way.y);
    });
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenhar();
    move();
    requestAnimationFrame(loop);
};

beeImg.onload = () => {
    queenImg.onload = () => {
        spawnAbelhas();
        loop();
    };
};
