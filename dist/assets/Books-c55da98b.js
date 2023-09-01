import{_ as p,S as b,B as f,a as m,I as g,s as I,b as w,r as h,o as r,c as d,d as e,e as o,f as c,F as S,g as x,t as u,p as y,h as C}from"./index-021850da.js";const L={components:{SearchBar:b,Button:f,SortIcon:m,InputField:g},data(){return{students:I,books:w,searchBook:"",currentBook:void 0,showBookInfo:!1}},methods:{selectBook:function(t){this.currentBook=t,this.showBookInfo=!0,console.log("Book selcted "+this.currentBook)},saveBook:function(){console.log(this.currentBook.title+" saved"),this.currentBook=void 0,this.showBookInfo=!1},newBook:function(){console.log("open new book"),this.currentBook={id:1,title:"",author:"",language:"",foreign_language:!1,points:0,iban:""},this.showBookInfo=!0}},computed:{filteredBooksList(){var t=this.searchBook.toLowerCase();return this.books.filter(s=>s.title.toLowerCase().includes(t)||s.author.toLowerCase().includes(t)||s.language.toLowerCase().includes(t)||s.iban.toLowerCase().includes(t))}}},v=t=>(y("data-v-7c930fa4"),t=t(),C(),t),V={id:"main-books"},F={class:"books-list-section"},N=v(()=>e("h1",null,"Bücher",-1)),A={class:"books-list ui-table"},T={class:"table-row table-header-row"},z={class:"table-cell"},D={class:"table-cell"},E={class:"table-cell"},K={class:"table-cell"},U={class:"table-cell"},j={class:"table-data"},q=["onClick"],G={class:"table-cell"},H={class:"table-cell"},J={class:"table-cell"},M={class:"table-cell"},O={class:"table-cell"},P={class:"books-list-section-footer"},Q=v(()=>e("div",{class:"vertical-line"},null,-1)),R={class:"book-information-section"},W={key:0,class:"content"},X={class:"book-header-title"},Y=v(()=>e("h1",null,"Buch",-1)),Z={class:"book-information"},$={key:1,id:"no_book_selected"},ee=v(()=>e("br",null,null,-1));function oe(t,s,te,se,l,_){const k=h("SearchBar"),a=h("SortIcon"),B=h("Button"),i=h("InputField");return r(),d("main",V,[e("div",F,[N,o(k,{modelValue:l.searchBook,"onUpdate:modelValue":s[0]||(s[0]=n=>l.searchBook=n),placeholder:"Suche Bücher..."},null,8,["modelValue"]),e("div",A,[e("div",T,[e("div",z,[c("Titel "),o(a)]),e("div",D,[c("Autor:in "),o(a)]),e("div",E,[c("Sprache "),o(a)]),e("div",K,[c("Lose "),o(a)]),e("div",U,[c("IBAN "),o(a)])]),e("div",j,[(r(!0),d(S,null,x(_.filteredBooksList,n=>(r(),d("div",{class:"table-row",onClick:ne=>_.selectBook(n)},[e("div",G,u(n.title),1),e("div",H,u(n.author),1),e("div",J,u(n.language),1),e("div",M,u(n.points),1),e("div",O,u(n.iban),1)],8,q))),256))])]),e("div",P,[o(B,{type:"add",text:"Buch hinzufügen",onClick:s[1]||(s[1]=n=>_.newBook())})])]),Q,e("div",R,[l.showBookInfo==!0?(r(),d("div",W,[e("div",X,[Y,o(B,{type:"yes",text:"Speichern und schließen",onClick:s[2]||(s[2]=n=>_.saveBook())})]),e("div",Z,[o(i,{text:"Titel   ",variable:"",value:l.currentBook.title},null,8,["value"]),o(i,{text:"Autor",variable:"",value:l.currentBook.author},null,8,["value"]),o(i,{text:"Sprache",variable:"",value:l.currentBook.language},null,8,["value"]),o(i,{text:"Lose   ",variable:"",number:"number",value:l.currentBook.points},null,8,["value"]),o(i,{text:"IBAN",variable:"",value:l.currentBook.iban},null,8,["value"])])])):(r(),d("div",$,[c("Klicken Sie auf ein Buch,"),ee,c(" um dessen Informationen zu bearbeiten")]))])])}const ce=p(L,[["render",oe],["__scopeId","data-v-7c930fa4"]]);export{ce as default};
