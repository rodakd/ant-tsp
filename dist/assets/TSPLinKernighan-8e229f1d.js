var j=Object.defineProperty;var G=(w,f,m)=>f in w?j(w,f,{enumerable:!0,configurable:!0,writable:!0,value:m}):w[f]=m;var c=(w,f,m)=>(G(w,typeof f!="symbol"?f+"":f,m),m);(function(){"use strict";const m=(s,t)=>{const e=s[0],r=t[0],n=s[1],i=t[1],a=6371e3,d=n*Math.PI/180,M=i*Math.PI/180,S=(i-n)*Math.PI/180,h=(r-e)*Math.PI/180,g=Math.sin(S/2)*Math.sin(S/2)+Math.cos(d)*Math.cos(M)*Math.sin(h/2)*Math.sin(h/2),T=2*Math.atan2(Math.sqrt(g),Math.sqrt(1-g));return a*T/1e3},x=(s,t)=>{let e=0;for(let r=0;r<t.length-1;r++){const n=t[r],i=t[r+1];e+=s[n][i]}return e+=s[t[t.length-1]][t[0]],e},U=s=>{const t=[];for(let e=0;e<s.length;e++){t[e]=[];for(let r=0;r<s.length;r++)t[e][r]=m(s[e],s[r])}return t},B=s=>{const t=[];for(let e=0;e<s;e++)t.push(e);return k(t)},I=(s,t)=>{const e=[];return s.forEach(r=>{e.push(t[r])}),e.push(t[s[0]]),e},C=s=>{const t=s.length,e=new Array(t).fill(-1);for(let r=0;r<t;r++)e[s[r]]=s[(r+1)%t];return e},_=s=>{const t=s.length,e=new Array(t).fill(-1);let r=0;for(let n=0;n<t;n++)e[n]=r,r=s[r];return e},k=s=>{let t=s.length,e;for(;t!=0;)e=Math.floor(Math.random()*t),t--,[s[t],s[e]]=[s[e],s[t]];return s},N=s=>{const t=[];for(let e=0;e<s.length;e++){const r=s[e];let n=!0;for(let i=e+1;i<s.length;i++){const a=s[i];if(r[0]===a[0]&&r[1]===a[1]){n=!1;break}}n&&t.push(r)}return t.forEach(e=>{e[0]=Number(e[0].toFixed(6)),e[1]=Number(e[1].toFixed(6))}),t};function y(s){postMessage(s)}const F=s=>{let t=new A;onmessage=async e=>{var n;if(!((n=e==null?void 0:e.data)!=null&&n.type))return;const r=e.data;switch(r.type){case"run":t=new A,t.params=r.params,t.markers=N(r.markers),t.speedPercent=r.speedPercent,t.iterationsLimit=r.iterationsLimit,t.performanceMode=r.performanceMode,s(t).catch(i=>{if(i!=="Stopped")throw i});break;case"stop":t.running=!1;break;case"pause":t.paused=!0;break;case"resume":t.paused=!1;break;case"changeSpeed":t.speedPercent=r.speedPercent}}};class A{constructor(){c(this,"bestTour",[]);c(this,"params",{});c(this,"markers",[]);c(this,"iteration",0);c(this,"paused",!1);c(this,"running",!0);c(this,"cost",1/0);c(this,"performanceMode",!1);c(this,"speedPercent",60);c(this,"iterationsLimit",null);c(this,"bestToursHistory",[]);c(this,"lastGetBestTour",null);c(this,"lastTourUpdate",0);c(this,"lastIterationUpdate",0);c(this,"helpers",{matrixCost(t,e){return x(t,e)},tourToSuccessors(t){return C(t)},successorsToTour(t){return _(t)}})}getInput(){const t=U(this.markers),e=B(this.markers.length),r=x(t,e),n=this.markers.length,i=this.params;return this.updateBestTour(()=>e,r),{d:t,tour:e,cost:r,n,params:i}}async updateBestTour(t,e){if(e>=this.cost)return;this.cost=e;const r={cost:e,iteration:this.iteration};if(this.bestToursHistory.push(r),!this.shouldUpdateTour()){this.lastGetBestTour=t;return}this.bestTour=I(t(),this.markers),y({type:"updateBestTour",bestTour:this.bestTour,bestToursHistory:this.bestToursHistory,cost:this.cost}),await this.sleep()}async updateTrail(t){if(this.performanceMode)return;const e=I(t(),this.markers);y({type:"updateTrail",trail:e}),await this.sleep()}incrementIteration(){if(this.iteration++,this.iterationsLimit&&this.iteration>this.iterationsLimit)return this.iteration--,this.end();this.shouldUpdateIteration()&&y({type:"updateIteration",iteration:this.iteration})}async updateCurrentTour(t){if(this.performanceMode)return;const e=I(t(),this.markers);y({type:"updateCurrentTour",currentTour:e}),await this.sleep()}async sleep(){if(!this.running)throw"Stopped";if(this.performanceMode)return;for(;this.paused&&this.running;)await new Promise(e=>setTimeout(e,200));const t=500-this.speedPercent/100*500+50;return new Promise(e=>setTimeout(e,t))}log(t){y({type:"log",toLog:JSON.stringify(t)})}error(t){y({type:"error",text:t})}end(){let t=this.bestTour;throw this.lastGetBestTour&&(t=I(this.lastGetBestTour(),this.markers)),y({type:"end",cost:this.cost,bestTour:t,iterations:this.iteration,bestToursHistory:this.bestToursHistory}),this.running=!1,"Stopped"}shouldUpdateTour(){if(!this.performanceMode)return!0;const t=Date.now();return t-this.lastTourUpdate>3e3?(this.lastTourUpdate=t,!0):!1}shouldUpdateIteration(){if(!this.performanceMode)return!0;const t=Date.now();return t-this.lastIterationUpdate>3e3?(this.lastIterationUpdate=t,!0):!1}}async function H(s){const t=s.getInput(),e=t.d,r=t.n;let n=t.tour,i=t.cost,a=s.helpers.tourToSuccessors(n);const d=[];for(let o=0;o<r;o++){d[o]=[];for(let l=0;l<r;l++)d[o][l]=0}let M=0,S=0,h=0,g=!0,T=null;for(;h!=S||g;){g=!1,M+=1;let o=a[h],l=i-e[h][o],L=!0;for(;L;){L=!1;let E=i,u=a[o],P=u;for(;a[u]!=h;){s.incrementIteration();const p=a[u];if(l-e[u][p]+e[u][h]+e[o][p]<i){P=u,E=l-e[u][p]+e[u][h]+e[o][p];break}d[u][p]!=M&&l+e[o][p]<E&&(E=l+e[o][p],P=u),u=p,await s.updateCurrentTour(()=>{const b=a.slice();return D(b,b[o],o,u,b[u],o),s.helpers.successorsToTour(b)})}if(Number(E.toFixed(7))<Number(i.toFixed(7))){L=!0,u=P,T=a[P],d[u][T]=d[T][u]=M,l+=e[o][T]-e[u][T];const p=o,b=a[o];D(a,b,p,u,T,o),o=u,l+e[h][o]<i&&(i=l+e[h][o],a[h]=o,S=o,g=!0,n=s.helpers.successorsToTour(a),await s.updateBestTour(()=>n,i))}}a=s.helpers.tourToSuccessors(n),h=a[h]}s.end()}function D(s,t,e,r,n,i){for(s[i]=n;e!=r;){const a=e,d=s[t],M=t;s[t]=a,e=M,t=d}}F(H)})();
