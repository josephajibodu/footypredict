import{c as R,r as d,j as e,d as l,b as k,M as H,t as i,U as p,E as F}from"./app-CN9TXcL5.js";import{A as M}from"./AuthenticatedLayout-DsHC5qBV.js";import{B as u}from"./button-C5kjKC4E.js";import{D as W,a as _,b as Y,c as A,d as B,e as E,L as I}from"./drawer-B6DM2O4g.js";import{I as L}from"./input-CWyv_tDE.js";import{d as S}from"./dayjs.min-Oq8waMwx.js";import{T as m}from"./enums-b1rp4VQl.js";import{S as x}from"./skeleton-D0ZeLD7G.js";import{W as z}from"./wallet-minimal-DfQQ-vdl.js";import"./wallet-DMBKUIUE.js";import"./index-gFi65V1n.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=R("HandCoins",[["path",{d:"M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17",key:"geh8rc"}],["path",{d:"m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",key:"1fto5m"}],["path",{d:"m2 16 6 6",key:"1pfhp9"}],["circle",{cx:"16",cy:"9",r:"2.9",key:"1n0dlu"}],["circle",{cx:"6",cy:"5",r:"3",key:"151irh"}]]),j=d.forwardRef(({className:s,...a},r)=>e.jsx("div",{className:"relative w-full overflow-auto",children:e.jsx("table",{ref:r,className:l("w-full caption-bottom text-sm",s),...a})}));j.displayName="Table";const f=d.forwardRef(({className:s,...a},r)=>e.jsx("thead",{ref:r,className:l("[&_tr]:border-b",s),...a}));f.displayName="TableHeader";const b=d.forwardRef(({className:s,...a},r)=>e.jsx("tbody",{ref:r,className:l("[&_tr:last-child]:border-0",s),...a}));b.displayName="TableBody";const P=d.forwardRef(({className:s,...a},r)=>e.jsx("tfoot",{ref:r,className:l("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",s),...a}));P.displayName="TableFooter";const o=d.forwardRef(({className:s,...a},r)=>e.jsx("tr",{ref:r,className:l("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",s),...a}));o.displayName="TableRow";const n=d.forwardRef(({className:s,...a},r)=>e.jsx("th",{ref:r,className:l("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",s),...a}));n.displayName="TableHead";const c=d.forwardRef(({className:s,...a},r)=>e.jsx("td",{ref:r,className:l("p-4 align-middle [&:has([role=checkbox])]:pr-0",s),...a}));c.displayName="TableCell";const U=d.forwardRef(({className:s,...a},r)=>e.jsx("caption",{ref:r,className:l("mt-4 text-sm text-muted-foreground",s),...a}));U.displayName="TableCaption";function q(){return e.jsx("div",{children:e.jsxs(j,{children:[e.jsx(f,{children:e.jsxs(o,{children:[e.jsx(n,{className:"h-4"}),e.jsx(n,{className:"h-4 text-right"})]})}),e.jsx(b,{children:Array.from({length:10}).map((s,a)=>e.jsxs(o,{className:"bg-card text-card-foreground mt-4 hover:bg-primary/50",children:[e.jsx(c,{className:"font-medium border-s-gray-300 border-l-4",children:e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx(x,{className:"h-4 w-3/4"}),e.jsx(x,{className:"h-5 w-1/2"})]})}),e.jsx(c,{className:"text-right ps-0",children:e.jsxs("div",{className:"flex flex-col items-end gap-2",children:[e.jsx(x,{className:"h-4 w-2/3"}),e.jsx(x,{className:"h-4 w-1/4"})]})})]},a))})]})})}const w=50;function G({transactions:s,settings:a,auth:r}){const[v,N]=d.useState(!1),{post:T,data:h,setData:C,processing:g,errors:y}=k({amount:""}),D=t=>{t.preventDefault(),T(route("deposit.store"))};return console.log("deferred: ",s),e.jsxs(e.Fragment,{children:[e.jsx(H,{title:"Events"}),e.jsxs("div",{className:"flex flex-col h-full bg-primary",children:[e.jsxs("div",{className:"bg-primary text-primary-foreground px-4 py-4",children:[e.jsxs("div",{className:"flex justify-between py-4 text-lg",children:[e.jsx("h3",{className:"font-bold",children:"Wallet Balance"}),e.jsx("span",{className:"",children:i(r.user.balance)})]}),e.jsxs("div",{className:"flex justify-center items-center py-4 gap-4",children:[e.jsxs(u,{onClick:()=>N(!0),variant:"secondary",size:"lg",className:"text-base bg-gradient-to-r from-secondary to-accent",children:[e.jsx(z,{}),"Deposit"]}),e.jsx(u,{variant:"secondary",size:"lg",className:"text-base bg-gradient-to-r from-secondary to-accent text-secondary-foreground",asChild:!0,children:e.jsxs(p,{href:route("withdraw"),children:[e.jsx(O,{size:12}),"Withdraw"]})})]})]}),e.jsx("h2",{className:"px-4 pb-2 font-bold text-lg",children:"Transactions"}),e.jsx("div",{className:"flex-1 rounded-t-[24px] bg-background overflow-y-auto",children:e.jsx(F,{fallback:e.jsx(q,{}),data:"transactions",children:e.jsxs(e.Fragment,{children:[s&&s.length===0&&e.jsxs("div",{className:"h-full flex flex-col items-center justify-center px-8",children:[e.jsx("img",{src:"/images/transaction.png",className:"w-16 mb-2",alt:"you have no transaction"}),e.jsx("h3",{className:"font-bold text-lg",children:"No transactions yet"}),e.jsx("p",{className:"text-center",children:"Your transactions will appear here once you get started"})]}),s&&s.length>0&&e.jsxs(j,{children:[e.jsx(f,{children:e.jsxs(o,{className:"h-1",children:[e.jsx(n,{className:"h-4","aria-description":"Description and Amount"}),e.jsx(n,{className:"h-4 w-40","aria-description":"Date"})]})}),e.jsx(b,{children:s.map((t,J)=>e.jsxs(o,{className:"bg-card text-card-foreground mt-4 hover:bg-primary/50",children:[e.jsx(c,{className:l("font-medium border-s-green-500 border-l-4",{"border-s-green-400":t.trend_up,"border-s-red-400":!t.trend_up}),children:e.jsxs(p,{href:route("transaction.show",{transaction:t}),children:[e.jsx("div",{className:"flex items-center",children:e.jsx("span",{className:"text-sm line-clamp-1",children:t.description})}),e.jsx("div",{className:"text-base",children:e.jsx("span",{children:i(Number(t.amount))})})]})}),e.jsx(c,{className:"text-right ps-0",children:e.jsxs(p,{href:route("transaction.show",{transaction:t}),className:"flex flex-col items-end gap-1",children:[e.jsx("span",{className:"text-xs",children:S(t.created_at).format("D MMM YYYY ・ HH:mA")}),e.jsx("span",{className:l("text-xs w-fit px-2 rounded font-bold",{"bg-destructive/20 text-red-500":[m.Failed,m.Cancelled].includes(t.status),"bg-green-500/50 text-green-500":t.status===m.Completed,"bg-orange-500/20 text-orange-500":t.status===m.Pending}),children:t.status})]})})]},t.id))})]})]})})})]}),e.jsx(W,{open:v,onOpenChange:N,children:e.jsxs(_,{className:"bg-card",children:[e.jsxs(Y,{children:[e.jsx(A,{children:"Fund Wallet"}),e.jsx(B,{children:"How much do you to add?"})]}),e.jsxs("form",{onSubmit:D,className:"px-4",children:[e.jsxs("div",{className:"pb-8 space-y-2",children:[e.jsx(L,{type:"number",placeholder:"Minimum of 100",step:.01,min:a.wallet.minimum_deposit_ngn,value:h.amount,onChange:t=>C("amount",t.target.value)}),e.jsx("small",{className:"text-destructive",children:y&&y.amount}),e.jsxs("p",{className:"text-end text-sm",children:["Deposit Fee: ",i(w)]}),e.jsxs("p",{className:"text-end text-sm",children:["You Receive: ",h.amount?i(Number(h.amount)-w):"0.00"]})]}),e.jsx(E,{className:"pb-8 px-0",children:e.jsxs(u,{disabled:g,type:"submit",size:"lg",children:[g&&e.jsx(I,{className:"animate-spin"}),"Continue to Payment"]})})]})]})})]})}G.layout=s=>e.jsx(M,{showHeader:!1,children:s});export{G as default};
