import{b as u,j as s,M as w}from"./app-BteG_EHQ.js";import{I as t}from"./InputError-BwLa5QLz.js";import{G as f}from"./GuestLayout-CoZwKnWW.js";import{I as m}from"./input-DTySDMSr.js";import{B as x}from"./button-DkdEXNXu.js";function j({token:a,email:i}){const{data:o,setData:r,post:n,processing:d,errors:l,reset:c}=u({token:a,email:i,password:"",password_confirmation:""}),p=e=>{e.preventDefault(),n(route("password.store"),{onFinish:()=>c("password","password_confirmation")})};return s.jsxs(s.Fragment,{children:[s.jsx(w,{title:"Reset Password"}),s.jsx("div",{className:"flex flex-col px-4 py-6 h-full",children:s.jsxs("form",{onSubmit:p,className:"flex flex-col flex-1",children:[s.jsxs("div",{className:"flex-1",children:[s.jsxs("div",{children:[s.jsx(m,{id:"email",type:"email",name:"email",value:o.email,className:"mt-1 block w-full",autoComplete:"username",onChange:e=>r("email",e.target.value),placeholder:"Email Address"}),s.jsx(t,{message:l.email,className:"mt-2"})]}),s.jsxs("div",{className:"mt-4",children:[s.jsx(m,{id:"password",type:"password",name:"password",value:o.password,className:"mt-1 block w-full",autoComplete:"new-password",autoFocus:!0,onChange:e=>r("password",e.target.value),placeholder:"New Password"}),s.jsx(t,{message:l.password,className:"mt-2"})]}),s.jsxs("div",{className:"mt-4",children:[s.jsx(m,{type:"password",name:"password_confirmation",value:o.password_confirmation,className:"mt-1 block w-full",autoComplete:"new-password",onChange:e=>r("password_confirmation",e.target.value),placeholder:"Confirm New Password"}),s.jsx(t,{message:l.password_confirmation,className:"mt-2"})]})]}),s.jsx("div",{className:"mt-4 flex items-center justify-end",children:s.jsx(x,{size:"lg",className:"ms-4 w-full",disabled:d,children:"Reset Password"})})]})})]})}j.layout=a=>s.jsx(f,{children:a});export{j as default};
