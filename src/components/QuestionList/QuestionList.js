import React from 'react';
import Moment from 'react-moment';
import QuestionItem from '../QuestionItem/QuestionItem';
import TokenService from '../../Services/TokenService';

export default function QuestionList(props) {
  return (
    <div className='questionList'>
      <h1>Latest Questions</h1>
      <ul className='qMap'>
        {console.log(props.userID)}
        {props.questions.map((question) => (
          <QuestionItem
            question={question}
            user_id={props.userID}
            answers={props.answers}
            handleQuestionLike={props.handleQuestionLike}
            handleDeleteQuestion={props.handleDeleteQuestion}
            btnColors={props.btnColors}
          />
        ))}
      </ul>
    </div>
  );
}
