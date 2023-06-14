import React from 'react'
import DayListItem from './DayListItem';

export default function DayList({ days, day, setDay }) {

  const dayItems = days.map(item => {
    return <DayListItem
      key={ item.id }
      name={ item.name }
      spots={ item.spots }
      selected={ day === item.name }
    />
  });

  return (
    <ul>{ dayItems }</ul>
  )
}

