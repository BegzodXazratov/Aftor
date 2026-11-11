// Sozlamalar: Meta Pixel ID ni shu yerga qo'ying (reklama ishga tushganda Lead hodisasi yuboriladi)
const CONFIG = {
  pixelId: '',
  telegram: 'aftor_tg',
  instagram: '__aftor',
};

// Meta Pixel (ID kiritilgan bo'lsa)
if (CONFIG.pixelId) {
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', CONFIG.pixelId); fbq('track', 'PageView');
}
const track = (ev) => { try { if (window.fbq) fbq('track', ev); } catch (e) {} };

// Sahifa bo'lim animatsiyasi
const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 }) : null;
document.querySelectorAll('.reveal').forEach((el) => io ? io.observe(el) : el.classList.add('in'));

// Telegram/Instagram tugmalari bosilganda hodisa
document.querySelectorAll('[data-track]').forEach((a) => a.addEventListener('click', () => track(a.dataset.track)));

// So'rov formasi: ma'lumotni Telegramga tayyor xabar qilib yuboradi
const form = document.getElementById('lead');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form).entries());
    const text = [
      'Salom, Asqar! Saytdan yozyapman.',
      'Ism: ' + d.name,
      'Aloqa: ' + d.contact,
      'Xizmat: ' + d.service,
      d.msg ? 'Loyiha haqida: ' + d.msg : '',
    ].filter(Boolean).join('\n');
    track('Lead');
    const ok = document.getElementById('ok');
    ok.classList.add('show');
    navigator.clipboard && navigator.clipboard.writeText(text).catch(() => {});
    ok.textContent = 'Xabar tayyor. Telegram ochiladi. Ochilmasa, xabar nusxalandi, uni t.me/' + CONFIG.telegram + ' ga yuboring.';
    window.open('https://t.me/' + CONFIG.telegram + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
  });
}
