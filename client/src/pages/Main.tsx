import QuestionList from "../components/main/QuestionList";
import QuestionListFilter from "../components/main/QuestionListFilter";
import QuestionListTitle from "../components/main/QuestionListTitle";

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
