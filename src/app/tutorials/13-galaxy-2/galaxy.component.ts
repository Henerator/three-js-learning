import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { MathHelper } from 'src/app/math/math';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import fragmentShader from './shader-fragment.glsl';
import vertexShader from './shader-vertex.glsl';

interface CloudSettings {
  minRadius: number;
  maxRadius: number;
  amplitude: number;
  color: string;
  size: number;
}

@Component({
  selector: 'app-galaxy-2',
  templateUrl: './galaxy.component.html',
  styleUrls: ['./galaxy.component.scss'],
})
export class GalaxyComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { read: ElementRef }) canvasElement!: ElementRef;

  private renderer!: THREE.WebGLRenderer;
  private subscription = new Subscription();

  constructor(private elementRef: ElementRef) {}

  async ngAfterViewInit(): Promise<void> {
    // getting wrong top position in BoundingClientRect on route change
    // previous route's component still visible and shifts current route component down
    // make timeout to fix it
    await new Promise((resolve) => setTimeout(resolve));

    const container = this.elementRef.nativeElement as HTMLElement;
    const canvas = this.canvasElement.nativeElement as HTMLCanvasElement;

    const containerRect = container.getBoundingClientRect();

    const textureLoader = new THREE.TextureLoader();
    const textures = {
      particle: textureLoader.load('assets/textures/glow-circle.jpg'),
    };

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const mousePoint = new THREE.Vector3(-20, 0, 20);

    const raycasterPlane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(10, 10, 10, 10).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: '#f00', wireframe: true })
    );

    const camera = new THREE.PerspectiveCamera(
      65,
      container.clientWidth / container.clientHeight,
      0.01,
      1000
    );
    camera.position.set(0, 0.7, 2);

    const scene = new THREE.Scene();

    const materials: THREE.ShaderMaterial[] = [];
    const particleGeometry = new THREE.PlaneBufferGeometry(1, 1);

    function addCloud(settings: CloudSettings) {
      const count = 5000;
      const minRadius = settings.minRadius;
      const maxRadius = settings.maxRadius;
      const geometry = new THREE.InstancedBufferGeometry();
      geometry.instanceCount = count;
      geometry.setAttribute('position', particleGeometry.getAttribute('position'));
      geometry.index = particleGeometry.index;

      const instancePositions = new THREE.InstancedBufferAttribute(
        new Float32Array(count * 3),
        3,
        false
      );
      for (let index = 0; index < count; index++) {
        const angle = MathHelper.randomRadian();
        const radius = THREE.MathUtils.lerp(minRadius, maxRadius, Math.random());

        instancePositions.setXYZ(
          index,
          radius * Math.sin(angle),
          MathHelper.randomFloat(-0.5, 0.5) * 0.2,
          radius * Math.cos(angle)
        );
      }

      geometry.setAttribute('instancePosition', instancePositions);

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
        transparent: true,
        depthTest: false,
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: mousePoint },
          uSize: { value: settings.size },
          uColor: { value: new THREE.Color(settings.color) },
          uAmplitude: { value: settings.amplitude },
          uTexture: { value: textures.particle },
        },
      });
      const mesh = new THREE.Mesh(geometry, material);
      materials.push(material);

      scene.add(mesh);
    }

    const cloudSettings: CloudSettings[] = [
      { minRadius: 0.4, maxRadius: 1.5, amplitude: 1, color: '#FFAC41', size: 0.6 },
      { minRadius: 0.3, maxRadius: 1.5, amplitude: 3, color: '#FFF', size: 0.3 },
    ];

    cloudSettings.forEach((cloudSetting) => addCloud(cloudSetting));

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor('#000');
    renderer.setAnimationLoop(animation);
    this.renderer = renderer;

    const controls = new OrbitControls(camera, this.renderer.domElement);
    controls.update();

    this.subscription.add(
      fromEvent(window, 'resize').subscribe(() => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      })
    );

    this.subscription.add(
      fromEvent<MouseEvent>(container, 'mousemove').subscribe((event) => {
        const x = event.clientX - containerRect.left;
        const y = event.clientY - containerRect.top;

        pointer.x = (x / containerRect.width) * 2 - 1;
        pointer.y = -(y / containerRect.height) * 2 + 1;

        raycaster.setFromCamera(pointer, camera);

        const intersect = raycaster.intersectObjects([raycasterPlane])[0];

        if (intersect) {
          mousePoint.copy(intersect.point);
        }
      })
    );

    function animation(time: number) {
      materials.forEach((material) => {
        material.uniforms['uTime'].value = time;
        material.uniforms['uMouse'].value = mousePoint;
      });

      renderer.render(scene, camera);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.renderer.setAnimationLoop(null);
  }
}
