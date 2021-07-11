import classNames from "classnames";
import { MouseEvent, useState } from "react";
import CallService from "../../services/CallService";
type ArchiveButtonProps = {
  id: string;
  isArchived: boolean;
};

/**
 * Archive button
 */
const ArchiveButton = ({ id, isArchived }: ArchiveButtonProps) => {
  const [call, setCall] = useState<ICall>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const archiveCall = (): void => {
    console.log(id);
    setIsLoading(true);
    CallService.archiveCall(id)
      .then(({ data: is_archived }: CallProps | any) => {
        console.log(is_archived);
        setCall({ ...is_archived, ...call });
        setIsLoading(false);
      })
      .catch((err: Error) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    archiveCall();
  };
  return (
    <button
      className={classNames("button is-small", {
        "is-inverted is-danger": !isArchived,
        "is-light": isArchived,
      })}
      title={isArchived ? "Unarchive" : "Archive"}
      onClick={handleClick}
    >
      <span className="icon">
        <i
          className={classNames({
            "fas fa-box": !isArchived,
            "fas fa-box-open": isArchived,
          })}
        ></i>
      </span>
    </button>
  );
};

export default ArchiveButton;
