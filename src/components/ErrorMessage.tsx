/**
 * Error Message
 */
const ErrorMessage = () => {
  return (
    <h2>
      No data available or session expired.{" "}
      <a href="/login">Please login again</a>
    </h2>
  );
};

export default ErrorMessage;
