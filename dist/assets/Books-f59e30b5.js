import{_ as Ae,o as E,c as g,p as xe,a as Te,b as m,S as Qe,B as Ze,d as Ye,I as et,e as tt,r as P,f as k,g as T,F as me,h as be,i as ee,t as C}from"./index-24039dd2.js";const nt={},$=e=>(xe("data-v-7ad4e09b"),e=e(),Te(),e),ot={class:"lds-ring"},st=$(()=>m("div",null,null,-1)),rt=$(()=>m("div",null,null,-1)),it=$(()=>m("div",null,null,-1)),at=$(()=>m("div",null,null,-1)),lt=[st,rt,it,at];function ct(e,t){return E(),g("div",ot,lt)}const ut=Ae(nt,[["render",ct],["__scopeId","data-v-7ad4e09b"]]);function Ce(e,t){return function(){return e.apply(t,arguments)}}const{toString:dt}=Object.prototype,{getPrototypeOf:ce}=Object,G=(e=>t=>{const n=dt.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),O=e=>(e=e.toLowerCase(),t=>G(t)===e),X=e=>t=>typeof t===e,{isArray:F}=Array,U=X("undefined");function ft(e){return e!==null&&!U(e)&&e.constructor!==null&&!U(e.constructor)&&S(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const Ne=O("ArrayBuffer");function ht(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Ne(e.buffer),t}const pt=X("string"),S=X("function"),Le=X("number"),Q=e=>e!==null&&typeof e=="object",mt=e=>e===!0||e===!1,q=e=>{if(G(e)!=="object")return!1;const t=ce(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},bt=O("Date"),yt=O("File"),_t=O("Blob"),wt=O("FileList"),kt=e=>Q(e)&&S(e.pipe),Et=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||S(e.append)&&((t=G(e))==="formdata"||t==="object"&&S(e.toString)&&e.toString()==="[object FormData]"))},gt=O("URLSearchParams"),St=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function D(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let o,s;if(typeof e!="object"&&(e=[e]),F(e))for(o=0,s=e.length;o<s;o++)t.call(null,e[o],o,e);else{const r=n?Object.getOwnPropertyNames(e):Object.keys(e),i=r.length;let l;for(o=0;o<i;o++)l=r[o],t.call(null,e[l],l,e)}}function Pe(e,t){t=t.toLowerCase();const n=Object.keys(e);let o=n.length,s;for(;o-- >0;)if(s=n[o],t===s.toLowerCase())return s;return null}const ve=(()=>typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global)(),Fe=e=>!U(e)&&e!==ve;function re(){const{caseless:e}=Fe(this)&&this||{},t={},n=(o,s)=>{const r=e&&Pe(t,s)||s;q(t[r])&&q(o)?t[r]=re(t[r],o):q(o)?t[r]=re({},o):F(o)?t[r]=o.slice():t[r]=o};for(let o=0,s=arguments.length;o<s;o++)arguments[o]&&D(arguments[o],n);return t}const Rt=(e,t,n,{allOwnKeys:o}={})=>(D(t,(s,r)=>{n&&S(s)?e[r]=Ce(s,n):e[r]=s},{allOwnKeys:o}),e),Bt=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Ot=(e,t,n,o)=>{e.prototype=Object.create(t.prototype,o),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},At=(e,t,n,o)=>{let s,r,i;const l={};if(t=t||{},e==null)return t;do{for(s=Object.getOwnPropertyNames(e),r=s.length;r-- >0;)i=s[r],(!o||o(i,e,t))&&!l[i]&&(t[i]=e[i],l[i]=!0);e=n!==!1&&ce(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},xt=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const o=e.indexOf(t,n);return o!==-1&&o===n},Tt=e=>{if(!e)return null;if(F(e))return e;let t=e.length;if(!Le(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},Ct=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&ce(Uint8Array)),Nt=(e,t)=>{const o=(e&&e[Symbol.iterator]).call(e);let s;for(;(s=o.next())&&!s.done;){const r=s.value;t.call(e,r[0],r[1])}},Lt=(e,t)=>{let n;const o=[];for(;(n=e.exec(t))!==null;)o.push(n);return o},Pt=O("HTMLFormElement"),vt=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,o,s){return o.toUpperCase()+s}),ye=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Ft=O("RegExp"),Ie=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),o={};D(n,(s,r)=>{let i;(i=t(s,r,e))!==!1&&(o[r]=i||s)}),Object.defineProperties(e,o)},It=e=>{Ie(e,(t,n)=>{if(S(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const o=e[n];if(S(o)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},Ut=(e,t)=>{const n={},o=s=>{s.forEach(r=>{n[r]=!0})};return F(e)?o(e):o(String(e).split(t)),n},Dt=()=>{},jt=(e,t)=>(e=+e,Number.isFinite(e)?e:t),te="abcdefghijklmnopqrstuvwxyz",_e="0123456789",Ue={DIGIT:_e,ALPHA:te,ALPHA_DIGIT:te+te.toUpperCase()+_e},Ht=(e=16,t=Ue.ALPHA_DIGIT)=>{let n="";const{length:o}=t;for(;e--;)n+=t[Math.random()*o|0];return n};function Vt(e){return!!(e&&S(e.append)&&e[Symbol.toStringTag]==="FormData"&&e[Symbol.iterator])}const Mt=e=>{const t=new Array(10),n=(o,s)=>{if(Q(o)){if(t.indexOf(o)>=0)return;if(!("toJSON"in o)){t[s]=o;const r=F(o)?[]:{};return D(o,(i,l)=>{const f=n(i,s+1);!U(f)&&(r[l]=f)}),t[s]=void 0,r}}return o};return n(e,0)},qt=O("AsyncFunction"),zt=e=>e&&(Q(e)||S(e))&&S(e.then)&&S(e.catch),a={isArray:F,isArrayBuffer:Ne,isBuffer:ft,isFormData:Et,isArrayBufferView:ht,isString:pt,isNumber:Le,isBoolean:mt,isObject:Q,isPlainObject:q,isUndefined:U,isDate:bt,isFile:yt,isBlob:_t,isRegExp:Ft,isFunction:S,isStream:kt,isURLSearchParams:gt,isTypedArray:Ct,isFileList:wt,forEach:D,merge:re,extend:Rt,trim:St,stripBOM:Bt,inherits:Ot,toFlatObject:At,kindOf:G,kindOfTest:O,endsWith:xt,toArray:Tt,forEachEntry:Nt,matchAll:Lt,isHTMLForm:Pt,hasOwnProperty:ye,hasOwnProp:ye,reduceDescriptors:Ie,freezeMethods:It,toObjectSet:Ut,toCamelCase:vt,noop:Dt,toFiniteNumber:jt,findKey:Pe,global:ve,isContextDefined:Fe,ALPHABET:Ue,generateString:Ht,isSpecCompliantForm:Vt,toJSONObject:Mt,isAsyncFn:qt,isThenable:zt};function y(e,t,n,o,s){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),o&&(this.request=o),s&&(this.response=s)}a.inherits(y,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:a.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const De=y.prototype,je={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{je[e]={value:e}});Object.defineProperties(y,je);Object.defineProperty(De,"isAxiosError",{value:!0});y.from=(e,t,n,o,s,r)=>{const i=Object.create(De);return a.toFlatObject(e,i,function(f){return f!==Error.prototype},l=>l!=="isAxiosError"),y.call(i,e.message,t,n,o,s),i.cause=e,i.name=e.name,r&&Object.assign(i,r),i};const Jt=null;function ie(e){return a.isPlainObject(e)||a.isArray(e)}function He(e){return a.endsWith(e,"[]")?e.slice(0,-2):e}function we(e,t,n){return e?e.concat(t).map(function(s,r){return s=He(s),!n&&r?"["+s+"]":s}).join(n?".":""):t}function Wt(e){return a.isArray(e)&&!e.some(ie)}const Kt=a.toFlatObject(a,{},null,function(t){return/^is[A-Z]/.test(t)});function Z(e,t,n){if(!a.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=a.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(b,A){return!a.isUndefined(A[b])});const o=n.metaTokens,s=n.visitor||u,r=n.dots,i=n.indexes,f=(n.Blob||typeof Blob<"u"&&Blob)&&a.isSpecCompliantForm(t);if(!a.isFunction(s))throw new TypeError("visitor must be a function");function c(d){if(d===null)return"";if(a.isDate(d))return d.toISOString();if(!f&&a.isBlob(d))throw new y("Blob is not supported. Use a Buffer instead.");return a.isArrayBuffer(d)||a.isTypedArray(d)?f&&typeof Blob=="function"?new Blob([d]):Buffer.from(d):d}function u(d,b,A){let R=d;if(d&&!A&&typeof d=="object"){if(a.endsWith(b,"{}"))b=o?b:b.slice(0,-2),d=JSON.stringify(d);else if(a.isArray(d)&&Wt(d)||(a.isFileList(d)||a.endsWith(b,"[]"))&&(R=a.toArray(d)))return b=He(b),R.forEach(function(V,Xe){!(a.isUndefined(V)||V===null)&&t.append(i===!0?we([b],Xe,r):i===null?b:b+"[]",c(V))}),!1}return ie(d)?!0:(t.append(we(A,b,r),c(d)),!1)}const p=[],h=Object.assign(Kt,{defaultVisitor:u,convertValue:c,isVisitable:ie});function _(d,b){if(!a.isUndefined(d)){if(p.indexOf(d)!==-1)throw Error("Circular reference detected in "+b.join("."));p.push(d),a.forEach(d,function(R,L){(!(a.isUndefined(R)||R===null)&&s.call(t,R,a.isString(L)?L.trim():L,b,h))===!0&&_(R,b?b.concat(L):[L])}),p.pop()}}if(!a.isObject(e))throw new TypeError("data must be an object");return _(e),t}function ke(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(o){return t[o]})}function ue(e,t){this._pairs=[],e&&Z(e,this,t)}const Ve=ue.prototype;Ve.append=function(t,n){this._pairs.push([t,n])};Ve.toString=function(t){const n=t?function(o){return t.call(this,o,ke)}:ke;return this._pairs.map(function(s){return n(s[0])+"="+n(s[1])},"").join("&")};function $t(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function Me(e,t,n){if(!t)return e;const o=n&&n.encode||$t,s=n&&n.serialize;let r;if(s?r=s(t,n):r=a.isURLSearchParams(t)?t.toString():new ue(t,n).toString(o),r){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+r}return e}class Gt{constructor(){this.handlers=[]}use(t,n,o){return this.handlers.push({fulfilled:t,rejected:n,synchronous:o?o.synchronous:!1,runWhen:o?o.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){a.forEach(this.handlers,function(o){o!==null&&t(o)})}}const Ee=Gt,qe={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},Xt=typeof URLSearchParams<"u"?URLSearchParams:ue,Qt=typeof FormData<"u"?FormData:null,Zt=typeof Blob<"u"?Blob:null,Yt=(()=>{let e;return typeof navigator<"u"&&((e=navigator.product)==="ReactNative"||e==="NativeScript"||e==="NS")?!1:typeof window<"u"&&typeof document<"u"})(),en=(()=>typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function")(),B={isBrowser:!0,classes:{URLSearchParams:Xt,FormData:Qt,Blob:Zt},isStandardBrowserEnv:Yt,isStandardBrowserWebWorkerEnv:en,protocols:["http","https","file","blob","url","data"]};function tn(e,t){return Z(e,new B.classes.URLSearchParams,Object.assign({visitor:function(n,o,s,r){return B.isNode&&a.isBuffer(n)?(this.append(o,n.toString("base64")),!1):r.defaultVisitor.apply(this,arguments)}},t))}function nn(e){return a.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function on(e){const t={},n=Object.keys(e);let o;const s=n.length;let r;for(o=0;o<s;o++)r=n[o],t[r]=e[r];return t}function ze(e){function t(n,o,s,r){let i=n[r++];const l=Number.isFinite(+i),f=r>=n.length;return i=!i&&a.isArray(s)?s.length:i,f?(a.hasOwnProp(s,i)?s[i]=[s[i],o]:s[i]=o,!l):((!s[i]||!a.isObject(s[i]))&&(s[i]=[]),t(n,o,s[i],r)&&a.isArray(s[i])&&(s[i]=on(s[i])),!l)}if(a.isFormData(e)&&a.isFunction(e.entries)){const n={};return a.forEachEntry(e,(o,s)=>{t(nn(o),s,n,0)}),n}return null}function sn(e,t,n){if(a.isString(e))try{return(t||JSON.parse)(e),a.trim(e)}catch(o){if(o.name!=="SyntaxError")throw o}return(n||JSON.stringify)(e)}const de={transitional:qe,adapter:B.isNode?"http":"xhr",transformRequest:[function(t,n){const o=n.getContentType()||"",s=o.indexOf("application/json")>-1,r=a.isObject(t);if(r&&a.isHTMLForm(t)&&(t=new FormData(t)),a.isFormData(t))return s&&s?JSON.stringify(ze(t)):t;if(a.isArrayBuffer(t)||a.isBuffer(t)||a.isStream(t)||a.isFile(t)||a.isBlob(t))return t;if(a.isArrayBufferView(t))return t.buffer;if(a.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let l;if(r){if(o.indexOf("application/x-www-form-urlencoded")>-1)return tn(t,this.formSerializer).toString();if((l=a.isFileList(t))||o.indexOf("multipart/form-data")>-1){const f=this.env&&this.env.FormData;return Z(l?{"files[]":t}:t,f&&new f,this.formSerializer)}}return r||s?(n.setContentType("application/json",!1),sn(t)):t}],transformResponse:[function(t){const n=this.transitional||de.transitional,o=n&&n.forcedJSONParsing,s=this.responseType==="json";if(t&&a.isString(t)&&(o&&!this.responseType||s)){const i=!(n&&n.silentJSONParsing)&&s;try{return JSON.parse(t)}catch(l){if(i)throw l.name==="SyntaxError"?y.from(l,y.ERR_BAD_RESPONSE,this,null,this.response):l}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:B.classes.FormData,Blob:B.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};a.forEach(["delete","get","head","post","put","patch"],e=>{de.headers[e]={}});const fe=de,rn=a.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),an=e=>{const t={};let n,o,s;return e&&e.split(`
`).forEach(function(i){s=i.indexOf(":"),n=i.substring(0,s).trim().toLowerCase(),o=i.substring(s+1).trim(),!(!n||t[n]&&rn[n])&&(n==="set-cookie"?t[n]?t[n].push(o):t[n]=[o]:t[n]=t[n]?t[n]+", "+o:o)}),t},ge=Symbol("internals");function I(e){return e&&String(e).trim().toLowerCase()}function z(e){return e===!1||e==null?e:a.isArray(e)?e.map(z):String(e)}function ln(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let o;for(;o=n.exec(e);)t[o[1]]=o[2];return t}const cn=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function ne(e,t,n,o,s){if(a.isFunction(o))return o.call(this,t,n);if(s&&(t=n),!!a.isString(t)){if(a.isString(o))return t.indexOf(o)!==-1;if(a.isRegExp(o))return o.test(t)}}function un(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,o)=>n.toUpperCase()+o)}function dn(e,t){const n=a.toCamelCase(" "+t);["get","set","has"].forEach(o=>{Object.defineProperty(e,o+n,{value:function(s,r,i){return this[o].call(this,t,s,r,i)},configurable:!0})})}class Y{constructor(t){t&&this.set(t)}set(t,n,o){const s=this;function r(l,f,c){const u=I(f);if(!u)throw new Error("header name must be a non-empty string");const p=a.findKey(s,u);(!p||s[p]===void 0||c===!0||c===void 0&&s[p]!==!1)&&(s[p||f]=z(l))}const i=(l,f)=>a.forEach(l,(c,u)=>r(c,u,f));return a.isPlainObject(t)||t instanceof this.constructor?i(t,n):a.isString(t)&&(t=t.trim())&&!cn(t)?i(an(t),n):t!=null&&r(n,t,o),this}get(t,n){if(t=I(t),t){const o=a.findKey(this,t);if(o){const s=this[o];if(!n)return s;if(n===!0)return ln(s);if(a.isFunction(n))return n.call(this,s,o);if(a.isRegExp(n))return n.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=I(t),t){const o=a.findKey(this,t);return!!(o&&this[o]!==void 0&&(!n||ne(this,this[o],o,n)))}return!1}delete(t,n){const o=this;let s=!1;function r(i){if(i=I(i),i){const l=a.findKey(o,i);l&&(!n||ne(o,o[l],l,n))&&(delete o[l],s=!0)}}return a.isArray(t)?t.forEach(r):r(t),s}clear(t){const n=Object.keys(this);let o=n.length,s=!1;for(;o--;){const r=n[o];(!t||ne(this,this[r],r,t,!0))&&(delete this[r],s=!0)}return s}normalize(t){const n=this,o={};return a.forEach(this,(s,r)=>{const i=a.findKey(o,r);if(i){n[i]=z(s),delete n[r];return}const l=t?un(r):String(r).trim();l!==r&&delete n[r],n[l]=z(s),o[l]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return a.forEach(this,(o,s)=>{o!=null&&o!==!1&&(n[s]=t&&a.isArray(o)?o.join(", "):o)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const o=new this(t);return n.forEach(s=>o.set(s)),o}static accessor(t){const o=(this[ge]=this[ge]={accessors:{}}).accessors,s=this.prototype;function r(i){const l=I(i);o[l]||(dn(s,i),o[l]=!0)}return a.isArray(t)?t.forEach(r):r(t),this}}Y.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);a.reduceDescriptors(Y.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(o){this[n]=o}}});a.freezeMethods(Y);const x=Y;function oe(e,t){const n=this||fe,o=t||n,s=x.from(o.headers);let r=o.data;return a.forEach(e,function(l){r=l.call(n,r,s.normalize(),t?t.status:void 0)}),s.normalize(),r}function Je(e){return!!(e&&e.__CANCEL__)}function j(e,t,n){y.call(this,e??"canceled",y.ERR_CANCELED,t,n),this.name="CanceledError"}a.inherits(j,y,{__CANCEL__:!0});function fn(e,t,n){const o=n.config.validateStatus;!n.status||!o||o(n.status)?e(n):t(new y("Request failed with status code "+n.status,[y.ERR_BAD_REQUEST,y.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}const hn=B.isStandardBrowserEnv?function(){return{write:function(n,o,s,r,i,l){const f=[];f.push(n+"="+encodeURIComponent(o)),a.isNumber(s)&&f.push("expires="+new Date(s).toGMTString()),a.isString(r)&&f.push("path="+r),a.isString(i)&&f.push("domain="+i),l===!0&&f.push("secure"),document.cookie=f.join("; ")},read:function(n){const o=document.cookie.match(new RegExp("(^|;\\s*)("+n+")=([^;]*)"));return o?decodeURIComponent(o[3]):null},remove:function(n){this.write(n,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}();function pn(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function mn(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}function We(e,t){return e&&!pn(t)?mn(e,t):t}const bn=B.isStandardBrowserEnv?function(){const t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");let o;function s(r){let i=r;return t&&(n.setAttribute("href",i),i=n.href),n.setAttribute("href",i),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:n.pathname.charAt(0)==="/"?n.pathname:"/"+n.pathname}}return o=s(window.location.href),function(i){const l=a.isString(i)?s(i):i;return l.protocol===o.protocol&&l.host===o.host}}():function(){return function(){return!0}}();function yn(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function _n(e,t){e=e||10;const n=new Array(e),o=new Array(e);let s=0,r=0,i;return t=t!==void 0?t:1e3,function(f){const c=Date.now(),u=o[r];i||(i=c),n[s]=f,o[s]=c;let p=r,h=0;for(;p!==s;)h+=n[p++],p=p%e;if(s=(s+1)%e,s===r&&(r=(r+1)%e),c-i<t)return;const _=u&&c-u;return _?Math.round(h*1e3/_):void 0}}function Se(e,t){let n=0;const o=_n(50,250);return s=>{const r=s.loaded,i=s.lengthComputable?s.total:void 0,l=r-n,f=o(l),c=r<=i;n=r;const u={loaded:r,total:i,progress:i?r/i:void 0,bytes:l,rate:f||void 0,estimated:f&&i&&c?(i-r)/f:void 0,event:s};u[t?"download":"upload"]=!0,e(u)}}const wn=typeof XMLHttpRequest<"u",kn=wn&&function(e){return new Promise(function(n,o){let s=e.data;const r=x.from(e.headers).normalize(),i=e.responseType;let l;function f(){e.cancelToken&&e.cancelToken.unsubscribe(l),e.signal&&e.signal.removeEventListener("abort",l)}a.isFormData(s)&&(B.isStandardBrowserEnv||B.isStandardBrowserWebWorkerEnv?r.setContentType(!1):r.setContentType("multipart/form-data;",!1));let c=new XMLHttpRequest;if(e.auth){const _=e.auth.username||"",d=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";r.set("Authorization","Basic "+btoa(_+":"+d))}const u=We(e.baseURL,e.url);c.open(e.method.toUpperCase(),Me(u,e.params,e.paramsSerializer),!0),c.timeout=e.timeout;function p(){if(!c)return;const _=x.from("getAllResponseHeaders"in c&&c.getAllResponseHeaders()),b={data:!i||i==="text"||i==="json"?c.responseText:c.response,status:c.status,statusText:c.statusText,headers:_,config:e,request:c};fn(function(R){n(R),f()},function(R){o(R),f()},b),c=null}if("onloadend"in c?c.onloadend=p:c.onreadystatechange=function(){!c||c.readyState!==4||c.status===0&&!(c.responseURL&&c.responseURL.indexOf("file:")===0)||setTimeout(p)},c.onabort=function(){c&&(o(new y("Request aborted",y.ECONNABORTED,e,c)),c=null)},c.onerror=function(){o(new y("Network Error",y.ERR_NETWORK,e,c)),c=null},c.ontimeout=function(){let d=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const b=e.transitional||qe;e.timeoutErrorMessage&&(d=e.timeoutErrorMessage),o(new y(d,b.clarifyTimeoutError?y.ETIMEDOUT:y.ECONNABORTED,e,c)),c=null},B.isStandardBrowserEnv){const _=(e.withCredentials||bn(u))&&e.xsrfCookieName&&hn.read(e.xsrfCookieName);_&&r.set(e.xsrfHeaderName,_)}s===void 0&&r.setContentType(null),"setRequestHeader"in c&&a.forEach(r.toJSON(),function(d,b){c.setRequestHeader(b,d)}),a.isUndefined(e.withCredentials)||(c.withCredentials=!!e.withCredentials),i&&i!=="json"&&(c.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&c.addEventListener("progress",Se(e.onDownloadProgress,!0)),typeof e.onUploadProgress=="function"&&c.upload&&c.upload.addEventListener("progress",Se(e.onUploadProgress)),(e.cancelToken||e.signal)&&(l=_=>{c&&(o(!_||_.type?new j(null,e,c):_),c.abort(),c=null)},e.cancelToken&&e.cancelToken.subscribe(l),e.signal&&(e.signal.aborted?l():e.signal.addEventListener("abort",l)));const h=yn(u);if(h&&B.protocols.indexOf(h)===-1){o(new y("Unsupported protocol "+h+":",y.ERR_BAD_REQUEST,e));return}c.send(s||null)})},J={http:Jt,xhr:kn};a.forEach(J,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const Ke={getAdapter:e=>{e=a.isArray(e)?e:[e];const{length:t}=e;let n,o;for(let s=0;s<t&&(n=e[s],!(o=a.isString(n)?J[n.toLowerCase()]:n));s++);if(!o)throw o===!1?new y(`Adapter ${n} is not supported by the environment`,"ERR_NOT_SUPPORT"):new Error(a.hasOwnProp(J,n)?`Adapter '${n}' is not available in the build`:`Unknown adapter '${n}'`);if(!a.isFunction(o))throw new TypeError("adapter is not a function");return o},adapters:J};function se(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new j(null,e)}function Re(e){return se(e),e.headers=x.from(e.headers),e.data=oe.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),Ke.getAdapter(e.adapter||fe.adapter)(e).then(function(o){return se(e),o.data=oe.call(e,e.transformResponse,o),o.headers=x.from(o.headers),o},function(o){return Je(o)||(se(e),o&&o.response&&(o.response.data=oe.call(e,e.transformResponse,o.response),o.response.headers=x.from(o.response.headers))),Promise.reject(o)})}const Be=e=>e instanceof x?e.toJSON():e;function v(e,t){t=t||{};const n={};function o(c,u,p){return a.isPlainObject(c)&&a.isPlainObject(u)?a.merge.call({caseless:p},c,u):a.isPlainObject(u)?a.merge({},u):a.isArray(u)?u.slice():u}function s(c,u,p){if(a.isUndefined(u)){if(!a.isUndefined(c))return o(void 0,c,p)}else return o(c,u,p)}function r(c,u){if(!a.isUndefined(u))return o(void 0,u)}function i(c,u){if(a.isUndefined(u)){if(!a.isUndefined(c))return o(void 0,c)}else return o(void 0,u)}function l(c,u,p){if(p in t)return o(c,u);if(p in e)return o(void 0,c)}const f={url:r,method:r,data:r,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:l,headers:(c,u)=>s(Be(c),Be(u),!0)};return a.forEach(Object.keys(Object.assign({},e,t)),function(u){const p=f[u]||s,h=p(e[u],t[u],u);a.isUndefined(h)&&p!==l||(n[u]=h)}),n}const $e="1.5.0",he={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{he[e]=function(o){return typeof o===e||"a"+(t<1?"n ":" ")+e}});const Oe={};he.transitional=function(t,n,o){function s(r,i){return"[Axios v"+$e+"] Transitional option '"+r+"'"+i+(o?". "+o:"")}return(r,i,l)=>{if(t===!1)throw new y(s(i," has been removed"+(n?" in "+n:"")),y.ERR_DEPRECATED);return n&&!Oe[i]&&(Oe[i]=!0,console.warn(s(i," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(r,i,l):!0}};function En(e,t,n){if(typeof e!="object")throw new y("options must be an object",y.ERR_BAD_OPTION_VALUE);const o=Object.keys(e);let s=o.length;for(;s-- >0;){const r=o[s],i=t[r];if(i){const l=e[r],f=l===void 0||i(l,r,e);if(f!==!0)throw new y("option "+r+" must be "+f,y.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new y("Unknown option "+r,y.ERR_BAD_OPTION)}}const ae={assertOptions:En,validators:he},N=ae.validators;class K{constructor(t){this.defaults=t,this.interceptors={request:new Ee,response:new Ee}}request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=v(this.defaults,n);const{transitional:o,paramsSerializer:s,headers:r}=n;o!==void 0&&ae.assertOptions(o,{silentJSONParsing:N.transitional(N.boolean),forcedJSONParsing:N.transitional(N.boolean),clarifyTimeoutError:N.transitional(N.boolean)},!1),s!=null&&(a.isFunction(s)?n.paramsSerializer={serialize:s}:ae.assertOptions(s,{encode:N.function,serialize:N.function},!0)),n.method=(n.method||this.defaults.method||"get").toLowerCase();let i=r&&a.merge(r.common,r[n.method]);r&&a.forEach(["delete","get","head","post","put","patch","common"],d=>{delete r[d]}),n.headers=x.concat(i,r);const l=[];let f=!0;this.interceptors.request.forEach(function(b){typeof b.runWhen=="function"&&b.runWhen(n)===!1||(f=f&&b.synchronous,l.unshift(b.fulfilled,b.rejected))});const c=[];this.interceptors.response.forEach(function(b){c.push(b.fulfilled,b.rejected)});let u,p=0,h;if(!f){const d=[Re.bind(this),void 0];for(d.unshift.apply(d,l),d.push.apply(d,c),h=d.length,u=Promise.resolve(n);p<h;)u=u.then(d[p++],d[p++]);return u}h=l.length;let _=n;for(p=0;p<h;){const d=l[p++],b=l[p++];try{_=d(_)}catch(A){b.call(this,A);break}}try{u=Re.call(this,_)}catch(d){return Promise.reject(d)}for(p=0,h=c.length;p<h;)u=u.then(c[p++],c[p++]);return u}getUri(t){t=v(this.defaults,t);const n=We(t.baseURL,t.url);return Me(n,t.params,t.paramsSerializer)}}a.forEach(["delete","get","head","options"],function(t){K.prototype[t]=function(n,o){return this.request(v(o||{},{method:t,url:n,data:(o||{}).data}))}});a.forEach(["post","put","patch"],function(t){function n(o){return function(r,i,l){return this.request(v(l||{},{method:t,headers:o?{"Content-Type":"multipart/form-data"}:{},url:r,data:i}))}}K.prototype[t]=n(),K.prototype[t+"Form"]=n(!0)});const W=K;class pe{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(r){n=r});const o=this;this.promise.then(s=>{if(!o._listeners)return;let r=o._listeners.length;for(;r-- >0;)o._listeners[r](s);o._listeners=null}),this.promise.then=s=>{let r;const i=new Promise(l=>{o.subscribe(l),r=l}).then(s);return i.cancel=function(){o.unsubscribe(r)},i},t(function(r,i,l){o.reason||(o.reason=new j(r,i,l),n(o.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}static source(){let t;return{token:new pe(function(s){t=s}),cancel:t}}}const gn=pe;function Sn(e){return function(n){return e.apply(null,n)}}function Rn(e){return a.isObject(e)&&e.isAxiosError===!0}const le={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(le).forEach(([e,t])=>{le[t]=e});const Bn=le;function Ge(e){const t=new W(e),n=Ce(W.prototype.request,t);return a.extend(n,W.prototype,t,{allOwnKeys:!0}),a.extend(n,t,null,{allOwnKeys:!0}),n.create=function(s){return Ge(v(e,s))},n}const w=Ge(fe);w.Axios=W;w.CanceledError=j;w.CancelToken=gn;w.isCancel=Je;w.VERSION=$e;w.toFormData=Z;w.AxiosError=y;w.Cancel=w.CanceledError;w.all=function(t){return Promise.all(t)};w.spread=Sn;w.isAxiosError=Rn;w.mergeConfig=v;w.AxiosHeaders=x;w.formToJSON=e=>ze(a.isHTMLForm(e)?new FormData(e):e);w.getAdapter=Ke.getAdapter;w.HttpStatusCode=Bn;w.default=w;const On=w;const{ipcRenderer:M}=require("electron"),An={components:{SearchBar:Qe,Button:Ze,SortIcon:Ye,InputField:et,LoadingIcon:ut,IconButton:tt},data(){return{books:[],searchBook:"",currentBook:void 0,showBookInfo:!1,isLoading:!1,bookResults:[],noResults:!1,languageMap:{de:"Deutsch",it:"Italienisch",ru:"Russisch",fr:"Französisch",la:"Latein",en:"Englisch"},currentStudentLink:void 0}},methods:{deepClone:function(e){if(e==null||typeof e!="object")return e;if(Array.isArray(e))return e.map(n=>this.deepClone(n));const t={};for(let n in e)e.hasOwnProperty(n)&&(t[n]=this.deepClone(e[n]));return t},updateBooksRemote:function(){M.send("getBooks"),M.on("books",(e,t)=>{this.books=t})},selectBook:function(e){this.currentBook=this.deepClone(e),this.currentBookLink=e.id,this.bookResults=[],this.showBookInfo=!0,console.log("Book selcted "+this.currentBook)},closeBook:function(e){this.currentBook=void 0,this.bookResults=[],this.showBookInfo=!1,console.log("Book closed "+this.currentBook)},saveBook:function(){console.log(this.currentBook.title+" saved"),M.send("addBook",JSON.stringify(this.currentBook)),this.currentBook.id==-1&&(this.currentBook.id=this.books.length,this.books.push(this.currentBook)),this.currentBook=void 0,this.bookResults=[],this.showBookInfo=!1,this.updateBooksRemote()},deleteBook:function(){console.log(this.currentBook.title+" deleted"),M.send("deleteBook",JSON.stringify(this.currentBook)),this.updateBooksRemote(),this.currentBook=void 0,this.bookResults=[],this.showBookInfo=!1},newBook:function(){console.log("open new book"),this.bookResults=[],this.currentBook={id:-1,title:"",author:"",language:"",foreign_language:!1,points:0,isbn:""},this.showBookInfo=!0,this.isNew=!0},searchBookWEB:function(){this.bookResults=[],this.currentBook.isbn.length>=10?(this.isLoading=!0,On.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${this.currentBook.isbn}&key=AIzaSyA81ig_LA7piHwhiYhJ0pHkqhZGMq9gdcQ`).then(e=>{const t=e.data;if(t.totalItems>0)for(var n=0;n<t.totalItems;n++){const o=t.items[n].volumeInfo,s={title:o.subtitle?`${o.title} ${o.subtitle}`:o.title,author:o.authors?o.authors.join(", "):"",thumbnailURL:o.imageLinks&&o.imageLinks.thumbnail?o.imageLinks.thumbnail:"/src/assets/blankCover.svg",language:typeof o.language<"u"?this.languageMap[o.language]:""};this.bookResults.push(s)}else this.bookResults=[],this.noResults=!0,setTimeout(()=>{this.noResults=!1},2e3)}).catch(e=>{console.error("Error:",e)}).finally(()=>{this.isLoading=!1})):this.bookResults=[]},selectResultBook:function(e){this.currentBook.title=e.title,this.currentBook.author=e.author,this.currentBook.language=e.language}},beforeMount(){this.updateBooksRemote()},computed:{filteredBooksList(){var e=this.searchBook.toLowerCase();return this.books.filter(t=>t.title.toLowerCase().includes(e)||t.author.toLowerCase().includes(e)||t.language.toLowerCase().includes(e)||t.isbn.toLowerCase().includes(e))}}},H=e=>(xe("data-v-d06b5787"),e=e(),Te(),e),xn={id:"main-books"},Tn={class:"books-list-section"},Cn=H(()=>m("h1",null,"Bücher",-1)),Nn={class:"books-list ui-table"},Ln={class:"table-row table-header-row"},Pn={class:"table-cell"},vn={class:"table-cell"},Fn={class:"table-cell"},In={class:"table-cell"},Un={class:"table-cell"},Dn={class:"table-data"},jn=["onClick"],Hn={class:"table-cell"},Vn={class:"table-cell"},Mn={class:"table-cell"},qn={class:"table-cell"},zn={class:"table-cell"},Jn={class:"books-list-section-footer"},Wn=H(()=>m("div",{class:"vertical-line"},null,-1)),Kn={class:"book-information-section"},$n={key:0,class:"content"},Gn={class:"book-header-title"},Xn=H(()=>m("h1",null,"Buch",-1)),Qn={class:"book-information"},Zn={class:"book-language-points"},Yn={class:"book-search-status"},eo={key:0},to={key:1},no={key:2},oo={key:0,style:{"font-size":"18px","font-style":"normal","font-weight":"300"}},so={key:1,style:{"font-size":"12px","font-style":"italic","font-weight":"300"}},ro={class:"book-search"},io=["onClick"],ao={class:"book-result-cover"},lo=["src"],co={class:"book-result-author"},uo={class:"book-result-title"},fo=H(()=>m("br",null,null,-1)),ho={class:"book-result-language"},po={class:"delete-save-bar"},mo={key:1,id:"no_book_selected"},bo=H(()=>m("br",null,null,-1));function yo(e,t,n,o,s,r){const i=P("SearchBar"),l=P("SortIcon"),f=P("Button"),c=P("IconButton"),u=P("InputField"),p=P("LoadingIcon");return E(),g("main",xn,[m("div",Tn,[Cn,k(i,{placeholder:"Suche Bücher...",modelValue:s.searchBook,"onUpdate:modelValue":t[0]||(t[0]=h=>s.searchBook=h)},null,8,["modelValue"]),m("div",Nn,[m("div",Ln,[m("div",Pn,[T("Titel "),k(l)]),m("div",vn,[T("Autor:in "),k(l)]),m("div",Fn,[T("Sprache "),k(l)]),m("div",In,[T("Lose "),k(l)]),m("div",Un,[T("ISBN "),k(l)])]),m("div",Dn,[(E(!0),g(me,null,be(r.filteredBooksList,h=>(E(),g("div",{class:"table-row",onClick:_=>r.selectBook(h)},[m("div",Hn,C(h.title),1),m("div",Vn,C(h.author),1),m("div",Mn,C(h.language),1),m("div",qn,C(h.points),1),m("div",zn,C(h.isbn),1)],8,jn))),256))])]),m("div",Jn,[k(f,{type:"add",text:"Buch hinzufügen",onClick:t[1]||(t[1]=h=>r.newBook())})])]),Wn,m("div",Kn,[s.showBookInfo==!0?(E(),g("div",$n,[m("div",Gn,[Xn,k(c,{onClick:t[2]||(t[2]=h=>r.closeBook()),type:"no"})]),m("div",Qn,[k(u,{modelValue:s.currentBook.title,"onUpdate:modelValue":t[3]||(t[3]=h=>s.currentBook.title=h),text:"Titel       ",variable:"",value:s.currentBook.title},null,8,["modelValue","value"]),k(u,{text:"Autor     ",modelValue:s.currentBook.author,"onUpdate:modelValue":t[4]||(t[4]=h=>s.currentBook.author=h),variable:"",value:s.currentBook.author},null,8,["modelValue","value"]),m("div",Zn,[k(u,{class:"language-input",modelValue:s.currentBook.language,"onUpdate:modelValue":t[5]||(t[5]=h=>s.currentBook.language=h),text:"Sprache",variable:"",value:s.currentBook.language},null,8,["modelValue","value"]),k(u,{class:"points-input",modelValue:s.currentBook.points,"onUpdate:modelValue":t[6]||(t[6]=h=>s.currentBook.points=h),text:"Lose",variable:"",number:"number",value:s.currentBook.points},null,8,["modelValue","value"])]),k(u,{text:"ISBN       ",variable:"",value:s.currentBook.isbn,modelValue:s.currentBook.isbn,"onUpdate:modelValue":t[7]||(t[7]=h=>s.currentBook.isbn=h),onInput:r.searchBookWEB},null,8,["value","modelValue","onInput"]),m("div",null,[m("div",Yn,[s.isLoading?(E(),g("span",eo,[T("Suche nach Informationen... "),k(p)])):s.noResults?(E(),g("span",to,"Keine Ergebnisse")):s.noResults!=!0&&s.isLoading!=!0?(E(),g("span",no," ")):ee("",!0)]),s.bookResults.length>0?(E(),g("div",oo," Mögliche Bücher")):ee("",!0),s.bookResults.length>0?(E(),g("div",so," Kicken Sie auf ein Ergebnis, um die Daten automatisch auszufüllen")):ee("",!0)])]),m("div",ro,[(E(!0),g(me,null,be(s.bookResults,h=>(E(),g("div",{class:"book-result",onClick:_=>r.selectResultBook(h)},[m("div",ao,[m("img",{src:h.thumbnailURL},null,8,lo)]),m("div",co,C(h.author),1),m("div",uo,"“"+C(h.title)+"”",1),fo,m("div",ho,C(h.language),1)],8,io))),256))]),m("div",po,[k(f,{type:"delete",text:"Löschen",color:"red",onClick:t[8]||(t[8]=h=>r.deleteBook())}),k(f,{type:"yes",text:"Speichern",color:"green",onClick:t[9]||(t[9]=h=>r.saveBook())})])])):(E(),g("div",mo,[T("Klicken Sie auf ein Buch,"),bo,T(" um seine Informationen zu bearbeiten")]))])])}const wo=Ae(An,[["render",yo],["__scopeId","data-v-d06b5787"]]);export{wo as default};
