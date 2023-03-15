"use strict";(self.webpackChunkthreejs_learning=self.webpackChunkthreejs_learning||[]).push([[563],{4563:(B,p,i)=>{i.r(p),i.d(p,{GlobeModule:()=>N});var F=i(6895),G=i(4462),e=i(1571),t=i(6682),P=i(9749),c=i(2144),V=i(727),x=i(4968);const Z=["canvas"],O=["canvasContainer"],R=[{path:"",component:(()=>{class o{constructor(){this.mouse=new t.FM8,this.canvasSettings={top:0,left:0,width:0,height:0},this.time=0,this.subscription=new V.w0}ngAfterViewInit(){const n=this.canvasContainerElement.nativeElement,a=this.canvasElement.nativeElement,r=a.getBoundingClientRect(),I=a.clientHeight;this.canvasSettings.width=a.clientWidth,this.canvasSettings.height=I,this.canvasSettings.top=r.top,this.canvasSettings.left=r.left;const Y={earth:(new t.dpR).load("assets/textures/earth.jpg")},w=new t.cPb(70,n.clientWidth/n.clientHeight,.01,2e3);w.position.z=3.5,this.camera=w;const y=new t.Kj0(new t.xo$(1,64,64),new t.jyz({vertexShader:"#define GLSLIFY 1\nout vec2 vertexUv;\nout vec3 vertexNormal;\n\nvoid main() {\n  vertexUv = uv;\n  vertexNormal = normalize(normalMatrix * normal);\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader:"#define GLSLIFY 1\nin vec2 vertexUv;\nin vec3 vertexNormal;\n\nuniform sampler2D uTexture;\n\nvoid main() {\n  float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));\n  vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);\n\n  vec3 color = atmosphere + texture2D(uTexture, vertexUv).xyz;\n  gl_FragColor = vec4(color, 1.0);\n}\n",uniforms:{uTexture:{value:Y.earth}}}));this.sphere=y;const b=new t.Kj0(new t.xo$(1,64,64),new t.jyz({vertexShader:"#define GLSLIFY 1\nout vec3 vertexNormal;\n\nvoid main() {\n  vertexNormal = normalize(normalMatrix * normal);\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader:"#define GLSLIFY 1\nin vec3 vertexNormal;\n\nvoid main() {\n  float intensity = pow(0.5 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 2.0);\n  vec4 color = vec4(0.3, 0.6, 1.0, 1.0);\n\n  gl_FragColor = color * intensity;\n}\n",blending:t.WMw,side:t._Li}));b.scale.addScalar(.2);const v=new t.ZAu;v.add(y),v.rotateZ(c.V.degreeToRadian(-40)),this.sphereGroup=v;const C=new t.TlE(new Float32Array(600),3),M=new t.TlE(new Float32Array(200),1);for(let s=0;s<200;s++){const g=c.V.randomFloat(-500,500),f=c.V.randomFloat(-300,300),W=c.V.randomFloat(-300,-700);C.setXYZ(s,g,f,W),M.setX(s,c.V.randomFloat(0,3.14))}const u=new t.u9r;u.setAttribute("position",C);const S=new t.jyz({vertexShader:"#define GLSLIFY 1\nattribute float vFrequency;\n\nout float vertexFrequency;\n\nvoid main() {\n  vertexFrequency = vFrequency;\n  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n  gl_PointSize = 500.0 / -mvPosition.z;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader:"#define GLSLIFY 1\nuniform float uTime;\n\nin float vertexFrequency;\n\nvoid main() {\n  vec3 color = vec3(1.0, 1.0, 1.0) * sin(vertexFrequency * uTime / 100.0);\n  gl_FragColor = vec4(color, 1.0);\n}\n",uniforms:{uTime:{value:this.time}}});u.setAttribute("vFrequency",M),this.starsMaterial=S;const H=new t.woe(u,S),h=new t.xsS;h.add(v),h.add(b),h.add(H),this.scene=h,this.subscription.add((0,x.R)(a,"mousemove").subscribe(s=>{const f=s.clientY-this.canvasSettings.top;this.mouse.x=(s.clientX-this.canvasSettings.left)/this.canvasSettings.width*2-1,this.mouse.y=-f/this.canvasSettings.height*2+1,P.ZP.to(this.sphereGroup.rotation,{duration:2,x:.1*-this.mouse.y,y:.15*this.mouse.x})})),this.subscription.add((0,x.R)(window,"resize").subscribe(()=>{const s=this.canvasContainerElement.nativeElement;this.camera.aspect=s.clientWidth/s.clientHeight,this.camera.updateProjectionMatrix()}));const d=new t.CP7({canvas:a,antialias:!0});d.setPixelRatio(window.devicePixelRatio),d.setSize(n.clientWidth,n.clientHeight),d.setAnimationLoop(this.render.bind(this)),this.renderer=d}ngOnDestroy(){this.subscription.unsubscribe(),this.renderer.setAnimationLoop(null)}render(){this.time++,this.starsMaterial.uniforms.uTime.value=this.time,this.sphere.rotation.y+=.002,this.renderer.render(this.scene,this.camera)}}return o.\u0275fac=function(n){return new(n||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-globe"]],viewQuery:function(n,a){if(1&n&&(e.Gf(Z,5,e.SBq),e.Gf(O,5,e.SBq)),2&n){let r;e.iGM(r=e.CRH())&&(a.canvasElement=r.first),e.iGM(r=e.CRH())&&(a.canvasContainerElement=r.first)}},decls:11,vars:0,consts:[[1,"content"],[1,"title"],[1,"description"],["href","https://www.youtube.com/watch?v=vM8M4QloVL0&ab_channel=ChrisCourses"],[1,"canvas-container"],["canvasContainer",""],[1,"canvas"],["canvas",""]],template:function(n,a){1&n&&(e.TgZ(0,"div",0)(1,"div",1),e._uU(2,"WebGL Earth planet with shader glowing effect"),e.qZA(),e.TgZ(3,"div",2),e._uU(4," Made watching nice and useful lesson from Chris Courses "),e.TgZ(5,"a",3),e._uU(6," Create a Globe "),e.qZA()()(),e.TgZ(7,"div",4,5),e._UZ(9,"canvas",6,7),e.qZA())},styles:["[_nghost-%COMP%]{position:relative;height:100%;display:grid;grid-template-columns:.4fr;background-color:#000;overflow:hidden}.content[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;padding:0 5vw;font-family:Segoe UI,Tahoma,Geneva,Verdana,sans-serif;color:#fff;z-index:1}.title[_ngcontent-%COMP%]{font-size:calc(16px + 2.5vw);line-height:calc(16px + 2.5vw);margin-bottom:1vw}.description[_ngcontent-%COMP%]{color:#bbb;font-size:calc(12px + 1.2vw);line-height:calc(12px + 1.2vw)}.canvas-container[_ngcontent-%COMP%]{position:absolute;inset:0}.canvas[_ngcontent-%COMP%]{display:block;max-width:100%;max-height:100%}a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:visited{text-decoration:underline;color:#bbb}a[_ngcontent-%COMP%]:hover{color:#fff}"]}),o})()}];let N=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[F.ez,G.Bz.forChild(R)]}),o})()}}]);