import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MathHelper } from 'src/app/math/math';

import vertexShader from './shader-vertex.glsl';
import fragmentShader from './shader-fragment.glsl';
import pathVertexShader from './shader-path-vertex.glsl';
import pathFragmentShader from './shader-path-fragment.glsl';
import { GeoCoords } from './geo-coords.interface';
import { cities } from './cities.const';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-earth-coords',
  templateUrl: './earth-coords.component.html',
  styleUrls: ['./earth-coords.component.scss'],
})
export class EarthCoordsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { read: ElementRef }) canvasElement!: ElementRef;

  private renderer!: THREE.WebGLRenderer;
  private subscription = new Subscription();

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const container = this.elementRef.nativeElement as HTMLElement;
    const canvas = this.canvasElement.nativeElement as HTMLCanvasElement;

    const textureLoader = new THREE.TextureLoader();
    const textures = {
      earth: textureLoader.load('assets/textures/earth.jpg'),
    };

    let time = 0;

    const camera = new THREE.PerspectiveCamera(
      70,
      canvas.clientWidth / canvas.clientHeight,
      0.01,
      20
    );
    camera.position.z = 2.5;

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
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

    const scene = new THREE.Scene();
    scene.add(earth);

    const cityPositions = cities.map((city) => this.getPositionOnEarth(city));

    cityPositions.forEach((cityCoords) => {
      const cityMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.01, 8, 8),
        new THREE.MeshBasicMaterial({
          color: '#f00',
        })
      );
      cityMesh.position.set(cityCoords.x, cityCoords.y, cityCoords.z);
      scene.add(cityMesh);
    });

    const tubeMaterial = new THREE.ShaderMaterial({
      vertexShader: pathVertexShader,
      fragmentShader: pathFragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: {
          value: time,
        },
      },
    });

    const lerpSteps = 20;
    cityPositions.reduce((prev, current) => {
      let points = [];
      for (let index = 0; index <= lerpSteps; index++) {
        const stepPoint = new THREE.Vector3().lerpVectors(
          prev,
          current,
          index / lerpSteps
        );
        stepPoint.normalize();
        stepPoint.multiplyScalar(
          1 + Math.sin((Math.PI * index) / lerpSteps) * 0.05
        );
        points.push(stepPoint);
      }

      const tubePath = new THREE.CatmullRomCurve3(points);
      const tubeMesh = new THREE.Mesh(
        new THREE.TubeGeometry(tubePath, 20, 0.002, 8, false),
        tubeMaterial
      );
      scene.add(tubeMesh);

      return current;
    });

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setAnimationLoop(animation);
    this.renderer = renderer;

    const controls = new OrbitControls(camera, this.renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    this.subscription.add(
      fromEvent(window, 'resize').subscribe(() => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      })
    );

    function animation(time: number) {
      time += 0.01;
      tubeMaterial.uniforms['uTime'].value = time;

      renderer.render(scene, camera);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.renderer.setAnimationLoop(null);
  }

  private getPositionOnEarth({ lat, long }: GeoCoords): THREE.Vector3 {
    const phi = MathHelper.degreeToRadian(90 - lat);
    const theta = MathHelper.degreeToRadian(180 + long);
    return new THREE.Vector3(
      -(Math.sin(phi) * Math.cos(theta)),
      Math.cos(phi),
      Math.sin(phi) * Math.sin(theta)
    );
  }
}
