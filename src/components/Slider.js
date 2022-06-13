import React from 'react'

export default function Slider(props) {

  return (
    <div className="form-group">
      <label htmlFor="food-drinks">{props.expense.catergory}</label>
      <input
        type="range"
        name={props.expense.catergory}
        value={props.expense.value}
        onChange={(e) => props.handleChange(e)}
        max={props.daysSpend}
      />
      <button id="decrement" name={props.expense.catergory} value={props.expense.value} className='adjust-value-button' onClick={(e) => props.handleChange(e)}>-</button>
      <span className='slider-value'>{props.expense.value}</span>
      <button id="increment" name={props.expense.catergory} value={props.expense.value} className='adjust-value-button' onClick={(e) => props.handleChange(e)}>+</button>
    </div>
  )
}