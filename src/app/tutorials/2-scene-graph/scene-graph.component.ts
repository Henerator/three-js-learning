import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import {
  Mesh,
  Object3D,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from 'three';

@Component({
  selector: 'app-scene-graph',
  templateUrl: './scene-graph.component.html',
  styleUrls: ['./scene-graph.component.scss'],
})
export class SceneGraphComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { read: ElementRef }) canvasElement!: ElementRef;

  private renderer!: WebGLRenderer;
  private camera!: PerspectiveCamera;
  private light!: PointLight;
  private scene!: Scene;
  private animationId!: number;

  ngAfterViewInit(): void {
    const rotatedObjects: { mesh: Object3D; velocity: number }[] = [];

    this.createRenderer();
    this.createScene();
    this.createLight();
    this.createCamera();

    const solarSystem = new THREE.Object3D();
    this.scene.add(solarSystem);

    const sphereGeometry = new THREE.SphereGeometry(1, 12, 12);

    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: '#FDB813' });
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5);
    solarSystem.add(sunMesh);

    const earthSystem = new THREE.Object3D();
    earthSystem.position.x = 20;
    solarSystem.add(earthSystem);

    const earthMaterial = new THREE.MeshPhongMaterial({
      color: '#2F6A69',
      emissive: '#000',
    });
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthMesh.scale.set(2, 2, 2);
    earthSystem.add(earthMesh);

    const moonMaterial = new THREE.MeshPhongMaterial({
      color: '#2F6A69',
      emissive: '#000',
    });
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(0.6, 0.6, 0.6);
    moonMesh.position.x = 5;
    earthSystem.add(moonMesh);

    rotatedObjects.push({ mesh: solarSystem, velocity: 1 });
    rotatedObjects.push({ mesh: earthSystem, velocity: 2 });
    rotatedObjects.push({ mesh: sunMesh, velocity: 1 });
    rotatedObjects.push({ mesh: earthMesh, velocity: 1 });
    rotatedObjects.push({ mesh: moonMesh, velocity: 1 });

    rotatedObjects.forEach(({ mesh }) => {
      const axes = new THREE.AxesHelper();
      // @ts-ignore
      axes.material.depthTest = false;
      axes.renderOrder = 1;
      mesh.add(axes);
    });

    this.renderer.render(this.scene, this.camera);

    const animate = (time: number) => {
      this.resize(this.renderer, this.camera);

      time *= 0.001;

      rotatedObjects.forEach((object) => {
        object.mesh.rotation.y = time * object.velocity;
      });

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
    this.renderer = new THREE.WebGLRenderer({ canvas });
  }

  private createCamera(): void {
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 100;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(0, 50, 0);
    this.camera.up.set(0, 0, 1);
    this.camera.lookAt(0, 0, 0);
  }

  private createLight(): void {
    this.light = new THREE.PointLight('#fff', 1);
    this.scene.add(this.light);
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
