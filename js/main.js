// REFRESH SCROLL TO TOP
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
}

const NAV=[["Work","work.html"],["Archive","archive.html"],["About","about.html"],["Blog","blog.html"],["Contact","blog.html#contact"]];
const page=document.body.dataset.page;
function fan(w){const h=w/2,r=h-2;let l="";for(let a=0;a<=180;a+=20){const t=a*Math.PI/180;l+=`<line x1="${w/2}" y1="${h}" x2="${(w/2+r*Math.cos(t)).toFixed(1)}" y2="${(h-r*Math.sin(t)).toFixed(1)}"/>`}
return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true" fill="none" stroke="#A8863A" stroke-width="1.5">${l}<path d="M2 ${h}A${r} ${r} 0 0 1 ${w-2} ${h}"/></svg>`}
document.getElementById("masthead").innerHTML=`<div class="top label"><span class="fan">${fan(34)}Issue 01 · Fall 2026</span><span>Data Scientist</span></div>
<a class="name" href="index.html">Vicki Bui</a>
<button class="menu-btn label" aria-expanded="false" aria-controls="menu">Menu</button>
<div class="dr"></div><nav id="menu" aria-label="Main"><ul>${NAV.map(([n,h])=>`<li><a href="${h}"${page===n.toLowerCase()?' aria-current="page"':""}>${n}</a></li>`).join("")}</ul></nav><div class="dr"></div>`;
const dia='<i class="dia" aria-hidden="true"></i>';
document.getElementById("footer").innerHTML=`<div class="dr"></div><div class="foot label"><span>© 2026 Vicki Bui</span>${dia}<span>Available for opportunities &amp; full-time roles</span>${dia}<span><a href="mailto:vickibui3@gmail.com">Email</a> · <a href="https://www.linkedin.com/in/vickibui">LinkedIn</a> · <a href="https://github.com/vickibui">GitHub</a> · <a href="https://thegroundedtechjournal.substack.com/">Substack</a></span></div>
<p class="colophon"><em>Colophon.</em> Set in Vanity by Hendrick Rolandez, with a Didone serif for headlines and Inter for text. A quiet nod to Art Deco, my favorite style. Coded in VS Code and hosted on GitHub Pages. Issue 01, Fall 2026.</p>`;
const mb=document.querySelector(".menu-btn"),nv=document.getElementById("menu");
mb.onclick=()=>{const o=nv.classList.toggle("open");mb.setAttribute("aria-expanded",o)};
const list=document.getElementById("list");
if(list){
 const roman=n=>["","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX"][n]||n;
 const slug=t=>t.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
 const sel={category:new Set(),skills:new Set(),tools:new Set()};
 const panel=document.getElementById("panel"),fb=document.querySelectorAll("[data-filter]");
 panel.querySelector(".cols").innerHTML=Object.entries(GROUPS).map(([k,v])=>`<div><div class="label red tag">${k}</div>${v.map(x=>`<label><input type="checkbox" data-k="${k}" value="${x}">${x}</label>`).join("")}</div>`).join("");
 fb.forEach(b=>b.onclick=()=>{const o=panel.classList.toggle("open");fb.forEach(x=>{x.classList.toggle("on",o);x.setAttribute("aria-expanded",o)})});
 panel.onchange=e=>{const c=e.target;c.checked?sel[c.dataset.k].add(c.value):sel[c.dataset.k].delete(c.value);render()};
 const ok=p=>Object.keys(sel).every(k=>!sel[k].size||p[k].some(v=>sel[k].has(v)));
 let rt=0;
 function render(){
  const items=ARCHIVE.filter(ok);let n=0,h="";
  ["Project","Paper"].forEach(t=>{const g=items.filter(p=>p.type===t);if(!g.length)return;
   h+=`<div class="label red sec">${t}s</div>`+g.map(p=>`<a class="row" href="${p.url||"#"}"><span class="label red">${roman(++n)}</span><span class="t">${p.title}</span><span class="label mute k">${p.type}</span><span class="label y">${p.date}</span></a>`).join("")+'<div class="gap"></div>'});
  list.innerHTML=h||'<p class="mute">Nothing matches those filters.</p>';
  const tok=++rt;
  Promise.all(items.map((p,i)=>new Promise(r=>{const im=new Image();im.onload=()=>r(im.naturalHeight/im.naturalWidth);im.onerror=()=>r([.75,1.33,1][i%3]);im.src=`images/archive/${slug(p.title)}.jpg`}))).then(rs=>{
   if(tok!==rt)return;const c=["",""],h=[0,0];
   items.forEach((p,i)=>{const k=h[1]<h[0]?1:0;h[k]+=rs[i]+.05;c[k]+=`<a class="thumb" href="${p.url||"#"}"><figure class="frame" style="--r:${rs[i]}"><img src="images/archive/${slug(p.title)}.jpg" alt="" onerror="this.parentNode.classList.add('missing');this.remove()"></figure><span class="ov label">${p.title}</span></a>`});
   document.getElementById("thumbs").innerHTML=`<div class="mcol">${c[0]}</div><div class="mcol">${c[1]}</div>`});  fb.forEach(b=>{const k=b.dataset.filter;b.firstChild.textContent=k+(sel[k].size?` (${sel[k].size})`:"")+" ⌄"});
 }
 render();
}

// OPEN LINKS IN NEW TAB
function openExternal(){
  document.querySelectorAll('a[href^="http"]').forEach(a=>{
    if(a.hostname!==location.hostname){a.target="_blank";a.rel="noopener noreferrer"}
  });
}
openExternal();