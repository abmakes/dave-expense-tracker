import React from 'react'
import Stats from './Stats'
import Slider from './Slider'
import { nanoid } from 'nanoid'

export default function Form(props) {

  ///// DATA //////
  const catergories = ["Food", "Transport", "Entertainment", "Lifestyle", "Save/Invest", "Healthcare", "Insurance", "Utilities", "Housing"]
  const [newDayData, setNewDayData] = React.useState({
      expenses: [
        ],
      selected: false
  })
  let endOfDay = props.appStatus.endOfDay 

  ///// Calculate derivtives /////
  let daysSpend = props.appStatus.startOfDay - endOfDay
  let expenseValues = newDayData.expenses
  let valuesOnly = expenseValues.map(item => item.value)
  let totalExpenses = valuesOnly.reduce((partialSum, x) => partialSum + parseInt(x), 0)

  
  ///// FUNCTIONS  ///////

  function selectCatergory(event){
    event.preventDefault()
    addExpense("select", event.target.value, 0);
  }

  function handleChange(event) {
    event.stopPropagation()

    let {id, name, value} = event.target;
    if (id === "increment"){
      value = parseInt(value) + 1
    } else if (id === "decrement"){
      value = parseInt(value) - 1
    }
    addExpense("slider", name, value)
  }  

  ////// UPDATE STATE FOR NEW CATERGORIES OR SLIDER CHANGES /////
  function addExpense(source, catergory, value) {
    let copyData = newDayData
    let indexKeys = Object.values(copyData.expenses)
    let index = indexKeys.findIndex(item => item.catergory === catergory)
    const newExpenses = [...copyData.expenses]
    
    if (source === "select") {
      //// add new catergory to the display
      const newEntry = {
        catergory: "",
        value: 0
      }
      newEntry.catergory = catergory
      newEntry.value = value
      newExpenses[newExpenses.length] = newEntry
      return updateState(newExpenses)
    } else {
      /// update the sliders
      if (index !== -1) {
      newExpenses[index] = { catergory: catergory, value: value }
      return updateState(newExpenses)
      }
    }

    
  }

  function updateState(newExpenses) {
    setNewDayData(oldData => {
      return {
        ...oldData,
        expenses : newExpenses
      }
    })
  }

  const allCategories = catergories.map(item => {
      return <button key={nanoid()} className="button-brutal-secondary" onClick={(e) => {selectCatergory(e); e.target.disabled="true"}} disabled="" value={item} >{item}</button>
    }
  )

  function handleSubmit(event) {
    event.preventDefault();
    if (event.target.id === "submitCategories") {
      setNewDayData(prevData => {
        return {
          ...prevData,
          selected: true
        }
      })
    } else {
      props.submitDaysData(newDayData)
    }
  }

  const allExpenses = Object.values(newDayData.expenses)
  let allSliders = allExpenses.map(expense => {

    return <Slider 
    key={nanoid()} handleChange={handleChange} daysSpend={daysSpend} expense={expense} addExpense={addExpense}/>
  })


  ////// PROMPT ///////
  let message = "Please update expenses"
  let disabled = true
  if (totalExpenses === daysSpend) {
    disabled = ''
    message = <span className="success">Well done!</span>
  } else if (totalExpenses > daysSpend ) {
    message = <span className="warning">{`You've allocated $${-(daysSpend - totalExpenses)} too much`}</span>
  } else {
    message = <span className="warning">{`Allocate another $${-(totalExpenses - daysSpend)} `}</span>
  }


  return (
      <div className="expense-form" >
        {
          (newDayData.selected === true)
          ?
          <>
            <Stats appStatus={props.appStatus} formData={newDayData}  amountSpent={props.appStatus.startOfDay - endOfDay}/>

            <form id="submitExpenses" className='box-brutal expense-sliders-group' onSubmit={handleSubmit}>
              <h3>Enter new expense</h3>        
              <h4>How did you spend the ${daysSpend}?</h4><br />  
              {allSliders}

              {message}<br />
              <button className="button-brutal" disabled={disabled}>Submit</button>
            </form>
          </>
          :
          <form id="submitCategories" className='box-brutal expense-button-group' onSubmit={handleSubmit}>
              <h3>Select expense categories</h3>         
              <h4>What did you spend the ${daysSpend} on?</h4><br />  
              {allCategories}
              <br />
              <button className="button-brutal" disabled="">Next</button>
          </form>
        }
      </div>
  )
}