const display=document.getElementById("display");
let expr="";
function render(){display.value=expr||"0"}
document.getElementById("keypad").addEventListener("click",e=>{
 const b=e.target.closest("button"); if(!b)return;
 if(b.dataset.value!==undefined){expr+=b.dataset.value;render();return}
 const a=b.dataset.action;
 if(a==="clear"){expr="";render()}
 if(a==="back"){expr=expr.slice(0,-1);render()}
 if(a==="divide"){expr+="/";render()}
 if(a==="equals"){
   try{expr=String(Function('"use strict";return ('+expr.replace(/%/g,"/100")+')')());render()}
   catch{display.value="Error";expr=""}
 }
});
document.addEventListener("keydown",e=>{
 if(/[0-9+\-*/().%]/.test(e.key)){expr+=e.key;render()}
 else if(e.key==="Enter"){document.querySelector('[data-action="equals"]').click()}
 else if(e.key==="Backspace"){expr=expr.slice(0,-1);render()}
 else if(e.key==="Escape"){expr="";render()}
});
function sciVal(v){const d=document.getElementById("sciDisplay");d.value=d.value==="0"?v:d.value+v}
function sci(op){
 const d=document.getElementById("sciDisplay");let n=parseFloat(d.value);
 try{
  if(op==="clear")d.value="0";
  else if(op==="back")d.value=d.value.slice(0,-1)||"0";
  else if(op==="pi")d.value=Math.PI;
  else if(op==="sqrt")d.value=Math.sqrt(n);
  else if(op==="square")d.value=n*n;
  else if(op==="cube")d.value=n*n*n;
  else if(op==="sin")d.value=Math.sin(n*Math.PI/180);
  else if(op==="cos")d.value=Math.cos(n*Math.PI/180);
  else if(op==="tan")d.value=Math.tan(n*Math.PI/180);
  else if(op==="log")d.value=Math.log10(n);
  else if(op==="ln")d.value=Math.log(n);
  else if(op==="equals")d.value=eval(d.value);
 }catch{d.value="Error"}
}
function simpleCalc(){let a=+simpleA.value,b=+simpleB.value,o=simpleOp.value,r=o==="+"?a+b:o==="-"?a-b:o==="*"?a*b:b===0?"Error":a/b;simpleResult.textContent="Result: "+r}
function tipCalc(){let b=+bill.value,p=+tipPercent.value,n=Math.max(1,+people.value||1),t=b*p/100;tipResult.textContent=`Tip: ${t.toFixed(2)} | Total: ${(b+t).toFixed(2)} | Per person: ${((b+t)/n).toFixed(2)}`}
function percentCalc(){let a=+pctA.value,b=+pctB.value;pctResult.textContent=`${b}% of ${a} = ${(a*b/100).toFixed(4)}`}
function rootCalc(){let n=+rootNumber.value,d=+rootDegree.value;r=Math.pow(n,1/d);rootResult.textContent=Number.isFinite(r)?`Result: ${r}`:"Invalid root"}
const units={mm:1,cm:.01,m:1,km:1000,in:.0254,ft:.3048,yd:.9144,mi:1609.344};
function lengthCalc(){let v=+lengthValue.value,r=v*units[fromUnit.value]/units[toUnit.value];lengthResult.textContent=`Result: ${r} ${toUnit.value}`}
document.querySelector(".nav-toggle").onclick=()=>document.querySelector(".nav-links").classList.toggle("open");
