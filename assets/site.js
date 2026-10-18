(function(){
  var root=document.documentElement;
  root.classList.add('js-on');
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
  var COL=[['kelle','#b8702f'],['paça','#b8702f'],['işkembe','#e6d5a3'],['beyran','#d4452a'],['mercimek','#e8902a'],['karalahana','#3f8f6f'],['ezogelin','#d9602a'],['tuzlama','#9c7a45'],['tavuk','#f2d27a'],['domates','#d9382a'],['yayla','#cfe0c0'],['düğün','#e8c870'],['balık','#5a8fb8'],['tarhana','#c9995a'],['kemik','#d9c9a5'],['kuzu','#c98a5a'],['mantar','#a88a6a']];
  function colorOf(name){
    var n=String(name).toLocaleLowerCase('tr');
    for(var i=0;i<COL.length;i++){if(n.indexOf(COL[i][0])===0)return COL[i][1]}
    return '#9aa6b6';
  }
  function paint(scope){
    (scope||document).querySelectorAll('.soups li:not(.none)').forEach(function(li){
      if(!li.style.getPropertyValue('--c'))li.style.setProperty('--c',colorOf(li.textContent));
    });
  }
  function bowls(){
    document.querySelectorAll('.def').forEach(function(d){
      if(d.querySelector('svg'))return;
      var h=d.querySelector('h3'); if(!h)return;
      var c=colorOf(h.textContent);
      d.insertAdjacentHTML('afterbegin','<svg viewBox="0 0 46 46" aria-hidden="true"><path class="stm" d="M15 15c-3-3 3-5 0-10"/><path class="stm" d="M23 15c-3-3 3-5 0-10"/><path class="stm" d="M31 15c-3-3 3-5 0-10"/><path d="M5 21h36c0 11-8 19-18 19S5 32 5 21Z" fill="'+c+'"/><path d="M5 21h36" stroke="#f2efe2" stroke-width="3" stroke-linecap="round"/><path d="M12 31c4 4 14 4 18 0" stroke="rgba(0,0,0,.22)" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>');
    });
  }
  function reveal(){
    var sel='.hub,.rule,.post,.queue li,.def,.stat,.related,.filters';
    var els=[].slice.call(document.querySelectorAll(sel));
    var bars=[].slice.call(document.querySelectorAll('.bars'));
    if(reduce||!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('seen')});bars.forEach(function(b){b.classList.add('seen')});return}
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('seen');io.unobserve(e.target)}});
    },{threshold:0,rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(e,i){e.classList.add('rv');e.style.transitionDelay=((i%3)*70)+'ms';io.observe(e)});
    bars.forEach(function(b){io.observe(b)});
  }
  function ticker(){
    var hero=document.querySelector('.hero');
    if(!hero||typeof V==='undefined'||document.querySelector('.ticker'))return;
    var names=V.filter(function(v){return v.h==='24'}).map(function(v){return v.name});
    if(!names.length)return;
    var one=names.map(function(n){return '<span>'+n.replace(/[&<>]/g,'')+'</span>'}).join('');
    var t=document.createElement('div');
    t.className='ticker';t.setAttribute('aria-hidden','true');
    t.innerHTML='<div class="ttl">Kaynaklarda 7/24</div><div class="track">'+one+one+one+one+'</div>';
    hero.appendChild(t);
  }
  function filterFx(){
    document.addEventListener('click',function(e){
      var c=e.target.closest&&e.target.closest('.chip'); if(!c)return;
      setTimeout(function(){
        var l=document.getElementById('list'); if(!l)return;
        paint(l);
        l.classList.remove('fresh');
        [].slice.call(l.children).slice(0,10).forEach(function(k,i){k.style.setProperty('--i',i)});
        void l.offsetWidth; l.classList.add('fresh');
      },0);
    });
  }
  function readbar(){
    var p=location.pathname;
    if(p.indexOf('/blog/')!==0||p==='/blog/'||p==='/blog')return;
    var b=document.createElement('div');b.className='rbar';b.setAttribute('aria-hidden','true');document.body.appendChild(b);
    var q=false;
    function upd(){q=false;var h=document.documentElement.scrollHeight-innerHeight;b.style.transform='scaleX('+(h>0?Math.min(1,scrollY/h):0)+')'}
    addEventListener('scroll',function(){if(!q){q=true;requestAnimationFrame(upd)}},{passive:true});
    upd();
  }
  function init(){
    paint();bowls();ticker();reveal();filterFx();readbar();
    var l=document.getElementById('list');
    if(l&&'MutationObserver' in window){new MutationObserver(function(){paint(l)}).observe(l,{childList:true})}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
