import classNames from "classnames";
type ArchiveButtonProps = {
  isArchived: boolean;
};

/**
 * Archive button
 */
const ArchiveButton = ({ isArchived }: ArchiveButtonProps) => {
  return (
    <button
      className={classNames("button is-small", {
        "is-inverted is-danger": !isArchived,
        "is-light": isArchived,
      })}
      title={isArchived ? "Unarchive" : "Archive"}
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
