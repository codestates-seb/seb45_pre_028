import { useLocation } from "react-router-dom";

const Error = () => {
  const location = useLocation();
  const status = location.state?.status;
  const errorMessage = location.state?.errorMessage;

  return (
    <div>
      {status && <h1>{status}</h1>}
      {errorMessage && <p>Error: {errorMessage}</p>}
      {!location.state && <p>Error: Not Found</p>}
    </div>
  );
};

export default Error;
