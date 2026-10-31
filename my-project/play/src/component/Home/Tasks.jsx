
import React, { useState } from 'react';
import logo from '../../image/logo.png';
import firstqu from '../../image/firstqu.png'
import './Tasks.css';

const lessons = [
  {
    title: 'What is Programming ?',
    questions: [
      {
        text: 'What is Programming?',
        options: [
          'Playing games',
          'Giving instructions to a computer',
          'Buying a computer'
        ],
        correct: 1
      },
      {
        text: 'What does a programmer do?',
        options: [
          'Writes computer instructions',
          'Only plays games',
          'Only uses the internet'
        ],
        correct: 0
      },
      {
        text: 'Which device can run a program?',
        options: ['A computer', 'A chair', 'A notebook'],
        correct: 0
      },
      {
        text: 'Why do we use programming?',
        options: [
          'To make things heavier',
          'To solve problems using computers',
          'To turn paper into food'
        ],
        correct: 1
      }
    ]
  },
  {
    title: 'Commands',
    questions: [
      {
        text: 'What is a command?',
        options: [
          'An instruction given to a computer',
          'A computer screen',
          'A type of chair'
        ],
        correct: 0
      },
      {
        text: 'What does the PRINT command do?',
        options: [
          'Turns off the computer',
          'Displays information',
          'Deletes every file'
        ],
        correct: 1
      },
      {
        text: 'What is an input?',
        options: [
          'Information entered into a computer',
          'A computer desk',
          'A finished output only'
        ],
        correct: 0
      },
      {
        text: 'What is an output?',
        options: [
          'A keyboard button',
          'Information produced by a computer',
          'A power cable'
        ],
        correct: 1
      }
    ]
  },
  {
    title: 'Sequencing',
    questions: [
      {
        text: 'What is sequencing?',
        options: [
          'Doing things randomly',
          'Putting instructions in order',
          'Deleting instructions'
        ],
        correct: 1
      },
      {
        text: 'What should come first when making a sandwich?',
        options: [
          'Eat the sandwich',
          'Prepare the ingredients',
          'Wash the dishes'
        ],
        correct: 1
      },
      {
        text: 'Why is the order of instructions important?',
        options: [
          'It helps a program work correctly',
          'It changes the computer color',
          'It removes the program'
        ],
        correct: 0
      },
      {
        text: 'What happens if steps are in the wrong order?',
        options: [
          'The result may be incorrect',
          'The program always improves',
          'Nothing can ever change'
        ],
        correct: 0
      }
    ]
  }
];

