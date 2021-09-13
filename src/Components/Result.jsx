import React from "react";

function Result({ data, userAnswered }) {
  return (
    <div>
      <h3>Result</h3>
      <div className="container">
        {data.map((val, i) => {
          return (
            <div>
              <h3>{val.question}</h3>
              {val.correct_answer === userAnswered[i] ? (
                <div className="correct_answer">{val.correct_answer}</div>
              ) : (
                <>
                  <div className="wrong_answer">{userAnswered[i]}</div>
                  <div className="correct_answer">{val.correct_answer}</div>
                </>
              )}{" "}
              ;
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Result;
