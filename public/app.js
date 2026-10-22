(function () {
  'use strict';

  var AXIS_KEYS = AXES.map(function (a) { return a.key; });
  var TOTAL = QUESTIONS.length;

  var state = { index: 0, answers: new Array(TOTAL).fill(-1) };

  var $ = function (id) { return document.getElementById(id); };
  var screens = {
    intro: $('screen-intro'),
    quiz: $('screen-quiz'),
    result: $('screen-result')
  };

  /* ---------- Scoring ---------- */
  // Preguntas 1-6 (estilo): votan por época (era A..F).
  // Preguntas 7-12 (valores): puntúan en 3 ejes.

  var AXIS_MAX_QUESTIONS = 6; // primeras 6 preguntas = épocas
  var ERA_VOTES_MAX = 4; // cada época aparece exactamente 4 veces

  var axisMax = {};
  AXIS_KEYS.forEach(function (k) { axisMax[k] = 0; });
  QUESTIONS.forEach(function (q) {
    if (!q.options[0].score) return;
    var best = {};
    q.options.forEach(function (o) {
      if (!o.score) return;
      Object.keys(o.score).forEach(function (k) {
        best[k] = Math.max(best[k] || 0, Math.abs(o.score[k]));
      });
    });
    Object.keys(best).forEach(function (k) { axisMax[k] += best[k]; });
  });

  function eraVotes() {
    var votes = {};
    CULTURES.forEach(function (c) { votes[c.id] = 0; });
    state.answers.forEach(function (optIdx, qi) {
      if (optIdx < 0 || qi >= AXIS_MAX_QUESTIONS) return;
      var era = QUESTIONS[qi].options[optIdx].era;
      if (era && votes[era] !== undefined) votes[era]++;
    });
    return votes;
  }

  function userVector() {
    var v = {};
    AXIS_KEYS.forEach(function (k) { v[k] = 0; });
    state.answers.forEach(function (optIdx, qi) {
      if (optIdx < 0 || qi < AXIS_MAX_QUESTIONS) return;
      var score = QUESTIONS[qi].options[optIdx].score;
      if (!score) return;
      Object.keys(score).forEach(function (k) { v[k] += score[k]; });
    });
    AXIS_KEYS.forEach(function (k) {
      v[k] = Math.max(-10, Math.min(10, (v[k] / (axisMax[k] || 1)) * 10));
    });
    return v;
  }

  function affinityOf(user, votes, profile) {
    var voteRatio = (votes || 0) / ERA_VOTES_MAX;
    var sum = 0;
    AXIS_KEYS.forEach(function (k) {
      var diff = Math.abs(user[k] - profile[k]);
      sum += Math.max(0, 1 - diff / 18);
    });
    var closeness = sum / AXIS_KEYS.length;
    var t = Math.max(0, (closeness - 0.45) / 0.55);
    var valueScore = Math.pow(t, 0.85);
    return Math.round(100 * (0.55 * voteRatio + 0.45 * valueScore));
  }

  function rankCultures(user, votes) {
    return CULTURES.map(function (c) {
      return { culture: c, pct: affinityOf(user, votes[c.id], c.profile) };
    }).sort(function (a, b) { return b.pct - a.pct; });
  }

  /* ---------- Navigation ---------- */

  function show(name) {
    Object.keys(screens).forEach(function (k) {
      screens[k].hidden = k !== name;
    });
    document.body.classList.toggle('is-testing', name === 'quiz' || name === 'result');
    $('btn-home').hidden = name === 'intro';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function startTest() {
    state = { index: 0, answers: new Array(TOTAL).fill(-1) };
    show('quiz');
    renderQuestion();
  }

  function renderQuestion() {
    var q = QUESTIONS[state.index];
    $('progress-label').textContent = 'Pregunta ' + (state.index + 1) + ' de ' + TOTAL;
    $('question-theme').textContent = q.theme;
    $('progress-fill').style.width = ((state.index) / TOTAL) * 100 + '%';
    $('question-title').textContent = q.title;
    $('question-text').textContent = q.text;
    $('btn-back').style.visibility = state.index === 0 ? 'hidden' : 'visible';

    var box = $('options');
    box.innerHTML = '';
    q.options.forEach(function (o, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option' + (state.answers[state.index] === i ? ' is-picked' : '');
      btn.innerHTML = '<span class="option__key">' + (i + 1) + '</span><span>' + o.label + '</span>';
      btn.addEventListener('click', function () { pick(i); });
      box.appendChild(btn);
    });
  }

  function pick(i) {
    state.answers[state.index] = i;
    var buttons = $('options').children;
    Array.prototype.forEach.call(buttons, function (b, bi) {
      b.classList.toggle('is-picked', bi === i);
    });
    setTimeout(function () {
      if (state.index < TOTAL - 1) {
        state.index++;
        renderQuestion();
      } else {
        $('progress-fill').style.width = '100%';
        renderResults();
      }
    }, 260);
  }

  function back() {
    if (state.index > 0) {
      state.index--;
      renderQuestion();
    }
  }

  /* ---------- Results ---------- */

  function renderResults() {
    var user = userVector();
    var votes = eraVotes();
    var ranked = rankCultures(user, votes);
    var top = ranked[0];

    $('hero-emoji').textContent = top.culture.emoji;
    $('hero-name').textContent = top.culture.name;
    $('hero-place').textContent = top.culture.place + ' · ' + top.culture.period;
    $('hero-tagline').textContent = top.culture.tagline;
    $('hero-desc').textContent = top.culture.description;
    fillList('hero-fit', top.culture.fit);
    fillList('hero-friction', top.culture.friction);
    countUp($('hero-pct'), top.pct);

    var alts = $('alts');
    alts.innerHTML = '';
    ranked.slice(1, 3).forEach(function (r) {
      var el = document.createElement('div');
      el.className = 'alt';
      el.innerHTML =
        '<span class="alt__pct">' + r.pct + '%</span>' +
        '<h4>' + r.culture.emoji + ' ' + r.culture.name + '</h4>' +
        '<p class="alt__meta">' + r.culture.place + ' · ' + r.culture.period + '</p>' +
        '<p>' + r.culture.tagline + '</p>' +
        '<div class="alt__bar"><span style="width:0%"></span></div>';
      alts.appendChild(el);
      animateBar(el.querySelector('.alt__bar span'), r.pct);
    });

    var profile = $('profile');
    profile.innerHTML = '';
    AXES.forEach(function (axis) {
      var val = user[axis.key];
      var barWidth = Math.min(50, Math.abs(val) / 10 * 50);
      var el = document.createElement('div');
      el.className = 'axis';
      el.innerHTML =
        '<div class="axis__name">' + axis.label + '</div>' +
        '<div>' +
          '<div class="axis__poles"><span>' + axis.left + '</span><span>' + axis.right + '</span></div>' +
          '<div class="axis__track"><span class="axis__fill ' + (val >= 0 ? 'is-pos' : 'is-neg') + '" style="width:0%"></span></div>' +
        '</div>' +
        '<div class="axis__value">' + (val > 0 ? '+' : '') + val.toFixed(1) + '</div>';
      profile.appendChild(el);
      animateBar(el.querySelector('.axis__fill'), barWidth);
    });

    var ranking = $('ranking');
    ranking.innerHTML = '';
    ranked.forEach(function (r, i) {
      var el = document.createElement('div');
      el.className = 'rank' + (i === 0 ? ' rank--top' : '');
      el.innerHTML =
        '<span class="rank__pos">' + (i + 1) + '.</span>' +
        '<span class="rank__name">' + r.culture.name + '<small>' + r.culture.period + ' · ' + r.culture.place + '</small></span>' +
        '<span class="rank__bar"><span style="width:0%"></span></span>' +
        '<span class="rank__pct">' + r.pct + '%</span>';
      ranking.appendChild(el);
      animateBar(el.querySelector('.rank__bar span'), r.pct);
    });

    state.ranked = ranked;
    show('result');
  }

  function fillList(id, items) {
    var ul = $(id);
    ul.innerHTML = '';
    items.forEach(function (t) {
      var li = document.createElement('li');
      li.textContent = t;
      ul.appendChild(li);
    });
  }

  function animateBar(el, pct) {
    setTimeout(function () { el.style.width = pct + '%'; }, 80);
  }

  function countUp(el, target) {
    var duration = 900;
    var start = null;
    var done = false;
    function finish() {
      if (done) return;
      done = true;
      el.textContent = target + '%';
    }
    function step(ts) {
      if (done) return;
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + '%';
      if (p < 1) requestAnimationFrame(step);
      else finish();
    }
    el.textContent = '0%';
    if (typeof requestAnimationFrame === 'function') requestAnimationFrame(step);
    setTimeout(finish, duration + 150);
  }

  /* ---------- Share ---------- */

  function share() {
    if (!state.ranked) return;
    var top = state.ranked[0];
    var text = 'Habría encajado mejor en ' + top.culture.name +
      ' (' + top.pct + '% de afinidad) — test "¿Con qué época encajas?"';
    var done = function () {
      var msg = $('share-msg');
      msg.hidden = false;
      setTimeout(function () { msg.hidden = true; }, 2500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallbackCopy);
    } else {
      fallbackCopy();
    }
    function fallbackCopy() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { /* noop */ }
      document.body.removeChild(ta);
    }
  }

  /* ---------- Events ---------- */

  $('btn-start').addEventListener('click', startTest);
  $('btn-back').addEventListener('click', back);
  $('btn-restart').addEventListener('click', startTest);
  $('btn-home').addEventListener('click', function () { show('intro'); });
  $('btn-share').addEventListener('click', share);

  document.addEventListener('keydown', function (e) {
    if (screens.quiz.hidden) return;
    var n = parseInt(e.key, 10);
    if (n >= 1 && n <= QUESTIONS[state.index].options.length) pick(n - 1);
    if (e.key === 'Backspace' || e.key === 'ArrowLeft') back();
  });

  show('intro');
})();
