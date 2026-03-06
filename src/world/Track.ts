import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { PhysicsEngine } from '../physics/PhysicsEngine';

export class Track {
  group = new THREE.Group();
  constructor(physics: PhysicsEngine) {
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(220, 220), new THREE.MeshStandardMaterial({ color: 0x081325 }));
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.group.add(ground);

    const shape = new THREE.Shape();
    shape.absellipse(0, 0, 35, 20, 0, Math.PI * 2, false, 0);
    const hole = new THREE.Path();
    hole.absellipse(0, 0, 24, 12, 0, Math.PI * 2, true, 0);
    shape.holes.push(hole);
    const track = new THREE.Mesh(new THREE.ShapeGeometry(shape, 120), new THREE.MeshStandardMaterial({ color: 0x21242e, roughness: 0.8 }));
    track.rotation.x = -Math.PI / 2;
    track.position.y = 0.02;
    track.receiveShadow = true;
    this.group.add(track);

    const lane = new THREE.Mesh(new THREE.RingGeometry(12, 12.4, 200), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35, side: THREE.DoubleSide }));
    lane.scale.set(2.45, 1, 1.65);
    lane.rotation.x = -Math.PI / 2;
    lane.position.y = 0.05;
    this.group.add(lane);

    const center = new THREE.Mesh(new THREE.CylinderGeometry(24, 24, 0.2, 100), new THREE.MeshStandardMaterial({ color: 0x0d311c }));
    center.position.y = 0.1;
    this.group.add(center);

    const floorBody = new CANNON.Body({ mass: 0, shape: new CANNON.Plane() });
    floorBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    physics.world.addBody(floorBody);

    [42, -42].forEach((x) => {
      const wall = new CANNON.Body({ mass: 0, shape: new CANNON.Box(new CANNON.Vec3(1, 2, 50)), position: new CANNON.Vec3(x, 2, 0) });
      physics.world.addBody(wall);
    });
    [28, -28].forEach((z) => {
      const wall = new CANNON.Body({ mass: 0, shape: new CANNON.Box(new CANNON.Vec3(50, 2, 1)), position: new CANNON.Vec3(0, 2, z) });
      physics.world.addBody(wall);
    });
  }
}
