!function(D,q){"use strict";var d="ht",i=d+".graph.",N=D[d],b=N.graph,Y=N.Default,n=N.Color,C=null,t="px",U=Y.getInternal(),f=U.getPinchDist,o=Y.preventDefault,O=Y.getTouchCount,y=Y.startDragging;U.addMethod(Y,{overviewBackground:n.widgetBackground,overviewMaskBackground:n.transparent,overviewContentBorderColor:n.widgetBorder,overviewContentBackground:n.background},!0),b.Overview=function(A){var B=this,l=B._view=U.createView(1,B);B._canvas=U.createCanvas(l),l.style.background=Y.overviewBackground,l.appendChild(B._mask=U.createDiv()),B.setGraphView(A),B.addListeners()},Y.def(i+"Overview",q,{ms_v:1,ms_fire:1,ms_listener:1,ms_ac:["maskBackground","contentBorderColor","contentBackground","autoUpdate","fixToRect"],_autoUpdate:!0,_fixToRect:!1,_rate:1,_scrollRect:{x:0,y:0,width:0,height:0},_maskBackground:Y.overviewMaskBackground,_contentBorderColor:Y.overviewContentBorderColor,_contentBackground:Y.overviewContentBackground,getGraphView:function(){return this.gv},setGraphView:function(G){var z=this;if(z.gv!==G){var a=z.gv;z.gv=G,a&&(a.removeViewListener(z.handleGraphViewChanged,z),a.ump(z.handleGraphViewPropertyChanged,z)),G&&(G.addViewListener(z.handleGraphViewChanged,z),G.mp(z.handleGraphViewPropertyChanged,z)),z.fp("graphView",a,G),z.redraw()}},getCanvas:function(){return this._canvas},getMask:function(){return this._mask},dispose:function(){this.setGraphView(null)},onPropertyChanged:function(){this.redraw()},handleGraphViewChanged:function(x){this._autoUpdate&&"validate"===x.kind&&this.redraw()},handleGraphViewPropertyChanged:function(Y){("canvasBackground"===Y.property||this.getFixToRect()&&("zoom"===Y.property||"translateX"===Y.property||"translateY"===Y.property))&&this.redraw()},redraw:function(){var a=this;a._redraw||(a._redraw=1,a.iv(50))},validateImpl:function(){var u=this,d=u.gv,S=u._canvas,P=u.getWidth(),n=u.getHeight(),m=u._redraw;if(d){var x=u._mask,b=x.style,V=d.getViewRect(),A=this.getFixToRect(),Z=A?"boolean"==typeof A?d.getContentRect():A:d.getScrollRect(),K=Z.x,F=Z.y,q=Z.width,W=Z.height,D=u._rate=Math.max(q/P,W/n),c=u._x=(P-q/D)/2,E=u._y=(n-W/D)/2;if(0!==V.width&&0!==V.height||u.hasRetry||(Y.callLater(u.iv,u,C),u.hasRetry=!0),(P!==S.clientWidth||n!==S.clientHeight)&&(U.setCanvas(S,P,n),m=1),U.isSameRect(Z,u._scrollRect)||(u._scrollRect=Z,m=1),m){var f=U.initContext(S),z=d.getDataModel(),G=z.getBackground()||u._contentBackground,R=u._contentBorderColor,g=Y.devicePixelRatio;f.clearRect(0,0,P*g,n*g);var j=z.getBackground()&&z.a("width")>0&&z.a("height")>0;G&&!j&&U.fillRect(f,c*g,E*g,q/D*g,W/D*g,G),U.translateAndScale(f,-K/D+c,-F/D+E,1/D),d._42(f),f.restore(),R&&U.drawBorder(f,R,c*g,E*g,q/D*g,W/D*g)}b.background=u._maskBackground,b.left=c+(V.x-K)/D+t,b.top=E+(V.y-F)/D+t,b.width=V.width/D+t,b.height=V.height/D+t,u._redraw=null}else if(m){var f=U.initContext(S);f.clearRect(0,0,P,n),f.restore(),u._redraw=null}},center:function(l){var H=this,i=H.gv;if(i){var C=i._zoom,D=i._29I,z=H._rate,x=H._scrollRect,U=Y.getLogicalPoint(l,H._canvas),t=x.x+(U.x-H._x)*z,g=x.y+(U.y-H._y)*z;i.setTranslate((D.width/2-t)*C,(D.height/2-g)*C)}},handle_mousedown:function(r){this.handle_touchstart(r)},handleWindowMouseUp:function(q){this.handleWindowTouchEnd(q)},handleWindowMouseMove:function(J){this.handleWindowTouchMove(J)},handle_mousewheel:function(v){this.handleScroll(v,v.wheelDelta)},handle_DOMMouseScroll:function(O){2===O.axis&&this.handleScroll(O,-O.detail)},handleScroll:function(v,c){if(o(v),this.gv){var _=this.gv;c>0?_.scrollZoomIn():0>c&&_.scrollZoomOut()}},handle_touchstart:function(C){if(o(C),this.gv&&Y.isLeftButton(C)){var j=this,v=j.gv,Q=O(C);1===Q?Y.isDoubleClick(C)&&v.isResettable()?v.reset():(j.center(C),y(j,C)):2===Q&&(j._dist=f(C),y(j,C))}},handleWindowTouchEnd:function(){delete this._dist},handleWindowTouchMove:function(w){if(this.gv){var H=this,X=H._dist,y=O(w);1===y?H.center(w):2===y&&X!=C&&H.gv.handlePinch(C,f(w),X)}}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);