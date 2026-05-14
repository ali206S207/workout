// ===== MAINTENANCE MODE =====
const MAINTENANCE = false; // غيّرها true لتشغيل الصيانة
const MAINTENANCE_MSG = "بنطور الموقع ونرجعلك أحسن";
const MAINTENANCE_TIME = "خلال ساعات قليلة ⏳";
if(MAINTENANCE){
  // Clear all caches when maintenance mode is on
  if("caches" in window){
    caches.keys().then(keys=>keys.forEach(k=>caches.delete(k)));
  }
  // Unregister service worker
  if("serviceWorker" in navigator){
    navigator.serviceWorker.getRegistrations().then(regs=>regs.forEach(r=>r.unregister()));
  }
  document.addEventListener("DOMContentLoaded",()=>{
    document.body.innerHTML="";
    document.body.style.cssText="margin:0;padding:0;background:#080808;font-family:'Cairo',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;";
    const s=document.createElement("link");
    s.rel="stylesheet";s.href="https://fonts.googleapis.com/css2?family=Cairo:wght@700;900&family=Bebas+Neue&display=swap";
    document.head.appendChild(s);
    document.body.innerHTML+=`<style>
      @keyframes floatAnim{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}
      @keyframes pulseAnim{0%,100%{opacity:1;}50%{opacity:0.4;}}
      @keyframes spinAnim{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
      @keyframes fadeUpAnim{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}
      @keyframes glowAnim{0%,100%{box-shadow:0 0 20px rgba(255,215,0,0.3);}50%{box-shadow:0 0 60px rgba(255,215,0,0.7);}}
      .mn{text-align:center;padding:24px;max-width:400px;width:100%;animation:fadeUpAnim 0.8s ease;}
      .mn-logo{width:90px;height:90px;border-radius:20px;margin:0 auto 24px;display:block;animation:floatAnim 3s ease-in-out infinite,glowAnim 3s ease-in-out infinite;border:2px solid rgba(255,215,0,0.3);}
      .mn-gear{font-size:44px;margin-bottom:14px;display:block;animation:spinAnim 4s linear infinite;}
      .mn-title{font-family:'Bebas Neue',sans-serif;font-size:40px;color:#FFD700;letter-spacing:3px;margin-bottom:6px;}
      .mn-sub{font-size:20px;font-weight:700;color:white;margin-bottom:10px;}
      .mn-msg{color:#888;font-size:14px;line-height:1.7;margin-bottom:8px;}
      .mn-time{display:inline-block;background:rgba(255,215,0,0.1);border:1px solid rgba(255,215,0,0.25);color:#FFD700;font-size:13px;font-weight:700;padding:5px 16px;border-radius:20px;margin-bottom:28px;}
      .mn-dots{display:flex;gap:8px;justify-content:center;margin-bottom:28px;}
      .mn-dot{width:10px;height:10px;border-radius:50%;background:#FFD700;animation:pulseAnim 1.4s ease-in-out infinite;}
      .mn-dot:nth-child(2){animation-delay:0.2s;}
      .mn-dot:nth-child(3){animation-delay:0.4s;}
      .mn-line{width:50px;height:1px;background:rgba(255,215,0,0.2);margin:0 auto 24px;}
      .mn-wa{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,#25d366,#128c7e);color:white;font-family:'Cairo',sans-serif;font-size:15px;font-weight:900;padding:13px 26px;border-radius:50px;text-decoration:none;box-shadow:0 8px 24px rgba(37,211,102,0.35);}
      .mn-footer{margin-top:28px;color:#333;font-size:11px;letter-spacing:2px;}
    </style>
    <div class="mn">
      <img class="mn-logo" id="mn-logo" src="" alt="TEFA GYM">
      <span class="mn-gear">⚙️</span>
      <div class="mn-title">TEFA GYM</div>
      <div class="mn-sub">الموقع تحت الصيانة</div>
      <div class="mn-msg">${MAINTENANCE_MSG}</div>
      <div class="mn-time">${MAINTENANCE_TIME}</div>
      <div class="mn-dots"><div class="mn-dot"></div><div class="mn-dot"></div><div class="mn-dot"></div></div>
      <div class="mn-line"></div>
      <a class="mn-wa" href="https://wa.me/201228164202" target="_blank">📱 تواصل مع الكابتن</a>
      <div class="mn-footer">TEFA GYM · ASYUT · EGYPT</div>
    </div>`;
    document.getElementById("mn-logo").src="assets/images/maintenance-logo.png";
  });
}

// ===== MOBILE MENU =====
function toggleMobileMenu(){
  const m=document.getElementById("mobile-menu");
  m.classList.toggle("open");
}
function showPageMobile(name,btn){
  const pages=["home","workout","log","streak","packages","calories","creatine"];
  showPage(name,document.querySelectorAll(".nav-tab")[pages.indexOf(name)]);
  document.querySelectorAll(".nav-mobile-btn").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("mobile-menu").classList.remove("open");
}
// ===== PASSWORD =====
const PASS = "tefa2025";
function doLogin(){
  if(document.getElementById("pw-input").value===PASS){
    document.getElementById("login-page").style.display="none";
    document.getElementById("app").style.display="block";
    initWorkout(); renderLog(); renderStreak(); loadContact();
    initTheme();
    initGuide();
    checkResumeWorkout();
    checkChangelog();
    setTimeout(checkWeightSetup, 1000);
    // Show install banner if not dismissed before
    if(!localStorage.getItem("tefa_pwa_dismissed")){
      setTimeout(showInstallBanner, 2000);
    }
  } else {
    const e=document.getElementById("pw-error");
    e.style.display="block";
    e.style.animation="none"; void e.offsetWidth; e.style.animation="shake 0.4s ease";
    document.getElementById("pw-input").value="";
  }
}
document.getElementById("pw-input").addEventListener("keydown",e=>{if(e.key==="Enter")doLogin();});

// Particles
(function(){
  const c=document.getElementById("particles");
  for(let i=0;i<18;i++){
    const p=document.createElement("div");
    p.className="particle";
    p.style.left=Math.random()*100+"%";
    p.style.animationDuration=(8+Math.random()*12)+"s";
    p.style.animationDelay=(Math.random()*10)+"s";
    p.style.width=p.style.height=(1+Math.random()*2)+"px";
    c.appendChild(p);
  }
})();

// ===== NAV =====
function showPage(name,tab){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.querySelectorAll(".nav-tab").forEach(t=>t.classList.remove("active"));
  document.getElementById("page-"+name).classList.add("active");
  tab.classList.add("active");
  if(name==="log") renderLog();
  if(name==="streak") renderStreak();
}
function showDay(day,tab){
  document.querySelectorAll(".day-content").forEach(d=>d.classList.remove("active"));
  document.querySelectorAll(".day-tab").forEach(t=>t.classList.remove("active"));
  document.getElementById("day-"+day).classList.add("active");
  tab.classList.add("active");
}

// ===== CONTACT =====
function loadContact(){
  const wa=localStorage.getItem("tefa_wa")||"201228164202";
  const fb=localStorage.getItem("tefa_fb")||"https://www.facebook.com/profile.php?id=100069961030755";
  document.getElementById("wa-btn").href="https://wa.me/"+wa.replace(/\D/g,"");
  if(fb) document.getElementById("fb-btn").href=fb;
}
function saveContact(){
  const wa=document.getElementById("wa-input").value.trim();
  const fb=document.getElementById("fb-input").value.trim();
  localStorage.setItem("tefa_wa",wa);
  localStorage.setItem("tefa_fb",fb);
  loadContact();
  document.getElementById("contact-edit").style.display="none";
  alert("✅ تم حفظ الروابط!");
}

function contactWA(){
  const wa=localStorage.getItem("tefa_wa")||"201228164202";
  window.open("https://wa.me/"+wa.replace(/\D/g,""),"_blank");
}

