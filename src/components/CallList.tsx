import "./CallList.scss";
import CallService from "../services/CallService";
import CallItem from "./CallItem";
import { useState, useEffect } from "react";
import LoadingIcon from "./icons/LoadingIcon";
import ErrorMessage from "./ErrorMessage"

export const CallList = () => {
  const [calls, setCalls] = useState<ICall[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const updateCalls = () => {
    console.log("Archive the call / update list")
    setCalls(calls)
  }
  const hasCalls = () => {
    return calls?.length !== 0;
  };

  // Retrieve calls through API
  const fetchCalls = (): void => {
    CallService.getCalls(1, 20)
      .then(({ data: { nodes } }: ApiDataType[] | any) => {
        setCalls(nodes);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchCalls();
  }, []);

  return (
    <div className="phappy-call-list">
      <h1 className="title">Call list</h1>
      {isLoading ? (
        <LoadingIcon />
      ) : hasCalls() ? (
        calls.map((call: ICall) => <CallItem call={call} parentCallback={updateCalls} key={call.id}  />)
      ) : (
        <ErrorMessage />
      )}
    </div>
  );
};

export default CallList;
