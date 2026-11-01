import React, { useState, useRef } from 'react';
import logo from '../../image/logo.png';
import firstqu from '../../image/firstqu.png';
import robot from '../../image/robot.png';
import topic1Video from '../../image/topic1-video.mp4';
import './Tasks.css';

/* ── الموضوع الأول - Level 1 ── */
const QUESTIONS = [
  {
    title: 'اختر الإجابة الصحيحة',
    question: 'ما هي البرمجة؟',
    headerColor: 'blue',
    visual: 'thinking',
    options: [
      { letter: 'A', icon: '🎮', text: 'لعب الألعاب على الكمبيوتر' },
      { letter: 'B', icon: '💻', text: 'إعطاء الكمبيوتر تعليمات لتنفيذ مهمة معينة' },
      { letter: 'C', icon: '🎨', text: 'رسم الصور' },
      { letter: 'D', icon: '▶️', text: 'مشاهدة الفيديوهات' },
    ],
    correct: 1,
  },
  {
    title: 'أكمل الكود',
    question: 'تريد أن تجعل الكمبيوتر يكتب "Hello!" على الشاشة',
    headerColor: 'blue',
    visual: 'code',
    options: [
      { letter: 'A', text: 'print' },
      { letter: 'B', text: 'show' },
      { letter: 'C', text: 'write' },
      { letter: 'D', text: 'say' },
    ],
    correct: 0,
    answerCode: 'print("Hello!")',
  },
  {
    title: 'اختر الإجابة الصحيحة',
    question: 'تريد أن تجعل روبوتًا يصل إلى ⭐ . ماذا تحتاج أن تعطيه؟',
    headerColor: 'orange',
    visual: 'robot',
    options: [
      { letter: 'A', icon: '📋', text: 'تعليمات واضحة خطوة بخطوة' },
      { letter: 'B', icon: '🖼️', text: 'صورة' },
      { letter: 'C', icon: '🎵', text: 'أغنية' },
      { letter: 'D', icon: '🎮', text: 'لعبة' },
    ],
    correct: 0,
  },
];

/* ════════ شاشة الفيديو التوضيحي ════════ */
function VideoIntro({ videoSrc, onStart }) {
  const videoRef = useRef(null);
  const [ended, setEnded] = useState(false);

  const handleEnded = () => setEnded(true);

  return (
    <div className="quiz-page" dir="rtl">
      <header className="quiz-header">
        <img src={logo} alt="Logo" className="quiz-logo" />
        <button
          className="quiz-home-btn"
          onClick={() => window.history.back()}
          aria-label="الرئيسية"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </button>
      </header>

      <div className="video-intro-card">
        <div className="video-intro-label">
          <span className="video-play-icon">▶</span>
          <span>شاهد الشرح الأول</span>
        </div>
        <div className="video-wrap">
          <video
            ref={videoRef}
            src={videoSrc}
            controls
            onEnded={handleEnded}
            className="intro-video"
          />
        </div>
        <p className="video-hint">
          {ended
            ? 'انتهى الشرح! أنت جاهز لبدء التحدي 🎯'
            : 'شاهد الفيديو كاملاً ثم ابدأ الكويز'}
        </p>
        <button
          className={`video-start-btn ${ended ? 'ready' : ''}`}
          onClick={onStart}
        >
          {ended ? 'ابدأ الكويز 🚀' : 'تخطي وابدأ الكويز ⏭'}
        </button>
      </div>
    </div>
  );
}

