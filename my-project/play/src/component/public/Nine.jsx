import React, { useEffect, useState } from 'react';
import { Translations } from '../../TransLation';
import './Nine.css';

import kass from '../../image/Frame 135.png';

export default function Nine({ onNavigate, language }) {
  const currentLang = language || 'ar';
  const t = Translations[currentLang];

  const [stars, setStars] = useState(3);
  const [score, setScore] = useState(0);
  const [levelTitle, setLevelTitle] = useState('');

  useEffect(() => {
    // جلب النجوم والنتيجة المخزنة من الاختبار
    const savedStars = localStorage.getItem('quizStars');
    const savedScore = localStorage.getItem('quizScore');

    if (savedStars) {
      const sCount = Number(savedStars);
      setStars(sCount);
      
      if (sCount === 4) {
        setLevelTitle(t.nineLevels.pro);
      } else if (sCount === 3) {
        setLevelTitle(t.nineLevels.intermediate);
      } else if (sCount === 2) {
        setLevelTitle(t.nineLevels.advancedBeginner);
      } else {
        setLevelTitle(t.nineLevels.beginner);
      }
    } else {
      setLevelTitle(t.nineLevels.beginner);
    }

    if (savedScore) {
      setScore(Number(savedScore));
    }
  }, [currentLang]); // عشان يتحدث لو اللغة اتغيرت

  
  const handleStar = () => {
    if (onNavigate) {
      onNavigate('seven');
    }
  };
  const handleStartJourney = () => {
    if (onNavigate) {
      onNavigate('ten');
    }
  };

  return (
    <div className="nine-container" dir="rtl">
      
      {/* اللوجو في أعلى اليسار */}
      <div className="nine-top-logo">
        <img src={t.sixlogin} alt="Logo" className="nine-logo-img" />
      </div>

      {/* زر الرئيسة (الهوم) */}
      <button className="six-home-btn" onClick={handleStar} aria-label={t.nineHomeAria}>
        <svg viewBox="0 0 24 24" width="33" height="33" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      </button>

      {/* البطاقة البيضاء الرئيسية في المنتصف */}
      <div className="nine-main-card">

        {/* مكان الصورة في أعلى البطاقة */}
        <div className="nine-top-image-badge">
          <img src={kass} alt="Top Icon" className="nine-badge-img-tag" />
        </div>

        {/* شريط "أحسنت يا بطل!" */}
        <div className="nine-congrats-banner">
          <span>{t.nineCongrats}</span>
        </div>

        <h2 className="nine-success-title">{t.nineSuccessTitle}</h2>

        {/* الكبسولة الزرقاء */}
        <div className="nine-score-capsule">
          
          {/* تفاصيل المستوى والنجوم المكبرة */}
          <div className="nine-level-details">
            <span className="nine-level-label">{t.nineLevelPrefix}</span>
            <span className="nine-level-name">{levelTitle}</span>
            
            <div className="nine-stars-group">
              {[1, 2, 3, 4].map((starIndex) => (
                <span 
                  key={starIndex} 
                  className={`nine-star ${starIndex <= stars ? 'active' : 'inactive'}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* ورقة الشجر على الجانب */}
          <div className="nine-leaf-side-box">
            🌱
          </div>

        </div>

        {/* رسالة التشجيع */}
        <p className="nine-footer-msg">{t.nineFooterMsg}</p>

        {/* زر "ابدأ رحلتي" الأخضر */}
        <button className="nine-start-btn" onClick={handleStartJourney}>
          <span>{t.nineStartJourneyBtn}</span>
        </button>

      </div>
    </div>
  );
}