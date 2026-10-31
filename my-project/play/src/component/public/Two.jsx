import React, { useState, useEffect } from 'react';
import { Translations } from '../../TransLation';
import './Two.css';

export default function Two({ onNavigate, language: propLanguage, setLanguage: propSetLanguage }) {
  const [language, setLanguage] = useState(() => {
    return propLanguage || localStorage.getItem('app_lang') || 'ar';
  });

  useEffect(() => {
    if (propLanguage) {
      setLanguage(propLanguage);
    }
  }, [propLanguage]);

  // حالة لتحديد الكارت الذي يتم عمل Hover عليه
  const [hoveredFeature, setHoveredFeature] = useState(null);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = Translations[language];
  const handleStartClick = () => {
    if (onNavigate) {
      onNavigate('six');
    }
  };

  const handleAction = (actionType) => {
    console.log(`تم النقر على: ${actionType}`);
  };

  return (
    <div className="two-container">
      <div className="main-content-card">
        
        {/* اللوجو البارز على حافة الكارت */}
        <div className="custom-logo-wrapper">
          <img src={t.sixlogin} alt="مفكرون" className="custom-logo-img" />
        </div>

        {/* العنوان والوصف */}
        <div className="intro-text-section">
          <h2>{t.welcomeHeading}</h2>
          <p>{t.welcomeDesc}</p>
        </div>

        {/* صف الميزات مع تفاعل الـ Hover */}
        <div className="features-row">
          <div 
            className="feature-item"
            onMouseEnter={() => setHoveredFeature('feat1')}
            onMouseLeave={() => setHoveredFeature(null)}
          >
            <span className="feat-icon">🏆</span>
            <p>{t.feat1Title}</p>
            <small>{t.feat1Desc}</small>
            {hoveredFeature === 'feat1' && (
              <div className="feature-popup">
                <span>{language === 'ar' ? '🌟 تتبع مستواك واحصل على جوائز وأوسمة عند حل كل تحدي برمجي!' : '🌟 Track your progress and earn badges as you solve coding challenges!'}</span>
              </div>
            )}
          </div>

          <div 
            className="feature-item"
            onMouseEnter={() => setHoveredFeature('feat2')}
            onMouseLeave={() => setHoveredFeature(null)}
          >
            <span className="feat-icon">🤖</span>
            <p>{t.feat2Title}</p>
            <small>{t.feat2Desc}</small>
            {hoveredFeature === 'feat2' && (
              <div className="feature-popup">
                <span>{language === 'ar' ? '💡 مساعد ذكي يوجهك خطوة بخطوة بدون ما يعطيك الإجابة مباشرة!' : '💡 A smart assistant guiding you step-by-step without spoiling answers!'}</span>
              </div>
            )}
          </div>

          <div 
            className="feature-item"
            onMouseEnter={() => setHoveredFeature('feat3')}
            onMouseLeave={() => setHoveredFeature(null)}
          >
            <span className="feat-icon">🎮</span>
            <p>{t.feat3Title}</p>
            <small>{t.feat3Desc}</small>
            {hoveredFeature === 'feat3' && (
              <div className="feature-popup">
                <span>{language === 'ar' ? '🚀 العاب تفاعلية مصممة لتعليم التفكير المنطقي بطريقة ممتعة!' : '🚀 Interactive games designed to teach logical thinking in a fun way!'}</span>
              </div>
            )}
          </div>
        </div>

        {/* أزرار الدخول */}
        <div className="auth-buttons-section">
          <button type="button" className="google-login-btn" onClick={ handleStartClick }>
            <span className="google-icon">G</span>
            <span>{t.googleLogin}</span>
          </button>
          
          {/* زر إنشاء حساب جديد مع تمرير الدالة بشكل سليم */}
          <button 
            type="button" 
            className="new-account-btn" 
            onClick={() => {
              if (onNavigate) {
                onNavigate('three');
              } else {
                console.error("خطأ: onNavigate غير متوفرة!");
              }
            }}
          >
            <span className="email-icon">✉️</span>
            <span>{t.newAccount}</span>
          </button>
        </div>

        {/* رابط الاستكشاف */}
        <div className="explore-footer">
          <span onClick={() => handleAction('Guest')} className="explore-link">
            {t.guestExplore}
          </span>
        </div>

      </div>
    </div>
  );
}