// ===== WORKOUT =====
const VIDEO_LINKS = {
  day1: {
    0:"https://youtube.com/shorts/XjrsqShr-Ic?si=g46ICBN6MqFYNXNW",
    1:"https://youtube.com/shorts/hkU6fSHcslw?si=0Vh1g0IeIkOUrxPU",
    2:"https://youtube.com/shorts/ZLv-K-zSrC0?si=SDhRPMKnwxfQgWYM",
    3:"https://youtube.com/shorts/ogj1igwlc9I?si=UglervAFkGx2kXjA",
    4:"https://youtube.com/shorts/IZS2RMmqt3E?si=VDxqNtq0bELndcRB",
    5:"https://youtube.com/shorts/1FjkhpZsaxc?si=YliN9GmPSMfovCrc",
    6:"https://youtube.com/shorts/b_r_LW4HEcM?si=N7dOOMIVe4lc-gCq"
  },
  day2: {
    0:"https://youtube.com/shorts/yHqqGd0tXcw?si=mu1gxL7nI0YaDkGr",
    1:"https://youtube.com/shorts/51ql2-2kLfA?si=m1t28GspQgzmWOV_",
    2:"https://youtube.com/shorts/0QN8jx2nEQc?si=B0dx2uYvrzq5uGfB",
    3:"https://youtube.com/shorts/FVyVvApcyZY?si=bxaoG9S10SKVscrm",
    4:"https://youtube.com/shorts/qD1WZ5pSuvk?si=lEeA_vWxzzGWJBQn",
    5:"https://youtube.com/shorts/8rXdAAwm8Rs?si=dUEkulNxFlFajKLw",
    6:"https://youtube.com/shorts/CrbTqNOlFgE?si=zFLMD6mm5rLwCCF-",
    7:"https://youtube.com/shorts/MKWBV29S6c0?si=D0bPIuiH2UXwJf8o"
  },
  day4: {
    0:"https://youtube.com/shorts/zoN5EH50Dro?si=LqdH17AljPRPKpLz",
    1:"https://youtube.com/shorts/beTQM0EgrIM?si=B55QJmsHOb3Xv2e0",
    2:"https://youtube.com/shorts/6v4nrRVySj0?si=r9-VjtMKmn5Hxz3S",
    3:"https://youtube.com/shorts/Kl3LEzQ5Zqs?si=A2O5G3MCGAc6nzQ7",
    4:"https://youtube.com/shorts/H5UxZFl0lgk?si=sg0Q56jP2j4g9U0N",
    5:"https://youtube.com/shorts/rFsSeClGnNA?si=2GiSL6lEkjCm9g6w"
  },
  day5: {
    0:"https://youtube.com/shorts/54x2WF1_Suc?si=tFNrtEv5FXGdKpwg",
    1:"https://youtube.com/shorts/WyAVZn6_PIY?si=a9y-ZVNybB5P86GG",
    2:"https://youtube.com/shorts/CrbTqNOlFgE?si=hIsAtjM3DpOxJmfC",
    3:"https://youtube.com/shorts/u36jNfqh8_U?si=mxc9bQBz4UdzhzlH",
    4:"https://youtube.com/shorts/NTk0Igxqcsk?si=e1PA8VKoJm0SudW8",
    5:"https://youtube.com/shorts/-dOhi8LBJBk?si=2R5-wSl2CYVUiVeP"
  },
  day6: {
    0:"https://youtube.com/shorts/EotSw18oR9w?si=-81VWWTcOMd1sjpT",
    1:"https://youtube.com/shorts/mJilHWIBWO8?si=dpDE-XkAwAa_fibc",
    2:"https://youtube.com/shorts/uM86QE59Tgc?si=fEqmC4CDsE8g3zrP",
    3:"https://youtube.com/shorts/FRy58-v0YII?si=mqdIT73Qi0s8AMER",
    4:"https://youtube.com/shorts/5o9V-I3bII0?si=IfnF2q-xaRzRnvOL"
  },
};

