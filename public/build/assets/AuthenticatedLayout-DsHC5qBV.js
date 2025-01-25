import{c as r,V as f,j as e,h as x,t as j,U as s,d as t}from"./app-CN9TXcL5.js";import{B as o}from"./button-C5kjKC4E.js";import{W as u}from"./wallet-DMBKUIUE.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=r("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=r("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=r("List",[["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 18h.01",key:"1tta3j"}],["path",{d:"M3 6h.01",key:"1rqtza"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 18h13",key:"1lx6n3"}],["path",{d:"M8 6h13",key:"ik3vkj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=r("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);function z({children:d,showHeader:l=!0,hideBottomNav:c=!1,backUrl:n,title:h,containerClassName:m}){const{url:a,props:{auth:i}}=f(),p=()=>{x.visit(route("wallet"))};return e.jsxs("div",{className:"flex flex-col h-screen bg-background text-foreground",children:[e.jsxs("section",{className:"max-w-md mx-auto fixed left-0 right-0 z-10 h-[64px] ",children:[n&&!l&&e.jsxs("header",{className:"flex items-center gap-4 px-2 py-2 h-full bg-card text-card-foreground border-b",children:[e.jsx("span",{onClick:()=>x.visit(n),children:e.jsx(g,{})}),e.jsx("h2",{className:"text-lg",children:h})]}),l&&e.jsxs("header",{className:"flex items-center justify-between px-2 py-2 h-full bg-primary border-b",children:[e.jsx("h3",{className:"font-bold text-white",children:"FootyPredict"}),e.jsxs("div",{className:"flex gap-2",children:[i.user&&e.jsx("div",{className:"bg-card text-card-foreground rounded-lg border-none py-2 px-2 text-sm",onClick:p,children:j(i.user.balance)}),i.user===null&&e.jsxs(e.Fragment,{children:[e.jsx(o,{className:"rounded-none",variant:"outline",children:e.jsx(s,{href:route("login"),children:"Login"})}),e.jsx(o,{className:"rounded-none",variant:"outline",children:e.jsx(s,{href:route("register"),children:"Register"})})]})]})]})]}),e.jsx("main",{className:t(m,"relative flex-1 overflow-y-scroll w-full max-w-md mx-auto",{"mt-[64px]":l||n,"mb-[56px]":!c}),children:d}),!c&&e.jsx("nav",{className:"max-w-md mx-auto text-white bg-primary border-t dark:bg-gray-800 fixed bottom-0 right-0 left-0",children:e.jsxs("ul",{className:"grid grid-cols-4 items-center justify-between",children:[e.jsx("li",{children:e.jsxs(s,{href:route("events"),className:t("flex flex-col items-center px-4 py-2",{"bg-gradient":a.startsWith("/events")}),children:[e.jsx(y,{size:20}),e.jsx("span",{className:"text-sm whitespace-nowrap",children:"Home"})]})}),e.jsx("li",{children:e.jsxs(s,{href:route("bets.open-bets"),className:t("flex flex-col items-center px-4 py-2",{"bg-gradient":a.startsWith("/bets")}),children:[e.jsx(b,{size:20}),e.jsx("span",{className:"text-sm whitespace-nowrap",children:"Open Bets"})]})}),e.jsx("li",{children:e.jsxs(s,{href:route("wallet"),className:t("flex flex-col items-center px-4 py-2",{"bg-gradient":a.startsWith("/wallet")}),children:[e.jsx(u,{size:20}),e.jsx("span",{className:"text-sm whitespace-nowrap",children:"Wallet"})]})}),e.jsx("li",{children:e.jsxs(s,{href:route("settings"),className:t("flex flex-col items-center px-4 py-2",{"bg-gradient":a.startsWith("/settings")}),children:[e.jsx(w,{size:20}),e.jsx("span",{className:"text-sm whitespace-nowrap",children:"Profile"})]})})]})})]})}export{z as A,g as C};
