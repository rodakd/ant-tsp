var L=Object.defineProperty;var x=(h,a,c)=>a in h?L(h,a,{enumerable:!0,configurable:!0,writable:!0,value:c}):h[a]=c;var n=(h,a,c)=>(x(h,typeof a!="symbol"?a+"":a,c),c);(function(){"use strict";const c=(s,t)=>{const e=s[0],r=t[0],o=s[1],i=t[1],l=6371e3,U=o*Math.PI/180,A=i*Math.PI/180,T=(i-o)*Math.PI/180,y=(r-e)*Math.PI/180,m=Math.sin(T/2)*Math.sin(T/2)+Math.cos(U)*Math.cos(A)*Math.sin(y/2)*Math.sin(y/2),D=2*Math.atan2(Math.sqrt(m),Math.sqrt(1-m));return l*D/1e3},d=(s,t)=>{let e=0;for(let r=0;r<t.length-1;r++){const o=t[r],i=t[r+1];e+=s[o][i]}return e+=s[t[t.length-1]][t[0]],e},M=s=>{const t=[];for(let e=0;e<s.length;e++){t[e]=[];for(let r=0;r<s.length;r++)t[e][r]=c(s[e],s[r])}return t},g=s=>{const t=[];for(let e=0;e<s;e++)t.push(e);return P(t)},p=(s,t)=>{const e=[];return s.forEach(r=>{e.push(t[r])}),e.push(t[s[0]]),e},w=s=>{const t=s.length,e=new Array(t).fill(-1);for(let r=0;r<t;r++)e[s[r]]=s[(r+1)%t];return e},b=s=>{const t=s.length,e=new Array(t).fill(-1);let r=0;for(let o=0;o<t;o++)e[o]=r,r=s[r];return e},P=s=>{let t=s.length,e;for(;t!=0;)e=Math.floor(Math.random()*t),t--,[s[t],s[e]]=[s[e],s[t]];return s},E=s=>{const t=[];for(let e=0;e<s.length;e++){const r=s[e];let o=!0;for(let i=e+1;i<s.length;i++){const l=s[i];if(r[0]===l[0]&&r[1]===l[1]){o=!1;break}}o&&t.push(r)}return t.forEach(e=>{e[0]=Number(e[0].toFixed(6)),e[1]=Number(e[1].toFixed(6))}),t};function u(s){postMessage(s)}const S=s=>{let t=new f;onmessage=async e=>{var o;if(!((o=e==null?void 0:e.data)!=null&&o.type))return;const r=e.data;switch(r.type){case"run":t=new f,t.params=r.params,t.markers=E(r.markers),t.speedPercent=r.speedPercent,t.iterationsLimit=r.iterationsLimit,t.performanceMode=r.performanceMode,s(t).catch(i=>{if(i!=="Stopped")throw i});break;case"stop":t.running=!1;break;case"pause":t.paused=!0;break;case"resume":t.paused=!1;break;case"changeSpeed":t.speedPercent=r.speedPercent}}};class f{constructor(){n(this,"bestTour",[]);n(this,"params",{});n(this,"markers",[]);n(this,"iteration",0);n(this,"paused",!1);n(this,"running",!0);n(this,"cost",1/0);n(this,"performanceMode",!1);n(this,"speedPercent",60);n(this,"iterationsLimit",null);n(this,"bestToursHistory",[]);n(this,"lastGetBestTour",null);n(this,"lastTourUpdate",0);n(this,"lastIterationUpdate",0);n(this,"helpers",{matrixCost(t,e){return d(t,e)},tourToSuccessors(t){return w(t)},successorsToTour(t){return b(t)}})}getInput(){const t=M(this.markers),e=g(this.markers.length),r=d(t,e),o=this.markers.length,i=this.params;return this.updateBestTour(()=>e,r),{d:t,tour:e,cost:r,n:o,params:i}}async updateBestTour(t,e){if(e>=this.cost)return;this.cost=e;const r={cost:e,iteration:this.iteration};if(this.bestToursHistory.push(r),!this.shouldUpdateTour()){this.lastGetBestTour=t;return}this.bestTour=p(t(),this.markers),u({type:"updateBestTour",bestTour:this.bestTour,bestToursHistory:this.bestToursHistory,cost:this.cost}),await this.sleep()}async updateTrail(t){if(this.performanceMode)return;const e=p(t(),this.markers);u({type:"updateTrail",trail:e}),await this.sleep()}incrementIteration(){if(this.iteration++,this.iterationsLimit&&this.iteration>this.iterationsLimit)return this.iteration--,this.end();this.shouldUpdateIteration()&&u({type:"updateIteration",iteration:this.iteration})}async updateCurrentTour(t){if(this.performanceMode)return;const e=p(t(),this.markers);u({type:"updateCurrentTour",currentTour:e}),await this.sleep()}async sleep(){if(!this.running)throw"Stopped";if(this.performanceMode)return;for(;this.paused&&this.running;)await new Promise(e=>setTimeout(e,200));const t=500-this.speedPercent/100*500+50;return new Promise(e=>setTimeout(e,t))}log(t){u({type:"log",toLog:JSON.stringify(t)})}error(t){u({type:"error",text:t})}end(){let t=this.bestTour;throw this.lastGetBestTour&&(t=p(this.lastGetBestTour(),this.markers)),u({type:"end",cost:this.cost,bestTour:t,iterations:this.iteration,bestToursHistory:this.bestToursHistory}),this.running=!1,"Stopped"}shouldUpdateTour(){if(!this.performanceMode)return!0;const t=Date.now();return t-this.lastTourUpdate>3e3?(this.lastTourUpdate=t,!0):!1}shouldUpdateIteration(){if(!this.performanceMode)return!0;const t=Date.now();return t-this.lastIterationUpdate>3e3?(this.lastIterationUpdate=t,!0):!1}}async function I(s){const t=globalThis;t.app=s;try{await Object.getPrototypeOf(async function(){}).constructor(s.params.code)()}catch(e){if(e==="Stopped")return;throw s.error(JSON.stringify(e)),e}finally{delete t.app}}S(I)})();
