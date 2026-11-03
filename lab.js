import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const $ = (id) => document.getElementById(id);
// Actual Table_02.glb worktop slab (Cube_c03565) top is Y=1.0979.
// Y=1.5326 is the tall rear furniture: using that value made glassware float.
// +1.6 mm keeps the vessel bases just above the physical surface.
const MAX_BEAKER = 200, TABLE_Y = 1.0995;
const labels = {
  en: {
    scaleFocus:'Scale view',scaleOverview:'Overview',scaleFocusTitle:'Digital scale',scaleHint:'Place the mixing beaker on the platform',scalePlaced:'Beaker on scale · ready to tare',stationHeading:'PRECISION STATION',stationLive:'LIVE',scaleTitle:'⚖ Digital scale',buretteTitle:'💧 Burette · water',scaleTare:'Tare / zero',valveHold:'Hold to dispense',valveRunning:'Dispensing…',stationDescription:'Move the mixing beaker onto the scale for an approximate mass reading (ρ ≈ 1 g/mL). Use Tare to zero it. During water addition, place the beaker under the burette, then hold the valve.',stationDock:'Drag the mixing beaker under the burette to enable dispensing.',stationReady:'Beaker docked. Hold the burette valve to release water drop by drop.',stationEmpty:'The burette is empty. Use the original distilled-water beaker to finish.',stationWeigh:'Move the beaker onto the weighing platform before taring.',stationTared:'Scale zeroed with the beaker on the platform.',stationFill:'Stop at exactly 100 mL total. You can still use the original pouring method.',stationWrongStep:'The burette is available during the distilled-water step.',stationNoBeaker:'Move the mixing beaker onto the scale to see its mass.',stationScale:'Digital scale',stationBurette:'Water burette',stationDocked:'Beaker under burette',stationScaleDocked:'Beaker on scale',stationOnScale:'Beaker placed on scale. Press Tare to exclude the container mass.',stationTareNoObject:'Scale reset to zero. Place the mixing beaker on its platform.',stationWaterDone:'Final volume is 100 mL. Observe the diluted solution.',stationOver:'The target volume has been reached; the valve has closed automatically.',stationStepDesc:'Optional: drag the mixing beaker under the burette and hold the valve to add distilled water drop by drop.',
    transferTitle:'Pouring liquid',header:'EXPERIMENT 01 / SOLUTION DILUTION',eyebrow:'LABORATORY · PHYSICAL CHEMISTRY',stage:'The art of dilution', helperHead:'YOUR EXPERIMENT',
    foot:'Drag equipment to move · Bring vessels together to pour',hint:'✧ Get a hint',tray:'EQUIPMENT · DRAG TO EXPLORE',introEyebrow:'EXPLORE · UNDERSTAND · DISCOVER',introTitle:'Dilution of solutions',introDesc:'Discover how water changes concentration without changing the amount of solute.',stepHeading:'Lab procedure',complete:'complete',taskKicker:'CURRENT TASK',volumeTitle:'Amount to pour',controlStock:'Choose an amount, then drag the stock flask beside the cylinder.',controlWater:'Choose an amount, then drag the water beaker beside the mixing beaker.',observationTitle:'Compare the solution colors',observationCaption:'The color becomes lighter because the same solute is spread through a larger volume.',continue:'Continue to calculation →',quizTitle:'Calculate the new concentration',quizDesc:'40 mL of 1.00 M solution is diluted to 100 mL. What is C₂ (mol/L)?',check:'Check',idle:'Drag the equipment in the 3D scene to begin.',live:'Live measurements',soln:'Solute solution',waterAdded:'Added water',total:'Total volume',stock:'Stock solution',cylinder:'Cylinder',beaker:'Mixing beaker',water:'Distilled water',dragPlace:'Drag to place',onTable:'On the table',ready:'Ready',moved:'On table',soundOn:'Sound on',soundOff:'Sound off',reset:'Reset',resetQuestion:'Start the experiment again? All measurements will be cleared.',placeBadge:'🧪 Place on workbench',
    stepNames:['Prepare apparatus','Measure stock','Transfer sample','Add distilled water','Observe the change','Calculate concentration'],
    stepDetails:[
      'Drag the graduated cylinder from the tray into the 3D laboratory and set it on the bench.',
      'Measure exactly 40 mL of the 1.00 M stock solution. Choose an amount and drag the stock flask next to the cylinder. You may pour more than once.',
      'Lift the graduated cylinder and drag it beside the empty mixing beaker to pour your 40 mL sample.',
      'Add distilled water until the total solution volume reaches exactly 100 mL. Choose an amount, then drag the water vessel beside the mixing beaker.',
      'Examine the liquid. The color is lighter because concentration decreases as total volume increases.',
      'Use C₁V₁ = C₂V₂ to calculate the final concentration, then check your answer.'
    ],
    hintSteps:['Drag the highlighted cylinder card at the bottom into the bench area. A tap also places it.','The target is 40 mL. Use the slider and drop the flask within the green circle around the cylinder.','Move the filled cylinder to the beaker; the ring marks the pouring target.','40 mL of stock needs 60 mL of water to reach a final volume of 100 mL.','Read the measurements and compare the original and final liquid colors.','C₂ = (1.00 × 40) ÷ 100. Enter the result without a unit.'],
    placed:'Cylinder placed. Now measure the stock solution.',tooClose:'Move the selected vessel close to the highlighted receiving vessel.',correct40:'Excellent measurement — 40 mL of stock solution.',need40:'Cylinder currently holds {v} mL. Add {remaining} mL more.',over40:'You measured {v} mL. Empty the cylinder and measure again.',beakerReady:'Sample transferred. Now add water until the total volume reaches 100 mL.',needWater:'Total is {v} mL. Add {remaining} mL more of water.',overWater:'Volume is {v} mL. Use “Redo dilution” to repeat this step.',waterDone:'Final volume reached: 100 mL. Watch how the color changes.',finish:'Well done! The final concentration is 0.40 M.',incorrect:'Not quite. Try C₂ = (1.00 × 40) / 100.',invalid:'Enter a number, such as 0.40.',emptyCylinder:'Empty cylinder & remeasure',redoWater:'Redo dilution step',done:'Lab completed!',retry:'Repeat experiment',loading:'Preparing your 3D laboratory',loadingMsg:'Loading your real laboratory equipment…',loadingFailure:'Could not load the 3D scene. Open this folder through a local web server and ensure you are online to load the Three.js engine.',tableFailed:'The table model could not be loaded.',glassFailed:'The glassware model could not be loaded.',busy:'Finish the current pour first.',introMobile:'Dilution',step:'Step',drag:'Drag',hints:'Hint',
  },
  ar: {
    scaleFocus:'عرض الميزان',scaleOverview:'عرض المختبر',scaleFocusTitle:'الميزان الرقمي',scaleHint:'ضع كأس الخلط على كفة الميزان',scalePlaced:'الكأس على الميزان · يمكنك التصفير',stationHeading:'محطة القياس الدقيقة',stationLive:'مباشر',scaleTitle:'⚖ ميزان رقمي',buretteTitle:'💧 سحاحة الماء',scaleTare:'تصفير / TARE',valveHold:'اضغط مطولًا للتنقيط',valveRunning:'جارٍ التنقيط…',stationDescription:'ضع كأس الخلط على الميزان لقياس كتلة تقريبية (الكثافة ≈ 1 g/mL)، ثم صفّره. عند إضافة الماء، ضع الكأس تحت السحاحة واضغط مطولًا على الصنبور.',stationDock:'اسحب كأس الخلط أسفل السحاحة لتمكين التنقيط.',stationReady:'الكأس تحت السحاحة. اضغط مطولًا على الصنبور لإضافة الماء قطرة بقطرة.',stationEmpty:'السحاحة فارغة. أكمل باستخدام كأس الماء المقطر الأصلي.',stationWeigh:'ضع الكأس على كفة الميزان قبل التصفير.',stationTared:'صُفّر الميزان والكأس على الكفة.',stationFill:'توقف عند الحجم الكلي 100 mL. يمكنك استخدام طريقة السكب الأصلية أيضًا.',stationWrongStep:'تعمل السحاحة في خطوة إضافة الماء المقطر.',stationNoBeaker:'ضع كأس الخلط على الميزان لقراءة كتلته.',stationScale:'ميزان رقمي',stationBurette:'سحاحة الماء',stationDocked:'الكأس أسفل السحاحة',stationScaleDocked:'الكأس على الميزان',stationOnScale:'وُضع الكأس على الميزان؛ اضغط تصفير لاستبعاد كتلة الوعاء.',stationTareNoObject:'صُفّر الميزان. ضع كأس الخلط على كفته.',stationWaterDone:'وصل الحجم الكلي إلى 100 mL. راقب لون المحلول.',stationOver:'تم الوصول للحجم المستهدف؛ أُغلق الصنبور آليًا.',stationStepDesc:'اختياري: ضع كأس الخلط تحت السحاحة واضغط مطولًا على الصنبور لإضافة الماء المقطر قطرة قطرة.',
    transferTitle:'سكب السائل',header:'التجربة ٠١ / تخفيف المحاليل',eyebrow:'مختبر الكيمياء · المحاليل',stage:'فن تخفيف المحاليل',helperHead:'تجربتك التفاعلية',
    foot:'اسحب الأدوات لتحريكها · قرّب الوعاء من الآخر للسكب',hint:'✧ تلميح',tray:'الأدوات · اسحب لتتفاعل',introEyebrow:'استكشف · افهم · اكتشف',introTitle:'تخفيف المحاليل',introDesc:'اكتشف كيف يغيّر الماء تركيز المحلول دون تغيير كمية المذاب.',stepHeading:'خطوات التجربة',complete:'مكتملة',taskKicker:'المهمة الحالية',volumeTitle:'حجم السائل المراد سكبه',controlStock:'اختر الحجم ثم اسحب دورق المحلول الأصلي بجوار المخبار المدرّج.',controlWater:'اختر الحجم ثم اسحب كأس الماء بجوار كأس الخلط.',observationTitle:'قارن بين لوني المحلولين',observationCaption:'يصبح اللون أفتح لأن كمية المذاب نفسها تتوزع في حجم أكبر.',continue:'الانتقال إلى الحساب ←',quizTitle:'احسب التركيز النهائي',quizDesc:'خُفِّف 40 mL من محلول تركيزه 1.00 M إلى حجم نهائي 100 mL. ما قيمة C₂ بوحدة mol/L؟',check:'تحقّق',idle:'اسحب الأدوات في المشهد ثلاثي الأبعاد للبدء.',live:'القياسات المباشرة',soln:'حجم المحلول الأصلي',waterAdded:'الماء المضاف',total:'الحجم الكلي',stock:'المحلول الأصلي',cylinder:'المخبار المدرّج',beaker:'كأس الخلط',water:'ماء مقطر',dragPlace:'اسحب لتضعه',onTable:'على الطاولة',ready:'جاهز',moved:'على الطاولة',soundOn:'الصوت يعمل',soundOff:'الصوت مغلق',reset:'إعادة',resetQuestion:'هل تريد إعادة التجربة؟ ستُحذف جميع القياسات.',placeBadge:'🧪 ضعه فوق الطاولة',
    stepNames:['تجهيز الأدوات','قياس المحلول الأصلي','نقل العينة','إضافة الماء المقطر','ملاحظة التغيّر','حساب التركيز'],
    stepDetails:[
      'اسحب المخبار المدرّج من شريط الأدوات وضعه فوق طاولة المختبر.',
      'قِس 40 mL بالضبط من المحلول الأصلي بتركيز 1.00 M. اختر الحجم ثم قرّب الدورق من المخبار. يمكنك السكب على دفعات.',
      'ارفع المخبار المدرّج وقرّبه من كأس الخلط الفارغ حتى تُسكب العينة ذات الحجم 40 mL.',
      'أضف الماء المقطر حتى يصبح الحجم الكلي للمحلول 100 mL بالضبط. اختر الحجم ثم قرّب كأس الماء من كأس الخلط.',
      'لاحظ لون المحلول؛ يقلّ تركيزه ويصبح اللون أفتح عند زيادة الحجم الكلي.',
      'استخدم العلاقة C₁V₁ = C₂V₂ لحساب التركيز النهائي ثم تحقّق من الإجابة.'
    ],
    hintSteps:['اسحب بطاقة المخبار المضيئة أسفل الشاشة إلى الطاولة، أو انقرها لإضافته.','الحجم المطلوب 40 mL. اضبط شريط التحكم ثم أفلت الدورق قرب الدائرة حول المخبار.','قرّب المخبار المملوء من كأس الخلط لتبدأ حركة السكب.','المحلول الأصلي 40 mL، لذلك تحتاج إلى 60 mL من الماء للوصول إلى 100 mL.','قارن اللون الأصلي باللون بعد التخفيف واقرأ القياسات.','C₂ = (1.00 × 40) ÷ 100. أدخل القيمة دون الوحدة.'],
    placed:'تم وضع المخبار. الآن قِس المحلول الأصلي.',tooClose:'قرّب الوعاء المُختار من الوعاء المحدد بالدائرة الخضراء.',correct40:'ممتاز! قست 40 mL من المحلول الأصلي.',need40:'الحجم في المخبار {v} mL. أضف {remaining} mL.',over40:'قست {v} mL. أفرغ المخبار وأعد القياس.',beakerReady:'تم نقل العينة. أضف الماء حتى يصبح الحجم الكلي 100 mL.',needWater:'الحجم الكلي {v} mL. أضف {remaining} mL من الماء.',overWater:'الحجم {v} mL. اضغط «إعادة خطوة التخفيف» وحاول مجددًا.',waterDone:'أصبح الحجم 100 mL. راقب تغير اللون.',finish:'أحسنت! التركيز النهائي هو 0.40 M.',incorrect:'حاول مجددًا: C₂ = (1.00 × 40) / 100.',invalid:'أدخل عددًا مثل 0.40.',emptyCylinder:'إفراغ المخبار وإعادة القياس',redoWater:'إعادة خطوة التخفيف',done:'أتممت التجربة!',retry:'إعادة التجربة',loading:'نجّهز مختبرك ثلاثي الأبعاد',loadingMsg:'جارٍ تحميل أدوات المختبر الحقيقية...',loadingFailure:'تعذّر تحميل المشهد. شغّل الملفات عبر خادم محلي وتأكد من اتصال الإنترنت لتحميل محرك Three.js.',tableFailed:'تعذّر تحميل نموذج الطاولة.',glassFailed:'تعذّر تحميل نموذج الزجاجيات.',busy:'انتظر حتى يكتمل السكب.',introMobile:'التخفيف',step:'الخطوة',drag:'اسحب',hints:'تلميح'
  }
};

