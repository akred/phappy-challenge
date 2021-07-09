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

  const formatDetail = ({ to, created_at }: ICall) => {
    return "From " + to + " / " + moment(created_at.toString()).format('MMMM DD, h:mm A');
  };
  const archiveButton = (call : ICall) => {
    return !isArchived(call) && (
      <button className="button is-small is-inverted is-danger" title="Archive">
        <span className="icon">
          <i className="fas fa-archive"></i>
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
                    "far fa-sticky-note fa-fw has-text-primary-dark": hasNote(call),
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
