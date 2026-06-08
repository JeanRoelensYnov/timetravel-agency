/* =====================================================================
   TimeTravel Agency — app.js
   Vanilla JS. No build step. GitHub-Pages ready.
   ===================================================================== */
'use strict';

/* ---------------------------------------------------------------
   DESTINATION DATA  (single source of truth)
   To swap in your own photos: drop files in /assets and set `img`.
   Leave `img` empty to use the styled gradient fallback.
--------------------------------------------------------------- */
const DESTINATIONS = {
  paris: {
    era: 'Paris · 1889',
    name: 'La Belle Époque',
    color: 'var(--paris)',
    grad: 'linear-gradient(150deg,#3a2a12,#8a6520 45%,#d9a441)',
    img: 'assets/paris.jpg',            // ← your hero image
    tag: 'Exposition Universelle & Tour Eiffel toute neuve',
    price: '48 000 €',
    priceNote: '/ personne · 4 jours',
    duration: '4 jours',
    season: 'Mai – Octobre',
    desc: "Foulez les pavés d'un Paris en pleine effervescence. La Tour Eiffel vient d'ouvrir, l'Exposition Universelle illumine le Champ-de-Mars, et la ville invente la modernité entre cabarets, fiacres et premières ampoules électriques.",
    highlights: [
      "Dîner privé au premier étage de la Tour Eiffel, le soir de son inauguration",
      "Loge réservée au Moulin Rouge naissant",
      "Visite guidée de l'Exposition Universelle avant l'ouverture au public",
      "Promenade en fiacre sur les Grands Boulevards illuminés"
    ]
  },
  cretace: {
    era: 'Crétacé · -65 000 000',
    name: "L'Aube des Géants",
    color: 'var(--cretace)',
    grad: 'linear-gradient(150deg,#13261a,#2f5a37 45%,#7fa06b)',
    img: 'assets/cretaceous.jpg',
    tag: 'Nature primordiale & faune titanesque',
    price: '72 000 €',
    priceNote: '/ personne · expédition 3 jours',
    duration: '3 jours',
    season: 'Climat tropical constant',
    desc: "L'expédition la plus exclusive de notre catalogue. Depuis un observatoire blindé et invisible, contemplez un monde sans humains : forêts géantes, ciels traversés de ptérosaures et troupeaux colossaux à l'horizon. Sécurité absolue, émerveillement garanti.",
    highlights: [
      "Observation rapprochée d'un troupeau de Triceratops depuis un affût camouflé",
      "Survol en capsule silencieuse d'une vallée préhistorique intacte",
      "Nuit sous coupole transparente, sous un ciel sans pollution lumineuse",
      "Briefing paléontologique avec un guide-scientifique de l'agence"
    ]
  },
  florence: {
    era: 'Florence · 1504',
    name: 'La Renaissance',
    color: 'var(--florence)',
    grad: 'linear-gradient(150deg,#2e1410,#7a2c1f 45%,#c2553f)',
    img: 'assets/florence.jpg',
    tag: "Au cœur de l'âge d'or de l'art",
    price: '56 000 €',
    priceNote: '/ personne · 5 jours',
    duration: '5 jours',
    season: 'Printemps florentin',
    desc: "Florence est à son zénith. Le David de Michel-Ange vient d'être dévoilé, Léonard de Vinci arpente les ruelles, et chaque atelier bouillonne de génie. Vivez la Renaissance de l'intérieur, en hôte privilégié des grandes familles.",
    highlights: [
      "Visite de l'atelier de Léonard de Vinci, en sa présence",
      "Dévoilement privé du David, avant son installation publique",
      "Banquet dans un palais Médicis avec les artistes de la cour",
      "Cours de fresque auprès d'un maître florentin"
    ]
  }
};

const ORDER = ['paris', 'cretace', 'florence'];

