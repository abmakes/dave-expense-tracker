
import { nanoid } from 'nanoid'
import React from 'react'

export default function Dashboard(props) {
  const data = props.data

  let totalExpensesSum = 0
  const totalsList = data.map(item => {
    totalExpensesSum += parseInt(item.value)
    return (
    <tr key={nanoid()}>
      <td>{item.catergory}</td>
      <td>${item.value}</td>
    </tr>
    )    
  })

  return (
    <div className='box-brutal expense-button-group'>
      <h1>Expense Summary</h1>
      <h4>Total Expenditure: ${totalExpensesSum}</h4>
      <table>
        <thead>
          <tr>
          <td>Catergory</td>
          <td>Amount</td>
          </tr>
        </thead>
        <tbody>
        {totalsList}
        </tbody>
      </table>
    </div> 
  )
} 