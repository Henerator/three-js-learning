"use strict";(self.webpackChunkthreejs_learning=self.webpackChunkthreejs_learning||[]).push([[911],{2144:(y,u,o)=>{o.d(u,{V:()=>g});class g{static randomFloat(e,n){return e+Math.random()*(n-e)}static randomSign(){return Math.random()>.5?1:-1}static degreeToRadian(e){return Math.PI/180*e}}},6911:(y,u,o)=>{o.r(u),o.d(u,{EarthCoordsModule:()=>G});var g=o(6895),x=o(4462),e=o(1571),n=o(6682),j=o(7152),C=o(2144);const U=[{name:"saratov",lat:51.54,long:46.01},{name:"minsk",lat:53.54,long:27.34},{name:"vilnius",lat:54.69,long:25.28},{name:"verona",lat:45.43,long:10.59},{name:"lisbon",lat:38.71,long:-9.13},{name:"washington",lat:38.89,long:-77.04},{name:"las-vegas",lat:36.18,long:-115.14}];var F=o(727),R=o(4968);const I=["canvas"],V=[{path:"",component:(()=>{class a{constructor(t){this.elementRef=t,this.subscription=new F.w0}ngAfterViewInit(){const t=this.elementRef.nativeElement,r=this.canvasElement.nativeElement,m={earth:(new n.dpR).load("assets/textures/earth.jpg")},l=new n.cPb(70,r.clientWidth/r.clientHeight,.01,20);l.position.z=2.5;const O=new n.Kj0(new n.xo$(1,32,32),new n.jyz({vertexShader:"#define GLSLIFY 1\nout vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader:"#define GLSLIFY 1\nin vec2 vUv;\n\nuniform sampler2D uTexture;\n\nvoid main() {\n  gl_FragColor = texture2D(uTexture, vUv);\n}\n",uniforms:{uTexture:{value:m.earth}}})),v=new n.xsS;v.add(O);const w=U.map(s=>this.getPositionOnEarth(s));w.forEach(s=>{const h=new n.Kj0(new n.xo$(.01,8,8),new n.vBJ({color:"#f00"}));h.position.set(s.x,s.y,s.z),v.add(h)});const E=new n.jyz({vertexShader:"#define GLSLIFY 1\nout vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader:"#define GLSLIFY 1\nin vec2 vUv;\n\nuniform float uTime;\n\nvoid main() {\n  float dash = sin(vUv.x * 50.0 - uTime * 0.005);\n\n  if(dash < 0.0)\n    discard;\n\n  gl_FragColor = vec4(vUv.x, 1.0, 1.0, 1.0);\n}\n",transparent:!0,side:n.ehD,uniforms:{uTime:{value:0}}});w.reduce((s,h)=>{let P=[];for(let p=0;p<=20;p++){const M=(new n.Pa4).lerpVectors(s,h,p/20);M.normalize(),M.multiplyScalar(1+.05*Math.sin(Math.PI*p/20)),P.push(M)}const B=new n.YT8(P),W=new n.Kj0(new n.WXh(B,20,.002,8,!1),E);return v.add(W),h});const d=new n.CP7({canvas:r,antialias:!0});d.setSize(t.clientWidth,t.clientHeight),d.setAnimationLoop(function Y(s){E.uniforms.uTime.value=s+=.01,d.render(v,l)}),this.renderer=d;const S=new j.z(l,this.renderer.domElement);S.target.set(0,0,0),S.update(),this.subscription.add((0,R.R)(window,"resize").subscribe(()=>{l.aspect=t.clientWidth/t.clientHeight,l.updateProjectionMatrix(),d.setSize(t.clientWidth,t.clientHeight)}))}ngOnDestroy(){this.subscription.unsubscribe(),this.renderer.setAnimationLoop(null)}getPositionOnEarth({lat:t,long:r}){const i=C.V.degreeToRadian(90-t),m=C.V.degreeToRadian(180+r);return new n.Pa4(-Math.sin(i)*Math.cos(m),Math.cos(i),Math.sin(i)*Math.sin(m))}}return a.\u0275fac=function(t){return new(t||a)(e.Y36(e.SBq))},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-earth-coords"]],viewQuery:function(t,r){if(1&t&&e.Gf(I,5,e.SBq),2&t){let i;e.iGM(i=e.CRH())&&(r.canvasElement=i.first)}},decls:2,vars:0,consts:[[1,"canvas"],["canvas",""]],template:function(t,r){1&t&&e._UZ(0,"canvas",0,1)},styles:["[_nghost-%COMP%]{position:relative;display:block;height:100%}.canvas[_ngcontent-%COMP%]{display:block;width:100%;height:100%}"]}),a})()}];let G=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[g.ez,x.Bz.forChild(V)]}),a})()}}]);