/* ---------------------------------------------------------------
   HELPERS
--------------------------------------------------------------- */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* media block with graceful image fallback to gradient */
function mediaHTML(d, cls) {
  // The <img> hides itself on error, revealing the gradient fallback beneath.
  return `<div class="${cls}" style="--grad:${d.grad}">
            <div class="fallback"></div>
            ${d.img ? `<img src="${d.img}" alt="${d.name}" loading="lazy"
                 onerror="this.style.display='none'">` : ''}
          </div>`;
}

/* =====================================================================
   NAV  (scroll state + mobile menu)
   ===================================================================== */
const nav = $('#nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const burger = $('#burger');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});
$$('.nav__links a').forEach(a =>
  a.addEventListener('click', () => nav.classList.remove('open'))
);

/* =====================================================================
   STARFIELD CANVAS  (hero fallback / ambience behind video)
   ===================================================================== */
(function starfield() {
  const c = $('#starfield');
  if (!c) return;
  const ctx = c.getContext('2d');
  let stars = [], w, h, raf;

  function resize() {
    w = c.width = c.offsetWidth;
    h = c.height = c.offsetHeight;
    const count = Math.min(140, Math.floor(w * h / 9000));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.3 + .2,
      a: Math.random(), s: Math.random() * .015 + .003
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    const g = ctx.createRadialGradient(w * .25, h * .4, 0, w * .25, h * .4, h);
    g.addColorStop(0, '#1a1322'); g.addColorStop(1, '#0d0b13');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    stars.forEach(st => {
      st.a += st.s; if (st.a > 1 || st.a < 0) st.s *= -1;
      ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, 7);
      ctx.fillStyle = `rgba(216,189,134,${st.a * .8})`; ctx.fill();
    });
    raf = requestAnimationFrame(draw);
  }
  resize(); draw();
  window.addEventListener('resize', resize);
  // pause when offscreen
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { if (!raf) draw(); }
    else { cancelAnimationFrame(raf); raf = null; }
  });
  io.observe(c);
})();

/* hide hero video element entirely if its source can't load (keeps canvas clean) */
(function heroVideo() {
  const v = $('#heroVideo');
  if (!v) return;
  v.addEventListener('error', () => v.remove(), true);
  // If no <source> resolves shortly, drop it so the canvas shows through.
  setTimeout(() => { if (v.readyState === 0) v.remove(); }, 1500);
})();

/* =====================================================================
   REVEAL ON SCROLL
   ===================================================================== */
const revealIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); }
  });
}, { threshold: .15 });
$$('.reveal').forEach(el => revealIO.observe(el));

/* animated counters in the agency stats */
const countIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = $('.stat__num', e.target);
    const target = +el.dataset.count;
    let n = 0;
    const step = Math.max(1, Math.round(target / 40));
    const t = setInterval(() => {
      n += step;
      if (n >= target) { n = target; clearInterval(t); }
      el.textContent = n;
    }, 28);
    countIO.unobserve(e.target);
  });
}, { threshold: .5 });
$$('.agency__stats li').forEach(li => countIO.observe(li));

/* =====================================================================
   DESTINATION CARDS + MODAL
   ===================================================================== */
const grid = $('#destGrid');
grid.innerHTML = ORDER.map(key => {
  const d = DESTINATIONS[key];
  return `<article class="card reveal" data-dest="${key}" style="--c:${d.color}">
    ${mediaHTML(d, 'card__media')}
    <div class="card__scrim"></div>
    <div class="card__body">
      <p class="card__era">${d.era}</p>
      <h3 class="card__name">${d.name}</h3>
      <p class="card__tag">${d.tag}</p>
      <div class="card__foot">
        <span class="card__price">${d.price} <span>${d.priceNote}</span></span>
        <span class="card__more">Découvrir</span>
      </div>
    </div>
  </article>`;
}).join('');
$$('.card', grid).forEach(c => {
  revealIO.observe(c);
  c.addEventListener('click', () => openModal(c.dataset.dest));
});

