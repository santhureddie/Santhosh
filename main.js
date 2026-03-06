import * as THREE from 'https://unpkg.com/three@0.161.0/build/three.module.js';
import { checkpoints } from './portfolio-data.js';

const canvas = document.getElementById('scene');
const panelTitle = document.getElementById('panelTitle');
const panelDescription = document.getElementById('panelDescription');
const panelList = document.getElementById('panelList');
const panelLink = document.getElementById('panelLink');
const lapMeter = document.getElementById('lapMeter');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x04070f);
scene.fog = new THREE.Fog(0x04070f, 20, 72);

const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 18, 24);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

const ambient = new THREE.AmbientLight(0x9ab8ff, 0.5);
scene.add(ambient);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.15);
dirLight.position.set(20, 25, 10);
dirLight.castShadow = true;
scene.add(dirLight);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({ color: 0x0d1324, metalness: 0.2, roughness: 0.9 })
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const trackShape = new THREE.Shape();
trackShape.absellipse(0, 0, 15, 10, 0, Math.PI * 2, false, 0);
const hole = new THREE.Path();
hole.absellipse(0, 0, 10.6, 5.8, 0, Math.PI * 2, true, 0);
trackShape.holes.push(hole);

const track = new THREE.Mesh(
  new THREE.ShapeGeometry(trackShape, 60),
  new THREE.MeshStandardMaterial({ color: 0x2d2d2f, roughness: 0.55, metalness: 0.1 })
);
track.rotation.x = -Math.PI / 2;
track.position.y = 0.02;
track.receiveShadow = true;
scene.add(track);

const lane = new THREE.Mesh(
  new THREE.RingGeometry(8.15, 8.35, 128),
  new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.45 })
);
lane.scale.set(1.58, 1.0, 1.0);
lane.rotation.x = -Math.PI / 2;
lane.position.y = 0.05;
scene.add(lane);

const centerGrass = new THREE.Mesh(
  new THREE.CylinderGeometry(10, 10, 0.15, 64),
  new THREE.MeshStandardMaterial({ color: 0x13281a, roughness: 0.96 })
);
centerGrass.position.y = 0.075;
scene.add(centerGrass);

const car = new THREE.Group();
const body = new THREE.Mesh(
  new THREE.BoxGeometry(1.8, 0.5, 4.2),
  new THREE.MeshStandardMaterial({ color: 0xff394a, metalness: 0.55, roughness: 0.2 })
);
body.position.y = 0.55;
body.castShadow = true;
car.add(body);

const cabin = new THREE.Mesh(
  new THREE.BoxGeometry(1.2, 0.38, 1.6),
  new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.8, roughness: 0.25 })
);
cabin.position.set(0, 0.95, 0);
cabin.castShadow = true;
car.add(cabin);

const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.36, 24);
const wheelMat = new THREE.MeshStandardMaterial({ color: 0x121212, roughness: 0.75 });
[
  [0.98, 0.35, 1.3],
  [-0.98, 0.35, 1.3],
  [0.98, 0.35, -1.3],
  [-0.98, 0.35, -1.3]
].forEach(([x, y, z]) => {
  const w = new THREE.Mesh(wheelGeo, wheelMat);
  w.rotation.z = Math.PI / 2;
  w.position.set(x, y, z);
  w.castShadow = true;
  car.add(w);
});
scene.add(car);

const markerGroup = new THREE.Group();
scene.add(markerGroup);

const rx = 12.8;
const rz = 7.9;
const checkpointAngles = checkpoints.map((_, i) => (Math.PI * 2 * i) / checkpoints.length);

checkpointAngles.forEach((a, i) => {
  const marker = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.25, 1.6, 16),
    new THREE.MeshStandardMaterial({ color: i % 2 === 0 ? 0x58d9ff : 0xffd04a, emissive: 0x182632 })
  );
  marker.position.set(rx * Math.cos(a), 0.9, rz * Math.sin(a));
  markerGroup.add(marker);
});

let t = 0;
let speed = 0.0022;
let laps = 0;
let active = -1;
const keyState = { left: false, right: false, up: false, down: false };

function updatePanel(checkpoint) {
  panelTitle.textContent = checkpoint.title;
  panelDescription.textContent = checkpoint.description;
  panelList.innerHTML = '';

  checkpoint.bullets.forEach((text) => {
    const li = document.createElement('li');
    li.textContent = text;
    panelList.appendChild(li);
  });

  if (checkpoint.link) {
    panelLink.style.display = 'inline-block';
    panelLink.href = checkpoint.link;
  } else {
    panelLink.style.display = 'none';
  }
}

function getPosition(progress) {
  const angle = progress * Math.PI * 2;
  return new THREE.Vector3(rx * Math.cos(angle), 0.46, rz * Math.sin(angle));
}

function updateCar() {
  if (keyState.left) t -= 0.0019;
  if (keyState.right) t += 0.0019;
  if (keyState.up) speed += 0.00003;
  if (keyState.down) speed -= 0.00003;

  speed = THREE.MathUtils.clamp(speed, 0.0008, 0.0062);
  t += speed;

  if (t > 1) {
    t -= 1;
    laps += 1;
  }

  if (t < 0) {
    t += 1;
    laps = Math.max(0, laps - 1);
  }

  const p = getPosition(t);
  const p2 = getPosition((t + 0.0025) % 1);
  car.position.copy(p);
  car.lookAt(p2.x, p2.y + 0.2, p2.z);
  car.rotateY(Math.PI);

  lapMeter.textContent = `Lap ${laps}`;

  const nearest = checkpointAngles.reduce(
    (acc, angle, idx) => {
      const dist = Math.abs(Math.atan2(Math.sin(t * Math.PI * 2 - angle), Math.cos(t * Math.PI * 2 - angle)));
      return dist < acc.dist ? { dist, idx } : acc;
    },
    { dist: Infinity, idx: 0 }
  );

  if (nearest.dist < 0.22 && active !== nearest.idx) {
    active = nearest.idx;
    updatePanel(checkpoints[active]);
  }

  markerGroup.children.forEach((m, idx) => {
    m.material.emissive.setHex(idx === active ? 0x4c2336 : 0x182632);
    m.scale.y = idx === active ? 1.4 : 1;
  });

}

function animate() {
  updateCar();
  const camPos = getPosition((t - 0.03 + 1) % 1);
  camera.position.lerp(new THREE.Vector3(camPos.x, 9.5, camPos.z + 8), 0.055);
  camera.lookAt(car.position.x, 0.6, car.position.z);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') keyState.left = true;
  if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') keyState.right = true;
  if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') keyState.up = true;
  if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') keyState.down = true;
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') keyState.left = false;
  if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') keyState.right = false;
  if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') keyState.up = false;
  if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') keyState.down = false;
});

updatePanel(checkpoints[0]);
animate();