const state = {
  lang:'en',step:0,placed:false,busy:false,sound:true,solved:false,
  volumes:{stock:120,cylinder:0,beakerStock:0,beakerWater:0,water:180},
  buretteRemaining:100,valveOpen:false,buretteDraw:0,scaleTareMass:0,scalePresent:false,beakerDock:'bench',station:null,
  pouring:null,selected:'',drag:null, ghost:null, toastTimer:0, selectedAmount:40, apparatus:null,
  home:{stock:new THREE.Vector3(-1.55,TABLE_Y,-.34),cylinder:new THREE.Vector3(-.35,TABLE_Y,.10),beaker:new THREE.Vector3(1.08,TABLE_Y,.12),water:new THREE.Vector3(1.25,TABLE_Y,-1.52)},
  assemblies:{}, pickables:[], labels:{stock:$('labelStock'),cylinder:$('labelCylinder'),beaker:$('labelBeaker'),water:$('labelWater'),burette:$('labelBurette'),scale:$('labelScale')}
};
const T=()=>labels[state.lang];
let scene,camera,renderer,controls,raycaster,tableTop=null,focusRing=null,glowRing=null,dockRing=null,scaleDockRing=null,cameraTween=null,scaleView=false,stream=null,drops=[],audioCtx=null,noiseSource=null,lastHud=0,initialLoad=false,animFrame,previousFrame=0;
const viewport=$('viewport');
const loader=new GLTFLoader();
const surfacePlane = new THREE.Plane(new THREE.Vector3(0,1,0),-TABLE_Y);
const castVector=new THREE.Vector2();
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const round=(n)=>Number(n.toFixed(1));
const fmt=(v)=>{const n=Math.round((v+Number.EPSILON)*10)/10;return Number.isInteger(n)?String(n):n.toFixed(1)};
const interp=(text,items={})=>text.replace(/\{(\w+)\}/g,(_,name)=>String(items[name]??''));

function setText(id,value){if($(id))$(id).textContent=value;}
function status(message,kind='normal',ms=3300){let n=$('toast');n.textContent=message;n.className='toast visible '+kind;clearTimeout(state.toastTimer);state.toastTimer=setTimeout(()=>n.classList.remove('visible'),ms)}
// Recorded laboratory Foley supplied with this project (no synthetic water/glass tones).
// The audio assets are bundled locally; playback always follows a student gesture.
const SOUND_FILES={
  pour:'./assets/sfx_pouring_water.mp3',
  slide:'./assets/sfx_glass_slide.mp3',
  glass:'./assets/sfx_glass_clink.mp3'
};
let audioBus=null,activePourSound=null,audioPreload=null;
const soundBuffers={};
function preloadAudio(){
  if(audioPreload)return audioPreload;
  try{
    audioCtx??=new(window.AudioContext||window.webkitAudioContext)();
    audioBus=audioCtx.createGain();
    audioBus.gain.value=state.sound?.72:0;
    audioBus.connect(audioCtx.destination);
    audioPreload=Promise.all(Object.entries(SOUND_FILES).map(async([name,url])=>{
      try{
        const response=await fetch(url);
        if(!response.ok)throw new Error(`${url}: ${response.status}`);
        soundBuffers[name]=await audioCtx.decodeAudioData(await response.arrayBuffer());
      }catch(err){console.warn('Unable to preload recorded lab sound:',name,err)}
    }));
  }catch(err){console.warn('Recorded sound unavailable',err);audioPreload=Promise.resolve()}
  return audioPreload;
}
function setupAudio(){
  if(!state.sound)return;
  preloadAudio();
  if(audioCtx?.state==='suspended')audioCtx.resume().catch(()=>{});
}
function playRecorded(name,options={}){
  if(!state.sound)return null;
  setupAudio();
  const buffer=soundBuffers[name];
  if(!audioCtx||!audioBus||!buffer)return null;
  const offset=clamp(options.offset??0,0,Math.max(0,buffer.duration-.09));
  const duration=Math.min(options.duration??buffer.duration-offset,buffer.duration-offset);
  if(duration<=0)return null;
  const volume=clamp(options.volume??.5,0,1);
  const attack=Math.min(options.attack??.009,duration/3);
  const release=Math.min(options.release??.13,duration/3);
  const now=audioCtx.currentTime+.005;
  const source=audioCtx.createBufferSource();source.buffer=buffer;
  const envelope=audioCtx.createGain();
  envelope.gain.setValueAtTime(.0001,now);
  envelope.gain.linearRampToValueAtTime(Math.max(.0001,volume),now+attack);
  envelope.gain.setValueAtTime(Math.max(.0001,volume),now+Math.max(attack,duration-release));
  envelope.gain.linearRampToValueAtTime(.0001,now+duration);
  source.connect(envelope);envelope.connect(audioBus);
  let stopped=false;
  const stop=()=>{
    if(stopped)return;
    stopped=true;
    const t=audioCtx.currentTime;
    envelope.gain.cancelScheduledValues(t);
    envelope.gain.setTargetAtTime(.0001,t,.035);
    try{source.stop(t+.17)}catch(_){}
  };
  source.onended=()=>{source.disconnect();envelope.disconnect();stopped=true};
  source.start(now,offset,duration);
  return {stop};
}
function glassClink(intensity=.75){
  // Use isolated clinks from the supplied 8.9 s recording instead of playing
  // the entire sound, which contains long gaps and multiple delayed clinks.
  const strong=intensity>.80;
  return playRecorded('glass',{offset:strong?2.10:.27,
    duration:strong?.95:.81,volume:clamp(intensity*.72,.10,.74),release:.20});
}
function slideFoley(intensity=.5){
  return playRecorded('slide',{offset:.09,duration:.90,volume:clamp(intensity*.58,.12,.55),release:.19});
}
function ping(){/* UI changes are silent; glass sounds only when glass makes contact. */}
function stopPourAudio(){
  if(activePourSound){activePourSound.stop();activePourSound=null}
}
function pourAudio(duration=2.3){
  stopPourAudio();
  activePourSound=playRecorded('pour',{offset:.52,duration:Math.min(6.2,Math.max(.3,duration)),volume:.68,attack:.13,release:.22});
  return ()=>stopPourAudio();
}
function dripSfx(){
  // Brief, quiet real-water segments taken from the supplied pour recording.
  playRecorded('pour',{offset:1.6+Math.random()*2.7,duration:.11,volume:.19,attack:.013,release:.055});
}
function setAudioEnabled(on){
  if(!on){stopPourAudio();if(audioBus&&audioCtx){audioBus.gain.cancelScheduledValues(audioCtx.currentTime);audioBus.gain.setTargetAtTime(0,audioCtx.currentTime,.012)}}
  else{setupAudio();if(audioBus&&audioCtx){audioBus.gain.cancelScheduledValues(audioCtx.currentTime);audioBus.gain.setTargetAtTime(.72,audioCtx.currentTime,.035)}}
}

