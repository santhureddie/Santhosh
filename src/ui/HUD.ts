export class HUD {
  speed = document.getElementById('speed') as HTMLSpanElement;
  lap = document.getElementById('lap') as HTMLSpanElement;
  lapTime = document.getElementById('lap-time') as HTMLSpanElement;
  tokens = document.getElementById('tokens') as HTMLSpanElement;

  update(speed: number, lap: number, lapTimeMs: number, tokens: number) {
    this.speed.textContent = `${Math.max(0, Math.round(speed))}`;
    this.lap.textContent = `${lap}`;
    const sec = lapTimeMs / 1000;
    const mm = String(Math.floor(sec / 60)).padStart(2, '0');
    const ss = String(Math.floor(sec % 60)).padStart(2, '0');
    const ms = String(Math.floor((sec % 1) * 100)).padStart(2, '0');
    this.lapTime.textContent = `${mm}:${ss}.${ms}`;
    this.tokens.textContent = `${tokens}`;
  }
}
