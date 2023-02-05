var L=Object.defineProperty;var x=(d,h,l)=>h in d?L(d,h,{enumerable:!0,configurable:!0,writable:!0,value:l}):d[h]=l;var a=(d,h,l)=>(x(d,typeof h!="symbol"?h+"":h,l),l);(function(){"use strict";const l=(s,t)=>{const e=s[0],r=t[0],n=s[1],o=t[1],c=6371e3,m=n*Math.PI/180,u=o*Math.PI/180,i=(o-n)*Math.PI/180,f=(r-e)*Math.PI/180,T=Math.sin(i/2)*Math.sin(i/2)+Math.cos(m)*Math.cos(u)*Math.sin(f/2)*Math.sin(f/2),M=2*Math.atan2(Math.sqrt(T),Math.sqrt(1-T));return c*M/1e3},w=(s,t)=>{let e=0;for(let r=0;r<t.length-1;r++){const n=t[r],o=t[r+1];e+=s[n][o]}return e+=s[t[t.length-1]][t[0]],e},I=s=>{const t=[];for(let e=0;e<s.length;e++){t[e]=[];for(let r=0;r<s.length;r++)t[e][r]=l(s[e],s[r])}return t},E=s=>{const t=[];for(let e=0;e<s;e++)t.push(e);return B(t)},y=(s,t)=>{const e=[];return s.forEach(r=>{e.push(t[r])}),e.push(t[s[0]]),e},P=s=>{const t=s.length,e=new Array(t).fill(-1);for(let r=0;r<t;r++)e[s[r]]=s[(r+1)%t];return e},S=s=>{const t=s.length,e=new Array(t).fill(-1);let r=0;for(let n=0;n<t;n++)e[n]=r,r=s[r];return e},B=s=>{let t=s.length,e;for(;t!=0;)e=Math.floor(Math.random()*t),t--,[s[t],s[e]]=[s[e],s[t]];return s},D=s=>{const t=[];for(let e=0;e<s.length;e++){const r=s[e];let n=!0;for(let o=e+1;o<s.length;o++){const c=s[o];if(r[0]===c[0]&&r[1]===c[1]){n=!1;break}}n&&t.push(r)}return t.forEach(e=>{e[0]=Number(e[0].toFixed(6)),e[1]=Number(e[1].toFixed(6))}),t};function p(s){postMessage(s)}const U=s=>{let t=new g;onmessage=async e=>{var n;if(!((n=e==null?void 0:e.data)!=null&&n.type))return;const r=e.data;switch(r.type){case"run":t=new g,t.params=r.params,t.markers=D(r.markers),t.speedPercent=r.speedPercent,t.iterationsLimit=r.iterationsLimit,t.performanceMode=r.performanceMode,s(t).catch(o=>{if(o!=="Stopped")throw o});break;case"stop":t.running=!1;break;case"pause":t.paused=!0;break;case"resume":t.paused=!1;break;case"changeSpeed":t.speedPercent=r.speedPercent}}};class g{constructor(){a(this,"bestTour",[]);a(this,"params",{});a(this,"markers",[]);a(this,"iteration",0);a(this,"paused",!1);a(this,"running",!0);a(this,"cost",1/0);a(this,"performanceMode",!1);a(this,"speedPercent",60);a(this,"iterationsLimit",null);a(this,"bestToursHistory",[]);a(this,"lastGetBestTour",null);a(this,"lastTourUpdate",0);a(this,"lastIterationUpdate",0);a(this,"helpers",{matrixCost(t,e){return w(t,e)},tourToSuccessors(t){return P(t)},successorsToTour(t){return S(t)}})}getInput(){const t=I(this.markers),e=E(this.markers.length),r=w(t,e),n=this.markers.length,o=this.params;return this.updateBestTour(()=>e,r),{d:t,tour:e,cost:r,n,params:o}}async updateBestTour(t,e){if(e>=this.cost)return;this.cost=e;const r={cost:e,iteration:this.iteration};if(this.bestToursHistory.push(r),!this.shouldUpdateTour()){this.lastGetBestTour=t;return}this.bestTour=y(t(),this.markers),p({type:"updateBestTour",bestTour:this.bestTour,bestToursHistory:this.bestToursHistory,cost:this.cost}),await this.sleep()}async updateTrail(t){if(this.performanceMode)return;const e=y(t(),this.markers);p({type:"updateTrail",trail:e}),await this.sleep()}incrementIteration(){if(this.iteration++,this.iterationsLimit&&this.iteration>this.iterationsLimit)return this.iteration--,this.end();this.shouldUpdateIteration()&&p({type:"updateIteration",iteration:this.iteration})}async updateCurrentTour(t){if(this.performanceMode)return;const e=y(t(),this.markers);p({type:"updateCurrentTour",currentTour:e}),await this.sleep()}async sleep(){if(!this.running)throw"Stopped";if(this.performanceMode)return;for(;this.paused&&this.running;)await new Promise(e=>setTimeout(e,200));const t=500-this.speedPercent/100*500+50;return new Promise(e=>setTimeout(e,t))}log(t){p({type:"log",toLog:JSON.stringify(t)})}error(t){p({type:"error",text:t})}end(){let t=this.bestTour;throw this.lastGetBestTour&&(t=y(this.lastGetBestTour(),this.markers)),p({type:"end",cost:this.cost,bestTour:t,iterations:this.iteration,bestToursHistory:this.bestToursHistory}),this.running=!1,"Stopped"}shouldUpdateTour(){if(!this.performanceMode)return!0;const t=Date.now();return t-this.lastTourUpdate>3e3?(this.lastTourUpdate=t,!0):!1}shouldUpdateIteration(){if(!this.performanceMode)return!0;const t=Date.now();return t-this.lastIterationUpdate>3e3?(this.lastIterationUpdate=t,!0):!1}}async function A(s){const{d:t,cost:e,n:r,tour:n}=s.getInput();let o=e,c=-1,m,u,i,f,T;for(;c<0;){for(c=1/0,m=T=-1,i=0;i<r-2;i++)for(u=i+2;u<r&&(i>0||u<r-1);)s.incrementIteration(),await s.updateCurrentTour(()=>{const M=n.slice();return b(M,i+1,u),M}),f=t[n[i]][n[u]]+t[n[i+1]][n[(u+1)%r]]-t[n[i]][n[i+1]]-t[n[u]][n[(u+1)%r]],f<c&&(c=f,m=i,T=u),u+=1;c<0&&(o+=c,i=m+1,u=T,b(n,i,u),await s.updateBestTour(()=>n,o))}s.end()}function b(s,t,e){let r;for(;t<e;)r=s[t],s[t]=s[e],s[e]=r,t=t+1,e=e-1}U(A)})();
