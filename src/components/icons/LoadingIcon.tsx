import "./LoadingIcon.scss";

/**
 * Loading icon
 */
const LoadingIcon = () => {
  return (
    <div className="phappy-loading-icon">
      <h2>Loading...</h2>
      <div className="fa-3x">
        <i className="fas fa-circle-notch fa-spin"></i>
      </div>
    </div>
  );
};

export default LoadingIcon;