const WORKOUT_PLAN = {
  day1:[
    {
      name:"بار مستوي (Bench Press)", tag:"بنش",
      sets_rec:"4 × 8-10", rest:"90 ثانية",
      tip:"خلي كوعيك بزاوية 45° — متفتحش أوي عشان الكتف",
      muscles:[
        {name:"صدر الأوسط",pct:70,color:"#f97316"},
        {name:"تراي",pct:20,color:"#a78bfa"},
        {name:"كتف أمامي",pct:10,color:"#38bdf8"},
      ]
    },
    {
      name:"دفع بنش عالي (Incline Bench Press)", tag:"بنش",
      sets_rec:"4 × 8-10", rest:"90 ثانية",
      tip:"الدكة على 30-45° — أعلى من كده بيحمّل الكتف أكتر من الصدر",
      muscles:[
        {name:"صدر العلوي",pct:65,color:"#f97316"},
        {name:"كتف أمامي",pct:20,color:"#38bdf8"},
        {name:"تراي",pct:15,color:"#a78bfa"},
      ]
    },
    {
      name:"تفاتيح عالي دامبل (Incline Dumbbell Flyes)", tag:"بنش",
      sets_rec:"3 × 12-15", rest:"60 ثانية",
      tip:"ركز على الإحساس بالشد في الصدر — مش القوة. الوزن خفيف وبطيء",
      muscles:[
        {name:"صدر العلوي",pct:75,color:"#f97316"},
        {name:"صدر الأوسط",pct:20,color:"#fb923c"},
        {name:"كتف أمامي",pct:5,color:"#38bdf8"},
      ]
    },
    {
      name:"دفع بنش مستوي (Flat Bench Press)", tag:"بنش",
      sets_rec:"3 × 10-12", rest:"90 ثانية",
      tip:"ثبّت ضهرك على الدكة وانفخ صدرك — الحركة من الصدر للأعلى مش من الكتف",
      muscles:[
        {name:"صدر الكامل",pct:65,color:"#f97316"},
        {name:"تراي",pct:25,color:"#a78bfa"},
        {name:"كتف أمامي",pct:10,color:"#38bdf8"},
      ]
    },
    {
      name:"فراشة (Chest Fly Machine)", tag:"بنش",
      sets_rec:"3 × 12-15", rest:"60 ثانية",
      tip:"في آخر الحركة اضغط الصدر زي ما بتعصر الليمونة — احتفظ بالضغط ثانيتين",
      muscles:[
        {name:"صدر الأوسط",pct:80,color:"#f97316"},
        {name:"صدر الداخلي",pct:15,color:"#fb923c"},
        {name:"كتف أمامي",pct:5,color:"#38bdf8"},
      ]
    },
    {
      name:"تراي بالمسطرة (Cable Triceps Pushdown)", tag:"تراي",
      sets_rec:"4 × 12-15", rest:"60 ثانية",
      tip:"كوعيك ثابتين جنب جسمك طول الوقت — اللي بيتحرك بس الساعد",
      muscles:[
        {name:"تراي الجانبي",pct:55,color:"#a78bfa"},
        {name:"تراي الطويل",pct:30,color:"#c4b5fd"},
        {name:"تراي الداخلي",pct:15,color:"#ddd6fe"},
      ]
    },
    {
      name:"اوفر دامبلز (Dumbbell Pullover)", tag:"تراي",
      sets_rec:"3 × 12", rest:"60 ثانية",
      tip:"رجّع الدمبل ببطء لورا — الإحساس لازم يكون في الصدر والتراي معاً",
      muscles:[
        {name:"صدر السفلي",pct:40,color:"#f97316"},
        {name:"ظهر العريض",pct:35,color:"#34d399"},
        {name:"تراي الطويل",pct:25,color:"#a78bfa"},
      ]
    },
  ],
  day2:[
    {
      name:"منشار فردي (One-Arm Dumbbell Row)", tag:"ظهر",
      sets_rec:"4 × 10-12 لكل جهة", rest:"75 ثانية",
      tip:"اسحب الدمبل لناحية وسطك مش صدرك — وبلف الكتف في نهاية الحركة",
      muscles:[
        {name:"ظهر العريض",pct:60,color:"#34d399"},
        {name:"الرمبويد",pct:25,color:"#6ee7b7"},
        {name:"باي",pct:15,color:"#f59e0b"},
      ]
    },
    {
      name:"سحب عالي على الجهاز (Lat Pulldown Machine)", tag:"ظهر",
      sets_rec:"4 × 10-12", rest:"75 ثانية",
      tip:"اسحب للصدر مش للرقبة — وانحني للخلف شوية بس مش أوي",
      muscles:[
        {name:"ظهر العريض",pct:70,color:"#34d399"},
        {name:"الرمبويد",pct:15,color:"#6ee7b7"},
        {name:"باي",pct:15,color:"#f59e0b"},
      ]
    },
    {
      name:"ظرافة (Cable Row Close Grip)", tag:"ظهر",
      sets_rec:"3 × 12", rest:"60 ثانية",
      tip:"ضهرك مستقيم واسحب للبطن — الأكواع بتروح لورا مش للجنب",
      muscles:[
        {name:"الرمبويد",pct:45,color:"#6ee7b7"},
        {name:"ظهر العريض",pct:35,color:"#34d399"},
        {name:"باي",pct:20,color:"#f59e0b"},
      ]
    },
    {
      name:"جهاز دوريان واسع (Wide Grip Pulldown)", tag:"ظهر",
      sets_rec:"3 × 12", rest:"75 ثانية",
      tip:"القبضة الواسعة بتركز أكتر على العريض — متقفلش كوعك في الآخر",
      muscles:[
        {name:"ظهر العريض",pct:75,color:"#34d399"},
        {name:"الرمبويد",pct:15,color:"#6ee7b7"},
        {name:"باي",pct:10,color:"#f59e0b"},
      ]
    },
    {
      name:"سحب أرضي ضيق (Cable Row From Tips)", tag:"ظهر",
      sets_rec:"3 × 12-15", rest:"60 ثانية",
      tip:"القبضة الضيقة بتفعّل الظهر الأوسط والأسفل أكتر — احتفظ بالضغط في الآخر",
      muscles:[
        {name:"ظهر الأوسط",pct:50,color:"#34d399"},
        {name:"ظهر الأسفل",pct:25,color:"#6ee7b7"},
        {name:"باي",pct:25,color:"#f59e0b"},
      ]
    },
    {
      name:"قطنية (Hyperextension)", tag:"ظهر",
      sets_rec:"3 × 15", rest:"60 ثانية",
      tip:"ارفع جسمك لحد ما يبقى مستقيم بس — فوق كده بيضغط على الفقرات",
      muscles:[
        {name:"أسفل الظهر",pct:60,color:"#34d399"},
        {name:"هامسترينج",pct:25,color:"#fb923c"},
        {name:"الجلوتس",pct:15,color:"#f97316"},
      ]
    },
    {
      name:"باي على الكيبل بالمسطرة (Cable Bar Curl)", tag:"باي",
      sets_rec:"3 × 12-15", rest:"60 ثانية",
      tip:"التوتر على الكيبل ثابت طول الحركة — أحسن من البار في الإطالة",
      muscles:[
        {name:"باي القصير",pct:50,color:"#f59e0b"},
        {name:"باي الطويل",pct:35,color:"#fcd34d"},
        {name:"ساعد",pct:15,color:"#fde68a"},
      ]
    },
    {
      name:"باي تبادل دامبلز (Alternating Dumbbell Biceps Curl)", tag:"باي",
      sets_rec:"3 × 10-12 لكل جهة", rest:"60 ثانية",
      tip:"بلّف الرسغ للخارج وانت رافع — ده بيزيد تقلص الباي بشكل أقوى",
      muscles:[
        {name:"باي الطويل",pct:55,color:"#fcd34d"},
        {name:"باي القصير",pct:30,color:"#f59e0b"},
        {name:"ساعد",pct:15,color:"#fde68a"},
      ]
    },
  ],
  day4:[
    {
      name:"امامي بار واقف (Standing Barbell Front Raise)", tag:"كتف",
      sets_rec:"3 × 12", rest:"60 ثانية",
      tip:"ارفع البار لحد مستوى العين بس — فوق كده بيشيل الكتف من دلتا لـ trap",
      muscles:[
        {name:"دلتا أمامي",pct:75,color:"#38bdf8"},
        {name:"دلتا جانبي",pct:15,color:"#7dd3fc"},
        {name:"صدر علوي",pct:10,color:"#f97316"},
      ]
    },
    {
      name:"رفرفة امامية دامبلز (Dumbbell Front Raise)", tag:"كتف",
      sets_rec:"3 × 12-15", rest:"60 ثانية",
      tip:"الدامبلز أفضل من البار عشان بيشتغل كل جهة بشكل مستقل",
      muscles:[
        {name:"دلتا أمامي",pct:80,color:"#38bdf8"},
        {name:"دلتا جانبي",pct:12,color:"#7dd3fc"},
        {name:"صدر علوي",pct:8,color:"#f97316"},
      ]
    },
    {
      name:"تجاميع على جهاز الكتف (Machine Shoulder Shrugs)", tag:"كتف",
      sets_rec:"4 × 12-15", rest:"60 ثانية",
      tip:"ارفع الكتفين للأعلى وامسك ثانيتين — ماشيش كل بده بسرعة",
      muscles:[
        {name:"الترابيزيوس",pct:70,color:"#818cf8"},
        {name:"دلتا أمامي",pct:20,color:"#38bdf8"},
        {name:"رفاع الكتف",pct:10,color:"#a5b4fc"},
      ]
    },
    {
      name:"رفرفة جانبية دامبلز (Dumbbell Lateral Raise)", tag:"كتف",
      sets_rec:"4 × 15", rest:"60 ثانية",
      tip:"الرسغ أخفض من الكوع شوية — ده الوضع الصح للدلتا الجانبي",
      muscles:[
        {name:"دلتا جانبي",pct:80,color:"#7dd3fc"},
        {name:"دلتا أمامي",pct:12,color:"#38bdf8"},
        {name:"الترابيزيوس",pct:8,color:"#818cf8"},
      ]
    },
    {
      name:"خلفيات على جهاز الفراشة (Reverse Pec Deck)", tag:"كتف",
      sets_rec:"3 × 15", rest:"60 ثانية",
      tip:"انحني للأمام شوية وركز على ضغط الكتف الخلفي — مش سحب بالذراع",
      muscles:[
        {name:"دلتا خلفي",pct:70,color:"#60a5fa"},
        {name:"الرمبويد",pct:20,color:"#6ee7b7"},
        {name:"الترابيزيوس",pct:10,color:"#818cf8"},
      ]
    },
    {
      name:"ترابيس (Trapezius Shrug)", tag:"كتف",
      sets_rec:"3 × 15", rest:"60 ثانية",
      tip:"الحركة للأعلى بس — مش للأمام أو الخلف. عاوز فقط العضلة دي تشتغل",
      muscles:[
        {name:"ترابيزيوس علوي",pct:85,color:"#818cf8"},
        {name:"رفاع الكتف",pct:10,color:"#a5b4fc"},
        {name:"دلتا جانبي",pct:5,color:"#7dd3fc"},
      ]
    },
  ],
  day5:[
    {
      name:"باي بالبار الحر (Barbell Biceps Curl)", tag:"ذراع",
      sets_rec:"4 × 8-10", rest:"75 ثانية",
      tip:"الكوعين ثابتين جنب جسمك — لو اتحركوا للأمام معناه الوزن تقيل",
      muscles:[
        {name:"باي الطويل",pct:55,color:"#f59e0b"},
        {name:"باي القصير",pct:35,color:"#fcd34d"},
        {name:"ساعد",pct:10,color:"#fde68a"},
      ]
    },
    {
      name:"ارتكاز بالدامبلز على الدكة الحصان (Incline Dumbbell Concentration Curl)", tag:"ذراع",
      sets_rec:"3 × 12 لكل جهة", rest:"60 ثانية",
      tip:"زاوية الدكة بتمد الباي أكتر — ركز على الإحساس في القمة",
      muscles:[
        {name:"باي الطويل",pct:70,color:"#f59e0b"},
        {name:"باي القصير",pct:25,color:"#fcd34d"},
        {name:"ساعد",pct:5,color:"#fde68a"},
      ]
    },
    {
      name:"باي على الكيبل بالمسطرة (Cable Biceps Curl Straight Bar)", tag:"ذراع",
      sets_rec:"3 × 15", rest:"60 ثانية",
      tip:"الكيبل بيديك توتر ثابت حتى لما الذراع مستقيم — أفضل من الحديد في الإطالة",
      muscles:[
        {name:"باي القصير",pct:55,color:"#fcd34d"},
        {name:"باي الطويل",pct:35,color:"#f59e0b"},
        {name:"ساعد",pct:10,color:"#fde68a"},
      ]
    },
    {
      name:"تراي بالحبل على الكيبل (Cable Triceps Rope Pushdown)", tag:"ذراع",
      sets_rec:"4 × 12-15", rest:"60 ثانية",
      tip:"في الأسفل افرد طرفي الحبل للجنبين — ده بيعزل التراي الجانبي أكتر",
      muscles:[
        {name:"تراي الجانبي",pct:60,color:"#a78bfa"},
        {name:"تراي الطويل",pct:25,color:"#c4b5fd"},
        {name:"تراي الداخلي",pct:15,color:"#ddd6fe"},
      ]
    },
    {
      name:"تراي مقلوب بالمسطرة على الكيبل (Reverse Grip Cable Triceps Pushdown)", tag:"ذراع",
      sets_rec:"3 × 12-15", rest:"60 ثانية",
      tip:"القبضة المقلوبة بتحمّل التراي الداخلي أكتر — هو الجزء اللي بيدي سماكة الذراع",
      muscles:[
        {name:"تراي الداخلي",pct:65,color:"#ddd6fe"},
        {name:"تراي الجانبي",pct:25,color:"#a78bfa"},
        {name:"ساعد",pct:10,color:"#fde68a"},
      ]
    },
    {
      name:"تراي فرنساوي (Dumbbell French Press)", tag:"ذراع",
      sets_rec:"3 × 12", rest:"75 ثانية",
      tip:"الكوعين ثابتين للداخل — لو انفتحوا للجنب معناه التراي الطويل مش بيشتغل صح",
      muscles:[
        {name:"تراي الطويل",pct:70,color:"#c4b5fd"},
        {name:"تراي الجانبي",pct:20,color:"#a78bfa"},
        {name:"تراي الداخلي",pct:10,color:"#ddd6fe"},
      ]
    },
  ],
  day6:[
    {
      name:"هاك اسكواد (Hack Squat Machine)", tag:"رجل",
      sets_rec:"4 × 10-12", rest:"90 ثانية",
      tip:"القدم في الأسفل بتركز على الكوادريسبس — فوق بتشغل الجلوتس أكتر",
      muscles:[
        {name:"كوادريسبس",pct:65,color:"#fb923c"},
        {name:"جلوتس",pct:20,color:"#f97316"},
        {name:"هامسترينج",pct:15,color:"#fdba74"},
      ]
    },
    {
      name:"طعن دامبلز (Dumbbell Lunge)", tag:"رجل",
      sets_rec:"3 × 12 لكل رجل", rest:"75 ثانية",
      tip:"الركبة الأمامية محدش تتعدى أصابع القدم — وضهرك مستقيم طول الوقت",
      muscles:[
        {name:"كوادريسبس",pct:50,color:"#fb923c"},
        {name:"جلوتس",pct:30,color:"#f97316"},
        {name:"هامسترينج",pct:20,color:"#fdba74"},
      ]
    },
    {
      name:"رفرفة امامية (Standing Front Leg Raise)", tag:"رجل",
      sets_rec:"3 × 15 لكل رجل", rest:"60 ثانية",
      tip:"ارفع الرجل ببطء وثبّتها ثانية في القمة — السرعة بتشيل التركيز من العضلة",
      muscles:[
        {name:"هيب فليكسور",pct:55,color:"#fb923c"},
        {name:"كوادريسبس",pct:30,color:"#fdba74"},
        {name:"بطن السفلي",pct:15,color:"#fde68a"},
      ]
    },
    {
      name:"خلفيات رجل على الجهاز (Leg Curl Machine)", tag:"رجل",
      sets_rec:"4 × 12-15", rest:"75 ثانية",
      tip:"في القمة احتفظ بالضغط ثانيتين — وارجع ببطء للإطالة الكاملة",
      muscles:[
        {name:"هامسترينج",pct:80,color:"#fdba74"},
        {name:"جلوتس السفلي",pct:15,color:"#f97316"},
        {name:"كالف",pct:5,color:"#fb923c"},
      ]
    },
    {
      name:"ثمانة (Hip Abductor Machine)", tag:"رجل",
      sets_rec:"3 × 15-20", rest:"60 ثانية",
      tip:"الحركة بطيئة للداخل مش مجرد ما ترخي — الإيكسنتريك مهم زي القوة",
      muscles:[
        {name:"جلوتس المتوسط",pct:65,color:"#f97316"},
        {name:"جلوتس الأصغر",pct:25,color:"#fb923c"},
        {name:"TFL",pct:10,color:"#fdba74"},
      ]
    },
  ],
};

