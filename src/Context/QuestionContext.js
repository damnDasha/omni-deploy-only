import React, { Component } from "react";
import TokenService from "../Services/TokenService";
import QuestionsApiService from "../Services/questions-service";
import AnswersApiService from "../Services/answers-service";

const QuestionContext = React.createContext({
  user: {},

  question: [],
  answer: [],
  error: null,
  questionList: [],
  answerList: [],

  departmentList: [],
  setError: () => {},
  clearError: () => {},
  setQuestions: () => {},
  setQuestionList: () => {},
  setDepartmentList: () => {},
  setAnswers: () => {},
  setAnswerList: () => {},
  setUser: () => {},
  processLogin: () => {},
  processLogout: () => {},
  deleteQuestions: () => {},
  loadData: () => {}
});

export default QuestionContext;

export class QuestionProvider extends Component {
  constructor(props) {
    super(props);
    const state = {
      user: {},
      question: [],
      questionList: [],
      departmentList: [],
      answer: [],
      answerList: [],
      error: null,
      likedQuestions: true,
    };
    if (TokenService.hasAuthToken()) {
      const jwtPayload = TokenService.getInfoFromToken();
      if (jwtPayload)
        state.user = {
          id: jwtPayload.user_id,
          name: jwtPayload.name,
          username: jwtPayload.sub,
        };
    }
    this.state = state;
  }

  setError = (error) => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setQuestions = (question) => {
    console.log("running");
    this.setState({ questions: [...this.state.questions, question] });
  };

  setQuestionList = (questionList) => {
    this.setState({ questionList });
  };

  setDepartmentList = (departments) => {
    this.setState({
      departmentList: departments,
    });
  };
  setAnswers = (answer) => {
    console.log("running");
    this.setState({ answers: [...this.state.answers, answer] });
  };

  setAnswerList = (answerList) => {
    this.setState({ answerList });
  };
  setUser = (user) => {
    this.setState({ user });
  };
  userLikedQuestions = (likedQuestions) => {
    this.setState({ likedQuestions: true });
  };

  processLogin = (authToken) => {
    TokenService.saveAuthToken(authToken);
    const jwtPayload = TokenService.parseAuthToken();
    this.setUser({
      id: jwtPayload.user_id,
      name: jwtPayload.name,
      username: jwtPayload.sub,
    });
  };

  processLogout = () => {
    TokenService.clearAuthToken();

    this.setUser({});
  };

  deleteQuestions = (questionList) => {
    this.setState({
      questionList
    })
  };

  loadData = () => {
 return Promise.all([
   QuestionsApiService.getQuestions(),
   AnswersApiService.getAnswers(),
 ]).then((results) => {
   const questions = results[0];
   const answers = results[1];
   this.setQuestionList(questions);
   this.setAnswerList(answers);
 });
 }

  render() {
    const value = {
      user: this.state.user,
      answerList: this.state.answerList,
      answer: this.state.answer,
      questionList: this.state.questionList,
      question: this.state.question,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setQuestions: this.setQuestions,
      setQuestionList: this.setQuestionList,
      setDepartmentList: this.setDepartmentList,
      departmentList: this.state.departmentList,
      setAnswers: this.setAnswers,
      setAnswerList: this.setAnswerList,
      setUser: this.setUser,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
      deleteQuestions: this.deleteQuestions,
      loadData: this.loadData
    };
    return (
      <QuestionContext.Provider value={value}>
        {this.props.children}
      </QuestionContext.Provider>
    );
  }
}
