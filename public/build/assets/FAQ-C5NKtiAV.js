import{f as K,r as d,i as D,j as o,P as A,l as G,m as ge,g as U,x as ve,d as be,y as m,n as O,M as ye}from"./app-BRiJH4YG.js";import{S as Ce}from"./StaticLayout-CcBqh9C0.js";import{B as we}from"./button-BR4ypJEM.js";import{u as z}from"./index-CC-Jj5Ps.js";import{u as Ae,C as Ne}from"./index-dHyo-LL6.js";import{m as B}from"./proxy-DG9Kynsd.js";var T="Collapsible",[je,Q]=K(T),[Ie,M]=je(T),J=d.forwardRef((e,a)=>{const{__scopeCollapsible:t,open:n,defaultOpen:s,disabled:r,onOpenChange:i,...l}=e,[u=!1,p]=D({prop:n,defaultProp:s,onChange:i});return o.jsx(Ie,{scope:t,disabled:r,contentId:z(),open:u,onOpenToggle:d.useCallback(()=>p(f=>!f),[p]),children:o.jsx(A.div,{"data-state":H(u),"data-disabled":r?"":void 0,...l,ref:a})})});J.displayName=T;var X="CollapsibleTrigger",Z=d.forwardRef((e,a)=>{const{__scopeCollapsible:t,...n}=e,s=M(X,t);return o.jsx(A.button,{type:"button","aria-controls":s.contentId,"aria-expanded":s.open||!1,"data-state":H(s.open),"data-disabled":s.disabled?"":void 0,disabled:s.disabled,...n,ref:a,onClick:G(e.onClick,s.onOpenToggle)})});Z.displayName=X;var q="CollapsibleContent",ee=d.forwardRef((e,a)=>{const{forceMount:t,...n}=e,s=M(q,e.__scopeCollapsible);return o.jsx(ge,{present:t||s.open,children:({present:r})=>o.jsx(Re,{...n,ref:a,present:r})})});ee.displayName=q;var Re=d.forwardRef((e,a)=>{const{__scopeCollapsible:t,present:n,children:s,...r}=e,i=M(q,t),[l,u]=d.useState(n),p=d.useRef(null),f=U(a,p),x=d.useRef(0),C=x.current,g=d.useRef(0),N=g.current,v=i.open||l,b=d.useRef(v),y=d.useRef(void 0);return d.useEffect(()=>{const c=requestAnimationFrame(()=>b.current=!1);return()=>cancelAnimationFrame(c)},[]),ve(()=>{const c=p.current;if(c){y.current=y.current||{transitionDuration:c.style.transitionDuration,animationName:c.style.animationName},c.style.transitionDuration="0s",c.style.animationName="none";const w=c.getBoundingClientRect();x.current=w.height,g.current=w.width,b.current||(c.style.transitionDuration=y.current.transitionDuration,c.style.animationName=y.current.animationName),u(n)}},[i.open,n]),o.jsx(A.div,{"data-state":H(i.open),"data-disabled":i.disabled?"":void 0,id:i.contentId,hidden:!v,...r,ref:f,style:{"--radix-collapsible-content-height":C?`${C}px`:void 0,"--radix-collapsible-content-width":N?`${N}px`:void 0,...e.style},children:v&&s})});function H(e){return e?"open":"closed"}var Pe=J,_e=Z,ke=ee,h="Accordion",Ee=["Home","End","ArrowDown","ArrowUp","ArrowLeft","ArrowRight"],[F,Se,De]=be(h),[I,Xe]=K(h,[De,Q]),$=Q(),oe=m.forwardRef((e,a)=>{const{type:t,...n}=e,s=n,r=n;return o.jsx(F.Provider,{scope:e.__scopeAccordion,children:t==="multiple"?o.jsx(qe,{...r,ref:a}):o.jsx(Me,{...s,ref:a})})});oe.displayName=h;var[te,Oe]=I(h),[ne,Te]=I(h,{collapsible:!1}),Me=m.forwardRef((e,a)=>{const{value:t,defaultValue:n,onValueChange:s=()=>{},collapsible:r=!1,...i}=e,[l,u]=D({prop:t,defaultProp:n,onChange:s});return o.jsx(te,{scope:e.__scopeAccordion,value:l?[l]:[],onItemOpen:u,onItemClose:m.useCallback(()=>r&&u(""),[r,u]),children:o.jsx(ne,{scope:e.__scopeAccordion,collapsible:r,children:o.jsx(ae,{...i,ref:a})})})}),qe=m.forwardRef((e,a)=>{const{value:t,defaultValue:n,onValueChange:s=()=>{},...r}=e,[i=[],l]=D({prop:t,defaultProp:n,onChange:s}),u=m.useCallback(f=>l((x=[])=>[...x,f]),[l]),p=m.useCallback(f=>l((x=[])=>x.filter(C=>C!==f)),[l]);return o.jsx(te,{scope:e.__scopeAccordion,value:i,onItemOpen:u,onItemClose:p,children:o.jsx(ne,{scope:e.__scopeAccordion,collapsible:!0,children:o.jsx(ae,{...r,ref:a})})})}),[He,R]=I(h),ae=m.forwardRef((e,a)=>{const{__scopeAccordion:t,disabled:n,dir:s,orientation:r="vertical",...i}=e,l=m.useRef(null),u=U(l,a),p=Se(t),x=Ae(s)==="ltr",C=G(e.onKeyDown,g=>{var Y;if(!Ee.includes(g.key))return;const N=g.target,v=p().filter(E=>{var W;return!((W=E.ref.current)!=null&&W.disabled)}),b=v.findIndex(E=>E.ref.current===N),y=v.length;if(b===-1)return;g.preventDefault();let c=b;const w=0,P=y-1,_=()=>{c=b+1,c>P&&(c=w)},k=()=>{c=b-1,c<w&&(c=P)};switch(g.key){case"Home":c=w;break;case"End":c=P;break;case"ArrowRight":r==="horizontal"&&(x?_():k());break;case"ArrowDown":r==="vertical"&&_();break;case"ArrowLeft":r==="horizontal"&&(x?k():_());break;case"ArrowUp":r==="vertical"&&k();break}const he=c%y;(Y=v[he].ref.current)==null||Y.focus()});return o.jsx(He,{scope:t,disabled:n,direction:s,orientation:r,children:o.jsx(F.Slot,{scope:t,children:o.jsx(A.div,{...i,"data-orientation":r,ref:u,onKeyDown:n?void 0:C})})})}),j="AccordionItem",[Fe,L]=I(j),re=m.forwardRef((e,a)=>{const{__scopeAccordion:t,value:n,...s}=e,r=R(j,t),i=Oe(j,t),l=$(t),u=z(),p=n&&i.value.includes(n)||!1,f=r.disabled||e.disabled;return o.jsx(Fe,{scope:t,open:p,disabled:f,triggerId:u,children:o.jsx(Pe,{"data-orientation":r.orientation,"data-state":de(p),...l,...s,ref:a,disabled:f,open:p,onOpenChange:x=>{x?i.onItemOpen(n):i.onItemClose(n)}})})});re.displayName=j;var se="AccordionHeader",V=m.forwardRef((e,a)=>{const{__scopeAccordion:t,...n}=e,s=R(h,t),r=L(se,t);return o.jsx(A.h3,{"data-orientation":s.orientation,"data-state":de(r.open),"data-disabled":r.disabled?"":void 0,...n,ref:a})});V.displayName=se;var S="AccordionTrigger",ie=m.forwardRef((e,a)=>{const{__scopeAccordion:t,...n}=e,s=R(h,t),r=L(S,t),i=Te(S,t),l=$(t);return o.jsx(F.ItemSlot,{scope:t,children:o.jsx(_e,{"aria-disabled":r.open&&!i.collapsible||void 0,"data-orientation":s.orientation,id:r.triggerId,...l,...n,ref:a})})});ie.displayName=S;var ce="AccordionContent",le=m.forwardRef((e,a)=>{const{__scopeAccordion:t,...n}=e,s=R(h,t),r=L(ce,t),i=$(t);return o.jsx(ke,{role:"region","aria-labelledby":r.triggerId,"data-orientation":s.orientation,...i,...n,ref:a,style:{"--radix-accordion-content-height":"var(--radix-collapsible-content-height)","--radix-accordion-content-width":"var(--radix-collapsible-content-width)",...e.style}})});le.displayName=ce;function de(e){return e?"open":"closed"}var $e=oe,Le=re,Ve=V,ue=ie,pe=le;const Ye=$e,me=d.forwardRef(({className:e,...a},t)=>o.jsx(Le,{ref:t,className:O("border-b",e),...a}));me.displayName="AccordionItem";const fe=d.forwardRef(({className:e,children:a,...t},n)=>o.jsx(Ve,{className:"flex",children:o.jsxs(ue,{ref:n,className:O("flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",e),...t,children:[a,o.jsx(Ne,{className:"h-4 w-4 shrink-0 transition-transform duration-200"})]})}));fe.displayName=ue.displayName;const xe=d.forwardRef(({className:e,children:a,...t},n)=>o.jsx(pe,{ref:n,className:"overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",...t,children:o.jsx("div",{className:O("pb-4 pt-0",e),children:a})}));xe.displayName=pe.displayName;const We=[{question:"What is Footy Predict?",answer:"Footy Predict is a Jackpot-style predict-to-win service for football matches. We use social wagering to share games among users. We are also out to solve the perennial issue of bookies locking and unlocking games unfairly by ensuring that all games are booked before they start and only truthful outcomes are rewarded."},{question:"How do I fund Footy Predict?",answer:"You can fund your wallet with your local currency (Only Naira available for now, other currencies coming soon), or with the stablecoin USDT through the crypto wallet address we provided when you signed up. You can deposit crypto from any exchange (e.g. Binance, Kucoin, etc) or a wallet (Metamask, Phantom, etc)."},{question:"What is the minimum deposit?",answer:"The minimum deposit is N100 and the minimum stake is N100."},{question:"How do I play?",answer:"You select two or more football matches and predict their outcomes, including Home Win, Draw, or Away Win for each respective match. You enter the stake amount and click Stake."},{question:"How do I know if I win?",answer:"You check your bet history, the system automatically validates the games and their outcomes."},{question:"Can I share my booking codes?",answer:"Yes."},{question:"How do I withdraw my wins?",answer:"You fill in your account, ensure it is the same with the name you registered."}];function Be(){return o.jsxs(o.Fragment,{children:[o.jsx(ye,{title:"FootyPredict - Frequently Asked Questions"}),o.jsxs("section",{children:[o.jsxs("div",{className:"max-w-screen-xl mx-auto pt-24 pb-12 md:pb-24 px-4 text-center flex flex-col items-center",children:[o.jsx("h1",{className:"text-3xl md:text-5xl leading-relaxed font-bold mb-8",children:"Frequently Asked Questions"}),o.jsx("p",{className:"text-lg max-w-4xl text-gray-300 mb-12",children:"Have questions? We’ve got answers! Below are some of the frequently asked questions about FootyPredict. If you still need help, feel free to reach out to our support team."})]}),o.jsx("div",{className:"max-w-screen-xl mx-auto mb-16 px-4",children:o.jsx(Ye,{type:"single",collapsible:!0,className:"space-y-4",children:We.map((e,a)=>o.jsxs(me,{value:`item-${a}`,className:"bg-card p-6 rounded-lg shadow-lg",children:[o.jsx(V,{children:o.jsx(B.div,{className:"text-xl font-semibold text-left",initial:{opacity:0,y:-50},animate:{opacity:1,y:0},transition:{duration:.5},children:o.jsx(fe,{children:e.question})})}),o.jsx(xe,{children:o.jsx(B.p,{className:"text-lg text-card-foreground mt-4",initial:{opacity:0,y:-50},animate:{opacity:1,y:0},transition:{duration:.5},children:e.answer})})]},a))})})]}),o.jsx("section",{children:o.jsx("div",{className:"max-w-screen-xl mx-auto text-center py-12",children:o.jsx(we,{variant:"secondary",size:"lg",className:"bg-gradient-to-r from-secondary to-accent text-base h-12",children:"Contact Support"})})})]})}Be.layout=e=>o.jsx(Ce,{children:e});export{Be as default};
