import "./CallItem.scss";
import CallIcon from "./CallIcon";
import classNames from "classnames";

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

  const formatDetail = ({ to, created_at }: ICall) => {
    return "From : " + to + ", at " + created_at;
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
                {call.from}{" "}
                <i
                  className={classNames({
                    "far fa-sticky-note": hasNote(call),
                  })}
                ></i>
                <div className="detail">{formatDetail(call)}</div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallItem;
