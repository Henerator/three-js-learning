"use strict";(self.webpackChunkthreejs_learning=self.webpackChunkthreejs_learning||[]).push([[973],{2144:(re,P,m)=>{m.d(P,{V:()=>D});class D{static randomFloat(f,C){return f+Math.random()*(C-f)}static randomSign(){return Math.random()>.5?1:-1}static randomGaussian(f=0,C=1){const A=1-Math.random(),u=Math.random();return Math.sqrt(-2*Math.log(A))*Math.cos(2*Math.PI*u)*C+f}static degreeToRadian(f){return Math.PI/180*f}}},5973:(re,P,m)=>{m.r(P),m.d(P,{GalaxyModule:()=>Ce});var D=m(6895),Y=m(4462),f=m(1571),C=m(727),A=m(4968),u=m(2144),s=m(6682),ae=m(7152);const R={uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:"\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",fragmentShader:"\n\n\t\tuniform float opacity;\n\n\t\tuniform sampler2D tDiffuse;\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tgl_FragColor = texture2D( tDiffuse, vUv );\n\t\t\tgl_FragColor.a *= opacity;\n\n\n\t\t}"};class w{constructor(){this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const oe=new s.iKG(-1,1,1,-1,0,1),B=new s.u9r;B.setAttribute("position",new s.a$l([-1,3,0,-1,-1,0,3,-1,0],3)),B.setAttribute("uv",new s.a$l([0,2,0,0,2,0],2));class k{constructor(e){this._mesh=new s.Kj0(B,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,oe)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class U extends w{constructor(e,t){super(),this.textureID=void 0!==t?t:"tDiffuse",e instanceof s.jyz?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=s.rDY.clone(e.uniforms),this.material=new s.jyz({defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new k(this.material)}render(e,t,r){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class W extends w{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,r){const a=e.getContext(),i=e.state;let o,h;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0),this.inverse?(o=0,h=1):(o=1,h=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),i.buffers.stencil.setFunc(a.ALWAYS,o,4294967295),i.buffers.stencil.setClear(h),i.buffers.stencil.setLocked(!0),e.setRenderTarget(r),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(a.EQUAL,1,4294967295),i.buffers.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),i.buffers.stencil.setLocked(!0)}}class ne extends w{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class F{constructor(e,t){if(this.renderer=e,void 0===t){const r=e.getSize(new s.FM8);this._pixelRatio=e.getPixelRatio(),this._width=r.width,this._height=r.height,(t=new s.dd2(this._width*this._pixelRatio,this._height*this._pixelRatio)).texture.name="EffectComposer.rt1"}else this._pixelRatio=1,this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],void 0===R&&console.error("THREE.EffectComposer relies on CopyShader"),void 0===U&&console.error("THREE.EffectComposer relies on ShaderPass"),this.copyPass=new U(R),this.clock=new s.SUY}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);-1!==t&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){void 0===e&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let r=!1;for(let a=0,i=this.passes.length;a<i;a++){const o=this.passes[a];if(!1!==o.enabled){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(a),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,r),o.needsSwap){if(r){const h=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(h.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(h.EQUAL,1,4294967295)}this.swapBuffers()}void 0!==W&&(o instanceof W?r=!0:o instanceof ne&&(r=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(void 0===e){const t=this.renderer.getSize(new s.FM8);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,(e=this.renderTarget1.clone()).setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const r=this._width*this._pixelRatio,a=this._height*this._pixelRatio;this.renderTarget1.setSize(r,a),this.renderTarget2.setSize(r,a);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(r,a)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}new s.iKG(-1,1,1,-1,0,1);const V=new s.u9r;V.setAttribute("position",new s.a$l([-1,3,0,-1,-1,0,3,-1,0],3)),V.setAttribute("uv",new s.a$l([0,2,0,0,2,0],2));class he extends w{constructor(e,t,r,a,i){super(),this.scene=e,this.camera=t,this.overrideMaterial=r,this.clearColor=a,this.clearAlpha=void 0!==i?i:0,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new s.Ilk}render(e,t,r){const a=e.autoClear;let i,o;e.autoClear=!1,void 0!==this.overrideMaterial&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor&&(e.getClearColor(this._oldClearColor),i=e.getClearAlpha(),e.setClearColor(this.clearColor,this.clearAlpha)),this.clearDepth&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:r),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor&&e.setClearColor(this._oldClearColor,i),void 0!==this.overrideMaterial&&(this.scene.overrideMaterial=o),e.autoClear=a}}const N={shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new s.Ilk(0)},defaultOpacity:{value:0}},vertexShader:"\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",fragmentShader:"\n\n\t\tuniform sampler2D tDiffuse;\n\t\tuniform vec3 defaultColor;\n\t\tuniform float defaultOpacity;\n\t\tuniform float luminosityThreshold;\n\t\tuniform float smoothWidth;\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvec4 texel = texture2D( tDiffuse, vUv );\n\n\t\t\tvec3 luma = vec3( 0.299, 0.587, 0.114 );\n\n\t\t\tfloat v = dot( texel.xyz, luma );\n\n\t\t\tvec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );\n\n\t\t\tfloat alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );\n\n\t\t\tgl_FragColor = mix( outputColor, texel, alpha );\n\n\t\t}"};class T extends w{constructor(e,t,r,a){super(),this.strength=void 0!==t?t:1,this.radius=r,this.threshold=a,this.resolution=void 0!==e?new s.FM8(e.x,e.y):new s.FM8(256,256),this.clearColor=new s.Ilk(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new s.dd2(i,o),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let p=0;p<this.nMips;p++){const S=new s.dd2(i,o);S.texture.name="UnrealBloomPass.h"+p,S.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(S);const v=new s.dd2(i,o);v.texture.name="UnrealBloomPass.v"+p,v.texture.generateMipmaps=!1,this.renderTargetsVertical.push(v),i=Math.round(i/2),o=Math.round(o/2)}void 0===N&&console.error("THREE.UnrealBloomPass relies on LuminosityHighPassShader");const h=N;this.highPassUniforms=s.rDY.clone(h.uniforms),this.highPassUniforms.luminosityThreshold.value=a,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new s.jyz({uniforms:this.highPassUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,defines:{}}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];i=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let p=0;p<this.nMips;p++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[p])),this.separableBlurMaterials[p].uniforms.texSize.value=new s.FM8(i,o),i=Math.round(i/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1,this.compositeMaterial.needsUpdate=!0,this.compositeMaterial.uniforms.bloomFactors.value=[1,.8,.6,.4,.2],this.bloomTintColors=[new s.Pa4(1,1,1),new s.Pa4(1,1,1),new s.Pa4(1,1,1),new s.Pa4(1,1,1),new s.Pa4(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,void 0===R&&console.error("THREE.UnrealBloomPass relies on CopyShader");const g=R;this.copyUniforms=s.rDY.clone(g.uniforms),this.copyUniforms.opacity.value=1,this.materialCopy=new s.jyz({uniforms:this.copyUniforms,vertexShader:g.vertexShader,fragmentShader:g.fragmentShader,blending:s.WMw,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new s.Ilk,this.oldClearAlpha=1,this.basic=new s.vBJ,this.fsQuad=new k(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.materialCopy.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let r=Math.round(e/2),a=Math.round(t/2);this.renderTargetBright.setSize(r,a);for(let i=0;i<this.nMips;i++)this.renderTargetsHorizontal[i].setSize(r,a),this.renderTargetsVertical[i].setSize(r,a),this.separableBlurMaterials[i].uniforms.texSize.value=new s.FM8(r,a),r=Math.round(r/2),a=Math.round(a/2)}render(e,t,r,a,i){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),i&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=r.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let h=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this.fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=h.texture,this.separableBlurMaterials[c].uniforms.direction.value=T.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=T.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this.fsQuad.render(e),h=this.renderTargetsVertical[c];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,i&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(r),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){return new s.jyz({defines:{KERNEL_RADIUS:e,SIGMA:e},uniforms:{colorTexture:{value:null},texSize:{value:new s.FM8(.5,.5)},direction:{value:new s.FM8(.5,.5)}},vertexShader:"varying vec2 vUv;\n\t\t\t\tvoid main() {\n\t\t\t\t\tvUv = uv;\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\t}",fragmentShader:"#include <common>\n\t\t\t\tvarying vec2 vUv;\n\t\t\t\tuniform sampler2D colorTexture;\n\t\t\t\tuniform vec2 texSize;\n\t\t\t\tuniform vec2 direction;\n\n\t\t\t\tfloat gaussianPdf(in float x, in float sigma) {\n\t\t\t\t\treturn 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;\n\t\t\t\t}\n\t\t\t\tvoid main() {\n\t\t\t\t\tvec2 invSize = 1.0 / texSize;\n\t\t\t\t\tfloat fSigma = float(SIGMA);\n\t\t\t\t\tfloat weightSum = gaussianPdf(0.0, fSigma);\n\t\t\t\t\tvec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;\n\t\t\t\t\tfor( int i = 1; i < KERNEL_RADIUS; i ++ ) {\n\t\t\t\t\t\tfloat x = float(i);\n\t\t\t\t\t\tfloat w = gaussianPdf(x, fSigma);\n\t\t\t\t\t\tvec2 uvOffset = direction * invSize * x;\n\t\t\t\t\t\tvec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;\n\t\t\t\t\t\tvec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;\n\t\t\t\t\t\tdiffuseSum += (sample1 + sample2) * w;\n\t\t\t\t\t\tweightSum += 2.0 * w;\n\t\t\t\t\t}\n\t\t\t\t\tgl_FragColor = vec4(diffuseSum/weightSum, 1.0);\n\t\t\t\t}"})}getCompositeMaterial(e){return new s.jyz({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:"varying vec2 vUv;\n\t\t\t\tvoid main() {\n\t\t\t\t\tvUv = uv;\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\t}",fragmentShader:"varying vec2 vUv;\n\t\t\t\tuniform sampler2D blurTexture1;\n\t\t\t\tuniform sampler2D blurTexture2;\n\t\t\t\tuniform sampler2D blurTexture3;\n\t\t\t\tuniform sampler2D blurTexture4;\n\t\t\t\tuniform sampler2D blurTexture5;\n\t\t\t\tuniform float bloomStrength;\n\t\t\t\tuniform float bloomRadius;\n\t\t\t\tuniform float bloomFactors[NUM_MIPS];\n\t\t\t\tuniform vec3 bloomTintColors[NUM_MIPS];\n\n\t\t\t\tfloat lerpBloomFactor(const in float factor) {\n\t\t\t\t\tfloat mirrorFactor = 1.2 - factor;\n\t\t\t\t\treturn mix(factor, mirrorFactor, bloomRadius);\n\t\t\t\t}\n\n\t\t\t\tvoid main() {\n\t\t\t\t\tgl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );\n\t\t\t\t}"})}}T.BlurDirectionX=new s.FM8(1,0),T.BlurDirectionY=new s.FM8(0,1);const O={percentage:[76.45,12.1,7.6,3,.6,.13],color:[16764015,16765601,16774378,16316415,13293567,11190271],size:[.7,.7,1.15,1.48,2,2.5,3.5]},pe=(new s.dpR).load("assets/textures/galaxy/feathered60.png"),ve=new s.xeV({map:pe,color:"#0082ff",opacity:.2,depthTest:!1,depthWrite:!1});class H{constructor(e){this.position=e}toSceneObject(e){const t=new s.jyi(ve);t.layers.set(0),t.position.copy(this.position),t.scale.multiplyScalar(s.M8C.clamp(50*Math.random(),20,50)),this.obj=t,e.add(t)}updateScale(e){const t=this.position.distanceTo(e.position)/250;this.obj.material.opacity=s.M8C.clamp(.2*Math.pow(t/2.5,2),0,.2)}}const Se=(new s.dpR).load("assets/textures/galaxy/sprite120.png"),Te=O.color.map(n=>new s.xeV({map:Se,color:n}));class j{constructor(e){this.position=e,this.obj=null,this.type=this.generateStarType()}get typeSize(){return O.size[this.type]}toSceneObject(e){const t=new s.jyi(Te[this.type]);t.layers.set(1),t.position.copy(this.position),t.scale.multiplyScalar(this.typeSize),this.obj=t,e.add(t)}updateScale(e){const r=this.position.distanceTo(e.position)/250*this.typeSize,a=s.M8C.clamp(r,.25,5);this.obj?.scale.set(a,a,a)}generateStarType(){const e=O.percentage;let t=100*Math.random();for(let r=0;r<e.length;r++)if(t-=e[r],t<0)return r;return 0}}const be=["canvas"],Me=[{path:"",component:(()=>{class n{constructor(t){this.elementRef=t,this.subscription=new C.w0}ngAfterViewInit(){const t=this.elementRef.nativeElement,r=this.canvasElement.nativeElement,a=new s.cPb(60,r.clientWidth/r.clientHeight,.01,1e5);a.position.set(0,450,450),a.up.set(0,0,1),a.lookAt(0,0,0);const i=new s.xsS,o=new s.CP7({canvas:r,antialias:!0,logarithmicDepthBuffer:!0});o.outputEncoding=s.knz,o.toneMapping=s.LY2,o.toneMappingExposure=.5,o.setSize(r.clientWidth,r.clientHeight),o.setAnimationLoop(function we(){E.forEach(l=>l.updateScale(a)),z.forEach(l=>l.updateScale(a)),a.layers.set(1),x.render(),a.layers.set(2),g.render(),a.layers.set(0),S.render()}),this.renderer=o;const h=new he(i,a),c=new T(new s.FM8(r.clientWidth,r.clientHeight),1.5,.4,.85);c.threshold=.4,c.strength=1.5,c.radius=0;const x=new F(o);x.renderToScreen=!1,x.addPass(h),x.addPass(c);const g=new F(o);g.renderToScreen=!1,g.addPass(h);const p=new U(new s.jyz({uniforms:{baseTexture:{value:null},bloomTexture:{value:x.renderTarget2.texture},overlayTexture:{value:g.renderTarget2.texture}},vertexShader:"#define GLSLIFY 1\nout vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader:"#define GLSLIFY 1\nin vec2 vUv;\n\nuniform sampler2D baseTexture;\nuniform sampler2D bloomTexture;\nuniform sampler2D overlayTexture;\n\nvoid main() {\n  vec4 baseLayer = texture2D(baseTexture, vUv);\n  vec4 bloomLayer = vec4(1.0) * texture2D(bloomTexture, vUv);\n  vec4 overlayLayer = vec4(0.25) * texture2D(overlayTexture, vUv);\n\n  gl_FragColor = baseLayer + bloomLayer + overlayLayer;\n}\n",defines:{}}),"baseTexture");p.needsSwap=!0;const S=new F(o);S.addPass(h),S.addPass(p);const v=new ae.z(a,this.renderer.domElement);v.enableDamping=!0,v.dampingFactor=.05,v.minDistance=1,v.maxDistance=16384,v.maxPolarAngle=u.V.degreeToRadian(89),v.update();const E=[];for(let l=0;l<750;l++){const d=new j(new s.Pa4(u.V.randomGaussian(0,33),u.V.randomGaussian(0,33),u.V.randomGaussian(0,5)));d.toSceneObject(i),E.push(d)}for(let l=0;l<750;l++){const d=new j(new s.Pa4(u.V.randomGaussian(0,100),u.V.randomGaussian(0,100),u.V.randomGaussian(0,5)));d.toSceneObject(i),E.push(d)}for(let l=0;l<2;l++)for(let d=0;d<750;d++){const Q=this.spiral(u.V.randomGaussian(200,100),u.V.randomGaussian(100,50),u.V.randomGaussian(0,5),2*l*Math.PI/2),y=new j(Q);y.toSceneObject(i),E.push(y)}const z=[];for(let l=0;l<750;l++){const d=new H(new s.Pa4(u.V.randomGaussian(0,33),u.V.randomGaussian(0,33),u.V.randomGaussian(0,5)));d.toSceneObject(i),z.push(d)}for(let l=0;l<750;l++){const d=new H(new s.Pa4(u.V.randomGaussian(0,100),u.V.randomGaussian(0,100),u.V.randomGaussian(0,5)));d.toSceneObject(i),z.push(d)}for(let l=0;l<2;l++)for(let d=0;d<750;d++){const Q=this.spiral(u.V.randomGaussian(200,100),u.V.randomGaussian(100,50),u.V.randomGaussian(0,5),2*l*Math.PI/2),y=new H(Q);y.toSceneObject(i),z.push(y)}this.subscription.add((0,A.R)(window,"resize").subscribe(()=>{a.aspect=t.clientWidth/t.clientHeight,a.updateProjectionMatrix(),o.setSize(t.clientWidth,t.clientHeight)}))}ngOnDestroy(){this.subscription.unsubscribe(),this.renderer.setAnimationLoop(null)}spiral(t,r,a,i){const o=Math.sqrt(t**2+r**2);let h=i;return h+=t>0?Math.atan(r/t):Math.atan(r/t)+Math.PI,h+=o/100*4,new s.Pa4(o*Math.cos(h),o*Math.sin(h),a)}}return n.\u0275fac=function(t){return new(t||n)(f.Y36(f.SBq))},n.\u0275cmp=f.Xpm({type:n,selectors:[["app-galaxy"]],viewQuery:function(t,r){if(1&t&&f.Gf(be,5,f.SBq),2&t){let a;f.iGM(a=f.CRH())&&(r.canvasElement=a.first)}},decls:2,vars:0,consts:[[1,"canvas"],["canvas",""]],template:function(t,r){1&t&&f._UZ(0,"canvas",0,1)},styles:["[_nghost-%COMP%]{position:relative;height:100%;display:grid;place-items:center;background-color:#181818}.canvas[_ngcontent-%COMP%]{display:block;width:100%;height:100%}"]}),n})()}];let Ce=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=f.oAB({type:n}),n.\u0275inj=f.cJS({imports:[D.ez,Y.Bz.forChild(Me)]}),n})()}}]);