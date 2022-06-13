import React from 'react'
import PieChart from "./Chart";

export default function Stats(props) {
  /* <p>Last update: {props.stats.updated}</p> */
  return (
    <div className="stats-section box-brutal">
      <h1>{`You spent: $${props.amountSpent}`}</h1>
      <h4>{`Your balance $${props.appStatus.endOfDay} today.`}</h4>
      <PieChart formData={props.formData}/>
    </div>
  )
}