function init3d(){
  scene=new THREE.Scene();scene.background=new THREE.Color('#ecf3f0');
  camera=new THREE.PerspectiveCamera(37,1,.05,100);camera.position.set(6.9,6.3,10.0);
  renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,(window.innerWidth<750?1.35:1.8)));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.38;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.domElement.setAttribute('aria-label','3D laboratory scene; drag a glass vessel to move it');viewport.insertBefore(renderer.domElement,viewport.firstChild);
  scene.add(new THREE.HemisphereLight(0xe3faff,0x8c7770,2.3));scene.add(new THREE.AmbientLight(0xffffff,.47));
  const sun=new THREE.DirectionalLight(0xfff2de,3.25);sun.position.set(-4,10,7);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-10;sun.shadow.camera.right=10;sun.shadow.camera.top=10;sun.shadow.camera.bottom=-10;sun.shadow.bias=-.00016;sun.shadow.radius=3;scene.add(sun);
  const rim=new THREE.DirectionalLight(0x83def3,1.4);rim.position.set(5,5,-7);scene.add(rim);
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.MeshStandardMaterial({color:'#eaf1ee',roughness:1}));floor.rotation.x=-Math.PI/2;floor.position.y=-.115;floor.receiveShadow=true;scene.add(floor);
  const circle=new THREE.Mesh(new THREE.CircleGeometry(4.65,90),new THREE.MeshBasicMaterial({color:'#dbe9e4',transparent:true,opacity:.2,depthWrite:false}));circle.rotation.x=-Math.PI/2;circle.position.y=-.105;scene.add(circle);
  controls=new OrbitControls(camera,renderer.domElement);controls.target.set(.65,TABLE_Y+.20,.1);controls.enableDamping=true;controls.dampingFactor=.065;controls.enablePan=false;controls.minPolarAngle=.55;controls.maxPolarAngle=1.39;controls.minAzimuthAngle=-.9;controls.maxAzimuthAngle=.9;controls.minDistance=5.5;controls.maxDistance=19;controls.update();
  controls.addEventListener('start',()=>{cameraTween=null});
  raycaster=new THREE.Raycaster();
  const ringMat=new THREE.MeshBasicMaterial({color:'#00af96',transparent:true,opacity:.7,depthWrite:false,side:THREE.DoubleSide});
  focusRing=new THREE.Mesh(new THREE.RingGeometry(.235,.252,72),ringMat);focusRing.rotation.x=-Math.PI/2;focusRing.position.y=TABLE_Y+.012;scene.add(focusRing);focusRing.visible=false;
  glowRing=new THREE.Mesh(new THREE.RingGeometry(.252,.335,72),new THREE.MeshBasicMaterial({color:'#8ff2c6',transparent:true,opacity:.14,depthWrite:false,side:THREE.DoubleSide}));glowRing.rotation.x=-Math.PI/2;glowRing.position.y=TABLE_Y+.008;scene.add(glowRing);glowRing.visible=false;
  dockRing=new THREE.Mesh(new THREE.RingGeometry(.24,.275,72),new THREE.MeshBasicMaterial({color:'#49cbf2',transparent:true,opacity:.72,depthWrite:false,side:THREE.DoubleSide}));dockRing.rotation.x=-Math.PI/2;dockRing.position.set(-.65,TABLE_Y+.01,-1.08);dockRing.visible=false;scene.add(dockRing);
  scaleDockRing=new THREE.Mesh(new THREE.RingGeometry(.19,.235,64),new THREE.MeshBasicMaterial({color:'#21d8b6',transparent:true,opacity:.88,depthWrite:false,side:THREE.DoubleSide}));scaleDockRing.rotation.x=-Math.PI/2;scaleDockRing.position.copy(SCALE_PAN);scaleDockRing.position.y+=.006;scaleDockRing.visible=false;scene.add(scaleDockRing);
  renderer.domElement.addEventListener('pointerdown',onCanvasDown);window.addEventListener('pointermove',onGlobalMove,{passive:false});window.addEventListener('pointerup',onGlobalUp,{passive:false});window.addEventListener('pointercancel',onGlobalUp);renderer.domElement.addEventListener('contextmenu',e=>e.preventDefault());
  resize();window.addEventListener('resize',resize);new ResizeObserver(resize).observe(viewport);
  let t=0;function animate(time){animFrame=requestAnimationFrame(animate);const dt=Math.min(.055,Math.max(0,(time-(previousFrame||time))/1000));previousFrame=time;t=time;updateCameraTween(time);controls.update();updatePour(time);updateBurette(dt,time);updateFocusRing(time);updateLabels();updateStationEffects(time);if(time-lastHud>100){lastHud=time;updateMetrics()}renderer.render(scene,camera)}requestAnimationFrame(animate);
}
function resize(){if(!renderer)return;let w=viewport.clientWidth,h=viewport.clientHeight;if(!w||!h)return;renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,(w<750?1.35:1.8)));
  renderer.setSize(w,h,false);camera.aspect=w/h;// Fit the bench plus the tall burette in either portrait or landscape.
  const aspect=w/h;
  camera.fov=aspect<.72?53:aspect<1.1?43:aspect<1.6?37:34;
  camera.updateProjectionMatrix();
  if(!state.drag&&!state.busy)controls.update()}
function load(url){return new Promise((resolve,reject)=>loader.load(url,resolve,undefined,reject))}
function centerModelAtOrigin(parent,target){const b=new THREE.Box3().setFromObject(parent);const size=b.getSize(new THREE.Vector3()),center=b.getCenter(new THREE.Vector3());const scale=target/Math.max(.01,size.y);parent.scale.setScalar(scale);parent.position.set(-center.x*scale,-b.min.y*scale,-center.z*scale);return {box:b,height:size.y,width:size.x,depth:size.z}}
// Vessel cross-sections are based on the actual imported glassware silhouettes.
// Local y is normalized to each GLB's imported height; r is relative to vessel's
// nominal outer radius. The graduated cylinder's narrow TUBE is ~half its base radius.
const LIQUID_PROFILES={
 stock:[[.075,.84],[.105,.91],[.20,.91],[.30,.84],[.40,.68],[.50,.50],[.60,.33],[.66,.275],[.83,.27],[.915,.27]],
 cylinder:[[.115,.51],[.15,.51],[.36,.51],[.65,.51],[.90,.51],[.945,.52]],
 beaker:[[.085,.88],[.13,.91],[.28,.92],[.50,.92],[.75,.925],[.895,.93]],
 water:[[.085,.87],[.13,.92],[.40,.93],[.72,.935],[.88,.94],[.92,.94]]
};
function radiusProfileAt(profile,y){
  if(y<=profile[0][0])return profile[0][1];
  for(let i=1;i<profile.length;i++){
    const a=profile[i-1],b=profile[i];if(y<=b[0])return a[1]+(b[1]-a[1])*((y-a[0])/(b[0]-a[0]));
  }
  return profile.at(-1)[1];
}
function areaToHeight(profile,h){
  let sum=0;
  for(let i=1;i<profile.length;i++){
    const [y0,r0]=profile[i-1], [y1,r1]=profile[i];
    if(h<=y0)break;
    const top=Math.min(y1,h), length=top-y0;
    if(length<=0)continue;
    const rTop=r0+(r1-r0)*length/(y1-y0);
    sum+=length*(r0*r0+r0*rTop+rTop*rTop)/3;
    if(h<=y1)break;
  }
  return sum;
}
function heightForVolume(profile,fraction){
  const low=profile[0][0],high=profile.at(-1)[0];
  let lo=low,hi=high;const volume=areaToHeight(profile,high)*clamp(fraction,0,1);
  for(let i=0;i<18;i++){
    const mid=(lo+hi)/2;
    if(areaToHeight(profile,mid)<volume)lo=mid;else hi=mid;
  }
  return (lo+hi)/2;
}
function makeFilledShape(profile,height,radius,fillY){
  const points=[new THREE.Vector2(0,profile[0][0]*height),new THREE.Vector2(profile[0][1]*radius,profile[0][0]*height)];
  for(let i=1;i<profile.length;i++){
    let [yy,rr]=profile[i];if(yy>fillY){yy=fillY;rr=radiusProfileAt(profile,yy);points.push(new THREE.Vector2(rr*radius,yy*height));break}
    points.push(new THREE.Vector2(rr*radius,yy*height));
  }
  if(points.at(-1).y<fillY*height-.00001)points.push(new THREE.Vector2(radiusProfileAt(profile,fillY)*radius,fillY*height));
  points.push(new THREE.Vector2(0,fillY*height));
  return new THREE.LatheGeometry(points,40);
}
function makeVessel(loaded,name,key,targetHeight,capacity,radius,liquidColor){
  loaded.scene.updateMatrixWorld(true);const object=loaded.scene.getObjectByName(name);
  if(!object)throw new Error('Missing glassware mesh: '+name);
  const meshPart=new THREE.Group();
  object.traverse(obj=>{if(!obj.isMesh)return;
    const mat=obj.material.clone();mat.side=THREE.DoubleSide;mat.transparent=true;mat.depthWrite=false;
    mat.opacity=Math.max(.24,Math.min(.48,mat.opacity??.38));
    mat.roughness=.09;mat.metalness=0;
    const geo=obj.geometry.clone();geo.applyMatrix4(obj.matrixWorld);
    const copy=new THREE.Mesh(geo,mat);copy.castShadow=false;copy.receiveShadow=false;meshPart.add(copy);
  });
  centerModelAtOrigin(meshPart,targetHeight);
  const root=new THREE.Group();root.name='instrument_'+key;root.add(meshPart);
  const profile=LIQUID_PROFILES[key];
  const fluidMat=new THREE.MeshPhysicalMaterial({color:liquidColor,roughness:.11,metalness:0,
    clearcoat:.70,clearcoatRoughness:.08,transparent:true,opacity:.66,depthWrite:false,side:THREE.DoubleSide});
  const liquidMesh=new THREE.Mesh(makeFilledShape(profile,targetHeight,radius,profile[0][0]+.0001),fluidMat);
  liquidMesh.renderOrder=2;root.add(liquidMesh);
  const surface=new THREE.Mesh(new THREE.CircleGeometry(1,48),new THREE.MeshPhysicalMaterial({color:liquidColor,roughness:.12,
    clearcoat:1,transparent:true,opacity:.83,depthWrite:false,side:THREE.DoubleSide}));
  surface.rotation.x=-Math.PI/2;surface.renderOrder=3;root.add(surface);
  const meniscus=new THREE.Mesh(new THREE.RingGeometry(.945,1,52),new THREE.MeshBasicMaterial({color:0xe1f8ff,
    transparent:true,opacity:.29,side:THREE.DoubleSide,depthWrite:false}));
  meniscus.rotation.x=-Math.PI/2;meniscus.renderOrder=4;root.add(meniscus);
  const shadow=new THREE.Mesh(new THREE.CircleGeometry(radius*.97,36),new THREE.MeshBasicMaterial({color:'#31534c',transparent:true,opacity:.12,depthWrite:false}));
  shadow.rotation.x=-Math.PI/2;shadow.position.y=.005;root.add(shadow);
  const pick=new THREE.Mesh(new THREE.CylinderGeometry(Math.max(.16,radius*1.27),Math.max(.16,radius*1.27),Math.max(.70,targetHeight),12),
    new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));
  pick.position.y=Math.max(.70,targetHeight)/2;pick.userData.pickId=key;pick.renderOrder=-3;root.add(pick);state.pickables.push(pick);
  if(key==='cylinder'){
    const tickMaterial=new THREE.MeshBasicMaterial({color:0x244d5e,transparent:true,opacity:.76,depthWrite:false});
    for(let n=1;n<=10;n++){
      const long=n%5===0;
      const tick=new THREE.Mesh(new THREE.BoxGeometry(long?.043:.023,.0035,.0035),tickMaterial);
      tick.position.set(.034-(long?.005:0),targetHeight*(.145+.072*n),radius*.50);
      tick.renderOrder=4;root.add(tick);
    }
  }
  root.position.copy(state.home[key]);
  root.userData={key,capacity,height:targetHeight,radius,liquidMesh,surface,meniscus,pick,shadow,liquidColor,
    profile,mouthRadius:radius*radiusProfileAt(profile,profile.at(-1)[0]),fillLevel:0};
  state.assemblies[key]=root;scene.add(root);updateVessel(key);return root;
}
function updateVessel(key,volumeOverride=null){
  const root=state.assemblies[key];if(!root)return;
  const v=state.volumes;
  let vol=volumeOverride==null?(key==='beaker'?v.beakerStock+v.beakerWater:v[key]):volumeOverride;
  const u=root.userData, f=clamp(vol/u.capacity,0,1), y=heightForVolume(u.profile,f);
  u.liquidMesh.visible=vol>.025;u.surface.visible=vol>.025;u.meniscus.visible=vol>.025;
  // Re-mesh the inner liquid volume at the *current* free-surface height.
  // This follows the actual bulb -> shoulder -> neck change of an Erlenmeyer,
  // and the narrow measuring tube of a graduated cylinder.
  if(vol>.025&&(!Number.isFinite(u.fillLevel)||Math.abs(u.fillLevel-y)>.00035)){
    const next=makeFilledShape(u.profile,u.height,u.radius,y);
    u.liquidMesh.geometry.dispose();u.liquidMesh.geometry=next;u.fillLevel=y;
  }
  const liquidRadius=radiusProfileAt(u.profile,y)*u.radius;
  u.surface.scale.set(liquidRadius,liquidRadius,liquidRadius);
  u.surface.position.set(0,u.height*y+.0012,0);
  u.meniscus.scale.set(liquidRadius,liquidRadius,liquidRadius);
  u.meniscus.position.set(0,u.height*y+.002,0);
  if(state.pouring?.to===key||state.valveOpen&&key==='beaker'){
    const time=performance.now();
    u.surface.position.y+=Math.sin(time*.021)*.0018;
    u.meniscus.material.opacity=.20+.12*Math.sin(time*.025);
  } else u.meniscus.material.opacity=.25;
  if(key==='beaker'){
    const display=getDisplayVolumes(),total=Math.max(.01,display.beakerStock+display.beakerWater);
    const concentrate=display.beakerStock/total;
    const color=new THREE.Color('#c4e6ee').lerp(new THREE.Color('#14679d'),Math.pow(concentrate,.65));
    if(!u.smoothedColor)u.smoothedColor=color.clone();
    u.smoothedColor.lerp(color,(state.pouring&&state.pouring.to==='beaker')?.10:.19);
    u.liquidMesh.material.color.copy(u.smoothedColor);
    u.surface.material.color.copy(u.smoothedColor);
    u.liquidMesh.material.opacity=.42+concentrate*.25;
  }
}
function setLiquidVolume(key,vol){updateVessel(key,vol)}

