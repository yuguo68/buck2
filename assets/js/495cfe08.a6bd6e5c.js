"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3236],{3905:(e,t,a)=>{a.r(t),a.d(t,{MDXContext:()=>s,MDXProvider:()=>u,mdx:()=>x,useMDXComponents:()=>p,withMDXComponents:()=>c});var r=a(67294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(){return o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},o.apply(this,arguments)}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function d(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s=r.createContext({}),c=function(e){return function(t){var a=p(t.components);return r.createElement(e,o({},t,{components:a}))}},p=function(e){var t=r.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},u=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},m="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},b=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,s=d(e,["components","mdxType","originalType","parentName"]),c=p(a),u=n,m=c["".concat(l,".").concat(u)]||c[u]||f[u]||o;return a?r.createElement(m,i(i({ref:t},s),{},{components:a})):r.createElement(m,i({ref:t},s))}));function x(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,l=new Array(o);l[0]=b;var i={};for(var d in t)hasOwnProperty.call(t,d)&&(i[d]=t[d]);i.originalType=e,i[m]="string"==typeof e?e:n,l[1]=i;for(var s=2;s<o;s++)l[s]=a[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,a)}b.displayName="MDXCreateElement"},78122:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>p,frontMatter:()=>o,metadata:()=>i,toc:()=>s});var r=a(87462),n=(a(67294),a(3905));const o={},l="RFC: labels -> metadata attribute",i={unversionedId:"rfcs/attr-metadata",id:"rfcs/attr-metadata",title:"RFC: labels -> metadata attribute",description:"This RFC proposes to add new builtin per target attribute: metadata,",source:"@site/../docs/rfcs/attr-metadata.md",sourceDirName:"rfcs",slug:"/rfcs/attr-metadata",permalink:"/docs/rfcs/attr-metadata",draft:!1,tags:[],version:"current",frontMatter:{}},d={},s=[{value:"Context: labels",id:"context-labels",level:2},{value:"Context: package values",id:"context-package-values",level:2},{value:"Context: metadata we use or we need",id:"context-metadata-we-use-or-we-need",level:2},{value:"Proposal: metadata attribute",id:"proposal-metadata-attribute",level:2}],c={toc:s};function p(e){let{components:t,...a}=e;return(0,n.mdx)("wrapper",(0,r.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,n.mdx)("h1",{id:"rfc-labels---metadata-attribute"},"RFC: labels -> metadata attribute"),(0,n.mdx)("p",null,"This RFC proposes to add new builtin per target attribute: ",(0,n.mdx)("inlineCode",{parentName:"p"},"metadata"),",\nas replacement for ",(0,n.mdx)("inlineCode",{parentName:"p"},"labels"),"."),(0,n.mdx)("h2",{id:"context-labels"},"Context: labels"),(0,n.mdx)("p",null,"In buck1 we have ",(0,n.mdx)("inlineCode",{parentName:"p"},"labels")," builtin rule attribute, which is a list of\nstrings."),(0,n.mdx)("p",null,"In buck2 we have ",(0,n.mdx)("inlineCode",{parentName:"p"},"labels")," attribute which is configured in prelude, it\ndoes not have special meaning."),(0,n.mdx)("h2",{id:"context-package-values"},"Context: package values"),(0,n.mdx)("p",null,(0,n.mdx)("inlineCode",{parentName:"p"},"PACKAGE")," files have a function: ",(0,n.mdx)("inlineCode",{parentName:"p"},"write_package_value(key, value)"),",\nwhere a key is a word-dot-word string, and value is arbitrary starlark\nvalue which should be serializable as JSON."),(0,n.mdx)("h2",{id:"context-metadata-we-use-or-we-need"},"Context: metadata we use or we need"),(0,n.mdx)("p",null,"There are several spaces where we use or need metadata to be stored in\nbuck2 target graph."),(0,n.mdx)("ul",null,(0,n.mdx)("li",{parentName:"ul"},"fbcode uses per-package values to switch code to new\nclang\n(",(0,n.mdx)("a",{parentName:"li",href:"https://www.internalfb.com/code/fbsource/%5Bef740e6f2610c64621f7547a3b46d54d32af8600%5D/fbcode/ownership/code_metadata/PACKAGE?lines=3"},"example"),")"),(0,n.mdx)("li",{parentName:"ul"},"testinfra wants to use ",(0,n.mdx)("inlineCode",{parentName:"li"},"PACKAGE")," values to mark a set of folders to a\nlogical larger project"),(0,n.mdx)("li",{parentName:"ul"},"it is likely that per-target ",(0,n.mdx)("inlineCode",{parentName:"li"},"metadata")," attribute should be used\nin ",(0,n.mdx)("a",{parentName:"li",href:"/docs/rfcs/drafts/cfg-modifiers/api"},"configuration factory function"),"."),(0,n.mdx)("li",{parentName:"ul"},"TD wants to declare CI trigger jobs per-target or per-package, and\nthis logic is to be specified in ",(0,n.mdx)("inlineCode",{parentName:"li"},"BUCK")," or ",(0,n.mdx)("inlineCode",{parentName:"li"},"PACKAGE")," files \u2014 as\nmetadata")),(0,n.mdx)("h2",{id:"proposal-metadata-attribute"},"Proposal: metadata attribute"),(0,n.mdx)("p",null,"Add builtin ",(0,n.mdx)("inlineCode",{parentName:"p"},"metadata")," attribute to all the targets."),(0,n.mdx)("p",null,(0,n.mdx)("inlineCode",{parentName:"p"},"metadata")," has the same structure as package values: word-dot-word to\narbitrary value serializable to JSON."),(0,n.mdx)("p",null,"For example:"),(0,n.mdx)("pre",null,(0,n.mdx)("code",{parentName:"pre",className:"language-python"},'cxx_library(\n    name = "mylib",\n    metadata = {\n        "td.run_on_windows": True,\n    },\n)\n')),(0,n.mdx)("p",null,"Metadata attribute is not configurable (means ",(0,n.mdx)("inlineCode",{parentName:"p"},"select")," cannot be used)."))}p.isMDXComponent=!0}}]);