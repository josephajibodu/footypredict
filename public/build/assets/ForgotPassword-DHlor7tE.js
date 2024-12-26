import{a as d,j as e,M as u,U as t}from"./app-DA7izWtK.js";import{I as x}from"./InputError-DT3CTje8.js";import{G as f}from"./GuestLayout-CJmKd_VP.js";import{A as p}from"./ApplicationLogo-CFjsH1hQ.js";import{I as h}from"./input-C7LmYvPb.js";import{B as l}from"./button-BsQEl3gn.js";function j({status:s}){const{data:r,setData:o,post:i,processing:m,errors:n}=d({email:""}),c=a=>{a.preventDefault(),i(route("password.email"))};return e.jsxs(e.Fragment,{children:[e.jsx(u,{title:"Forgot Password"}),e.jsxs("div",{className:"flex flex-col h-full px-8",children:[e.jsxs("div",{className:"flex-1 flex flex-col justify-center items-center",children:[e.jsx("div",{children:e.jsx(t,{href:route("events"),children:e.jsx(p,{className:"h-20 w-20 fill-current text-gray-500"})})}),e.jsx("div",{className:"mb-4 text-sm text-gray-600 dark:text-gray-400",children:"Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one."}),s&&e.jsx("div",{className:"mb-4 text-sm font-medium text-green-600 dark:text-green-400",children:s}),e.jsxs("form",{onSubmit:c,className:"w-full",children:[e.jsx(h,{id:"email",type:"email",name:"email",value:r.email,className:"mt-1 block w-full",autoFocus:!0,onChange:a=>o("email",a.target.value)}),e.jsx(x,{message:n.email,className:"mt-2"}),e.jsx(l,{className:"mt-4 w-full",disabled:m,children:"Email Password Reset Link"})]})]}),e.jsx("div",{className:"py-4 text-center",children:e.jsx(l,{asChild:!0,className:"w-full",variant:"outline",children:e.jsx(t,{href:route("login"),children:"Login"})})})]})]})}j.layout=s=>e.jsx(f,{children:s});export{j as default};