async function loadModels(){
  init3d();setText('loadingTitle',T().loading);setText('loadingMessage',T().loadingMsg);
  const prog=$('loadingBar');let n=0;const progress=()=>{n++;prog.style.width=String(Math.min(98,n*34))+'%'};
  const table=await load('./assets/Table_02.glb');progress();
  // Assert against the actual imported slab height to catch future GLB edits.
  const worktopSlab=table.scene.getObjectByName('Cube_c03565');
  if(worktopSlab){const benchTop=new THREE.Box3().setFromObject(worktopSlab).max.y;
    if(Math.abs(benchTop-TABLE_Y)>.05)console.warn('Workbench has changed; review contact height',benchTop,TABLE_Y);}
  table.scene.traverse(n=>{if(n.isMesh){n.receiveShadow=true;n.castShadow=true}});scene.add(table.scene);
  const glass=await load('./assets/chemistry_glassware.glb');progress();
  makeVessel(glass,'lab_erlenmeyer_a','stock',.61,150,.208,'#176da2');
  makeVessel(glass,'lab_cylinder_a','cylinder',.77,100,.100,'#3889b2');
  makeVessel(glass,'lab_beaker_a','beaker',.60,MAX_BEAKER,.256,'#3f89b1');
  makeVessel(glass,'lab_beaker_b','water',.53,200,.200,'#a0ddf0');
  state.assemblies.cylinder.visible=false;
  await loadPrecisionModels();progress();
  // The additional user-supplied GLB is used as a rear workbench apparatus.
  // It was texture-optimized for mobile while preserving all 16 meshes.
  try{
    const deco=await load('./assets/chemistry_apparatus_optimized.glb');deco.scene.scale.setScalar(.24);
    const decoBox=new THREE.Box3().setFromObject(deco.scene);
    deco.scene.position.set(3.10-decoBox.getCenter(new THREE.Vector3()).x,TABLE_Y-decoBox.min.y,-1.63-decoBox.getCenter(new THREE.Vector3()).z);deco.scene.traverse(n=>{if(n.isMesh){n.castShadow=true;n.receiveShadow=true}});scene.add(deco.scene);state.apparatus=deco.scene;
  }catch(e){console.warn('Optional background apparatus unavailable:',e)}
  progress();prog.style.width='100%';initialLoad=true;document.documentElement.dataset.labReady='true';setTimeout(()=>$('loading').classList.add('hide'),280);refreshUI();
}
function setStep(n){state.step=clamp(n,0,5);state.selected='';refreshUI();ping(620+state.step*80)}
function getDisplayVolumes(){if(!state.pouring)return {...state.volumes};const p=state.pouring,vol={...state.volumes};let transferred=p.amount*p.progress;vol[p.from]-=transferred;if(p.to==='cylinder')vol.cylinder+=transferred;else if(p.from==='cylinder')vol.beakerStock+=transferred;else vol.beakerWater+=transferred;return vol}
function updateMetrics(){const v=getDisplayVolumes(),solute=v.beakerStock,water=v.beakerWater,total=solute+water;
  setText('metricStock',fmt(solute));setText('metricWater',fmt(water));setText('metricTotal',fmt(total));
  setText('concentrationText',total>.01?`C₂ = ${(solute/total).toFixed(2)} M`:'C₂ = — M');
  setText('labelStockAmount',`${fmt(v.stock)} mL · 1.00 M`);
  setText('labelCylinderAmount',`${fmt(v.cylinder)} mL`);
  setText('labelBeakerAmount',`${fmt(total)} mL`);
  setText('labelWaterAmount',`${fmt(v.water)} mL`);
  for(const key of ['stock','cylinder','beaker','water'])setLiquidVolume(key,key==='beaker'?total:v[key]);
  if(state.station)refreshStation();
}
function refreshUI(){const l=T();document.documentElement.lang=state.lang;document.documentElement.dir=state.lang==='ar'?'rtl':'ltr';document.body.setAttribute('dir',document.documentElement.dir);
  const staticMap={transferTitle:l.transferTitle,headerExperiment:l.header,eyebrow:l.eyebrow,stageName:l.stage,helperHead:l.helperHead,footerHint:l.foot,hintButton:l.hint,trayTitle:l.tray,introEyebrow:l.introEyebrow,introTitle:l.introTitle,introDescription:l.introDesc,stepHeading:l.stepHeading,taskKicker:l.taskKicker,volumeTitle:l.volumeTitle,observationTitle:l.observationTitle,observationCaption:l.observationCaption,continueBtn:l.continue,quizTitle:l.quizTitle,quizDesc:l.quizDesc,checkBtn:l.check,idleControls:l.idle,liveHeading:l.live,metricStockLabel:l.soln,metricWaterLabel:l.waterAdded,metricTotalLabel:l.total,labelStockTitle:l.stock,labelCylinderTitle:l.cylinder,labelBeakerTitle:l.beaker,labelWaterTitle:l.water,toolStockName:l.stock,toolCylinderName:l.cylinder,toolBeakerName:l.beaker,toolWaterName:l.water,resetText:l.reset,soundText:state.sound?l.soundOn:l.soundOff,langText:state.lang==='en'?'عربي':'English'};
  for(const [id,v] of Object.entries(staticMap))setText(id,v);
  setText('taskTitle',l.stepNames[state.step]);setText('taskBody',l.stepDetails[state.step]);setText('helperText',l.stepDetails[state.step]);setText('taskCounter',String(state.step+1).padStart(2,'0')+' / 06');setText('stepProgressText',`${l.step} ${state.step+1} / 6`);setText('stepCount',`${state.solved?6:state.step} / 6 ${l.complete}`);
  const progress=$('progressBars');progress.innerHTML=l.stepNames.map((_,i)=>`<i class="${(i<state.step||state.solved)?'done':i===state.step?'current':''}"></i>`).join('');
  $('timeline').innerHTML=l.stepNames.map((title,i)=>`<div class="timeline-row ${(i<state.step||state.solved)?'done':i===state.step?'current':''}"><span class="number"><span class="num-content">${i+1}</span></span><span class="timeline-text">${title}</span></div>`).join('');
  setText('toolCylinderState',state.placed?l.moved:l.dragPlace);for(let tool of ['Stock','Water','Beaker'])setText('tool'+tool+'State',l.onTable);
  $('toolCylinder').className='tool-card '+(state.placed?'used':state.step===0?'enabled':'locked');
  for(const key of ['stock','beaker','water']){let card=$('tool'+key[0].toUpperCase()+key.slice(1));card.className='tool-card '+((state.step===1&&key==='stock')||(state.step===2&&key==='beaker')||(state.step===3&&key==='water')?'selected':'locked')}
  $('volumeControls').hidden=!(state.step===1||state.step===3);$('observation').hidden=state.step!==4;$('quiz').hidden=state.step!==5;$('idleControls').hidden=state.step===1||state.step===3||state.step===4||state.step===5;
  if(state.step===1){$('volumeSlider').step='5';setText('controlCaption',l.controlStock);$('volumeSlider').max='80';$('volumeSlider').value=state.selectedAmount;setText('volumeMax','80 mL')}
  if(state.step===3){$('volumeSlider').step='0.1';setText('controlCaption',l.controlWater+' '+l.stationStepDesc);$('volumeSlider').max='100';$('volumeSlider').value=state.selectedAmount;setText('volumeMax','100 mL')}
  setText('volumeValue',`${fmt(state.selectedAmount)} mL`);setText('correctMistakeBtn',state.step===1?l.emptyCylinder:l.redoWater);
  $('correctMistakeBtn').hidden=!((state.step===1&&state.volumes.cylinder>40)||(state.step===3&&state.volumes.beakerStock+state.volumes.beakerWater>100));
  $('checkBtn').textContent=state.solved?l.retry:l.check;
  if(state.solved){setText('answerFeedback',l.finish)}
  setText('soundIcon',state.sound?'♫':'♬');$('soundBtn').classList.toggle('active',state.sound);
  refreshStation();updateMetrics();updateTargetRing();
}
function updateTargetRing(){if(!focusRing)return; if(dockRing)dockRing.visible=state.step===3&&!state.busy&&state.beakerDock!=='burette';const target=state.step===1?'cylinder':state.step===2?'beaker':state.step===3?'beaker':null;let obj=target&&state.assemblies[target];focusRing.visible=!!obj;glowRing.visible=!!obj;if(obj){focusRing.position.set(obj.position.x,TABLE_Y+.013,obj.position.z);glowRing.position.set(obj.position.x,TABLE_Y+.012,obj.position.z)}}
function updateFocusRing(time){if(focusRing?.visible){let s=1+.09*Math.sin(time*.004);focusRing.scale.set(s,s,s);glowRing.scale.setScalar(1+.08*Math.sin(time*.004));glowRing.material.opacity=.13+.08*(.5+.5*Math.sin(time*.005))}}
function updateLabels(){if(!camera||!initialLoad)return;for(const [key,node] of Object.entries(state.labels)){const obj=state.assemblies[key];if(!obj||!obj.visible){node.style.display='none';continue}let v=obj.position.clone().add(new THREE.Vector3(0,obj.userData.height+.10,0)).project(camera);if(v.z<0||v.z>1){node.style.display='none';continue}node.style.display='block';const r=viewport.getBoundingClientRect();node.style.left=`${(v.x*.5+.5)*r.width}px`;node.style.top=`${(-v.y*.5+.5)*r.height-3}px`;node.classList.toggle('active',state.selected===key)}}
// Keep the resting footprint on either arm of the L-shaped worktop.
// These are inset rectangles of the actual GLB slab top, not its overall AABB.
const WORKTOP_ZONES=[
  {minX:-2.07,maxX:1.64,minZ:-2.02,maxZ:.29},   // left of the inset sink opening
  {minX:2.56,maxX:3.69,minZ:-2.02,maxZ:.29},   // right of the inset sink opening
  {minX:1.64,maxX:2.56,minZ:-2.02,maxZ:-.38}, // behind the inset sink opening
  {minX:-2.07,maxX:-1.47,minZ:.29,maxZ:2.88}  // extended left wing
];
function clampToWorktop(p){
  let best=null,bestD=Infinity;
  for(const zone of WORKTOP_ZONES){
    const x=clamp(p.x,zone.minX,zone.maxX),z=clamp(p.z,zone.minZ,zone.maxZ);
    const d=(x-p.x)**2+(z-p.z)**2;
    if(d<bestD){bestD=d;best=new THREE.Vector3(x,TABLE_Y,z)}
  }
  return best;
}
function pointOnTable(clientX,clientY){
  const rect=renderer.domElement.getBoundingClientRect();
  castVector.x=((clientX-rect.left)/rect.width)*2-1;
  castVector.y=-((clientY-rect.top)/rect.height)*2+1;
  raycaster.setFromCamera(castVector,camera);
  const p=new THREE.Vector3();
  return raycaster.ray.intersectPlane(surfacePlane,p)?clampToWorktop(p):null;
}
function pickInstrument(x,y){const r=renderer.domElement.getBoundingClientRect();castVector.set(((x-r.left)/r.width)*2-1,-((y-r.top)/r.height)*2+1);raycaster.setFromCamera(castVector,camera);const hits=raycaster.intersectObjects(state.pickables,false);
  // When the real beaker sits beneath the tall burette, allow the student to
  // pick the beaker again instead of intercepting every ray with the stand.
  if(state.beakerDock==='burette'||state.beakerDock==='scale'){
    const movable=hits.find(h=>h.object.userData.pickId==='beaker');
    if(movable&&state.assemblies.beaker?.visible)return 'beaker';
  }
  for(const hit of hits)if(state.assemblies[hit.object.userData.pickId]?.visible)return hit.object.userData.pickId;
  return null}
