class Coin {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        console.log("new coin!");
        this.coinImage = new Image();
        this.coinImage.src = "./assets/coin.png";
    }

    render(ctx) {
        console.log("coin!");
        ctx.drawImage(this.coinImage, this.x, this.y);
    }
}

module.exports = Coin;