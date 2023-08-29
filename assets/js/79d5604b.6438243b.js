"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7826],{3905:(e,n,t)=>{t.r(n),t.d(n,{MDXContext:()=>o,MDXProvider:()=>c,mdx:()=>h,useMDXComponents:()=>m,withMDXComponents:()=>p});var r=t(67294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(){return a=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},a.apply(this,arguments)}function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function d(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var o=r.createContext({}),p=function(e){return function(n){var t=m(n.components);return r.createElement(e,a({},n,{components:t}))}},m=function(e){var n=r.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},c=function(e){var n=m(e.components);return r.createElement(o.Provider,{value:n},e.children)},g="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},x=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,o=d(e,["components","mdxType","originalType","parentName"]),p=m(t),c=i,g=p["".concat(s,".").concat(c)]||p[c]||u[c]||a;return t?r.createElement(g,l(l({ref:n},o),{},{components:t})):r.createElement(g,l({ref:n},o))}));function h(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var a=t.length,s=new Array(a);s[0]=x;var l={};for(var d in n)hasOwnProperty.call(n,d)&&(l[d]=n[d]);l.originalType=e,l[g]="string"==typeof e?e:i,s[1]=l;for(var o=2;o<a;o++)s[o]=t[o];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}x.displayName="MDXCreateElement"},39641:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>s,default:()=>m,frontMatter:()=>a,metadata:()=>l,toc:()=>o});var r=t(87462),i=(t(67294),t(3905));const a={id:"string"},s="string type",l={unversionedId:"api/starlark/string",id:"api/starlark/string",title:"string type",description:"string.capitalize",source:"@site/../docs/api/starlark/string.generated.md",sourceDirName:"api/starlark",slug:"/api/starlark/string",permalink:"/docs/api/starlark/string",draft:!1,tags:[],version:"current",frontMatter:{id:"string"},sidebar:"manualSidebar",previous:{title:"regex type",permalink:"/docs/api/starlark/regex"},next:{title:"globals",permalink:"/docs/api/build/globals"}},d={},o=[{value:"string.capitalize",id:"stringcapitalize",level:2},{value:"string.codepoints",id:"stringcodepoints",level:2},{value:"string.count",id:"stringcount",level:2},{value:"string.elems",id:"stringelems",level:2},{value:"string.endswith",id:"stringendswith",level:2},{value:"string.find",id:"stringfind",level:2},{value:"string.format",id:"stringformat",level:2},{value:"string.index",id:"stringindex",level:2},{value:"string.isalnum",id:"stringisalnum",level:2},{value:"string.isalpha",id:"stringisalpha",level:2},{value:"string.isdigit",id:"stringisdigit",level:2},{value:"string.islower",id:"stringislower",level:2},{value:"string.isspace",id:"stringisspace",level:2},{value:"string.istitle",id:"stringistitle",level:2},{value:"string.isupper",id:"stringisupper",level:2},{value:"string.join",id:"stringjoin",level:2},{value:"string.lower",id:"stringlower",level:2},{value:"string.lstrip",id:"stringlstrip",level:2},{value:"string.partition",id:"stringpartition",level:2},{value:"string.removeprefix",id:"stringremoveprefix",level:2},{value:"string.removesuffix",id:"stringremovesuffix",level:2},{value:"string.replace",id:"stringreplace",level:2},{value:"string.rfind",id:"stringrfind",level:2},{value:"string.rindex",id:"stringrindex",level:2},{value:"string.rpartition",id:"stringrpartition",level:2},{value:"string.rsplit",id:"stringrsplit",level:2},{value:"string.rstrip",id:"stringrstrip",level:2},{value:"string.split",id:"stringsplit",level:2},{value:"string.splitlines",id:"stringsplitlines",level:2},{value:"string.startswith",id:"stringstartswith",level:2},{value:"string.strip",id:"stringstrip",level:2},{value:"string.title",id:"stringtitle",level:2},{value:"string.upper",id:"stringupper",level:2}],p={toc:o};function m(e){let{components:n,...t}=e;return(0,i.mdx)("wrapper",(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,i.mdx)("h1",{id:"string-type"},(0,i.mdx)("inlineCode",{parentName:"h1"},"string")," type"),(0,i.mdx)("h2",{id:"stringcapitalize"},"string.capitalize"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.capitalize() -> str\n")),(0,i.mdx)("p",null,"string.capitalize: returns a copy of string S, where the first character (if any) is converted to uppercase; all other characters are converted to lowercase."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"hello, world!".capitalize() == "Hello, world!"\n"Hello, World!".capitalize() == "Hello, world!"\n"".capitalize() == ""\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringcodepoints"},"string.codepoints"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.codepoints() -> typing.Iterable[str]\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7codepoints"},"string.codepoints"),": returns an iterable of the unicode codepoint of a string."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.codepoints()")," returns an iterable value containing the\nsequence of integer Unicode code points encoded by the string S.\nEach invalid code within the string is treated as if it encodes the\nUnicode replacement character, U+FFFD."),(0,i.mdx)("p",null,"By returning an iterable, not a list, the cost of decoding the string\nis deferred until actually needed; apply ",(0,i.mdx)("inlineCode",{parentName:"p"},"list(...)")," to the result to\nmaterialize the entire sequence."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'list("Hello, \u4e16\u754c".codepoints()) == [72, 101, 108, 108, 111, 44, 32, 19990, 30028]\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringcount"},"string.count"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.count(\n    needle: str,\n    start: None | int = None,\n    end: None | int = None,\n    /\n) -> int\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7count"},"string.count"),": count the number of occurrences of a string in another string."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.count(sub[, start[, end]])")," returns the number of occcurences of\n",(0,i.mdx)("inlineCode",{parentName:"p"},"sub")," within the string S, or, if the optional substring indices\n",(0,i.mdx)("inlineCode",{parentName:"p"},"start")," and ",(0,i.mdx)("inlineCode",{parentName:"p"},"end")," are provided, within the designated substring of S.\nThey are interpreted according to Skylark's ",(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#indexing"},"indexing conventions"),"."),(0,i.mdx)("p",null,"This implementation does not count occurrence of ",(0,i.mdx)("inlineCode",{parentName:"p"},"sub")," in the string ",(0,i.mdx)("inlineCode",{parentName:"p"},"S"),"\nthat overlap other occurrence of S (which can happen if some suffix of S\nis a prefix of S). For instance, ",(0,i.mdx)("inlineCode",{parentName:"p"},'"abababa".count("aba")')," returns 2\nfor ",(0,i.mdx)("inlineCode",{parentName:"p"},"[aba]a[aba]"),", not counting the middle occurrence: ",(0,i.mdx)("inlineCode",{parentName:"p"},"ab[aba]ba"),"\n(this is following Python behavior)."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"hello, world!".count("o") == 2\n"abababa".count("aba") == 2\n"hello, world!".count("o", 7, 12) == 1  # in "world"\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringelems"},"string.elems"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.elems() -> typing.Iterable[str]\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7elems"},"string.elems"),": returns an iterable of the bytes values of a string."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.elems()")," returns an iterable value containing the\nsequence of numeric bytes values in the string S."),(0,i.mdx)("p",null,"To materialize the entire sequence of bytes, apply ",(0,i.mdx)("inlineCode",{parentName:"p"},"list(...)")," to the\nresult."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'list("Hello, \u4e16\u754c".elems()) == [\n    "H", "e", "l", "l", "o", ",", " ", "\u4e16", "\u754c"]\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringendswith"},"string.endswith"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.endswith(suffix: str | tuple, /) -> bool\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7endswith"},"string.endswith"),": determine if a string ends with a given suffix."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.endswith(suffix)")," reports whether the string S has the specified\nsuffix."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"filename.sky".endswith(".sky") == True\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringfind"},"string.find"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.find(\n    needle: str,\n    start: None | int = None,\n    end: None | int = None,\n    /\n) -> int\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7find"},"string.find"),": find a substring in a string."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.find(sub[, start[, end]])")," returns the index of the first\noccurrence of the substring ",(0,i.mdx)("inlineCode",{parentName:"p"},"sub")," within S."),(0,i.mdx)("p",null,"If either or both of ",(0,i.mdx)("inlineCode",{parentName:"p"},"start")," or ",(0,i.mdx)("inlineCode",{parentName:"p"},"end")," are specified,\nthey specify a subrange of S to which the search should be restricted.\nThey are interpreted according to Skylark's ",(0,i.mdx)("a",{parentName:"p",href:"#indexing"},"indexing\nconventions"),"."),(0,i.mdx)("p",null,"If no occurrence is found, ",(0,i.mdx)("inlineCode",{parentName:"p"},"found")," returns -1."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"bonbon".find("on") == 1\n"bonbon".find("on", 2) == 4\n"bonbon".find("on", 2, 5) == -1\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringformat"},"string.format"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.format(*args, **kwargs) -> str\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7format"},"string.format"),": format a string."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.format(*args, **kwargs)")," returns a version of the format string S\nin which bracketed portions ",(0,i.mdx)("inlineCode",{parentName:"p"},"{...}")," are replaced\nby arguments from ",(0,i.mdx)("inlineCode",{parentName:"p"},"args")," and ",(0,i.mdx)("inlineCode",{parentName:"p"},"kwargs"),"."),(0,i.mdx)("p",null,"Within the format string, a pair of braces ",(0,i.mdx)("inlineCode",{parentName:"p"},"{{")," or ",(0,i.mdx)("inlineCode",{parentName:"p"},"}}")," is treated as\na literal open or close brace.\nEach unpaired open brace must be matched by a close brace ",(0,i.mdx)("inlineCode",{parentName:"p"},"}"),".\nThe optional text between corresponding open and close braces\nspecifies which argument to use and how to format it, and consists of\nthree components, all optional:\na field name, a conversion preceded by '",(0,i.mdx)("inlineCode",{parentName:"p"},"!"),"', and a format specifier\npreceded by '",(0,i.mdx)("inlineCode",{parentName:"p"},":"),"'."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-text"},"{field}\n{field:spec}\n{field!conv}\n{field!conv:spec}\n")),(0,i.mdx)("p",null,"The ",(0,i.mdx)("em",{parentName:"p"},"field name")," may be either a decimal number or a keyword.\nA number is interpreted as the index of a positional argument;\na keyword specifies the value of a keyword argument.\nIf all the numeric field names form the sequence 0, 1, 2, and so on,\nthey may be omitted and those values will be implied; however,\nthe explicit and implicit forms may not be mixed."),(0,i.mdx)("p",null,"The ",(0,i.mdx)("em",{parentName:"p"},"conversion")," specifies how to convert an argument value ",(0,i.mdx)("inlineCode",{parentName:"p"},"x")," to a\nstring. It may be either ",(0,i.mdx)("inlineCode",{parentName:"p"},"!r"),", which converts the value using\n",(0,i.mdx)("inlineCode",{parentName:"p"},"repr(x)"),", or ",(0,i.mdx)("inlineCode",{parentName:"p"},"!s"),", which converts the value using ",(0,i.mdx)("inlineCode",{parentName:"p"},"str(x)")," and is\nthe default."),(0,i.mdx)("p",null,"The ",(0,i.mdx)("em",{parentName:"p"},"format specifier"),", after a colon, specifies field width,\nalignment, padding, and numeric precision.\nCurrently it must be empty, but it is reserved for future use."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-rust"},'"a {} c".format(3) == "a 3 c"\n"a{x}b{y}c{}".format(1, x=2, y=3) == "a2b3c1"\n"a{}b{}c".format(1, 2) == "a1b2c"\n"({1}, {0})".format("zero", "one") == "(one, zero)"\n"Is {0!r} {0!s}?".format("heterological") == "Is \\"heterological\\" heterological?"\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringindex"},"string.index"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.index(\n    needle: str,\n    start: None | int = None,\n    end: None | int = None,\n    /\n) -> int\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7index"},"string.index"),": search a substring inside a string, failing on not found."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.index(sub[, start[, end]])")," returns the index of the first\noccurrence of the substring ",(0,i.mdx)("inlineCode",{parentName:"p"},"sub")," within S, like ",(0,i.mdx)("inlineCode",{parentName:"p"},"S.find"),", except\nthat if the substring is not found, the operation fails."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"bonbon".index("on") == 1\n"bonbon".index("on", 2) == 4\n"bonbon".index("on", 2, 5)    # error: not found\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringisalnum"},"string.isalnum"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.isalnum() -> bool\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7isalnum"},"string.isalnum"),": test if a string is composed only of letters and digits."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.isalnum()")," reports whether the string S is non-empty and consists\nonly Unicode letters and digits."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"base64".isalnum() == True\n"Catch-22".isalnum() == False\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringisalpha"},"string.isalpha"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.isalpha() -> bool\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7isalpha"},"string.isalpha"),": test if a string is composed only of letters."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.isalpha()")," reports whether the string S is non-empty and consists\nonly of Unicode letters."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"ABC".isalpha() == True\n"Catch-22".isalpha() == False\n"".isalpha() == False\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringisdigit"},"string.isdigit"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.isdigit() -> bool\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7isdigit"},"string.isdigit"),": test if a string is composed only of digits."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.isdigit()")," reports whether the string S is non-empty and consists\nonly of Unicode digits."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"123".isdigit() == True\n"Catch-22".isdigit() == False\n"".isdigit() == False\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringislower"},"string.islower"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.islower() -> bool\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7islower"},"string.islower"),": test if all letters of a string are lowercase."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.islower()")," reports whether the string S contains at least one cased\nUnicode letter, and all such letters are lowercase."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"hello, world".islower() == True\n"Catch-22".islower() == False\n"123".islower() == False\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringisspace"},"string.isspace"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.isspace() -> bool\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7isspace"},"string.isspace"),": test if all characters of a string are whitespaces."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.isspace()")," reports whether the string S is non-empty and consists\nonly of Unicode spaces."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"    ".isspace() == True\n"\\r\\t\\n".isspace() == True\n"".isspace() == False\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringistitle"},"string.istitle"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.istitle() -> bool\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7istitle"},"string.istitle"),": test if the string is title cased."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.istitle()")," reports whether the string S contains at least one cased\nUnicode letter, and all such letters that begin a word are in title\ncase."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"Hello, World!".istitle() == True\n"Catch-22".istitle() == True\n"HAL-9000".istitle() == False\n"123".istitle() == False\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringisupper"},"string.isupper"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.isupper() -> bool\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7isupper"},"string.isupper"),": test if all letters of a string are uppercase."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.isupper()")," reports whether the string S contains at least one cased\nUnicode letter, and all such letters are uppercase."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"HAL-9000".isupper() == True\n"Catch-22".isupper() == False\n"123".isupper() == False\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringjoin"},"string.join"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.join(to_join: typing.Iterable[str], /) -> str\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7join"},"string.join"),": join elements with a separator."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.join(iterable)")," returns the string formed by concatenating each\nelement of its argument, with a copy of the string S between\nsuccessive elements. The argument must be an iterable whose elements\nare strings."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'", ".join([]) == ""\n", ".join(("x", )) == "x"\n", ".join(["one", "two", "three"]) == "one, two, three"\n"a".join("ctmrn".elems()) == "catamaran"\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringlower"},"string.lower"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.lower() -> str\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7lower"},"string.lower"),": test if all letters of a string are lowercased."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.lower()")," returns a copy of the string S with letters converted to\nlowercase."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"Hello, World!".lower() == "hello, world!"\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringlstrip"},"string.lstrip"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.lstrip(chars: str = _, /) -> str\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7lstrip"},"string.lstrip"),": trim leading whitespaces."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.lstrip()")," returns a copy of the string S with leading whitespace removed.\nIn most cases instead of passing an argument you should use ",(0,i.mdx)("inlineCode",{parentName:"p"},"removeprefix"),"."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"  hello  ".lstrip() == "hello  "\n"x!hello  ".lstrip("!x ") == "hello  "\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringpartition"},"string.partition"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.partition(needle: str, /) -> (str, str, str)\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7partition"},"string.partition"),": partition a string in 3 components"),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},'S.partition(x = " ")')," splits string S into three parts and returns them\nas a tuple: the portion before the first occurrence of string ",(0,i.mdx)("inlineCode",{parentName:"p"},"x"),",\n",(0,i.mdx)("inlineCode",{parentName:"p"},"x")," itself, and the portion following it.\nIf S does not contain ",(0,i.mdx)("inlineCode",{parentName:"p"},"x"),", ",(0,i.mdx)("inlineCode",{parentName:"p"},"partition")," returns ",(0,i.mdx)("inlineCode",{parentName:"p"},'(S, "", "")'),"."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"partition")," fails if ",(0,i.mdx)("inlineCode",{parentName:"p"},"x")," is not a string, or is the empty string."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"one/two/three".partition("/") == ("one", "/", "two/three")\n"one".partition("/") == ("one", "", "")\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringremoveprefix"},"string.removeprefix"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.removeprefix(prefix: str, /) -> str\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://docs.python.org/3.9/library/stdtypes.html#str.removeprefix"},"string.removeprefix"),": remove a prefix from a string. ",(0,i.mdx)("em",{parentName:"p"},"Not part of standard Starlark.")),(0,i.mdx)("p",null,"If the string starts with the prefix string, return ",(0,i.mdx)("inlineCode",{parentName:"p"},"string[len(prefix):]"),".\nOtherwise, return a copy of the original string:"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"Hello, World!".removeprefix("Hello") == ", World!"\n"Hello, World!".removeprefix("Goodbye") == "Hello, World!"\n"Hello".removeprefix("Hello") == ""\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringremovesuffix"},"string.removesuffix"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.removesuffix(suffix: str, /) -> str\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://docs.python.org/3.9/library/stdtypes.html#str.removesuffix"},"string.removesuffix"),": remove a prefix from a string. ",(0,i.mdx)("em",{parentName:"p"},"Not part of standard Starlark.")),(0,i.mdx)("p",null,"If the string starts with the prefix string, return ",(0,i.mdx)("inlineCode",{parentName:"p"},"string[len(prefix):]"),".\nOtherwise, return a copy of the original string:"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"Hello, World!".removesuffix("World!") == "Hello, "\n"Hello, World!".removesuffix("World") == "Hello, World!"\n"Hello".removesuffix("Hello") == ""\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringreplace"},"string.replace"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.replace(\n    old: str,\n    new: str,\n    count: int = _,\n    /\n) -> str\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7replace"},"string.replace"),": replace all occurrences of a substring."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.replace(old, new[, count])")," returns a copy of string S with all\noccurrences of substring ",(0,i.mdx)("inlineCode",{parentName:"p"},"old")," replaced by ",(0,i.mdx)("inlineCode",{parentName:"p"},"new"),". If the optional\nargument ",(0,i.mdx)("inlineCode",{parentName:"p"},"count"),", which must be an ",(0,i.mdx)("inlineCode",{parentName:"p"},"int"),", is non-negative, it\nspecifies a maximum number of occurrences to replace."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"banana".replace("a", "o") == "bonono"\n"banana".replace("a", "o", 2) == "bonona"\n"banana".replace("z", "x") == "banana"\n"banana".replace("", "x") == "xbxaxnxaxnxax"\n"banana".replace("", "x", 2) == "xbxanana"\n"".replace("", "x") == "x"\n"# );\n"banana".replace("a", "o", -2)  # error: argument was negative\n"#, "argument was negative");\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringrfind"},"string.rfind"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.rfind(\n    needle: str,\n    start: None | int = None,\n    end: None | int = None,\n    /\n) -> int\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7rfind"},"string.rfind"),": find the last index of a substring."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.rfind(sub[, start[, end]])")," returns the index of the substring ",(0,i.mdx)("inlineCode",{parentName:"p"},"sub"),"\nwithin S, like ",(0,i.mdx)("inlineCode",{parentName:"p"},"S.find"),", except that ",(0,i.mdx)("inlineCode",{parentName:"p"},"rfind")," returns the index of\nthe substring's ",(0,i.mdx)("em",{parentName:"p"},"last")," occurrence."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"bonbon".rfind("on") == 4\n"bonbon".rfind("on", None, 5) == 1\n"bonbon".rfind("on", 2, 5) == -1\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringrindex"},"string.rindex"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.rindex(\n    needle: str,\n    start: None | int = None,\n    end: None | int = None,\n    /\n) -> int\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7rindex"},"string.rindex"),": find the last index of a substring, failing on not found."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.rindex(sub[, start[, end]])")," returns the index of the substring ",(0,i.mdx)("inlineCode",{parentName:"p"},"sub"),"\nwithin S, like ",(0,i.mdx)("inlineCode",{parentName:"p"},"S.index"),", except that ",(0,i.mdx)("inlineCode",{parentName:"p"},"rindex")," returns the index of\nthe substring's ",(0,i.mdx)("em",{parentName:"p"},"last")," occurrence."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"bonbon".rindex("on") == 4\n"bonbon".rindex("on", None, 5) == 1  # in "bonbo"\n"bonbon".rindex("on", 2, 5) #   error: not found\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringrpartition"},"string.rpartition"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.rpartition(needle: str, /) -> (str, str, str)\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7rpartition"},"string.rpartition"),": partition a string in 3 elements."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.rpartition([x = ' '])")," is like ",(0,i.mdx)("inlineCode",{parentName:"p"},"partition"),", but splits ",(0,i.mdx)("inlineCode",{parentName:"p"},"S")," at the\nlast occurrence of ",(0,i.mdx)("inlineCode",{parentName:"p"},"x"),"."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"one/two/three".rpartition("/") == ("one/two", "/", "three")\n"one".rpartition("/") == ("", "", "one")\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringrsplit"},"string.rsplit"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.rsplit(\n    sep: None | str = None,\n    maxsplit: None | int = None,\n    /\n) -> list[str]\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7rsplit"},"string.rsplit"),": splits a string into substrings."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.rsplit([sep[, maxsplit]])")," splits a string into substrings like\n",(0,i.mdx)("inlineCode",{parentName:"p"},"S.split"),", except that when a maximum number of splits is specified,\n",(0,i.mdx)("inlineCode",{parentName:"p"},"rsplit")," chooses the rightmost splits."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"banana".rsplit("n") == ["ba", "a", "a"]\n"banana".rsplit("n", 1) == ["bana", "a"]\n"one two  three".rsplit(None, 1) == ["one two", "three"]\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringrstrip"},"string.rstrip"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.rstrip(chars: str = _, /) -> str\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7rstrip"},"string.rstrip"),": trim trailing whitespace."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.rstrip()")," returns a copy of the string S with trailing whitespace removed.\nIn most cases instead of passing an argument you should use ",(0,i.mdx)("inlineCode",{parentName:"p"},"removesuffix"),"."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"  hello  ".rstrip() == "  hello"\n"  hello!x".rstrip(" x!") == "  hello"\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringsplit"},"string.split"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.split(\n    sep: None | str = None,\n    maxsplit: None | int = None,\n    /\n) -> list[str]\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7split"},"string.split"),": split a string in substrings."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.split([sep [, maxsplit]])")," returns the list of substrings of S,\nsplitting at occurrences of the delimiter string ",(0,i.mdx)("inlineCode",{parentName:"p"},"sep"),"."),(0,i.mdx)("p",null,"Consecutive occurrences of ",(0,i.mdx)("inlineCode",{parentName:"p"},"sep")," are considered to delimit empty\nstrings, so ",(0,i.mdx)("inlineCode",{parentName:"p"},"'food'.split('o')")," returns ",(0,i.mdx)("inlineCode",{parentName:"p"},"['f', '', 'd']"),".\nSplitting an empty string with a specified separator returns ",(0,i.mdx)("inlineCode",{parentName:"p"},"['']"),".\nIf ",(0,i.mdx)("inlineCode",{parentName:"p"},"sep")," is the empty string, ",(0,i.mdx)("inlineCode",{parentName:"p"},"split")," fails."),(0,i.mdx)("p",null,"If ",(0,i.mdx)("inlineCode",{parentName:"p"},"sep")," is not specified or is ",(0,i.mdx)("inlineCode",{parentName:"p"},"None"),", ",(0,i.mdx)("inlineCode",{parentName:"p"},"split")," uses a different\nalgorithm: it removes all leading spaces from S\n(or trailing spaces in the case of ",(0,i.mdx)("inlineCode",{parentName:"p"},"rsplit"),"),\nthen splits the string around each consecutive non-empty sequence of\nUnicode white space characters."),(0,i.mdx)("p",null,"If S consists only of white space, ",(0,i.mdx)("inlineCode",{parentName:"p"},"split")," returns the empty list."),(0,i.mdx)("p",null,"If ",(0,i.mdx)("inlineCode",{parentName:"p"},"maxsplit")," is given and non-negative, it specifies a maximum number\nof splits."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"one two  three".split() == ["one", "two", "three"]\n"one two  three".split(" ") == ["one", "two", "", "three"]\n"one two  three".split(None, 1) == ["one", "two  three"]\n"banana".split("n") == ["ba", "a", "a"]\n"banana".split("n", 1) == ["ba", "ana"]\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringsplitlines"},"string.splitlines"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.splitlines(keepends: bool = False, /) -> list[str]\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7splitlines"},"string.splitlines"),": return the list of lines of a string."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.splitlines([keepends])")," returns a list whose elements are the\nsuccessive lines of S, that is, the strings formed by splitting S at\nline terminators ('\\n', '\\r' or '\\r\\n')."),(0,i.mdx)("p",null,"The optional argument, ",(0,i.mdx)("inlineCode",{parentName:"p"},"keepends"),", is interpreted as a Boolean.\nIf true, line terminators are preserved in the result, though\nthe final element does not necessarily end with a line terminator."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"one\\n\\ntwo".splitlines() == ["one", "", "two"]\n"one\\n\\ntwo".splitlines(True) == ["one\\n", "\\n", "two"]\n"a\\nb".splitlines() == ["a", "b"]\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringstartswith"},"string.startswith"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.startswith(prefix: str | tuple, /) -> bool\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7startswith"},"string.startswith"),": test whether a string starts with a given prefix."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.startswith(suffix)")," reports whether the string S has the specified\nprefix."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},"\"filename.sky\".startswith(\"filename\") == True\n\"filename.sky\".startswith(\"sky\") == False\n'abc'.startswith(('a', 'A')) == True\n'ABC'.startswith(('a', 'A')) == True\n'def'.startswith(('a', 'A')) == False\n")),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringstrip"},"string.strip"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.strip(chars: str = _, /) -> str\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7strip"},"string.strip"),": trim leading and trailing whitespaces."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.strip()")," returns a copy of the string S with leading and trailing\nwhitespace removed."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"  hello  ".strip() == "hello"\n"xxhello!!".strip("x!") == "hello"\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringtitle"},"string.title"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.title() -> str\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7title"},"string.title"),": convert a string to title case."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.lower()")," returns a copy of the string S with letters converted to\ntitlecase."),(0,i.mdx)("p",null,"Letters are converted to uppercase at the start of words, lowercase\nelsewhere."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"hElLo, WoRlD!".title() == "Hello, World!"\n')),(0,i.mdx)("hr",null),(0,i.mdx)("h2",{id:"stringupper"},"string.upper"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-python"},"def string.upper() -> str\n")),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"https://github.com/google/skylark/blob/3705afa472e466b8b061cce44b47c9ddc6db696d/doc/spec.md#string%C2%B7upper"},"string.upper"),": convert a string to all uppercase."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"S.lower()")," returns a copy of the string S with letters converted to\nlowercase."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre"},'"Hello, World!".upper() == "HELLO, WORLD!"\n')))}m.isMDXComponent=!0}}]);