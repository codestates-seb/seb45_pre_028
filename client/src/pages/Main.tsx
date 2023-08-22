import QuestionList from "../components/question/QuestionList";
import QuestionListFilter from "../components/question/QuestionListFilter";
import QuestionListTitle from "../components/question/QuestionListTitle";

const Main = (): JSX.Element => {
  return (
    <>
      <QuestionListTitle />
      <QuestionListFilter />
      <QuestionList />
    </>
  );
};
export default Main;
