import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="app-header w-100">
        <div className="row justify-content-center align-items-center text-white h-50 w-50">
          <div className="row text-center text-white justify-content-center align-items-center">
            <p className="h1 w-75">Build a self-care routine suitable for you</p>
            <p className="h6 w-50">Take our test to get a personalized self-care routine based on your needs</p>
          </div>
          <div className="row w-25 justify-content-center align-items-center m-0 p-0">
            <button className="py-3 h6 m-0 start-quiz-button w-25 col" onClick={() => navigate('/quiz/1')}>Start the quiz</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
