import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { MathHelper } from 'src/app/math/math';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import fragmentShader from './shader-fragment.glsl';
import vertexShader from './shader-vertex.glsl';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { read: ElementRef }) canvasElement!: ElementRef;

  private renderer!: THREE.WebGLRenderer;
  private subscription = new Subscription();

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const container = this.elementRef.nativeElement as HTMLElement;
    const canvas = this.canvasElement.nativeElement as HTMLCanvasElement;

    const textureLoader = new THREE.TextureLoader();
    const textures = {
      cityMap: textureLoader.load('assets/textures/voltfordrive/city-map.jpg'),
    };

    const svgMap = container.querySelector('[data-id="svg-map"]');
    const svgMapSize = {
      width: Number(svgMap?.getAttribute('width')) || 0,
      height: Number(svgMap?.getAttribute('height')) || 0,
    };

    const svgPathsNodes = svgMap ? svgMap.querySelectorAll('.svg-map-path') : [];
    const svgPaths = [...svgPathsNodes] as SVGGeometryElement[];

    const pointFrequency = 10;
    const centerOffset = {
      x: -svgMapSize.width / 2,
      y: -svgMapSize.height / 2,
    };
    const randomOffsetSize = 4;
    const lines: Array<{
      id: number;
      path: SVGGeometryElement;
      length: number;
      count: number;
      points: THREE.Vector3[];
      currentPos: number;
      speed: number;
    }> = [];

    svgPaths.forEach((path, pathId) => {
      if (pathId % 2 === 0) return;
      const length = path.getTotalLength();
      const count = Math.floor(length / pointFrequency);
      const points = [];

      for (let index = 0; index < count; index++) {
        const distance = (length * index) / count;
        const point = path.getPointAtLength(distance);
        const randomOffset = {
          x: MathHelper.randomFloat(-randomOffsetSize, randomOffsetSize),
          y: MathHelper.randomFloat(-randomOffsetSize, randomOffsetSize),
        };

        points.push(
          new THREE.Vector3(
            point.x + centerOffset.x + randomOffset.x,
            point.y + centerOffset.y + randomOffset.y,
            0
          )
        );
      }

      lines.push({
        id: pathId,
        path,
        length,
        count,
        points,
        currentPos: 0,
        speed: 1,
      });
    });

    const linePointsCount = 45;
    const particlesCount = lines.length * linePointsCount;
    const positionsArray = new Float32Array(particlesCount * 3);
    const opacityArray = new Float32Array(particlesCount);

    const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
    const opacityAttribute = new THREE.BufferAttribute(opacityArray, 1);

    const camera = new THREE.PerspectiveCamera(
      70,
      container.clientWidth / container.clientHeight,
      0.01,
      10000
    );
    camera.position.z = 700;

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', positionsAttribute);
    geometry.setAttribute('opacity', opacityAttribute);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const mesh = new THREE.Points(geometry, material);

    const cityMapMaterial = new THREE.MeshBasicMaterial({
      color: '#1a52d3',
      map: textures.cityMap,
      transparent: true,
    });
    cityMapMaterial.opacity = 0.2;
    textures.cityMap.flipY = false;
    const mapMesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(2048, 1024, 1, 1),
      cityMapMaterial
    );

    const scene = new THREE.Scene();
    scene.add(mesh);
    scene.add(mapMesh);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor('#111');
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

    let frame = 0;

    function animation(time: number) {
      frame++;
      if (frame % 2 === 0) return;

      let particleIndex = 0;

      lines.forEach((line) => {
        line.currentPos += line.speed;
        line.currentPos = line.currentPos % line.count;

        for (let index = 0; index < linePointsCount; index++) {
          let pointIndex = (line.currentPos + index) % line.count;
          let point = line.points[pointIndex];
          positionsAttribute.setXYZ(particleIndex, point.x, point.y, point.z);
          opacityAttribute.setX(particleIndex, index / 45 + MathHelper.randomFloat(-0.3, 0.3));
          particleIndex++;
        }
      });

      geometry.setAttribute('position', positionsAttribute);
      geometry.attributes['position'].needsUpdate = true;

      renderer.render(scene, camera);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.renderer.setAnimationLoop(null);
  }
}
