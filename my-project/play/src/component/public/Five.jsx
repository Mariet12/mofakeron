import React, { useState, useRef, useEffect } from 'react';
import { Translations } from '../../TransLation';
import './Five.css';

export default function Five({ onNavigate, language, setLanguage }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  
  // حالات العداد التنازلي
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);

  const t = Translations[language || 'ar'];

  // الكود الثابت المطلوب مطابقته
  const STATIC_CORRECT_CODE = "123456";

  // التحقق مما إذا كانت جميع الخانات ممتلئة
  const isComplete = otp.every((digit) => digit !== '');

  // تشغيل العداد التنازلي فور فتح الصفحة
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true); // السماح بإعادة الإرسال عند انتهاء الـ 60 ثانية
    }
  }, [timeLeft]);

  // دالة إعادة إرسال الرمز وتصفير العداد
  const handleResend = () => {
    setTimeLeft(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    setErrorMessage('');
    alert(t.fiveResendAlert);
  };

  // التعامل مع كتابة الأرقام والانتقال التلقائي
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    setErrorMessage(''); // مسح رسالة الخطأ عند إعادة الكتابة

    // الانتقال للخانة التالية
    if (element.value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // دعم زر الحذف (Backspace)
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // عملية التحقق عند الضغط على تأكيد
  const handleVerify = () => {
    const enteredCode = otp.join('');
    
    if (enteredCode === STATIC_CORRECT_CODE) {
      setErrorMessage('');
      // الانتقال التلقائي للسيق الموالي (مثلاً 'six') عند نجاح التأكيد
      if (onNavigate) {
        onNavigate('six');
      }
    } else {
      setErrorMessage(t.fiveVerifyError);
    }
  };

  // عند الضغط على السهم الانتقال لصفحة Four
  const handleBackClick = () => {
    if (onNavigate) {
      onNavigate('four');
    } else {
      window.location.href = './Four.jsx';
    }
  };

  return (
    <div className="verify-container">
      {/* الخلفية */}
      <div className="verify-bg">
        <div className="verify-overlay"></div>
      </div>

      {/* زر العودة */}
      <button className="back-arrow-btn" onClick={handleBackClick} aria-label={t.fiveBackAria}>
      <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>

      {/* النافذة البيضاء */}
      <div className="verify-card">
        {/* أيقونة الرسالة */}
        <div className="icon-box">
          <svg className="mail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        {/* النصوص */}
        <h2 className="verify-title">{t.fiveTitle}</h2>
        <p className="verify-desc">
          أدخل الرمز المكوّن من 6 أرقام الذي أرسلناه إلى <br />
          <span className="verify-email">123@gmail.com</span>
        </p>

        {/* خانات إدخال الرمز */}
        <div className="otp-inputs-container">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={data}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="otp-input"
            />
          ))}
        </div>

        {/* عرض رسالة الخطأ إن وجدت */}
        {errorMessage && (
          <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '15px', fontWeight: 'bold' }}>
            {errorMessage}
          </p>
        )}

        {/* إعادة الإرسال والعداد التنازلي */}
        <div className="resend-container">
          <span className="resend-text">لم يصلك الرمز؟</span>
          {canResend ? (
            <button onClick={handleResend} className="resend-btn">إعادة الإرسال</button>
          ) : (
            <>
              <button className="resend-btn" style={{opacity: 0.8, cursor: 'default'}}>إعادة الإرسال</button>
              <span className="resend-text"> خلال </span>
              <span className="timer-text">
                0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </span>
            </>
          )}
        </div>

        {/* زر التأكيد */}
        <button 
          onClick={handleVerify} 
          disabled={!isComplete}
          className="submit-btn"
          style={{
            opacity: isComplete ? 1 : 0.6,
            cursor: isComplete ? 'pointer' : 'not-allowed',
            backgroundColor: isComplete ? '#a855f7' : '#cbd5e1'
          }}
        >
          {t.fiveSubmitBtn}
        </button>
      </div>
    </div>
  );
}