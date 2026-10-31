import React, { useState } from 'react';
import logo from '../../image/logo.png';
import firstqu from '../../image/firstqu.png';
import robot from '../../image/robot.png';
import './Tasks.css';

// الموضوع الأول - Level 1 : ثلاث أسئلة تفاعلية
const QUESTIONS = [
  {
    title: 'اختر الإجابة الصحيحة',
    question: 'ما هي البرمجة ؟',
    border: 'blue',
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
    question: 'تريد أن تجعل الكمبيوتر يكتب "Hello!" على الشاشة.',
    border: 'purple',
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
    question: 'تريد أن تجعل روبوتًا يصل إلى ⭐ . ماذا تحتاج أن تعطيه ؟',
    border: 'orange',
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

export default function Tasks({ onNavigate, language }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([null, null, null]);
  const [finished, setFinished] = useState(false);

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
    if (isLast) setFinished(true);
    else setCurrent((c) => c + 1);
  };

  const goPrev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const retry = () => {
    setCurrent(0);
    setAnswers([null, null, null]);
    setFinished(false);
  };

  const score = answers.reduce(
    (acc, a, i) => acc + (a === QUESTIONS[i].correct ? 1 : 0),
    0
  );

  const correctOption = q.options[q.correct];

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
            <span className="code-hint">💡</span>
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
    // robot path to star
    return (
      <div className="q-visual robot-visual">
        <img src={robot} alt="روبوت" className="robot-img" />
        <span className="robot-path">⋯⋯⋯</span>
        <span className="robot-star">⭐</span>
      </div>
    );
  };

  if (finished) {
    return (
      <div className="quiz-page">
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
            <button className="done-retry" onClick={retry}>
              إعادة المحاولة
            </button>
            <button className="done-home" onClick={() => onNavigate?.('seven')}>
              العودة للرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
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

      <div className={`quiz-card border-${q.border}`} dir="rtl">
        <div className="quiz-card-head">
          <span className="star-badge">{current + 1}</span>
          <h2 className="quiz-card-title">{q.title}</h2>
        </div>

        <p className="quiz-question">{q.question}</p>

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
                  <span className="opt-letter">{opt.letter}</span>
                  <span className={`opt-text ${q.visual === 'code' ? 'mono' : ''}`}>
                    {opt.text}
                  </span>
                  {state === 'correct' && <span className="opt-check">✓</span>}
                  {state === 'wrong' && <span className="opt-cross">✕</span>}
                </button>
              );
            })}
          </div>
        </div>

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

      <div className="quiz-nav">
        <button
          className="q-back"
          onClick={goPrev}
          disabled={current === 0}
          aria-label="السابق"
        >
          ‹
        </button>

        <div className="q-dots">
          {QUESTIONS.map((_, i) => (
            <span
              key={i}
              className={`q-dot ${i === current ? 'active' : ''} ${
                answers[i] !== null ? 'done' : ''
              }`}
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
