import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import fragmentShaderNoise from './noise/shader-fragment.glsl';
import vertexShaderNoise from './noise/shader-vertex.glsl';
import fragmentShaderSun from './sun/shader-fragment.glsl';
import vertexShaderSun from './sun/shader-vertex.glsl';
import fragmentShaderAura from './aura/shader-fragment.glsl';
import vertexShaderAura from './aura/shader-vertex.glsl';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { read: ElementRef }) canvasElement!: ElementRef;

  private renderer!: THREE.WebGLRenderer;
  private subscription = new Subscription();

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const container = this.elementRef.nativeElement as HTMLElement;
    const canvas = this.canvasElement.nativeElement as HTMLCanvasElement;

    // generate sun texture
    const noiseRenderTarget = new THREE.WebGLCubeRenderTarget(256);

    const cubeCamera = new THREE.CubeCamera(0.1, 10, noiseRenderTarget);

    const materialNoise = new THREE.ShaderMaterial({
      vertexShader: vertexShaderNoise,
      fragmentShader: fragmentShaderNoise,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
      },
    });

    const meshNoise = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 32, 32), materialNoise);

    const sceneNoise = new THREE.Scene();
    sceneNoise.add(meshNoise);

    // main
    const camera = new THREE.PerspectiveCamera(
      70,
      container.clientWidth / container.clientHeight,
      0.01,
      10
    );
    camera.position.z = 2.3;

    const materialSun = new THREE.ShaderMaterial({
      vertexShader: vertexShaderSun,
      fragmentShader: fragmentShaderSun,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uCubeTexture: { value: null },
      },
    });

    const meshSun = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 32, 32), materialSun);

    // aura
    const materialAura = new THREE.ShaderMaterial({
      vertexShader: vertexShaderAura,
      fragmentShader: fragmentShaderAura,
      side: THREE.BackSide,
      transparent: true,
    });

    const meshAura = new THREE.Mesh(new THREE.SphereBufferGeometry(1.2, 32, 32), materialAura);

    // scene
    const scene = new THREE.Scene();
    scene.add(meshSun);
    scene.add(meshAura);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor('#000');
    renderer.setAnimationLoop(animation);
    this.renderer = renderer;

    const controls = new OrbitControls(camera, this.renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    this.subscription.add(
      fromEvent(window, 'resize').subscribe(() => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      })
    );
    let time = 0;
    function animation() {
      time++;

      meshSun.rotation.y = time * 0.0006;

      materialNoise.uniforms['uTime'].value = time;
      materialSun.uniforms['uTime'].value = time;

      cubeCamera.update(renderer, sceneNoise);

      materialSun.uniforms['uCubeTexture'].value = noiseRenderTarget.texture;

      renderer.render(scene, camera);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.renderer.setAnimationLoop(null);
  }
}