let workoutSets={day1:{},day2:{},day4:{},day5:{},day6:{}};
let timers={day1:null,day2:null,day4:null,day5:null,day6:null};
let timerSecs={day1:0,day2:0,day4:0,day5:0,day6:0};
let timerOn={day1:false,day2:false,day4:false,day5:false,day6:false};

function initWorkout(){
  ["day1","day2","day4","day5","day6"].forEach(day=>{
    const c=document.getElementById("exercises-"+day);
    c.innerHTML="";
    WORKOUT_PLAN[day].forEach((ex,idx)=>{
      if(!workoutSets[day][idx]) workoutSets[day][idx]=[];
      c.appendChild(buildCard(day,idx,ex));
    });
  });
}

function buildCard(day,idx,ex){
  const div=document.createElement("div");
  div.className="exercise-card";
  div.id=`card-${day}-${idx}`;
  renderCard(div,day,idx,ex);
  return div;
}

function renderCard(div,day,idx,ex){
  const sets=workoutSets[day][idx];
  const vidLink=VIDEO_LINKS[day][idx]||"";
  const vidBtn=vidLink
    ?`<button class="video-btn" onclick="openVideo('${vidLink}','${ex.name}')">▶ فيديو</button>`
    :`<span class="video-btn no-link">▶ قريبًا</span>`;

  // Muscle bars
  const muscleHTML=(ex.muscles||[]).map(m=>`
    <div class="muscle-row">
      <span class="muscle-name">${m.name}</span>
      <div class="muscle-bar-wrap">
        <div class="muscle-bar-fill" style="width:${m.pct}%;background:${m.color};"></div>
      </div>
      <span class="muscle-pct">${m.pct}%</span>
    </div>`).join("");

  // Sets rows
  let rows=sets.map((s,si)=>`
    <tr class="set-row">
      <td><div class="set-num">${si+1}</div></td>
      <td><input class="set-input" type="number" placeholder="كجم" value="${s.weight||""}" oninput="updateSet('${day}',${idx},${si},'weight',this.value)"></td>
      <td><input class="set-input" type="number" placeholder="عدد" value="${s.reps||""}" oninput="updateSet('${day}',${idx},${si},'reps',this.value)"></td>
      <td><button class="del-set-btn" onclick="delSet('${day}',${idx},${si})">🗑</button></td>
    </tr>`).join("");

  div.innerHTML=`
    <div class="exercise-header">
      <div class="exercise-name">${ex.name}</div>
      <div class="ex-actions">
        <div class="exercise-tag">${ex.tag}</div>
        ${vidBtn}
      </div>
    </div>

    <div class="ex-meta-strip">
      ${ex.sets_rec?`<span class="ex-meta-chip">🔢 ${ex.sets_rec}</span>`:""}
      ${ex.rest?`<span class="ex-meta-chip">⏱ راحة ${ex.rest}</span>`:""}
    </div>

    ${muscleHTML?`<div class="muscles-section"><div class="muscles-title">🎯 العضلات المستهدفة</div>${muscleHTML}</div>`:""}

    ${ex.tip?`<div class="ex-tip">💡 ${ex.tip}</div>`:""}
    ${(()=>{const s=getWeightSuggestion(ex.name);return s?`<div class="ex-weight-suggestion">🎯 ابدأ بـ ${s}</div>`:""})()}

    <table class="sets-table">
      <thead><tr><th>SET</th><th>وزن كجم</th><th>عدات</th><th></th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <button class="add-set-btn" onclick="addSet('${day}',${idx})">+ إضافة مجموعة</button>`;
  // Apply locked state if workout not started
  if(!timerOn[day]) div.classList.add("locked");
  else div.classList.remove("locked");
}

function addSet(day,idx){
  workoutSets[day][idx].push({weight:"",reps:""});
  renderCard(document.getElementById(`card-${day}-${idx}`),day,idx,WORKOUT_PLAN[day][idx]);
}
function delSet(day,idx,si){
  workoutSets[day][idx].splice(si,1);
  renderCard(document.getElementById(`card-${day}-${idx}`),day,idx,WORKOUT_PLAN[day][idx]);
}
function updateSet(day,idx,si,field,val){workoutSets[day][idx][si][field]=val;}

// Timer
const DAY_LABELS={day1:"اليوم الأول",day2:"اليوم الثاني",day4:"اليوم الرابع",day5:"اليوم الخامس",day6:"اليوم السادس"};
function toggleWorkout(day){
  const btn=document.getElementById("start-"+day);
  const txt=document.getElementById("start-"+day+"-txt");
  if(!timerOn[day]){
    // Mark as started
    timerOn[day]=true;
    btn.classList.add("running");
    txt.textContent="⏹ إيقاف وحفظ "+(DAY_LABELS[day]||day);
    // Lock all exercise cards before entering focus
    document.querySelectorAll(`#day-${day} .exercise-card`).forEach(c=>c.classList.add("locked"));
    // Enter focus mode
    enterFocusMode(day);
  } else {
    finishFocusMode();
  }
}
function fmtTime(s){
  const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60;
  return [h,m,sec].map(x=>String(x).padStart(2,"0")).join(":");
}

// ===== LOG =====
function getLog(){try{return JSON.parse(localStorage.getItem("tefa_log")||"[]");}catch{return[];}}
function saveLog(log){localStorage.setItem("tefa_log",JSON.stringify(log));}

const DAY_NAMES={day1:"اليوم الأول · بنش+تراي",day2:"اليوم الثاني · ظهر+باي",day4:"اليوم الرابع · كتف",day5:"اليوم الخامس · ذراع",day6:"اليوم السادس · رجل"};
function saveWorkoutLog(day,duration){
  const log=getLog();
  const exercises=WORKOUT_PLAN[day].map((ex,idx)=>({
    name:ex.name,sets:workoutSets[day][idx].filter(s=>s.weight||s.reps)
  })).filter(e=>e.sets.length>0);
  log.unshift({
    id:Date.now(),
    date:new Date().toLocaleDateString("ar-EG",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),
    dateISO:new Date().toISOString().split("T")[0],
    day,dayName:DAY_NAMES[day]||day,duration,exercises,type:"workout"
  });
  saveLog(log);
}
function logRestDay(){
  const log=getLog();
  log.unshift({
    id:Date.now(),
    date:new Date().toLocaleDateString("ar-EG",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),
    dateISO:new Date().toISOString().split("T")[0],
    day:"rest",duration:"-",exercises:[],type:"rest"
  });
  saveLog(log);
  alert("✅ تم تسجيل يوم الراحة!");
}

