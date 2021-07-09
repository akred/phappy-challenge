import "./CallItem.scss";
import CallIcon from "./CallIcon";
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
              <CallIcon disabled incoming />
              <div className="callee">Jean Castex</div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <div className="content">
            <div className="icon-text">
              <CallIcon />
              <div className="callee">Superman</div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <div className="content">
            <div className="icon-text">
              <CallIcon incoming={false}/>
              <div className="callee">Iron man</div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <div className="content">
            <div className="icon-text">
              <CallIcon voicemail />
              <div className="callee">Iron man</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallItem;
