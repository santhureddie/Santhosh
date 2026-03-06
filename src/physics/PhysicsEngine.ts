import * as CANNON from 'cannon-es';

export class PhysicsEngine {
  world: CANNON.World;
  constructor() {
    this.world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) });
    this.world.broadphase = new CANNON.SAPBroadphase(this.world);
    this.world.defaultContactMaterial.friction = 0.35;
    this.world.defaultContactMaterial.restitution = 0.05;
  }

  step(dt: number) {
    this.world.step(1 / 60, dt, 3);
  }
}
