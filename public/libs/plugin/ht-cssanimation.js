!function(s,O,z){"use strict";var n,t,Y="ht",v=s[Y],q=v.Default,W=q.getInternal(),R=W.addEventListener,L=W.removeEventListener,p=["transitionend","webkitTransitionEnd"],M=null,U=s.parseInt,r=s.isNaN,b={linear:"cubic-bezier(0.250, 0.250, 0.750, 0.750)",ease:"cubic-bezier(0.250, 0.100, 0.250, 1.000)","ease-in":"cubic-bezier(0.420, 0.000, 1.000, 1.000)","ease-out":"cubic-bezier(0.000, 0.000, 0.580, 1.000)","ease-in-out":"cubic-bezier(0.420, 0.000, 0.580, 1.000)","ease-in-quad":"cubic-bezier(0.550, 0.085, 0.680, 0.530)","ease-in-cubic":"cubic-bezier(0.550, 0.055, 0.675, 0.190)","ease-in-quart":"cubic-bezier(0.895, 0.030, 0.685, 0.220)","ease-in-quint":"cubic-bezier(0.755, 0.050, 0.855, 0.060)","ease-in-sine":"cubic-bezier(0.470, 0.000, 0.745, 0.715)","ease-in-expo":"cubic-bezier(0.950, 0.050, 0.795, 0.035)","ease-in-circ":"cubic-bezier(0.600, 0.040, 0.980, 0.335)","ease-in-back":"cubic-bezier(0.600, -0.280, 0.735, 0.045)","ease-out-quad":"cubic-bezier(0.250, 0.460, 0.450, 0.940)","ease-out-cubic":"cubic-bezier(0.215, 0.610, 0.355, 1.000)","ease-out-quart":"cubic-bezier(0.165, 0.840, 0.440, 1.000)","ease-out-quint":"cubic-bezier(0.230, 1.000, 0.320, 1.000)","ease-out-sine":"cubic-bezier(0.390, 0.575, 0.565, 1.000)","ease-out-expo":"cubic-bezier(0.190, 1.000, 0.220, 1.000)","ease-out-circ":"cubic-bezier(0.075, 0.820, 0.165, 1.000)","ease-out-back":"cubic-bezier(0.175, 0.885, 0.320, 1.275)","ease-in-out-quad":"cubic-bezier(0.455, 0.030, 0.515, 0.955)","ease-in-out-cubic":"cubic-bezier(0.645, 0.045, 0.355, 1.000)","ease-in-out-quart":"cubic-bezier(0.770, 0.000, 0.175, 1.000)","ease-in-out-quint":"cubic-bezier(0.860, 0.000, 0.070, 1.000)","ease-in-out-sine":"cubic-bezier(0.445, 0.050, 0.550, 0.950)","ease-in-out-expo":"cubic-bezier(1.000, 0.000, 0.000, 1.000)","ease-in-out-circ":"cubic-bezier(0.785, 0.135, 0.150, 0.860)","ease-in-out-back":"cubic-bezier(0.680, -0.550, 0.265, 1.550)"},Q=q.animate=function(D){var r=this;return r instanceof Q?("string"==typeof D&&(D=document.querySelector(D)),n===z&&(n=function(){var f={webkitTransform:"-webkit-transform",msTransform:"-ms-transform",transform:"transform"},t=document.createElement("p");for(var I in f)if(M!=t.style[I])return f[I];return M}()),t===z&&(t=function(){var U=document.body.style;return"transition"in U||"webkitTransition"in U}()),r._el=D,r.$1m={},r.$2m=[],r.$3m=[],r.duration(),r.$4m=new v.Notifier,void 0):new Q(D)};q.def(Q,O,{transform:function(W){var i=this;return i.$3m.push(W),"-webkit-transform"===n?(i.$5m(n,i.$3m.join(" ")),i.$6m(n),i.$5m("transform",i.$3m.join(" ")),i.$6m("transform")):(i.$5m(n,i.$3m.join(" ")),i.$6m(n)),i},translate:function(T,Q){T=T==M?0:T,Q=Q==M?0:Q;var d=r(T)?T:T+"px",s=r(Q)?Q:Q+"px";return this.transform("translate("+d+", "+s+")")},translateX:function($){return $=$==M?0:$,$=r($)?$:$+"px",this.transform("translateX("+$+")")},tx:function(y){this.translateX(y)},translateY:function(m){return m=m==M?0:m,m=r(m)?m:m+"px",this.transform("translateY("+m+")")},ty:function(u){this.translateY(u)},scale:function(Z,W){return Z=r(Z)?1:Z,W=W==M||r(W)?Z:W,this.transform("scale("+Z+", "+W+")")},scaleX:function(v){return v=r(v)?1:v,this.transform("scaleX("+v+")")},scaleY:function(X){return X=r(X)?1:X,this.transform("scaleY("+X+")")},rotate:function(B){return B=U(B)||0,this.transform("rotate("+B+"deg)")},skew:function(r,p){return r=U(r)||0,p=U(p)||0,this.transform("skew("+r+"deg, "+p+"deg)")},skewX:function(L){return L=U(L)||0,this.transform("skewX("+L+"deg)")},skewY:function(P){return P=U(P)||0,this.transform("skewY("+P+"deg)")},$7m:function(z){this._el.$17m=z;for(var K=0;K<p.length;K++)R(this._el,p[K],z)},$8m:function(k){for(var w=0;w<p.length;w++)L(this._el,p[w],k);delete this._el.$17m},$9m:function(b){function V(){T.$8m(V),b.apply(I,arguments)}var T=this,I=T._el;I.$17m&&T.$8m(I.$17m),T.$7m(V)},$5m:function(Y,t){this.$1m[Y]=t},$10m:function(){var h=this.$1m,u=this._el.style;for(var G in h){var r=h[G];if(G.indexOf("transition-property")>=0){var S=u.getPropertyValue(G);S&&(S.indexOf(r)>=0?r=S:r.indexOf(S)>=0||(r=S+", "+r))}u.setProperty(G,r)}},$11m:function(h,F){this.$5m("-webkit-"+h,F),this.$5m(h,F)},$12m:function(){var j=this._el.style;j.webkitTransition=j.transition=""},duration:function($){return r($)&&($=200),this.$14m=$,this.$11m("transition-duration",$+"ms"),this},delay:function(B){return B=U(B)||0,this.$11m("transition-delay",B+"ms"),this},ease:function(S){return S=b[S]||S||"ease",this.$11m("transition-timing-function",S),this},$6m:function(v){this.$2m.indexOf(v)<0&&this.$2m.push(v)},set:function(j,S){return this.$5m(j,S),this.$6m(j),this},then:function(B){var u=this,f=this.$4m;if(!(B instanceof Q)){var V=new Q(u._el);return V.$3m=this.$3m.slice(0),u.then(V),V.$15m=u,u.$16m=V,V}return f.add(function(J){"end"===J.kind&&B.end(u.$13m)}),this},pop:function(){return this.$15m},end:function(X){var n=this,l=n.$4m;n.$11m("transition-property",n.$2m.join(", ")),n.$10m(),X&&(n.$13m=X);var j=function(P){n.$12m(),l.fire({kind:"end"}),n.$16m||n.$13m&&n.$13m.call(n,P)};0!==n.$14m&&t?n.$9m(function(W){q.callLater(function(){j(W)},M,M,0)}):j({target:n._el,mock:1})}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);