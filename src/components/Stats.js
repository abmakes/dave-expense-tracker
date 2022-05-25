import React from 'react'

export default function Stats(props) {
  console.log(props)
  return (
    <div className="stats-section">
      <h1>Your balance: ${props.stats.balance}</h1>
      <p>Last update: {props.stats.updated}</p>
    </div>
  )
}