import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import gsap from 'gsap';

import vertexShader from './shader-vertex.glsl';
import fragmentShader from './shader-fragment.glsl';
import { MathHelper } from 'src/app/math/math';

@Component({
  selector: 'app-particles-image',
  templateUrl: './particles-image.component.html',
  styleUrls: ['./particles-image.component.scss'],
})
export class ParticlesImageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { read: ElementRef }) canvasElement!: ElementRef;

  private canvas!: HTMLCanvasElement;
  private raycaster = new THREE.Raycaster();
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private material!: THREE.ShaderMaterial;
  private raycasterPlane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1200, 1000),
    new THREE.MeshBasicMaterial()
  );

  private offsetStep = 0;
  private pointer = new THREE.Vector2();
  private mouse = new THREE.Vector2();
  private canvasSettings = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  };
  private settings = {
    transition: 0,
  };

  private bindedOnScroll = this.onScroll.bind(this);
  private bindedOnMouseMove = this.onMouseMove.bind(this);
  private bindedOnMouseDown = this.onMouseDown.bind(this);
  private bindedOnMouseUp = this.onMouseUp.bind(this);

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement as HTMLElement;

    const gui = new dat.GUI({ autoPlace: false });
    gui.add(this.settings, 'transition', 0, 1, 0.01);
    element.append(gui.domElement);

    const canvas = this.canvasElement.nativeElement as HTMLCanvasElement;
    const canvasRect = canvas.getBoundingClientRect();
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    this.canvas = canvas;
    this.canvasSettings.width = width;
    this.canvasSettings.height = height;
    this.canvasSettings.top = canvasRect.top;
    this.canvasSettings.left = canvasRect.left;

    const textureLoader = new THREE.TextureLoader();
    const textures = {
      minion: textureLoader.load('assets/textures/minion.png'),
      particle: textureLoader.load('assets/textures/particle-cloud.png'),
    };

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 3000);
    this.camera.position.z = 800;

    // vertixes
    const resolution = 512;
    const halfResolution = resolution / 2;

    const count = resolution * resolution; // 262'144 particles
    const positions = new THREE.BufferAttribute(new Float32Array(count * 3), 3);
    const coordinates = new THREE.BufferAttribute(
      new Float32Array(count * 3),
      3
    );
    const speeds = new THREE.BufferAttribute(new Float32Array(count), 1);
    const offsets = new THREE.BufferAttribute(new Float32Array(count), 1);
    const frequencies = new THREE.BufferAttribute(new Float32Array(count), 1);
    const amplitudes = new THREE.BufferAttribute(new Float32Array(count), 1);

    let vertexIndex = 0;
    for (let y = 0, row = -halfResolution; row < halfResolution; y++, row++) {
      for (let x = 0, col = -halfResolution; col < halfResolution; x++, col++) {
        positions.setXYZ(vertexIndex, col, row, 0);
        coordinates.setXYZ(vertexIndex, x, y, 0);
        offsets.setX(vertexIndex, MathHelper.randomFloat(-1000, 1000));
        speeds.setX(vertexIndex, MathHelper.randomFloat(0.4, 1));
        frequencies.setX(vertexIndex, MathHelper.randomFloat(0.4, 1));
        amplitudes.setX(vertexIndex, MathHelper.randomSign());
        vertexIndex++;
      }
    }

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        gResolution: { value: resolution },
        gTextureParticle: { value: textures.particle },
        gTextureImage: { value: textures.minion },
        gTime: { value: 0 },
        gOffsetStep: { value: 0 },
        gMouse: { value: this.mouse },
        gApplyEffect: { value: 0 },
        gTransition: { value: this.settings.transition },
      },
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    // geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', positions);
    geometry.setAttribute('vCoordinate', coordinates);
    geometry.setAttribute('vSpeed', speeds);
    geometry.setAttribute('vOffset', offsets);
    geometry.setAttribute('vFrequency', frequencies);
    geometry.setAttribute('vAmplitude', amplitudes);

    // mesh
    const mesh = new THREE.Points(geometry, this.material);

    // scene
    this.scene = new THREE.Scene();
    this.scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(width, height);
    renderer.setAnimationLoop(this.render.bind(this));
    this.renderer = renderer;

    // controls
    window.addEventListener('mousewheel', this.bindedOnScroll);
    this.canvas.addEventListener('mousemove', this.bindedOnMouseMove);
    this.canvas.addEventListener('mousedown', this.bindedOnMouseDown);
    this.canvas.addEventListener('mouseup', this.bindedOnMouseUp);
  }

  ngOnDestroy(): void {
    this.renderer.setAnimationLoop(null);
    this.canvas.removeEventListener('mousemove', this.bindedOnMouseMove);
    this.canvas.removeEventListener('mousedown', this.bindedOnMouseDown);
    this.canvas.removeEventListener('mouseup', this.bindedOnMouseUp);
    window.removeEventListener('mousewheel', this.bindedOnScroll);
  }

  private render(time: number): void {
    this.raycaster.setFromCamera(this.pointer, this.camera);

    this.material.uniforms['gTime'].value = time / 10;
    this.material.uniforms['gOffsetStep'].value = this.offsetStep;
    this.material.uniforms['gTransition'].value = this.settings.transition;

    this.renderer.render(this.scene, this.camera);
  }

  private onScroll(event: Event): void {
    const delta = (event as WheelEvent).deltaY;
    this.offsetStep += delta / 2;
  }

  private onMouseMove(event: MouseEvent): void {
    const x = event.clientX - this.canvasSettings.left;
    const y = event.clientY - this.canvasSettings.top;

    this.pointer.x = (x / this.canvasSettings.width) * 2 - 1;
    this.pointer.y = -(y / this.canvasSettings.height) * 2 + 1;

    const intersect = this.raycaster.intersectObjects([this.raycasterPlane])[0];
    this.mouse.x = intersect?.point?.x || 0;
    this.mouse.y = intersect?.point?.y || 0;

    this.material.uniforms['gMouse'].value = this.mouse;
  }

  private onMouseDown(): void {
    gsap.to(this.material.uniforms['gApplyEffect'], {
      duration: 1,
      ease: 'elastic.out(1.0, 0.3)',
      value: 1,
    });
  }

  private onMouseUp(): void {
    gsap.to(this.material.uniforms['gApplyEffect'], {
      duration: 1,
      value: 0,
    });
  }
}
