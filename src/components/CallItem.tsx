import "./CallItem.scss";
import CallIcon from "./icons/CallIcon";
import classNames from "classnames";
import moment from "moment";
import ArchiveButton from "./action-buttons/ArchiveButton";
import DetailButton from "./action-buttons/DetailButton";
import { useState, FC } from "react";
import CallService from "../services/CallService";

type CallItemProps = {
  parentCallback: () => void,
  call: ICall
}
/**
 * Call item on the call list
 */
const CallItem : FC<CallItemProps> = ({ parentCallback, call }) => {
  const [isLoading, setIsLoading] = useState(false);

  const hasNote = (): boolean => {
    return call?.notes.length !== 0;
  };

  const isArchived = (): boolean => {
    return call?.is_archived.valueOf();
  };
  const isIncoming = (): boolean => {
    return call?.direction === "inbound";
  };
  const isAnswered = (): boolean => {
    return call?.call_type === "answered";
  };

  const formatDetail = (): string => {
    let text;
    if (call.direction === "inbound") {
      text = isAnswered() ? "called " + call.to : "tried to call " + call.to;
    } else {
      text = isAnswered()
        ? "called " + call.from
        : "tried to call " + call.from;
    }
    return (
      text +
      " / " +
      moment(call.created_at.toString()).format("MMMM DD, h:mm A")
    );
  };

  const archiveCall = (): void => {
    console.log("Archive the call / callItem : "  + call.id)
    setIsLoading(true);
    CallService.archiveCall(call.id)
      .then(({ data: is_archived }: CallProps | any) => {
        console.log(!is_archived);
        call.is_archived = !call.is_archived
        setIsLoading(isLoading);
        parentCallback();
      })
      .catch((err: Error) => {
        console.log(err);
        setIsLoading(isLoading);
        parentCallback();
      });
  };
  return (
    <div className="phappy-call-item">
      <div className="card">
        <div className="card-content">
          <div className="content">
            <span className="icon-text is-small">
              <CallIcon disabled={isArchived()} incoming={isIncoming()} />
              <div
                className={classNames("sender", {
                  "has-text-grey": isArchived(),
                })}
              >
                <i
                  className={classNames({
                    "far fa-sticky-note fa-fw has-text-primary-dark":
                      hasNote() && !isArchived(),
                    "far fa-sticky-note fa-fw": hasNote() && isArchived(),
                  })}
                ></i>
                {call.from}{" "}
                <div className="detail">
                  <div className="detail-line">{formatDetail()}</div>
                  <DetailButton id={call.id} />
                  <ArchiveButton
                    id={call.id}
                    isArchived={isArchived()}
                    parentCallback={() => archiveCall()}
                  />
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
