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

@Component({
  selector: 'app-custom-geometry',
  templateUrl: './custom-geometry.component.html',
  styleUrls: ['./custom-geometry.component.scss'],
})
export class CustomGeometryComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { read: ElementRef }) canvasElement!: ElementRef;

  private renderer!: WebGLRenderer;
  private camera!: PerspectiveCamera;
  private scene!: Scene;
  private animationId!: number;

  ngAfterViewInit(): void {
    this.createRenderer();
    this.createScene();
    this.createLight(-1, 2, 4);
    this.createLight(2, -2, 3);
    this.createCamera();

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    const segmentsAround = 24;
    const segmentsDown = 16;
    const { positions, indices } = this.makeSpherePositions(
      segmentsAround,
      segmentsDown
    );
    const normals = positions.slice();

    const geometry = new THREE.BufferGeometry();
    const positionNumComponents = 3;
    const normalNumComponents = 3;

    const positionAttribute = new THREE.BufferAttribute(
      positions,
      positionNumComponents
    );
    positionAttribute.setUsage(THREE.DynamicDrawUsage);

    geometry.setAttribute('position', positionAttribute);
    geometry.setAttribute(
      'normal',
      new THREE.BufferAttribute(normals, normalNumComponents)
    );
    geometry.setIndex(indices);

    const material = new THREE.MeshPhongMaterial({
      color: '#dd0000',
      side: THREE.DoubleSide,
      shininess: 100,
    });

    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = 0;
    this.scene.add(sphere);

    this.renderer.render(this.scene, this.camera);

    const temp = new THREE.Vector3();

    const animate = (time: number) => {
      this.resize(this.renderer, this.camera);

      time *= 0.001;

      for (let i = 0; i < positions.length; i += 3) {
        const quad = (i / 12) | 0;
        const ringId = (quad / segmentsAround) | 0;
        const ringQuadId = quad % segmentsAround;
        const ringU = ringQuadId / segmentsAround;
        const angle = ringU * Math.PI * 2;
        temp.fromArray(normals, i);
        temp.multiplyScalar(
          THREE.MathUtils.lerp(
            1,
            1.4,
            Math.sin(time + ringId + angle) * 0.2 + 0.5
          )
        );
        temp.toArray(positions, i);
      }
      positionAttribute.needsUpdate = true;

      sphere.rotation.y = time * 0.2;

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
    this.camera.position.set(0, 0, 3);
  }

  private createLight(...position: [number, number, number]): void {
    const light = new THREE.DirectionalLight('#fff', 1);
    light.position.set(...position);
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

  private makeSpherePositions(segmentsAround: number, segmentsDown: number) {
    const numVertices = segmentsAround * segmentsDown * 6;
    const numComponents = 3;
    const positions = new Float32Array(numVertices * numComponents);
    const indices = [];

    const getPoint = this.createSpherePointGetter();

    let posNdx = 0;
    let ndx = 0;

    for (let down = 0; down < segmentsDown; ++down) {
      const v0 = down / segmentsDown;
      const v1 = (down + 1) / segmentsDown;
      const lat0 = (v0 - 0.5) * Math.PI;
      const lat1 = (v1 - 0.5) * Math.PI;

      for (let across = 0; across < segmentsAround; ++across) {
        const u0 = across / segmentsAround;
        const u1 = (across + 1) / segmentsAround;
        const long0 = u0 * Math.PI * 2;
        const long1 = u1 * Math.PI * 2;

        positions.set(getPoint(lat0, long0), posNdx);
        posNdx += numComponents;
        positions.set(getPoint(lat1, long0), posNdx);
        posNdx += numComponents;
        positions.set(getPoint(lat0, long1), posNdx);
        posNdx += numComponents;
        positions.set(getPoint(lat1, long1), posNdx);
        posNdx += numComponents;

        indices.push(ndx, ndx + 1, ndx + 2, ndx + 2, ndx + 1, ndx + 3);
        ndx += 4;
      }
    }

    return { positions, indices };
  }

  private createSpherePointGetter(): (lat: number, long: number) => number[] {
    const longHelper = new THREE.Object3D();
    const latHelper = new THREE.Object3D();
    const pointHelper = new THREE.Object3D();

    longHelper.add(latHelper);
    latHelper.add(pointHelper);
    pointHelper.position.z = 1;

    const temp = new THREE.Vector3();

    return (lat: number, long: number) => {
      latHelper.rotation.x = lat;
      longHelper.rotation.y = long;
      longHelper.updateMatrixWorld(true);
      return pointHelper.getWorldPosition(temp).toArray();
    };
  }
}
