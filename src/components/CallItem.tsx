import "./CallItem.scss";
/**
 * Call item on the call list
 */
const CallItem = () => {
  return (
    <div className="phappy-call-item container">
      <div className="card">
        <div className="card-content">
          <div className="content">
            <div className="icon-text">
              <span className="icon is-large fas fa-phone has-text-info">
              </span>
              <span>Jean Castex</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallItem;
