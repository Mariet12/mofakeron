import React, { useState, useEffect } from 'react';
import First from './component/public/First';
import Two from './component/public/Two';
import Three from './component/public/Three';
import Four from './component/public/Four'; 
import Five from './component/public/Five';
import Six from './component/public/Six';
import Seven from './component/Home/Seven';
import Eight from './component/public/Eight'
import TeacherSignup from './component/public/TeacherSignup';
import Nine from './component/public/Nine';
import Ten from './component/public/Ten';
import Tasks from './component/Home/Tasks';
import Task2 from './component/Home/Task2';
import Task3 from './component/Home/Task3';
import Task4 from './component/Home/Task4';
export default function App() {
  // 1. إدارة اللغة العامة وحفظها في الـ localStorage (عشان تفضل محفوظة وقت الـ Refresh)
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('app_lang') || 'ar';
  });

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem('app_lang', language);
  }, [language]);

  // 2. الصفحة الحالية تبدأ دائماً بـ 'first' عند أي Refresh أو فتح جديد للتطبيق
  const [currentPage, setCurrentPage] = useState('first');

  // دالة عرض الصفحة الحالية بناءً على الـ state
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'first':
        return <First onNavigate={setCurrentPage} language={language} setLanguage={setLanguage} />;
      case 'two':
        return <Two onNavigate={setCurrentPage} language={language} setLanguage={setLanguage} />;
      case 'three':
        return <Three onNavigate={setCurrentPage} language={language} setLanguage={setLanguage} />;
      case 'four':
        return <Four onNavigate={setCurrentPage} language={language} setLanguage={setLanguage} /> ;
      case 'five':
        return <Five onNavigate={setCurrentPage} language={language} setLanguage={setLanguage} />;
      case 'six':
        return <Six onNavigate={setCurrentPage} language={language} setLanguage={setLanguage} />;
      case 'seven':
        return <Seven onNavigate={setCurrentPage} language={language} setLanguage={setLanguage} />;
      case 'eight':
          return <Eight onNavigate={setCurrentPage} language={language} setLanguage={setLanguage} />;
      case 'nine':
          return <Nine onNavigate={setCurrentPage} language={language} setLanguage={setLanguage} />;
      case 'ten':
            return <Ten onNavigate={setCurrentPage} language={language} setLanguage={setLanguage} />;
      case 'tasks':
            return <Tasks onNavigate={setCurrentPage} language={language} setLanguage={setLanguage} />;
            case 'task2':
              return <Task2 onNavigate={setCurrentPage} language={language} setLanguage={setLanguage} />;
              case 'task3':
                return <Task3 onNavigate={setCurrentPage} language={language} setLanguage={setLanguage} />;
                case 'task4':
                  return <Task4 onNavigate={setCurrentPage} language={language} setLanguage={setLanguage} />;
      case 'teacher-signup':
        return <TeacherSignup onNavigate={setCurrentPage} language={language} />;
      default:
        return <First onNavigate={setCurrentPage} language={language} setLanguage={setLanguage} />;
    }
  };

  return (
    <div className="app-container">
      {renderCurrentPage()}
    </div>
  );
}