import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem({ name, spots, selected, setDay }) {

  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  });

  const formatSpots = function() {
    switch (spots) {
      case 0: return "no spots remaining";
      case 1: return "1 spot remaining";
      default: return `${spots} spots remaining`;
    }
  };

  const spotsText = formatSpots();

  return (
    <li className={ dayClass } onClick={ () => setDay(name) }>
      <h2 className="text--regular">{ name }</h2> 
      <h3 className="text--light">{ spotsText }</h3>
    </li>
  );
}