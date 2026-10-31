import React, { useState } from 'react';
import { Translations } from '../../TransLation';
import './TeacherSignup.css';
import bgImage from '../../image/four.jpeg'; 
import robotImg from '../../image/seven-robot-transparent.png'; 

export default function TeacherSignup({ onNavigate, language }) {
  const t = Translations[language || 'ar'];
  const [step, setStep] = useState(1);

  // 1. إضافة State لحفظ بيانات الفورم للخطوة الأولى
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    institution: '',
    password: ''
  });

  // 2. إضافة State لحفظ الملفات المرفوعة في الخطوة الثانية
  const [verificationFiles, setVerificationFiles] = useState({
    idFront: null,
    idBack: null,
    cv: null
  });

  // دالة لتحديث البيانات مع الكتابة للخطوة الأولى
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // دالة التعامل مع رفع الملفات للخطوة الثانية
  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      setVerificationFiles(prev => ({ ...prev, [fileType]: file }));
    }
  };

  // التحقق إن كل حقول الخطوة الأولى تم ملؤها
  const isStep1Complete = 
    formData.firstName.trim() !== '' &&
    formData.lastName.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.phone.trim() !== '' &&
    formData.subject.trim() !== '' &&
    formData.institution.trim() !== '' &&
    formData.password.trim() !== '';

  // التحقق إن كل ملفات الخطوة الثانية تم رفعها
  const isStep2Complete = 
    verificationFiles.idFront !== null &&
    verificationFiles.idBack !== null &&
    verificationFiles.cv !== null;

  const handleBack = () => {
    if (step === 1) {
      onNavigate('three'); 
    } else {
      setStep(step - 1);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && !isStep1Complete) return; 
    if (step === 2 && !isStep2Complete) return; 
    if (step < 3) {
      setStep(step + 1);
    }
  };

  // تعديل الانتقال للصفحة الثانية (Two.jsx)
  const handleFinish = () => {
    onNavigate('two'); 
  };

  return (
    <div className="teacher-page-wrapper" dir={language === 'en' ? 'ltr' : 'rtl'} style={{ backgroundImage: `url(${bgImage})` }}>
      
      {step < 3 && (
        <button className="back-arrow-btn" onClick={handleBack} aria-label={t.backAriaLabel}>
           <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        </button>
      )}

      <div className="teacher-card">
        
        {/* Step 1: Form */}
        {step === 1 && (
          <div className="teacher-step fade-in">
            <div className="teacher-header">
              <span className="teacher-badge">{t.teacherBadge}</span>
              <h2>{t.teacherTitle}</h2>
              <p>{t.teacherSubtitle}</p>
            </div>

            <form onSubmit={handleNext} className="teacher-form">
              <div className="form-row">
                <div className="form-group">
                  <label>{t.teacherFirstName}</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder={t.teacherFirstNamePlaceholder} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>{t.teacherLastName}</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder={t.teacherLastNamePlaceholder} 
                    required 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{t.teacherEmail}</label>
                  <div className="input-with-icon">
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.teacherEmailPlaceholder} 
                      required 
                    />
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                </div>
                <div className="form-group">
                  <label>{t.teacherPhone}</label>
                  <div className="input-with-icon">
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t.teacherPhonePlaceholder} 
                      required 
                    />
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{t.teacherSubject}</label>
                  <div className="input-with-icon">
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t.teacherSubjectPlaceholder} 
                      required 
                    />
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                  </div>
                </div>
                <div className="form-group">
                  <label>{t.teacherInstitution}</label>
                  <input 
                    type="text" 
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder={t.teacherInstitutionPlaceholder} 
                    required 
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>{t.teacherPassword}</label>
                <div className="input-with-icon">
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={t.teacherPasswordPlaceholder} 
                    required 
                  />
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
              </div>

              <button 
                type="submit" 
                className={`teacher-submit-btn ${!isStep1Complete ? 'disabled' : ''}`}
                disabled={!isStep1Complete}
              >
                {t.teacherCreateBtn}
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Verification */}
        {step === 2 && (
          <div className="teacher-step fade-in">
            <div className="teacher-header">
              <h2>{t.teacherVerifyTitle}</h2>
              <p>{t.teacherVerifySubtitle}</p>
            </div>

            <div className="teacher-form">
              <div className="upload-section">
                <h3 className="section-title">{t.teacherIdCard}</h3>
                <div className="upload-grid">
                  
                  <div className="upload-box">
                    <p className="upload-label">{t.teacherIdFront}</p>
                    <label className={`upload-area ${verificationFiles.idFront ? 'success' : ''}`}>
                      <input 
                        type="file" 
                        accept="image/*" 
                        style={{ display: 'none' }} 
                        onChange={(e) => handleFileChange(e, 'idFront')} 
                      />
                      <svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="upload-icon"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      <span>{verificationFiles.idFront ? verificationFiles.idFront.name : t.teacherUploadImg}</span>
                      <small>{t.teacherUploadFormat}</small>
                    </label>
                  </div>

                  <div className="upload-box">
                    <p className="upload-label">{t.teacherIdBack}</p>
                    <label className={`upload-area ${verificationFiles.idBack ? 'success' : ''}`}>
                      <input 
                        type="file" 
                        accept="image/*" 
                        style={{ display: 'none' }} 
                        onChange={(e) => handleFileChange(e, 'idBack')} 
                      />
                      <svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="upload-icon"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      <span>{verificationFiles.idBack ? verificationFiles.idBack.name : t.teacherUploadImg}</span>
                      <small>{t.teacherUploadFormat}</small>
                    </label>
                  </div>

                </div>
              </div>

              <div className="upload-section">
                <h3 className="section-title">{t.teacherExpFiles}</h3>
                <label className={`upload-area full-width ${verificationFiles.cv ? 'success' : ''}`}>
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx,image/*" 
                    style={{ display: 'none' }} 
                    onChange={(e) => handleFileChange(e, 'cv')} 
                  />
                  <svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="upload-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  <span>{verificationFiles.cv ? verificationFiles.cv.name : t.teacherUploadDocs}</span>
                </label>
              </div>

              <button 
                className={`teacher-submit-btn ${!isStep2Complete ? 'disabled' : ''}`} 
                onClick={handleNext}
                disabled={!isStep2Complete}
              >
                {t.teacherSubmitBtn}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Pending Review */}
        {step === 3 && (
          <div className="teacher-step review-step fade-in">
            <div className="review-img-wrap">
              <img src={robotImg} alt="Reviewing" className="review-robot" />
            </div>
            
            <h2 className="review-title">{t.teacherReviewTitle}</h2>
            <p className="review-desc">{t.teacherReviewDesc}</p>

            <div className="review-alert-box">
              <div className="alert-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <div className="alert-text">
                <strong>{t.teacherReviewAlert1}</strong>
                <span>{t.teacherReviewAlert2}</span>
              </div>
            </div>

            <p className="review-footer-text">
              {t.teacherThanks} <span style={{ color: '#10b981' }}>♥️</span>
            </p>

            <button className="teacher-submit-btn mt-4" onClick={handleFinish}>{t.sevenNavHome}</button>
          </div>
        )}

      </div>
    </div>
  );
}