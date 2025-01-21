import{c as u,j as e,M as N,d as y,t as x,U as g}from"./app-BteG_EHQ.js";import{A as _}from"./AuthenticatedLayout-BU5BNhg8.js";import{d as p}from"./dayjs.min-JM-b670j.js";import{B as a,S as h}from"./enums-b1rp4VQl.js";import{M as j,a as f}from"./MatchOptionEnum-CBfdu7oF.js";import{C as k}from"./circle-check-big-D5jK8C8N.js";import"./button-DkdEXNXu.js";import"./wallet-D9DRw4dV.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=u("CircleOff",[["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M8.35 2.69A10 10 0 0 1 21.3 15.65",key:"1pfsoa"}],["path",{d:"M19.08 19.08A10 10 0 1 1 4.92 4.92",key:"1ablyi"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=u("CircleX",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);function M({bet:s}){var i,l;return e.jsxs(e.Fragment,{children:[e.jsx(N,{title:"Bet Details"}),e.jsxs("div",{className:"",children:[e.jsxs("div",{className:"p-4",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h1",{className:"font-bold text-lg",children:"Ticket Details"}),e.jsx("span",{children:p(s.created_at).format("DD/MM HH:mm")})]}),e.jsx("p",{className:y("font-bold text-xl mt-2 capitalize",{"text-red-600":s.status===a.Lost||s.status===a.Canceled,"text-green-600":s.status===a.Won,"text-orange-600":s.status===a.Pending}),children:s.status})]}),e.jsx("div",{className:"bg-card text-white p-4",children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"Expected Multiplier"}),e.jsxs("span",{className:"font-bold",children:[s.is_flexed&&e.jsx("span",{className:"text-sm me-2",children:"(Flexed)"}),"x",s.is_flexed?s.multiplier_settings.flex_0:s.multiplier_settings.main]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"Total Stake"}),e.jsx("span",{className:"font-bold",children:x(s.stake)})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"Total Return"}),e.jsx("span",{className:"font-bold",children:x(s.potential_winnings||0)})]})]})}),e.jsx("div",{className:"p-4 mt-4 space-y-4",children:(i=s.sport_events)==null?void 0:i.map(t=>{var c,n,r,d,o,m;return e.jsxs("div",{className:"border bg-card py-4 px-4 rounded-lg text-sm",children:[e.jsx("div",{className:"flex justify-between",children:e.jsx("span",{children:p(t.kickoff_time).format("DD/MM HH:mm")})}),e.jsxs("p",{className:"text-lg font-semibold",children:[t.team1.name," vs ",t.team2.name]}),e.jsxs("div",{className:"mt-2 space-y-2",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"Pick:"}),e.jsx("span",{className:"font-bold",children:j[f[(c=t.selected_option)==null?void 0:c.type.toUpperCase()]]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"Outcome:"}),e.jsxs("span",{className:"font-bold flex items-center gap-2",children:[((n=t.selected_option)==null?void 0:n.id)===((r=t.outcome_option)==null?void 0:r.id)&&e.jsx(k,{className:"text-green-600 size-4"}),((d=t.selected_option)==null?void 0:d.id)!==((o=t.outcome_option)==null?void 0:o.id)&&t.outcome_option!==null&&e.jsx(v,{className:"text-destructive size-4"}),j[f[(m=t.outcome_option)==null?void 0:m.type.toUpperCase()]],[h.Canceled,h.Postponed].includes(t.status)?e.jsxs("div",{className:"flex gap-2 items-center text-destructive bg-destructive/20 rounded px-2",children:[e.jsx(b,{className:"text-destructive size-4"}),e.jsx("span",{className:"uppercase",children:t.status})]}):null]})]})]})]},t.id)})}),e.jsxs("div",{className:"bg-card text-center p-4 mt-4",children:[e.jsxs("span",{children:["Number of Matches: ",(l=s.sport_events)==null?void 0:l.length]}),e.jsx(g,{href:route("transaction.show",{transaction:s.transaction.reference}),className:"block mt-4 text-center text-gray-400 underline font-semibold",children:"Check Transaction History"})]}),e.jsx("p",{className:"text-center text-gray-500 mt-4 text-sm"})]})]})}M.layout=s=>e.jsx(_,{title:"Bet Details",showHeader:!1,backUrl:route("bets"),hideBottomNav:!0,children:s});export{M as default};
