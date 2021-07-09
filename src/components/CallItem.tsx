import "./CallItem.scss";
import CallIcon from "./CallIcon";
/**
 * Call item on the call list
 */
const CallItem = () => {
  return (
    <div className="phappy-call-item">
      <div className="card">
        <div className="card-content">
          <div className="content">
            <div className="icon-text">
              <CallIcon disabled incoming />
              <div className="sender">
                Jean Castex
                <div className="detail">14:34</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <div className="content">
            <div className="icon-text">
              <CallIcon />
              <div className="sender">
                Superman
                <div className="detail">21:15</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <div className="content">
            <div className="icon-text">
              <CallIcon incoming={false}/>
              <div className="sender">
                Ironman
                <div className="detail">13:13</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <div className="content">
            <div className="icon-text">
              <CallIcon voicemail />
              <div className="sender">
                King Kong
                <div className="detail">08:15</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallItem;