function renderLog(){
  const log=getLog();
  const c=document.getElementById("log-container");
  if(!log.length){
    c.innerHTML=`<div class="log-empty"><div class="log-empty-icon">📋</div><div>مفيش سجلات لسه. ابدأ أول تمرين!</div></div>`;
    return;
  }
  c.innerHTML=log.map((entry,i)=>{
    const badge=entry.type==="rest"
      ?`<span class="log-entry-badge rest">😴 راحة</span>`
      :`<span class="log-entry-badge">${entry.dayName||entry.day} · ⏱ ${entry.duration}</span>`;
    const exHtml=entry.exercises.map(ex=>`
      <div class="log-ex-name">💪 ${ex.name}</div>
      ${ex.sets.map((s,si)=>`
        <div class="log-set-row">
          <div class="log-set-num">${si+1}</div>
          <div class="log-set-data">${s.weight?s.weight+" كجم":"—"} · ${s.reps?s.reps+" عدة":"—"}</div>
        </div>`).join("")}`).join("");
    return `
      <div class="log-entry">
        <div class="log-entry-header" onclick="toggleLogEntry(${i})">
          <div>
            <div class="log-entry-date">${entry.date}</div>
            <div class="log-entry-meta">${entry.type==="rest"?"يوم راحة":entry.exercises.length+" تمارين"}</div>
          </div>
          ${badge}
        </div>
        <div class="log-entry-body" id="log-body-${i}">
          ${entry.type==="rest"?"<div style='color:var(--gray);text-align:center;padding:16px'>يوم راحة 😴</div>":exHtml}
          <button class="del-log-btn" onclick="deleteLog(${entry.id})">🗑️ حذف</button>
        </div>
      </div>`;
  }).join("");
}
function toggleLogEntry(i){document.getElementById("log-body-"+i).classList.toggle("open");}
function deleteLog(id){
  if(!confirm("تأكيد الحذف؟")) return;
  saveLog(getLog().filter(e=>e.id!==id));
  renderLog(); renderStreak();
}

// ===== STREAK =====
function renderStreak(){
  const log=getLog();
  const today=new Date().toISOString().split("T")[0];
  
  // Build date map
  const dateMap={};
  log.forEach(e=>{if(e.dateISO) dateMap[e.dateISO]=e.type;});
  
  // Calc streak (consecutive days ending today or yesterday)
  let streak=0;
  let best=parseInt(localStorage.getItem("tefa_best_streak")||"0");
  let d=new Date();
  while(true){
    const key=d.toISOString().split("T")[0];
    if(dateMap[key]){streak++;d.setDate(d.getDate()-1);}
    else break;
  }
  if(streak>best){best=streak;localStorage.setItem("tefa_best_streak",best);}
  
  const totalW=log.filter(e=>e.type==="workout").length;
  const totalR=log.filter(e=>e.type==="rest").length;
  
  document.getElementById("streak-num").textContent=streak;
  document.getElementById("total-workouts").textContent=totalW;
  document.getElementById("total-rest").textContent=totalR;
  document.getElementById("best-streak").textContent=best;
  
  // Fire emoji based on streak
  const fires=streak>=30?"🏆":streak>=14?"🔥🔥🔥":streak>=7?"🔥🔥":streak>=1?"🔥":"💤";
  document.getElementById("streak-fire").textContent=fires;
  
  // Motivational message
  const msgs=[
    [0,"ابدأ أول تمرين وسجّله!"],
    [1,"أهلاً، الأول وصل! 💪"],
    [3,"3 أيام متتالية! خد بالك من نفسك 🔥"],
    [7,"أسبوع كامل! أنت جاد يا باشا 👑"],
    [14,"أسبوعين بلا توقف! الجيم بقى عادة 💪"],
    [30,"شهر كامل! الأسطورة وصلت 🏆"],
  ];
  let msg=msgs[0][1];
  for(const[days,m] of msgs){if(streak>=days) msg=m;}
  document.getElementById("streak-msg").textContent=msg;
  
  // Weekly grid
  const dayNames=["أح","اث","ث","أر","خ","ج","س"];
  const weekEl=document.getElementById("week-days");
  weekEl.innerHTML="";
  const startOfWeek=new Date();
  startOfWeek.setDate(startOfWeek.getDate()-startOfWeek.getDay());
  for(let i=0;i<7;i++){
    const d2=new Date(startOfWeek);
    d2.setDate(d2.getDate()+i);
    const key=d2.toISOString().split("T")[0];
    const type=dateMap[key];
    const isToday=key===today;
    const div=document.createElement("div");
    div.className="week-day"+(type==="workout"?" workout-day":type==="rest"?" rest-day":"")+(isToday?" today":"");
    div.innerHTML=`<div class="wd-label">${dayNames[i]}</div><div class="wd-icon">${type==="workout"?"💪":type==="rest"?"😴":"·"}</div>`;
    weekEl.appendChild(div);
  }
  
  // 30-day grid
  const monthEl=document.getElementById("month-grid");
  monthEl.innerHTML="";
  for(let i=29;i>=0;i--){
    const d3=new Date();
    d3.setDate(d3.getDate()-i);
    const key=d3.toISOString().split("T")[0];
    const type=dateMap[key];
    const isToday=key===today;
    const div=document.createElement("div");
    div.className="day-dot"+(type==="workout"?" has-workout":type==="rest"?" has-rest":"")+(isToday?" is-today":"");
    div.title=key+(type?" · "+(type==="workout"?"تمرين":"راحة"):"");
    div.innerHTML=type==="workout"?"💪":type==="rest"?"😴":"";
    monthEl.appendChild(div);
  }
}

// ===== CREATINE =====
const CREATINE_PASS = "tefa_cr_2024";
function unlockCreatine(){
  const pw=document.getElementById("creatine-pw").value;
  if(pw===CREATINE_PASS){
    document.getElementById("creatine-lock").style.display="none";
    document.getElementById("creatine-content").style.display="block";
  } else {
    const err=document.getElementById("creatine-err");
    err.style.display="block";
    err.style.animation="none"; void err.offsetWidth; err.style.animation="shake 0.4s ease";
    document.getElementById("creatine-pw").value="";
  }
}
document.addEventListener("keydown",function(e){
  if(document.getElementById("page-creatine").classList.contains("active")){
    const input=document.getElementById("creatine-pw");
    if(input && e.key==="Enter") unlockCreatine();
  }
});
function calcCreatine(){
  const weight=+document.getElementById("cr-weight").value;
  const goal=document.getElementById("cr-goal").value;
  const level=document.getElementById("cr-level").value;
  if(!weight){alert("ادخل وزنك!");return;}
  let dose=0.03*weight; // 0.03g per kg baseline
  if(goal==="bulk") dose*=1.1;
  if(goal==="performance") dose*=1.05;
  if(level==="advanced") dose*=1.1;
  dose=Math.min(Math.max(Math.round(dose*10)/10,3),5);
  document.getElementById("cr-dose").textContent=dose+"g";
  const timing=goal==="performance"?"قبل التمرين بـ 30 دقيقة":"بعد التمرين مباشرة";
  document.getElementById("cr-timing").textContent=timing;
  document.getElementById("cr-result").style.display="block";
}
// ===== CALORIES =====
function calcCalories(){
  const gender=document.getElementById("c-gender").value;
  const age=+document.getElementById("c-age").value;
  const weight=+document.getElementById("c-weight").value;
  const height=+document.getElementById("c-height").value;
  const activity=+document.getElementById("c-activity").value;
  if(!age||!weight||!height){alert("اكمل البيانات كلها!");return;}
  let bmr=gender==="male"
    ?88.36+(13.4*weight)+(4.8*height)-(5.7*age)
    :447.6+(9.2*weight)+(3.1*height)-(4.3*age);
  const tdee=Math.round(bmr*activity);
  const protein=Math.round(weight*2.2);
  const fat=Math.round((tdee*0.25)/9);
  const carbs=Math.round((tdee-(protein*4)-(fat*9))/4);
  document.getElementById("res-tdee").textContent=tdee.toLocaleString();
  document.getElementById("res-protein").textContent=protein+"g";
  document.getElementById("res-carbs").textContent=carbs+"g";
  document.getElementById("res-fat").textContent=fat+"g";
  document.getElementById("res-bulk").textContent=(tdee+300).toLocaleString();
  document.getElementById("res-maintain").textContent=tdee.toLocaleString();
  document.getElementById("res-cut").textContent=(tdee-400).toLocaleString();
  document.getElementById("cal-result").classList.add("show");
}



// ===== IMAGE INJECTION =====
const LOGO_SRC="assets/images/logo.png";
const CAP_SRC="assets/images/captain.png";
function injectImages(){
  document.querySelectorAll('img.login-logo,img.nav-logo').forEach(el=>el.src=LOGO_SRC);
  document.querySelectorAll('img.hero-captain').forEach(el=>el.src=CAP_SRC);
}

