import * as THREE from 'three';
import { Howl, Howler } from 'howler';
import { Renderer } from './Renderer';
import { CameraRig } from './Camera';
import { Resources } from './Resources';
import { World } from '../world/World';
import { CarControls } from '../controls/CarControls';
import { HUD } from '../ui/HUD';
import { Minimap } from '../ui/Map';
import { sections } from '../sections/sectionsData';
import { LoadingScreen } from '../ui/LoadingScreen';

export class Application {
  private renderer: Renderer;
  private camera = new CameraRig();
  private resources = new Resources();
  private controls = new CarControls();
  private world = new World(this.controls);
  private hud = new HUD();
  private minimap = new Minimap();
  private loading = new LoadingScreen();

  private panel = document.getElementById('section-panel')!;
  private sectionTitle = document.getElementById('section-title')!;
  private sectionDescription = document.getElementById('section-description')!;
  private sectionItems = document.getElementById('section-items')!;
  private startOverlay = document.getElementById('start-screen')!;

  private currentSection = -1;
  private lap = 0;
  private tokens = 0;
  private lapStart = performance.now();
  private previousAngle = 0;
  private collectibles = new Set<number>();

  private isMuted = false;
  private engine = new Howl({ src: ['https://cdn.pixabay.com/download/audio/2023/03/18/audio_5f6f7d6f0a.mp3?filename=car-engine-loop-143734.mp3'], loop: true, volume: 0.25, html5: true });
  private ambience = new Howl({ src: ['https://cdn.pixabay.com/download/audio/2022/03/15/audio_916f7f9c8f.mp3?filename=crowd-cheering-ambience-112960.mp3'], loop: true, volume: 0.12, html5: true });
  private collide = new Howl({ src: ['https://cdn.pixabay.com/download/audio/2022/03/10/audio_65eb0b0915.mp3?filename=metal-hit-104579.mp3'], volume: 0.2, html5: true });

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new Renderer(canvas);
    this.setupStart();
    this.setupAudioToggle();
    this.setupCollisionSound();
    window.addEventListener('resize', () => { this.renderer.resize(); this.camera.resize(); });
  }

  async boot() {
    await this.resources.preload((v) => this.loading.setProgress(v));
    this.loading.hide();
    this.startOverlay.classList.remove('hidden');
  }

  private setupStart() {
    document.getElementById('start-engine')?.addEventListener('click', () => {
      this.startOverlay.classList.add('hidden');
      this.engine.play();
      this.ambience.play();
      this.animate();
    });
  }

  private setupAudioToggle() {
    const muteBtn = document.getElementById('mute-toggle') as HTMLButtonElement;
    muteBtn.onclick = () => {
      this.isMuted = !this.isMuted;
      Howler.mute(this.isMuted);
      muteBtn.textContent = this.isMuted ? '🔇' : '🔊';
    };
  }

  private setupCollisionSound() {
    let cooldown = 0;
    this.world.physics.world.addEventListener('postStep', () => {
      cooldown -= 1;
      if (cooldown > 0) return;
      if (this.world.car.body.position.x > 40 || this.world.car.body.position.x < -40 || this.world.car.body.position.z > 27 || this.world.car.body.position.z < -27) {
        this.collide.play();
        cooldown = 20;
      }
    });
  }

  private renderSection(index: number) {
    if (index === this.currentSection) return;
    this.currentSection = index;
    const section = sections[index];
    this.sectionTitle.textContent = section.title;
    this.sectionDescription.textContent = section.description;
    this.sectionItems.innerHTML = section.items.map((item) => `<li>${item}</li>`).join('');
    this.world.buildings.highlight(index);
  }

  private updateGameplay() {
    const carPos = this.world.car.mesh.position;
    const sectionDistances = sections.map((s) => Math.hypot(carPos.x - s.position[0], carPos.z - s.position[1]));
    const nearest = sectionDistances.indexOf(Math.min(...sectionDistances));
    if (sectionDistances[nearest] < 6) this.renderSection(nearest);

    if (this.controls.consumeInteract()) this.panel.classList.toggle('hidden');
    if (this.controls.consumeCamera()) this.camera.cycleMode();

    sectionDistances.forEach((d, i) => {
      if (d < 4 && !this.collectibles.has(i)) {
        this.collectibles.add(i);
        this.tokens += 1;
      }
    });

    const angle = Math.atan2(carPos.z / 20, carPos.x / 35);
    if (this.previousAngle > 2.8 && angle < -2.8) {
      this.lap += 1;
      this.lapStart = performance.now();
    }
    this.previousAngle = angle;

    this.hud.update(this.world.car.speed, this.lap, performance.now() - this.lapStart, this.tokens);
    this.minimap.draw(carPos.x, carPos.z);
  }

  private updateCamera() {
    const car = this.world.car.mesh;
    const boost = this.controls.keys.boost ? 1.35 : 1;
    if (this.camera.mode === 'top') {
      this.camera.instance.position.lerp(new THREE.Vector3(car.position.x, 42, car.position.z + 0.1), 0.08);
      this.camera.instance.lookAt(car.position);
      return;
    }
    if (this.camera.mode === 'cockpit') {
      const front = new THREE.Vector3(0, 1.4, -0.7).applyQuaternion(car.quaternion);
      this.camera.instance.position.lerp(car.position.clone().add(front), 0.2);
      const look = new THREE.Vector3(0, 1.2, -14).applyQuaternion(car.quaternion).add(car.position);
      this.camera.instance.lookAt(look);
      return;
    }
    const offset = new THREE.Vector3(0, 5.8, 11 * boost).applyQuaternion(car.quaternion);
    this.camera.instance.position.lerp(car.position.clone().add(offset), 0.085);
    this.camera.instance.lookAt(car.position.clone().add(new THREE.Vector3(0, 1.6, 0)));
  }

  private animate = () => {
    this.world.update(1 / 60);
    this.updateGameplay();
    this.updateCamera();
    this.renderer.instance.render(this.world.scene, this.camera.instance);
    requestAnimationFrame(this.animate);
  };
}
