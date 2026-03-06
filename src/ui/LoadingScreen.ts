export class LoadingScreen {
  private root = document.getElementById('loading-screen') as HTMLDivElement;
  private fill = document.getElementById('progress-fill') as HTMLSpanElement;

  setProgress(value: number) {
    this.fill.style.width = `${Math.round(value * 100)}%`;
  }

  hide() { this.root.classList.add('hidden'); }
}
