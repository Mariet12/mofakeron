import React, { useState } from 'react';
import { Translations } from '../../TransLation'; 
import './Three.css';

export default function Three({ onNavigate, language, setLanguage }) {
  const [selectedRole, setSelectedRole] = useState(null);

  const t = Translations[language || 'ar'];

  const handleBack = () => {
    onNavigate('two'); // الانتقال إلى الصفحة الثانية
  };

  const handleContinue = () => {
    if (selectedRole === 'student') {
      onNavigate('four'); // Student signup
    } else if (selectedRole === 'teacher') {
      onNavigate('teacher-signup'); // Teacher signup
    }
  };

  return (
    <div className="account-container">
      {/* زر السهم العلوي */}
      <button className="back-arrow-btn" onClick={handleBack} aria-label={t.backAriaLabel}>
        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>

      {/* النافذة البيضاء المركزية */}
      <div className="account-card">
        <h2>{t.chooseRoleTitle}</h2>
        <p className="subtitle">{t.chooseRoleSubtitle}</p>

        <div className="roles-grid">
          {/* كارت طالب */}
          <div 
            className={`role-option ${selectedRole === 'student' ? 'selected' : ''}`}
            onClick={() => setSelectedRole('student')}
          >
            <div className="icon-badge">🎓</div>
            <h3>{t.studentRoleTitle}</h3>
            <p>{t.studentRoleDesc}</p>
            <div className="radio-circle">
              {selectedRole === 'student' && <div className="radio-dot"></div>}
            </div>
          </div>

          {/* كارت مدرس */}
          <div 
            className={`role-option ${selectedRole === 'teacher' ? 'selected' : ''}`}
            onClick={() => setSelectedRole('teacher')}
          >
            <div className="icon-badge">👩‍🏫</div>
            <h3>{t.teacherRoleTitle}</h3>
            <p>{t.teacherRoleDesc}</p>
            <div className="radio-circle">
              {selectedRole === 'teacher' && <div className="radio-dot"></div>}
            </div>
          </div>
        </div>

        {/* زر المتابعة */}
        <button 
          className={`continue-btn ${selectedRole ? 'active' : 'disabled'}`}
          onClick={handleContinue}
          disabled={!selectedRole}
        >
          {t.continueBtn}
        </button>
      </div>
    </div>
  );
}
