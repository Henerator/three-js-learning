"use strict";(self.webpackChunkthreejs_learning=self.webpackChunkthreejs_learning||[]).push([[899],{8899:(b,h,c)=>{c.r(h),c.d(h,{FundamentalsModule:()=>z});var w=c(6895),F=c(4462),o=c(1571),s=c(6682);const y=["canvas"],M=[{path:"",component:(()=>{class t{ngAfterViewInit(){const a=new s.CP7({canvas:this.canvasElement.nativeElement}),m=new s.cPb(75,2,.1,5);m.position.z=2;const f=new s.Ox3("#fff",1);f.position.set(-1,2,4);const v=[this.createCube("#3a5a40",-2),this.createCube("#049EF4",0),this.createCube("#d3a91e",2)],d=new s.xsS;d.background=new s.Ilk("#111"),d.add(...v),d.add(f),a.render(d,m);const g=u=>{u*=.001,this.resize(a,m),v.forEach(C=>{C.rotation.x=u,C.rotation.y=u}),a.render(d,m),this.animationId=window.requestAnimationFrame(g)};this.animationId=window.requestAnimationFrame(g)}ngOnDestroy(){cancelAnimationFrame(this.animationId)}createCube(n,a){const e=new s.DvJ(1,1,1),r=new s.xoR({color:n}),i=new s.Kj0(e,r);return i.position.x=a,i}resize(n,a){const e=n.domElement,r=e.clientWidth,i=e.clientHeight;(e.width!==r||e.height!==i)&&(n.setSize(r,i,!1),a.aspect=e.clientWidth/e.clientHeight,a.updateProjectionMatrix())}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-fundamentals"]],viewQuery:function(n,a){if(1&n&&o.Gf(y,5,o.SBq),2&n){let e;o.iGM(e=o.CRH())&&(a.canvasElement=e.first)}},decls:2,vars:0,consts:[[1,"canvas"],["canvas",""]],template:function(n,a){1&n&&o._UZ(0,"canvas",0,1)},styles:["[_nghost-%COMP%]{position:relative;height:100%;display:grid;place-items:center;background-color:#181818}.canvas[_ngcontent-%COMP%]{display:block;width:100%;height:100%}"]}),t})()}];let z=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[w.ez,F.Bz.forChild(M)]}),t})()}}]);