(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{23:function(e,t,n){e.exports=n(38)},29:function(e,t,n){},30:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(12),c=n.n(o),i=n(13),s=(n(29),n(20)),l=n.n(s)()({center:[60.2,24.91],zoomLevel:8}),p=n(7),m=n(8),u=n(10),h=n(9),d=n(11),f=n(43),b=n(42),g=n(40),E=n(39),y=n(41),v=n(4),O=n.n(v),j=(n(30),function(e){function t(){return Object(p.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return this.props.position?r.a.createElement(E.a,{position:this.props.position,icon:O.a.divIcon({html:""+(this.props.counter||0),iconSize:[60,60]})},r.a.createElement(y.a,null,r.a.createElement("h1",null,this.props.position.toString()))):null}}]),t}(a.PureComponent)),k=(n(33),n(34),f.a.BaseLayer),w=function(e){function t(){return Object(p.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(m.a)(t,[{key:"onDragOver",value:function(e){console.log(e)}},{key:"render",value:function(){var e="https://{s}.{base}.maps.api.here.com/maptile/2.1/{type}/newest/",t="/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}&lg={language}",n={attribution:'Map &copy; 1987-2015 <a href="http://developer.here.com">HERE</a>',subdomains:"1234",app_id:"",app_code:"",language:"eng",base:"aerial",type:"maptile",minZoom:0,maxZoom:20},a=document.querySelector("body");if(a){var o=a.dataset;n.app_id=o.hereId,n.app_code=o.hereCode}return r.a.createElement("div",{className:"map-section",ref:"mapthing"},r.a.createElement(b.a,{center:this.props.center,ref:"leafMap",zoom:this.props.zoomLevel,className:"imagemap"},r.a.createElement(f.a,{position:"topright"},r.a.createElement(k,{checked:!0,name:"OpenStreetMap"},r.a.createElement(g.a,{url:"http://{s}.tile.osm.org/{z}/{x}/{y}.png",attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'})),r.a.createElement(k,{name:"HERE grey"},r.a.createElement(g.a,Object.assign({},n,{base:"base",url:e+"normal.day.grey"+t}))),r.a.createElement(k,{name:"HERE hybrid"},r.a.createElement(g.a,Object.assign({},n,{url:e+"hybrid.day"+t}))),r.a.createElement(k,{name:"HERE terrain"},r.a.createElement(g.a,Object.assign({},n,{url:e+"terrain.day"+t})))),r.a.createElement(j,{ref:"previewMarker",position:this.props.center})))}}]),t}(a.Component),z=(n(35),function(e){function t(){return Object(p.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("figure",{className:"image-grid-item",style:{backgroundColor:this.props.color}},r.a.createElement("img",{className:"image-grid-image",src:this.props.url,alt:this.props.url}))}}]),t}(a.PureComponent)),L=(n(36),function(e){function t(){return Object(p.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"image-grid"},this.props.images.map(function(e){return r.a.createElement(z,{url:e.url,color:e.color,key:e.key})}))}}]),t}(a.PureComponent)),C=(n(37),function(e){return{increment:function(e){return{zoomLevel:e.zoomLevel+1}},decrement:function(e){return{zoomLevel:e.zoomLevel-1}}}}),N=function(e){function t(){return Object(p.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(m.a)(t,[{key:"randomColorHex",value:function(){return"#"+Math.floor(16777215*Math.random()).toString(16)}},{key:"fillEmptyImages",value:function(e){for(var t=[],n=0;n<e;++n)t.push({url:"",key:""+n,color:this.randomColorHex()});return t}},{key:"render",value:function(){var e=this.fillEmptyImages(100);return r.a.createElement("div",{className:"App full-screen"},r.a.createElement("section",{className:"App-section section-grid"},r.a.createElement(L,{images:e})),r.a.createElement("section",{className:"App-section section-map"},r.a.createElement(w,{center:this.props.center,zoomLevel:this.props.zoomLevel})))}}]),t}(a.Component),_=Object(i.connect)(function(e){return{center:e.center,zoomLevel:e.zoomLevel}},C)(N);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(function(){return r.a.createElement(i.Provider,{store:l},r.a.createElement(_,null))},null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[23,1,2]]]);
//# sourceMappingURL=main.9880b3b1.chunk.js.map