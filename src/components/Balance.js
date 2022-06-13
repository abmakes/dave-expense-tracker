
import React from 'react'

export default function Home(props) {

  return (
    <form className='box-brutal expense-button-group' onSubmit={props.handleBalanceSubmit}>
    <h4>Yesterday's balance: ${props.appStatus.startOfDay}</h4>
    <h4>What's your end of day balance?</h4>
    <br />
    <input 
      type="number" 
      name="endOfDay" 
      onChange={(e) => props.balanceUpdate(e)}
      value={props.appStatus.endOfDay}
      placeholder='$$$'
    />
    <button className="button-brutal">Next</button>

    </form> 
  )
} 