import React, { useState, useEffect } from 'react';
import { Translations } from '../../TransLation';
import './Eight.css';
import rbot from '../../image/robot.png';


export default function Eight({ onNavigate, language }) {
  const currentLang = language || 'ar';
  const t = Translations[currentLang];

  const questionsData = t.eightQuestions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(900); // 15 دقيقة

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSelectOption = (optIdx) => {
    setSelectedAnswers({ ...selectedAnswers, [currentIndex]: optIdx });
  };

  // جدول الإجابات الصحيحة (يبدأ العد من 0)
  const correctAnswersMap = {
    0: 1,
    1: 1,
    2: 1,
    3: 1,
    4: 0,
    5: 0,
    6: 2,
    7: 1,
    8: 2,
    9: 0,
    10: 2,
    11: 1,
    12: 2,
    13: 2,
    14: 1,
    15: 1
  };

  const finishQuiz = () => {
    let score = 0;

    console.log("--- تصحيح الاختبار ---");
    questionsData.forEach((q, idx) => {
      const userChoice = selectedAnswers[idx];
      const correctIdx = correctAnswersMap[idx];
      
      const isCorrect = userChoice !== undefined && userChoice === correctIdx;
      if (isCorrect) {
        score += 1;
      }
      console.log(`السؤال ${idx + 1}: اختيار المستخدم =`, userChoice, `| الإجابة الصحيحة =`, correctIdx, `| النتيجة:`, isCorrect ? 'صح ✅' : 'خطأ ❌');
    });

    console.log("إجمالي النقاط الصحيحة (Score):", score);

    // شروط النجوم المحدثة بدقة:
    // - 0 -> 0 نجوم
    // - من 1 إلى 4 -> نجمة واحدة (1)
    // - من 4 إلى 8 -> نجمتان (2)
    // - من 8 إلى 12 -> 3 نجوم (3)
    // - من 12 إلى 16 -> 4 نجوم (4)
    let starsCount = 0;
    
    if (score >= 12) {
      starsCount = 4;
    } else if (score >= 8) {
      starsCount = 3;
    } else if (score >= 4) {
      starsCount = 2;
    } else if (score >= 1) {
      starsCount = 1;
    } else {
      starsCount = 0;
    }

    console.log("عدد النجوم المحسوبة (Stars):", starsCount);

    localStorage.setItem('quizScore', score);
    localStorage.setItem('quizStars', starsCount);

    if (onNavigate) {
      onNavigate('nine');
    }
  };

  const handleNext = () => {
    if (currentIndex < questionsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const progressPercent = ((currentIndex + 1) / questionsData.length) * 100;
  const currentQuestion = questionsData[currentIndex] || {};

  return (
    <div className="eight-container" dir="rtl">
      <div className="eight-header">
        <div className="eight-logo-box">
          <img src={t.sixlogin} alt="Logo" className="eight-logo-img" />
        </div>

        <div className="eight-progress-capsule">
          <span className="eight-progress-text">
            {t.eightQuestionLabel} {currentIndex + 1} {t.eightOfLabel} {questionsData.length}
          </span>
          <div className="eight-progress-bar-bg">
            <div className="eight-progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        <div className="eight-timer-capsule">
          <span className="timer-icon">⏰</span>
          <span className="timer-text">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="eight-card">
        <h2 className="eight-question-title">{currentQuestion.question}</h2>

        <div className="eight-content-grid">
          <div className="eight-right-side-group">
            <div className="eight-robot-box">
              <div className="eight-robot-msg">{currentQuestion.robotMsg}</div>
              <img src={rbot} alt="Robot" className="eight-robot-img-tag" />
            </div>

            <div className="eight-terminal">
              <div className="eight-terminal-header">
                <div className="eight-terminal-dots">
                  <div className="dot red"></div>
                  <div className="dot yellow"></div>
                  <div className="dot green"></div>
                </div>
                <span className="eight-terminal-title">python_quest.py</span>
              </div>
              <pre className="eight-terminal-code">{currentQuestion.code}</pre>
            </div>
          </div>

          <div className="eight-left-side-options">
            {currentQuestion.options && currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentIndex] === idx;
              return (
                <div 
                  key={idx} 
                  onClick={() => handleSelectOption(idx)} 
                  className={`eight-option-card ${isSelected ? 'selected' : ''}`}
                >
                  <span className="eight-option-text">{option}</span>
                  <div className={`eight-radio-circle ${isSelected ? 'selected' : ''}`}>
                    {isSelected && <div className="eight-radio-inner"></div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="eight-nav-footer">
          <div>
            {currentIndex > 0 && (
              <button onClick={handlePrev} className="eight-btn prev-btn">
                <span>{t.eightPrevBtn}</span>
              </button>
            )}
          </div>

          <button onClick={handleNext} className="eight-btn next-btn">
            <span>{currentIndex === questionsData.length - 1 ? t.eightFinishBtn : t.eightNextBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
}