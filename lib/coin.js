class Coin {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.coinImage = new Image();
        this.coinImage.src = "https://i.imgur.com/SJtG1rE.png";
        // this.coinImage.src = "./assets/coin.png";
    }

    render(ctx) {
        ctx.drawImage(this.coinImage, this.x, this.y);
    }
}

module.exports = Coin;