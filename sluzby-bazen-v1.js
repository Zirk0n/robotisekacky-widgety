/* Skript modré bazénové šablony služeb – vytaženo 10. 11. 2026, beze změny logiky. */
(function(){
/* CAROUSELS */
document.querySelectorAll('.carousel').forEach(function(car){
var track=car.querySelector('.c-track'),slides=car.querySelectorAll('.c-slide'),dots=car.querySelectorAll('.dot'),btns=car.querySelectorAll('.c-btn'),cur=0,timer;
function go(n){
if(dots[cur])dots[cur].classList.remove('is-active');
cur=((n%slides.length)+slides.length)%slides.length;
track.style.transform='translateX(-'+(cur*100)+'%)';
if(dots[cur]){dots[cur].classList.add('is-active');var f=dots[cur].querySelector('.fill');if(f){f.style.animation='none';f.offsetHeight;f.style.animation='';}}
clearTimeout(timer);timer=setTimeout(function(){go(cur+1);},6000);
}
dots.forEach(function(d,i){d.addEventListener('click',function(){go(i);});});
if(btns[0])btns[0].addEventListener('click',function(){go(cur-1);});
if(btns[1])btns[1].addEventListener('click',function(){go(cur+1);});
go(0);
});
/* HEUREKA MODAL */
var ov=document.getElementById('rsw-overlay');
function openMod(){if(ov){ov.classList.add('is-open');document.body.style.overflow='hidden';}}
function closeMod(){if(ov){ov.classList.remove('is-open');document.body.style.overflow='';}}
document.querySelectorAll('[data-modal]').forEach(function(el){el.addEventListener('click',openMod);});
var cb=document.getElementById('rsw-close-btn');if(cb)cb.addEventListener('click',closeMod);
if(ov)ov.addEventListener('click',function(e){if(e.target===this)closeMod();});
/* FAQ */
var faq=document.querySelector('.faq');
if(faq){
var hdr=faq.querySelector('.faq-header'),tog=faq.querySelector('.faq-toggle'),chv=faq.querySelector('.chev');
function tFaq(){var o=faq.classList.contains('is-open');faq.classList.toggle('is-open',!o);if(chv)chv.style.transform=o?'rotate(90deg)':'rotate(-90deg)';}
if(hdr)hdr.addEventListener('click',tFaq);
if(tog)tog.addEventListener('click',function(e){e.stopPropagation();tFaq();});
var lys=faq.querySelectorAll('.faq-teaser .layer');
if(lys.length>1){var ti=0;lys.forEach(function(l,i){l.style.opacity=i===0?'1':'0';l.style.transform=i===0?'translateY(0)':'translateY(100%)';});setInterval(function(){lys[ti].style.opacity='0';lys[ti].style.transform='translateY(-100%)';ti=(ti+1)%lys.length;lys[ti].style.opacity='1';lys[ti].style.transform='translateY(0)';},3000);}
faq.querySelectorAll('.faq-question').forEach(function(btn){btn.addEventListener('click',function(e){e.stopPropagation();var it=this.closest('.faq-item'),wo=it.classList.contains('is-open');faq.querySelectorAll('.faq-item').forEach(function(i){i.classList.remove('is-open');});if(!wo)it.classList.add('is-open');});});
}
/* LIGHTBOX */
var lb=document.getElementById('rvLightbox'),lbI=document.getElementById('rvLbImg'),lbA=[],lbX=0;
document.querySelectorAll('.zoomable').forEach(function(img){img.addEventListener('click',function(){lbA=Array.from(document.querySelectorAll('.zoomable'));lbX=lbA.indexOf(this);lbI.src=this.src;lbI.alt=this.alt;if(lb)lb.classList.add('is-open');document.body.style.overflow='hidden';});});
function lbCl(){if(lb)lb.classList.remove('is-open');document.body.style.overflow='';}
if(lb)lb.addEventListener('click',function(e){if(e.target===this)lbCl();});
var lbc=document.getElementById('rvLbClose'),lbp=document.getElementById('rvLbPrev'),lbn=document.getElementById('rvLbNext');
if(lbc)lbc.addEventListener('click',lbCl);
if(lbp)lbp.addEventListener('click',function(){if(!lbA.length)return;lbX=((lbX-1)+lbA.length)%lbA.length;lbI.src=lbA[lbX].src;});
if(lbn)lbn.addEventListener('click',function(){if(!lbA.length)return;lbX=(lbX+1)%lbA.length;lbI.src=lbA[lbX].src;});
/* SCROLL REVEAL */
if('IntersectionObserver' in window){
var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('sr-in');obs.unobserve(e.target);}});},{threshold:0.07,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.sr').forEach(function(el){obs.observe(el);});
} else {document.querySelectorAll('.sr').forEach(function(el){el.classList.add('sr-in');});}
})();
/* HEUREKA COUNT */
(function(){
var done=false;
function run(){
if(done)return;
var txt=document.body.innerText||'';
var pats=[/5[,.]0\s+(\d{2,})\s*hodnocen/i,/(\d{2,})\s+hodnocen[íi]/gi,/z\s+(\d{2,})\s+hodnocen/i];
var count=null;
for(var p=0;p<pats.length;p++){var m=txt.match(pats[p]);if(m&&m[1]){var n=parseInt(m[1],10);if(n>50&&n<10000){count=n;break;}}}
if(count&&count>0){
done=true;
['heurekaCountModal','heurekaCountModal2','heurekaCountModal3','heurekaCount','heurekaCountMain'].forEach(function(id){var el=document.getElementById(id);if(el)el.textContent=count;});
}
}
if(document.readyState==='complete'){setTimeout(run,600);}else{window.addEventListener('load',function(){setTimeout(run,600);});}
setTimeout(function(){if(!done)run();},2200);
setTimeout(function(){if(!done)run();},4500);
})();
