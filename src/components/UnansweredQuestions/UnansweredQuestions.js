import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";
import config from "../../config";
import QuestionContext from "../../Context/QuestionContext";
import Sidebar from "../Sidebar/Sidebar";
import QuestionsApiService from "../../Services/questions-service";
import Moment from "react-moment";
import Answer from "../Answer/Answer";
import AnswersApiService from '../../Services/answers-service';
import QuestionList from '../QuestionList/QuestionList';
import { Link } from 'react-router-dom';
import Sort from "../Sort/Sort";
import TokenService from '../../Services/TokenService'

export class UnansweredQuestions extends Component {

  static contextType = QuestionContext;

  render() {
    const questions = this.context.questions;
    const { user_id } = TokenService.readJwtToken()

    return (
      <div className="dashboard">
        <NavBar />
        <Sort />
        <section className="main">
          <Sidebar />
          <QuestionList handleQuestionLike={this.handleQuestionLike} handleDeleteQuestion={this.handleDeleteQuestion}
          btnColors={this.state.btnColors} userID={user_id} questions={questions}/>
         
        </section>
      </div>
    );
  }
}

export default UnansweredQuestions;
