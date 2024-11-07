import React from 'react';

function Question({ question, questionIndex, handleAnswer }) {
  return (
    <div>
      <h2>{question.question}</h2>
      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswer(questionIndex, option)}
        >
          {option}
        </button>
      ))}
      <p>{`Question ${questionIndex + 1} of 5`}</p>
    </div>
  );
}

export default Question;
