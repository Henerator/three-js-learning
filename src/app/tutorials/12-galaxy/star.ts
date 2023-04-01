import * as THREE from 'three';
import { starTypes, STAR_SIZE_MAX, STAR_SIZE_MIN } from './galaxy-config.const';
import { BLOOM_LAYER, OVERLAY_LAYER } from './render-config.const';

const texture = new THREE.TextureLoader().load(
  'assets/textures/galaxy/sprite120.png'
);
const materials = starTypes.color.map(
  (color) => new THREE.SpriteMaterial({ map: texture, color })
);

export class Star {
  public obj: THREE.Sprite | null = null;
  private type = this.generateStarType();

  private get typeSize(): number {
    return starTypes.size[this.type];
  }

  constructor(private position: THREE.Vector3) {}

  public toSceneObject(scene: THREE.Scene): void {
    const star = new THREE.Sprite(materials[this.type]);
    star.layers.set(BLOOM_LAYER);
    star.position.copy(this.position);
    star.scale.multiplyScalar(this.typeSize);

    this.obj = star;

    scene.add(star);
  }

  public updateScale(camera: THREE.PerspectiveCamera) {
    const dist = this.position.distanceTo(camera.position) / 250;
    const scaleSize = dist * this.typeSize;
    const clampSize = THREE.MathUtils.clamp(
      scaleSize,
      STAR_SIZE_MIN,
      STAR_SIZE_MAX
    );
    this.obj?.scale.set(clampSize, clampSize, clampSize);
  }

  private generateStarType(): number {
    const percentages = starTypes.percentage;
    let value = Math.random() * 100.0;
    for (let i = 0; i < percentages.length; i++) {
      value -= percentages[i];
      if (value < 0) return i;
    }

    return 0;
  }
}
