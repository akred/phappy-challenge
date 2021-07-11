import LoadingIcon from "./icons/LoadingIcon";
import CallService from "../services/CallService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  return (
    <div className="phappy-call-detail">
      <h1 className="title">Call detail</h1>
      {isLoading ? (
        <LoadingIcon />
      ) : !!call ? (
        <h2>ID : {call.id}</h2>
      ) : (
        <h2>No data available</h2>
      )}
    </div>
  );
}
