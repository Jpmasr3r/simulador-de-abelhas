const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.imageSmoothingEnabled = false;

const beeImg = new Image();
const queenImg = new Image();

beeImg.src = 'assets/bee.png';
queenImg.src = 'assets/queen.png';

const abelhas = [];

function spawnAbelhas() {
    for (let i = 0; i < 10; i++) {
        abelhas.push({
            tipo: 'operaria',
            x: Math.random() * (canvas.width - 32),
            y: Math.random() * (canvas.height - 32),
            img: beeImg
        });
    }

    abelhas.push({
        tipo: 'rainha',
        x: Math.random() * (canvas.width - 32),
        y: Math.random() * (canvas.height - 32),
        img: queenImg
    });
}

function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const abelha of abelhas) {
        ctx.drawImage(abelha.img, Math.floor(abelha.x), Math.floor(abelha.y), 32, 32);
    }

    requestAnimationFrame(desenhar);
}

beeImg.onload = () => {
    queenImg.onload = () => {
        spawnAbelhas();
        desenhar();
    };
};
