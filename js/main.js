document.addEventListener('DOMContentLoaded', function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open);
    });
    mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Mark active nav link based on current page
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.main-nav a[data-page]').forEach(a => {
    if (a.getAttribute('data-page') === path) a.classList.add('active');
  });

  // Instruments tab panel (instruments.html only)
  const listEl = document.getElementById('instrumentList');
  const panelsEl = document.getElementById('instrumentPanels');
  if (listEl && panelsEl) {
    const instruments = [
      { name:'Piano', tagline:'Technique. Expression. Musical Intelligence.', desc:"Piano students develop a strong foundation in technique, music reading, theory, repertoire and musical interpretation. Training is available from beginner level through structured certification preparation.", img:'images/piano-ribbon-mural.jpg' },
      { name:'Violin', tagline:'Precision, Expression and Artistry.', desc:'Our violin programme develops proper posture, bow technique, intonation, rhythm, sight-reading and musical expression. Students are guided through progressive repertoire while building the discipline required for confident performance.', img:'images/violin-bow-keys.jpg' },
      { name:'Viola', tagline:'Discover the Depth of the Viola.', desc:'Students develop the technical and musical foundations required to become confident viola players, including technique, tone production, rhythm, notation, repertoire and ensemble musicianship.' },
      { name:'Cello', tagline:'Power, Warmth and Musical Expression.', desc:'Our cello programme introduces students to the fundamentals of cello technique while developing musicality, tone, rhythm and performance confidence.' },
      { name:'Flute', tagline:'Breath. Technique. Musical Expression.', desc:'Flute students develop breath control, tone production, articulation, fingering, rhythm, sight-reading and musical interpretation — a structured pathway from beginner to examination preparation.' },
      { name:'Acoustic Guitar', tagline:'Build Your Technique. Find Your Sound.', desc:'Students learn chords, rhythm, picking, musical notation, repertoire and performance skills while developing a strong technical foundation.', img:'images/guitar-kid-motocross.jpg' },
      { name:'Electric Guitar', tagline:'Technique Meets Expression.', desc:'Our electric guitar programme develops technical control, rhythm, riffs, chords, scales, improvisation and performance skills across contemporary and structured musical styles.', img:'images/duo-guitar-stage.jpg' },
      { name:'Bass Guitar', tagline:'Become the Foundation of the Music.', desc:'Bass students develop timing, groove, rhythm, technique, scales, riffs and ensemble skills — preparing them to perform confidently both independently and as part of a band.' },
      { name:'Drums', tagline:'Rhythm. Control. Precision.', desc:'Our drum programme develops coordination, timing, rhythm, technique, reading and performance ability, progressing through structured levels while building confidence.' },
      { name:'Vocals', tagline:'Develop Your Voice. Discover Your Artistry.', desc:'Our vocal programme develops the voice as an instrument — vocal technique, breath control, pitch, tone, resonance, expression, performance and repertoire, across contemporary and classical styles.', img:'images/choir-stage.jpg' },
    ];

    instruments.forEach((inst, i) => {
      const btn = document.createElement('button');
      btn.className = 'instrument-tab' + (i === 0 ? ' active' : '');
      btn.setAttribute('role', 'tab');
      btn.innerHTML = `<span>${inst.name}</span><span class="num">${String(i + 1).padStart(2, '0')}</span>`;
      btn.addEventListener('click', () => selectInstrument(i));
      listEl.appendChild(btn);

      const panel = document.createElement('div');
      panel.className = 'instrument-detail' + (i === 0 ? ' active' : '');
      const photoHtml = inst.img ? `<div class="instrument-photo"><img class="bw-photo" src="${inst.img}" alt="${inst.name} student at Robin's Private Music Centre"></div>` : '';
      panel.innerHTML = `
        ${photoHtml}
        <h3>${inst.name}</h3>
        <span class="tagline">${inst.tagline}</span>
        <p>${inst.desc}</p>
        <div class="prog-note">Available on <b>Initial Grading</b>, <b>Standard Certification</b> and <b>Premium Certification</b>. <a href="apply.html" class="btn btn-outline" style="margin-top:16px;">Enquire About ${inst.name}</a></div>
      `;
      panelsEl.appendChild(panel);
    });

    function selectInstrument(index) {
      listEl.querySelectorAll('.instrument-tab').forEach((el, i) => el.classList.toggle('active', i === index));
      panelsEl.querySelectorAll('.instrument-detail').forEach((el, i) => el.classList.toggle('active', i === index));
    }

    // Allow deep-linking: instruments.html?i=Piano
    const params = new URLSearchParams(window.location.search);
    const wanted = params.get('i');
    if (wanted) {
      const idx = instruments.findIndex(inst => inst.name.toLowerCase() === wanted.toLowerCase());
      if (idx > -1) selectInstrument(idx);
    }
  }

  // AJAX form submit -> inline success message
  function handleFormSubmit(formEl, successEl) {
    if (!formEl || !successEl) return;
    formEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = new FormData(formEl);
      fetch(formEl.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(() => {
        formEl.style.display = 'none';
        successEl.style.display = 'block';
        successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }).catch(() => {
        formEl.submit();
      });
    });
  }
  handleFormSubmit(document.getElementById('applyForm'), document.getElementById('applySuccess'));
  handleFormSubmit(document.getElementById('enquiryForm'), document.getElementById('enquirySuccess'));
});
