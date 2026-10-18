(function(){
  function initCategoryEnhancements(){
    var intro=document.querySelector('.rs-cat-intro');
    if(intro && intro.dataset.topReady!=='1'){
      intro.dataset.topReady='1';
      intro.querySelectorAll('.rs-cat-topitem').forEach(function(item){
        item.setAttribute('tabindex','0');
        item.setAttribute('role','button');
        item.setAttribute('aria-expanded','false');
        function toggle(force){
          var open=typeof force==='boolean'?force:!item.classList.contains('rs-cat-topitem--open');
          intro.querySelectorAll('.rs-cat-topitem--open').forEach(function(other){if(other!==item){other.classList.remove('rs-cat-topitem--open');other.setAttribute('aria-expanded','false');}});
          item.classList.toggle('rs-cat-topitem--open',open);
          item.setAttribute('aria-expanded',open?'true':'false');
        }
        item.addEventListener('click',function(){toggle();});
        item.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});
      });
    }
    var box=document.querySelector('.rs-cat-reviews--carousel');
    if(!box || box.dataset.ready==='1')return;
    box.dataset.ready='1';
    var track=box.querySelector('.rs-cat-review-track');
    var prev=box.querySelector('.rs-cat-review-prev');
    var next=box.querySelector('.rs-cat-review-next');
    var dotsWrap=box.querySelector('.rs-cat-review-dots');
    var timer=null;
    var reduce=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function step(){var card=track&&track.querySelector('.rs-cat-review');return card?card.getBoundingClientRect().width+12:280;}
    function maxScroll(){return track?Math.max(0,track.scrollWidth-track.clientWidth):0;}
    function pageCount(){return track?Math.max(1,Math.ceil(maxScroll()/step())+1):1;}
    function activeIndex(){return track?Math.min(pageCount()-1,Math.round(track.scrollLeft/step())):0;}
    function renderDots(){if(!dotsWrap||!track)return;var n=pageCount();dotsWrap.innerHTML='';for(var i=0;i<n;i++){var dot=document.createElement('button');dot.type='button';dot.className='rs-cat-review-dot'+(i===activeIndex()?' is-active':'');dot.setAttribute('aria-label','Přejít na recenze '+(i+1));dot.dataset.index=i;dot.addEventListener('click',function(){pause();track.scrollTo({left:Number(this.dataset.index)*step(),behavior:'smooth'});window.setTimeout(function(){updateDots();play();},650);});dotsWrap.appendChild(dot);} }
    function updateDots(){if(!dotsWrap)return;var idx=activeIndex();dotsWrap.querySelectorAll('.rs-cat-review-dot').forEach(function(d,i){d.classList.toggle('is-active',i===idx);});}
    function go(dir){if(!track)return;var max=maxScroll();var target=track.scrollLeft+(step()*dir);if(dir>0 && target>=max-8){track.scrollTo({left:0,behavior:'smooth'});}else if(dir<0 && target<=0){track.scrollTo({left:max,behavior:'smooth'});}else{track.scrollBy({left:step()*dir,behavior:'smooth'});}window.setTimeout(updateDots,520);}
    function pause(){if(timer){clearInterval(timer);timer=null;}}
    function play(){if(reduce||!track||track.scrollWidth<=track.clientWidth+8||timer)return;timer=setInterval(function(){go(1);},4200);}
    if(prev&&track)prev.addEventListener('click',function(e){e.preventDefault();pause();go(-1);window.setTimeout(play,900);});
    if(next&&track)next.addEventListener('click',function(e){e.preventDefault();pause();go(1);window.setTimeout(play,900);});
    if(track){track.addEventListener('scroll',function(){window.requestAnimationFrame(updateDots);},{passive:true});track.addEventListener('keydown',function(e){if(e.key==='ArrowLeft'){e.preventDefault();pause();go(-1);window.setTimeout(play,900);} if(e.key==='ArrowRight'){e.preventDefault();pause();go(1);window.setTimeout(play,900);}});}
    box.addEventListener('mouseenter',pause);box.addEventListener('mouseleave',play);box.addEventListener('focusin',pause);box.addEventListener('focusout',play);
    document.addEventListener('visibilitychange',function(){if(document.hidden)pause();else play();});
    window.addEventListener('resize',function(){pause();renderDots();updateDots();play();});
    renderDots();updateDots();play();
    function setText(sel,val){var el=box.querySelector(sel);if(el&&val)el.textContent=val;}
    fetch('/hodnoceni-obchodu/',{credentials:'same-origin'}).then(function(r){return r.text();}).then(function(html){
      var doc=new DOMParser().parseFromString(html,'text/html');
      var countText=(doc.querySelector('.stars-label')||{}).textContent||'';
      var avgText=(doc.querySelector('.rate-average')||{}).textContent||'';
      var cm=countText.match(/(\d+)/); var am=avgText.match(/(\d+[,.]?\d*)/);
      if(cm)setText('.rs-cat-review-count',cm[1]+'+');
      if(am)setText('.rs-cat-rating-val',am[1].replace('.',','));
    }).catch(function(){});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initCategoryEnhancements);else initCategoryEnhancements();
})();