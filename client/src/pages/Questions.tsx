import AnswerInput from "../components/main/AnswerInput";
import AnswerList from "../components/main/AnswerList";
import QuestionList from "../components/main/Question";

const Questions = (): JSX.Element => {
  return (
    <div>
      <QuestionList></QuestionList>
      <AnswerList></AnswerList>
      <AnswerInput></AnswerInput>
    </div>
  );
};
export default Questions;