// ===== SUPPLEMENTS STORE =====
const SUPPLEMENTS=[
  {id:1,icon:"🥛",name:"Whey Protein",brand:"ON Gold Standard",price:1200,unit:"كيلو",benefits:"يبني العضل · يساعد التعافي · 24g بروتين لكل جرعة"},
  {id:2,icon:"🧪",name:"Creatine Monohydrate",brand:"Optimum Nutrition",price:450,unit:"300g",benefits:"يزيد القوة والطاقة · يسرع نمو العضل · الأكثر دراسة علمياً"},
  {id:3,icon:"⚡",name:"Pre-Workout C4",brand:"Cellucor",price:750,unit:"60 جرعة",benefits:"طاقة انفجارية · تركيز عالي · مضخة عضلية"},
  {id:4,icon:"💊",name:"BCAA 2:1:1",brand:"Scitec Nutrition",price:380,unit:"300g",benefits:"يقلل الهدم العضلي · يساعد التعافي · بدون سعرات زيادة"},
  {id:5,icon:"🔥",name:"L-Carnitine",brand:"MyProtein",price:320,unit:"90 كبسولة",benefits:"يحرق الدهون · يحول الدهون لطاقة · يحسن التحمل"},
  {id:6,icon:"🦴",name:"Collagen + Vitamin C",brand:"Healthy Care",price:280,unit:"100 كبسولة",benefits:"يقوي المفاصل · يقلل آلام الأربطة · ضروري للرياضيين"},
  {id:7,icon:"😴",name:"ZMA",brand:"Universal Nutrition",price:350,unit:"90 كبسولة",benefits:"يحسن النوم · يرفع التستوستيرون · يساعد التعافي الليلي"},
  {id:8,icon:"🌿",name:"Omega-3 Fish Oil",brand:"Now Foods",price:240,unit:"100 كبسولة",benefits:"يقلل الالتهابات · يحسن صحة القلب · مهم للمفاصل"},
];
let cart={};
function renderSupplements(){
  const g=document.getElementById("supp-grid");
  if(!g) return;
  g.innerHTML=SUPPLEMENTS.map(s=>`<div class="supp-card" id="scard-${s.id}"><div class="supp-card-top"><div class="supp-icon">${s.icon}</div><div class="supp-name">${s.name}</div><div class="supp-brand">${s.brand}</div><div class="supp-benefits">${s.benefits}</div></div><div class="supp-card-bottom"><div><div class="supp-price">${s.price.toLocaleString()} ج</div><div class="supp-price-sub">${s.unit}</div></div><div class="supp-qty-wrap"><button class="qty-btn" onclick="changeQty(${s.id},-1)">−</button><div class="qty-num" id="qty-${s.id}">0</div><button class="qty-btn add-btn" onclick="changeQty(${s.id},1)">+</button></div></div></div>`).join("");
}
function changeQty(id,delta){
  if(!cart[id]) cart[id]=0;
  cart[id]=Math.max(0,cart[id]+delta);
  const el=document.getElementById("qty-"+id); if(el) el.textContent=cart[id];
  updateCartBar();
}
function updateCartBar(){
  const items=Object.entries(cart).filter(([_,q])=>q>0);
  const count=items.reduce((a,[_,q])=>a+q,0);
  const total=items.reduce((a,[id,q])=>a+(SUPPLEMENTS.find(s=>s.id==id).price*q),0);
  const bar=document.getElementById("cart-bar");
  if(!bar) return;
  if(count>0){bar.style.display="flex";document.getElementById("cart-count").textContent=count;document.getElementById("cart-total").textContent=total.toLocaleString();}
  else bar.style.display="none";
}
function showCart(){
  const items=Object.entries(cart).filter(([_,q])=>q>0);
  const total=items.reduce((a,[id,q])=>a+(SUPPLEMENTS.find(s=>s.id==id).price*q),0);
  const body=document.getElementById("cart-body");
  body.innerHTML=items.length===0?`<div style='text-align:center;color:var(--gray);padding:30px'>السلة فاضية</div>`:items.map(([id,q])=>{const s=SUPPLEMENTS.find(x=>x.id==id);return `<div class="cart-item"><div><div class="cart-item-name">${s.icon} ${s.name}</div><div class="cart-item-qty">${s.brand} × ${q}</div></div><div class="cart-item-price">${(s.price*q).toLocaleString()} ج</div></div>`;}).join("");
  document.getElementById("cart-grand-total").textContent=total.toLocaleString()+" جنيه";
  document.getElementById("cart-modal-bg").classList.add("open");
  document.getElementById("cart-modal").classList.add("open");
}
function hideCart(){document.getElementById("cart-modal-bg").classList.remove("open");document.getElementById("cart-modal").classList.remove("open");}
function clearCart(){
  if(!confirm("هتمسح الطلب كله؟")) return;
  cart={};
  SUPPLEMENTS.forEach(s=>{const el=document.getElementById("qty-"+s.id);if(el)el.textContent="0";});
  updateCartBar();hideCart();
}
function sendOrderWA(){
  const items=Object.entries(cart).filter(([_,q])=>q>0);
  if(items.length===0){alert("اختار منتجات الأول!");return;}
  const total=items.reduce((a,[id,q])=>a+(SUPPLEMENTS.find(s=>s.id==id).price*q),0);
  const note=document.getElementById("cart-note").value.trim();
  let msg="🛒 *طلب مكملات من TEFA GYM*\n\n━━━━━━━━━━━━━━━━━━\n";
  items.forEach(([id,q])=>{const s=SUPPLEMENTS.find(x=>x.id==id);msg+=`${s.icon} *${s.name}*\n   ${s.brand} × ${q}\n   السعر: ${(s.price*q).toLocaleString()} جنيه\n\n`;});
  msg+=`━━━━━━━━━━━━━━━━━━\n💰 *الإجمالي: ${total.toLocaleString()} جنيه*`;
  if(note) msg+=`\n\n📝 *ملاحظات:* ${note}`;
  msg+="\n\n_طلب تم إرساله من تطبيق TEFA GYM_";
  const wa=localStorage.getItem("tefa_wa")||"201228164202";
  window.open("https://wa.me/"+wa.replace(/\D/g,"")+"?text="+encodeURIComponent(msg),"_blank");
}
document.addEventListener("DOMContentLoaded",()=>{injectImages();renderSupplements();});

// ===== TRANSFORMS CAROUSEL =====
(function(){
  const track = document.getElementById("transforms-track");
  const dots = document.querySelectorAll(".tr-dot");
  if(!track) return;
  let currentCard = 0;
  const totalCards = track.querySelectorAll(".tr-card").length;

  function updateDots(idx){
    dots.forEach((d,i)=>d.classList.toggle("active",i===idx));
    currentCard = idx;
  }

  track.addEventListener("scroll",()=>{
    const cardWidth = track.querySelector(".tr-card").offsetWidth + 20;
    const idx = Math.round(track.scrollLeft / cardWidth);
    updateDots(Math.min(idx, totalCards-1));
  },{ passive:true });

  window.goToCard = function(idx){
    const cardWidth = track.querySelector(".tr-card").offsetWidth + 20;
    track.scrollTo({left: idx * cardWidth, behavior:"smooth"});
    updateDots(idx);
  };

  window.scrollTrack = function(dir){
    const next = Math.min(Math.max(currentCard + dir, 0), totalCards - 1);
    goToCard(next);
  };

  // Auto-scroll every 4s
  let autoTimer = setInterval(()=>{
    const next = (currentCard + 1) % totalCards;
    goToCard(next);
  }, 4000);

  track.addEventListener("touchstart",()=>clearInterval(autoTimer),{passive:true});
})();


// ==================== ONBOARDING GUIDE ====================
const GUIDE_KEY = "tefa_guide_done";
const TOTAL_STEPS = 7;
let currentGuideStep = 1;

function initGuide(){
  if(localStorage.getItem(GUIDE_KEY)) return; // Already seen
  showGuide();
}

function showGuide(){
  const overlay = document.getElementById("guide-overlay");
  overlay.style.display = "flex";
  currentGuideStep = 1;
  renderGuideStep();
  buildGuideDots();
}

function buildGuideDots(){
  const wrap = document.getElementById("guide-dots");
  wrap.innerHTML = "";
  for(let i=1;i<=TOTAL_STEPS;i++){
    const d = document.createElement("button");
    d.className = "guide-dot" + (i===1?" active":"");
    d.onclick = ()=>goToGuideStep(i);
    wrap.appendChild(d);
  }
}

function renderGuideStep(){
  // Hide all steps
  document.querySelectorAll(".guide-step").forEach(s=>s.classList.remove("active"));
  // Show current
  const step = document.querySelector(`.guide-step[data-step="${currentGuideStep}"]`);
  if(step) step.classList.add("active");
  // Progress bar
  const pct = ((currentGuideStep-1)/(TOTAL_STEPS-1))*100;
  document.getElementById("guide-progress").style.width = pct+"%";
  // Counter
  document.getElementById("guide-step-num").textContent = currentGuideStep;
  document.getElementById("guide-step-total").textContent = TOTAL_STEPS;
  // Next button text
  const btn = document.getElementById("guide-next-btn");
  btn.textContent = currentGuideStep===TOTAL_STEPS ? "يلا نبدأ 🚀" : "التالي ›";
  // Dots
  document.querySelectorAll(".guide-dot").forEach((d,i)=>{
    d.classList.toggle("active", i+1===currentGuideStep);
  });
}

function nextGuideStep(){
  if(currentGuideStep < TOTAL_STEPS){
    currentGuideStep++;
    renderGuideStep();
  } else {
    closeGuide();
  }
}

function goToGuideStep(n){
  currentGuideStep = n;
  renderGuideStep();
}

function skipGuide(){
  closeGuide();
}

function closeGuide(){
  document.getElementById("guide-overlay").style.display = "none";
  localStorage.setItem(GUIDE_KEY, "1");
}

// Keyboard support
document.addEventListener("keydown", e=>{
  const overlay = document.getElementById("guide-overlay");
  if(overlay.style.display==="none") return;
  if(e.key==="ArrowRight"||e.key===" ") nextGuideStep();
  if(e.key==="Escape") skipGuide();
});


