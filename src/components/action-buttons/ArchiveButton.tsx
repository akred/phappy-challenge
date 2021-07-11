import classNames from "classnames";
type ArchiveButtonProps = {
  id: string;
  isArchived: boolean;
  parentCallback: () => void,
};

/**
 * Archive button
 */
const ArchiveButton = ({ isArchived, parentCallback }: ArchiveButtonProps) => {

  return (
    <button
      className={classNames("button is-small", {
        "is-inverted is-danger": !isArchived,
        "is-light": isArchived,
      })}
      title={isArchived ? "Unarchive" : "Archive"}
      onClick={() => parentCallback()}
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
