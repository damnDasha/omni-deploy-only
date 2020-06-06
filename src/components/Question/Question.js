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
      value: { value: "HR" },
      questions: []
    }
    // this.handleChange = this.handleChange.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    console.log('successful submit question')
    const newQuestion = {
      question_body: e.target["question_body"].value,
      department_id: this.state.value,
      author: e.target.user_id,
      // e.target["department"].value,
    };
    console.log(newQuestion)

    QuestionsApiService.postQuestion()
      .then(data => console.log(data))
      .catch(this.context.setError);
  };

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  render() {
    console.log(this.state.questions)
    console.log(this.context.departmentList)
    // let departments = this.state.department
    // let departmentItems = departments.map((department) =>
    //   <option key={department.name} value={departments}>{department.name}</option>)
    return (
      <div className="Question">
        <NavBar />
        <form className="question form" onSubmit={e => this.handleSubmit(e)}>
          <fieldset>

            <br />
            <label htmlFor="question">question</label>
            <input
              required
              className="form-control"
              type="text"
              name="question_body"
              value={this.state.question_body}
              onChange={this.handleSubmit}
              id="question"
              placeholder="ask...."
              onChange={e => this.setState({ questions: e.target.value })}
            />
            <br />
            <label htmlFor="input-one">department</label>
            <select value={this.state.value} onChange={e => this.handleChange(e)}>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Engineering">Engineering</option>
              {/* {departmentItems} */}
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
