import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import {
  DataTexture,
  OrthographicCamera,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
  WebGLRenderTarget,
} from 'three';

import vertexShader from './shader-vertex.glsl';
import fragmentShader from './shader-fragment.glsl';
import fragmentShaderBuffer from './shader-fragment-buffer.glsl';

@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.scss'],
})
export class GameOfLifeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { read: ElementRef }) canvasElement!: ElementRef;

  private renderer!: WebGLRenderer;
  private camera!: OrthographicCamera;
  private renderBufferA!: WebGLRenderTarget;
  private renderBufferB!: WebGLRenderTarget;
  private bufferMaterial!: ShaderMaterial;
  private material!: ShaderMaterial;
  private animationId!: number;

  async ngAfterViewInit(): Promise<void> {
    this.createRenderer();
    this.createCamera();

    const canvas = this.renderer.domElement;
    const initialDataTexture = this.createRandomDataTexture();

    const scene = new THREE.Scene();
    const bufferScene = new THREE.Scene();

    const geometry = new THREE.PlaneGeometry(2, 2, 1, 1);

    const resolution = new THREE.Vector3(
      canvas.width,
      canvas.height,
      window.devicePixelRatio
    );

    this.renderBufferA = new THREE.WebGLRenderTarget(
      canvas.width,
      canvas.height
    );

    this.renderBufferB = new THREE.WebGLRenderTarget(
      canvas.width,
      canvas.height
    );

    this.bufferMaterial = new THREE.ShaderMaterial({
      uniforms: {
        u_texture: { value: initialDataTexture },
        u_resolution: {
          value: resolution,
        },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShaderBuffer,
    });

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        u_texture: { value: null },
        u_resolution: {
          value: resolution,
        },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    const bufferPlane = new THREE.Mesh(geometry, this.bufferMaterial);
    bufferScene.add(bufferPlane);

    const plane = new THREE.Mesh(geometry, this.material);
    scene.add(plane);

    const animate = () => {
      this.resize(this.renderer, this.camera);

      this.renderer.setRenderTarget(this.renderBufferA);
      this.renderer.render(bufferScene, this.camera);

      plane.material.uniforms['u_texture'].value = this.renderBufferA.texture;

      this.renderer.setRenderTarget(null);

      this.renderer.render(scene, this.camera);

      const temp = this.renderBufferA;
      this.renderBufferA = this.renderBufferB;
      this.renderBufferB = temp;
      this.bufferMaterial.uniforms['u_texture'].value =
        this.renderBufferB.texture;

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
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  }

  private resize(renderer: WebGLRenderer, camera: OrthographicCamera): void {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) {
      renderer.setSize(width, height, false);
      camera.updateProjectionMatrix();

      this.renderBufferA.setSize(width, height);
      this.renderBufferB.setSize(width, height);

      this.bufferMaterial.uniforms['u_resolution'].value.x = width;
      this.bufferMaterial.uniforms['u_resolution'].value.y = height;
      this.material.uniforms['u_resolution'].value.x = width;
      this.material.uniforms['u_resolution'].value.y = height;
    }
  }

  private createRandomDataTexture(): DataTexture {
    const width = this.renderer.domElement.width;
    const height = this.renderer.domElement.height;
    const pixelsCount = width * height;
    const data = new Uint8Array(4 * pixelsCount);

    for (let i = 0; i < pixelsCount; i++) {
      const offset = i * 4;
      const brightness = Math.random() > 0.96 ? 255 : 0;

      data[offset] = brightness;
      data[offset + 1] = brightness;
      data[offset + 2] = brightness;
      data[offset + 3] = 255;
    }

    const texture = new THREE.DataTexture(
      data,
      width,
      height,
      THREE.RGBAFormat
    );

    texture.needsUpdate = true;

    return texture;
  }
}