const modal = $('#modal');
const modalBody = $('#modalBody');

function openModal(key) {
  const d = DESTINATIONS[key];
  modalBody.style.setProperty('--c', d.color);
  modalBody.style.setProperty('--grad', d.grad);
  modalBody.innerHTML = `
    <div class="modal__hero" style="--grad:${d.grad}">
      <div class="fallback"></div>
      ${d.img ? `<img src="${d.img}" alt="${d.name}" onerror="this.style.display='none'">` : ''}
    </div>
    <div class="modal__inner">
      <p class="modal__era" style="color:${d.color}">${d.era}</p>
      <h2 class="modal__title">${d.name}</h2>
      <p class="modal__desc">${d.desc}</p>
      <ul class="modal__highlights" style="--c:${d.color}">
        ${d.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>
      <div class="modal__meta">
        <div><span class="m-label">Durée</span><span class="m-val">${d.duration}</span></div>
        <div><span class="m-label">Saison</span><span class="m-val" style="font-size:1.1rem">${d.season}</span></div>
        <div><span class="m-label">À partir de</span><span class="m-val">${d.price}</span></div>
      </div>
      <a href="#reservation" class="btn btn--gold btn--block" data-close>Réserver cette époque</a>
    </div>`;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  // preselect destination in booking form
  $('#bk-dest').value = key;
}
function closeModal() { modal.hidden = true; document.body.style.overflow = ''; }
modal.addEventListener('click', e => { if (e.target.matches('[data-close], .modal__backdrop')) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

/* =====================================================================
   QUIZ  — 4 questions → weighted recommendation
   ===================================================================== */
const QUIZ = [
  { q: "Quel type d'expérience recherchez-vous ?",
    a: [['Culturelle et artistique', 'florence'], ['Aventure et nature', 'cretace'], ['Élégance et raffinement', 'paris']] },
  { q: "Votre période de prédilection ?",
    a: [['Histoire moderne (XIXᵉ siècle)', 'paris'], ['Temps anciens et origines', 'cretace'], ['Renaissance et classicisme', 'florence']] },
  { q: "Vous préférez avant tout…",
    a: [["L'effervescence urbaine", 'paris'], ['La nature sauvage', 'cretace'], ["L'art et l'architecture", 'florence']] },
  { q: "Votre activité idéale ?",
    a: [['Visiter des monuments', 'paris'], ['Observer la faune', 'cretace'], ['Explorer ateliers et musées', 'florence']] }
];

const stage = $('#quizStage');
let qIndex = 0, scores = { paris: 0, cretace: 0, florence: 0 };

function renderQuestion() {
  const item = QUIZ[qIndex];
  stage.innerHTML = `
    <div class="quiz__step">
      <div class="quiz__progress">${QUIZ.map((_, i) => `<i class="${i <= qIndex ? 'on' : ''}"></i>`).join('')}</div>
      <p class="quiz__q">${item.q}</p>
      <div class="quiz__opts">
        ${item.a.map(([label, key]) => `<button class="quiz__opt" data-key="${key}">${label}</button>`).join('')}
      </div>
    </div>`;
  $$('.quiz__opt', stage).forEach(b =>
    b.addEventListener('click', () => { scores[b.dataset.key]++; next(); })
  );
}
function next() {
  qIndex++;
  if (qIndex < QUIZ.length) renderQuestion();
  else renderResult();
}
function renderResult() {
  const key = Object.keys(scores).reduce((a, b) => scores[a] >= scores[b] ? a : b);
  const d = DESTINATIONS[key];
  stage.innerHTML = `
    <div class="quiz__result" style="--c:${d.color}">
      <p class="r-era">Votre époque idéale</p>
      <p class="r-name">${d.name}</p>
      <p>${d.desc}</p>
      <a href="#destinations" class="btn btn--gold" id="quizGo">Découvrir ${d.era.split(' · ')[0]}</a>
      <br><button class="quiz__again">Refaire le test</button>
    </div>`;
  $('#quizGo').addEventListener('click', () => setTimeout(() => openModal(key), 600));
  $('.quiz__again', stage).addEventListener('click', resetQuiz);
}
function resetQuiz() { qIndex = 0; scores = { paris: 0, cretace: 0, florence: 0 }; renderQuestion(); }
renderQuestion();

/* =====================================================================
   BOOKING FORM  (client-side validation + fake confirmation)
   ===================================================================== */
const form = $('#bookingForm');
const success = $('#bookingSuccess');
const today = new Date().toISOString().split('T')[0];
$('#bk-date').min = today;

form.addEventListener('submit', e => {
  e.preventDefault();
  $$('.err', form).forEach(s => s.textContent = '');
  const f = form.elements;
  let ok = true;
  const fail = (name, msg) => { $(`[data-for="${name}"]`, form).textContent = msg; ok = false; };

  if (!f.name.value.trim()) fail('name', 'Votre nom est requis.');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.value)) fail('email', 'Adresse e-mail invalide.');
  if (!f.dest.value) fail('dest', 'Choisissez une destination.');
  if (!f.date.value) fail('date', 'Indiquez une date de départ.');
  else if (f.date.value < today) fail('date', 'La date doit être dans le futur (de votre présent).');
  const t = +f.travelers.value;
  if (!t || t < 1 || t > 6) fail('travelers', 'Entre 1 et 6 voyageurs.');

  if (!ok) return;
  const destName = DESTINATIONS[f.dest.value].name;
  success.hidden = false;
  success.textContent = `Merci ${f.name.value.split(' ')[0]} ! Votre demande pour « ${destName} » est enregistrée. Augustin, votre majordome temporel, vous recontacte sous 24 h.`;
  form.reset();
  $('#bk-travelers').value = 2;
});

