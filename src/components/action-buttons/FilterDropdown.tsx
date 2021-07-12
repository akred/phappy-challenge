import { MouseEvent, useState } from "react";
import classNames from "classnames";
import "./FilterDropdown.scss";
type FilterDropdownProps = {
  filterTypes: string[];
  parentCallback: (selectedFilter: string) => void;
};

/**
 * FilterDropdown
 * This component is mainly used to filter calls by type (missed, answered, archived)
 */
const FilterDropdown = ({
  filterTypes,
  parentCallback,
}: FilterDropdownProps) => {
  return (
    <div
      className="phappy-filter-dropdown dropdown is-hoverable"
    >
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu3"
        >
          <span>Filter</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu3" role="menu">
        <div className="dropdown-content">
          {filterTypes.map((value, index) => {
            return (
              <a
                href="#"
                className="dropdown-item"
                key={index}
                onClick={() => parentCallback(value)}
              >
                {value}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
