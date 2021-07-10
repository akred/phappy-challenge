import "./CallItem.scss";
import CallIcon from "./CallIcon";
import classNames from "classnames";
import moment from "moment";

/**
 * Call item on the call list
 */
const CallItem = (call: ICall) => {
  const hasNote = () : boolean => {
    return call?.notes.length != 0;
  };

  const isArchived = () : boolean => {
    return call?.is_archived.valueOf();
  };
  const isIncoming = () : boolean => {
    return call?.direction === "inbound";
  };
  const isAnswered = () : boolean => {
    return call?.call_type === "answered";
  };

  const formatDetail = () : string => {
    let text
    if (call.direction === "inbound") {
      text = isAnswered()  ? ("called "  + call.to) : ("tried to call "  + call.to)
    } else {
      text = isAnswered()  ? ("called "  + call.from) : ("tried to call "  + call.from)
    }
    return (
      text +
      " / " +
      moment(call.created_at.toString()).format("MMMM DD, h:mm A")
    );
  };
  const archiveButton = (call: ICall) => {
    return (
      <button
        className={classNames("button is-small", {
          "is-inverted is-danger": !isArchived(),
          "is-light": isArchived(),
        })}
        title={isArchived() ? "Unarchive" : "Archive"}
      >
        <span className="icon">
          <i
            className={classNames({
              "fas fa-box": !isArchived(),
              "fas fa-box-open": isArchived(),
            })}
          ></i>
        </span>
      </button>
    );
  };
  return (
    <div className="phappy-call-item">
      <div className="card">
        <div className="card-content">
          <div className="content">
            <span className="icon-text is-small">
              <CallIcon
                disabled={isArchived()}
                incoming={isIncoming()}
              />
              <div
                className={classNames("sender", {
                  "has-text-grey": isArchived(),
                })}
              >
                <i
                  className={classNames({
                    "far fa-sticky-note fa-fw has-text-primary-dark":
                      hasNote(),
                  })}
                ></i>
                {call.from}{" "}
                <div className="detail">
                  <div className="detail-line">{formatDetail()}</div>
                  {archiveButton(call)}
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallItem;
