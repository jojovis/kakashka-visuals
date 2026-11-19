(() => {
const URL='https://uaenplgzrrymroozeiwt.supabase.co';
const KEY='sb_publishable_IkFRP8vNV-jaIWPlZt8YUA_lLu1qXes';
const db=window.supabase.createClient(URL,KEY);
const esc=s=>String(s||'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('\"','&quot;').replaceAll(String.fromCharCode(39),'&#39;');
const panel=document.createElement('div');panel.id='sv-account';
panel.innerHTML='<div class="sv-shade"></div><section class="sv-modal"><button class="sv-close">×</button><div class="eyebrow">SUPPORTSVISUALS / ACCOUNT</div><h2>ЛИЧНЫЙ <span>КАБИНЕТ</span></h2><div id="sv-content">Загрузка...</div></section>';document.body.append(panel);
const css=document.createElement('style');css.textContent=`
#sv-account{display:none;position:fixed;inset:0;z-index:1000;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(8px)}
#sv-account.open{display:flex}
.sv-shade{position:absolute;inset:0;background:#05030bdf}
.sv-modal{position:relative;width:min(520px,100%);max-height:88vh;overflow:auto;padding:28px;background:#181822;border:1px solid #353342;border-radius:16px;box-shadow:0 24px 80px #000b;color:#f7f2ff}
.sv-close{position:absolute;right:15px;top:8px;background:transparent;border:0;color:#fff;font-size:30px;cursor:pointer}
.sv-modal h2{font-size:clamp(28px,5vw,38px);letter-spacing:-.05em;margin:12px 35px 22px 0}
.sv-modal h2 span{color:#b58aff}
.sv-modal .eyebrow{color:#b58aff;letter-spacing:.14em}
.sv-modal input,.sv-modal select{display:block;width:100%;box-sizing:border-box;margin:7px 0 14px;padding:13px 14px;background:#111119;border:1px solid #393846;border-radius:9px;color:#fff}
.sv-modal input:focus,.sv-modal select:focus{outline:none;border-color:#b58aff;box-shadow:0 0 0 3px #b58aff22}
.sv-modal label{display:block;color:#cbbbd9;font-size:11px}
.sv-modal button{padding:11px 14px;border:1px solid #393846;border-radius:9px;background:#22222e;color:#fff;cursor:pointer;margin:5px 5px 5px 0}
.sv-modal button.primary{border-color:#b58aff;background:#b58aff;color:#17111f;font-weight:800}
.sv-modal button:disabled{opacity:.45;cursor:not-allowed}
.sv-msg{color:#d8b4fe;font-size:12px;white-space:pre-wrap}
.sv-card{padding:15px;margin:12px 0;background:#20202c;border:1px solid #353342;border-radius:12px;color:#cbbbd9;font-size:12px}
.sv-code{font-family:monospace;color:#d8b4fe;word-break:break-all}
.sv-table{width:100%;font-size:10px;border-collapse:collapse}
.sv-table td,.sv-table th{padding:7px 4px;text-align:left;border-bottom:1px solid #393846}
.sv-modal a{color:#c8aaff}
.sv-modal form{margin-top:16px}
.sv-tabs{display:flex;gap:8px;margin:0 0 16px}
.sv-tabs button{flex:1}
.sv-tabs button:not(.primary){background:#111119}
.sv-prize-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:14px}
.sv-prize{display:flex;justify-content:space-between;gap:8px;padding:11px;background:#111119;border:1px solid #393846;border-radius:7px;font-size:12px}
.sv-prize span{color:#b58aff;font-weight:800}
.sv-prize b{color:#eee2ff}
@media(max-width:480px){.sv-modal{padding:22px 18px}.sv-prize-grid{grid-template-columns:1fr}}
`;
document.head.append(css);
let tab='login';const content=()=>document.getElementById('sv-content');const msg=t=>{const e=document.getElementById('sv-msg');if(e)e.textContent=t||''};
function open(){panel.style.cssText='';const modal=panel.querySelector('.sv-modal');modal.style.cssText='';panel.classList.add('open');render().catch(err=>{content().innerHTML='<p class="sv-msg">Ошибка: '+esc(err.message)+'</p>';});}function close(){panel.classList.remove('open');panel.style.cssText='display:none!important'}panel.querySelector('.sv-close').onclick=close;panel.querySelector('.sv-shade').onclick=close;
function field(label,name,type){return '<label>'+label+'<input name="'+name+'" type="'+type+'" required></label>'}
function renderAuth(){content().innerHTML='<div><button id="sv-login" class="'+(tab==='login'?'primary':'')+'">Вход</button><button id="sv-register" class="'+(tab==='register'?'primary':'')+'">Регистрация</button></div><form id="sv-auth">'+field('Email','email','email')+field('Пароль','password','password')+'<button class="primary">'+(tab==='login'?'Войти':'Создать аккаунт')+'</button></form><div id="sv-msg" class="sv-msg"></div>'+(tab==='login'?'<button id="sv-reset">Сбросить пароль</button>':'')+'<p class="sv-msg">При регистрации может потребоваться подтверждение email.</p>';
document.getElementById('sv-login').onclick=()=>{tab='login';renderAuth()};document.getElementById('sv-register').onclick=()=>{tab='register';renderAuth()};
document.getElementById('sv-auth').onsubmit=async e=>{e.preventDefault();const f=new FormData(e.target);const email=f.get('email'),password=f.get('password');msg('Подождите...');const r=tab==='login'?await db.auth.signInWithPassword({email,password}):await db.auth.signUp({email,password,options:{emailRedirectTo:location.origin}});if(r.error)return msg(r.error.message);if(tab==='register'&&!r.data.session)return msg('Проверь почту и подтверди регистрацию.');await render()};
const reset=document.getElementById('sv-reset');if(reset)reset.onclick=async()=>{const email=document.querySelector('#sv-auth [name=email]').value;if(!email)return msg('Введи email');const r=await db.auth.resetPasswordForEmail(email,{redirectTo:location.origin});msg(r.error?r.error.message:'Ссылка отправлена на почту')};}
async function render(){
const u=await db.auth.getUser();
if(!u.data.user)return renderAuth();
const user=u.data.user;
const a=await db.rpc('is_site_admin');
const s=await db.from('subscriptions').select('plan,expires_at,is_lifetime,revoked_at,starts_at').eq('user_id',user.id).maybeSingle();
if(s.error)throw s.error;
const v=s.data;
const active=!!(v&&!v.revoked_at&&(v.is_lifetime||new Date(v.expires_at)>new Date()));
const names={'30_days':'30 дней','90_days':'90 дней','lifetime':'Навсегда'};
const status=active?(v.is_lifetime?'Бессрочно':'до '+new Date(v.expires_at).toLocaleString('ru-RU')):(v&&v.revoked_at?'Отозвана':'Не активна');
const created=user.created_at?new Date(user.created_at).toLocaleDateString('ru-RU'):'—';
const purchases='<div class="sv-card"><b>Нужен доступ?</b><br><a href="https://funpay.com/lots/offer?id=82658050" target="_blank" rel="noopener">30 дней — 100 ₽</a><br><a href="https://funpay.com/lots/offer?id=82658145" target="_blank" rel="noopener">90 дней — 300 ₽</a><br><a href="https://funpay.com/lots/offer?id=82658202" target="_blank" rel="noopener">Навсегда — 600 ₽</a></div>';
content().innerHTML='<div class="sv-card"><div style="color:#c084fc;letter-spacing:1px;font-size:10px">МОЙ АККАУНТ</div><b>'+esc(user.email)+'</b><br><span style="opacity:.75">Создан: '+created+'</span><br><span style="opacity:.75">ID: <span class="sv-code">'+esc(user.id)+'</span></span><br><button id="sv-copy-id">Копировать ID</button></div><div class="sv-card"><div style="color:#c084fc;letter-spacing:1px;font-size:10px">ТЕКУЩИЙ ДОСТУП</div><h3 style="margin:8px 0;color:#fff">'+(active?esc(names[v.plan]||v.plan):'Нет активной подписки')+'</h3><b style="color:'+(active?'#86efac':'#fca5a5')+'">'+esc(status)+'</b>'+(v&&v.starts_at?'<br><span style="opacity:.7">Активирован: '+new Date(v.starts_at).toLocaleDateString('ru-RU')+'</span>':'')+'<br><button id="sv-refresh">Обновить статус</button></div>'+(active?'<div class="sv-card">Подписка активна. Если доступ в программе ещё не появился, обнови статус и перезапусти клиент.</div>':purchases)+'<form id="sv-activate">'+field('Код активации','code','text')+'<button class="primary">Активировать код</button></form><div id="sv-msg" class="sv-msg"></div><details style="margin:18px 0"><summary style="cursor:pointer;color:#e9d5ff">Безопасность · сменить пароль</summary><form id="sv-password">'+field('Новый пароль (минимум 8 символов)','password','password')+field('Повтори новый пароль','confirm','password')+'<button class="primary">Изменить пароль</button></form></details><div class="sv-card"><b>Нужна помощь?</b><br>Напиши в поддержку, если возникла проблема с оплатой или активацией.<br><a href="https://t.me/Bisnesssuport" target="_blank" rel="noopener">Открыть поддержку в Telegram ↗</a></div>'+(a.data?'<div id="sv-admin"><hr><h3>АДМИН-ПАНЕЛЬ</h3><form id="sv-generate"><label>Тариф<select name="plan"><option value="30_days">30 дней</option><option value="90_days">90 дней</option><option value="lifetime">Навсегда</option></select></label><label>Количество<input type="number" name="qty" value="1" min="1" max="100"></label><button class="primary">Создать коды</button></form><div id="sv-codes" class="sv-msg"></div><h4>Пользователи</h4><div id="sv-users">Загрузка...</div></div>':'')+'<button id="sv-logout">Выйти из аккаунта</button>';
const profileMarkup=content().innerHTML;
content().innerHTML='<div class="sv-tabs"><button id="sv-tab-profile" class="primary">Профиль</button><button id="sv-tab-gifts">Подарки</button></div><div id="sv-profile-pane">'+profileMarkup+'</div><div id="sv-gifts-pane" style="display:none"><div class="sv-card"><div style="color:#c084fc;letter-spacing:1px;font-size:10px">DAILY DROP / 24H</div><h3 style="margin:8px 0;color:#fff">Ежедневная карточка</h3><p class="desc">Одна попытка каждые 24 часа. Нужна активная подписка.</p><div id="sv-gift-cooldown" class="sv-msg">Проверяем доступ...</div><button id="sv-open-gift" class="primary" '+(active?'':'disabled')+'>Открыть карточку</button><div id="sv-gift-result" class="sv-msg"></div></div><h3>Витрина призов</h3><div class="sv-card"><b>Шансы выпадения</b><div class="sv-prize-grid">'+[
['1 час','30%','1_hour'],['2 часа','20%','2_hours'],['3 часа','15%','3_hours'],['5 часов','10%','5_hours'],['1 день','8%','1_day'],['2 дня','6%','2_days'],['30 дней','0.05%','30_days'],['90 дней','0.01%','90_days']
].map(x=>'<div class="sv-prize"><b>'+x[0]+'</b><span>'+x[1]+'</span></div>').join('')+'</div><p class="sv-msg">Вероятность ничего не получить: 10.94%. Шанс 30 дней — 0.05%, 90 дней — 0.01%.</p></div><h3>Последние открытия</h3><div id="sv-gift-history" class="sv-card">Загрузка истории...</div></div>';
const giftCss=document.createElement('style');giftCss.textContent='.sv-tabs{display:flex;gap:8px;margin:0 0 16px}.sv-tabs button{flex:1}.sv-prize-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:14px}.sv-prize{display:flex;justify-content:space-between;gap:8px;padding:11px;background:#100b18;border:1px solid #49325e;border-radius:7px;font-size:12px}.sv-prize span{color:#c084fc;font-weight:800}.sv-prize b{color:#eee2ff}.sv-tabs button:not(.primary){background:#100b18}.sv-modal a{color:#d8b4fe}.sv-modal button:disabled{opacity:.45;cursor:not-allowed}';document.head.append(giftCss);
const profileTab=document.getElementById('sv-tab-profile'),giftTab=document.getElementById('sv-tab-gifts');
profileTab.onclick=()=>{document.getElementById('sv-profile-pane').style.display='block';document.getElementById('sv-gifts-pane').style.display='none';profileTab.classList.add('primary');giftTab.classList.remove('primary')};
giftTab.onclick=()=>{document.getElementById('sv-profile-pane').style.display='none';document.getElementById('sv-gifts-pane').style.display='block';giftTab.classList.add('primary');profileTab.classList.remove('primary');loadGiftData()};
async function loadGiftData(){
const cooldown=document.getElementById('sv-gift-cooldown'),button=document.getElementById('sv-open-gift'),history=document.getElementById('sv-gift-history');
const [cd,hist]=await Promise.all([db.from('daily_gift_cooldowns').select('last_claim_at,extra_attempts').eq('user_id',user.id).maybeSingle(),db.from('daily_gift_claims').select('prize_key,prize_seconds,created_at').eq('user_id',user.id).order('created_at',{ascending:false}).limit(10)]);
if(cd.error||hist.error){cooldown.textContent='Не удалось загрузить данные подарков.';return}
const next=cd.data?new Date(new Date(cd.data.last_claim_at).getTime()+86400000):new Date(0),extra=Number(cd.data?.extra_attempts||0),ready=Date.now()>=next.getTime();
cooldown.textContent=!active?'Для открытия нужна активная подписка.':extra>0?'Дополнительных попыток: '+extra+(ready?' · Ежедневная попытка тоже доступна.':' · Ежедневная попытка будет доступна: '+next.toLocaleString('ru-RU')):ready?'Карточка доступна прямо сейчас!':'Следующая карточка: '+next.toLocaleString('ru-RU');
button.disabled=!active||(!ready&&extra<=0);button.textContent=extra>0?'Открыть дополнительную попытку ('+extra+')':ready?'Открыть карточку':'Уже открыто';
const labels={'1_hour':'1 час','2_hours':'2 часа','3_hours':'3 часа','5_hours':'5 часов','1_day':'1 день','2_days':'2 дня','30_days':'30 дней','90_days':'90 дней','empty':'Без приза'};
history.innerHTML=hist.data.length?hist.data.map(x=>'<div style="padding:8px 0;border-bottom:1px solid #49325e"><b>'+esc(labels[x.prize_key]||x.prize_key)+'</b> <span style="float:right;color:#bda9d0">'+new Date(x.created_at).toLocaleString('ru-RU')+'</span></div>').join(''):'Пока нет открытых карточек.';
}
document.getElementById('sv-open-gift').onclick=async e=>{const b=e.currentTarget;b.disabled=true;b.textContent='Открываем...';const box=document.getElementById('sv-gift-result');box.textContent='Используем защищённый генератор случайных чисел...';try{const {data,error}=await db.functions.invoke('daily-gift',{body:{}});if(error)throw error;const result=data.result,labels={'1_hour':'1 час подписки','2_hours':'2 часа подписки','3_hours':'3 часа подписки','5_hours':'5 часов подписки','1_day':'1 день подписки','2_days':'2 дня подписки','30_days':'30 дней подписки','90_days':'90 дней подписки','empty':'В этот раз без приза'};box.textContent='Результат: '+labels[result.prize_key]+(result.prize_seconds&&result.lifetime_subscription?' — у тебя бессрочный доступ, поэтому срок не меняется.':result.prize_seconds?' — время добавлено к подписке!':'')+' Следующая попытка: '+new Date(result.next_claim_at).toLocaleString('ru-RU');await loadGiftData();}catch(err){box.textContent=err.message||'Не удалось открыть карточку.';await loadGiftData()}};
if(active)loadGiftData();
document.getElementById('sv-copy-id').onclick=async()=>{try{await navigator.clipboard.writeText(user.id);msg('ID аккаунта скопирован.')}catch(e){msg('Не удалось скопировать ID.')}}; 
document.getElementById('sv-refresh').onclick=()=>render().catch(err=>msg(err.message));
document.getElementById('sv-activate').onsubmit=async e=>{e.preventDefault();const b=e.submitter;b.disabled=true;msg('Проверяем код...');try{const r=await db.rpc('activate_subscription_code',{p_code:new FormData(e.target).get('code').trim()});if(r.error)msg(r.error.message);else{msg('Код успешно активирован!');await render()}}finally{b.disabled=false}};
document.getElementById('sv-password').onsubmit=async e=>{e.preventDefault();const f=new FormData(e.target),p=f.get('password');if(p.length<8)return msg('Пароль должен содержать минимум 8 символов.');if(p!==f.get('confirm'))return msg('Пароли не совпадают.');const b=e.submitter;b.disabled=true;msg('Обновляем пароль...');try{const r=await db.auth.updateUser({password:p});msg(r.error?'Ошибка: '+r.error.message:'Пароль успешно изменён.')}finally{b.disabled=false}};
document.getElementById('sv-logout').onclick=async()=>{await db.auth.signOut();tab='login';renderAuth()};if(a.data)admin();
}
async function admin(){document.getElementById('sv-generate').onsubmit=async e=>{e.preventDefault();const f=new FormData(e.target);const r=await db.rpc('admin_generate_codes',{p_plan:f.get('plan'),p_quantity:Number(f.get('qty'))});const box=document.getElementById('sv-codes');if(r.error)return box.textContent=r.error.message;const codes=r.data.map(x=>x.code);box.innerHTML='Сохрани коды — повторно они не показываются:<br>'+codes.map(c=>'<div class="sv-code">'+esc(c)+'</div>').join('')+'<button id="sv-copy">Копировать</button>';document.getElementById('sv-copy').onclick=()=>navigator.clipboard.writeText(codes.join('\n'))};
const r=await db.rpc('admin_list_users');const host=document.getElementById('sv-users');if(r.error){host.textContent=r.error.message;return}host.innerHTML='<table class="sv-table"><tr><th>Email</th><th>Подписка</th><th></th></tr>'+r.data.map(x=>'<tr><td>'+esc(x.email)+'</td><td>'+(x.revoked_at?'Отозвана':x.is_lifetime?'Навсегда':x.expires_at?new Date(x.expires_at).toLocaleDateString('ru-RU'):'—')+'</td><td>'+(x.plan&&!x.revoked_at?'<button data-revoke="'+x.user_id+'">Отозвать</button>':'')+'</td></tr>').join('')+'</table>';host.querySelectorAll('[data-revoke]').forEach(b=>b.onclick=async()=>{if(!confirm('Отозвать подписку?'))return;const z=await db.rpc('admin_revoke_subscription',{p_user_id:b.dataset.revoke});if(z.error)alert(z.error.message);else admin()})}
window.openKvAccount=open;document.addEventListener('sv-open-account',open);document.addEventListener('click',e=>{if(e.target.closest('#sv-open-account')){e.preventDefault();open();}});const accountLink=document.getElementById('sv-open-account');if(accountLink)accountLink.onclick=e=>{e.preventDefault();open()};const nav=document.querySelector('.nav');if(!accountLink&&nav){const b=document.createElement('a');b.className='navbtn';b.href='#account';b.textContent='Личный кабинет ↗';b.onclick=e=>{e.preventDefault();open()};nav.append(b)}const mobile=document.createElement('button');mobile.textContent='Личный кабинет ↗';mobile.style='position:fixed;right:18px;bottom:18px;z-index:50;background:#b58aff;color:#17111f;border:0;padding:12px 16px;border-radius:10px;font:700 12px Manrope,Arial,sans-serif;box-shadow:0 8px 28px #0008';mobile.onclick=open;document.body.append(mobile);
db.auth.onAuthStateChange(()=>{});
})();