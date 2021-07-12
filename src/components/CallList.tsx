import "./CallList.scss";
import CallService from "../services/CallService";
import CallItem from "./CallItem";
import { useState, useEffect } from "react";
import LoadingIcon from "./icons/LoadingIcon";
import ErrorMessage from "./ErrorMessage";
import ReactPaginate from "react-paginate";

export const CallList = () => {
  const [calls, setCalls] = useState<ICall[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(20);
  const [pageCount, setPageCount] = useState(0);

  const sortCallsByDesc = (unorderedCalls: ICall[]) => {
    const orderedCalls = unorderedCalls.sort((a, b) =>
      a.created_at > b.created_at ? -1 : b.created_at > a.created_at ? 1 : 0
    );
    return orderedCalls;
  };
  const updateCalls = () => {
    setCalls(calls);
  };
  const hasCalls = () => {
    return calls?.length !== 0;
  };

  // Function use for the pagination
  const handlePageClick = (e: any) => {
    setIsLoading(true)
    const selectedPage = e.selected;
    setOffset(selectedPage * perPage);
  };

  // Retrieve calls through API
  const fetchCalls = (): void => {
    CallService.getCalls(offset, perPage)
      .then(
        ({ data: { nodes, totalCount } }: ApiDataType[] | any) => {
          const pageCount = Math.ceil(totalCount / perPage);
          setPageCount(pageCount);
          const sortedCalls = sortCallsByDesc(nodes);
          setCalls(sortedCalls);
        }
      )
      .catch((err: Error) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const renderPagination = () => {
    return hasCalls() && (
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageLinkClassName={"pagination-link"}
        breakClassName={"pagination-break"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        previousLinkClassName={"pagination-link"}
        nextLinkClassName={"pagination-link"}
        containerClassName={"pagination pagination-list is-small"}
      />
    )
  }

  useEffect(() => {
    fetchCalls();
  }, [offset]);

  return (
    <div className="phappy-call-list">
      <h1 className="title">Call list</h1>
      {renderPagination()}
      {isLoading ? (
        <LoadingIcon />
      ) : hasCalls() ? (
        calls.map((call: ICall) => (
          <CallItem call={call} parentCallback={updateCalls} key={call.id} />
        ))
      ) : (
        <ErrorMessage />
      )}
      {renderPagination()}
    </div>
  );
};

export default CallList;
