import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { Mesh, PerspectiveCamera, WebGLRenderer } from 'three';

@Component({
  selector: 'app-fundamentals',
  templateUrl: './fundamentals.component.html',
  styleUrls: ['./fundamentals.component.scss'],
})
export class FundamentalsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { read: ElementRef }) canvasElement!: ElementRef;

  private animationId!: number;

  ngAfterViewInit(): void {
    const canvas = this.canvasElement.nativeElement as HTMLCanvasElement;

    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const light = new THREE.DirectionalLight('#fff', 1);
    light.position.set(-1, 2, 4);

    const cubes = [
      this.createCube('#3a5a40', -2),
      this.createCube('#049EF4', 0),
      this.createCube('#d3a91e', 2),
    ];

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#111');
    scene.add(...cubes);
    scene.add(light);

    renderer.render(scene, camera);

    const animate = (time: number) => {
      time *= 0.001;

      this.resize(renderer, camera);

      cubes.forEach((cube) => {
        cube.rotation.x = time;
        cube.rotation.y = time;
      });

      renderer.render(scene, camera);

      this.animationId = window.requestAnimationFrame(animate);
    };

    this.animationId = window.requestAnimationFrame(animate);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
  }

  private createCube(color: string, x: number): Mesh {
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const phongMaterial = new THREE.MeshPhongMaterial({ color });
    const cube = new THREE.Mesh(boxGeometry, phongMaterial);
    cube.position.x = x;

    return cube;
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
