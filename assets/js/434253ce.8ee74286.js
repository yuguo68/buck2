"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[861],{3905:(e,t,a)=>{a.r(t),a.d(t,{MDXContext:()=>p,MDXProvider:()=>m,mdx:()=>g,useMDXComponents:()=>s,withMDXComponents:()=>c});var r=a(67294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(){return i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},i.apply(this,arguments)}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function d(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var p=r.createContext({}),c=function(e){return function(t){var a=s(t.components);return r.createElement(e,i({},t,{components:a}))}},s=function(e){var t=r.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},m=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},u="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,o=e.parentName,p=d(e,["components","mdxType","originalType","parentName"]),c=s(a),m=n,u=c["".concat(o,".").concat(m)]||c[m]||h[m]||i;return a?r.createElement(u,l(l({ref:t},p),{},{components:a})):r.createElement(u,l({ref:t},p))}));function g(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,o=new Array(i);o[0]=f;var l={};for(var d in t)hasOwnProperty.call(t,d)&&(l[d]=t[d]);l.originalType=e,l[u]="string"==typeof e?e:n,o[1]=l;for(var p=2;p<i;p++)o[p]=a[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,a)}f.displayName="MDXCreateElement"},13609:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>d,contentTitle:()=>o,default:()=>s,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var r=a(87462),n=(a(67294),a(3905));const i={id:"glossary",title:"Glossary of Terms",toc_max_heading_level:4},o=void 0,l={unversionedId:"concepts/glossary",id:"concepts/glossary",title:"Glossary of Terms",description:".buckconfig",source:"@site/../docs/concepts/glossary.md",sourceDirName:"concepts",slug:"/concepts/glossary",permalink:"/docs/concepts/glossary",draft:!1,tags:[],version:"current",frontMatter:{id:"glossary",title:"Glossary of Terms",toc_max_heading_level:4},sidebar:"manualSidebar",previous:{title:"Daemon (buckd)",permalink:"/docs/concepts/daemon"},next:{title:"Commands",permalink:"/docs/users/commands"}},d={},p=[{value:".buckconfig",id:"buckconfig",level:4},{value:"Action",id:"action",level:4},{value:"Action graph",id:"action-graph",level:4},{value:"Artifact",id:"artifact",level:4},{value:"Attribute",id:"attribute",level:4},{value:"BUCK file",id:"buck-file",level:4},{value:"BXL",id:"bxl",level:4},{value:"Cell",id:"cell",level:4},{value:"Configuration",id:"configuration",level:4},{value:"Configured graph",id:"configured-graph",level:4},{value:"Daemon",id:"daemon",level:4},{value:"Dependency",id:"dependency",level:4},{value:"Execution platform",id:"execution-platform",level:4},{value:"Hybrid execution",id:"hybrid-execution",level:4},{value:"Isolation dir",id:"isolation-dir",level:4},{value:"Package",id:"package",level:4},{value:"Prelude",id:"prelude",level:4},{value:"Project",id:"project",level:4},{value:"Provider",id:"provider",level:4},{value:"Remote execution (RE)",id:"remote-execution-re",level:4},{value:"Rule",id:"rule",level:4},{value:"Starlark",id:"starlark",level:4},{value:"Target",id:"target",level:4},{value:"Target label",id:"target-label",level:4},{value:"Target pattern",id:"target-pattern",level:4},{value:"Transition",id:"transition",level:4},{value:"Unconfigured graph",id:"unconfigured-graph",level:4},{value:"Visibility",id:"visibility",level:4}],c={toc:p};function s(e){let{components:t,...a}=e;return(0,n.mdx)("wrapper",(0,r.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,n.mdx)("h4",{id:"buckconfig"},".buckconfig"),(0,n.mdx)("p",null,"The root of your ",(0,n.mdx)("a",{parentName:"p",href:"#project"},"project")," must contain a configuration file named ",(0,n.mdx)("inlineCode",{parentName:"p"},".buckconfig"),". Before executing, Buck2 reads this file to incorporate specified customizations. For more information, refer to the ",(0,n.mdx)("a",{parentName:"p",href:"https://buck2.build/docs/legacy/files-and-directories/dot-buckconfig"},"Legacy docs"),"."),(0,n.mdx)("h4",{id:"action"},"Action"),(0,n.mdx)("p",null,"An individual, cacheable, ideally hermetic command that's run during the ",(0,n.mdx)("a",{parentName:"p",href:"#buck-file"},"build"),". It takes ",(0,n.mdx)("a",{parentName:"p",href:"#artifact"},"artifacts")," as inputs and produces other artifacts as outputs. An example command could be ",(0,n.mdx)("inlineCode",{parentName:"p"},"gcc -o main main.c"),", which takes the artifact ",(0,n.mdx)("inlineCode",{parentName:"p"},"main.c")," (a source file) and produces the artifact called ",(0,n.mdx)("inlineCode",{parentName:"p"},"main")," (the compiled binary)."),(0,n.mdx)("h4",{id:"action-graph"},"Action graph"),(0,n.mdx)("p",null,"The dependency graph of all ",(0,n.mdx)("a",{parentName:"p",href:"#action"},"actions")," belonging to a target: it can be queried with ",(0,n.mdx)("inlineCode",{parentName:"p"},"buck2 aquery"),"."),(0,n.mdx)("h4",{id:"artifact"},"Artifact"),(0,n.mdx)("p",null,"A single input or output of an ",(0,n.mdx)("a",{parentName:"p",href:"#action"},"action"),". These are files that participate as inputs or outputs of a build and can be source files or build outputs. For more information, see the ",(0,n.mdx)("a",{parentName:"p",href:"https://buck2.build/docs/api/build/Artifact/"},"Artifact API"),"."),(0,n.mdx)("h4",{id:"attribute"},"Attribute"),(0,n.mdx)("p",null,"Declared by a ",(0,n.mdx)("a",{parentName:"p",href:"#rule"},"rule")," and used to express the properties of a particular instance of a rule to create a ",(0,n.mdx)("a",{parentName:"p",href:"#target"},"target"),". For example, srcs, deps and copts, which declare a target's source files, dependencies, and custom compiler options, respectively. The available attributes for a target depend on its rule type."),(0,n.mdx)("h4",{id:"buck-file"},"BUCK file"),(0,n.mdx)("p",null,"A ",(0,n.mdx)("inlineCode",{parentName:"p"},"BUCK")," file (the name is configurable, some projects use ",(0,n.mdx)("inlineCode",{parentName:"p"},"TARGETS"),") is the main configuration file that tells Buck2 what to build, what their dependencies are, and how to build them. Buck2 takes a ",(0,n.mdx)("inlineCode",{parentName:"p"},"BUCK")," file as input and evaluates the file to declare ",(0,n.mdx)("a",{parentName:"p",href:"#target"},"targets"),", which are then used to create a graph of dependencies and to derive the ",(0,n.mdx)("a",{parentName:"p",href:"#action"},"actions")," that must be completed to build intermediate and final software outputs. A ",(0,n.mdx)("inlineCode",{parentName:"p"},"BUCK")," file marks a directory and any sub-directories not containing a ",(0,n.mdx)("inlineCode",{parentName:"p"},"BUCK")," file as a ",(0,n.mdx)("a",{parentName:"p",href:"#package"},"package"),"."),(0,n.mdx)("h4",{id:"bxl"},"BXL"),(0,n.mdx)("p",null,"BXL (",(0,n.mdx)("a",{parentName:"p",href:"https://buck2.build/docs/developers/bxl"},"Buck eXtension Language"),") scripts are written in ",(0,n.mdx)("a",{parentName:"p",href:"#starlark"},"Starlark")," (a restricted subset of Python) and give integrators the ability to inspect and interact directly with the buck2 graph."),(0,n.mdx)("p",null,"BXL scripts can query the ",(0,n.mdx)("a",{parentName:"p",href:"#action-graph"},"action graph"),", ",(0,n.mdx)("a",{parentName:"p",href:"#configured-graph"},"configured graph"),", and ",(0,n.mdx)("a",{parentName:"p",href:"#unconfigured-graph"},"unconfigured graph"),". They can also create ",(0,n.mdx)("a",{parentName:"p",href:"#action"},"actions")," and trigger builds."),(0,n.mdx)("h4",{id:"cell"},"Cell"),(0,n.mdx)("p",null,"The directory tree of one or more Buck2 ",(0,n.mdx)("a",{parentName:"p",href:"#package"},"packages"),". A Buck2 build can involve multiple cells. The cell root always contains a ",(0,n.mdx)("a",{parentName:"p",href:"#buckconfig"},".buckconfig"),", although the presence of a .buckconfig file doesn't in itself define a cell. Rather, the cells involved in a build are defined at the time Buck2 is invoked; they are specified in the .buckconfig for the Buck ",(0,n.mdx)("a",{parentName:"p",href:"#project"},"project"),"."),(0,n.mdx)("h4",{id:"configuration"},"Configuration"),(0,n.mdx)("p",null,"Configurations consist of a set of 'constraint values' that are used to resolve ",(0,n.mdx)("inlineCode",{parentName:"p"},"select")," ",(0,n.mdx)("a",{parentName:"p",href:"#attribute"},"attributes")," prior to evaluating ",(0,n.mdx)("a",{parentName:"p",href:"#rule"},"rule")," implementations: the attribute takes the value of the first branch in the ",(0,n.mdx)("inlineCode",{parentName:"p"},"select")," that matches the configuration."),(0,n.mdx)("p",null,"Configurations are instantiated by rules that produce a ",(0,n.mdx)("inlineCode",{parentName:"p"},"PlatformInfo")," ",(0,n.mdx)("a",{parentName:"p",href:"#provider"},"provider"),". Once created, targets can receive their configuration through a variety of mechanisms, such as:"),(0,n.mdx)("ul",null,(0,n.mdx)("li",{parentName:"ul"},"Inheritance - by default, when following a dependency edge A -> B, B inherits A's configuration."),(0,n.mdx)("li",{parentName:"ul"},"The ",(0,n.mdx)("inlineCode",{parentName:"li"},"default_target_platform")," attribute and ",(0,n.mdx)("inlineCode",{parentName:"li"},"--target-platforms")," command line flag."),(0,n.mdx)("li",{parentName:"ul"},(0,n.mdx)("a",{parentName:"li",href:"#transition"},"Transitions")," (see below).")),(0,n.mdx)("p",null,"Configurations allow a single target to exist in multiple variants in the configured graph (for example, to build a given binary at differing optimization levels or targeting different CPU architectures)."),(0,n.mdx)("h4",{id:"configured-graph"},"Configured graph"),(0,n.mdx)("p",null,"The configured target graph is generated by configuring target nodes in the ",(0,n.mdx)("a",{parentName:"p",href:"#unconfigured-graph"},"unconfigured target graph"),". That is, ",(0,n.mdx)("inlineCode",{parentName:"p"},"selects")," are fully resolved and configurations applied. The configured graph includes information about the ",(0,n.mdx)("a",{parentName:"p",href:"#configuration"},"configurations")," and ",(0,n.mdx)("a",{parentName:"p",href:"#transition"},"transitions")," involved in building targets.  The same target may appear in multiple different configurations (when printed, the configuration is after the target in parentheses)."),(0,n.mdx)("h4",{id:"daemon"},"Daemon"),(0,n.mdx)("p",null,"The Daemon process lives between invocations and is designed to allow for cache reuse between Buck2 invocations, which can considerably speed up builds. For more information, see ",(0,n.mdx)("a",{parentName:"p",href:"/docs/concepts/daemon"},"Daemon (buckd)"),"."),(0,n.mdx)("h4",{id:"dependency"},"Dependency"),(0,n.mdx)("p",null,"A directed edge between two ",(0,n.mdx)("a",{parentName:"p",href:"#target"},"targets"),". A target ",(0,n.mdx)("inlineCode",{parentName:"p"},"A")," can have a dependency on target ",(0,n.mdx)("inlineCode",{parentName:"p"},"B"),", for example, if any ",(0,n.mdx)("inlineCode",{parentName:"p"},"dep")," attribute of ",(0,n.mdx)("inlineCode",{parentName:"p"},"A")," mentions ",(0,n.mdx)("inlineCode",{parentName:"p"},"B"),". A target's dependence on another target is determined by the ",(0,n.mdx)("a",{parentName:"p",href:"#visibility"},"visibility")," of the latter."),(0,n.mdx)("h4",{id:"execution-platform"},"Execution platform"),(0,n.mdx)("p",null,"A type of ",(0,n.mdx)("a",{parentName:"p",href:"#rule"},"rule")," that includes information such as what execution types a ",(0,n.mdx)("a",{parentName:"p",href:"#target"},"target")," supports, which can be ",(0,n.mdx)("a",{parentName:"p",href:"#remote-execution-re"},"remote"),", local, and ",(0,n.mdx)("a",{parentName:"p",href:"#hybrid-execution"},"hybrid")," execution. Also, whether it supports cache uploads, which allows users to get cache hits for things that executed locally."),(0,n.mdx)("h4",{id:"hybrid-execution"},"Hybrid execution"),(0,n.mdx)("p",null,"Enables shifting work to the local host when available parallelism in the build is low. This enables users to save on ",(0,n.mdx)("a",{parentName:"p",href:"#remote-execution-re"},"remote execution")," roundtrips to enable faster builds."),(0,n.mdx)("h4",{id:"isolation-dir"},"Isolation dir"),(0,n.mdx)("p",null,"Instances of Buck2 share a ",(0,n.mdx)("a",{parentName:"p",href:"#daemon"},"daemon")," if and only if their isolation directory is identical. The isolation directory also influences the output paths provided by Buck2."),(0,n.mdx)("h4",{id:"package"},"Package"),(0,n.mdx)("p",null,"A directory that contains a Buck2 ",(0,n.mdx)("a",{parentName:"p",href:"#buck-file"},"BUCK file")," and all source files belonging to the same directory as the BUCK file, or any of its subdirectories that do not contain a BUCK file themselves."),(0,n.mdx)("h4",{id:"prelude"},"Prelude"),(0,n.mdx)("p",null,"The prelude is a unique ",(0,n.mdx)("inlineCode",{parentName:"p"},".bzl")," file located at ",(0,n.mdx)("inlineCode",{parentName:"p"},"prelude//prelude.bzl"),". Buck2 implicitly loads all the symbols defined in the prelude whenever it loads a ",(0,n.mdx)("a",{parentName:"p",href:"#buck-file"},(0,n.mdx)("inlineCode",{parentName:"a"},"BUCK"))," file. Symbols defined outside the prelude can be imported via a ",(0,n.mdx)("inlineCode",{parentName:"p"},"load()")," statement."),(0,n.mdx)("p",null,"When you create a Buck2 project using ",(0,n.mdx)("inlineCode",{parentName:"p"},"buck2 init --git"),", it will contain the same prelude used internally at Meta by Buck2 users. It is viewable at ",(0,n.mdx)("a",{parentName:"p",href:"https://github.com/facebook/buck2/tree/main/prelude"},"https://github.com/facebook/buck2/tree/main/prelude"),"."),(0,n.mdx)("h4",{id:"project"},"Project"),(0,n.mdx)("p",null,"The Outermost directory where there is a ",(0,n.mdx)("a",{parentName:"p",href:"#buckconfig"},".buckconfig"),": also known as the ",(0,n.mdx)("a",{parentName:"p",href:"#cell"},"root cell"),". The .buckconfig for the project specifies the ",(0,n.mdx)("a",{parentName:"p",href:"#cell"},"cells")," that constitute the Buck2 project. Specifically, these cells are specified in the '","[repositories]","' section of the ",(0,n.mdx)("inlineCode",{parentName:"p"},".buckconfig"),". All command invocations are executed from the project root."),(0,n.mdx)("h4",{id:"provider"},"Provider"),(0,n.mdx)("p",null,"Data returned from a ",(0,n.mdx)("a",{parentName:"p",href:"#rule"},"rule")," function. It's the only way that information from this rule is available to other rules that depend on it (see ",(0,n.mdx)("a",{parentName:"p",href:"#dependency"},"dependency"),"). Every rule must return at least the ",(0,n.mdx)("inlineCode",{parentName:"p"},"DefaultInfo")," provider. A common case is to also return either ",(0,n.mdx)("inlineCode",{parentName:"p"},"RunInfo")," (because they are executable) or custom providers that the dependents rule can use. For more information, see ",(0,n.mdx)("a",{parentName:"p",href:"https://buck2.build/docs/rule_authors/writing_rules/#providers"},"Providers"),"."),(0,n.mdx)("h4",{id:"remote-execution-re"},"Remote execution (RE)"),(0,n.mdx)("p",null,"Distributed execution of ",(0,n.mdx)("a",{parentName:"p",href:"#action"},"actions")," on remote workers. It can speed up builds significantly by scaling the nodes available for parallel actions, and by caching action outputs across Buck2 users."),(0,n.mdx)("h4",{id:"rule"},"Rule"),(0,n.mdx)("p",null,"A rule consists of an attribute spec and an implementation, which is a ",(0,n.mdx)("a",{parentName:"p",href:"#starlark"},"Starlark")," function."),(0,n.mdx)("p",null,"The attribute spec declares what attributes the rule expects to receive. The rule implementation receives the ",(0,n.mdx)("a",{parentName:"p",href:"#attribute"},"attributes")," of a ",(0,n.mdx)("a",{parentName:"p",href:"#target"},"target")," and the ",(0,n.mdx)("a",{parentName:"p",href:"#provider"},"providers")," of its ",(0,n.mdx)("a",{parentName:"p",href:"#dependency"},"dependencies"),". It can declare new ",(0,n.mdx)("a",{parentName:"p",href:"#action"},"actions")," and ",(0,n.mdx)("a",{parentName:"p",href:"#artifact"},"artifacts")," and must return ",(0,n.mdx)("a",{parentName:"p",href:"#provider"},"providers")," that can be used to pass data to its dependents or to Buck2 itself."),(0,n.mdx)("p",null,"Rules are instantiated in ",(0,n.mdx)("a",{parentName:"p",href:"#buck-file"},"BUCK files")," to declare targets and set their attributes. The rule implementation is called when Buck2 needs its providers, which can happen when the target is built, or when one of its dependents is."),(0,n.mdx)("p",null,"As an example, the ",(0,n.mdx)("inlineCode",{parentName:"p"},"cxx_binary")," rule could be used to create a C++ binary, but ",(0,n.mdx)("inlineCode",{parentName:"p"},"android_binary")," rule would be used to create an Android APK"),(0,n.mdx)("h4",{id:"starlark"},"Starlark"),(0,n.mdx)("p",null,"Starlark is a dialect of Python originally developed by Google for the ",(0,n.mdx)("a",{parentName:"p",href:"https://bazel.build/rules/language"},"Bazel build tool"),". It is the configuration language of the Buck2 build system and the language you use in ",(0,n.mdx)("inlineCode",{parentName:"p"},".bzl")," and ",(0,n.mdx)("a",{parentName:"p",href:"#buck-file"},(0,n.mdx)("inlineCode",{parentName:"a"},"BUCK")," files")," to define and instantiate ",(0,n.mdx)("a",{parentName:"p",href:"#rule"},"rules"),"."),(0,n.mdx)("p",null,"There are many reasons why Meta has chosen Starlark, as detailed in ",(0,n.mdx)("a",{parentName:"p",href:"https://developers.facebook.com/blog/post/2021/04/08/rust-starlark-library/"},"The Rust Starlark library")," article."),(0,n.mdx)("p",null,"The Buck2 project maintains and uses an open source ",(0,n.mdx)("a",{parentName:"p",href:"https://github.com/facebookexperimental/starlark-rust"},"Starlark interpreter in Rust"),"."),(0,n.mdx)("h4",{id:"target"},"Target"),(0,n.mdx)("p",null,"An object that is defined in a ",(0,n.mdx)("a",{parentName:"p",href:"#buck-file"},"BUCK file"),". Targets represent the buildable units of a build from the perspective of the end user. Declared by instantiating a ",(0,n.mdx)("a",{parentName:"p",href:"#rule"},"rule")," with attributes. A target has ",(0,n.mdx)("a",{parentName:"p",href:"#dependency"},"dependencies"),", which are references to other targets."),(0,n.mdx)("h4",{id:"target-label"},"Target label"),(0,n.mdx)("p",null,"The identifier for a ",(0,n.mdx)("a",{parentName:"p",href:"#target"},"target"),". Structured as ",(0,n.mdx)("inlineCode",{parentName:"p"},"cellAlias//path/to/package:target"),", where ",(0,n.mdx)("inlineCode",{parentName:"p"},"cellAlias//")," maps to a ",(0,n.mdx)("a",{parentName:"p",href:"#cell"},"cell root")," path (as defined in the ",(0,n.mdx)("a",{parentName:"p",href:"#buckconfig"},"./buckconfig")," of the cell this target belongs to), ",(0,n.mdx)("inlineCode",{parentName:"p"},"path/to/package")," is the ",(0,n.mdx)("a",{parentName:"p",href:"#package"},"package")," directory that contains the ",(0,n.mdx)("a",{parentName:"p",href:"#buck-file"},"BUCK file")," declaring the target (relative to the mapped cell alias), and ",(0,n.mdx)("inlineCode",{parentName:"p"},":target")," is the target's name."),(0,n.mdx)("h4",{id:"target-pattern"},"Target pattern"),(0,n.mdx)("p",null,"A string that resolves to a set of ",(0,n.mdx)("a",{parentName:"p",href:"#target"},"targets"),". They can be used as arguments to commands such as ",(0,n.mdx)("inlineCode",{parentName:"p"},"buck2 build")," and ",(0,n.mdx)("inlineCode",{parentName:"p"},"buck2 uquery"),". They can also be used in the ",(0,n.mdx)("a",{parentName:"p",href:"#visibility"},"visibility")," argument of a ",(0,n.mdx)("a",{parentName:"p",href:"#rule"},"rule"),". For more information, see ",(0,n.mdx)("a",{parentName:"p",href:"/docs/concepts/target_pattern"},"Target pattern"),"."),(0,n.mdx)("h4",{id:"transition"},"Transition"),(0,n.mdx)("p",null,"Allows the ",(0,n.mdx)("a",{parentName:"p",href:"#configuration"},"configuration")," to change across a ",(0,n.mdx)("a",{parentName:"p",href:"#dependency"},"dependency")," edge. That is, normally, if ",(0,n.mdx)("a",{parentName:"p",href:"#target"},"target")," A depends on target B, then if the configuration for A is X, then B is configured using X too. By using a transition, you can produce X to configure B instead."),(0,n.mdx)("h4",{id:"unconfigured-graph"},"Unconfigured graph"),(0,n.mdx)("p",null,"A graph of ",(0,n.mdx)("a",{parentName:"p",href:"#target"},"targets")," before ",(0,n.mdx)("a",{parentName:"p",href:"#configuration"},"configurations")," are applied. Can be queried via ",(0,n.mdx)("inlineCode",{parentName:"p"},"buck2 uquery"),"."),(0,n.mdx)("h4",{id:"visibility"},"Visibility"),(0,n.mdx)("p",null,"Determines whether a ",(0,n.mdx)("a",{parentName:"p",href:"#target"},"target")," can include another ",(0,n.mdx)("a",{parentName:"p",href:"#target"},"target")," as its ",(0,n.mdx)("a",{parentName:"p",href:"#dependency"},"dependency"),". For more information, see ",(0,n.mdx)("a",{parentName:"p",href:"/docs/concepts/visibility"},"Visibility"),"."))}s.isMDXComponent=!0}}]);