function allowedDrag(key){if(key==='scale'||key==='burette')return true;if(state.busy||!state.placed)return false;if(state.step===1)return key==='stock'||key==='cylinder'||key==='beaker';if(state.step===2)return key==='cylinder'||key==='beaker';if(state.step===3)return key==='water'||key==='beaker';return true}
function onCanvasDown(e){if(e.button!=null&&e.button!==0)return;if(state.busy)return;let key=pickInstrument(e.clientX,e.clientY);if(!key)return;
  if(!allowedDrag(key)){status(T().hintSteps[state.step],'warn');return}
  if(key==='scale'){tareScale();return}
  if(key==='burette'){if(state.step!==3){status(T().stationWrongStep,'warn');return}if(state.beakerDock!=='burette'){status(T().stationDock,'warn');return}setupAudio();startValve();renderer.domElement.setPointerCapture(e.pointerId);return}
  setupAudio();state.selected=key;state.drag={type:'scene',key,pointer:e.pointerId,start:state.assemblies[key].position.clone(),wasMoved:false};controls.enabled=false;renderer.domElement.setPointerCapture(e.pointerId);renderer.domElement.style.cursor='grabbing';e.preventDefault();
}
function onGlobalMove(e){if(state.ghost&&state.ghost.pointer===e.pointerId){$('dragBadge').style.left=e.clientX+'px';$('dragBadge').style.top=e.clientY+'px';const p=pointOnTable(e.clientX,e.clientY);if(p&&state.assemblies.cylinder){state.assemblies.cylinder.position.copy(p);state.assemblies.cylinder.position.y+=.12}return}
  const d=state.drag;if(!d||d.pointer!==e.pointerId)return;const p=pointOnTable(e.clientX,e.clientY);if(p){const obj=state.assemblies[d.key];obj.position.copy(p);obj.position.y+=.016;if(!d.wasMoved)slideFoley(.55);d.wasMoved=true;if(d.key==='beaker'){state.scalePresent=false;state.beakerDock='bench'};const target=state.step===1&&d.key==='stock'?'cylinder':state.step===2&&d.key==='cylinder'?'beaker':state.step===3&&d.key==='water'?'beaker':null;const receiving=target&&state.assemblies[target];if(receiving&&receiving.visible){let near=distXZ(obj.position,receiving.position)<.83;focusRing.material.color.set(near?'#05db9c':'#00a991')}}e.preventDefault();
}
function distXZ(a,b){return Math.hypot(a.x-b.x,a.z-b.z)}
function onGlobalUp(e){if(state.ghost&&state.ghost.pointer===e.pointerId){const g=state.ghost;state.ghost=null;$('dragBadge').style.display='none';const rect=viewport.getBoundingClientRect();const inside=e.clientX>=rect.left&&e.clientX<=rect.right&&e.clientY>=rect.top&&e.clientY<=rect.bottom;
    if(inside){const pos=pointOnTable(e.clientX,e.clientY)||state.home.cylinder.clone();finishPlacement(pos)}else if(!g.wasMoved){finishPlacement(state.home.cylinder.clone())}else{state.assemblies.cylinder.visible=false;state.assemblies.cylinder.position.copy(state.home.cylinder)}return}
  if(state.valveOpen&&e.type!=='pointermove')stopValve();
  const d=state.drag;if(!d||d.pointer!==e.pointerId)return;state.drag=null;controls.enabled=true;renderer.domElement.style.cursor='grab';const obj=state.assemblies[d.key];obj.position.y=TABLE_Y;
  if(!d.wasMoved){obj.position.copy(d.start);state.selected=d.key;refreshStation();return}
  glassClink(.55);
  let to=null;if(state.step===1&&d.key==='stock')to='cylinder';if(state.step===2&&d.key==='cylinder')to='beaker';if(state.step===3&&d.key==='water')to='beaker';
  if(d.key==='beaker'&&snapBeakerToStation(obj)){refreshStation();updateTargetRing();return}
  if(d.key==='beaker'){state.beakerDock='bench';state.scalePresent=false;state.home.beaker=obj.position.clone();refreshStation()}
  if(to){const target=state.assemblies[to];if(distXZ(obj.position,target.position)<.83){let amount=state.step===2?state.volumes.cylinder:Math.min(state.selectedAmount,state.volumes[d.key]);if(state.step===1)amount=Math.min(amount,100-state.volumes.cylinder);if(state.step===3)amount=Math.min(amount,MAX_BEAKER-state.volumes.beakerStock-state.volumes.beakerWater);
      if(amount>0.01){beginPour(d.key,to,amount,d.start);return}}
    status(T().tooClose,'warn');
  }
  state.home[d.key]=obj.position.clone();refreshStation();updateTargetRing();
}
function finishPlacement(p){if(state.step!==0||state.placed)return;glassClink(.58);const obj=state.assemblies.cylinder;state.placed=true;obj.visible=true;obj.position.copy(clampToWorktop(new THREE.Vector3(clamp(p.x,-1.1,.2),TABLE_Y,clamp(p.z,-.4,1.15))));state.home.cylinder=obj.position.clone();setStep(1);status(T().placed,'good');}
function setTrayHandlers(){const cylinder=$('toolCylinder');cylinder.addEventListener('pointerdown',e=>{if(state.step!==0||state.busy)return;setupAudio();e.preventDefault();state.ghost={pointer:e.pointerId,wasMoved:false,startX:e.clientX,startY:e.clientY};state.assemblies.cylinder.visible=true;$('dragBadge').style.display='block';$('dragBadge').textContent=T().placeBadge;$('dragBadge').style.left=e.clientX+'px';$('dragBadge').style.top=e.clientY+'px';});
  window.addEventListener('pointermove',e=>{if(state.ghost&&state.ghost.pointer===e.pointerId&&Math.hypot(e.clientX-state.ghost.startX,e.clientY-state.ghost.startY)>7)state.ghost.wasMoved=true},{passive:true});
}
const ease=(a,b,x)=>{let t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)};
const pourCurvePoint=(a,b,t)=>{
  const v=new THREE.Vector3().lerpVectors(a,b,t);
  // Gravity-controlled arc: initial motion is sideways, then accelerates down.
  v.y=a.y+(b.y-a.y)*(t*t)+.055*t*(1-t);
  v.z+=Math.sin(t*Math.PI)*.012;
  return v;
};
function targetLiquidSurface(key){
  const obj=state.assemblies[key],u=obj.userData,v=getDisplayVolumes();
  const n=key==='beaker'?v.beakerStock+v.beakerWater:v[key];
  return obj.position.y+u.height*heightForVolume(u.profile,clamp(n/u.capacity,0,1));
}
function beginPour(from,to,amount,start){
  if(state.busy||amount<=0)return;
  const src=state.assemblies[from],target=state.assemblies[to];
  state.busy=true;
  const drop=src.position.clone();drop.y=TABLE_Y;
  const sign=target.position.x>=drop.x?1:-1;
  // Position the rim above, and just inside, the receiver (not beside its walls).
  const hover=new THREE.Vector3(
    target.position.x-sign*(src.userData.height*.78+target.userData.radius*.25),
    TABLE_Y+Math.max(target.userData.height*.79,.48),
    target.position.z-.035
  );
  const tint=from==='water'?0x9adff1:0x1e87ba;
  const flowMat=new THREE.MeshPhysicalMaterial({color:tint,roughness:.045,metalness:0,clearcoat:1,
    clearcoatRoughness:.03,transparent:true,opacity:.67,depthWrite:false,side:THREE.DoubleSide});
  const tube=new THREE.Mesh(new THREE.TubeGeometry(new THREE.LineCurve3(new THREE.Vector3(),new THREE.Vector3(0,.2,0)),4,.008,7,false),flowMat);
  tube.visible=false;tube.renderOrder=5;scene.add(tube);
  const beadMat=new THREE.MeshPhysicalMaterial({color:tint,roughness:.08,metalness:0,transparent:true,
    opacity:.83,depthWrite:false});
  const droplets=[];
  for(let i=0;i<11;i++){
    const o=new THREE.Mesh(new THREE.SphereGeometry(.007+(i%4)*.002,8,6),beadMat);
    o.visible=false;o.renderOrder=6;scene.add(o);droplets.push(o);
  }
  const splashes=[];
  for(let i=0;i<8;i++){
    const o=new THREE.Mesh(new THREE.SphereGeometry(.005+(i%3)*.0015,6,5),beadMat);
    o.visible=false;scene.add(o);splashes.push(o);
  }
  const ripples=[];
  for(let i=0;i<3;i++){
    const material=new THREE.MeshBasicMaterial({color:from==='water'?0xdafaff:0x70c6ed,
      transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide});
    const ring=new THREE.Mesh(new THREE.RingGeometry(.80,.96,40),material);
    ring.rotation.x=-Math.PI/2;ring.visible=false;ring.renderOrder=8;scene.add(ring);ripples.push(ring);
  }
  const duration=clamp(3200+amount*29,3600,5800);
  state.pouring={from,to,amount,progress:0,begin:performance.now(),duration,src,target,dir:sign,
    tube,droplets,splashes,ripples,drop,hover,initial:start.clone(),previousStep:state.step,
    mouth:new THREE.Vector3(),impact:new THREE.Vector3(),soundStarted:false,frame:0};
  const panel=$('transferBadge');if(panel){panel.hidden=false;$('transferProgress').style.width='0%'}
}
function updatePour(now){
  const p=state.pouring;if(!p)return;
  const t=clamp((now-p.begin)/p.duration,0,1);
  const approach=ease(.015,.20,t),goHome=ease(.89,1,t);
  p.src.position.copy(p.drop).lerp(p.hover,approach).lerp(p.initial,goHome);
  const inclination=ease(.16,.31,t)*(1-ease(.81,.91,t));
  // The user lifts the entire vessel, rotates it naturally, and brings it back.
  const tiltAngle=(p.from==='cylinder'?1.13:1.03)*inclination;
  p.src.rotation.z=-p.dir*tiltAngle;
  p.src.rotation.x=.035*Math.sin(t*Math.PI)*inclination;
  const fill=p.src.userData;
  // Only hide the contact shadow during the purposeful lift and pour.
  fill.shadow.visible=approach<.04||goHome>.98;
  // Water's top remains largely horizontal instead of rotating like a solid cylinder.
  const horizontal=new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI/2,0,0));
  fill.surface.quaternion.copy(p.src.quaternion).invert().multiply(horizontal);
  fill.meniscus.quaternion.copy(fill.surface.quaternion);
  p.progress=ease(.30,.83,t);
  const active=ease(.29,.35,t)*(1-ease(.80,.85,t));
  if(active>.005&&!p.soundStarted){pourAudio(p.duration*.00057);p.soundStarted=true}
  p.src.updateMatrixWorld(true);
  p.mouth.copy(p.src.localToWorld(new THREE.Vector3(p.dir*fill.mouthRadius*.80,fill.height*.925,0)));
  const targetLevel=targetLiquidSurface(p.to);
  p.impact.set(p.target.position.x-p.dir*.018,targetLevel+.009,p.target.position.z);
  // Keep the stream's starting point clear of the receiving liquid.
  if(p.mouth.y<p.impact.y+.055)p.mouth.y=p.impact.y+.055;
  const path=new THREE.CatmullRomCurve3(Array.from({length:8},(_,i)=>pourCurvePoint(p.mouth,p.impact,i/7)));
  p.tube.visible=active>.015;
  if(p.tube.visible&&p.frame++%2===0){
    p.tube.geometry.dispose();
    p.tube.geometry=new THREE.TubeGeometry(path,22,.0068+Math.sin(t*29)*.0007,7,false);
  }
  p.tube.material.opacity=.67*active;
  for(let i=0;i<p.droplets.length;i++){
    const bead=p.droplets[i];bead.visible=active>.12;
    if(bead.visible){
      const phase=(t*12+i*.31)%1;
      const point=pourCurvePoint(p.mouth,p.impact,phase);
      point.x+=Math.sin(i*7.2+phase*9)*.006;
      point.z+=Math.cos(i*4.1+phase*13)*.006;
      bead.position.copy(point);bead.scale.setScalar(.7+Math.sin(i*4+t*31)*.16);
    }
  }
  const impactActive=ease(.33,.39,t)*(1-ease(.82,.9,t));
  for(let i=0;i<p.splashes.length;i++){
    const spl=p.splashes[i],cycle=(t*7+i*.173)%1;
    spl.visible=impactActive>.08;
    if(!spl.visible)continue;
    const direction=(i/8)*Math.PI*2;
    const radius=(.018+cycle*.085)*Math.min(1,p.target.userData.radius/.24);
    spl.position.copy(p.impact);
    spl.position.x+=Math.cos(direction)*radius;
    spl.position.z+=Math.sin(direction)*radius;
    spl.position.y+=Math.sin(cycle*Math.PI)*.042*impactActive;
    spl.scale.setScalar((1-cycle)*(.7+(i%3)*.2));
  }
  for(let i=0;i<p.ripples.length;i++){
    const ring=p.ripples[i],phase=(t*5+i/3)%1;
    ring.visible=impactActive>.08;
    if(!ring.visible)continue;
    const radius=(.025+phase*p.target.userData.radius*.70);
    ring.position.copy(p.impact);ring.position.y+=.002+i*.0005;
    ring.scale.setScalar(radius);
    ring.material.opacity=(1-phase)*.34*impactActive;
  }
  if($('transferBadge')){
    $('transferProgress').style.width=(p.progress*100).toFixed(0)+'%';
    setText('transferText',`${fmt(p.amount*p.progress)} / ${fmt(p.amount)} mL`);
  }
  if(t<1)return;
  p.src.rotation.set(0,0,0);
  fill.surface.rotation.set(-Math.PI/2,0,0);fill.meniscus.rotation.set(-Math.PI/2,0,0);
  fill.shadow.visible=true;stopPourAudio();
  p.src.position.copy(p.initial);p.src.position.y=TABLE_Y;
  scene.remove(p.tube);p.tube.geometry.dispose();p.tube.material.dispose();
  for(let o of [...p.droplets,...p.splashes]){scene.remove(o);o.geometry.dispose()}
  p.droplets[0].material.dispose();
  for(let o of p.ripples){scene.remove(o);o.geometry.dispose();o.material.dispose()}
  state.volumes[p.from]-=p.amount;
  if(p.to==='cylinder')state.volumes.cylinder+=p.amount;
  else if(p.from==='cylinder')state.volumes.beakerStock+=p.amount;
  else state.volumes.beakerWater+=p.amount;
  state.pouring=null;state.busy=false;
  if($('transferBadge'))$('transferBadge').hidden=true;
  const v=state.volumes,l=T();
  if(p.previousStep===1){
    if(v.cylinder===40){setStep(2);status(l.correct40,'good')}
    else if(v.cylinder<40){state.selectedAmount=40-v.cylinder;refreshUI();status(interp(l.need40,{v:fmt(v.cylinder),remaining:fmt(40-v.cylinder)}))}
    else{refreshUI();status(interp(l.over40,{v:fmt(v.cylinder)}),'warn',5200)}
  }else if(p.previousStep===2){setStep(3);state.selectedAmount=60;refreshUI();status(l.beakerReady,'good')}
  else if(p.previousStep===3){
    const volume=v.beakerStock+v.beakerWater;
    if(Math.abs(volume-100)<.06){state.volumes.beakerWater+=100-volume;setStep(4);status(l.waterDone,'good')}
    else if(volume<100){state.selectedAmount=Math.min(100-volume,100);refreshUI();status(interp(l.needWater,{v:fmt(volume),remaining:fmt(100-volume)}))}
    else{refreshUI();status(interp(l.overWater,{v:fmt(volume)}),'warn',5200)}
  }
  updateMetrics();updateTargetRing();
}


