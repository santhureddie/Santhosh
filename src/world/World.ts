import * as THREE from 'three';
import { PhysicsEngine } from '../physics/PhysicsEngine';
import { CarControls } from '../controls/CarControls';
import { Track } from './Track';
import { Car } from './Car';
import { Buildings } from './Buildings';

export class World {
  scene = new THREE.Scene();
  physics: PhysicsEngine;
  track: Track;
  car: Car;
  buildings: Buildings;

  constructor(controls: CarControls) {
    this.scene.background = new THREE.Color(0x030613);
    this.scene.fog = new THREE.Fog(0x030613, 40, 180);

    const amb = new THREE.AmbientLight(0x95b9ff, 0.55);
    const key = new THREE.DirectionalLight(0xffffff, 1.25);
    key.position.set(35, 38, 15);
    key.castShadow = true;
    this.scene.add(amb, key);

    this.physics = new PhysicsEngine();
    this.track = new Track(this.physics);
    this.car = new Car(this.physics, controls);
    this.buildings = new Buildings();
    this.scene.add(this.track.group, this.car.mesh, this.buildings.group);
  }

  update(dt: number) {
    this.physics.step(dt);
    this.car.update(dt);
  }
}
