import * as THREE from 'three';

export type CameraMode = 'third' | 'top' | 'cockpit';

export class CameraRig {
  instance = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
  mode: CameraMode = 'third';

  resize() {
    this.instance.aspect = window.innerWidth / window.innerHeight;
    this.instance.updateProjectionMatrix();
  }

  cycleMode() {
    this.mode = this.mode === 'third' ? 'cockpit' : this.mode === 'cockpit' ? 'top' : 'third';
  }
}
