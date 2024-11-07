import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from './ProgressBar';

const questions = [
  {
    question: "What's your hair type or texture?",
    options: ['Straight', 'Curly', 'Wavy', 'Fine'],
  },
  {
    question: 'How often do you wash your hair?',
    options: ['Daily', 'Every other day', 'Twice a week', 'Once a week', 'Once every two weeks'],
  },
  {
    question: 'What benefit do you look for in your hair products?',
    options: ['Anti-breakage', 'Hydration', 'Soothing dry scalp', 'Repairs damaged hair', 'Volume', 'Curl enhancing'],
  },
  {
    question: 'Is there anything troubling you about your hair?',
    options: ['Breakage', 'Frizz', 'Scalp dryness', 'Damage', 'Tangling'],
  },
  {
    question: 'What is your natural hair color(s) today?',
    options: ['Black', 'Brown', 'Blonde', 'Red/Orange', 'Silver/Grey'],
  },
];

function Quiz() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleAnswerChange = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (answers.includes(null)) {
      let exit  = window.confirm('Do you want to submit even thout you did not finish all the questions?');
      if(exit) {
        navigate('/results');
      }
    } else {
      navigate('/results');
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      let exit  = window.confirm('Do you want to exit from the quiz?');
      if (exit) {
        navigate('/');
      }      
    }
  };

  const answeredQuestionsCount = answers.filter((answer) => answer !== null).length;
  const progress = (answeredQuestionsCount / questions.length) * 100;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className='row justify-content-center align-items-center  p-0 m-0 vh-100'>
      <div className='col  h-50 justify-content-center text-center question-section'>
        <p className='h2 mb-4'>{currentQuestion.question}</p>
        <div className='  p-0 m-0 col-12 d-flex flex-wrap justify-content-center align-items-center mb-4'>
            {currentQuestion.options.map((option, index) => {
            const letter = String.fromCharCode(97 + index);
            return (
              <button
                key={index}
                onClick={() => handleAnswerChange(option)}
                className={`mx-2 p-3 ${answers[currentQuestionIndex] === option ? 'selected' : ''}`}
                style={{
                  border:'1px solid #5BC1ED',
                  backgroundColor: answers[currentQuestionIndex] === option ? '#e6f7ff' : '#fff',
                  cursor: 'pointer',
                  borderRadius: '5px',
                }}
              >
                {`${letter}. ${option}`}
              </button>
            );
          })}
        </div>

        <div className='row w-100 justify-content-center align-items-center'>
          <button className='col-1 p-2 back-button' onClick={handleBack}>
            Back
          </button>
          <button className='col-2 row p-2 next-button align-items-center' onClick={handleNext}>
            <p className="col-10 m-0">
              {currentQuestionIndex === questions.length- 1
                ? "Discover Your Result"
                : "Next Question"}
            </p>
            <span className="col-2">
              <i className="fa-solid fa-arrow-right"></i>
            </span>
        </button>
        </div>
      </div>
      <div className='circular-bar'>
        <CircularProgress progress={progress} 
          currentQuestion={currentQuestionIndex} 
          totalQuestions={questions.length} />
      </div>
    </div>
  );
}

export default Quiz;
