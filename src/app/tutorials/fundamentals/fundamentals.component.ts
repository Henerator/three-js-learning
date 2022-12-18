import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-fundamentals',
  templateUrl: './fundamentals.component.html',
  styleUrls: ['./fundamentals.component.scss'],
})
export class FundamentalsComponent implements AfterViewInit {
  @ViewChild('canvas', { read: ElementRef }) canvasElement!: ElementRef;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngAfterViewInit(): void {
    const canvas = this.canvasElement.nativeElement;
    canvas.width = 800;
    canvas.height = 400;

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
    scene.add(...cubes);
    scene.add(light);

    renderer.render(scene, camera);

    const animate = (time: number) => {
      time *= 0.001;

      cubes.forEach((cube) => {
        cube.rotation.x = time;
        cube.rotation.y = time;
      });

      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  private createCube(color: string, x: number): THREE.Mesh {
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const phongMaterial = new THREE.MeshPhongMaterial({ color });
    const cube = new THREE.Mesh(boxGeometry, phongMaterial);
    cube.position.x = x;

    return cube;
  }
}