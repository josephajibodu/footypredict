import{r as x,j as e,M as h,U as r,d as a,E as u,t as f}from"./app-DPLLtSvf.js";import{A as p}from"./AuthenticatedLayout-CdCXwzoh.js";import{d as g}from"./dayjs.min-BxnBxp_Y.js";import{B as j}from"./button-Dvo88yrR.js";import{B as y,e as v,P as N}from"./betting-BS3nYJqk.js";import{B as l}from"./enums-b1rp4VQl.js";import{C as w}from"./chevron-down-B_zMLJOp.js";import"./index-CcrVYoZh.js";import"./wallet-CikHa3Fw.js";import"./skeleton-CDHRemeo.js";import"./chevron-right-SnYDOWhI.js";function B({bets:s,settings:_}){const i=new URLSearchParams(new URL(location.href).search).get("status"),[n,M]=x.useState(i??null);return e.jsxs(e.Fragment,{children:[e.jsx(h,{title:"BetHistory"}),e.jsx("div",{className:"flex h-full",children:e.jsxs("div",{className:"flex-1",children:[e.jsxs("div",{className:"grid px-4 w-full grid-cols-3 p-0 rounded-none mt-4 h-10 text-card-foreground rounded-lg overflow-hidden",children:[e.jsx(r,{className:a("h-full flex items-center justify-center bg-card hover:bg-primary rounded-none rounded-s-lg",{"bg-gradient-to-r from-secondary to-accent text-primary-foreground":n===null}),href:route("bets",{status:null}),children:"All"}),e.jsx(r,{className:a("h-full flex items-center justify-center bg-card hover:bg-primary rounded-none",{"bg-gradient-to-r from-secondary to-accent text-primary-foreground":n==="unsettled"}),href:route("bets",{status:"unsettled"}),children:"Unsettled"}),e.jsx(r,{className:a("h-full flex items-center justify-center bg-card hover:bg-primary rounded-none rounded-e-lg",{"bg-gradient-to-r from-secondary to-accent text-primary-foreground":n==="settled"}),href:route("bets",{status:"settled"}),children:"Settled"})]}),e.jsx(u,{fallback:e.jsx(y,{}),data:"bets",children:e.jsxs(e.Fragment,{children:[(!s||s.data&&s.data.length===0)&&e.jsxs("div",{className:"h-full flex flex-col items-center justify-center px-8",children:[e.jsx("img",{src:v,className:"w-16",alt:"you have no bet"}),e.jsx("h3",{className:"font-bold text-lg",children:"You have no bets"}),e.jsx("p",{className:"text-center",children:"Get started by selecting some matches now!"}),e.jsx(j,{asChild:!0,children:e.jsx(r,{href:route("events"),className:"mt-4",children:"View Available Matches"})})]}),s&&s.data.length>0&&e.jsx("section",{className:"px-4",children:e.jsx("div",{className:"flex flex-col gap-4 py-4",children:s.data.map((t,A)=>{var o,d;return e.jsxs("div",{className:"bg-card text-card-foreground rounded-lg overflow-hidden",children:[e.jsxs("div",{className:a("flex justify-between text-primary bg-primary/60 text-primary-foreground py-2 px-4"),children:[e.jsx("div",{className:"flex ",children:e.jsx("span",{className:a("font-bold capitalize",{"text-green-500":t.status===l.Won,"text-destructive":[l.Lost,l.Canceled].includes(t.status)}),children:t.status})}),e.jsxs("span",{className:"",children:["- ",f(t.stake)]})]}),e.jsxs("div",{className:"py-2 px-4",children:[e.jsx(r,{href:route("bets.show",{bet:t.reference}),children:e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-sm text-gray-400",children:g(t.created_at).format("D MMM YYYY ・ HH:mA")}),e.jsx(w,{})]})}),e.jsx(r,{href:route("bets.show",{bet:t.reference}),children:e.jsxs("div",{className:"flex flex-col text-sm",children:[(o=t.short_sport_events)==null?void 0:o.slice(0,3).map((c,m)=>e.jsx("span",{children:c.fixture},m)),t.short_sport_events&&t.short_sport_events.length>3&&e.jsxs("span",{className:"text-gray-300 italic",children:["and ",((d=t.short_sport_events)==null?void 0:d.length)-3," others ..."]})]})})]})]},t.id)})})}),s&&s.data.length>0&&e.jsx(N,{meta:s.meta,links:s.links})]})})]})})]})}B.layout=s=>e.jsx(p,{children:s});export{B as default};