// Lightweight elliptical contact shadows make the fixed equipment visibly rest on
// the worktop, including on devices with reduced real-time shadow quality.
function createBenchContactShadow(x,z,width,depth,strength=.20){
  const canvas=document.createElement('canvas');canvas.width=128;canvas.height=128;
  const context=canvas.getContext('2d');
  const gradient=context.createRadialGradient(64,64,2,64,64,62);
  gradient.addColorStop(0,'rgba(20,44,42,.46)');
  gradient.addColorStop(.45,'rgba(20,44,42,.19)');
  gradient.addColorStop(1,'rgba(20,44,42,0)');
  context.fillStyle=gradient;context.fillRect(0,0,128,128);
  const texture=new THREE.CanvasTexture(canvas);
  const shadow=new THREE.Mesh(new THREE.PlaneGeometry(width,depth),
    new THREE.MeshBasicMaterial({map:texture,transparent:true,opacity:strength,depthWrite:false,side:THREE.DoubleSide}));
  shadow.rotation.x=-Math.PI/2;shadow.position.set(x,TABLE_Y+.003,z);
  shadow.renderOrder=1;scene.add(shadow);return shadow;
}

// --- Precision station: original burette and kitchen scale GLB files ---
const BURETTE_POS=new THREE.Vector3(-.68,TABLE_Y,-1.10);
// Main worktop region: x≈[-2.247,3.887], z≈[-2.210,.484].
// V6 placed the scale in the L-shaped void (z=+1.18); move it *onto* the top.
// With the scale's centered 1.026 × 1.489 footprint, z=-.55 leaves >.28 units
// between the forward-most corner and the physical worktop's front edge.
const SCALE_POS=new THREE.Vector3(3.05,TABLE_Y,-.55);
const BURETTE_SCALE=1.82;
const SCALE_SCALE=.64;
const SCALE_PAN=new THREE.Vector3(SCALE_POS.x,TABLE_Y+.305*SCALE_SCALE+.008,SCALE_POS.z-.16);
const SCALE_DISPLAY=new THREE.Vector3(SCALE_POS.x,TABLE_Y+.173*SCALE_SCALE,SCALE_POS.z+.455);
const BURETTE_DOCK=new THREE.Vector3(BURETTE_POS.x,TABLE_Y,BURETTE_POS.z+.02);
const scaleBareMass=115; // illustrative vessel mass in grams, NOT analytical calibration
const liquidDensity=1.0; // approximate grams per mL for a dilute aqueous solution
function makeStationPick(key,pos,dimensions){
  const mesh=new THREE.Mesh(new THREE.BoxGeometry(...dimensions),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));
  mesh.position.copy(pos);mesh.userData.pickId=key;scene.add(mesh);state.pickables.push(mesh);return mesh;
}
function updateScaleTexture(){
  if(!state.station?.screen)return;
  const canvas=state.station.screen.canvas,c=canvas.getContext('2d');
  c.clearRect(0,0,512,192);c.fillStyle='#061e23';c.fillRect(0,0,512,192);
  c.strokeStyle='#5ac2a6';c.lineWidth=6;c.strokeRect(4,4,504,184);
  c.shadowColor='#77f9c8';c.shadowBlur=24;c.fillStyle='#9fffe0';
  c.font='bold 104px monospace';c.textAlign='right';
  c.fillText(scaleMass().toFixed(1),425,128);c.shadowBlur=0;
  c.font='bold 44px monospace';c.fillStyle='#62bdac';c.fillText('g',484,128);
  c.font='bold 19px monospace';c.textAlign='left';c.fillText('MASS / TARE',26,35);
  state.station.screen.texture.needsUpdate=true;
}
async function loadPrecisionModels(){
  state.station={};
  try{
    const original=await load('./assets/dosage.glb');
    const g=original.scene;
    // Hide the reference beaker already included in the apparatus, because the
    // student's real movable mixing beaker must go under the burette instead.
    for(const n of ['Becher_low.001','Becher_liquid_low.001']){
      const obj=g.getObjectByName(n);if(obj)obj.visible=false;
    }
    const originalFluid=g.getObjectByName('Burette_25_liquide.001');if(originalFluid)originalFluid.visible=false;
    const box=new THREE.Box3().setFromObject(g),center=box.getCenter(new THREE.Vector3());
    g.position.set(-center.x,-box.min.y,-center.z);
    const root=new THREE.Group();root.add(g);root.scale.setScalar(BURETTE_SCALE);root.position.copy(BURETTE_POS);
    root.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true}});scene.add(root);createBenchContactShadow(BURETTE_POS.x,BURETTE_POS.z,.68,.64,.35);root.userData.height=.713*BURETTE_SCALE;state.assemblies.burette=root;
    // Simulated water column inside the uploaded burette glass.
    const liquid=new THREE.Mesh(new THREE.CylinderGeometry(.0048,.0048,1,24),new THREE.MeshPhysicalMaterial({color:0x83cfe5,
      transparent:true,opacity:.55,roughness:.045,clearcoat:.6,depthWrite:false}));
    // Model's original burette glass spans .242–.700 m in local GLB units.
    // The scene was re-centered, so convert the source tube's origin as well.
    liquid.userData.baseY=.248-box.min.y;
    liquid.position.set(0,liquid.userData.baseY,0);
    g.add(liquid);state.station.liquid=liquid;
    // Tap handle makes a visible response to the user's valve interaction.
    const tap=new THREE.Group();const hub=new THREE.Mesh(new THREE.SphereGeometry(.018,12,10),new THREE.MeshStandardMaterial({color:0x286a73,metalness:.45,roughness:.25}));tap.add(hub);
    const lever=new THREE.Mesh(new THREE.CylinderGeometry(.007,.007,.075,9),new THREE.MeshStandardMaterial({color:0xe1f6ee,metalness:.35,roughness:.2}));lever.rotation.z=Math.PI/2;tap.add(lever);tap.position.set(.0,.248,.01);g.add(tap);state.station.tap=tap;
    // 3D tap/stand can be directly held to dispense, as can the accessible UI button.
    state.station.burettePick=makeStationPick('burette',new THREE.Vector3(BURETTE_POS.x,TABLE_Y+.8,BURETTE_POS.z),[.60,1.55,.55]);
    const dropMat=new THREE.MeshPhysicalMaterial({color:0x98e6f6,metalness:0,roughness:.07,transparent:true,opacity:.88,depthWrite:false});
    state.station.drops=Array.from({length:8},()=>{const o=new THREE.Mesh(new THREE.SphereGeometry(.009,12,9),dropMat);o.visible=false;scene.add(o);return o});
    const rippleMat=new THREE.MeshBasicMaterial({color:0xc4f3ff,transparent:true,opacity:.4,side:THREE.DoubleSide,depthWrite:false});
    const ripple=new THREE.Mesh(new THREE.RingGeometry(.017,.021,32),rippleMat);ripple.rotation.x=-Math.PI/2;ripple.visible=false;scene.add(ripple);state.station.ripple=ripple;
    updateBuretteLiquid();
  }catch(e){console.warn('Burette model unavailable',e);}
  try{
    const original=await load('./assets/kitchen_scale_3d_model.glb');const model=original.scene;
    const box=new THREE.Box3().setFromObject(model),center=box.getCenter(new THREE.Vector3());
    model.position.set(-center.x,-box.min.y,-center.z);
    const root=new THREE.Group();root.add(model);root.scale.setScalar(SCALE_SCALE);root.position.copy(SCALE_POS);
    root.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true}});
    scene.add(root);
    const bodyBounds=new THREE.Box3().setFromObject(root);
    // Main table slab, minus a visual margin from all sides.
    if(bodyBounds.min.x < -2.20 || bodyBounds.max.x > 3.84 ||
       bodyBounds.min.z < -2.16 || bodyBounds.max.z > .43 ||
       (bodyBounds.min.x < 2.47 && bodyBounds.max.x > 1.77 &&
        bodyBounds.min.z < .40 && bodyBounds.max.z > -.26)){
      console.warn('Scale body exceeds the actual main worktop',bodyBounds,SCALE_POS);
    }
    createBenchContactShadow(SCALE_POS.x,SCALE_POS.z,1.07,1.47,.27);
    root.userData.height=.305*SCALE_SCALE;state.assemblies.scale=root;
    state.station.scalePick=makeStationPick('scale',new THREE.Vector3(SCALE_POS.x,TABLE_Y+.117,SCALE_POS.z+.462),[.69,.17,.37]);
    const canvas=document.createElement('canvas');canvas.width=512;canvas.height=192;const texture=new THREE.CanvasTexture(canvas);
    texture.colorSpace=THREE.SRGBColorSpace;
    const screen=new THREE.Mesh(new THREE.PlaneGeometry(.620,.229),new THREE.MeshBasicMaterial({map:texture,transparent:false,depthWrite:false,side:THREE.DoubleSide}));
    screen.position.copy(SCALE_DISPLAY);screen.position.y+=.006;screen.rotation.x=-Math.PI/2;screen.renderOrder=7;scene.add(screen);
    state.station.screen={canvas,texture,mesh:screen};updateScaleTexture();
  }catch(e){console.warn('Digital scale model unavailable',e);}
}
function beakerTotal(){return state.volumes.beakerStock+state.volumes.beakerWater;}
function scaleMass(){const v=getDisplayVolumes();return state.scalePresent?Math.max(-999,(scaleBareMass+(v.beakerStock+v.beakerWater)*liquidDensity)-state.scaleTareMass):0;}
function tareScale(){
  if(!state.station?.screen){status(T().stationNoBeaker,'warn');return}
  state.scaleTareMass=state.scalePresent?(scaleBareMass+beakerTotal()*liquidDensity):0;
  status(state.scalePresent?T().stationTared:T().stationTareNoObject,'good');
  refreshStation();
}
function snapBeakerToStation(beaker){
  // The original beaker remains a movable scene object, not a duplicate.
  if(state.assemblies.scale&&distXZ(beaker.position,SCALE_PAN)<.65){
    beaker.position.copy(SCALE_PAN);state.home.beaker=beaker.position.clone();state.beakerDock='scale';state.scalePresent=true;
    status(T().stationOnScale,'good');return true;
  }
  if(state.step===3&&state.assemblies.burette&&distXZ(beaker.position,BURETTE_DOCK)<.72){
    beaker.position.copy(BURETTE_DOCK);state.home.beaker=beaker.position.clone();state.beakerDock='burette';state.scalePresent=false;
    status(T().stationReady,'good');return true;
  }
  return false;
}
function refreshStation(){
  if(!$('precisionCard'))return;const l=T();
  const stationStrings={stationHeading:l.stationHeading,stationLive:l.stationLive,scaleTitle:l.scaleTitle,buretteTitle:l.buretteTitle,scaleTare:l.scaleTare,stationDescription:l.stationDescription};
  for(const [id,text] of Object.entries(stationStrings))setText(id,text);
  setText('scaleReading',scaleMass().toFixed(1));setText('buretteReading',state.buretteRemaining.toFixed(1));
  $('buretteIndicator').style.width=clamp(state.buretteRemaining,0,100)+'%';
  $('scaleIndicator').style.width=(state.scalePresent?'100':'0')+'%';
  $('precisionCard').classList.toggle('has-weighed',state.scalePresent);
  setText('scaleMiniReading',scaleMass().toFixed(1));
  setText('scaleMiniTitle',l.scaleFocusTitle);
  setText('scaleMiniHint',state.scalePresent?l.scalePlaced:l.scaleHint);
  setText('scaleMiniTare',l.scaleTare);
  setText('scaleFocusText',scaleView?l.scaleOverview:l.scaleFocus);
  $('scaleFocusBtn').setAttribute('aria-pressed',String(scaleView));
  const active=state.step===3&&state.beakerDock==='burette'&&state.buretteRemaining>.001&&!state.busy;
  $('valveButton').disabled=!active;
  $('valveButton').classList.toggle('running',state.valveOpen);
  setText('valveButton',state.valveOpen?l.valveRunning:l.valveHold);
  $('precisionCard').classList.toggle('locked',!active);
  $('stationInstruction').hidden=!(state.step===3);
  if(state.step===3)setText('stationInstruction',state.beakerDock==='burette'?l.stationReady:l.stationDock);
  setText('labelBuretteTitle',l.stationBurette);setText('labelScaleTitle',l.stationScale);setText('labelBuretteAmount',state.buretteRemaining.toFixed(1)+' mL');setText('labelScaleAmount',scaleMass().toFixed(1)+' g');
  if(state.station?.screen)updateScaleTexture();
}
function updateBuretteLiquid(){
  const obj=state.station?.liquid;if(!obj)return;
  const level=clamp(state.buretteRemaining/100,0,1);
  obj.visible=level>.005;
  const span=.435*level;
  obj.scale.y=Math.max(.0001,span);
  obj.position.y=obj.userData.baseY+span/2;
}
function startValve(){
  if(state.valveOpen)return;
  if(state.step!==3||state.beakerDock!=='burette'||state.busy||state.buretteRemaining<=0){status(T().stationDock,'warn');return}
  state.valveOpen=true;state.buretteDraw=0;setupAudio();refreshStation();
}
function stopValve(){
  if(!state.valveOpen)return;state.valveOpen=false;
  state.station?.drops?.forEach(d=>d.visible=false);
  if(state.station?.ripple)state.station.ripple.visible=false;
  refreshStation();
}
function updateStationEffects(now){
  if(!state.station)return;
  if(state.station.tap){state.station.tap.rotation.y+=( (state.valveOpen?Math.PI*.65:0)-state.station.tap.rotation.y)*.2;}
  if(dockRing?.visible){const s=1+.11*Math.sin(now*.004);dockRing.scale.setScalar(s);}
  if(scaleDockRing){const d=state.drag;scaleDockRing.visible=!!(d&&d.key==='beaker'&&state.beakerDock!=='scale');if(scaleDockRing.visible){const beaker=state.assemblies.beaker;const near=beaker&&distXZ(beaker.position,SCALE_PAN)<.65;scaleDockRing.material.color.set(near?'#00a66c':'#21d8b6');scaleDockRing.scale.setScalar(1+.065*Math.sin(now*.006));}}
}
let lastDripSound=0;
function updateBurette(dt,now){
  if(!state.valveOpen||!state.station?.drops)return;
  if(state.step!==3||state.beakerDock!=='burette'||state.busy){stopValve();return}
  const capacity=100-beakerTotal(),available=state.buretteRemaining;
  // A slower calibrated-looking trickle for more precise student control.
  const increment=Math.max(0,Math.min(dt*8,capacity,available));
  state.buretteRemaining=Math.max(0,state.buretteRemaining-increment);
  state.volumes.beakerWater+=increment;state.buretteDraw+=increment;
  if(now-lastDripSound>330){lastDripSound=now;dripSfx();}
  updateBuretteLiquid();
  const target=state.assemblies.beaker;
  const spout=new THREE.Vector3(BURETTE_POS.x,TABLE_Y+.217*BURETTE_SCALE,BURETTE_POS.z+.05*BURETTE_SCALE);
  const impact=new THREE.Vector3(target.position.x,target.position.y+target.userData.height*heightForVolume(target.userData.profile,clamp(beakerTotal()/MAX_BEAKER,0,1)),target.position.z);
  // Draw individual droplets falling under gravity, rather than a solid tube.
  const gap=Math.max(.025,spout.y-impact.y);
  for(let i=0;i<state.station.drops.length;i++){
    const o=state.station.drops[i],p=(now*.001*2.4+i/8)%1;
    o.visible=p<.78;
    if(!o.visible)continue;
    o.position.lerpVectors(spout,impact,p*p);
    o.position.x+=Math.sin(now*.014+i*2.3)*.0025;
    o.position.z+=Math.cos(now*.012+i*3.1)*.0025;
    o.scale.setScalar(.6+.35*p);
  }
  if(state.station.ripple){const ring=state.station.ripple;ring.visible=true;ring.position.copy(impact);ring.position.y+=.005;const phase=(now*.0025)%1;ring.scale.setScalar(1+phase*3);ring.material.opacity=.22*(1-phase);}
  if(now-lastHud>45){refreshStation();updateMetrics()}
  if(capacity<=.00001||available<=.00001||increment<=.000001){
    stopValve();state.volumes.beakerWater=round(state.volumes.beakerWater);
    state.buretteRemaining=round(state.buretteRemaining);
    if(beakerTotal()>=99.9999){const missing=100-beakerTotal();state.volumes.beakerWater+=missing;setStep(4);status(T().stationWaterDone,'good');}
    else if(state.buretteRemaining<=0){status(T().stationEmpty,'warn');}
  }
}
function initPrecisionControls(){
  $('scaleTare').addEventListener('click',tareScale);
  const button=$('valveButton');
  button.addEventListener('pointerdown',e=>{if(button.disabled)return;e.preventDefault();button.setPointerCapture(e.pointerId);startValve();});
  for(const event of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(event,stopValve);
  button.addEventListener('keydown',e=>{if((e.key===' '||e.key==='Enter')&&!e.repeat){e.preventDefault();startValve()}});
  button.addEventListener('keyup',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();stopValve()}});
  window.addEventListener('blur',stopValve);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopValve()});
}

