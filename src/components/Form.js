import React from 'react'

export default function Form() {

  return (
      <div className="expense-form">
        <h4>Enter new expense</h4>        
        <form>
            <label>
              Catergory:
              <input type="text" name="name" />
            </label>
            <label>
              Amount:
              <input type="number" name="amount" />
            </label>
            <input type="submit" value="Submit" />
        </form>
      </div>
  )
}