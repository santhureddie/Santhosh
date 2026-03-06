export class CarControls {
  keys = { forward: false, back: false, left: false, right: false, boost: false, drift: false, interact: false, camera: false };
  joystick = { x: 0, y: 0 };

  constructor() {
    window.addEventListener('keydown', (e) => this.toggle(e, true));
    window.addEventListener('keyup', (e) => this.toggle(e, false));
    this.setupTouchJoystick();
  }

  private toggle(e: KeyboardEvent, state: boolean) {
    const key = e.key.toLowerCase();
    if (key === 'w' || e.key === 'ArrowUp') this.keys.forward = state;
    if (key === 's' || e.key === 'ArrowDown') this.keys.back = state;
    if (key === 'a' || e.key === 'ArrowLeft') this.keys.left = state;
    if (key === 'd' || e.key === 'ArrowRight') this.keys.right = state;
    if (e.key === 'Shift') this.keys.boost = state;
    if (e.key === ' ') this.keys.drift = state;
    if (e.key === 'Enter' && state) this.keys.interact = true;
    if (key === 'c' && state) this.keys.camera = true;
  }

  consumeInteract() { const v = this.keys.interact; this.keys.interact = false; return v; }
  consumeCamera() { const v = this.keys.camera; this.keys.camera = false; return v; }

  private setupTouchJoystick() {
    const base = document.getElementById('joystick');
    const stick = document.getElementById('stick');
    if (!base || !stick) return;
    const mobile = matchMedia('(max-width: 900px)').matches;
    if (!mobile) return;
    base.classList.remove('hidden');

    let active = false;
    const update = (x: number, y: number) => {
      const rect = base.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.max(-36, Math.min(36, x - cx));
      const dy = Math.max(-36, Math.min(36, y - cy));
      stick.style.transform = `translate(${dx}px, ${dy}px)`;
      this.joystick.x = dx / 36;
      this.joystick.y = dy / 36;
      this.keys.forward = this.joystick.y < -0.15;
      this.keys.back = this.joystick.y > 0.15;
      this.keys.left = this.joystick.x < -0.2;
      this.keys.right = this.joystick.x > 0.2;
    };

    base.addEventListener('pointerdown', (e) => { active = true; update(e.clientX, e.clientY); });
    window.addEventListener('pointermove', (e) => active && update(e.clientX, e.clientY));
    window.addEventListener('pointerup', () => {
      active = false;
      stick.style.transform = 'translate(0, 0)';
      this.joystick = { x: 0, y: 0 };
      this.keys.forward = this.keys.back = this.keys.left = this.keys.right = false;
    });
  }
}
