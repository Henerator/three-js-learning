import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';

import vertexShader from './shader-vertex.glsl';
import fragmentShader from './shader-fragment.glsl';

@Component({
  selector: 'app-waves',
  templateUrl: './waves.component.html',
  styleUrls: ['./waves.component.scss'],
})
export class WavesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { read: ElementRef }) canvasElement!: ElementRef;

  private renderer!: THREE.WebGLRenderer;

  ngAfterViewInit(): void {
    let time = 0;

    const canvas = this.canvasElement.nativeElement as HTMLCanvasElement;

    const camera = new THREE.PerspectiveCamera(
      70,
      canvas.clientWidth / canvas.clientHeight,
      0.01,
      10
    );
    camera.position.z = 10;

    const geometry = new THREE.PlaneGeometry(100, 100, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: time },
      },
    });
    const mesh = new THREE.Mesh(geometry, material);

    const scene = new THREE.Scene();
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setAnimationLoop(animation);
    this.renderer = renderer;

    function animation(time: number) {
      time += 0.01;

      material.uniforms['uTime'].value = time;

      renderer.render(scene, camera);
    }
  }

  ngOnDestroy(): void {
    this.renderer.setAnimationLoop(null);
  }
}
