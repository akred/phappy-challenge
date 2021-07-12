import "./CallList.scss";
import CallService from "../services/CallService";
import CallItem from "./CallItem";
import { useState, useEffect } from "react";
import LoadingIcon from "./icons/LoadingIcon";
import ErrorMessage from "./ErrorMessage";
import ReactPaginate from "react-paginate";
import FilterDropdown from "./action-buttons/FilterDropdown";

export const CallList = () => {
  const ALL_FILTER_TYPE = "All";
  const [calls, setCalls] = useState<ICall[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(20);
  const [pageCount, setPageCount] = useState(0);
  const [filterTypes, setFilterTypes] = useState<string[]>([]);

  const sortCallsByDesc = (unorderedCalls: ICall[]) => {
    const orderedCalls = unorderedCalls.sort((a, b) =>
      a.created_at > b.created_at ? -1 : b.created_at > a.created_at ? 1 : 0
    );
    return orderedCalls;
  };
  /**
   * Callback triggered when a call item change (for example, archive it)
   * In fact, we need to refresh the call list if this one is grouped by type
   */
  const updateCalls = () => {
    setCalls(calls);
  };
  const hasCalls = () => {
    return calls?.length !== 0;
  };
  // Callback triggered by the dropdown component
  // Note : It only filters calls of the current page
  const filterCalls = (filter: string) => {
    /**
     * We reset calls at start
     * in case of the used decide to filter 2+ in a row (otherwise, the list start to be more and more smaller :))
     */
    setIsLoading(true);
    CallService.getCalls(offset, perPage)
      .then(({ data: { nodes, totalCount } }: ApiDataType[] | any) => {
        const pageCount = Math.ceil(totalCount / perPage);
        setPageCount(pageCount);
        const sortedCalls = sortCallsByDesc(nodes);
        if (ALL_FILTER_TYPE !== filter) {
          const filteredCalls = sortedCalls.filter(function (call) {
            return call.call_type === filter;
          });
          console.log(filteredCalls.length)
          setCalls(filteredCalls);
        } else {
          setCalls(sortedCalls);
          console.log(sortedCalls.length)
        }
      })
      .catch((err: Error) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  // Function use for the pagination
  const handlePageClick = (e: any) => {
    setIsLoading(true);
    const selectedPage = e.selected;
    setOffset(selectedPage * perPage);
  };

  // Retrieve calls through API
  const fetchCalls = (): void => {
    CallService.getCalls(offset, perPage)
      .then(({ data: { nodes, totalCount } }: ApiDataType[] | any) => {
        const pageCount = Math.ceil(totalCount / perPage);
        setPageCount(pageCount);
        const sortedCalls = sortCallsByDesc(nodes);
        setCalls(sortedCalls);
        retrieveFilterTypes(sortedCalls);
      })
      .catch((err: Error) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  // Collect all possible call types
  const retrieveFilterTypes = (calls: ICall[]): void => {
    let filterTypes: string[] = [];
    for (let call of calls) {
      if (!filterTypes.includes(call?.call_type.toString())) {
        filterTypes.push(call?.call_type.toString());
      }
    }
    filterTypes.push(ALL_FILTER_TYPE);
    setFilterTypes(filterTypes);
  };

  const renderPagination = () => {
    return (
      hasCalls() && (
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
    );
  };

  // Used for the pagination
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
        [
          <FilterDropdown
            filterTypes={filterTypes}
            parentCallback={filterCalls}
            key="1"
          />,
          calls.map((call: ICall) => (
            <CallItem call={call} parentCallback={updateCalls} key={call.id} />
          )),
        ]
      ) : (
        <ErrorMessage />
      )}
    </div>
  );
};

export default CallList;
