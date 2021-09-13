import React from "react";

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionIndex: 0,
      userSelectedAnswer: "",
      options: [],
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    console.log(prevState, this.state);
    if (prevState.currentQuestionIndex != this.state.currentQuestionIndex) {
      this.setState({
        options: this.shuffledOptions(),
      });
    }
  };

  componentDidMount = () => {
    this.setState({
      options: this.shuffledOptions(),
    });
  };

  handleNext = () => {
    if (!this.state.userSelectedAnswer) return;
    this.props.userAnsweredHandler(this.state.userSelectedAnswer);
    this.setState((prevState) => {
      return {
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        userSelectedAnswer: "",
      };
    });
  };

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  optionHandler = (userAnswer) => {
    this.setState({
      userSelectedAnswer: userAnswer,
    });
  };

  shuffledOptions = () => {
    return this.shuffleArray([
      this.props.data[this.state.currentQuestionIndex].correct_answer,
      ...this.props.data[this.state.currentQuestionIndex].incorrect_answers,
    ]);
  };

  render() {
    return (
      <div className="container">
        <h2>Questions</h2>
        <h1 className="question">
          {this.props.data[this.state.currentQuestionIndex].question}
        </h1>
        {this.state.options.map((val, i) => {
          return (
            <div
              className={
                this.state.userSelectedAnswer === val
                  ? "active_options"
                  : "options"
              }
              onClick={() => {
                this.optionHandler(val);
              }}
            >
              {i + 1}. {val}
            </div>
          );
        })}
        <button className="next_btn" onClick={this.handleNext}>
          Next
        </button>
      </div>
    );
  }
}

export default Quiz;
