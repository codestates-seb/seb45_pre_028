import AnswerInput from "../components/answer/AnswerInput";
import AnswerList from "../components/answer/AnswerList";
import Question from "../components/question/Question";

const Questions = (): JSX.Element => {
  return (
    <div>
      <Question></Question>
      <AnswerList></AnswerList>
      <AnswerInput></AnswerInput>
    </div>
  );
};
export default Questions;
