import React, { useState, useEffect } from 'react';
import { Translations } from '../../TransLation';
import './First.css';

export default function First({ onNavigate, language: propLanguage, setLanguage }) {
  const [progress, setProgress] = useState(0);
  
  const [language, setLocalLanguage] = useState(() => {
    return propLanguage || localStorage.getItem('app_lang') || 'ar';
  });

  useEffect(() => {
    if (propLanguage) {
      setLocalLanguage(propLanguage);
    }
  }, [propLanguage]);

  const t = Translations[language];

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem('app_lang', language);
  }, [language]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100 && typeof onNavigate === 'function') {
      onNavigate('two');
    }
  }, [progress, onNavigate]);

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLocalLanguage(newLang);
    if (setLanguage) {
      setLanguage(newLang);
    }
  };

  return (
    <div className="game-container">
      
      {/* زر تغيير اللغة */}
      <div className="language-container">
        <button className="language-btn" onClick={toggleLanguage} title={t.languageLabel || "Change Language"}>
          <svg 
            className="lang-icon-svg" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            width="24px"
            height="24px"
          >
            <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
          </svg>
        </button>
      </div>

      {/* مكان الصورة الجديدة بدلاً من العنوان القديم (ضعي مسار صورتك في الـ src) */}
      <div className="custom-top-image-container">
        <img src={t.sixlogin} alt="Top Logo or Image" className="custom-top-image" />
      </div>

      {/* شريط التحميل السفلي */}
      <div className="loader-footer">
        <p className="loader-text">{t.loadingText}</p>
        <div className="progress-bar-track">
          <div 
            className="progress-bar-fil" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="progress-percentage">{progress}%</span>
      </div>
    </div>
  );
}