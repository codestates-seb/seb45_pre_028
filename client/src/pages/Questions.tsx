import AnswerInput from "../components/main/AnswerInput";
import AnswerList from "../components/main/AnswerList";
import Question from "../components/main/Question";

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
