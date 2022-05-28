import React from 'react'
import PieChart from "./Chart";

export default function Stats(props) {
  /* <p>Last update: {props.stats.updated}</p> */
  return (
    <div className="stats-section box-brutal">
      <h1>{`Your balance: $${props.stats.accountBalance}`}</h1>
      <PieChart formData={props.formData}/>
      <p>{`you've spent $${props.amountSpent} today.`}</p>
    </div>
  )
}