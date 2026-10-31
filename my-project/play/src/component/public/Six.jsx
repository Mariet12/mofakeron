import React from 'react';
import { Translations } from '../../TransLation';
import './Six.css';
       
import boyRobot from '../../image/Screenshot_2026-09-07_023230-removebg-preview 1.png'; 

export default function Six({ onNavigate, language, setLanguage }) {
  
  const currentLang = language || 'ar';
  const t = Translations[currentLang];

  const handleStartClick = () => {
    if (onNavigate) {
      onNavigate('eight');
    }
  };

  const handleStar = () => {
    if (onNavigate) {
      onNavigate('seven');
    }
  };
  return (
    <div className="six-container" dir="rtl">
      
      {/* 1. الهيدر (اللوجو) */}
      <div className="six-header-image-container" >
        <img src={t.sixlogin} alt="صورة الهيدر" className="six-header-img" />
      </div>
      
      {/* 2. زر الرئيسية */}
      <button className="six-home-btn" aria-label={t.sixHomeAria} onClick={handleStar}>
        <svg viewBox="0 0 24 24" width="33" height="33" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      </button>

      {/* 3. المحتوى الرئيسي */}
      <main className="six-main-content">
        <div className="six-content-layout">
          
          {/* الكارد الأبيض (النص، الإحصائيات، والزرار) */}
          <div className="six-card-wrapper">
            
            <div className="six-welcome-box">
              <h1 className="six-title">
                  <span className="six-star">⭐</span>{t.sixTitle}
              </h1>
              <p className="six-subtitle" dangerouslySetInnerHTML={{ __html: t.sixSubtitle }} />
              <p className="six-note" dangerouslySetInnerHTML={{ __html: t.sixNote }} />
            </div>

            <div className="six-stats-box">
              <div className="six-stat-item">
                <div className="six-stat-icon-wrapper star-bg">
                  <span className="six-stat-icon">🕒</span>
                </div>
                <div className="six-stat-info">
                  <span className="six-stat-label">{t.sixTimeLabel}</span>
                  <span className="six-stat-value">{t.sixTimeValue}</span>
                </div>
              </div>

              <div className="six-divider"></div>

              <div className="six-stat-item">
                <div className="six-stat-icon-wrapper question-bg">
                  <span className="six-stat-icon">?</span>
                </div>
                <div className="six-stat-info">
                  <span className="six-stat-label">{t.sixQuestionsLabel}</span>
                  <span className="six-stat-value">{t.sixQuestionsValue}</span>
                </div>
              </div>

              <div className="six-divider"></div>

              <div className="six-stat-item">
                <div className="six-stat-icon-wrapper time-bg">
                  <span className="six-stat-icon">⭐</span>
                </div>
                <div className="six-stat-info">
                  <span className="six-stat-label">{t.sixSkillsLabel}</span>
                  <span className="six-stat-value">{t.sixSkillsValue}</span>
                </div>
              </div>
            </div>

            <div className="six-action-box">
              <button className="six-start-btn" onClick={handleStartClick}>
                <span>{t.sixStartBtn}</span>
                <span className="six-arrow">&gt;&gt;</span>
              </button>
            </div>

          </div>

        </div>
        
        <div className="six-illustration-container">
            <img src={boyRobot} alt="ولد مع روبوت" className="six-boy-robot-img" />
        </div>
      </main>
    </div>
  );
}