/* ════════ المكوّن الرئيسي ════════ */
export default function Tasks({ onNavigate }) {
  const [phase, setPhase] = useState('video'); // 'video' | 'quiz' | 'done'
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));

  /* ── quiz helpers ── */
  const q = QUESTIONS[current];
  const selected = answers[current];
  const answered = selected !== null;
  const isLast = current === QUESTIONS.length - 1;

  const choose = (idx) => {
    if (answered) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = idx;
      return next;
    });
  };

  const goNext = () => {
    if (!answered) return;
    if (isLast) setPhase('done');
    else setCurrent((c) => c + 1);
  };

  const goPrev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const retry = () => {
    setCurrent(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setPhase('quiz');
  };

  const score = answers.reduce(
    (acc, a, i) => acc + (a === QUESTIONS[i].correct ? 1 : 0),
    0
  );

  const correctOption = q.options[q.correct];
  const progress = ((current + (answered ? 1 : 0)) / QUESTIONS.length) * 100;

  /* ══════ فيديو ══════ */
  if (phase === 'video') {
    return <VideoIntro videoSrc={topic1Video} onStart={() => setPhase('quiz')} />;
  }

  /* ══════ شاشة النتيجة ══════ */
  if (phase === 'done') {
    return (
      <div className="quiz-page" dir="rtl">
        <header className="quiz-header">
          <img src={logo} alt="Logo" className="quiz-logo" />
          <button
            className="quiz-home-btn"
            onClick={() => onNavigate?.('seven')}
            aria-label="الرئيسية"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </button>
        </header>

        <div className="quiz-done">
          <div className="done-emoji">🏆</div>
          <h2>أحسنت!</h2>
          <p>لقد أكملت الموضوع الأول في Level 1</p>
          <p className="done-score">
            إجابات صحيحة: {score} / {QUESTIONS.length}
          </p>
          <div className="done-stars">{'⭐'.repeat(score)}</div>
          <div className="done-btns">
            <button className="done-retry" onClick={retry}>إعادة المحاولة</button>
            <button className="done-home" onClick={() => onNavigate?.('seven')}>العودة للرئيسية</button>
          </div>
        </div>
      </div>
    );
  }

  /* ══════ الكويز ══════ */
  const renderVisual = () => {
    if (q.visual === 'thinking') {
      return (
        <div className="q-visual thinking-visual">
          <img src={firstqu} alt="طفل يفكر" />
          <span className="thinking-mark">؟</span>
        </div>
      );
    }
    if (q.visual === 'code') {
      return (
        <div className="q-visual code-visual">
          <div className="code-term">
            <div className="code-dots">
              <span className="dot red" />
              <span className="dot amber" />
              <span className="dot green" />
            </div>
            <span className="code-filename">python_quest.py</span>
            <div className="code-line">
              <span className="code-comment"># Part 1: Basics</span>
            </div>
            <div className="code-line">
              <span className="code-num">1</span>
              <span className="code-blank">________</span>
              <span className="code-punct">("Hello!")</span>
            </div>
          </div>
          <img src={robot} alt="روبوت" className="code-robot" />
        </div>
      );
    }
    // robot path
    return (
      <div className="q-visual robot-visual">
        <img src={robot} alt="روبوت" className="robot-img" />
        <div className="robot-path">
          <span className="path-tile" />
          <span className="path-tile" />
          <span className="path-tile active" />
          <span className="path-tile" />
          <span className="path-star">⭐</span>
        </div>
      </div>
    );
  };

  return (
    <div className="quiz-page" dir="rtl">
      {/* الهيدر */}
      <header className="quiz-header">
        <img src={logo} alt="Logo" className="quiz-logo" />
        <button
          className="quiz-home-btn"
          onClick={() => onNavigate?.('seven')}
          aria-label="الرئيسية"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </button>
      </header>

      {/* شريط التقدم */}
      <div className="quiz-progress-bar">
        <div className="progress-text">السؤال {current + 1} من {QUESTIONS.length}</div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* الكارت */}
      <div className={`quiz-card header-${q.headerColor}`}>
        {/* نجمة + عنوان */}
        <div className="quiz-card-head">
          <span className="star-badge">{current + 1}</span>
          <h2 className="quiz-card-title">{q.title}</h2>
        </div>

        {/* السؤال */}
        <p className="quiz-question">{q.question}</p>

        {/* المحتوى: بصري + خيارات */}
        <div className="quiz-body">
          <div className="quiz-visual-wrap">{renderVisual()}</div>

          <div className="q-options">
            {q.options.map((opt, i) => {
              const state = answered
                ? i === q.correct
                  ? 'correct'
                  : i === selected
                  ? 'wrong'
                  : 'dim'
                : selected === i
                ? 'chosen'
                : '';
              return (
                <button
                  type="button"
                  key={opt.letter}
                  className={`q-option ${state}`}
                  onClick={() => choose(i)}
                  disabled={answered}
                >
                  {opt.icon && <span className="opt-icon">{opt.icon}</span>}
                  <span className={`opt-text ${q.visual === 'code' ? 'mono' : ''}`}>
                    {opt.text}
                  </span>
                  <span className={`opt-radio ${state}`}>
                    {state === 'correct' && <span className="radio-dot correct-dot" />}
                    {state === 'wrong' && <span className="radio-dot wrong-dot" />}
                    {state === 'chosen' && <span className="radio-dot" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* الإجابة الصحيحة */}
        {answered && (
          <div className="quiz-footer">
            <span className="footer-check">✓</span>
            <span>
              الإجابة الصحيحة: <b>{correctOption.letter}</b>
              {q.answerCode ? (
                <code className="footer-code">{q.answerCode}</code>
              ) : (
                <span className="footer-text"> — {correctOption.text}</span>
              )}
            </span>
          </div>
        )}
      </div>

      {/* التنقل */}
      <div className="quiz-nav">
        <button className="q-back" onClick={goPrev} disabled={current === 0} aria-label="السابق">
          ‹
        </button>

        <div className="q-dots">
          {QUESTIONS.map((_, i) => (
            <span
              key={i}
              className={`q-dot ${i === current ? 'active' : ''} ${answers[i] !== null ? 'done' : ''}`}
            />
          ))}
        </div>

        <button className="q-next" onClick={goNext} disabled={!answered}>
          {isLast ? 'إنهاء' : 'التالي'}
          <span>›</span>
        </button>
      </div>
    </div>
  );
}
