import * as THREE from 'three';
import { HAZE_MAX, HAZE_MIN, HAZE_OPACITY } from './galaxy-config.const';
import { BASE_LAYER } from './render-config.const';

const texture = new THREE.TextureLoader().load(
  'assets/textures/galaxy/feathered60.png'
);
const material = new THREE.SpriteMaterial({
  map: texture,
  color: '#0082ff',
  opacity: HAZE_OPACITY,
  depthTest: false,
  depthWrite: false,
});

export class Haze {
  public obj!: THREE.Sprite;

  constructor(private position: THREE.Vector3) {}

  public toSceneObject(scene: THREE.Scene): void {
    const haze = new THREE.Sprite(material);
    haze.layers.set(BASE_LAYER);
    haze.position.copy(this.position);
    haze.scale.multiplyScalar(
      THREE.MathUtils.clamp(HAZE_MAX * Math.random(), HAZE_MIN, HAZE_MAX)
    );

    this.obj = haze;
    scene.add(haze);
  }

  public updateScale(camera: THREE.PerspectiveCamera) {
    const dist = this.position.distanceTo(camera.position) / 250;
    this.obj.material.opacity = THREE.MathUtils.clamp(
      HAZE_OPACITY * Math.pow(dist / 2.5, 2),
      0,
      HAZE_OPACITY
    );
  }
}
