import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { PhysicsEngine } from '../physics/PhysicsEngine';
import { CarControls } from '../controls/CarControls';

export class Car {
  mesh = new THREE.Group();
  body: CANNON.Body;
  speed = 0;

  constructor(private physics: PhysicsEngine, private controls: CarControls) {
    const bodyMesh = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.5, 4.8), new THREE.MeshStandardMaterial({ color: 0xdc1638, metalness: 0.5, roughness: 0.25 }));
    bodyMesh.position.y = 0.8;
    bodyMesh.castShadow = true;
    this.mesh.add(bodyMesh);
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.4, 1.8), new THREE.MeshStandardMaterial({ color: 0x090d16 }));
    cabin.position.set(0, 1.15, 0);
    cabin.castShadow = true;
    this.mesh.add(cabin);
    const wheelGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.4, 16);
    for (const [x, z] of [[1.2, 1.6], [-1.2, 1.6], [1.2, -1.6], [-1.2, -1.6]]) {
      const wheel = new THREE.Mesh(wheelGeo, new THREE.MeshStandardMaterial({ color: 0x111 }));
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(x, 0.45, z);
      this.mesh.add(wheel);
    }

    this.body = new CANNON.Body({
      mass: 180,
      shape: new CANNON.Box(new CANNON.Vec3(1.1, 0.45, 2.1)),
      position: new CANNON.Vec3(30, 1.2, 0),
      linearDamping: 0.25,
      angularDamping: 0.4
    });
    this.physics.world.addBody(this.body);
  }

  update(dt: number) {
    const force = this.controls.keys.boost ? 750 : 480;
    const turnForce = this.controls.keys.drift ? 1.9 : 1.3;
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(new THREE.Quaternion(this.body.quaternion.x, this.body.quaternion.y, this.body.quaternion.z, this.body.quaternion.w));
    if (this.controls.keys.forward) this.body.applyForce(new CANNON.Vec3(forward.x * force, 0, forward.z * force), this.body.position);
    if (this.controls.keys.back) this.body.applyForce(new CANNON.Vec3(-forward.x * force * 0.65, 0, -forward.z * force * 0.65), this.body.position);

    const turning = (this.controls.keys.left ? 1 : 0) - (this.controls.keys.right ? 1 : 0);
    this.body.angularVelocity.y += turning * turnForce * dt;

    this.mesh.position.set(this.body.position.x, this.body.position.y - 0.35, this.body.position.z);
    this.mesh.quaternion.set(this.body.quaternion.x, this.body.quaternion.y, this.body.quaternion.z, this.body.quaternion.w);
    this.speed = this.body.velocity.length() * 3.6;
  }
}
