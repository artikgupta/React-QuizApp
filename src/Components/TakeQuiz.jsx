import React, { Component } from "react";
// import Header from "./Components/Header";
// import "./style.css";

class TakeQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
      difficulties: "easy",
      userSelectedCategory: "",
    };
  }

  componentDidMount() {
    this.fetchCategoriesRepos();
    // this.fetchReposOnTheBasisOfDifficulty();
    // this.fetchDifficultyRepos();
  }

  fetchCategoriesRepos = () => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          categories: data.trivia_categories,
        })
      );
  };

  startQuizHandler = () => {
    if (!this.state.userSelectedCategory) return;
    this.props.fetchReposOnTheBasisOfDifficulty(
      this.state.userSelectedCategory,
      this.state.difficulties
    );
  };

  difficultiesHandler = (val) => {
    this.setState({
      difficulties: val,
    });
  };

  userSelectedCategoryHandler = (id) => {
    this.setState({
      userSelectedCategory: id,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="flex">
          {/* {this.state.data &&
            this.state.data.map((val) => {
              return <button>{val.difficulty}</button>;
            })}

          <h1>{this.state.data && this.state.data[0].question}</h1> */}

          <h2 className="difficulty">Level of difficulty</h2>
          <button
            className={this.state.difficulties === "easy" ? "active" : ""}
            onClick={() => this.difficultiesHandler("easy")}
          >
            Easy
          </button>
          <button
            className={this.state.difficulties === "medium" ? "active" : ""}
            onClick={() => this.difficultiesHandler("medium")}
          >
            Medium
          </button>
          <button
            className={this.state.difficulties === "hard" ? "active" : ""}
            onClick={() => this.difficultiesHandler("hard")}
          >
            Hard
          </button>
        </div>
        {/* <Header /> */}
        <div className="card_container">
          {this.state.categories &&
            this.state.categories.map((category) => {
              return (
                <div
                  key={category.id}
                  className={
                    this.state.userSelectedCategory === category.id
                      ? "active card "
                      : "card"
                  }
                  onClick={() => this.userSelectedCategoryHandler(category.id)}
                >
                  <button className="category_name">{category.name}</button>
                </div>
              );
            })}
          <button className="btn" onClick={this.startQuizHandler}>
            Take the Quiz
          </button>
        </div>
      </div>
    );
  }
}

export default TakeQuiz;