/* =====================================================================
   CHATBOT — "Augustin", majordome temporel
   Default: scripted intent engine (no key, works on GitHub Pages).
   Optional: live LLM via user-supplied OpenRouter / Mistral key.
   ===================================================================== */
const Chat = (() => {
  const bubble   = $('#chatBubble');
  const panel    = $('#chatPanel');
  const log      = $('#chatLog');
  const formEl   = $('#chatForm');
  const input    = $('#chatInput');
  const suggest  = $('#chatSuggest');
  const settings = $('#chatSettingsPanel');

  let apiKey = '';            // kept in memory only — never persisted/published
  let provider = 'openrouter';
  let history = [];           // for LLM context

  const SYSTEM = `Tu es Augustin, l'assistant virtuel (majordome temporel) de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.
Ton ton : professionnel mais chaleureux, passionné d'histoire, toujours enthousiaste sans être trop familier.
Tu connais parfaitement nos 3 destinations :
- Paris 1889 (Belle Époque, Tour Eiffel, Exposition Universelle) — à partir de 48 000 €, 4 jours.
- Le Crétacé, il y a 65 millions d'années (dinosaures, nature préhistorique) — à partir de 72 000 €, expédition 3 jours.
- Florence 1504 (Renaissance, art, Michel-Ange, Léonard de Vinci) — à partir de 56 000 €, 5 jours.
Réponses courtes (2-4 phrases), en français. Tu peux suggérer une destination selon les intérêts du client.`;

  const SUGGESTIONS = [
    'Quelles destinations ?', 'Quels sont les prix ?',
    'Conseille-moi une époque', 'Est-ce dangereux ?'
  ];

  /* ---- scripted intent engine ---- */
  function scripted(text) {
    const t = text.toLowerCase();
    const has = (...k) => k.some(w => t.includes(w));

    if (has('bonjour', 'salut', 'bonsoir', 'coucou', 'hello', 'hey'))
      return "Bonjour et bienvenue chez TimeTravel Agency ! Je suis Augustin, votre majordome temporel. Souhaitez-vous explorer **Paris 1889**, **le Crétacé** ou **Florence 1504** ?";

    if (has('prix', 'tarif', 'coût', 'cout', 'combien', 'budget', '€'))
      return "Nos voyages d'exception : **Paris 1889** à partir de 48 000 € (4 jours), **Florence 1504** à partir de 56 000 € (5 jours), et l'expédition **Crétacé** à partir de 72 000 € (3 jours). Tout est inclus : combinaison d'époque, guide et assurance anti-paradoxe.";

    if (has('destination', 'époque', 'epoque', 'voyage', 'proposez', 'offre', 'catalogue', 'où'))
      return "Trois fenêtres sur l'éternité : **Paris 1889** (Belle Époque, Tour Eiffel), **le Crétacé** (l'aube des géants) et **Florence 1504** (la Renaissance). Laquelle vous fait rêver ?";

    if (has('paris', '1889', 'eiffel', 'belle époque', 'belle epoque'))
      return "**Paris 1889**, un délice ! La Tour Eiffel vient d'ouvrir et l'Exposition Universelle illumine la ville. Dîner privé sur la Tour, loge au Moulin Rouge… 48 000 € pour 4 jours d'élégance.";

    if (has('crétacé', 'cretace', 'dinosaure', 'dino', 'préhist', 'prehist', 'jurassique'))
      return "Le **Crétacé** est notre expédition la plus exclusive : observation de Triceratops depuis un affût camouflé, nuits sous coupole transparente. Sécurité absolue. 72 000 € pour 3 jours hors du temps.";

    if (has('florence', '1504', 'renaissance', 'michel', 'vinci', 'léonard', 'leonard', 'art'))
      return "**Florence 1504** vous ouvre l'âge d'or de l'art : l'atelier de Léonard de Vinci, le dévoilement privé du David de Michel-Ange, un banquet chez les Médicis. 56 000 € pour 5 jours de génie.";

    if (has('conseil', 'recommand', 'suggér', 'sugger', 'choisir', 'aide', 'idée', 'quelle'))
      return "Avec plaisir ! Êtes-vous plutôt **art et culture** (Florence), **aventure et nature** (le Crétacé) ou **raffinement urbain** (Paris) ? Notre quiz « Votre Époque » affine aussi la recommandation en 4 questions.";

    if (has('danger', 'risque', 'sécur', 'secur', 'peur', 'mourir'))
      return "Rassurez-vous : tous nos voyages sont sans paradoxe ni danger. Pour le Crétacé, vous observez la faune depuis un affût blindé et invisible. Un guide certifié vous accompagne à chaque instant.";

    if (has('réserv', 'reserv', 'booker', 'book', 'commander', 'partir', 'inscri'))
      return "Excellent choix ! Rendez-vous dans la section **Réserver** plus bas : indiquez destination, dates et nombre de voyageurs, et je vous recontacte sous 24 h pour finaliser l'itinéraire.";

    if (has('durée', 'duree', 'temps', 'jours', 'combien de temps'))
      return "Comptez 4 jours pour Paris 1889, 5 jours pour Florence 1504 et 3 jours pour l'expédition Crétacé. Le temps passé là-bas n'affecte jamais votre présent — vous rentrez à la seconde de votre départ.";

    if (has('paradoxe', 'changer', 'passé', 'passe', 'futur', 'histoire'))
      return "Notre protocole anti-paradoxe est strict : vous observez sans interférer. Aucune empreinte, aucune conséquence sur la ligne temporelle. C'est notre garantie absolue.";

    if (has('merci', 'super', 'génial', 'genial', 'parfait', 'cool'))
      return "Tout le plaisir est pour moi. Y a-t-il une autre époque sur laquelle je peux vous éclairer ?";

    if (has('manger', 'repas', 'nourriture', 'cuisine', 'gastro'))
      return "La gastronomie est incluse : dîner sur la Tour Eiffel à Paris 1889, banquet Médicis à Florence, et cuisine de campement raffinée au Crétacé. Tout est adapté à votre palais de voyageur moderne.";

    return "Belle question ! Je suis spécialisé dans nos trois destinations — **Paris 1889**, **le Crétacé** et **Florence 1504**. Posez-moi vos questions sur les prix, les itinéraires ou la sécurité, ou demandez-moi un conseil personnalisé.";
  }

  /* ---- optional live LLM ---- */
  async function llm(text) {
    history.push({ role: 'user', content: text });
    const endpoints = {
      openrouter: { url: 'https://openrouter.ai/api/v1/chat/completions', model: 'mistralai/mistral-small-3.2-24b-instruct:free' },
      mistral:    { url: 'https://api.mistral.ai/v1/chat/completions',      model: 'mistral-small-latest' }
    };
    const cfg = endpoints[provider];
    const res = await fetch(cfg.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: cfg.model,
        messages: [{ role: 'system', content: SYSTEM }, ...history.slice(-8)],
        max_tokens: 220, temperature: .7
      })
    });
    if (!res.ok) throw new Error('api');
    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || scripted(text);
    history.push({ role: 'assistant', content: reply });
    return reply;
  }

  /* ---- UI ---- */
  function fmt(s) { return s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); }

  function addMsg(text, who) {
    const el = document.createElement('div');
    el.className = `msg msg--${who}`;
    el.innerHTML = who === 'bot' ? fmt(text) : text.replace(/</g, '&lt;');
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }
  function typing() {
    const el = document.createElement('div');
    el.className = 'msg msg--bot msg--typing';
    el.innerHTML = '<i></i><i></i><i></i>';
    log.appendChild(el); log.scrollTop = log.scrollHeight;
    return el;
  }

  async function respond(text) {
    const t = typing();
    let reply;
    try {
      reply = apiKey ? await llm(text) : scripted(text);
      if (!apiKey) await new Promise(r => setTimeout(r, 400 + Math.random() * 500));
    } catch {
      reply = "Je n'ai pas pu joindre l'IA en direct — je repasse en mode classique. " + scripted(text);
    }
    t.remove();
    addMsg(reply, 'bot');
  }

  function send(text) {
    if (!text.trim()) return;
    addMsg(text, 'user');
    respond(text);
  }

  function renderSuggest() {
    suggest.innerHTML = SUGGESTIONS.map(s => `<button>${s}</button>`).join('');
    $$('button', suggest).forEach(b =>
      b.addEventListener('click', () => { send(b.textContent); suggest.innerHTML = ''; })
    );
  }

  let opened = false;
  function open() {
    panel.hidden = false; bubble.style.display = 'none';
    if (!opened) {
      opened = true;
      addMsg("Bonjour ! Je suis **Augustin**, votre majordome temporel. Comment puis-je vous aider à voyager dans le temps aujourd'hui ?", 'bot');
      renderSuggest();
    }
    input.focus();
  }
  function close() { panel.hidden = true; bubble.style.display = 'grid'; }

  bubble.addEventListener('click', open);
  $('#chatClose').addEventListener('click', close);
  $('#chatSettings').addEventListener('click', () => settings.hidden = !settings.hidden);
  formEl.addEventListener('submit', e => {
    e.preventDefault();
    const v = input.value; input.value = '';
    suggest.innerHTML = '';
    send(v);
  });

  $('#apiSave').addEventListener('click', () => {
    apiKey = $('#apiKey').value.trim();
    provider = $('#apiProvider').value;
    settings.hidden = true;
    history = [];
    addMsg(apiKey
      ? "✦ IA en direct activée. Posez-moi n'importe quelle question, je vous répondrai en temps réel !"
      : "Mode scripté conservé.", 'bot');
  });

  return { open };
})();

/* =====================================================================
   MISC
   ===================================================================== */
$('#year').textContent = new Date().getFullYear();
