import "./CallList.scss";
import CallService from "../services/CallService";
import CallItem from "./CallItem";
import { useState, useEffect } from "react";
import LoadingIcon from './icons/LoadingIcon'

export const CallList = () => {
  const [calls, setCalls] = useState<ICall[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const hasCalls = () => {
    return calls?.length !== 0;
  };
  // TODO be remove, only for design test
  /*const note: INote = {
    id: "1",
    content: "Secret message",
  };
  const call: ICall = {
    id: "ddf97c38-bb70-4a9e-ae19-20c72b9b4d05",
    duration: 41898,
    is_archived: false,
    from: "+33156965939",
    to: "+33108356808",
    direction: "inbound",
    call_type: "answered",
    via: "+33188833258",
    created_at: "2021-07-06T00:56:47.098Z",
    notes: [note],
  };*/
  // TODO be remove, only for design test

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
        calls.map((call: ICall) => <CallItem {...call} key={call.id} />)
      ) : (
        <h2>No data available</h2>
      )}
    </div>
  );
};

export default CallList;
