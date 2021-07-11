import { MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import { CALL_DETAIL_URL } from "../../helpers/urls";
type DetailButtonProps = {
  id: string;
};
/**
 * DetailButton button
 */
const DetailButton = ({ id }: DetailButtonProps) => {
  const history = useHistory();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    const pos = CALL_DETAIL_URL.lastIndexOf('/');
    const queryParam = CALL_DETAIL_URL.substring(pos + 1);
    const routeWithId = CALL_DETAIL_URL.replace(queryParam, id);;
    history.push(routeWithId);
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
