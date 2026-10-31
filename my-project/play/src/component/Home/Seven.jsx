import React, { useState } from 'react';
import './Seven.css';
import bannerImg from '../../image/seven-banner.png';
import robotImg from '../../image/seven-robot-transparent.png';
import home from '../../image/hommm.png';
import { Translations } from '../../TransLation';
import tasskimage from '../../image/tasks.png';
import tree from '../../image/tree.png'
import one from '../../image/one.png'
import two from '../../image/two.png'
import four from '../../image/four.png'

import start from '../../image/trart.png'
import xp from '../../image/xp.png'
import bag from '../../image/bag.png'
import tech from '../../image/tec.png'
import door from '../../image/door.png'
import sb from '../../image/sb.png'
import sndog from '../../image/sndog.png'
import madelone from '../../image/madelone.png'
import madeltwo from '../../image/madeltwo.png'
import madelthree from '../../image/madelthree.png'
import bordthree from '../../image/bordthree.png'

export default function Seven({ onNavigate, language }) {
  const t = Translations[language || 'ar'];
  
  // State للتحكم في تصغير أو تكبير الـ Sidebar الجانبي
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // State للتحكم في الصفحة الحالية (home أو tasks أو path أو store أو leaderboard)
  const [currentTab, setCurrentTab] = useState('home');

  // State للتحكم في تصفية عناصر المتجر (all, reward, customization, tools)
  const [storeFilter, setStoreFilter] = useState('all');

  // State للتحكم في تصفية لوحة الصدارة (highest, friends, weekly)
  const [leaderboardFilter, setLeaderboardFilter] = useState('highest');

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // بيانات عناصر المتجر
  const storeItems = [
    { id: 1, type: 'reward', title: 'عباءة المستكشف', desc: 'مظهر مميز لمغامراتك القادمة', price: '1000 🪙', img: tech },
    { id: 2, type: 'tools', title: 'حقيبة الطاقة', desc: 'طاقة إضافية للرحلة', price: '300 🪙', img: bag },
    { id: 3, type: 'customization', title: 'نجمة التميز', desc: 'شارة خاصة للمستكشفين', price: '120 💎', img: start },
    { id: 4, type: 'reward', title: 'صندوق المفاجآت', desc: 'افتح واحصل على مكافأة عشوائية', price: '450 🪙', img: sndog },
    { id: 5, type: 'tools', title: 'بوابة سحرية', desc: 'معبر مهم لرحلتك', price: '1500 🪙', img: door },
    { id: 6, type: 'customization', title: 'مضاعف XP', desc: 'ضاعف نقاط الخبرة', price: '800 🪙', img: xp },
    { id: 7, type: 'reward', title: 'درع المستكشف', desc: 'يحميك في التحديات', price: '500 🪙', img: sb },
    { id: 8, type: 'reward', title: 'عباءة المستكشف', desc: 'مظهر مميز لمغامراتك القادمة', price: '1000 🪙', img: tech },
  ];

  const filteredStoreItems = storeFilter === 'all' 
    ? storeItems 
    : storeItems.filter(item => item.type === storeFilter);

  return (
    <div className="seven-container" dir={language === 'en' ? 'ltr' : 'rtl'}>
      <div className="dashboard-layout">
        
        {/* ================= 1. الشريط الجانبي الثابت ================= */}
        <div className={`sidebar-right ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          
          <button className="sidebar-toggle-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {isSidebarCollapsed ? (
                language === 'en' ? <polyline points="9 18 15 12 9 6" /> : <polyline points="15 18 9 12 15 6" />
              ) : (
                language === 'en' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />
              )}
            </svg>
          </button>

          <div className="user-profile">
            <div className="avatar-wrapper">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
                <circle cx="18" cy="18" r="18" fill="#a5f3fc"/>
                <path d="M18 20C21.866 20 25 16.866 25 13C25 9.13401 21.866 6 18 6C14.134 6 11 9.13401 11 13C11 16.866 14.134 20 18 20Z" fill="#0891b2"/>
                <path d="M29.5 32.5C29.5 28.5 24 24.5 18 24.5C12 24.5 6.5 28.5 6.5 32.5" stroke="#0891b2" strokeWidth="3" strokeLinecap="round"/>
              </svg>
              <div className="level-badge">3</div>
            </div>
            <h2 className="user-name">{t.sevenUserName}</h2>
            <p className="user-level-text">{t.sevenUserLevel}</p>
            
            <div className="exp-container">
              <div className="exp-text">
                <span>320 / 450</span>
                <span>EXP</span>
              </div>
              <div className="exp-bar-bg">
                <div className="exp-bar-fill" style={{ width: '71%' }}></div>
              </div>
            </div>
          </div>

          <div className="nav-menu">
            {/* زر الرئيسية */}
            <a href="#" className={`nav-item ${currentTab === 'home' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentTab('home'); }}>
              <div className="nav-item-content">
                <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                <span>{t.sevenNavHome}</span>
              </div>
            </a>

            {/* زر المهام */}
            <a href="#" className={`nav-item ${currentTab === 'tasks' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentTab('tasks'); }}>
              <div className="nav-item-content">
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/></svg>
                <span>{t.sevenNavTasks}</span>
              </div>
            </a>

            {/* زر المسار التعليمي */}
            <a href="#" className={`nav-item ${currentTab === 'path' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentTab('path'); }}>
              <div className="nav-item-content">
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                <span>{t.sevenNavPath}</span>
              </div>
            </a>

            {/* زر المتجر */}
            <a href="#" className={`nav-item ${currentTab === 'store' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentTab('store'); }}>
              <div className="nav-item-content">
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span>{t.sevenNavStore}</span>
              </div>
            </a>

            {/* زر لوحة الصدارة (مفعل الآن ليفتح الصفحة المطلوبة) */}
            <a href="#" className={`nav-item ${currentTab === 'leaderboard' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentTab('leaderboard'); }}>
              <div className="nav-item-content">
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 21h8M12 17v4M7 4h10M5 4h14M8 8h8M6 12h12M9 17h6"/></svg>
                <span>{t.sevenNavLeaderboard}</span>
              </div>
            </a>

            <a href="#" className="nav-item">
              <div className="nav-item-content">
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>{t.sevenNavChar}</span>
              </div>
            </a>
          </div>

          <div className="smart-assistant">
            <div className="assistant-info">
              <h4 className="assistant-title">{t.sevenAssistantTitle}</h4>
              <p className="assistant-desc">{t.sevenAssistantDesc}</p>
            </div>
            <img src={robotImg} alt="Robot" className="assistant-img" />
          </div>

        </div>

        {/* ================= 2. المحتوى الرئيسي ================= */}
        <div className="main-content">
          
          {/* الهيدر العلوي الثابت */}
          <div className="top-header-wrapper">
            <div className="top-header-container">
              
              <div className="top-header">
                <div className="header-stats">
                  <div className="icon-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l-.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                  </div>
                  <div className="icon-btn">
                    <div className="notification-badge">5</div>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                  </div>
                  <div className="stat-pill energy-pill">
                    <span>5/10</span>
                    <span className="icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="#10b981" stroke="#10b981" strokeWidth="1"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></span>
                  </div>
                  <div className="stat-pill diamond-pill">
                    <span>120</span>
                    <span className="icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="#3b82f6" stroke="#3b82f6" strokeWidth="1"><polygon points="12 2 2 7 12 22 22 7"/></svg></span>
                  </div>
                  <div className="stat-pill coin-pill">
                    <span>2450</span>
                    <span className="icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8" stroke="white" strokeWidth="2"/></svg></span>
                  </div>
                </div>
              </div>

              {/* العنوان والأيقونة تتغير تلقائياً حسب التاب المفتوح */}
              <div className="welcome-card">
                <div className="home-icon-badge">
                  {currentTab === 'home' ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  ) : currentTab === 'tasks' ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/></svg>
                  ) : currentTab === 'path' ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                  ) : currentTab === 'store' ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8M12 17v4M7 4h10M5 4h14M8 8h8M6 12h12M9 17h6"/></svg>
                  )}
                </div>

                <div className="welcome-text">
                  {currentTab === 'home' ? (
                    <>
                      <h3 className="welcome-title">{t.sevenWelcomeTitle}</h3>
                      <p className="welcome-subtitle">{t.sevenWelcomeDesc}</p>
                    </>
                  ) : currentTab === 'tasks' ? (
                    <>
                      <h3 className="welcome-title">المهام</h3>
                      <p className="welcome-subtitle">أكمل المهام وتحدى نفسك لتصبح مستكشفاً أفضل</p>
                    </>
                  ) : currentTab === 'path' ? (
                    <>
                      <h3 className="welcome-title">المسار التعليمي</h3>
                      <p className="welcome-subtitle">اكتشف رحلتك التعليمية وتتقدم خطوة بخطوة</p>
                    </>
                  ) : currentTab === 'store' ? (
                    <>
                      <h3 className="welcome-title">المتجر</h3>
                      <p className="welcome-subtitle">طور رحلتك واحصل على أدوات ومكافآت جديدة</p>
                    </>
                  ) : (
                    <>
                      <h3 className="welcome-title">لوحة الصدارة</h3>
                      <p className="welcome-subtitle">تابع ترتيبك بين أصدقائك والمستكشفين الكبار</p>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* ================= 3. المحتوى المتغير ================= */}
          {currentTab === 'home' ? (
            <>
              <div className="middle-section">
                <div className="learning-banner">
                  <div className="banner-content">
                    <h2 className="banner-title">{t.sevenBannerTitle}</h2>
                    <p className="banner-desc">{t.sevenBannerDesc}</p>
                    <button className="banner-btn" onClick={() => onNavigate && onNavigate('first')}>
                      {t.sevenBannerStart}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        {language === 'en' ? (
                          <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>
                        ) : (
                          <><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></>
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="journey-sidebar">
                  <h3 className="journey-title">{t.sevenJourneyTitle}</h3>
                  <div className="timeline">
                    <div className="timeline-line"></div>
                    <div className="timeline-item">
                      <div className="timeline-dot completed">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <div className="timeline-content">
                        <div className="timeline-text">
                          <h4 className="timeline-item-title">{t.sevenWorld1Title}</h4>
                          <p className="timeline-item-subtitle">{t.sevenWorld1Subtitle}</p>
                        </div>
                        <img src={bannerImg} alt="world" className="timeline-img" />
                      </div>
                    </div>

                    <div className="timeline-item">
                      <div className="timeline-dot locked"></div>
                      <div className="timeline-content">
                        <div className="timeline-text">
                          <h4 className="timeline-item-title locked">{t.sevenWorld1Title}</h4>
                          <p className="timeline-item-subtitle">{t.sevenWorld1Subtitle}</p>
                        </div>
                        <div className="timeline-img-wrap">
                          <img src={bannerImg} alt="world" className="timeline-img locked" />
                          <div className="timeline-lock-icon">
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" fill="none" strokeWidth="2.5"/></svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="timeline-item">
                      <div className="timeline-dot locked"></div>
                      <div className="timeline-content">
                        <div className="timeline-text">
                          <h4 className="timeline-item-title locked">{t.sevenWorld1Title}</h4>
                          <p className="timeline-item-subtitle">{t.sevenWorld1Subtitle}</p>
                        </div>
                        <div className="timeline-img-wrap">
                          <img src={bannerImg} alt="world" className="timeline-img locked" />
                          <div className="timeline-lock-icon">
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" fill="none" strokeWidth="2.5"/></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="explore-more-btn">
                    <span>{t.sevenExploreBtn}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      {language === 'en' ? <polyline points="9 18 15 12 9 6" /> : <polyline points="15 18 9 12 15 6" />}
                    </svg>
                  </button>
                </div>
              </div>

              <div className="worlds-grid">
                <div className="world-card active-card">
                  <div className="world-img-wrap">
                    <img src={home} alt="world" className="world-img" />
                  </div>
                  <div className="world-info">
                    <h4 className="world-title">{t.sevenLogicWorldTitle}</h4>
                    <p className="world-desc">{t.sevenLogicWorldDesc}</p>
                    <div className="world-progress-container">
                      <span className="world-progress-text">40%</span>
                      <div className="world-progress-bg">
                        <div className="world-progress-fill" style={{width: '40%'}}></div>
                      </div>
                    </div>
                    <button className="world-action-btn active-btn" onClick={() => onNavigate && onNavigate('first')}>
                      <span>{t.sevenOpenBtn}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        {language === 'en' ? <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></> : <><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></>}
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="world-card">
                  <div className="world-img-wrap">
                    <img src={home} alt="world" className="world-img locked-img" />
                    <div className="world-lock-overlay">
                      <div className="lock-circle">
                        <svg className="world-lock-icon" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" fill="none" strokeWidth="2.5"/></svg>
                      </div>
                    </div>
                  </div>
                  <div className="world-info">
                    <h4 className="world-title">{t.sevenLogicWorldTitle}</h4>
                    <p className="world-desc">{t.sevenLogicWorldDesc}</p>
                    <div className="world-progress-container">
                      <span className="world-progress-text">0%</span>
                      <div className="world-progress-bg"></div>
                    </div>
                    <button className="world-action-btn locked-btn">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" fill="none" strokeWidth="2.5"/></svg>
                      <span>{t.sevenLockedBtn}</span>
                    </button>
                  </div>
                </div>

                <div className="world-card">
                  <div className="world-img-wrap">
                    <img src={home} alt="world" className="world-img locked-img" />
                    <div className="world-lock-overlay">
                      <div className="lock-circle">
                        <svg className="world-lock-icon" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" fill="none" strokeWidth="2.5"/></svg>
                      </div>
                    </div>
                  </div>
                  <div className="world-info">
                    <h4 className="world-title">{t.sevenLogicWorldTitle}</h4>
                    <p className="world-desc">{t.sevenLogicWorldDesc}</p>
                    <div className="world-progress-container">
                      <span className="world-progress-text">0%</span>
                      <div className="world-progress-bg"></div>
                    </div>
                    <button className="world-action-btn locked-btn">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" fill="none" strokeWidth="2.5"/></svg>
                      <span>{t.sevenLockedBtn}</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bottom-encouragement">
                <h3 className="bottom-encouragement-text">{t.sevenFooterText}</h3>
                <img src={robotImg} alt="Robot Hero" className="bottom-robot-img" />
              </div>
            </>
          ) : currentTab === 'tasks' ? (
<>
  <div className="tasks-middle-section">
    
    <div className="main-mission-banner">
      {/* الصورة الأولى: تم جعل الكارت بالكامل قابل للضغط */}
      <div 
        className="mission-img-side" 
        style={{ cursor: 'pointer' }}
        onClick={() => window.location.href = '/YOUR_PAGE_NAME'}
      >
        <img src={tasskimage} alt="Mission Portal" className='task-image' />
      </div>

      <div className="mission-content-side">
        <span className="badge-primary-mission">المهمة الأساسية</span>
        <h2 className="mission-title">الطريق إلى البوابة</h2>
        <p className="mission-desc">ساعد الروبوت في فتح البوابة الأولى من خلال إكمال جميع التحديات.</p>
        
        <div className="mission-progress-box">
          <span>المصادقة النهائية</span>
          <div className="mission-bar-bg">
            <div className="mission-bar-fill" style={{width: '80%'}}></div>
          </div>
          <span className="mission-num">4/5</span>
        </div>

        <div className="mission-rewards">
          <span className="reward-tag">+1 ⚡</span>
          <span className="reward-tag">+150 💎</span>
          <span className="reward-tag">+300 XP</span>
        </div>

        <button 
          className="follow-mission-btn"
          onClick={() => window.location.href = '/YOUR_PAGE_NAME'}
        >
          متابعة المهمة
        </button>
      </div>
    </div>

    <div className="daily-tasks-card">
      <h3 className="daily-tasks-title">مهامي اليوم</h3>
      
      <div className="daily-task-item">
        <div className="daily-task-info">
          <span className="task-check-icon completed-check">✓</span>
          <span className="daily-task-text">أكمل التحدي الأول</span>
        </div>
        <span className="task-progress-num">1/1</span>
      </div>
      <div className="task-progress-line"><div className="task-progress-fill" style={{width: '80%'}}></div></div>

      <div className="daily-task-item">
        <div className="daily-task-info">
          <span className="task-check-icon coin-check">🪙</span>
          <span className="daily-task-text">اجمع 50 عملة</span>
        </div>
        <span className="task-progress-num">10/10</span>
      </div>
      <div className="task-progress-line"><div className="task-progress-fill" style={{width: '100%'}}></div></div>

      <div className="daily-task-item">
        <div className="daily-task-info">
          <span className="task-check-icon completed-check">✓</span>
          <span className="daily-task-text">سجل دخولك اليومي</span>
        </div>
        <span className="task-progress-num">1/1</span>
      </div>
      <div className="task-progress-line"><div className="task-progress-fill" style={{width: '100%'}}></div></div>

      <p className="daily-tasks-footer-note">تم إكمال 2 من 3 مهام يومية</p>
    </div>

  </div>

  <div className="tasks-bottom-section">
    <div className="worlds-progress-card">
      <div className="worlds-header-row">
        <h3 className="section-heading">العوالم</h3>
      </div>

      {/* الصورة الكارت الثاني: عالم البدايات */}
      <div className="small-world-preview-card">
        <div 
          className="sw-info-side" 
          style={{ cursor: 'pointer' }}
          onClick={() => window.location.href = '/YOUR_PAGE_NAME'}
        >
          <img src={home} alt="World preview" className="sw-im" />
          <div className="sw-info">
            <span className="sw-tag">العالم الأول</span>
            <h4 className="sw-title">عالم البدايات</h4>
            <p className="sw-desc">ابدأ رحلتك لتتعلم التفكير المنطقي وحل المشكلات.</p>
          </div>
        </div>

        <div className="sw-inline-progress-section">
          <div className="sw-progress-col">
            <div className="sw-progress-top-row">
              <span className="wp-title-text">التقدم الكلي</span>
              <span className="wp-percentage">80%</span>
            </div>
            <div className="sw-bar-bg">
              <div className="sw-bar-fill" style={{width: '80%'}}></div>
            </div>
            <span className="wp-subtext">4/5 مهام مكتملة</span>
          </div>
          <div className="sw-inline-progress-section">
            <button 
              className="view-tasks-action-btn"
              onClick={() => window.location.href = '/YOUR_PAGE_NAME'}
            >
              <span>عرض المهام</span>
            </button>
          </div>
        </div>
      </div>

      {/* الصورة الكارت الثالث: عالم الأنماط */}
      <div className="small-world-preview-card locked-world-card">
        <div 
          className="sw-info-side" 
          style={{ cursor: 'pointer' }}
          onClick={() => window.location.href = '/YOUR_PAGE_NAME'}
        >
          <div className="sw-img-wrap-locked">
            <img src={home} alt="Locked world" className="sw-im locked-img" />
            <div className="world-lock-overlay">
              <div className="lock-circle">
                <svg className="world-lock-icon" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" fill="none" strokeWidth="2.5"/></svg>
              </div>
            </div>
          </div>
          <div className="sw-info">
            <span className="sw-tag locked-tag">العالم الثاني</span>
            <h4 className="sw-title">عالم الأنماط</h4>
            <p className="sw-desc">اكتشف أنماط الأعداد والتعرف على الدورات.</p>
          </div>
        </div>

        <div className="locked-status-badge">
          <svg className="lock-inline-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" fill="none" strokeWidth="2.5"/></svg>
          <span>يفتح بعد إكمال المهمة السابقة</span>
        </div>
      </div>

    </div>
  </div>
</>
          ) : currentTab === 'path' ? (
            <>
            <div className="learning-path-hero-banner">
              <div className="path-hero-content">
                <h2 className="path-hero-title">رحلتي التعليمية</h2>
                <p className="path-hero-desc">كل عالم جديد يقربك خطوة من أن تصبح مستكشفاً عبقرياً</p>
              </div>
              <div className="path-hero-images"></div>
            </div>
          
            <div className="path-worlds-map-section">
              {/* العالم الأول: عالم التحديات */}
              <div className="path-world-node node-top">
                <div 
                  className="path-node-card" 
                  style={{ cursor: 'pointer' }} 
                  // استبدلي 'tasks' باسم الكيس الصحيح للصفحة الخارجية في App.js (مثلا 'task2' أو 'two')
                  onClick={() => onNavigate('task4')}
                >
                  <img src={one} alt="World 4" className="path-node-img locked-image-effect" />
                  <div className="path-lock-overlay-circle">🔒</div>
                  <div className="path-card-overlay-box">
                    <h4 className="path-node-name">عالم التحديات</h4>
                    <span className="path-status-pill locked-status">التالي</span>
                    <span className="path-sub-desc">يفتح بعد الحالي</span>
                  </div>
                </div>
              </div>
          
              <div className="path-connector-line"></div>
          
              {/* العالم الثاني: عالم المنطق */}
              <div className="path-world-node node-bottom">
                <div 
                  className="path-node-card active-card-border" 
                  style={{ cursor: 'pointer' }} 
                  onClick={() => onNavigate('task3')}
                >
                  <div className="path-current-tag-overlay">أنت هنا</div>
                  <img src={tree} alt="World 3" className="path-node-img" />
                  <div className="path-card-overlay-box">
                    <h4 className="path-node-name">عالم المنطق</h4>
                    <div className="path-mini-progress">
                      <div className="path-mini-fill" style={{ width: '80%' }}></div>
                    </div>
                    <span className="path-percentage-text">80%</span>
                  </div>
                </div>
              </div>
          
              <div className="path-connector-line"></div>
          
              {/* العالم الثالث: عالم الأنماط */}
              <div className="path-world-node node-top">
                <div 
                  className="path-node-card" 
                  style={{ cursor: 'pointer' }} 
                  onClick={() => onNavigate('task2')}
                >
                  <img src={two} alt="World 2" className="path-node-img" />
                  <div className="path-check-badge-center">✓</div>
                  <div className="path-card-overlay-box">
                    <h4 className="path-node-name">عالم الأنماط</h4>
                    <span className="path-status-pill completed-status">تم إكمالها</span>
                    <span className="path-level-num">2/2</span>
                  </div>
                </div>
              </div>
          
              <div className="path-connector-line"></div>
          
              {/* العالم الرابع: عالم البدايات */}
              <div className="path-world-node node-bottom">
                <div 
                  className="path-node-card" 
                  style={{ cursor: 'pointer' }} 
                  onClick={() => onNavigate('tasks')}
                >
                  <img src={four} alt="World 1" className="path-node-img" />
                  <div className="path-check-badge-center">✓</div>
                  <div className="path-card-overlay-box">
                    <h4 className="path-node-name">عالم البدايات</h4>
                    <span className="path-status-pill completed-status">تم إكمالها</span>
                    <span className="path-level-num">1/1</span>
                  </div>
                </div>
              </div>
            </div>
          
            <div className="path-bottom-master-container">
              <div 
                className="cs-right-side" 
                style={{ cursor: 'pointer' }} 
                onClick={() => onNavigate('tasks')}
              >
                <img src={tree} alt="World" className="cs-world-img" />
              </div>
          
              <div className="current-status-info">
                <span className="cs-label">أنت في</span>
                <h4 className="cs-world-title">عالم المنطق</h4>
                <p className="cs-desc">أنت في منتصف رحلة التفكير المنطقي</p>
                <span className="cs-count">5/5 مهام مكتملة</span>
                <div className="cs-bar-bg">
                  <div className="cs-bar-fill" style={{ width: '80%' }}></div>
                </div>
                <button 
                  className="cs-follow-btn" 
                  onClick={() => onNavigate('tasks')}
                >
                  تابع التعلم &gt;&gt;
                </button>
              </div>
          
              <div className="skills-development-card">
                <h3 className="skills-card-heading">المهارات التي تطورها</h3>
                <div className="skills-icons-grid">
                  <div className="skill-icon-box">
                    <div className="skill-circle-icon">🔍</div>
                    <span>التفكير المنطقي</span>
                  </div>
                  <div className="skill-icon-box">
                    <div className="skill-circle-icon">🧬</div>
                    <span>اكتشاف الأنماط</span>
                  </div>
                  <div className="skill-icon-box">
                    <div className="skill-circle-icon">⚙️</div>
                    <span>حل المشكلات</span>
                  </div>
                  <div className="skill-icon-box">
                    <div className="skill-circle-icon">🎯</div>
                    <span>اتخاذ القرار</span>
                  </div>
                </div>
              </div>
            </div>
          </>
          ) : currentTab === 'store' ? (
            <>
              <div className="store-hero-banner">
                <div className="store-hero-text">
                  <h2 className="store-hero-title">متجر المستكشف</h2>
                  <p className="store-hero-desc">اختار مكافآتك و خلي رحلتك أقوى</p>
                </div>
              </div>

              <div className="store-filter-buttons">
                <button className={`store-filter-btn ${storeFilter === 'all' ? 'active' : ''}`} onClick={() => setStoreFilter('all')}>الكل</button>
                <button className={`store-filter-btn ${storeFilter === 'reward' ? 'active' : ''}`} onClick={() => setStoreFilter('reward')}>المكافآت</button>
                <button className={`store-filter-btn ${storeFilter === 'customization' ? 'active' : ''}`} onClick={() => setStoreFilter('customization')}>تخصيص الشخصية</button>
                <button className={`store-filter-btn ${storeFilter === 'tools' ? 'active' : ''}`} onClick={() => setStoreFilter('tools')}>الأدوات</button>
              </div>

              <div className="store-items-grid">
                {filteredStoreItems.map((item, index) => (
                  <div className="store-item-card" key={index}>
                    <div className="store-item-img-wrap">
                      <img src={item.img} alt={item.title} className="store-item-img" />
                    </div>
                    <div className="store-item-info">
                      <h4 className="store-item-title">{item.title}</h4>
                      <p className="store-item-desc">{item.desc}</p>
                      <span className="store-item-price">{item.price}</span>
                      <button className="store-buy-btn" onClick={() => {
                        const purchasesList = document.querySelector(".recent-purchases-list");
                        if (purchasesList) {
                          const newPill = document.createElement("div");
                          newPill.className = "purchase-pill";
                          newPill.innerHTML = `<span>${item.title}</span><img src="${item.img}" alt="${item.title}" />`;
                          purchasesList.appendChild(newPill);
                          purchasesList.scrollLeft = purchasesList.scrollWidth;
                        }
                      }}>شراء</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="store-recent-purchases-section">
                <h3 className="recent-purchases-heading">آخر المشتريات</h3>
                <div className="recent-purchases-list">
                  <div className="purchase-pill"><span>مضاعف XP</span><img src={xp} alt="item" /></div>
                  <div className="purchase-pill"><span>درع المستكشف</span><img src={sb} alt="item" /></div>
                  <div className="purchase-pill"><span>حقيبة الطاقة</span><img src={bag} alt="item" /></div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* ================= صفحة لوحة الصدارة المطابقة للصورة ================= */}
              
              <div className="lb-main-layout">

{/* كارت الترتيب والبانر السفلي */}
<div className="lb-right-column">

  <div className="lb-current-rank-card">
    <span className="lb-card-label">🏆 ترتيبك الحالي</span>

    <div className="lb-user-avatar-wrap">
      <img src={bordthree} alt="Robot" />
    </div>

    <h3 className="lb-rank-title">المركز الثالث</h3>
    <p className="lb-rank-sub">من بين 5 مستكشفين</p>

    

    <div className="lb-points-badge">
    <div className="lb-rank-progress-box">
      <div
        className="lb-rank-bar-fill"
        style={{ width: "70%" }}
      ></div>
    </div>
      <span className='mn'> 8,760 نقطة</span>
    </div>
  </div>

  <div className="lb-bottom-tip-card">
    <p className="lb-tip-text">
      كلما تقدمت أكثر
      <br />
      كلما اقتربت من القمة!
    </p>
  </div>

</div>

{/* البانر والجدول */}
<div className="lb-left-column">

  <div className="lb-hero-banner">
    <div className="lb-hero-text">
      <h2 className="lb-hero-title">كن في القمة !</h2>
      <p className="lb-hero-desc">
        كل إنجاز يقربك من المركز الأول
      </p>
    </div>
  </div>

  {/* أزرار التصفية المباشرة */}
  <div className="lb-filter-tabs">
    <button
      className={`lb-filter-btn ${leaderboardFilter === "highest" ? "active" : ""}`}
      onClick={() => setLeaderboardFilter("highest")}
    >
      أعلى المستكشفين
    </button>

    <button
      className={`lb-filter-btn ${leaderboardFilter === "friends" ? "active" : ""}`}
      onClick={() => setLeaderboardFilter("friends")}
    >
      أصدقائي
    </button>

    <button
      className={`lb-filter-btn ${leaderboardFilter === "weekly" ? "active" : ""}`}
      onClick={() => setLeaderboardFilter("weekly")}
    >
      الأسابيع
    </button>
  </div>

  {/* جدول المستكشفين */}
  <div className="lb-table-container">

    <div className="lb-table-header">
      <span>النقاط</span>
      <span>المستكشف</span>
      <span>الترتيب</span>
    </div>

    <div className="lb-table-rows">
      
      {leaderboardFilter === "friends" ? (
        <>
          <div className="lb-row">
            <span className="lb-row-points">⭐ 11,115</span>
            <div className="lb-row-user">
              <div className="lb-mini-avatar avatar-two">👩🏻</div>
              <div>
                <h4 className="lb-username">سارة رمضان</h4>
                <span className="lb-user-lvl">المستوى 5</span>
              </div>
            </div>
            <span className="lb-medal"><img src={madeltwo} alt="" /></span>
          </div>

          <div className="lb-row current-user-row">
            <span className="lb-row-points">⭐ 10,250</span>
            <div className="lb-row-user">
              <div className="lb-mini-avatar avatar-three">👩🏻</div>
              <div>
                <h4 className="lb-username">مي اسماعيل</h4>
                <span className="lb-user-lvl">المستوى 5</span>
              </div>
            </div>
            <span className="lb-medal"><img src={madelthree} alt="" /></span>
          </div>
        </>
      ) : leaderboardFilter === "weekly" ? (
        <>
          <div className="lb-row">
            <span className="lb-row-points">⭐ 4,200</span>
            <div className="lb-row-user">
              <div className="lb-mini-avatar avatar-three">👩🏻</div>
              <div>
                <h4 className="lb-username">مي اسماعيل</h4>
                <span className="lb-user-lvl">أداء هذا الأسبوع</span>
              </div>
            </div>
            <span className="lb-medal"><img src={madelthree} alt="" /></span>
          </div>

          <div className="lb-row">
            <span className="lb-row-points">⭐ 3,850</span>
            <div className="lb-row-user">
              <div className="lb-mini-avatar avatar-two">👩🏻</div>
              <div>
                <h4 className="lb-username">سارة رمضان</h4>
                <span className="lb-user-lvl">أداء هذا الأسبوع</span>
              </div>
            </div>
            <span className="lb-medal"><img src={madeltwo} alt="" /></span>
          </div>
        </>
      ) : (
        <>
          <div className="lb-row">
            <span className="lb-row-points">⭐ 12,450</span>
            <div className="lb-row-user">
              <div className="lb-mini-avatar avatar-one">👦🏻</div>
              <div>
                <h4 className="lb-username">صلاح عُزلي</h4>
                <span className="lb-user-lvl">المستوى 5</span>
              </div>
            </div>
            <span className="lb-medal"><img src={madelone} alt="" /></span>
          </div>

          <div className="lb-row">
            <span className="lb-row-points">⭐ 11,115</span>
            <div className="lb-row-user">
              <div className="lb-mini-avatar avatar-two">👩🏻</div>
              <div>
                <h4 className="lb-username">سارة رمضان</h4>
                <span className="lb-user-lvl">المستوى 5</span>
              </div>
            </div>
            <span className="lb-medal"><img src={madeltwo} alt="" /></span>
          </div>

          <div className="lb-row current-user-row">
            <span className="lb-row-points">⭐ 10,250</span>
            <div className="lb-row-user">
              <div className="lb-mini-avatar avatar-three">👩🏻</div>
              <div>
                <h4 className="lb-username">مي اسماعيل</h4>
                <span className="lb-user-lvl">المستوى 5</span>
              </div>
            </div>
            <span className="lb-medal"><img src={madelthree} alt="" /></span>
          </div>

          <div className="lb-row">
            <span className="lb-row-points">⭐ 8,570</span>
            <div className="lb-row-user">
              <div className="lb-mini-avatar avatar-one">👦🏻</div>
              <div>
                <h4 className="lb-username">معتز محمد</h4>
                <span className="lb-user-lvl">المستوى 5</span>
              </div>
            </div>
            <span className="lb-rank-num"><img src={madelthree} alt="" /></span>
          </div>

          <div className="lb-row">
            <span className="lb-row-points">⭐ 7,750</span>
            <div className="lb-row-user">
              <div className="lb-mini-avatar avatar-two">👧🏻</div>
              <div>
                <h4 className="lb-username">حفصة أحمد</h4>
                <span className="lb-user-lvl">المستوى 5</span>
              </div>
            </div>
            <span className="lb-rank-num"><img src={madelthree} alt="" /></span>
          </div>
        </>
      )}

    </div>
  </div>

</div>
</div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}