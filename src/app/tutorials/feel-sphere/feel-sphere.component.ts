import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import * as dat from 'dat.gui';
import * as THREE from 'three';

@Component({
  selector: 'app-feel-sphere',
  templateUrl: './feel-sphere.component.html',
  styleUrls: ['./feel-sphere.component.scss'],
})
export class FeelSphereComponent implements AfterViewInit {
  @ViewChild('canvas', { read: ElementRef }) canvasElement!: ElementRef;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngAfterViewInit(): void {
    const gui = new dat.GUI();

    // Loaders
    const textureLoader = new THREE.TextureLoader();

    const normalTexture = textureLoader.load('assets/normal-map/golf-ball.png');

    // Scene
    const scene = new THREE.Scene();

    // Objects
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);

    // Materials

    const material = new THREE.MeshStandardMaterial();
    material.metalness = 0.7;
    material.roughness = 0.2;
    material.color = new THREE.Color(0x292929);
    material.normalMap = normalTexture;

    // Mesh

    const sphere = new THREE.Mesh(sphereGeometry, material);
    scene.add(sphere);

    // Lights

    const pointLight1 = new THREE.PointLight(0xffffff, 0.1);
    pointLight1.position.set(0.4, 0, 2);
    scene.add(pointLight1);

    const pointLightHelper1 = new THREE.PointLightHelper(pointLight1, 0.2);
    // scene.add(pointLightHelper1);

    const light1GuiFolder = gui.addFolder('Main light');
    light1GuiFolder.add(pointLight1.position, 'y').min(-3).max(3).step(0.01);
    light1GuiFolder.add(pointLight1.position, 'x').min(-3).max(3).step(0.01);
    light1GuiFolder.add(pointLight1.position, 'z').min(-4).max(4).step(0.01);
    light1GuiFolder.add(pointLight1, 'intensity').min(0).max(10).step(0.01);

    const pointLight2 = new THREE.PointLight(0xff0000, 8);
    pointLight2.position.set(-1.86, 1.5, -1.65);
    scene.add(pointLight2);

    const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 0.2);
    // scene.add(pointLightHelper2);

    const light2GuiFolder = gui.addFolder('Light 1');
    light2GuiFolder.add(pointLight2.position, 'y').min(-3).max(3).step(0.01);
    light2GuiFolder.add(pointLight2.position, 'x').min(-3).max(3).step(0.01);
    light2GuiFolder.add(pointLight2.position, 'z').min(-3).max(3).step(0.01);
    light2GuiFolder.add(pointLight2, 'intensity').min(0).max(10).step(0.01);

    const light2ColorGui = { color: 0xff0000 };
    light2GuiFolder.addColor(light2ColorGui, 'color').onChange(() => {
      pointLight2.color.set(light2ColorGui.color);
    });

    const pointLight3 = new THREE.PointLight(0x96ff, 8);
    pointLight3.position.set(1.86, -1.5, -1.65);
    scene.add(pointLight3);

    const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 0.2);
    // scene.add(pointLightHelper3);

    const light3GuiFolder = gui.addFolder('Light 2');
    light3GuiFolder.add(pointLight3.position, 'y').min(-3).max(3).step(0.01);
    light3GuiFolder.add(pointLight3.position, 'x').min(-3).max(3).step(0.01);
    light3GuiFolder.add(pointLight3.position, 'z').min(-3).max(3).step(0.01);
    light3GuiFolder.add(pointLight3, 'intensity').min(0).max(10).step(0.01);

    const light3ColorGui = { color: 0x96ff };
    light3GuiFolder.addColor(light3ColorGui, 'color').onChange(() => {
      pointLight3.color.set(light3ColorGui.color);
    });

    /**
     * Sizes
     */
    const sizes = {
      width: this.document.body.clientWidth,
      height: this.document.body.clientHeight,
    };

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = this.document.body.clientWidth;
      sizes.height = this.document.body.clientHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * Camera
     */
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 2;
    scene.add(camera);

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvasElement.nativeElement,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /**
     * Animate
     */

    let mouseX = 0;
    let mouseY = 0;

    let targetX = 0;
    let targetY = 0;

    const centerX = sizes.width / 2;
    const centerY = sizes.height / 2;

    this.document.addEventListener('mousemove', (event: MouseEvent) => {
      mouseX = event.clientX - centerX;
      mouseY = event.clientY - centerY;
    });

    const clock = new THREE.Clock();

    const animate = () => {
      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;

      const elapsedTime = clock.getElapsedTime();

      // Update objects
      sphere.rotation.y = 0.5 * elapsedTime;

      sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
      sphere.rotation.x += 0.3 * (targetY - sphere.rotation.x);
      // sphere.rotation.z += -0.3 * (targetY - sphere.rotation.x);

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(animate);
    };

    animate();
  }
}