// ==================== FOCUS MODE ====================
let fmDay = null;
let fmCurrentEx = 0;
let fmTimer = null;
let fmSecs = 0;
let fmActive = false;

function enterFocusMode(day){
  fmDay = day;
  fmCurrentEx = 0;
  fmActive = true;
  fmSecs = timerSecs[day] || 0;

  // Set day label
  document.getElementById("fm-day-label").textContent = DAY_LABELS[day] || day;
  document.getElementById("fm-ex-total").textContent = WORKOUT_PLAN[day].length;

  // Build nav pills
  const track = document.getElementById("fm-nav-track");
  track.innerHTML = WORKOUT_PLAN[day].map((ex,i)=>{
    const shortName = ex.name.split("(")[0].trim();
    return `<div class="fm-nav-pill ${i===0?"active":""}" id="fm-pill-${i}" onclick="fmGoTo(${i})">${shortName}</div>`;
  }).join("");

  // Show focus mode
  document.getElementById("focus-mode").style.display = "flex";
  document.body.style.overflow = "hidden";

  // Start timer
  fmTimer = setInterval(()=>{
    fmSecs++;
    timerSecs[day] = fmSecs;
    if(fmSecs % 5 === 0) saveActiveWorkout(); // save every 5 seconds
    document.getElementById("fm-timer").textContent = fmtTime(fmSecs);
    document.getElementById("timer-"+day).textContent = fmtTime(fmSecs);
  },1000);

  // Sync with existing timer if already running
  timerOn[day] = true;
  if(timers[day]) clearInterval(timers[day]);
  timers[day] = fmTimer;

  fmRenderEx();
  fmUpdateNav();
}

function fmRenderEx(){
  const day = fmDay;
  const idx = fmCurrentEx;
  const ex = WORKOUT_PLAN[day][idx];
  const sets = workoutSets[day][idx] || [];
  const total = WORKOUT_PLAN[day].length;

  // Update counter
  document.getElementById("fm-ex-num").textContent = idx+1;

  // Video button
  const vidLink = VIDEO_LINKS[day][idx] || "";
  const vidBtn = vidLink
    ? `<button class="fm-video-btn" onclick="openVideo('${vidLink}','${ex.name}')">▶ شوف الفيديو</button>`
    : "";

  // Muscles
  const musclesHTML = (ex.muscles||[]).map(m=>`
    <div class="muscle-row">
      <span class="muscle-name">${m.name}</span>
      <div class="muscle-bar-wrap"><div class="muscle-bar-fill" style="width:${m.pct}%;background:${m.color};"></div></div>
      <span class="muscle-pct">${m.pct}%</span>
    </div>`).join("");

  // Sets rows
  const rows = sets.map((s,si)=>`
    <tr>
      <td><div class="fm-set-num">${si+1}</div></td>
      <td><input class="fm-set-input" type="number" placeholder="كجم" value="${s.weight||""}"
        oninput="fmUpdateSet(${idx},${si},'weight',this.value)"></td>
      <td><input class="fm-set-input" type="number" placeholder="عدد" value="${s.reps||""}"
        oninput="fmUpdateSet(${idx},${si},'reps',this.value)"></td>
      <td><button class="fm-del-btn" onclick="fmDelSet(${idx},${si})">🗑</button></td>
    </tr>`).join("");

  document.getElementById("fm-ex-card").innerHTML = `
    <div class="fm-ex-name">${ex.name}</div>
    <div class="fm-ex-tag">${ex.tag}</div>

    <div class="fm-meta-strip">
      ${ex.sets_rec?`<span class="fm-meta-chip">🔢 ${ex.sets_rec}</span>`:""}
      ${ex.rest?`<span class="fm-meta-chip">⏱ راحة ${ex.rest}</span>`:""}
    </div>

    ${vidBtn}

    ${musclesHTML?`<div class="fm-muscles"><div class="fm-muscles-title">🎯 العضلات المستهدفة</div>${musclesHTML}</div>`:""}

    ${ex.tip?`<div class="fm-tip">💡 ${ex.tip}</div>`:""}
    ${(()=>{const s=getWeightSuggestion(ex.name);return s?`<div class="fm-weight-suggestion">🎯 ابدأ بـ ${s}</div>`:""})()}

    <table class="fm-sets-table">
      <thead><tr><th>SET</th><th>وزن كجم</th><th>عدات</th><th></th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <button class="fm-add-set-btn" onclick="fmAddSet(${idx})">+ إضافة مجموعة</button>
  `;

  // Show/hide finish button
  const isLast = idx === total-1;
  document.getElementById("fm-finish-wrap").style.display = isLast ? "block" : "none";

  // Update nav buttons
  document.getElementById("fm-prev-btn").disabled = idx===0;
  document.getElementById("fm-next-btn").style.display = isLast ? "none" : "";

  // Scroll card to top
  document.querySelector(".fm-body").scrollTop = 0;
}

function fmUpdateNav(){
  document.querySelectorAll(".fm-nav-pill").forEach((p,i)=>{
    p.classList.toggle("active", i===fmCurrentEx);
    const sets = workoutSets[fmDay][i]||[];
    const hasSets = sets.some(s=>s.weight||s.reps);
    if(hasSets && i!==fmCurrentEx) p.classList.add("done");
    else if(i!==fmCurrentEx) p.classList.remove("done");
  });
  // Scroll active pill into view
  const pill = document.getElementById("fm-pill-"+fmCurrentEx);
  if(pill) pill.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"});
}

function fmGoTo(idx){
  fmCurrentEx = idx;
  fmRenderEx();
  fmUpdateNav();
  saveActiveWorkout();
}

function fmNavigate(dir){
  const total = WORKOUT_PLAN[fmDay].length;
  const next = fmCurrentEx + dir;
  if(next >= 0 && next < total){
    fmCurrentEx = next;
    fmRenderEx();
    fmUpdateNav();
  }
}

function fmAddSet(idx){
  if(!workoutSets[fmDay][idx]) workoutSets[fmDay][idx]=[];
  workoutSets[fmDay][idx].push({weight:"",reps:""});
  fmRenderEx();
  fmUpdateNav();
  saveActiveWorkout();
}

function fmDelSet(idx,si){
  workoutSets[fmDay][idx].splice(si,1);
  fmRenderEx();
  saveActiveWorkout();
}

function fmUpdateSet(idx,si,field,val){
  if(!workoutSets[fmDay][idx][si]) workoutSets[fmDay][idx][si]={};
  workoutSets[fmDay][idx][si][field] = val;
  fmUpdateNav();
  saveActiveWorkout();
}



function finishFocusMode(){
  clearInterval(fmTimer);
  clearActiveWorkout();
  fmActive = false;
  const dur = fmtTime(fmSecs);
  document.getElementById("focus-mode").style.display = "none";
  document.body.style.overflow = "";
  // Save log
  saveWorkoutLog(fmDay, dur);
  // Reset
  clearInterval(timers[fmDay]);
  timers[fmDay] = null;
  timerOn[fmDay] = false;
  timerSecs[fmDay] = 0;
  workoutSets[fmDay] = {};
  WORKOUT_PLAN[fmDay].forEach((_,i)=>workoutSets[fmDay][i]=[]);
  initWorkout();
  document.getElementById("timer-"+fmDay).textContent = "00:00:00";
  const btn = document.getElementById("start-"+fmDay);
  const txt = document.getElementById("start-"+fmDay+"-txt");
  if(btn) btn.classList.remove("running");
  if(txt) txt.textContent = "⚡ ابدأ تمرين "+(DAY_LABELS[fmDay]||fmDay);
  renderStreak();
  alert("✅ تم حفظ التمرين في السجل!");
}


// ==================== WORKOUT RESUME SYSTEM ====================
const WS_KEY = "tefa_active_workout";

function saveActiveWorkout(){
  if(!fmDay) return;
  localStorage.setItem(WS_KEY, JSON.stringify({
    day: fmDay,
    secs: fmSecs,
    sets: workoutSets[fmDay],
    exIdx: fmCurrentEx,
    ts: Date.now()
  }));
}

function clearActiveWorkout(){
  localStorage.removeItem(WS_KEY);
}

function checkResumeWorkout(){
  const raw = localStorage.getItem(WS_KEY);
  if(!raw) return;
  let data;
  try{ data = JSON.parse(raw); } catch(e){ clearActiveWorkout(); return; }

  // Ignore if older than 24 hours
  if(Date.now() - data.ts > 86400000){ clearActiveWorkout(); return; }

  // Show resume banner
  const banner = document.getElementById("resume-banner");
  const dayName = DAY_LABELS[data.day] || data.day;
  const timeStr = fmtTime(data.secs);

  document.getElementById("resume-day-name").textContent = dayName;
  document.getElementById("resume-time").textContent = "⏱ " + timeStr;
  banner.style.display = "flex";

  // Store data for use on resume
  banner.dataset.day = data.day;
  banner.dataset.secs = data.secs;
  banner.dataset.exIdx = data.exIdx || 0;
  banner.dataset.sets = JSON.stringify(data.sets);
}

