"use strict";(self.webpackChunkthreejs_learning=self.webpackChunkthreejs_learning||[]).push([[404],{1404:(y,l,o)=>{o.r(l),o.d(l,{WavesModule:()=>C});var f=o(6895),h=o(4462),t=o(1571),i=o(6682);const g=["canvas"],p=[{path:"",component:(()=>{class e{ngAfterViewInit(){const a=this.canvasElement.nativeElement,r=new i.cPb(70,a.clientWidth/a.clientHeight,.01,10);r.position.z=10;const W=new i._12(100,100,1),c=new i.jyz({vertexShader:"#define GLSLIFY 1\nout vec3 vWorldPosition;\n\nvoid main() {\n  vec4 worldPosition = modelMatrix * vec4(position, 1.0);\n  vWorldPosition = worldPosition.xyz;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader:"#define GLSLIFY 1\nin vec3 vWorldPosition;\n\nuniform float uTime;\n\nfloat createWave(vec3 center, float waveLength, float dTime) {\n  float waveLengthHalf = waveLength / 2.0;\n  float dist = distance(vWorldPosition, center);\n  float visibleWaves = 30.0;\n  float wavePart = mod(dist - dTime, waveLength);\n  float color = smoothstep(0.0, waveLengthHalf, abs(waveLengthHalf - wavePart));\n  color *= 1.0 - smoothstep(0.0, waveLength * visibleWaves, dist);\n  return color;\n}\n\nvoid main() {\n  float waveLength = 0.4;\n  float dTime = uTime * 0.0005;\n\n  vec3 waveCenterA = vec3(-5.0, 5.0, 0.0);\n  float radialMoveA = createWave(waveCenterA, waveLength, dTime);\n\n  vec3 waveCenterB = vec3(5.0, 5.0, 0.0);\n  float radialMoveB = createWave(waveCenterB, waveLength, dTime);\n\n  vec3 waveCenterC = vec3(0.0, -5.0, 0.0);\n  float radialMoveC = createWave(waveCenterC, waveLength, dTime);\n\n  float radialMove = radialMoveA + radialMoveB + radialMoveC;\n\n  gl_FragColor = vec4(vec3(radialMove), 1.0);\n}\n",uniforms:{uTime:{value:0}}}),M=new i.Kj0(W,c),d=new i.xsS;d.add(M);const v=new i.CP7({canvas:a,antialias:!0});v.setSize(a.clientWidth,a.clientHeight),v.setAnimationLoop(function L(m){c.uniforms.uTime.value=m+=.01,v.render(d,r)}),this.renderer=v}ngOnDestroy(){this.renderer.setAnimationLoop(null)}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-template"]],viewQuery:function(n,a){if(1&n&&t.Gf(g,5,t.SBq),2&n){let r;t.iGM(r=t.CRH())&&(a.canvasElement=r.first)}},decls:2,vars:0,consts:[[1,"canvas"],["canvas",""]],template:function(n,a){1&n&&t._UZ(0,"canvas",0,1)},styles:["[_nghost-%COMP%]{position:relative;height:100%;display:grid;place-items:center;background-color:#181818}.canvas[_ngcontent-%COMP%]{display:block;width:100%;height:100%}"]}),e})()}];let C=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[f.ez,h.Bz.forChild(p)]}),e})()}}]);