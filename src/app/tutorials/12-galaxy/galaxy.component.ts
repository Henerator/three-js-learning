import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { MathHelper } from 'src/app/math/math';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import {
  ARMS,
  ARM_X_DIST,
  ARM_X_MEAN,
  ARM_Y_DIST,
  ARM_Y_MEAN,
  CORE_X_DIST,
  CORE_Y_DIST,
  GALAXY_THICKNESS,
  OUTER_CORE_X_DIST,
  OUTER_CORE_Y_DIST,
  SPIRAL,
  STARS_COUNT,
} from './galaxy-config.const';
import { Haze } from './haze';
import {
  BASE_LAYER,
  BLOOM_LAYER,
  BLOOM_PARAMS,
  OVERLAY_LAYER,
} from './render-config.const';
import compositionFragmentShader from './shader-composition-fragment.glsl';
import compositionVertexShader from './shader-composition-vertex.glsl';
import { Star } from './star';

@Component({
  selector: 'app-galaxy',
  templateUrl: './galaxy.component.html',
  styleUrls: ['./galaxy.component.scss'],
})
export class GalaxyComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { read: ElementRef }) canvasElement!: ElementRef;

  private renderer!: THREE.WebGLRenderer;
  private subscription = new Subscription();

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const container = this.elementRef.nativeElement as HTMLElement;
    const canvas = this.canvasElement.nativeElement as HTMLCanvasElement;

    const camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.01,
      100000
    );
    camera.position.set(0, 450, 450);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      logarithmicDepthBuffer: true,
    });
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setAnimationLoop(animation);
    this.renderer = renderer;

    const renderScene = new RenderPass(scene, camera);

    // Rendering pass for bloom
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(canvas.clientWidth, canvas.clientHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = BLOOM_PARAMS.bloomThreshold;
    bloomPass.strength = BLOOM_PARAMS.bloomStrength;
    bloomPass.radius = BLOOM_PARAMS.bloomRadius;

    // bloom composer
    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);

    // overlay composer
    const overlayComposer = new EffectComposer(renderer);
    overlayComposer.renderToScreen = false;
    overlayComposer.addPass(renderScene);

    // Shader pass to combine base layer, bloom, and overlay layers
    const finalPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: bloomComposer.renderTarget2.texture },
          overlayTexture: { value: overlayComposer.renderTarget2.texture },
        },
        vertexShader: compositionVertexShader,
        fragmentShader: compositionFragmentShader,
        defines: {},
      }),
      'baseTexture'
    );
    finalPass.needsSwap = true;

    // base layer composer
    const baseComposer = new EffectComposer(renderer);
    baseComposer.addPass(renderScene);
    baseComposer.addPass(finalPass);

    const controls = new OrbitControls(camera, this.renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1;
    controls.maxDistance = 16384;
    controls.maxPolarAngle = MathHelper.degreeToRadian(90 - 1);
    controls.update();

    const stars: Star[] = [];
    for (let index = 0; index < STARS_COUNT / 4; index++) {
      const star = new Star(
        new THREE.Vector3(
          MathHelper.randomGaussian(0, CORE_X_DIST),
          MathHelper.randomGaussian(0, CORE_Y_DIST),
          MathHelper.randomGaussian(0, GALAXY_THICKNESS)
        )
      );
      star.toSceneObject(scene);
      stars.push(star);
    }
    for (let index = 0; index < STARS_COUNT / 4; index++) {
      const star = new Star(
        new THREE.Vector3(
          MathHelper.randomGaussian(0, OUTER_CORE_X_DIST),
          MathHelper.randomGaussian(0, OUTER_CORE_Y_DIST),
          MathHelper.randomGaussian(0, GALAXY_THICKNESS)
        )
      );
      star.toSceneObject(scene);
      stars.push(star);
    }
    for (let arm = 0; arm < ARMS; arm++) {
      for (let index = 0; index < STARS_COUNT / 4; index++) {
        const spiralPosition = this.spiral(
          MathHelper.randomGaussian(ARM_X_MEAN, ARM_X_DIST),
          MathHelper.randomGaussian(ARM_Y_MEAN, ARM_Y_DIST),
          MathHelper.randomGaussian(0, GALAXY_THICKNESS),
          (arm * 2 * Math.PI) / ARMS
        );

        const star = new Star(spiralPosition);
        star.toSceneObject(scene);
        stars.push(star);
      }
    }

    const hazes: Haze[] = [];
    for (let index = 0; index < STARS_COUNT / 4; index++) {
      const haze = new Haze(
        new THREE.Vector3(
          MathHelper.randomGaussian(0, CORE_X_DIST),
          MathHelper.randomGaussian(0, CORE_Y_DIST),
          MathHelper.randomGaussian(0, GALAXY_THICKNESS)
        )
      );
      haze.toSceneObject(scene);
      hazes.push(haze);
    }
    for (let index = 0; index < STARS_COUNT / 4; index++) {
      const haze = new Haze(
        new THREE.Vector3(
          MathHelper.randomGaussian(0, OUTER_CORE_X_DIST),
          MathHelper.randomGaussian(0, OUTER_CORE_Y_DIST),
          MathHelper.randomGaussian(0, GALAXY_THICKNESS)
        )
      );
      haze.toSceneObject(scene);
      hazes.push(haze);
    }
    for (let arm = 0; arm < ARMS; arm++) {
      for (let index = 0; index < STARS_COUNT / 4; index++) {
        const spiralPosition = this.spiral(
          MathHelper.randomGaussian(ARM_X_MEAN, ARM_X_DIST),
          MathHelper.randomGaussian(ARM_Y_MEAN, ARM_Y_DIST),
          MathHelper.randomGaussian(0, GALAXY_THICKNESS),
          (arm * 2 * Math.PI) / ARMS
        );

        const haze = new Haze(spiralPosition);
        haze.toSceneObject(scene);
        hazes.push(haze);
      }
    }

    this.subscription.add(
      fromEvent(window, 'resize').subscribe(() => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      })
    );

    function animation() {
      stars.forEach((star) => star.updateScale(camera));
      hazes.forEach((haze) => haze.updateScale(camera));

      // Render bloom
      camera.layers.set(BLOOM_LAYER);
      bloomComposer.render();

      // Render overlays
      camera.layers.set(OVERLAY_LAYER);
      overlayComposer.render();

      // Render normal
      camera.layers.set(BASE_LAYER);
      baseComposer.render();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.renderer.setAnimationLoop(null);
  }

  private spiral(
    x: number,
    y: number,
    z: number,
    offset: number
  ): THREE.Vector3 {
    const r = Math.sqrt(x ** 2 + y ** 2);
    let theta = offset;
    theta += x > 0 ? Math.atan(y / x) : Math.atan(y / x) + Math.PI;
    theta += (r / ARM_X_DIST) * SPIRAL;
    return new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), z);
  }
}