function resumeWorkout(){
  const banner = document.getElementById("resume-banner");
  const day = banner.dataset.day;
  const secs = parseInt(banner.dataset.secs) || 0;
  const exIdx = parseInt(banner.dataset.exIdx) || 0;
  let sets;
  try{ sets = JSON.parse(banner.dataset.sets); } catch(e){ sets = {}; }

  // Restore sets
  workoutSets[day] = {};
  WORKOUT_PLAN[day].forEach((_,i)=>{
    workoutSets[day][i] = sets[i] || [];
  });

  // Restore timer state
  timerSecs[day] = secs;
  timerOn[day] = true;

  banner.style.display = "none";

  // Enter focus mode at saved exercise
  fmDay = day;
  fmCurrentEx = exIdx;
  fmActive = true;
  fmSecs = secs;

  document.getElementById("fm-day-label").textContent = DAY_LABELS[day] || day;
  document.getElementById("fm-ex-total").textContent = WORKOUT_PLAN[day].length;

  // Build nav pills
  const track = document.getElementById("fm-nav-track");
  track.innerHTML = WORKOUT_PLAN[day].map((ex,i)=>{
    const shortName = ex.name.split("(")[0].trim();
    return `<div class="fm-nav-pill ${i===exIdx?"active":""}" id="fm-pill-${i}" onclick="fmGoTo(${i})">${shortName}</div>`;
  }).join("");

  document.getElementById("focus-mode").style.display = "flex";
  document.body.style.overflow = "hidden";

  // Resume timer
  fmTimer = setInterval(()=>{
    fmSecs++;
    timerSecs[day] = fmSecs;
    saveActiveWorkout();
    document.getElementById("fm-timer").textContent = fmtTime(fmSecs);
    document.getElementById("timer-"+day).textContent = fmtTime(fmSecs);
  },1000);
  timers[day] = fmTimer;

  fmRenderEx();
  fmUpdateNav();
}

function dismissResume(){
  clearActiveWorkout();
  document.getElementById("resume-banner").style.display = "none";
}


// ==================== PWA ====================
// Register service worker
if("serviceWorker" in navigator){
  window.addEventListener("load", ()=>{
    navigator.serviceWorker.register("service-worker.js")
      .then(reg => console.log("SW registered:", reg.scope))
      .catch(err => console.log("SW failed:", err));
  });
}

// Install prompt
let deferredPrompt = null;
window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  deferredPrompt = e;
  // Show install banner after login
  if(document.getElementById("app").style.display !== "none"){
    showInstallBanner();
  }
});

window.addEventListener("appinstalled", ()=>{
  hideInstallBanner();
  deferredPrompt = null;
});

function showInstallBanner(){
  const b = document.getElementById("install-banner");
  if(b && deferredPrompt) b.style.display = "flex";
}

function hideInstallBanner(){
  const b = document.getElementById("install-banner");
  if(b) b.style.display = "none";
  localStorage.setItem("tefa_pwa_dismissed","1");
}

async function installPWA(){
  if(!deferredPrompt) return;
  deferredPrompt.prompt();
  const {outcome} = await deferredPrompt.userChoice;
  if(outcome === "accepted") hideInstallBanner();
  deferredPrompt = null;
}

function dismissInstall(){
  hideInstallBanner();
}


// ===== DARK / LIGHT MODE =====
const THEME_KEY = "tefa_theme";

function initTheme(){
  const saved = localStorage.getItem(THEME_KEY);
  if(saved === "light"){
    document.body.classList.add("light-mode");
    document.getElementById("theme-icon").textContent = "🌙";
  }
}

function toggleTheme(){
  const btn = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");
  const isLight = document.body.classList.contains("light-mode");

  // Ripple effect from button position
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement("div");
  ripple.className = "theme-ripple";
  const size = Math.max(window.innerWidth, window.innerHeight) * 2;
  ripple.style.cssText = `
    width:${size}px;height:${size}px;
    left:${rect.left + rect.width/2 - size/2}px;
    top:${rect.top + rect.height/2 - size/2}px;
    background:${isLight ? "#0a0a0a" : "#f5f5f0"};
  `;
  document.body.appendChild(ripple);
  setTimeout(()=>ripple.remove(), 700);

  // Toggle with icon spin
  icon.style.transform = "rotate(360deg) scale(0.5)";
  setTimeout(()=>{
    document.body.classList.toggle("light-mode");
    const nowLight = document.body.classList.contains("light-mode");
    icon.textContent = nowLight ? "🌙" : "☀️";
    localStorage.setItem(THEME_KEY, nowLight ? "light" : "dark");
    icon.style.transform = "";
  }, 150);
}


// ====== WEIGHT SUGGESTION SYSTEM ======
const WEIGHT_KEY = "tefa_user_weight";
const WEIGHT_PCT = {
  "بار مستوي":35,"دفع بنش عالي":30,"تفاتيح عالي دامبل":20,
  "دفع بنش مستوي":30,"فراشة":15,"تراي بالمسطرة":15,"اوفر دامبلز":18,
  "منشار فردي":25,"سحب عالي على الجهاز":35,"ظرافة":20,
  "جهاز دوريان واسع":30,"سحب أرضي ضيق":25,"قطنية":0,
  "باي على الكيبل":12,"باي تبادل دامبلز":10,
  "امامي بار واقف":15,"رفرفة امامية دامبلز":8,
  "تجاميع على جهاز الكتف":20,"رفرفة جانبية دامبلز":8,
  "خلفيات على جهاز الفراشة":12,"ترابيس":25,
  "باي بالبار الحر":18,"ارتكاز بالدامبلز":10,
  "باي على الكيبل بالمسطرة":12,"تراي بالحبل على الكيبل":15,
  "تراي مقلوب":12,"تراي فرنساوي":12,
  "هاك اسكواد":40,"طعن دامبلز":15,
  "رفرفة امامية":0,"خلفيات رجل على الجهاز":20,"ثمانة":25,
};

function getUserWeight(){ return parseInt(localStorage.getItem(WEIGHT_KEY))||0; }

function getWeightSuggestion(exName){
  const bw = getUserWeight();
  if(!bw) return null;
  // Match by first word(s) of exercise name
  for(const [key, pct] of Object.entries(WEIGHT_PCT)){
    if(exName.includes(key)){
      if(pct === 0) return "وزن الجسم";
      const min = Math.round(bw * pct / 100 / 2.5) * 2.5;
      const max = Math.round(min * 1.3 / 2.5) * 2.5;
      return `${min}-${max} كجم`;
    }
  }
  return null;
}

function checkWeightSetup(){
  if(!localStorage.getItem(WEIGHT_KEY)){
    setTimeout(()=>{
      document.getElementById("weight-popup").style.display = "flex";
    }, 800);
  }
}

function saveUserWeight(){
  const val = parseInt(document.getElementById("wp-input").value);
  if(!val || val < 30 || val > 250){
    document.getElementById("wp-input").style.borderColor = "rgba(231,76,60,0.6)";
    return;
  }
  localStorage.setItem(WEIGHT_KEY, val);
  document.getElementById("weight-popup").style.display = "none";
  initWorkout(); // Re-render with suggestions
}

function skipWeightSetup(){
  document.getElementById("weight-popup").style.display = "none";
  localStorage.setItem(WEIGHT_KEY, "0");
}


// ====== VERSION 2.0 CHANGELOG ======
const CL_KEY = "tefa_v2_seen";

function checkChangelog(){
  if(!localStorage.getItem(CL_KEY)){
    setTimeout(()=>{
      document.getElementById("changelog-overlay").style.display = "flex";
    }, 400);
  }
}

function closeChangelog(){
  document.getElementById("changelog-overlay").style.display = "none";
  localStorage.setItem(CL_KEY, "1");
}


// Exit focus mode back to main - timer stops
function exitToMain(){
  // Stop timer
  clearInterval(fmTimer);
  timerOn[fmDay] = false;
  clearInterval(timers[fmDay]);
  timers[fmDay] = null;

  // Update main page timer display
  document.getElementById("timer-"+fmDay).textContent = fmtTime(fmSecs);

  // Update start button text
  const btn = document.getElementById("start-"+fmDay);
  const txt = document.getElementById("start-"+fmDay+"-txt");
  if(btn) btn.classList.remove("running");
  if(txt) txt.textContent = "⚡ ابدأ تمرين "+(DAY_LABELS[fmDay]||fmDay);

  // Save current state
  saveActiveWorkout();

  // Hide focus mode
  document.getElementById("focus-mode").style.display = "none";
  document.body.style.overflow = "";
  fmActive = false;

  // Unlock exercise cards
  document.querySelectorAll(".exercise-card").forEach(c=>c.classList.remove("locked"));
  timerOn[fmDay] = false;

  // Re-render workout to sync sets
  initWorkout();
}


// ====== VIDEO POPUP (YouTube window) ======
function openVideo(url, title){
  if(!url) return;
  // Open in small popup window - stays above the app
  const w = Math.min(400, window.screen.width - 20);
  const h = Math.min(720, window.screen.height - 40);
  const left = (window.screen.width - w) / 2;
  const top = (window.screen.height - h) / 2;
  window.open(
    url,
    "tefa_video",
    `width=${w},height=${h},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
  );
}
