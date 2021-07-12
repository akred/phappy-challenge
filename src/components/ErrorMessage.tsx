import { LOGIN_URL } from "../helpers/urls";

/**
 * Error Message
 */
const ErrorMessage = () => {
  return (
    <h2>
      No data available or session expired.{" "}
      <a href={LOGIN_URL}>Please login again</a>
    </h2>
  );
};

export default ErrorMessage;
