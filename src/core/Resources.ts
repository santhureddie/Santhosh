export class Resources {
  async preload(onProgress: (n: number) => void) {
    for (let i = 1; i <= 20; i += 1) {
      await new Promise((r) => setTimeout(r, 35));
      onProgress(i / 20);
    }
  }
}
