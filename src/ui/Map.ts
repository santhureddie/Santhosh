export class Minimap {
  private canvas = document.getElementById('minimap') as HTMLCanvasElement;
  private ctx = this.canvas.getContext('2d')!;

  draw(carX: number, carZ: number) {
    const { ctx } = this;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.strokeStyle = '#8aa7be';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.ellipse(80, 80, 58, 34, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#ff4d61';
    const px = 80 + (carX / 40) * 58;
    const pz = 80 + (carZ / 24) * 34;
    ctx.beginPath();
    ctx.arc(px, pz, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}
