import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Question.css";
import NavBar from "../NavBar/NavBar";
import QuestionContext from "../../Context/QuestionContext";
import QuestionsApiService from "../../Services/questions-service";
import DepartmentApiService from "../../Services/department-api-service";

export class Question extends Component {
  // Call the API on componentwillmount
  // Specify the DOM element and element rendering the reuslt
constructor(props) {
 super(props);
 this.state = {
   department: []
 }
}

componentDidMount() {
  let departmentList = [];
  DepartmentApiService.getDepartments()
  .then(data => {
    departmentList = data.map((department) => {
      return department
    });
    console.log(departmentList)
    this.setState({
      department: departmentList
    })
  })
}


  static contextType = QuestionContext;

  handleSubmit = (e) => {
    e.preventDefault();

    const newQuestion = {
      title: e.target["title"].value,
      question_body: e.target["question_body"].value,
      department_id: e.target["department"].value,
      author: e.target.user_id,
    };
    QuestionsApiService.postQuestion()
      .then(this.context.postQuestion)
      .catch(this.context.setError);
  };

  render() {
    let departments = this.state.department
    let departmentItems = departments.map((department) => 
    <option key={department.name}>{department.name}</option>)
    return (
      <div className="Question">
        <NavBar />
        <form className="question form" onSubmit={this.handleSubmit}>
          <fieldset>
    
            <br/>
            <label htmlFor="input-one">question</label>
            <input
              className="form-control"
              type="text"
              name="question_body"
              id="question"
              placeholder="ask...."
            />
            <br />
            <label htmlFor="input-one">department</label>
            <select>
                {departmentItems}
            </select>
            <br />
            <button
              type="submit"
              // onClick={(e) => this.props.history.push("/dashboard")}
            >
              ASK
            </button>
          </fieldset>
        </form>
        <Link to="/Dashboard">
          <button type="button">go back</button>
        </Link>
        <Link to="/answer">
          <button type="button">go look at all the answers</button>
        </Link>
      </div>
    );
  }
}

export default Question;
