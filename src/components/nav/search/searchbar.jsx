import { useEffect, useRef } from "react";
import { searchIcon } from "../../svg/paths";
export default function SearchBar() {
  const isInput = useRef(null);
  const svgRef = useRef(null);

  function handleSearchBox(e) {
    if (isInput.current) {
      isInput.current.classList.toggle("active");
      svgRef.current.classList.toggle("active");
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search user"
        ref={isInput}
        className="search-input"
      />
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        ref={svgRef}
        onClick={handleSearchBox}
        className="pointer search-icon"
        xmlns="http://www.w3.org/2000/svg"
      >
        {searchIcon}
      </svg>
    </>
  );
}
