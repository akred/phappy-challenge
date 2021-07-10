import "./CallItem.scss";
import CallIcon from "./CallIcon";
import classNames from "classnames";
import moment from "moment";

/**
 * Call item on the call list
 */
const CallItem = (call: ICall) => {
  const hasNote = ({ notes }: ICall) => {
    return notes.length != 0;
  };

  const isArchived = ({ is_archived }: ICall) => {
    return is_archived.valueOf();
  };
  const isIncoming = ({ direction }: ICall) => {
    return direction === "inbound";
  };

  const formatDetail = ({ from, to, direction, call_type, created_at }: ICall) => {
    let text
    if (direction === "inbound") {
      text = (call_type === "answered")  ? ("called "  + to) : ("tried to call "  + to)
    } else {
      text = (call_type === "answered")  ? ("called "  + from) : ("tried to call "  + from)
    }
    return (
      text +
      " / " +
      moment(created_at.toString()).format("MMMM DD, h:mm A")
    );
  };
  const archiveButton = (call: ICall) => {
    return (
      <button
        className={classNames("button is-small", {
          "is-inverted is-danger": !isArchived(call),
          "is-light": isArchived(call),
        })}
        title={isArchived(call) ? "Unarchive" : "Archive"}
      >
        <span className="icon">
          <i
            className={classNames({
              "fas fa-box": !isArchived(call),
              "fas fa-box-open": isArchived(call),
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
                disabled={isArchived(call)}
                incoming={isIncoming(call)}
              />
              <div
                className={classNames("sender", {
                  "has-text-grey": isArchived(call),
                })}
              >
                <i
                  className={classNames({
                    "far fa-sticky-note fa-fw has-text-primary-dark":
                      hasNote(call),
                  })}
                ></i>
                {call.from}{" "}
                <div className="detail">
                  <div className="detail-line">{formatDetail(call)}</div>
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
