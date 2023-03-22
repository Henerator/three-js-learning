import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import vertexShader from './shader-vertex.glsl';
import fragmentShader from './shader-fragment.glsl';

interface GlbModelObject {
  geometry: THREE.BufferGeometry;
}

@Component({
  selector: 'app-reflective-grid',
  templateUrl: './reflective-grid.component.html',
  styleUrls: ['./reflective-grid.component.scss'],
})
export class ReflectiveGridComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { read: ElementRef }) canvasElement!: ElementRef;

  private renderer!: THREE.WebGLRenderer;

  async ngAfterViewInit(): Promise<void> {
    const gltf = new GLTFLoader();
    const cubeModel = await gltf.loadAsync('assets/models/crosswire/ob1.glb');

    const textureLoader = new THREE.TextureLoader();
    const textures = {
      matcap: textureLoader.load('assets/textures/crosswire/sec2.png'),
      scan: textureLoader.load('assets/textures/crosswire/scan.png'),
    };

    let time = 0;

    const canvas = this.canvasElement.nativeElement as HTMLCanvasElement;
    const aspect = canvas.clientWidth / canvas.clientHeight;

    const frustumSize = 4;
    const camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      -1000,
      1000
    );
    camera.position.set(8, 12, 12);

    const scene = new THREE.Scene();

    const dummy = new THREE.Object3D();
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: time },
        uMatcapTexture: { value: textures.matcap },
        uScanTexture: { value: textures.scan },
      },
    });

    const cubeGeometry = (
      cubeModel.scene.children[0] as unknown as GlbModelObject
    ).geometry;

    const rows = 10;
    const count = rows * rows;

    const instancedMesh = new THREE.InstancedMesh(
      cubeGeometry,
      material,
      count
    );

    const yOffsets = new THREE.InstancedBufferAttribute(
      new Float32Array(count),
      1
    );

    let meshIndex = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i - rows / 2;
        const z = j - rows / 2;
        dummy.position.set(x, -10, z);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(meshIndex++, dummy.matrix);
        yOffsets.setX(meshIndex, Math.random());
      }
    }

    instancedMesh.geometry.setAttribute('yOffset', yOffsets);

    scene.add(instancedMesh);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor('#eee', 1);
    renderer.physicallyCorrectLights = true;
    renderer.setAnimationLoop(animation);
    this.renderer = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    function animation() {
      time += 0.01;
      material.uniforms['uTime'].value = time;

      renderer.render(scene, camera);
    }
  }

  ngOnDestroy(): void {
    this.renderer.setAnimationLoop(null);
  }
}
