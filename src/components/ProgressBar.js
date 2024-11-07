import React from 'react';

function CircularProgress({ progress, currentQuestion, totalQuestions}) {
  const radius = 50;
  const stroke = 5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#EEF7FB"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#AADDF3"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        transform={`rotate(-90 ${radius} ${radius})`}
      />
      <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="20">
        {`${currentQuestion + 1}/${totalQuestions}`}
      </text>
    </svg>
  );
}

export default CircularProgress;
