class Raquete {
    // crie uma jogador branca que mova com o mouse e se limite ao tamanho da tela

    // adicionar mais 10 de X caso seja o inimigo

    constructor(x) {

        this.x = x;
        this.y = height / 2;
        this.width = 10;
        this.height = 100;
    }



    update() {

        // se a raquete é o jogador
        if (this.x > width / 2) {   
            this.y = mouseY - this.height / 2;
        }


        // se a raquete é o inimigo
        if (this.x < width / 2) {
            if (ball.y < this.y) {
                this.y -= 10;
            } else {
                this.y += 10;
            }
        }


        // limite superior
        if (this.y <= 0) {
            this.y = 0;
        }

        // limite inferior
        if (this.y + this.height >= height) {
            this.y = height - this.height;
        }
    }

    draw() {
        fill(255);
        rect(this.x, this.y, this.width, this.height);
    }

}

class Ball {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.radius = 50;
        this.vx = Math.random() < 0.5 ? -Math.random() * 10 : Math.random() * 10;
        this.vy = Math.random() < 0.5 ? -Math.random() * 10 : Math.random() * 10;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x >= width || this.x <= 0) {
            this.reset();
        }

        if (this.y >= height || this.y <= 0) {
            this.vy = -this.vy;
        }

        // colisão com a jogador e o inimigo, considerando o raio da bola
        let colisaoX = this.x - this.radius / 2 <= jogador.x + jogador.width && this.y >= jogador.y && this.y <= jogador.y + jogador.height;
        if (colisaoX) {
            this.vx = -this.vx;
        }
        let colisaoY = this.y - this.radius / 2 <= inimigo.y + inimigo.height && this.x >= inimigo.x && this.x <= inimigo.x + inimigo.width;
        if (colisaoY) {
            this.vx = -this.vx;
        }

        // se colidir na raquete, aumente a velocidade
        let colisaoJogador = this.x - this.radius / 2 <= jogador.x + jogador.width && this.y >= jogador.y && this.y <= jogador.y + jogador.height;
        let colisaoInimigo = this.y - this.radius / 2 <= inimigo.y + inimigo.height && this.x >= inimigo.x && this.x <= inimigo.x + inimigo.width;
        if (colisaoInimigo || colisaoJogador) {
            this.vx = this.vx * 1.2;
            this.vy = this.vy * 1.2;
        }
    }

    draw() {
        background(0);
        fill(200, 0, 0);
        ellipse(this.x, this.y, this.radius, this.radius);
    }



    reset() {
        this.x = width / 2;
        this.y = height / 2;
        this.vx = Math.random() < 0.5 ? -Math.random() * 10 : Math.random() * 10;
        this.vy = Math.random() < 0.5 ? -Math.random() * 10 : Math.random() * 10;
    }
}


let ball;
let jogador;
let inimigo;

function setup() {
    createCanvas(800, 500);
    background(0);
    noStroke();
    fill(255);

    ball = new Ball();
    jogador = new Raquete(20);
    inimigo = new Raquete(width - 30);
}

function draw() {
    ball.update();
    ball.draw();

    jogador.update();
    jogador.draw();

    inimigo.update();
    inimigo.draw();

}



