import LoadingIcon from "./icons/LoadingIcon";
import CallService from "../services/CallService";
import { MouseEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { CALL_LIST_URL } from "../helpers/urls";
import moment from "moment";
import ErrorMessage from "./ErrorMessage";

export default function CallDetail() {
  const [call, setCall] = useState<ICall>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();

  // Retrieve call through API
  const fetchCall = (): void => {
    console.log(id);
    CallService.getCall(id)
      .then(({ data }: CallProps | any) => {
        console.log(data);
        setCall(data);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchCall();
  }, []);

  const history = useHistory();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    history.push(CALL_LIST_URL);
  };
  return (
    <div className="phappy-call-detail">
      <h1 className="title">Call detail</h1>
      {isLoading ? (
        <LoadingIcon />
      ) : !!call ? (
        <div>
          <h2></h2>
          <article className="message is-primary">
            <div className="message-header">
              <p>Call ID : {call.id}</p>
              <button
                className="delete"
                aria-label="close"
                onClick={handleClick}
              ></button>
            </div>
            <div className="message-body content">
              <ul>
                <li>ID : {call.id}</li>
                <li>Direction : {call.direction}</li>
                <li>From : {call.from}</li>
                <li>To : {call.to}</li>
                <li>Duration : {moment(call.duration).format('H:mm:ss')}</li>
                <li>Archived : {call.is_archived ? 'Yes' : 'No'}</li>
                <li>Via : {call.via}</li>
                <li>
                  Created at :{" "}
                  {moment(call.created_at.toString()).format("MMMM DD, h:mm A")}
                </li>
                <li>
                  Notes : <i>todo</i>
                </li>
              </ul>
            </div>
          </article>
        </div>
      ) : (
        <ErrorMessage />
      )}
    </div>
  );
}
