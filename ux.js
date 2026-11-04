/* Student-facing progress layer. Observes the existing experiment engine; never changes scientific calculations. */
(()=>{
  'use strict';
  const byId = id=>document.getElementById(id);
  const el={step:byId('taskCounter'),bar:byId('targetStatusBar'),meter:byId('targetStatus'),label:byId('targetStatusLabel'),value:byId('targetStatusValue'),cyl:byId('labelCylinderAmount'),total:byId('metricTotal'),precision:byId('precisionCard'),head:byId('helperHead')};
  let lastStep=-1;
  let predictionCorrect=false;
  const pred={less:byId('predDecrease'),more:byId('predIncrease'),text:byId('predictionFeedback'),question:byId('predictionQuestion'),next:byId('continueBtn')};
  function checkPrediction(decreased){
    const ar=localeAr();
    predictionCorrect=decreased;
    pred.less?.setAttribute('aria-pressed',String(decreased));
    pred.more?.setAttribute('aria-pressed',String(!decreased));
    if(pred.next)pred.next.disabled=!decreased;
    if(pred.text){pred.text.textContent=decreased?(ar?'صحيح! كمية المذاب لم تتغير، لكن التركيز انخفض.':'Correct! The amount of solute stays the same as concentration falls.'):(ar?'تحقق من اللون والحجم ثم حاول مجددًا.':'Compare the color and total volume, then try again.');pred.text.classList.toggle('wrong',!decreased);}
  }
  pred.less?.addEventListener('click',()=>checkPrediction(true));
  pred.more?.addEventListener('click',()=>checkPrediction(false));
  let queued=false;
  const numeric=(s)=>Number.parseFloat(String(s||'').replace(/[^\d.\-]/g,''))||0;
  const localeAr=()=>document.documentElement.lang==='ar';
  function refresh(){
    queued=false;
    const step=Math.max(0,Math.min(5,(Number.parseInt(el.step?.textContent||'1',10)||1)-1));
    const ar=localeAr();
    document.body.dataset.step=String(step);
    if(el.meter){
      const isMeasuring=step===1||step===3;
      el.meter.hidden=!isMeasuring;
      if(isMeasuring){
        let current=step===1?numeric(el.cyl?.textContent):numeric(el.total?.textContent);
        const max=step===1?40:100;
        current=Math.max(0,current);
        el.label.textContent=ar?(step===1?'الهدف: المحلول الأصلي':'الهدف: الحجم النهائي'):(step===1?'Stock sample target':'Final volume target');
        el.value.textContent=`${current.toFixed(current%1 ? 1:0)} / ${max} mL`;
        el.bar.style.width=Math.min(100,current/max*100)+'%';
        el.bar.style.background=current>max+.01?'#cf7f57':'#13ac91';
      }
    }
    if(lastStep!==step){
      // The burette panel becomes discoverable at precisely the stage where it helps.
      if(step===3 && el.precision && !el.precision.dataset.openedOnce){
        el.precision.open=true;
        el.precision.dataset.openedOnce='1';
      }
      if(step===4 && lastStep!==4){
        predictionCorrect=false;
        if(pred.next)pred.next.disabled=true;
        pred.less?.setAttribute('aria-pressed','false');
        pred.more?.setAttribute('aria-pressed','false');
        if(pred.text)pred.text.textContent='';
      }
      lastStep=step;
    }
    if(pred.question){
      pred.question.textContent=ar?'ماذا حدث للتركيز بعد إضافة الماء؟':'What happened to concentration after adding water?';
      pred.less.textContent=ar?'قلّ التركيز':'It decreased';
      pred.more.textContent=ar?'زاد التركيز':'It increased';
    }
    if(el.head)el.head.textContent=ar?'الخطوة التالية':'NEXT ACTION';
  }
  function schedule(){if(!queued){queued=true;requestAnimationFrame(refresh)}}
  for(const watched of [el.step,el.cyl,el.total]){
    if(watched)new MutationObserver(schedule).observe(watched,{childList:true,characterData:true,subtree:true});
  }
  const langBtn=byId('languageBtn');if(langBtn)langBtn.addEventListener('click',()=>requestAnimationFrame(schedule));
  // For real glassware, visuals should not depend on page-level touch scrolling.
  const viewport=byId('viewport');
  if(viewport)viewport.addEventListener('touchmove',e=>{if(e.target?.tagName==='CANVAS')e.preventDefault();},{passive:false});
  // Expand instrument controls when the learner explicitly focuses on the scale.
  byId('scaleFocusBtn')?.addEventListener('click',()=>{
    if(el.precision && byId('scaleFocusBtn').getAttribute('aria-pressed')==='true')el.precision.open=true;
  });
  refresh();
})();