function initControls(){
  initPrecisionControls();
  $('volumeSlider').addEventListener('input',e=>{state.selectedAmount=Number(e.target.value);setText('volumeValue',fmt(state.selectedAmount)+' mL')});
  $('languageBtn').addEventListener('click',()=>{state.lang=state.lang==='en'?'ar':'en';refreshUI()});
  $('soundBtn').addEventListener('click',()=>{state.sound=!state.sound;setAudioEnabled(state.sound);refreshUI();if(state.sound)glassClink(.5)});
  $('resetBtn').addEventListener('click',()=>{if(state.busy){status(T().busy,'warn');return}if(state.placed&&!confirm(T().resetQuestion))return;resetLab()});
  $('correctMistakeBtn').addEventListener('click',()=>{if(state.busy)return;if(state.step===1){state.volumes.stock+=state.volumes.cylinder;state.volumes.cylinder=0;state.selectedAmount=40;status(T().stepDetails[1]);}else if(state.step===3){state.volumes.water+=state.volumes.beakerWater;state.volumes.beakerWater=0;state.selectedAmount=60;status(T().stepDetails[3]);}refreshUI()});
  $('hintButton').addEventListener('click',()=>status(T().hintSteps[state.step],'normal',5800));
  $('continueBtn').addEventListener('click',()=>{if(state.step!==4)return;setStep(5);status(T().stepDetails[5])});
  $('checkBtn').addEventListener('click',()=>{if(state.solved){resetLab();return}let raw=$('answerInput').value.replace(/[٠-٩]/g,ch=>String(ch.charCodeAt(0)-0x0660)).replace(/[۰-۹]/g,ch=>String(ch.charCodeAt(0)-0x06f0)).replace(/[٫,]/g,'.').replace(/[Mmم]/g,'').trim();let val=Number(raw);if(!$('answerInput').value.trim()||!Number.isFinite(val)){status(T().invalid,'warn');return}if(Math.abs(val-.4)<=.01){state.solved=true;refreshUI();setText('answerFeedback',T().finish);$('checkBtn').textContent=T().retry;status(T().finish,'good',6200);ping(880)}else{setText('answerFeedback',T().incorrect);status(T().incorrect,'warn')}});
  $('answerInput').addEventListener('keydown',e=>{if(e.key==='Enter')$('checkBtn').click()});
  $('zoomIn').addEventListener('click',()=>zoom(.8));$('zoomOut').addEventListener('click',()=>zoom(1.25));$('viewReset').addEventListener('click',()=>setScaleView(false));
  $('scaleFocusBtn').addEventListener('click',()=>setScaleView(!scaleView));
  $('scaleMiniTare').addEventListener('click',tareScale);
  setTrayHandlers();
}
// Camera presets support short, user-controlled close-ups of the actual scale.
const CAMERA_OVERVIEW_POS=new THREE.Vector3(6.9,6.3,10.0);
const CAMERA_OVERVIEW_TARGET=new THREE.Vector3(.65,TABLE_Y+.20,.1);
function updateCameraTween(time){
  if(!cameraTween)return;
  const t=clamp((time-cameraTween.start)/cameraTween.duration,0,1);
  const k=t*t*(3-2*t);
  camera.position.lerpVectors(cameraTween.fromPos,cameraTween.toPos,k);
  controls.target.lerpVectors(cameraTween.fromTarget,cameraTween.toTarget,k);
  if(t>=1)cameraTween=null;
}
function setScaleView(on){
  if(on&&!state.assemblies.scale){status(T().stationNoBeaker,'warn');return}
  scaleView=on;controls.minDistance=on?3.3:5.5;cameraTween={fromPos:camera.position.clone(),fromTarget:controls.target.clone(),
    toPos:on?new THREE.Vector3(SCALE_POS.x+2.18,TABLE_Y+2.17,SCALE_POS.z+3.43):CAMERA_OVERVIEW_POS.clone(),
    toTarget:on?new THREE.Vector3(SCALE_POS.x,TABLE_Y+.13,SCALE_POS.z+.22):CAMERA_OVERVIEW_TARGET.clone(),
    start:performance.now(),duration:720};
  $('scaleMini').hidden=!on;
  refreshStation();
}
function zoom(mult){cameraTween=null;const delta=camera.position.clone().sub(controls.target);let len=clamp(delta.length()*mult,controls.minDistance,controls.maxDistance);camera.position.copy(controls.target).add(delta.normalize().multiplyScalar(len));controls.update()}
function resetLab(){if(state.busy)return;setScaleView(false);stopValve();stopPourAudio();state.buretteRemaining=100;state.buretteDraw=0;state.scaleTareMass=0;state.scalePresent=false;state.beakerDock='bench';state.volumes={stock:120,cylinder:0,beakerStock:0,beakerWater:0,water:180};state.step=0;state.placed=false;state.solved=false;state.selectedAmount=40;state.selected='';state.drag=null;state.ghost=null;state.home={stock:new THREE.Vector3(-1.55,TABLE_Y,-.34),cylinder:new THREE.Vector3(-.35,TABLE_Y,.10),beaker:new THREE.Vector3(1.08,TABLE_Y,.12),water:new THREE.Vector3(1.25,TABLE_Y,-1.52)};
  for(let key of ['stock','cylinder','beaker','water']){if(state.assemblies[key]){state.assemblies[key].position.copy(state.home[key]);state.assemblies[key].rotation.set(0,0,0);state.assemblies[key].userData.smoothedColor=null}}if(state.assemblies.cylinder)state.assemblies.cylinder.visible=false;if(state.station?.liquid)updateBuretteLiquid();refreshStation();$('answerInput').value='';setText('answerFeedback','');refreshUI();status(T().stepDetails[0]);}

initControls();refreshUI();preloadAudio();
loadModels().catch(err=>{console.error('Failed to initialize lab:',err);let el=$('loading');setText('loadingTitle','Unable to start laboratory');setText('loadingMessage',T().loadingFailure+' '+(err.message||''));$('loadingBar').style.width='0%'});
