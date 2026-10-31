import React, { useState } from 'react';
import { Translations } from '../../TransLation';
import robotImg from '../../image/robot.png';
import girlImg from '../../image/girl.png';
import boyImg from '../../image/boy.png';

import './Four.css';

export default function Four({ onNavigate, language, setLanguage }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('BraveExplorer25');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('hero'); // 'hero' أو 'heroine'

  const t = Translations[language || 'ar'];

  // شرط التحقق: هل كل البيانات الأساسية تم إدخالها؟
  const isFormComplete = 
    firstName.trim() !== '' &&
    lastName.trim() !== '' &&
    birthDate.trim() !== '' &&
    email.trim() !== '' &&
    password.trim() !== '';

  // دالة الانتقال لصفحة Three.jsx عند الضغط على السهم
  const handleBackClick = () => {
    if (onNavigate) {
      onNavigate('three'); 
    } else {
      window.location.href = './Three.jsx';
    }
  };

  // دالة الضغط على زر المتابعة للانتقال إلى صفحة Five.jsx
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormComplete) return; // منع الإرسال لو فيه حقول ناقصة
    
    if (onNavigate) {
      onNavigate('five'); // الانتقال لصفحة Five.jsx بنجاح
    } else {
      window.location.href = './Five.jsx';
    }
  };

  return (
    <div className="four-page-wrapper">
      <div className="four-container">
        
        {/* زر السهم في أقصى اليسار تماماً */}
        <button className="back-arrow-btn" onClick={handleBackClick} aria-label={t.fourBackAria}>
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>

        {/* اللوجو العلوي في أقصى اليمين */}
        <div className="top-right-logo">
          <img src={t.sixlogin} alt={t.fourBrandTitle} className="main-logo-img" />
        </div>

        {/* صندوق النموذج الرئيسي (الجدول الأبيض) */}
        <div className="main-form-card">
          <div className="form-head-title">
            <h2>{t.fourFormTitle}</h2>
            <p>{t.fourFormSub}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="inputs-grid">
              
              {/* الاسم الثاني */}
              <div className="input-box">
                <label>{t.fourLastNameLabel}</label>
                <input
                  type="text"
                  placeholder={t.fourLastNamePlaceholder}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              {/* الاسم الأول */}
              <div className="input-box">
                <label>{t.fourFirstNameLabel}</label>
                <input
                  type="text"
                  placeholder={t.fourFirstNamePlaceholder}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              {/* اسم المستخدم */}
              <div className="input-box">
                <div className="label-row">
                  <label>{t.fourUsernameLabel}</label>
                  <button type="button" className="change-user-btn" onClick={() => setUsername('BraveExplorer' + Math.floor(Math.random() * 90 + 10))}>
                    <span>🔄</span> {t.fourChangeUserBtn}
                  </button>
                </div>
                <div className="input-with-icon-wrap">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <span className="check-mark">✓</span>
                </div>
                <span className="helper-msg">{t.fourUsernameAvailable}</span>
              </div>

              {/* تاريخ الميلاد */}
              <div className="input-box">
                <label>{t.fourBirthDateLabel}</label>
                <div className="input-with-icon-wrap">
                  <input
                    type="text"
                    placeholder={t.fourBirthDatePlaceholder}
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                  <span className="side-icon">📅</span>
                </div>
              </div>

              {/* البريد الإلكتروني */}
              <div className="input-box">
                <label>{t.fourEmailLabel}</label>
                <div className="input-with-icon-wrap">
                  <input
                    type="email"
                    placeholder={t.fourEmailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="side-icon">✉️</span>
                </div>
              </div>

              {/* كلمة المرور */}
              <div className="input-box">
                <label>{t.fourPasswordLabel}</label>
                <div className="input-with-icon-wrap">
                  <input
                    type="password"
                    placeholder={t.fourPasswordPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="side-icon">🔒</span>
                </div>
              </div>

            </div>

            {/* قسم اختيار الشخصية: البطلة على اليسار، كلمة "من أنت؟" في المنتصف تماماً، والبطل على اليمين */}
            <div className="who-are-you-section">
              <div className="avatars-row">
                
                {/* البطلة */}
                <div
                  className={`avatar-option ${selectedAvatar === 'heroine' ? 'selected' : ''}`}
                  onClick={() => setSelectedAvatar('heroine')}
                >
                  <div className="radio-circle"></div>
                  <img className="avatar-image" src={girlImg} alt={t.fourAvatarHeroine} />
                  <span className="avatar-label">{t.fourAvatarHeroine}</span>
                </div>

                {/* كلمة من أنت؟ في المنتصف تماماً */}
                <div className="who-title-center">
                  <p>{t.fourWhoAreYou}</p>
                </div>

                {/* البطل */}
                <div
                  className={`avatar-option ${selectedAvatar === 'hero' ? 'selected' : ''}`}
                  onClick={() => setSelectedAvatar('hero')}
                >
                  <div className="radio-circle"></div>
                  <img className="avatar-image" src={boyImg} alt={t.fourAvatarHero} />
                  <span className="avatar-label">{t.fourAvatarHero}</span>
                </div>

              </div>
            </div>

            {/* زر المتابعة */}
            <button 
              type="submit" 
              className="continue-btn"
              disabled={!isFormComplete}
            >
              {t.fourContinueBtn}
            </button>
          </form>
        </div>

        {/* عناصر الديكور والروبوت في اليمين بالأسفل (مطابق للصورة تماماً) */}
        <div className="background-decorations">
          <div className="robot-greeting-box">
            <p className="robot-top-text">{t.fourRobotTitle}</p>
            <h3 className="robot-highlight-title">{t.fourRobotNeon}</h3>
            <p className="robot-desc-text">{t.fourRobotDesc}</p>
          </div>
          
          <img 
            src={robotImg} 
            alt="Coding Robot" 
            className="robot-character-img" 
          />
        </div>

      </div>
    </div>
  );
}