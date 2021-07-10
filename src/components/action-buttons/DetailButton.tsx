import { MouseEvent } from "react";
type DetailButtonProps = {
  id: string;
};
/**
 * DetailButton button
 */
const DetailButton = ({ id }: DetailButtonProps) => {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    alert("Call ID " + id);
  };
  return (
    <button
      className="button is-small is-light"
      title="See details"
      onClick={handleClick}
    >
      <span className="icon">
        <i className="fas fa-file-alt"></i>
      </span>
    </button>
  );
};

export default DetailButton;
