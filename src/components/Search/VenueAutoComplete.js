import React, { useRef, useEffect } from "react";

const VenueAutoComplete = props => {
  const wrapperRef = useRef(null);

  const cls = `${ props.isHome === true ? "home-autocomplete-container" : "venue-autocomplete-container" }`;

  // below is the same as componentDidMount and componentDidUnmount
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      props.setAutoCompleteFalse();
    }
  };

  const businessAutoComplete = props.data.businesses.map((item, index) => {
    return (
      <li className="autocomplete-list-item" onClick={() => props.onClick(item)} key={index} >
        { item }
      </li>
    )
  });

  const categoryAutoComplete = props.data.categories.map((item, index) => {
    return (
        <li className={`autocomplete-list-item ${index === 0 ? "first" : ""}`} onClick={() => props.onClick(item)} key={index} >
          { item }
        </li>
    )
  });

  return (
    <div className={cls} ref={wrapperRef} >
      <ul className="autocomplete-list" >
        { businessAutoComplete }
        { categoryAutoComplete }
      </ul>
    </div>
  );
};

export default VenueAutoComplete;