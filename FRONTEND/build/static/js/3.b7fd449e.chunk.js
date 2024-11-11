(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[3],{39:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(8);a(45);t.a=e=>e.href?r.a.createElement("a",{className:`button button--${e.size||"default"} ${e.inverse&&"button--inverse"} ${e.danger&&"button--danger"}`,href:e.href},e.children):e.to?r.a.createElement(l.b,{to:e.to,exact:e.exact,className:`button button--${e.size||"default"} ${e.inverse&&"button--inverse"} ${e.danger&&"button--danger"}`},e.children):r.a.createElement("button",{className:`button button--${e.size||"default"} ${e.inverse&&"button--inverse"} ${e.danger&&"button--danger"}`,type:e.type,onClick:e.onClick,disabled:e.disabled},e.children)},40:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(41),i=a(39);t.a=e=>r.a.createElement(l.a,{onCancel:e.onClear,header:"An Error Occurred!",show:!!e.error,footer:r.a.createElement(i.a,{onClick:e.onClear},"Okay")},r.a.createElement("p",null,e.error))},41:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(6),i=a.n(l),s=a(38),c=a(13);a(44);const o=e=>{const t=r.a.createElement("div",{className:"modal "+e.className,style:e.style},r.a.createElement("header",{className:"modal__header "+e.headerClass},r.a.createElement("h2",null,e.header)),r.a.createElement("form",{onSubmit:e.onSubmit?e.onSubmit:e=>e.preventDefault()},r.a.createElement("div",{className:"modal__content "+e.contentClass},e.children),r.a.createElement("footer",{className:"modal__footer "+e.footerClass},e.footer)));return i.a.createPortal(t,document.getElementById("modal-hook"))};t.a=e=>r.a.createElement(r.a.Fragment,null,e.show&&r.a.createElement(c.a,{onClick:e.onCancel}),r.a.createElement(s.a,{in:e.show,mountOnEnter:!0,unmountOnExit:!0,timeout:200,classNames:"modal"},r.a.createElement(o,e)))},42:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(0);const r=()=>{const[e,t]=Object(n.useState)(!1),[a,r]=Object(n.useState)(),l=Object(n.useRef)([]),i=Object(n.useCallback)((async function(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};t(!0);const s=new AbortController;l.current.push(s);try{const r=await fetch(e,{method:a,body:n,headers:i,signal:s.signal}),c=await r.json();if(l.current=l.current.filter(e=>e!==s),!r.ok)throw new Error(c.message);return t(!1),c}catch(c){throw r(c.message),t(!1),c}}),[]);return Object(n.useEffect)(()=>()=>{l.current.forEach(e=>{e.abort()})},[]),{isLoading:e,error:a,sendRequest:i,clearError:()=>{r(null)}}}},43:function(e,t,a){"use strict";var n=a(0),r=a.n(n);a(47);t.a=e=>r.a.createElement("div",{className:"card "+e.className,style:e.style},e.children)},44:function(e,t,a){},45:function(e,t,a){},46:function(e,t,a){"use strict";a.d(t,"c",(function(){return n})),a.d(t,"b",(function(){return r})),a.d(t,"a",(function(){return l})),a.d(t,"d",(function(){return i}));const n=()=>({type:"REQUIRE"}),r=e=>({type:"MINLENGTH",val:e}),l=()=>({type:"EMAIL"}),i=(e,t)=>{let a=!0;for(const n of t)"REQUIRE"===n.type&&(a=a&&e.trim().length>0),"MINLENGTH"===n.type&&(a=a&&e.trim().length>=n.val),"MAXLENGTH"===n.type&&(a=a&&e.trim().length<=n.val),"MIN"===n.type&&(a=a&&+e>=n.val),"MAX"===n.type&&(a=a&&+e<=n.val),"EMAIL"===n.type&&(a=a&&/^\S+@\S+\.\S+$/.test(e));return a}},47:function(e,t,a){},48:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=(a(49),a(46));function i(e,t){switch(t.type){case"CHANGE":return{...e,value:t.val,isValid:Object(l.d)(t.val,t.validators)};case"TOUCH":return{...e,isTouched:!0};default:return e}}t.a=function(e){const t={value:e.initialValue||"",isTouched:!1,isValid:e.initialValid},[a,l]=Object(n.useReducer)(i,t),{id:s,onInput:c}=e,{value:o,isValid:u}=a;Object(n.useEffect)(()=>{c(s,o,u)},[s,o,u,c]);const d=t=>{l({type:"CHANGE",val:t.target.value,validators:e.validators})},m=e=>{l({type:"TOUCH"})},p="input"===e.element?r.a.createElement("input",{id:e.id,type:e.type,placeholder:e.placeholder,onChange:d,onBlur:m,value:a.value}):r.a.createElement("textarea",{id:e.id,rows:e.rows||3,onChange:d,onBlur:m,value:a.value});return r.a.createElement("div",{className:"form-control "+(!a.isValid&&a.isTouched&&"form-control--invalid")},r.a.createElement("label",{htmlFor:e.id},e.label),p,!a.isValid&&a.isTouched&&r.a.createElement("p",null,e.errorText))}},49:function(e,t,a){},50:function(e,t,a){"use strict";var n=a(0);const r=(e,t)=>{switch(t.type){case"INPUT_CHANGE":let a=!0;for(const n in e.inputs)e.inputs[n]&&(a=n===t.inputId?a&&t.isValid:a&&e.inputs[n].isValid);return{...e,inputs:{...e.inputs,[t.inputId]:{value:t.value,isValid:t.isValid}},isValid:a};case"SET_DATA":return{inputs:t.inputs,isValid:t.formIsValid};default:return e}};t.a=function(e,t){const[a,l]=Object(n.useReducer)(r,{inputs:e,isValid:t});return[a,Object(n.useCallback)((e,t,a)=>l({type:"INPUT_CHANGE",inputId:e,value:t,isValid:a}),[]),Object(n.useCallback)((e,t)=>{l({type:"SET_DATA",inputs:e,formIsValid:t})},[])]}},52:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=(a(53),a(39));t.a=function(e){const[t,a]=Object(n.useState)(),[i,s]=Object(n.useState)(),[c,o]=Object(n.useState)(),u=Object(n.useRef)();return Object(n.useEffect)(()=>{if(!t)return;const e=new FileReader;e.onload=()=>{s(e.result)},e.readAsDataURL(t)},[t]),r.a.createElement("div",{className:"form-control"},r.a.createElement("input",{id:e.id,ref:u,style:{display:"none"},type:"file",accept:".jpg, .jpeg, .png",onChange:t=>{let n,r=c;t.target.files&&0!==t.target.files.length?(n=t.target.files[0],a(n),o(!0),r=!0):(r=o(!1),r=!1),e.onInput(e.id,n,r)}}),r.a.createElement("div",{className:"image-upload "+(e.center&&"center")},r.a.createElement("div",{className:"image-upload__preview"},i&&r.a.createElement("img",{src:i,alt:"Preview"}),!i&&r.a.createElement("p",null,"Please pick an image.")),r.a.createElement(l.a,{type:"button",onClick:()=>{u.current.click()}},"PICK IMAGE")),!c&&r.a.createElement("p",null,e.errorText))}},53:function(e,t,a){},60:function(e,t,a){},63:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(43),i=a(48),s=a(46),c=a(50),o=a(39),u=a(10),d=a(42),m=(a(60),a(40)),p=a(12),f=a(52);t.default=function(){const e=Object(n.useContext)(u.a),[t,a]=Object(n.useState)(!0),{isLoading:v,error:E,sendRequest:b,clearError:h}=Object(d.a)(),[g,y,O]=Object(c.a)({email:{value:"",isValid:!1},password:{value:"",isValid:!1}},!1);return r.a.createElement(r.a.Fragment,null,r.a.createElement(m.a,{error:E,onClear:h}),r.a.createElement(l.a,{className:"authentication"},v&&r.a.createElement(p.a,{asOverlay:!0}),r.a.createElement("h2",null,"Login Required"),r.a.createElement("hr",null),r.a.createElement("form",{onSubmit:async a=>{if(a.preventDefault(),t)try{const t=await b("https://cyan-mern-bfd90e230c9a.herokuapp.com/api/users/login","POST",JSON.stringify({email:g.inputs.email.value,password:g.inputs.password.value}),{"Content-Type":"application/json"});e.login(t.userId,t.token)}catch(n){}else try{const t=new FormData;t.append("email",g.inputs.email.value),t.append("name",g.inputs.name.value),t.append("password",g.inputs.password.value),t.append("image",g.inputs.image.value);const a=await b("https://cyan-mern-bfd90e230c9a.herokuapp.com/api/users/signup","POST",t);e.login(a.userId,a.token)}catch(n){}}},!t&&r.a.createElement(i.a,{id:"name",element:"input",type:"text",label:"Your Name",validators:[Object(s.c)()],errorText:"Please enter a name.",onInput:y}),!t&&r.a.createElement(f.a,{center:!0,id:"image",onInput:y,errorText:"Please provide an image"}),r.a.createElement(i.a,{id:"email",element:"input",type:"email",label:"E-Mail",validators:[Object(s.a)()],errorText:"Please enter a valid email address",onInput:y}),r.a.createElement(i.a,{id:"password",element:"input",type:"password",label:"Password",validators:[Object(s.b)(6)],errorText:"Please enter a valid password, at least 6 characters.",onInput:y}),r.a.createElement(o.a,{type:"submit",disabled:!g.isValid},t?"LOGIN":"SIGNUP")),r.a.createElement(o.a,{inverse:!0,onClick:()=>{t?O({...g.inputs,name:{value:"",isValid:!1},image:{value:null,isValid:!1}},!1):O({...g.inputs,name:void 0,image:void 0},g.inputs.email.isValid&&g.inputs.password.isValid),a(e=>!e)}},"SWITCH TO ",t?"SIGNUP":"LOGIN")))}}}]);
//# sourceMappingURL=3.b7fd449e.chunk.js.map