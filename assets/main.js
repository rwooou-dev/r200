(function(){
  // قائمة الجوال
  var btn=document.querySelector('.menu-btn');
  var nav=document.querySelector('header nav');
  if(btn&&nav){
    btn.addEventListener('click',function(){
      var open=nav.classList.toggle('open');
      btn.setAttribute('aria-expanded',open?'true':'false');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded','false');
      });
    });
  }

  // تبويبات الخدمات
  var tabs=document.querySelectorAll('.svc-tab');
  var panels=document.querySelectorAll('.svc-panel');
  tabs.forEach(function(t){
    t.addEventListener('click',function(){
      var i=t.getAttribute('data-i');
      tabs.forEach(function(x){
        var on=x===t;
        x.classList.toggle('on',on);
        x.setAttribute('aria-selected',on?'true':'false');
      });
      panels.forEach(function(p){
        p.classList.toggle('on',p.getAttribute('data-i')===i);
      });
    });
  });

  // زر النسخ
  var toast=document.querySelector('.toast');
  var timer;
  function showToast(msg){
    if(!toast)return;
    toast.textContent=msg||toast.getAttribute('data-ok')||'تم النسخ';
    toast.classList.add('show');
    clearTimeout(timer);
    timer=setTimeout(function(){toast.classList.remove('show');},1800);
  }
  function fallbackCopy(text){
    var ta=document.createElement('textarea');
    ta.value=text;ta.style.position='fixed';ta.style.opacity='0';
    document.body.appendChild(ta);ta.select();
    try{document.execCommand('copy');}catch(e){}
    document.body.removeChild(ta);
  }
  document.querySelectorAll('[data-copy]').forEach(function(b){
    b.addEventListener('click',function(){
      var text=b.getAttribute('data-copy');
      if(navigator.clipboard&&window.isSecureContext){
        navigator.clipboard.writeText(text).then(function(){showToast();},function(){fallbackCopy(text);showToast();});
      }else{fallbackCopy(text);showToast();}
    });
  });

  // ظهور العناصر عند التمرير
  var items=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
      });
    },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    items.forEach(function(el){io.observe(el);});
  }else{
    items.forEach(function(el){el.classList.add('in');});
  }

  // السنة في الفوتر
  var yr=document.getElementById('yr');
  if(yr)yr.textContent=new Date().getFullYear();
})();
