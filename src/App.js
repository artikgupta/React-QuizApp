import React, { Component } from "react";
import Header from "./Components/Header";
import TakeQuiz from "./Components/TakeQuiz";
import Quiz from "./Components/Quiz";
import Result from "./Components/Result";
import "./style.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      userAnswered: [],
    };
  }

  userAnsweredHandler = (userAnswer) => {
    this.setState({
      userAnswered: [...this.state.userAnswered, userAnswer],
    });
  };

  fetchReposOnTheBasisOfDifficulty = (userSelectedCategory, difficulties) => {
    fetch(
      `https://opentdb.com/api.php?amount=10&category=${userSelectedCategory}&difficulty=${difficulties}`
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          data: data.results,
        })
      );
  };

  render() {
    return (
      <>
        <Header />
        {this.state.data &&
        this.state.data.length === this.state.userAnswered.length ? (
          <Result
            data={this.state.data}
            userAnswered={this.state.userAnswered}
          />
        ) : this.state.data ? (
          <Quiz
            data={this.state.data}
            userAnsweredHandler={this.userAnsweredHandler}
          />
        ) : (
          <TakeQuiz
            fetchReposOnTheBasisOfDifficulty={
              this.fetchReposOnTheBasisOfDifficulty
            }
          />
        )}
      </>
    );
  }
}

export default App;
