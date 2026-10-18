(function(){
  var ID='G-T7PW3K15FL',KEY='cni-consent';
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments)}
  window.gtag=gtag;
  gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});
  var loaded=false,bar=null;
  function get(){try{return localStorage.getItem(KEY)}catch(e){return null}}
  function put(v){try{localStorage.setItem(KEY,v)}catch(e){}}
  function load(){
    if(loaded)return;loaded=true;
    window['ga-disable-'+ID]=false;
    gtag('consent','update',{analytics_storage:'granted'});
    gtag('js',new Date());
    gtag('config',ID,{allow_google_signals:false,allow_ad_personalization_signals:false});
    var s=document.createElement('script');s.async=true;
    s.src='https://www.googletagmanager.com/gtag/js?id='+ID;
    document.head.appendChild(s);
  }
  function wipe(){
    window['ga-disable-'+ID]=true;
    var parts=location.hostname.split('.'),doms=[location.hostname,'.'+location.hostname];
    if(parts.length>2)doms.push('.'+parts.slice(-2).join('.'));
    document.cookie.split(';').forEach(function(c){
      var n=c.split('=')[0].trim();
      if(n.indexOf('_ga')===0){doms.forEach(function(d){document.cookie=n+'=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain='+d});document.cookie=n+'=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/'}
    });
  }
  var css='.cc{position:fixed;left:12px;right:12px;bottom:12px;z-index:9999;max-width:640px;margin:0 auto;background:#0e1a33;color:#f6f3e8;border:2px solid #e7ae16;border-radius:14px;padding:16px 18px;box-shadow:0 10px 34px rgba(0,0,0,.4);font:500 15px/1.5 Figtree,system-ui,sans-serif;animation:ccin .35s ease-out}'+
  '.cc p{margin:0 0 12px;max-width:none}.cc a{color:#f4c21d;text-decoration:underline}'+
  '.cc .cb{display:flex;gap:10px;flex-wrap:wrap}'+
  '.cc button{flex:1 1 140px;min-height:44px;border-radius:10px;border:2px solid #e7ae16;font:700 15px Figtree,system-ui,sans-serif;cursor:pointer;padding:8px 14px}'+
  '.cc .ok{background:#e7ae16;color:#14223a}.cc .no{background:transparent;color:#f6f3e8}'+
  '.cc button:focus-visible{outline:3px solid #fff;outline-offset:2px}'+
  '@keyframes ccin{from{transform:translateY(20px);opacity:0}to{transform:none;opacity:1}}'+
  '@media(prefers-reduced-motion:reduce){.cc{animation:none}}';
  function show(){
    if(bar)return;
    bar=document.createElement('div');bar.className='cc';bar.setAttribute('role','dialog');bar.setAttribute('aria-label','Çerez tercihleri');
    bar.innerHTML='<p>Ziyaretçi sayısını ve hangi sayfaların okunduğunu ölçmek için Google Analytics kullanıyoruz. Onay verirsen analiz çerezleri kullanılır; vermezsen hiçbir ölçüm yapılmaz. Ayrıntılar: <a href="/cerez/">çerez politikası</a>.</p><div class="cb"><button type="button" class="ok">Kabul et</button><button type="button" class="no">Reddet</button></div>';
    bar.querySelector('.ok').addEventListener('click',function(){put('granted');load();hide()});
    bar.querySelector('.no').addEventListener('click',function(){put('denied');wipe();hide()});
    document.body.appendChild(bar);
    bar.querySelector('.ok').focus({preventScroll:true});
  }
  function hide(){if(bar){bar.remove();bar=null}}
  function ready(){
    var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    var nav=document.querySelector('nav[aria-label="Site bilgileri"]');
    if(nav){var a=document.createElement('a');a.href='#cerez-tercihleri';a.textContent='Çerez tercihleri';a.addEventListener('click',function(e){e.preventDefault();show()});nav.appendChild(a)}
    if(get()!=='granted'&&get()!=='denied')show();
  }
  if(get()==='granted')load();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
})();
