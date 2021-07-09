import CallItem from "./CallItem";

export const CallList = () => {
  // TODO be remove, only for design test
  const note: INote = {
    _id: 1,
    content: "Secret message",
  };
  const call: ICall = {
    _id: "ddf97c38-bb70-4a9e-ae19-20c72b9b4d05",
    duration: 41898,
    is_archived: false,
    from: "+33156965939",
    to: "+33108356808",
    direction: "inbound",
    call_type: "answered",
    via: "+33188833258",
    created_at: "2021-07-06T00:56:47.098Z",
    notes: [note],
  };
  // TODO be remove, only for design test
  return (
    <div className="phappy-call-list">
      <h1 className="title">Call list</h1>
      <CallItem {...call} />
    </div>
  );
};

export default CallList;
