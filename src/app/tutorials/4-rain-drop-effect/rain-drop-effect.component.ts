import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import vertexShader from './shader-vertex.glsl';
import fragmentShader from './shader-fragment.glsl';

@Component({
  selector: 'app-rain-drop-effect',
  templateUrl: './rain-drop-effect.component.html',
  styleUrls: ['./rain-drop-effect.component.scss'],
})
export class RainDropEffectComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { read: ElementRef }) canvasElement!: ElementRef;

  private renderer!: WebGLRenderer;
  private camera!: PerspectiveCamera;
  private scene!: Scene;
  private animationId!: number;

  async ngAfterViewInit(): Promise<void> {
    this.createRenderer();
    this.createScene();
    this.createLight();
    this.createCamera();

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    const textureLoader = new THREE.TextureLoader();
    const texture = await textureLoader.loadAsync(
      'assets/textures/night-city.jpg'
    );

    const textureRatio = texture.image.height / texture.image.width;
    const planeHeight = 10;
    const planeWidth = planeHeight / textureRatio;

    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 1, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_texture: { value: texture },
      },
    });
    const plane = new THREE.Mesh(geometry, material);
    this.scene.add(plane);

    this.renderer.render(this.scene, this.camera);

    const animate = (time: number) => {
      this.resize(this.renderer, this.camera);

      time *= 0.001;

      plane.material.uniforms['u_time'].value = time;

      this.renderer.render(this.scene, this.camera);
      this.animationId = window.requestAnimationFrame(animate);
    };

    this.animationId = window.requestAnimationFrame(animate);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
  }

  private createRenderer(): void {
    const canvas = this.canvasElement.nativeElement as HTMLCanvasElement;
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas });
  }

  private createCamera(): void {
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 100;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(0, 0, 7);
  }

  private createLight(): void {
    const light = new THREE.DirectionalLight('#fff', 1);
    light.position.set(-1, 2, 4);
    this.scene.add(light);
  }

  private createScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#111');
  }

  private resize(renderer: WebGLRenderer, camera: PerspectiveCamera): void {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) {
      renderer.setSize(width, height, false);
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
  }
}
