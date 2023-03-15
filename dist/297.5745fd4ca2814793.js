"use strict";(self.webpackChunkthreejs_learning=self.webpackChunkthreejs_learning||[]).push([[297],{4297:(S,f,a)=>{a.r(f),a.d(f,{RainDropEffectModule:()=>x});var v=a(6895),h=a(4462),g=a(5861),i=a(1571),o=a(6682),y=a(7152);const R=["canvas"],w=[{path:"",component:(()=>{class n{ngAfterViewInit(){var e=this;return(0,g.Z)(function*(){e.createRenderer(),e.createScene(),e.createLight(),e.createCamera();const r=new y.z(e.camera,e.renderer.domElement);r.target.set(0,0,0),r.update();const s=yield(new o.dpR).loadAsync("assets/textures/night-city.jpg"),E=new o._12(10/(s.image.height/s.image.width),10,1,1),F=new o.jyz({vertexShader:"#define GLSLIFY 1\nout vec2 uvInterpolator;\n\nvoid main() {\n  uvInterpolator = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader:"#define GLSLIFY 1\nin vec2 uvInterpolator;\nuniform float u_time;\nuniform sampler2D u_texture;\n\nfloat getRandom(float inputValue, float seed) {\n  return fract(sin(inputValue * 321.123) * seed);\n}\n\nfloat getRandomByV2(vec2 inputValue, float seed) {\n  return fract(sin(dot(inputValue, vec2(123.321, 45.64))) * seed);\n}\n\nvec2 getDrop(vec2 uv, float seed) {\n  float shiftY = getRandom(0.5, seed);\n  uv.y += shiftY;\n\n  float cellsResolution = 10.0;\n  uv *= cellsResolution;\n\n  float row = floor(uv.y);\n  float shiftX = getRandom(row, seed);\n  uv.x += shiftX;\n\n  vec2 cellIndex = floor(uv);\n  vec2 cellUv = fract(uv);\n\n  vec2 cellCenter = vec2(0.5);\n  float distanceFromCenter = distance(cellUv, cellCenter);\n  float isInsideDrop = 1.0 - step(0.1, distanceFromCenter);\n\n  float isDropShown = step(0.8, getRandomByV2(cellIndex, seed + 2123.232));\n\n  float dropIntensity = 1.0 - fract(u_time * 0.1 + getRandomByV2(cellIndex, seed + 3221.232) * 2.0) * 2.0;\n  dropIntensity = sign(dropIntensity) * abs(dropIntensity * dropIntensity * dropIntensity * dropIntensity);\n  dropIntensity = clamp(dropIntensity, 0.0, 1.0);\n\n  vec2 vecToCenter = normalize(cellCenter - cellUv);\n  vec2 dropValue = vecToCenter * distanceFromCenter * distanceFromCenter * 60.0;\n  vec2 drop = dropValue * isDropShown * dropIntensity * isInsideDrop;\n\n  return drop;\n}\n\nvoid main() {\n  vec2 uv = uvInterpolator;\n  vec2 drop = getDrop(uv, 43423.262);\n  for(int i = 0; i < 10; i++) {\n    drop += getDrop(uv, 1232.42 + float(i) * 31212.675);\n  }\n  uv += drop;\n  vec4 color = texture2D(u_texture, uv);\n  gl_FragColor = color;\n}\n",uniforms:{u_time:{value:0},u_texture:{value:s}}}),u=new o.Kj0(E,F);e.scene.add(u),e.renderer.render(e.scene,e.camera);const p=m=>{e.resize(e.renderer,e.camera),u.material.uniforms.u_time.value=m*=.001,e.renderer.render(e.scene,e.camera),e.animationId=window.requestAnimationFrame(p)};e.animationId=window.requestAnimationFrame(p)})()}ngOnDestroy(){cancelAnimationFrame(this.animationId)}createRenderer(){this.renderer=new o.CP7({canvas:this.canvasElement.nativeElement})}createCamera(){this.camera=new o.cPb(75,2,.1,100),this.camera.position.set(0,0,7)}createLight(){const e=new o.Ox3("#fff",1);e.position.set(-1,2,4),this.scene.add(e)}createScene(){this.scene=new o.xsS,this.scene.background=new o.Ilk("#111")}resize(e,r){const t=e.domElement,s=t.clientWidth,l=t.clientHeight;(t.width!==s||t.height!==l)&&(e.setSize(s,l,!1),r.aspect=t.clientWidth/t.clientHeight,r.updateProjectionMatrix())}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=i.Xpm({type:n,selectors:[["app-rain-drop-effect"]],viewQuery:function(e,r){if(1&e&&i.Gf(R,5,i.SBq),2&e){let t;i.iGM(t=i.CRH())&&(r.canvasElement=t.first)}},decls:2,vars:0,consts:[[1,"canvas"],["canvas",""]],template:function(e,r){1&e&&i._UZ(0,"canvas",0,1)},styles:["[_nghost-%COMP%]{position:relative;height:100%;display:grid;place-items:center;background-color:#181818}.canvas[_ngcontent-%COMP%]{display:block;width:100%;height:100%}"]}),n})()}];let x=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=i.oAB({type:n}),n.\u0275inj=i.cJS({imports:[v.ez,h.Bz.forChild(w)]}),n})()}}]);