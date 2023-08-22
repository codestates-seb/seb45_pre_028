import { styled } from "styled-components";
import { COMMON_CSS } from "../../constants/common_css";
import { getAccessToken } from "../../util/auth";
const AnswerInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  form {
    max-width: 79rem;
    padding-bottom: 1.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    font-size: 1.2rem;
    textarea,
    button {
      margin-top: 1.5rem;
    }
    display: flex;
    flex-direction: column;
    textarea {
      border: 1px solid #babfc4;
      width: 100%;
      resize: none;
      height: 10rem;

      &:focus {
        outline: none;
        border: 1px solid ${COMMON_CSS["input-focus-border"]};
        box-shadow: ${COMMON_CSS["input-focus-shadow"]};
      }
    }
    button {
      width: 8rem;
      height: 2.3rem;
      color: white;
      background: ${COMMON_CSS["button-color"]};
      border: 0px;
      border-radius: 6px;
      &:hover {
        background: ${COMMON_CSS["button-hover-color"]};
      }
    }
  }
`;
function AnswerInput() {
  const [answerText, setAnswerText] = useState<string>("");

  const { id } = useParams<string>();

  const handleAnswerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    type Headers = Record<string, string>;
    const headers: Headers = {
      "ngrok-skip-browser-warning": "69420",
    };
    const token = getAccessToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    try {
      const newAnswer = {
        content: answerText,
      };
      await axios.post(`/question/${id}/answer`, newAnswer, { headers });
      setAnswerText("");
      window.location.reload();
    } catch (error) {
      alert("권한이 없습니다.");
    }
  };
  const token = getAccessToken();
  return (
    <AnswerInputContainer>
      {!!token && (
        <form onSubmit={handleAnswerSubmit}>
          <label htmlFor="answer">Your Answer</label>
          <textarea
            placeholder="What do you think?"
            required={true}
            id="answer"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
          />
          <button type="submit">Post Your Answer</button>
        </form>
      )}
    </AnswerInputContainer>
  );
}

export default AnswerInput;
