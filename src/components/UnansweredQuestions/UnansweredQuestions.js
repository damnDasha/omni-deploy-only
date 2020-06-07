import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";
import config from "../../config";
import QuestionContext from "../../Context/QuestionContext";
import Sidebar from "../Sidebar/Sidebar";
import QuestionsApiService from "../../Services/questions-service";
import Moment from "react-moment";
import Answer from "../Answer/Answer";
import AnswerApiService from '../../Services/answers-service';

export class UnansweredQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      filterID: null
    }
  }

  static contextType = QuestionContext;

  componentDidMount() {
    this.context.clearError();

    QuestionsApiService.getQuestions()
      .then(question => {
        console.log(question)
        this.setState({
          questions: question
        })
      })
      .catch(this.context.setError);
  }

 filterQuestions = id => {
   this.setState({
     filterID: id
   })
 }
  render() {

    const { filterID } = this.state    
    const questions = filterID ? this.state.questions.filter(question => {
      return question.department === filterID
    }) : this.state.questions
    return (
      <div className="dashboard">
        <NavBar />
        <section className="main">
          <Sidebar filterQuestions={this.filterQuestions} />
          <div className="questionList">
            <h1>Unanswered Questions</h1>
            <ul className="qMap">
              {questions.map((question) => (
                <li className="qLi" key={question.id}>
                  {console.log(question)}
                  <span className="questionHead">{question.question_body}</span>
                  <br />
                  {question.department_name}
                  <br />
                  <Moment format="YYYY/MM/DD">{question.created_date}</Moment>
                  <br />
                  {question.user_name}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default UnansweredQuestions;
