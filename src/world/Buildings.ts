import * as THREE from 'three';
import { sections } from '../sections/sectionsData';

export class Buildings {
  group = new THREE.Group();
  markers: THREE.Mesh[] = [];

  constructor() {
    const spotGeo = new THREE.CylinderGeometry(1.1, 1.1, 3, 16);
    sections.forEach((section, idx) => {
      const marker = new THREE.Mesh(
        spotGeo,
        new THREE.MeshStandardMaterial({ color: idx % 2 ? 0xffce54 : 0x59d9ff, emissive: 0x11243a })
      );
      marker.position.set(section.position[0], 1.6, section.position[1]);
      marker.castShadow = true;
      this.group.add(marker);
      this.markers.push(marker);

      const tower = new THREE.Mesh(new THREE.BoxGeometry(6, 5, 6), new THREE.MeshStandardMaterial({ color: 0x0f1b35 }));
      tower.position.set(section.position[0] * 1.06, 2.5, section.position[1] * 1.06);
      tower.castShadow = true;
      this.group.add(tower);
    });

    const podium = new THREE.Mesh(new THREE.BoxGeometry(8, 1, 5), new THREE.MeshStandardMaterial({ color: 0x5b6370 }));
    podium.position.set(-2, 0.5, -2);
    this.group.add(podium);
  }

  highlight(index: number) {
    this.markers.forEach((m, i) => {
      (m.material as THREE.MeshStandardMaterial).emissive.setHex(i === index ? 0x5d2230 : 0x11243a);
      m.scale.y = i === index ? 1.35 : 1;
    });
  }
}