export default function Tasks({ onNavigate, language, setLanguage }) {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [finishedAll, setFinishedAll] = useState(false);

  const lesson = lessons[lessonIndex];
  const question = lesson.questions[questionIndex];

  const selectLesson = (index) => {
    if (index > lessonIndex && !completedLessons.includes(index - 1)) {
      return;
    }

    setLessonIndex(index);
    setQuestionIndex(0);
    setSelectedOption(null);
    setFinishedAll(false);
  };

  const nextQuestion = () => {
    if (selectedOption === null) return;

    setQuestionIndex((prev) => prev + 1);
    setSelectedOption(null);
  };

  const finishLesson = () => {
    const updatedCompleted = [...new Set([...completedLessons, lessonIndex])];
    setCompletedLessons(updatedCompleted);

    if (lessonIndex < lessons.length - 1) {
      setLessonIndex(lessonIndex + 1);
      setQuestionIndex(0);
      setSelectedOption(null);
    } else {
      setFinishedAll(true);
    }
  };

  const previousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      setSelectedOption(null);
    }
  };

  const progress = finishedAll
    ? 100
    : ((questionIndex + 1) / lesson.questions.length) * 100;

  return (
    <div className="tasks-page-container">

      <header className="tasks-header-bar-original">
        <div className="tasks-top-logo">
          <img src={logo} alt="Logo" className="nine-logo-img" />
        </div>

        <button
          className="home-icon-btn"
          onClick={() => onNavigate?.('seven')}
          aria-label="Home"
        >
          <svg viewBox="0 0 24 24" width="27" height="27" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </button>
      </header>

      <main className="tasks-main-layout">

        {/* القائمة الجانبية */}
        <aside className="tasks-sidebar">
          <div className="sidebar-header">
            <span className="sidebar-compass">🧭</span>
            <div>
              <h3>Level 1</h3>
              <p>Coding Explorer</p>
            </div>
          </div>

          <div className="sidebar-menu-items">
            {lessons.map((item, index) => {
              const unlocked =
                index === 0 ||
                completedLessons.includes(index - 1);

              const completed = completedLessons.includes(index);

              return (
                <button
                  type="button"
                  key={item.title}
                  className={`menu-item ${
                    lessonIndex === index && !finishedAll
                      ? 'active-item'
                      : ''
                  } ${!unlocked ? 'locked-item' : ''}`}
                  onClick={() => selectLesson(index)}
                  disabled={!unlocked}
                >
                  <span className="item-num">{index + 1}</span>

                  <span className="lesson-icon">
                    {index === 0 ? '💻' : index === 1 ? '⌨️' : '⚙️'}
                  </span>

                  <span className="item-title">{item.title}</span>

                  <span className="item-lock">
                    {completed ? '✓' : !unlocked ? '🔒' : '›'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="sidebar-progress-box">
            <span className="progress-text-num">
              {completedLessons.length}/3
            </span>

            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${(completedLessons.length / 3) * 100}%` }}
              />
            </div>

            <span className="star-icon">⭐</span>
          </div>
        </aside>

        {/* كارت الأسئلة */}
        <section className="tasks-content-card">

          <div className="card-top-breadcrumb">
            <div className="breadcrumb-content">
              <span className="breadcrumb-star">⭐</span>
              <span>Level 1</span>
              <span className="breadcrumb-arrow">›</span>
              <span>
                {finishedAll ? 'Completed!' : lesson.title}
              </span>
            </div>
          </div>

          {finishedAll ? (
            <div className="lesson-complete-screen">
              <div className="complete-icon">🏆</div>
              <h2>Congratulations!</h2>
              <p>You have completed all three lessons.</p>
              <p>Programming, Commands and Sequencing</p>

              <button
                className="next-action-btn"
                onClick={() => onNavigate?.('seven')}
              >
                الرئيسية
              </button>
            </div>
          ) : (
            <>
              <div className="question-card-inner">
                <div className="question-header-row">
                  <div className="q-badge-num">
                    {questionIndex + 1}
                  </div>

                  <div className="q-laptop-icon">💻</div>

                  <h2 className="q-main-title">{lesson.title}</h2>
                </div>

                <div className="question-prompt">
                  {question.text}
                </div>

                <div className="question-body-grid">
                  <div className="illustration-box">
                    <img
                      src="../../image/task-illustration.png"
                      alt="Lesson illustration"
                      className="task-illustration-img"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }}
                    />

                    <div className="illus-fallback">
                     <img src={firstqu} alt="" />
                    </div>
                  </div>

                  <div className="options-container">
                    {question.options.map((option, index) => {
                      const letter = String.fromCharCode(65 + index);

                      return (
                        <button
                          type="button"
                          key={option}
                          className={`option-card ${
                            selectedOption === index ? 'selected' : ''
                          }`}
                          onClick={() => setSelectedOption(index)}
                        >
                          <span className="opt-letter">{letter}</span>
                          <span className="opt-text">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <footer className="card-footer-nav">
                <button
                  className="nav-arrow-btn"
                  onClick={previousQuestion}
                  disabled={questionIndex === 0}
                  aria-label="Previous question"
                >
                  ‹
                </button>

                <div className="pagination-dots">
                  {lesson.questions.map((item, index) => (
                    <button
                      type="button"
                      key={index}
                      aria-label={`Question ${index + 1}`}
                      className={`dot ${
                        questionIndex === index ? 'active' : ''
                      }`}
                      onClick={() => {
                        if (index <= questionIndex) {
                          setQuestionIndex(index);
                          setSelectedOption(null);
                        }
                      }}
                    />
                  ))}
                </div>

                {questionIndex === lesson.questions.length - 1 ? (
                  <button
                    className="next-action-btn"
                    onClick={finishLesson}
                    disabled={selectedOption === null}
                  >
                    Finish <span>✓</span>
                  </button>
                ) : (
                  <button
                    className="next-action-btn"
                    onClick={nextQuestion}
                    disabled={selectedOption === null}
                  >
                    التالي <span>»</span>
                  </button>
                )}
              </footer>
            </>
          )}
        </section>

        {/* هدف الموضوع والمكافأة */}
        <aside className="tasks-goal-sidebar">
          <div className="goal-box">
            <h3>هدف الموضوع</h3>

            <ul>
              <li>فهم أساسيات البرمجة.</li>
              <li>كيفية عمل الكمبيوتر.</li>
              <li>التعرف على الأوامر وترتيب الخطوات.</li>
            </ul>

            <div className="reward-box">
              <h4>المكافأة</h4>
              <hr />
              <p>3 نجوم</p>
              <div className="stars-row">⭐ ⭐ ⭐</div>
            </div>
          </div>
        </aside>

      </main>
    </div>
  );
}
