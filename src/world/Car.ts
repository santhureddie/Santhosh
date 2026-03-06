import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { PhysicsEngine } from '../physics/PhysicsEngine';
import { CarControls } from '../controls/CarControls';

export class Car {
  mesh = new THREE.Group();
  body: CANNON.Body;
  speed = 0;

  constructor(private physics: PhysicsEngine, private controls: CarControls) {
    const bodyMesh = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.5, 4.8),
      new THREE.MeshStandardMaterial({ color: 0xdc1638, metalness: 0.5, roughness: 0.25 })
    );
    bodyMesh.position.y = 0.8;
    bodyMesh.castShadow = true;
    this.mesh.add(bodyMesh);

    const cabin = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 0.4, 1.8),
      new THREE.MeshStandardMaterial({ color: 0x090d16 })
    );
    cabin.position.set(0, 1.15, 0);
    cabin.castShadow = true;
    this.mesh.add(cabin);

    const wheelGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.4, 16);
    for (const [x, z] of [
      [1.2, 1.6],
      [-1.2, 1.6],
      [1.2, -1.6],
      [-1.2, -1.6]
    ]) {
      const wheel = new THREE.Mesh(wheelGeo, new THREE.MeshStandardMaterial({ color: 0x111 }));
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(x, 0.45, z);
      this.mesh.add(wheel);
    }

    this.body = new CANNON.Body({
      mass: 180,
      allowSleep: false,
      shape: new CANNON.Box(new CANNON.Vec3(1.1, 0.45, 2.1)),
      position: new CANNON.Vec3(30, 1.2, 0),
      linearDamping: 0.04,
      angularDamping: 0.22
    });
    this.physics.world.addBody(this.body);
  }

  update(dt: number) {
    const boost = this.controls.keys.boost ? 1.4 : 1;
    const engineForce = 52000 * boost;
    const throttle = (this.controls.keys.forward ? 1 : 0) - (this.controls.keys.back ? 0.75 : 0);

    if (throttle !== 0) {
      this.body.wakeUp();
      this.body.applyLocalForce(new CANNON.Vec3(0, 0, -engineForce * throttle), new CANNON.Vec3(0, 0, 0));
    }

    const speed = this.body.velocity.length();
    const steerInput = (this.controls.keys.left ? 1 : 0) - (this.controls.keys.right ? 1 : 0);
    const steerStrength = this.controls.keys.drift ? 2.5 : 1.8;
    this.body.angularVelocity.y += steerInput * steerStrength * Math.min(1.2, speed + 0.2) * dt;

    // Arcade-style lateral grip and drag so movement feels responsive.
    const right = new CANNON.Vec3(1, 0, 0);
    this.body.quaternion.vmult(right, right);
    const lateralSpeed = this.body.velocity.dot(right);
    this.body.velocity.x -= right.x * lateralSpeed * 0.08;
    this.body.velocity.z -= right.z * lateralSpeed * 0.08;

    if (!this.controls.keys.forward && !this.controls.keys.back) {
      this.body.velocity.x *= 0.992;
      this.body.velocity.z *= 0.992;
    }

    this.mesh.position.set(this.body.position.x, this.body.position.y - 0.35, this.body.position.z);
    this.mesh.quaternion.set(this.body.quaternion.x, this.body.quaternion.y, this.body.quaternion.z, this.body.quaternion.w);
    this.speed = this.body.velocity.length() * 3.6;
  }
}
