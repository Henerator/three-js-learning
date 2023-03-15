import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import gsap from 'gsap';

import vertexShader from './shader-vertex.glsl';
import fragmentShader from './shader-fragment.glsl';
import atmosphereVertexShader from './shader-atmosphere-vertex.glsl';
import atmosphereFragmentShader from './shader-atmosphere-fragment.glsl';
import starVertexShader from './shader-star-vertex.glsl';
import starFragmentShader from './shader-star-fragment.glsl';
import { MathHelper } from 'src/app/math/math';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.html',
  styleUrls: ['./globe.component.scss'],
})
export class GlobeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { read: ElementRef }) canvasElement!: ElementRef;
  @ViewChild('canvasContainer', { read: ElementRef })
  canvasContainerElement!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private mouse = new THREE.Vector2();
  private canvasSettings = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  };
  private sphere!: THREE.Mesh;
  private sphereGroup!: THREE.Group;
  private starsMaterial!: THREE.ShaderMaterial;
  private time = 0;

  private subscription = new Subscription();

  ngAfterViewInit(): void {
    const container = this.canvasContainerElement.nativeElement as HTMLElement;
    const canvas = this.canvasElement.nativeElement as HTMLCanvasElement;
    const canvasRect = canvas.getBoundingClientRect();
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    this.canvasSettings.width = width;
    this.canvasSettings.height = height;
    this.canvasSettings.top = canvasRect.top;
    this.canvasSettings.left = canvasRect.left;

    const textureLoader = new THREE.TextureLoader();
    const textures = {
      earth: textureLoader.load('assets/textures/earth.jpg'),
    };

    const camera = new THREE.PerspectiveCamera(
      70,
      container.clientWidth / container.clientHeight,
      0.01,
      2000
    );
    camera.position.z = 3.5;
    this.camera = camera;

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexture: {
            value: textures.earth,
          },
        },
      })
    );
    this.sphere = sphere;

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.0, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
      })
    );
    atmosphere.scale.addScalar(0.2);

    const group = new THREE.Group();
    group.add(sphere);
    group.rotateZ(MathHelper.degreeToRadian(-40));
    this.sphereGroup = group;

    // start
    const starsNumber = 200;
    const starsPositions = new THREE.BufferAttribute(
      new Float32Array(starsNumber * 3),
      3
    );
    const starsFrequencies = new THREE.BufferAttribute(
      new Float32Array(starsNumber),
      1
    );

    for (let i = 0; i < starsNumber; i++) {
      const x = MathHelper.randomFloat(-500, 500);
      const y = MathHelper.randomFloat(-300, 300);
      const z = MathHelper.randomFloat(-300, -700);
      starsPositions.setXYZ(i, x, y, z);
      starsFrequencies.setX(i, MathHelper.randomFloat(0.0, 3.14));
    }

    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute('position', starsPositions);

    const starsMaterial = new THREE.ShaderMaterial({
      vertexShader: starVertexShader,
      fragmentShader: starFragmentShader,
      uniforms: {
        uTime: {
          value: this.time,
        },
      },
    });
    starsGeometry.setAttribute('vFrequency', starsFrequencies);
    this.starsMaterial = starsMaterial;
    const stars = new THREE.Points(starsGeometry, starsMaterial);

    const scene = new THREE.Scene();
    scene.add(group);
    scene.add(atmosphere);
    scene.add(stars);
    this.scene = scene;

    this.subscription.add(
      fromEvent<MouseEvent>(canvas, 'mousemove').subscribe((event) => {
        const x = event.clientX - this.canvasSettings.left;
        const y = event.clientY - this.canvasSettings.top;

        this.mouse.x = (x / this.canvasSettings.width) * 2 - 1;
        this.mouse.y = -(y / this.canvasSettings.height) * 2 + 1;

        gsap.to(this.sphereGroup.rotation, {
          duration: 2,
          x: -this.mouse.y * 0.1,
          y: this.mouse.x * 0.15,
        });
      })
    );

    this.subscription.add(
      fromEvent(window, 'resize').subscribe(() => {
        const container = this.canvasContainerElement.nativeElement;
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
      })
    );

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setAnimationLoop(this.render.bind(this));
    this.renderer = renderer;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.renderer.setAnimationLoop(null);
  }

  private render(): void {
    this.time++;
    this.starsMaterial.uniforms['uTime'].value = this.time;

    this.sphere.rotation.y += 0.002;

    this.renderer.render(this.scene, this.camera);
  }
}
